import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Directory containing the test files
  testDir: './tests',

  // Global timeout for each test (60 seconds)
  timeout: 60000,

  // Expect timeout (10 seconds)
  expect: {
    timeout: 10000,
  },

  // Shared settings for all projects
  use: {
    headless: true,
    baseURL: 'http://localhost:5173',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },

  // Configure projects
  projects: [
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Specify the global setup file using a relative path
  globalSetup: './global-setup.js',

  // Configure the HTML reporter without auto-opening
  reporter: [
    ['html', { outputFolder: 'playwright-report' }]
  ],
});
