import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E Test Configuration for SageBox Website
 */
export default defineConfig({
  testDir: './tests/website',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { open: 'never' }], ['list']],
  /* Shared settings for all the projects below. */
  use: {
    /* Base URL for the dev server */
    baseURL: 'http://localhost:4352',

    /* Collect trace when retrying the failed test. */
    trace: 'on-first-retry',

    /* Screenshot on failure */
    screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Run the Astro dev server before starting the tests */
  // webServer: {
  //   command: 'npm run website:dev -- --port 4324',
  //   url: 'http://localhost:4324/sagebox',
  //   reuseExistingServer: true,
  //   timeout: 120 * 1000,
  // },
});
