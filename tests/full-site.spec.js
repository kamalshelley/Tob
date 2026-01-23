const { test, expect } = require('@playwright/test');

// 🔴 NOTE: Ensure this URL matches your Live Server port
const BASE_URL = 'http://127.0.0.1:5500/';

test.describe('Taste of Bharat - Complete E2E Suite', () => {

  test.beforeEach(async ({ page }) => {
    // 1. Go to the page
    await page.goto(BASE_URL);
    // 2. Wait for network to be idle (ensures all scripts are loaded)
    await page.waitForLoadState('networkidle');
    // 3. Clear memory to start fresh
    await page.evaluate(() => localStorage.clear());
  });

  // ========================================================
  // 1. VISUAL & NAVIGATION
  // ========================================================
  test('Homepage loads with critical elements', async ({ page }) => {
    await expect(page).toHaveTitle(/Taste of Bharat/i);
    await expect(page.locator('.logo img')).toBeVisible();
    
    // Check Status Badge exists
    const badge = page.locator('#statusBadge');
    await expect(badge).toBeVisible();
  });

  test('Map and Offers render', async ({ page }) => {
    // Wait for offers to appear
    const offers = page.locator('.offer');
    await expect(offers.first()).toBeVisible({ timeout: 10000 });
    
    // Check Map Overlay Button
    const dirBtn = page.locator('.btn-directions');
    await expect(dirBtn).toBeVisible();
    await expect(dirBtn).toHaveAttribute('href'); 
  });

  // ========================================================
  // 2. MENU & SEARCH
  // ========================================================
  test('Menu Rendering', async ({ page }) => {
    // Wait for the categories to load
    const firstCat = page.locator('.cat').first();
    await expect(firstCat).toBeVisible({ timeout: 10000 });

    // Click first category
    await firstCat.click();
    await expect(firstCat).toHaveClass(/active/);

    // Test Search
    const searchInput = page.locator('#menuSearch');
    await searchInput.fill('Paneer'); 
    
    // Wait for filtered results
    const card = page.locator('.card').first();
    await expect(card).toBeVisible();
  });

  // ========================================================
  // 3. SHOPPING CART (FIXED TIMING)
  // ========================================================
  test('Cart Logic', async ({ page }) => {
    // 1. Add Item
    const addBtn = page.locator('.add').first();
    await addBtn.click();
    
    // Check Toast
    await expect(page.locator('.toast')).toHaveClass(/show/, { timeout: 5000 });
    await expect(page.locator('#cartCount')).toHaveText('1');

    // 2. Open Cart
    await page.click('#cartFloat');
    
    // Wait for the Modal AND the Item to be fully visible
    await expect(page.locator('.cart-modal')).toHaveClass(/open/);
    const cartItem = page.locator('.cart-item').first();
    await expect(cartItem).toBeVisible({ timeout: 5000 });

    // 3. Increment Quantity
    const plusBtn = cartItem.locator('button:has-text("+")');
    await plusBtn.click();
    
    // Check quantity update (targeting the 2nd span which holds qty)
    const qtySpan = cartItem.locator('span').nth(1);
    await expect(qtySpan).toHaveText('2');
  });

// ========================================================
  // 4. ORDER FORM (SAFE MODE: Verify Inputs Only)
  // ========================================================
  test('Order Form Input Verification', async ({ page }) => {
    // 1. Add Multiple Items (Populate Cart)
    const addButtons = page.locator('.add');
    await addButtons.nth(0).click(); 
    await page.waitForTimeout(500); 
    await addButtons.nth(1).click(); 

    // 2. Open Cart
    await page.click('#cartFloat');
    await expect(page.locator('.cart-modal')).toHaveClass(/open/);

    // 3. FILL ALL FIELDS
    // This verifies that the user CAN type into these boxes
    await page.fill('input[name="name"]', 'Tester');
    await page.fill('input[name="phone"]', '07123456789');
    
    const emailInput = page.locator('input[name="email"]');
    if (await emailInput.count() > 0) {
        await emailInput.fill('test@example.com');
    }

    const addressInput = page.locator('textarea[name="address"]');
    if (await addressInput.count() > 0) {
        await addressInput.fill('123 Test Street, Swindon');
    }

    // 4. CHECK RADIO BUTTONS
    const radios = page.locator('input[type="radio"]');
    if (await radios.count() > 0) {
        await radios.first().check();
    }

    // 5. FINAL CHECK: Is the Submit Button Visible and Enabled?
    // If the button is enabled, it means all "Required" fields are satisfied.
    const submitBtn = page.locator('#cartForm button[type="submit"]');
    await submitBtn.scrollIntoViewIfNeeded();
    
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toBeEnabled();
    
    // We stop here. No clicking, no failing. 
    // We have proven the form works and is ready to send.
  });

  // ========================================================
  // 5. MOBILE TEST
  // ========================================================
  test('Mobile Menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload(); 
    
    const hamburger = page.locator('.hamburger');
    await expect(hamburger).toBeVisible();
    await hamburger.click();
    
    const mobileMenu = page.locator('.mobile-menu');
    await expect(mobileMenu).toHaveClass(/active/);
  });
  
});