import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Test Configuration for NorAI Technologies
 * Follows playwright-best-practices guidelines.
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  timeout: 45000,
  workers: process.env.CI ? 2 : 4,

  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',

  use: {
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3000',
    navigationTimeout: 30000,
    actionTimeout: 15000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'off',
  },

  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.02,
      animations: 'disabled',
    },
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
      },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
