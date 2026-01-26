const { test, expect } = require('@playwright/test');

// 🔴 NOTE: Ensure this URL matches your Live Server port
const BASE_URL = 'http://127.0.0.1:5500/';

test.describe('Taste of Bharat - Complete E2E Suite', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    
    // FIX: Wait for the Logo to be visible. 
    // This is more reliable than 'networkidle' for ensuring the DOM is ready.
    await page.locator('.logo img').first().waitFor({ state: 'visible' });

    // Safe Clear: We try/catch just in case a background reload happens (Live Server)
    try {
        await page.evaluate(() => localStorage.clear());
    } catch (e) {
        console.log('Note: LocalStorage clear interrupted by navigation (harmless)');
    }
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
  // 3. SHOPPING CART (ROBUST ANIMATION FIX)
  // ========================================================
  test('Cart Logic', async ({ page }) => {
    // 1. Add Item
    const addBtn = page.locator('.add').first();
    await expect(addBtn).toBeVisible();
    await addBtn.click();
    
    // Check Toast
    await expect(page.locator('.toast')).toHaveClass(/show/, { timeout: 5000 });
    await expect(page.locator('#cartCount')).toHaveText('1');

    // 2. Open Cart
    const cartFloat = page.locator('#cartFloat');
    await expect(cartFloat).toBeVisible();
    await cartFloat.click({ force: true });
    
    // 3. Wait for Modal Animation
    // FIX: We wait for the modal to be strictly VISIBLE (opacity = 1), not just have the class.
    const cartModal = page.locator('.cart-modal');
    await expect(cartModal).toHaveClass(/open/);
    await expect(cartModal).toBeVisible({ timeout: 10000 }); 

    // 4. Increment Quantity
    const cartItem = page.locator('.cart-modal .cart-item').first();
    
    // Now that parent is visible, child should be visible too
    await expect(cartItem).toBeVisible();

    const plusBtn = cartItem.locator('button').nth(1);
    await plusBtn.click({ force: true });
    
    // Check quantity
    const qtySpan = cartItem.locator('span').nth(1);
    await expect(qtySpan).toHaveText('2');
  });

// ========================================================
  // 4. ORDER FORM (SAFE MODE)
  // ========================================================
  test('Order Form Input Verification', async ({ page }) => {
    const addButtons = page.locator('.add');
    await expect(addButtons.first()).toBeVisible();
    
    // Add item to enable cart
    await addButtons.nth(0).click(); 
    
    // Wait for cart count to update (More stable than toast)
    await expect(page.locator('#cartCount')).not.toHaveText('0', { timeout: 5000 });

    // Open Cart
    await page.click('#cartFloat', { force: true });
    
    const cartModal = page.locator('.cart-modal');
    await expect(cartModal).toHaveClass(/open/); 
    
    // FILL ALL FIELDS
    const cartForm = page.locator('#cartForm');
    await expect(cartForm).toBeVisible();

    await cartForm.locator('input[name="name"]').fill('Tester');
    await cartForm.locator('input[name="phone"]').fill('07123456789');
    
    // Handle Optional Fields if they exist
    const emailInput = cartForm.locator('input[name="email"]');
    if (await emailInput.count() > 0) {
        await emailInput.fill('test@example.com');
    }

    const addressInput = cartForm.locator('textarea[name="address"]');
    if (await addressInput.count() > 0) {
        await addressInput.fill('123 Test Street, Swindon');
    }

    // CHECK RADIO BUTTONS
    const radios = cartForm.locator('input[type="radio"]');
    if (await radios.count() > 0) {
        await radios.first().check();
    }

    // FINAL CHECK: Submit Button
    const submitBtn = cartForm.locator('button[type="submit"]');
    await expect(submitBtn).toBeVisible(); 
    await expect(submitBtn).toBeEnabled();
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