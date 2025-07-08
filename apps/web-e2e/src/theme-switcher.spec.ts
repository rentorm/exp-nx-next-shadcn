import { test, expect } from '@playwright/test';

test.describe('Theme Switcher', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should be able to switch between light and dark themes', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('domcontentloaded');

    // Find the theme switcher button
    const themeSwitcherButton = page.locator('button[aria-haspopup="menu"]').first();
    await expect(themeSwitcherButton).toBeVisible();

    // Click to open the dropdown
    await themeSwitcherButton.click();

    // Wait for dropdown to appear and verify menu items are visible
    await page.waitForSelector('[role="menu"]', { state: 'visible' });
    await expect(page.locator('[role="menuitem"]:has-text("Light")')).toBeVisible();
    await expect(page.locator('[role="menuitem"]:has-text("Dark")')).toBeVisible();
    await expect(page.locator('[role="menuitem"]:has-text("System")')).toBeVisible();

    // Click on Dark theme
    await page.locator('[role="menuitem"]:has-text("Dark")').click();

    // Verify the dark theme is applied by checking the document class
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Open dropdown again and select Light theme
    await themeSwitcherButton.click();
    await page.waitForSelector('[role="menu"]', { state: 'visible' });
    await page.locator('[role="menuitem"]:has-text("Light")').click();

    // Verify the light theme is applied
    await expect(page.locator('html')).not.toHaveClass(/dark/);
    await expect(page.locator('html')).toHaveClass(/light/);
  });

  test('should persist theme selection across page reloads', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('domcontentloaded');

    // Find the theme switcher button
    const themeSwitcherButton = page.locator('button[aria-haspopup="menu"]').first();
    
    // Switch to dark theme
    await themeSwitcherButton.click();
    await page.waitForSelector('[role="menu"]', { state: 'visible' });
    await page.locator('[role="menuitem"]:has-text("Dark")').click();

    // Verify dark theme is applied
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Reload the page
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    // Verify dark theme is still applied after reload
    await expect(page.locator('html')).toHaveClass(/dark/);
  });

  test('should show system theme option and apply it', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('domcontentloaded');

    // Find the theme switcher button
    const themeSwitcherButton = page.locator('button[aria-haspopup="menu"]').first();
    
    // Switch to system theme
    await themeSwitcherButton.click();
    await page.waitForSelector('[role="menu"]', { state: 'visible' });
    await page.locator('[role="menuitem"]:has-text("System")').click();

    // Verify that either light or dark class is applied (depends on system preference)
    const htmlElement = page.locator('html');
    const hasLightClass = await htmlElement.evaluate(el => el.classList.contains('light'));
    const hasDarkClass = await htmlElement.evaluate(el => el.classList.contains('dark'));
    
    // At least one should be true (system preference should be applied)
    expect(hasLightClass || hasDarkClass).toBeTruthy();
  });

  test('should show correct checkmarks for selected theme', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('domcontentloaded');

    // Find the theme switcher button
    const themeSwitcherButton = page.locator('button[aria-haspopup="menu"]').first();
    
    // Switch to dark theme
    await themeSwitcherButton.click();
    await page.waitForSelector('[role="menu"]', { state: 'visible' });
    await page.locator('[role="menuitem"]:has-text("Dark")').click();

    // Open dropdown again to check for checkmark
    await themeSwitcherButton.click();
    
    // Find the Dark option and verify it has a checkmark
    const darkOption = page.locator('div[role="menuitem"]').filter({ hasText: 'Dark' });
    await expect(darkOption).toContainText('✓');
    
    // Close dropdown by clicking outside
    await page.keyboard.press('Escape');
    
    // Switch to light theme
    await themeSwitcherButton.click();
    await page.getByText('Light').click();

    // Open dropdown again to check for checkmark
    await themeSwitcherButton.click();
    
    // Find the Light option and verify it has a checkmark
    const lightOption = page.locator('div[role="menuitem"]').filter({ hasText: 'Light' });
    await expect(lightOption).toContainText('✓');
  });
});