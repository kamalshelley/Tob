const { test, expect } = require('@playwright/test');

// Ensure this matches your live server port
const BASE_URL = 'http://127.0.0.1:5500/';

test.describe('Taste of Bharat - Coverage & Edge Cases', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    // Wait for the page to settle (network idle) before testing
    await page.waitForLoadState('networkidle');
  });

  // ========================================================
  // 1. DATA INTEGRITY CHECK
  // ========================================================
  test('Menu loads items correctly from data source', async ({ page }) => {
    // We look for the class '.card' which represents a menu item
    const menuItems = page.locator('.card');

    // 1. Ensure at least one item is visible
    await expect(menuItems.first()).toBeVisible();

    // 2. Count them. This proves your data.js loop is working.
    const count = await menuItems.count();
    console.log(`✅ Verified ${count} menu items are displayed`);
    
    // We expect more than 0 items (adjust this number if you know you have exactly 6 items)
    expect(count).toBeGreaterThan(0);
  });

  // ========================================================
  // 2. EDGE CASE: EMPTY FORM SUBMISSION (FIXED LOCATOR)
  // ========================================================
  test('Booking form prevents empty submission', async ({ page }) => {
    // 1. Navigate to booking section
    // FIX: Scope search to the .hero section, then find the link by text
    // This is much more reliable than relying on hidden CSS classes
    const bookBtn = page.locator('.hero').getByRole('link', { name: 'Book a Table' });
    
    await bookBtn.click();

    // 2. Locate the "Name" input in the Booking form
    const nameInput = page.locator('#bookingForm input[name="name"]');
    await expect(nameInput).toBeVisible(); 
    
    // 3. Try to click submit WITHOUT filling anything
    const submitBtn = page.locator('#bookingForm button[type="submit"]');
    await submitBtn.click({ force: true }); 

    // 4. Verify that the browser BLOCKED the submission
    const isInvalid = await nameInput.evaluate(input => {
      return input.validity.valueMissing; 
    });

    expect(isInvalid).toBe(true);
  });

  // ========================================================
  // 3. VISUAL REGRESSION CHECK
  // ========================================================
  // NOTE: This test will FAIL the very first time you run it.
  // It will say: "Snapshot not found". This is normal!
  // See instructions below on how to fix it.
  test('Visual check of Hero Section', async ({ page }) => {
    // This takes a screenshot of JUST the .hero section and compares it to a saved version
    await expect(page.locator('.hero')).toHaveScreenshot('hero-section.png', {
      maxDiffPixels: 100 // Allow for tiny pixel differences
    });
  });

});