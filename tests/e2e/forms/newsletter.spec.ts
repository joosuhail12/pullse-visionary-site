import { test, expect } from '@playwright/test';
import { newsletterData, mockApiResponses } from '../../fixtures/test-data';
import { fillField, generateTestEmail, mockApiRoute } from '../../utils/test-helpers';

test.describe('Newsletter Subscription Form', () => {
  test.describe('Compact Form (Footer)', () => {
    test.beforeEach(async ({ page }) => {
      // Go to home page (has footer)
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
    });

    test('should display newsletter form in footer', async ({ page }) => {
      // Scroll to footer
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

      // Wait for footer newsletter form
      const newsletterSection = page.locator('footer, [data-newsletter]').first();
      await newsletterSection.scrollIntoViewIfNeeded();

      // Check for email input in footer
      const emailInput = page.locator('footer input[type="email"], footer input[name="email"]').first();
      await expect(emailInput).toBeVisible({ timeout: 5000 });
    });

    test('should subscribe successfully with compact form', async ({ page }) => {
      // Mock API response
      await mockApiRoute(
        page,
        '**/api/newsletter',
        mockApiResponses.newsletter.success,
        200
      );

      // Scroll to footer
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

      // Find and fill email input in footer
      const emailInput = page.locator('footer input[type="email"], footer input[name="email"]').first();
      await emailInput.scrollIntoViewIfNeeded();
      await emailInput.fill(generateTestEmail('newsletter-footer'));

      // Find and click subscribe button
      const subscribeButton = page.locator('footer button:has-text("Subscribe"), footer button[type="submit"]').first();
      await subscribeButton.click();

      // Wait for success message
      await expect(page.locator('text=/subscribed|success|thank you/i')).toBeVisible({ timeout: 5000 });
    });

    test('should validate email in compact form', async ({ page }) => {
      // Scroll to footer
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

      // Find email input
      const emailInput = page.locator('footer input[type="email"]').first();
      await emailInput.scrollIntoViewIfNeeded();

      // Fill with invalid email
      await emailInput.fill(newsletterData.invalid.invalidEmail);

      // Try to subscribe
      const subscribeButton = page.locator('footer button:has-text("Subscribe"), footer button[type="submit"]').first();
      await subscribeButton.click();

      // Should show validation error (either browser validation or custom)
      // Check for HTML5 validation or custom error message
      const hasValidationError = await Promise.race([
        emailInput.evaluate((el: HTMLInputElement) => !el.validity.valid).catch(() => false),
        page.locator('text=/invalid email|please enter.*valid email/i').isVisible({ timeout: 2000 }).catch(() => false),
      ]);

      expect(hasValidationError).toBeTruthy();
    });
  });

  test.describe('Standard Form (Blog Pages)', () => {
    test.beforeEach(async ({ page }) => {
      // Go to blog page
      await page.goto('/blog');
      await page.waitForLoadState('domcontentloaded');
    });

    test('should display newsletter form with name fields', async ({ page }) => {
      // Look for newsletter form on blog page
      const newsletterForm = page.locator('form:has(input[name="email"]):has(input[name="firstName"], input[name="first_name"])').first();

      if (await newsletterForm.isVisible({ timeout: 3000 })) {
        // Verify all fields are present
        await expect(newsletterForm.locator('input[name="firstName"], input[name="first_name"]')).toBeVisible();
        await expect(newsletterForm.locator('input[name="lastName"], input[name="last_name"]')).toBeVisible();
        await expect(newsletterForm.locator('input[type="email"]')).toBeVisible();
      }
    });

    test('should subscribe with full form data', async ({ page }) => {
      // Mock API response
      await mockApiRoute(
        page,
        '**/api/newsletter',
        mockApiResponses.newsletter.success,
        200
      );

      // Find newsletter form
      const newsletterForm = page.locator('form:has(input[name="email"]):has(input[name="firstName"], input[name="first_name"])').first();

      if (await newsletterForm.isVisible({ timeout: 3000 })) {
        // Fill form
        await newsletterForm.locator('input[name="firstName"], input[name="first_name"]').fill(newsletterData.valid.firstName);
        await newsletterForm.locator('input[name="lastName"], input[name="last_name"]').fill(newsletterData.valid.lastName);
        await newsletterForm.locator('input[type="email"]').fill(generateTestEmail('newsletter-blog'));

        // Submit
        await newsletterForm.locator('button[type="submit"]').click();

        // Wait for success message
        await expect(page.locator('text=/subscribed|success|thank you/i')).toBeVisible({ timeout: 5000 });
      }
    });
  });

  test.describe('Duplicate Subscription', () => {
    test('should handle duplicate email subscription', async ({ page }) => {
      // Mock duplicate response
      await mockApiRoute(
        page,
        '**/api/newsletter',
        mockApiResponses.newsletter.duplicate,
        409
      );

      await page.goto('/');
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

      // Fill and submit
      const emailInput = page.locator('footer input[type="email"]').first();
      await emailInput.scrollIntoViewIfNeeded();
      await emailInput.fill(generateTestEmail('duplicate'));

      const subscribeButton = page.locator('footer button:has-text("Subscribe"), footer button[type="submit"]').first();
      await subscribeButton.click();

      // Should show duplicate error
      await expect(page.locator('text=/already subscribed|duplicate/i')).toBeVisible({ timeout: 5000 });
    });
  });
});
