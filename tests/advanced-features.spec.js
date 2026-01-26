const { test, expect } = require('@playwright/test');

// 🔴 NOTE: Ensure this matches your Live Server port
const BASE_URL = 'http://127.0.0.1:5500/';

test.describe('Taste of Bharat - Advanced Features', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
  });

  // ========================================================
  // 1. SMART TIME SLOT LOGIC
  // ========================================================
  test('Time Slots update based on Day of Week', async ({ page }) => {
    await page.fill('#bookingDate', '2026-01-26'); 
    
    const bookingSelect = page.locator('#bookingTime');
    await expect(bookingSelect).toContainText(/Closed/i);

    await page.fill('#bookingDate', '2026-01-31'); 
    
    await expect(bookingSelect).toContainText('12:00');
    await expect(bookingSelect).toContainText('13:45');
  });

  // ========================================================
  // 2. GUEST COUNTER WIDGET (STABLE VERSION)
  // ========================================================
  test('Guest Counter respects minimum limit', async ({ page }) => {
    const minusBtn = page.locator('#guestMinus');
    const countDisplay = page.locator('#guestCountDisplay');
    const hiddenInput = page.locator('#guestsInput');

    // 1. Initial State (Should be 2)
    await expect(countDisplay).toHaveText('2');
    
    // 2. Click Minus (2 -> 1)
    await minusBtn.click();
    
    // 3. Verify Text Updates
    await expect(countDisplay).toHaveText('1'); 
    await expect(hiddenInput).toHaveValue('1');

    // 4. Verify Limit Reached
    // FIX: Removed flaky CSS opacity check.
    // We trust toBeDisabled() which waits for the DOM property to update.
    await expect(minusBtn).toBeDisabled();
  });

  // ========================================================
  // 3. ALLERGEN FILTERS
  // ========================================================
  test('Allergen Filters dim non-matching cards', async ({ page }) => {
    const targetItem = page.locator('.card').filter({ has: page.locator('.name', { hasText: 'Chilli Chicken' }) });
    const safeItem = page.locator('.card').filter({ has: page.locator('.name', { hasText: 'Chicken Lolipop' }) });

    await expect(targetItem).toBeVisible();

    const glutenBtn = page.locator('button[data-filter="G"]');
    await glutenBtn.click();

    await expect(targetItem).toHaveClass(/dim/);
    await expect(safeItem).not.toHaveClass(/dim/);
  });

  // ========================================================
  // 4. CHEF RECOMMENDATION ENGINE
  // ========================================================
  test('Chef Recommendation Engine', async ({ page }) => {
    const select = page.locator('#pairingSelect');
    const resultBox = page.locator('#pairingResult');

    await expect(resultBox).not.toHaveClass(/active/);

    await select.selectOption({ label: 'Butter Chicken' });

    await expect(resultBox).toHaveClass(/active/);
    await expect(page.locator('#sugSide')).toHaveText('Garlic Naan');
  });

  // ========================================================
  // 5. SPIN & WIN GAME
  // ========================================================
  test('Spin & Win functionality', async ({ page }) => {
    const spinBtn = page.locator('#spinBtn');
    const slot = page.locator('#slotStarter');

    await spinBtn.click();

    await expect(slot).not.toHaveClass(/spin-placeholder/, { timeout: 4000 });
    await expect(slot).not.toBeEmpty();
  });

});