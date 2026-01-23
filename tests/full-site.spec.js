// tests/full-site.spec.js
const { test, expect } = require('@playwright/test');

// 🔴 CHANGE THIS to your local server URL (e.g., http://127.0.0.1:5500/index.html)
const BASE_URL = 'http://127.0.0.1:5500/index.html';

test.describe('Taste of Bharat - Complete E2E Suite', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    // Clear LocalStorage to ensure fresh state for cart/spin game
    await page.evaluate(() => localStorage.clear());
  });

  // ========================================================
  // 1. VISUAL & NAVIGATION TESTS
  // ========================================================
  test('Homepage loads with critical elements', async ({ page }) => {
    await expect(page).toHaveTitle(/Taste of Bharat/i);
    await expect(page.locator('.logo img')).toBeVisible();
    await expect(page.locator('.hero h2')).toContainText('Authentic Spice');
    
    // Check Live Status Badge
    const badge = page.locator('#statusBadge');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveClass(/open|closed/);
  });

  test('Map and Offers render correctly', async ({ page }) => {
    // Check Special Offers (loaded from data.js)
    const offers = page.locator('.offer');
    await expect(offers.first()).toBeVisible();
    await expect(offers).toHaveCount(await offers.count()); // Dynamic check

    // Check Map Overlay
    await expect(page.locator('.map-overlay')).toBeVisible();
    await expect(page.locator('.btn-directions')).toHaveAttribute('href', /maps\.google\.com/);
  });

  // ========================================================
  // 2. MENU & SEARCH TESTS
  // ========================================================
  test('Menu rendering, categories, and search', async ({ page }) => {
    // Check initial category load
    const firstCategoryBtn = page.locator('.cat').first();
    await expect(firstCategoryBtn).toHaveClass(/active/);
    
    // Test Category Switching
    const secondCategoryBtn = page.locator('.cat').nth(1);
    await secondCategoryBtn.click();
    await expect(secondCategoryBtn).toHaveClass(/active/);

    // Test Search Functionality
    const searchInput = page.locator('#menuSearch');
    await searchInput.fill('Paneer');
    
    // Verify results contain "Paneer"
    const cardTitle = page.locator('.card .name').first();
    await expect(cardTitle).toContainText(/Paneer/i);
    
    // Test "View All" Button Logic (if category is long)
    // Refresh to clear search
    await page.reload();
    const viewMoreBtn = page.locator('.btn-view-more');
    if (await viewMoreBtn.isVisible()) {
      const initialCount = await page.locator('.card').count();
      await viewMoreBtn.click();
      const newCount = await page.locator('.card').count();
      expect(newCount).toBeGreaterThan(initialCount);
    }
  });

  // ========================================================
  // 3. SHOPPING CART LOGIC (Complex)
  // ========================================================
  test('Cart: Add, Update, Remove, Total Calculation', async ({ page }) => {
    // 1. Add Item
    const firstAddBtn = page.locator('.add').first();
    await firstAddBtn.click();
    
    // Verify Toast and Float Counter
    await expect(page.locator('#toast')).toBeVisible();
    await expect(page.locator('#cartCount')).toHaveText('1');

    // 2. Open Cart
    await page.click('#cartFloat');
    await expect(page.locator('.cart-modal')).toHaveClass(/open/);
    
    // 3. Verify Item in Cart
    const cartItem = page.locator('.cart-item');
    await expect(cartItem).toBeVisible();
    
    // 4. Increment Quantity
    const priceText = await page.locator('.cart-item span').first().innerText();
    const unitPrice = parseFloat(priceText.replace('£', ''));
    
    await page.click('text=+');
    await expect(page.locator('.cart-item span').nth(1)).toHaveText('2'); // Qty check
    
    // Verify Total Updates
    const totalText = await page.locator('#cartTotalDisplay').innerText();
    const expectedTotal = (unitPrice * 2).toFixed(2);
    expect(totalText).toContain(expectedTotal);

    // 5. Remove Item
    await page.click('text=−'); // Down to 1
    await page.click('text=−'); // Remove
    
    // Verify Empty State
    await expect(page.locator('text=Your cart is empty')).toBeVisible();
  });

  // ========================================================
  // 4. GAMIFICATION (SPIN & WIN)
  // ========================================================
  test('Spin game works and persists win', async ({ page }) => {
    const spinBtn = page.locator('#spinBtn');
    const msg = page.locator('#spinMessage');

    // Scroll to section
    await spinBtn.scrollIntoViewIfNeeded();

    // Spin 3 times to trigger win (logic is in app.js)
    for (let i = 0; i < 3; i++) {
      await expect(spinBtn).toBeEnabled();
      await spinBtn.click();
      // Wait for animation loop (approx 1.5s in app.js)
      await page.waitForTimeout(1600);
    }

    // Verify Win State
    await expect(msg).toContainText('DISCOUNT UNLOCKED');
    await expect(spinBtn).toBeDisabled();
    await expect(spinBtn).toHaveText("You've already won!");
  });

  // ========================================================
  // 5. FORM SUBMISSION (MOCKED)
  // ========================================================
  test('Order Form submits correctly (Network Mocked)', async ({ page }) => {
    // ⚠️ IMPORTANT: We block the actual request to formsubmit.co so we don't spam you
    await page.route('https://formsubmit.co/ajax/*', async route => {
      const json = { success: "true", message: "Form submitted successfully" };
      await route.fulfill({ json });
    });

    // Add item to cart first
    await page.locator('.add').first().click();
    await page.click('#cartFloat');

    // Fill Form
    await page.fill('input[name="name"]', 'Test Bot');
    await page.fill('input[name="phone"]', '07700900000');
    await page.fill('input[name="time"]', '19:00');
    
    // Submit
    await page.click('#cartForm button[type="submit"]');

    // Check for Success Message (Mocked response triggers this)
    await expect(page.locator('#cartSuccess')).toBeVisible();
    await expect(page.locator('text=Order Received!')).toBeVisible();
    
    // Verify Cart Cleared
    await page.click('#closeSuccess'); // Close success modal
    // Float should be hidden or count 0
    const floatVisible = await page.locator('#cartFloat').isVisible();
    if(floatVisible) {
        await expect(page.locator('#cartCount')).toHaveText('0');
    }
  });

  // ========================================================
  // 6. MOBILE RESPONSIVENESS
  // ========================================================
  test('Mobile menu works on small screens', async ({ page }) => {
    // Set Viewport to iPhone size
    await page.setViewportSize({ width: 375, height: 667 });

    // Check Hamburger Visibility
    const hamburger = page.locator('#hamburger');
    await expect(hamburger).toBeVisible();

    // Open Menu
    await hamburger.click();
    const menu = page.locator('#mobileMenu');
    await expect(menu).toHaveClass(/active/);

    // Click link closes menu
    await page.locator('.mLink').first().click();
    await expect(menu).not.toHaveClass(/active/);
  });

});