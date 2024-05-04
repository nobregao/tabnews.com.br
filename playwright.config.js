import { defineConfig, devices } from '@playwright/test';
import { config } from 'dotenv';

config({ path: './.env.test' });

const PORT = process.env.PORT || 3000;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: 'tests/integration/e2e',
  testMatch: '**/*.spec.js',
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    reuseExistingServer: !process.env.CI,
    url: baseURL,
  },
});