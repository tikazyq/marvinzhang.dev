import { test, expect } from '@playwright/test';

const LOGIN_URL = '/next/login';
const GUARDED_URL = '/next/projects';
const USERNAME = process.env.CRAWLAB_USERNAME ?? 'admin';
const PASSWORD = process.env.CRAWLAB_PASSWORD ?? 'admin';

test.describe('ui-next auth smoke', () => {
  // The ui-next React app is served at /next/ and boots: loading the
  // sign-in page renders the login form — the Username field and the
  // Sign In button — with its i18n resolved. This is the smoke that a
  // broken bundle, a missing `/next` nginx location, or an i18n/router
  // boot crash (none of which the REST gate sees) turns RED.
  test('serves the sign-in page at /next/login', async ({ page }) => {
    await page.goto(LOGIN_URL);
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible({ timeout: 20_000 });
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible({ timeout: 10_000 });
    await expect(page).toHaveURL(/\/next\/login/);
  });

  // Route protection works end-to-end through the real app: an
  // unauthenticated deep-link to an auth-gated route (/next/projects) is
  // redirected to the sign-in page by the client auth guard. Proves
  // TanStack routing + the guard + a deep-link boot (nginx SPA fallback
  // to /next/index.html), without needing a password Duhem can't type.
  test('guards an unauthenticated deep-link back to sign-in', async ({ page }) => {
    await page.goto(GUARDED_URL);
    await expect(page).toHaveURL(/\/next\/login/, { timeout: 15_000 });
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible({ timeout: 10_000 });
  });

  // A real sign-in through the /next UI reaches the authenticated app:
  // the form POSTs to the backend `/api/login`, the token is stored, and
  // the auth-gated Home dashboard renders — then an auth-gated surface
  // (Projects) renders without a guard redirect. Exercises the full
  // client auth path + authed routing end to end, not just the login
  // shell. The password field (no ARIA `textbox` role) is reached by its
  // label — the capability duhem 0.1.2 added (#240).
  test('real sign-in reaches the authed dashboard and a gated surface', async ({ page }) => {
    await page.goto(LOGIN_URL);
    await page.getByRole('textbox', { name: 'Username' }).fill(USERNAME);
    await page.getByLabel('Password').fill(PASSWORD);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.getByRole('button', { name: 'Sign In' })).toHaveCount(0, { timeout: 15_000 });
    await expect(page).toHaveURL(/\/next\/$/, { timeout: 15_000 });
    await expect(page.getByRole('heading', { name: 'Home' })).toBeVisible({ timeout: 10_000 });
    await page.goto(GUARDED_URL);
    await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible({ timeout: 15_000 });
    await expect(page).toHaveURL(/\/next\/projects/, { timeout: 10_000 });
  });
});
