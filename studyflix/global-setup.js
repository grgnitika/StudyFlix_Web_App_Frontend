// global-setup.js
import { chromium } from '@playwright/test';

async function globalSetup() {
  const browser = await chromium.launch();

  // Setup for regular user
  const userContext = await browser.newContext();
  const userPage = await userContext.newPage();

  await userPage.route('http://localhost:5000/auth', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        token: 'mock-user-token',
        role: 'user',
      }),
    });
  });

  await userPage.goto('http://localhost:5173/auth');
  await userPage.fill('input[name="userEmail"]', 'test@email.com');
  await userPage.fill('input[name="password"]', '12345');
  await userPage.click('button[type="submit"]');
  await userPage.waitForURL('http://localhost:5173/home');

  await userContext.storageState({ path: 'storageStateUser.json' });
  await userContext.close();

  // Setup for admin
  const adminContext = await browser.newContext();
  const adminPage = await adminContext.newPage();

  await adminPage.route('http://localhost:5000/auth', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        token: 'mock-admin-token',
        role: 'admin',
      }),
    });
  });

  await adminPage.goto('http://localhost:5173/auth');
  await adminPage.fill('input[name="userEmail"]', 'admin1234@example.com');
  await adminPage.fill('input[name="password"]', 'admin1234');
  await adminPage.click('button[type="submit"]');
  await adminPage.waitForURL('http://localhost:5173/instructor');

  await adminContext.storageState({ path: 'storageStateAdmin.json' });
  await adminContext.close();

  await browser.close();
}

export default globalSetup;
