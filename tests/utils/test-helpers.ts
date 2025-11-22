import { type Page, expect } from '@playwright/test';

/**
 * Wait for network to be idle (useful after form submissions)
 */
export async function waitForNetworkIdle(page: Page, timeout = 5000) {
  await page.waitForLoadState('networkidle', { timeout });
}

/**
 * Fill a form field and wait for it to be filled
 */
export async function fillField(page: Page, selector: string, value: string) {
  await page.fill(selector, value);
  await expect(page.locator(selector)).toHaveValue(value);
}

/**
 * Click a button and wait for navigation if it occurs
 */
export async function clickAndWait(page: Page, selector: string) {
  await page.click(selector);
  await page.waitForLoadState('domcontentloaded');
}

/**
 * Check if an element is visible on the page
 */
export async function isVisible(page: Page, selector: string): Promise<boolean> {
  try {
    await page.waitForSelector(selector, { state: 'visible', timeout: 2000 });
    return true;
  } catch {
    return false;
  }
}

/**
 * Scroll an element into view
 */
export async function scrollIntoView(page: Page, selector: string) {
  await page.locator(selector).scrollIntoViewIfNeeded();
}

/**
 * Wait for a toast/notification message
 */
export async function waitForToast(page: Page, expectedText?: string, timeout = 5000) {
  const toast = page.locator('[role="status"], [role="alert"], .toast, [data-sonner-toast]');
  await toast.waitFor({ state: 'visible', timeout });

  if (expectedText) {
    await expect(toast).toContainText(expectedText);
  }

  return toast;
}

/**
 * Mock an API endpoint
 */
export async function mockApiRoute(
  page: Page,
  url: string | RegExp,
  response: any,
  status = 200
) {
  await page.route(url, async (route) => {
    await route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify(response),
    });
  });
}

/**
 * Clear all cookies and local storage
 */
export async function clearBrowserData(page: Page) {
  await page.context().clearCookies();
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
}

/**
 * Take a screenshot with a descriptive name
 */
export async function takeScreenshot(page: Page, name: string) {
  await page.screenshot({
    path: `tests/screenshots/${name}-${Date.now()}.png`,
    fullPage: true,
  });
}

/**
 * Wait for a specific selector to disappear (useful for loading states)
 */
export async function waitForDisappear(page: Page, selector: string, timeout = 5000) {
  await page.waitForSelector(selector, { state: 'hidden', timeout });
}

/**
 * Generate a unique email for testing
 */
export function generateTestEmail(prefix = 'test'): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(7);
  return `${prefix}-${timestamp}-${random}@example.com`;
}

/**
 * Generate test data for forms
 */
export function generateTestData() {
  const timestamp = Date.now();

  return {
    name: `Test User ${timestamp}`,
    email: generateTestEmail('e2e'),
    company: `Test Company ${timestamp}`,
    phone: '555-1234',
    message: 'This is an automated test submission',
  };
}
