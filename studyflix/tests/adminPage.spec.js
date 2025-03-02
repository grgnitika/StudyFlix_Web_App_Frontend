import { test, expect } from '@playwright/test';

test.use({ storageState: 'storageStateAdmin.json' });

test.describe('Admin Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Mock API responses
    await page.route('http://localhost:5000/auth/total-users', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: 100 }),
      })
    );

    await page.route('http://localhost:5000/auth/all-users', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: [
            { userName: 'JohnDoe', userEmail: 'john@example.com' },
            { userName: 'JaneDoe', userEmail: 'jane@example.com' },
          ],
        }),
      })
    );

    await page.route('http://localhost:5000/media/total-videos', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: 50 }),
      })
    );

    await page.goto('/instructor');
  });

  test('should render dashboard with correct data', async ({ page }) => {
    await expect(page.getByText('Total Number of Learners')).toBeVisible();
    await expect(page.getByText('100')).toBeVisible();

    await expect(page.getByText('Total Number of Videos')).toBeVisible();
    await expect(page.getByText('50')).toBeVisible();

    await expect(page.getByText('Users List')).toBeVisible();
    await expect(page.getByText('JohnDoe')).toBeVisible();
    await expect(page.getByText('JaneDoe')).toBeVisible();
  });

  test('should handle API errors gracefully', async ({ page }) => {
    await page.route('http://localhost:5000/auth/total-users', (route) =>
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' }),
      })
    );

    await page.reload();

    await expect(page.getByText('Total Number of Learners')).toBeVisible();
    await expect(page.getByText('100')).not.toBeVisible();
  });

  test('should display welcome message for admin', async ({ page }) => {
    await expect(page.getByText('Welcome Back Admin!')).toBeVisible();
  });

  test('should navigate to courses tab and display "All Courses" card', async ({ page }) => {
    await page.getByRole('button', { name: 'Courses' }).click();
    await expect(page.getByText('All Courses')).toBeVisible();
  });

  test('should navigate to create study material page when "Create New Study Material" button is clicked', async ({ page }) => {
    await page.getByRole('button', { name: 'Courses' }).click();
    await page.getByRole('button', { name: 'Create New Study Material' }).click();
    
    await expect(page).toHaveURL('http://localhost:5173/instructor/create-new-course');
  });

  test('should show dashboard when clicking the Dashboard tab', async ({ page }) => {
    await page.getByRole('button', { name: 'Dashboard' }).click();
    await expect(page.getByText('Admin Dashboard')).toBeVisible();
  });

  test('should log out successfully when Logout button is clicked', async ({ page }) => {
    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page).toHaveURL('/auth'); 
  });

  test('should display the logo correctly', async ({ page }) => {
    const logo = page.locator('img[alt="Logo"]');
    await expect(logo).toBeVisible();
  });
});


