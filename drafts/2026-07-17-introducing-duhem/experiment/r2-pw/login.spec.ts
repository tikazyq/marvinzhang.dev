import { test, expect } from '@playwright/test';

const LOGIN_URL = '/next/login';
const GUARDED_URL = '/next/projects';
const USERNAME = process.env.CRAWLAB_USERNAME ?? 'admin';
const PASSWORD = process.env.CRAWLAB_PASSWORD ?? 'admin';

test.describe('ui-next auth smoke', () => {
  test('serves the sign-in page at /next/login', async ({ page }) => {
    await page.goto(LOGIN_URL);
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible({ timeout: 20_000 });
    await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible({ timeout: 10_000 });
    await expect(page).toHaveURL(/\/next\/login/);
  });

  test('guards an unauthenticated deep-link back to sign-in', async ({ page }) => {
    await page.goto(GUARDED_URL);
    await expect(page).toHaveURL(/\/next\/login/, { timeout: 15_000 });
    await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible({ timeout: 10_000 });
  });

  test('real sign-in reaches the authed dashboard and a gated surface', async ({ page }) => {
    await page.goto(LOGIN_URL);
    await page.getByRole('textbox', { name: 'Username' }).fill(USERNAME);
    await page.getByLabel('Password').fill(PASSWORD);
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page.getByRole('button', { name: 'Log in' })).toHaveCount(0, { timeout: 15_000 });
    await expect(page).toHaveURL(/\/next\/$/, { timeout: 15_000 });
    await expect(page.getByRole('heading', { name: 'Home' })).toBeVisible({ timeout: 10_000 });
    await page.goto(GUARDED_URL);
    await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible({ timeout: 15_000 });
    await expect(page).toHaveURL(/\/next\/projects/, { timeout: 10_000 });
  });
});
