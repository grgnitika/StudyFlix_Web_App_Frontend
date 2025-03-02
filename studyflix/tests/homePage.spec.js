import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173';

// Use the storage state file generated in the global setup step
test.use({ storageState: 'storageStateUser.json' });

test.describe('Student Home Page Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the home page for each test
    await page.goto(`${BASE_URL}/home`);

    // Intercept the API call that fetches student courses to return an empty list,
    // ensuring the "No Learning Materials Found" message appears.
    await page.route('**/api/student/courses', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: []
        }),
      });
    });
  });

  test('Homepage should have correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/StudyFlix/);
  });

  test('Banner image should be visible', async ({ page }) => {
    const banner = page.locator('img[alt="Banner"]');
    await expect(banner).toBeVisible();
  });

  test('Video Categories section title should be visible', async ({ page }) => {
    const title = page.locator('text=Video Categories');
    await expect(title).toBeVisible();
  });

  test('Clicking the category button navigates to the correct URL', async ({ page }) => {
    // Locate the specific button by its visible text
    await page.locator('button:has-text("Web Development")').click();
  
    // Check the resulting URL, either an exact string or a regex
    await expect(page).toHaveURL('http://localhost:5173/courses?category=web-development');
  
    // If you prefer a regex (and you don't mind what else might be appended):
    // await expect(page).toHaveURL(/\/courses\?category=artificial-intelligence/);
  });
  

  test('Common header displays logo and navigation buttons', async ({ page }) => {
    await expect(page.locator('img[alt="StudyFlix Logo"]')).toBeVisible();
    await expect(page.locator('text=Explore Learning Materials')).toBeVisible();
    await expect(page.locator('text=Watched Videos')).toBeVisible();
    await expect(page.locator('text=Sign Out')).toBeVisible();
  });

  test('Clicking "Explore Learning Materials" navigates to courses page', async ({ page }) => {
    await page.locator('text=Explore Learning Materials').click();
    await expect(page).toHaveURL(/.*\/courses/);
  });

  test('Clicking "Sign Out" logs out and redirects to auth page', async ({ page }) => {
    await page.locator('text=Sign Out').click();

    // Wait for redirection to the login page (/auth)
    await expect(page).toHaveURL(/.*\/auth/);

    // Verify that session storage is cleared after logout
    const sessionLength = await page.evaluate(() => sessionStorage.length);
    expect(sessionLength).toBe(0);
  });
});
