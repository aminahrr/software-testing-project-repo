import { PlaywrightTestConfig } from '@playwright/test';

const isCI = process.env.CI === 'true';

const config: PlaywrightTestConfig = {
  timeout: isCI ? 90000 : 60000, // Extend timeout for CI
  retries: isCI ? 2 : 0, // Retry tests only in CI
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: isCI ? 20000 : 15000, // Increase action timeout for CI
    navigationTimeout: isCI ? 30000 : 20000, // Increase navigation timeout for CI
    ignoreHTTPSErrors: true,
    video: isCI ? 'on-first-retry' : 'retain-on-failure', // Debugging videos only for CI
    screenshot: 'only-on-failure',
    trace: isCI ? 'retain-on-failure' : 'off', // Capture trace for CI failures
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
      name: 'Webkit',
      use: { browserName: 'webkit' },
    },
  ],
  reporter: [
    ['list'],
    ['html', { open: 'never' }], // Generate HTML report for CI
  ],
  outputDir: 'test-results/', // Store artifacts in a specific folder
};

export default config;