import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  use: {
    baseURL: process.env.CRAWLAB_BASE_URL ?? 'http://127.0.0.1:8090',
  },
});
