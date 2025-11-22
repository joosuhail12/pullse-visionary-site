import { test, expect } from '@playwright/test';
import { contactSalesData, mockApiResponses } from '../../fixtures/test-data';
import { fillField, generateTestEmail, mockApiRoute } from '../../utils/test-helpers';

test.describe('Contact Sales Form', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to contact sales page
    await page.goto('/contact-sales');

    // Wait for page to load
    await page.waitForSelector('form', { timeout: 10000 });
  });

  test('should display the form with all steps', async ({ page }) => {
    // Check that form is visible
    await expect(page.locator('form')).toBeVisible();

    // Check step 1 fields are visible
    await expect(page.getByLabel(/name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
  });

  test('should successfully submit the form through all 3 steps', async ({ page }) => {
    // Mock the API response
    await mockApiRoute(
      page,
      '**/api/contact-sales',
      mockApiResponses.contactSales.success,
      201
    );

    // Step 1: Contact Information
    await fillField(page, 'input[name="name"]', contactSalesData.valid.name);
    await fillField(page, 'input[name="email"]', generateTestEmail('contact-sales'));
    await fillField(page, 'input[name="phone"]', contactSalesData.valid.phone);

    // Click Next/Continue to step 2
    await page.click('button:has-text("Next"), button:has-text("Continue")');

    // Wait for step 2
    await page.waitForSelector('[data-step="2"], input[name="company"]', { timeout: 5000 });

    // Step 2: Company Information
    await fillField(page, 'input[name="company"]', contactSalesData.valid.company);

    // Select company size
    const companySizeSelector = 'select[name="companySize"], [name="companySize"]';
    if (await page.locator(companySizeSelector).count() > 0) {
      await page.selectOption(companySizeSelector, contactSalesData.valid.companySize);
    }

    // Select industry
    const industrySelector = 'select[name="industry"], [name="industry"]';
    if (await page.locator(industrySelector).count() > 0) {
      await page.selectOption(industrySelector, contactSalesData.valid.industry);
    }

    // Click Next to step 3
    await page.click('button:has-text("Next"), button:has-text("Continue")');

    // Wait for step 3
    await page.waitForSelector('[data-step="3"], [name="timeline"]', { timeout: 5000 });

    // Step 3: Project Details
    const timelineSelector = 'select[name="timeline"], [name="timeline"]';
    if (await page.locator(timelineSelector).count() > 0) {
      await page.selectOption(timelineSelector, contactSalesData.valid.timeline);
    }

    // Fill optional fields
    const currentSolutionField = page.locator('input[name="currentSolution"], textarea[name="currentSolution"]');
    if (await currentSolutionField.isVisible()) {
      await currentSolutionField.fill(contactSalesData.valid.currentSolution);
    }

    const messageField = page.locator('textarea[name="message"]');
    if (await messageField.isVisible()) {
      await messageField.fill(contactSalesData.valid.message);
    }

    // Submit the form
    await page.click('button[type="submit"]:has-text("Submit"), button:has-text("Book Demo")');

    // Wait for success state
    await page.waitForSelector(
      'text=/submitted|success|thank you|calendar|book/i',
      { timeout: 10000 }
    );

    // Verify success message or calendar widget appears
    const hasSuccessMessage = await page.locator('text=/submitted successfully|thank you/i').isVisible();
    const hasCalendar = await page.locator('[data-cal-namespace], iframe[src*="cal.com"]').isVisible();

    expect(hasSuccessMessage || hasCalendar).toBeTruthy();
  });

  test('should validate email format in step 1', async ({ page }) => {
    // Fill with invalid email
    await fillField(page, 'input[name="name"]', contactSalesData.valid.name);
    await fillField(page, 'input[name="email"]', contactSalesData.invalid.invalidEmail);

    // Try to proceed
    await page.click('button:has-text("Next"), button:has-text("Continue")');

    // Should show validation error
    await expect(page.locator('text=/invalid email|email.*required/i')).toBeVisible({ timeout: 3000 });
  });

  test('should require name field', async ({ page }) => {
    // Fill email but leave name empty
    await fillField(page, 'input[name="email"]', generateTestEmail('validation'));

    // Try to proceed
    await page.click('button:has-text("Next"), button:has-text("Continue")');

    // Should show validation error
    await expect(page.locator('text=/name.*required|please enter.*name/i')).toBeVisible({ timeout: 3000 });
  });

  test('should navigate between steps', async ({ page }) => {
    // Fill step 1
    await fillField(page, 'input[name="name"]', contactSalesData.valid.name);
    await fillField(page, 'input[name="email"]', generateTestEmail('navigation'));

    // Go to step 2
    await page.click('button:has-text("Next"), button:has-text("Continue")');
    await page.waitForSelector('input[name="company"]');

    // Go back to step 1
    const backButton = page.locator('button:has-text("Back"), button:has-text("Previous")');
    if (await backButton.isVisible()) {
      await backButton.click();

      // Verify we're back on step 1
      await expect(page.locator('input[name="name"]')).toBeVisible();
      // Check if the previously entered data persists
      await expect(page.locator('input[name="name"]')).toHaveValue(contactSalesData.valid.name);
    }
  });

  test('should handle duplicate submission error', async ({ page }) => {
    // Mock duplicate submission response
    await mockApiRoute(
      page,
      '**/api/contact-sales',
      mockApiResponses.contactSales.duplicate,
      409
    );

    // Fill and submit form quickly through all steps
    await fillField(page, 'input[name="name"]', contactSalesData.valid.name);
    await fillField(page, 'input[name="email"]', generateTestEmail('duplicate'));
    await page.click('button:has-text("Next"), button:has-text("Continue")');

    await page.waitForSelector('input[name="company"]');
    await fillField(page, 'input[name="company"]', contactSalesData.valid.company);
    await page.click('button:has-text("Next"), button:has-text("Continue")');

    await page.waitForTimeout(500);
    await page.click('button[type="submit"]:has-text("Submit"), button:has-text("Book Demo")');

    // Should show duplicate submission error
    await expect(page.locator('text=/already submitted|duplicate/i')).toBeVisible({ timeout: 5000 });
  });

  test('should handle rate limit error', async ({ page }) => {
    // Mock rate limit response
    await mockApiRoute(
      page,
      '**/api/contact-sales',
      mockApiResponses.contactSales.rateLimit,
      429
    );

    // Submit form
    await fillField(page, 'input[name="name"]', contactSalesData.valid.name);
    await fillField(page, 'input[name="email"]', generateTestEmail('ratelimit'));
    await page.click('button:has-text("Next"), button:has-text("Continue")');

    await page.waitForSelector('input[name="company"]');
    await fillField(page, 'input[name="company"]', contactSalesData.valid.company);
    await page.click('button:has-text("Next"), button:has-text("Continue")');

    await page.waitForTimeout(500);
    await page.click('button[type="submit"]:has-text("Submit"), button:has-text("Book Demo")');

    // Should show rate limit error
    await expect(page.locator('text=/too many|rate limit|try again/i')).toBeVisible({ timeout: 5000 });
  });
});
