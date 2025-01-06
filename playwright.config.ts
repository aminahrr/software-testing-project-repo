import { PlaywrightTestConfig } from '@playwright/test';

const isCI = process.env.CI === 'true';

const config: PlaywrightTestConfig = {
  timeout: isCI ? 90000 : 60000, // Global test timeout
  retries: 5,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: isCI ? 20000 : 15000, // Timeout for each action
    navigationTimeout: isCI ? 30000 : 20000, // Timeout for navigation
    ignoreHTTPSErrors: true,
    video: isCI ? 'on-first-retry' : 'retain-on-failure', // Record video only in CI
    screenshot: 'only-on-failure',
    trace: isCI ? 'retain-on-failure' : 'off', // Capture trace for debugging in CI
  },
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'Firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'WebKit',
      use: {
        browserName: 'webkit',
        viewport: { width: 1280, height: 720 },
        launchOptions: {
          args: ['--disable-features=SameSiteByDefaultCookies'], // Optional: Fix cookie issues in WebKit
        }
      }
    },
  ],
  reporter: [
    ['list'], // Console output
    ['html', { open: 'never' }], // Generate HTML report for CI
  ],
  outputDir: 'test-results/', // Store artifacts like screenshots and videos
};

export default config;