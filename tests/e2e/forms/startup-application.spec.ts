import { test, expect } from '@playwright/test';
import { startupApplicationData, mockApiResponses } from '../../fixtures/test-data';
import { fillField, generateTestEmail, mockApiRoute } from '../../utils/test-helpers';

test.describe('Startup Application Form', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to startup application page
    await page.goto('/apply/startup');

    // Wait for page to load
    await page.waitForSelector('form', { timeout: 10000 });
  });

  test('should display the application form', async ({ page }) => {
    // Check that form is visible
    await expect(page.locator('form')).toBeVisible();

    // Check step 1 fields are visible
    await expect(page.locator('input[name="companyName"]')).toBeVisible();
    await expect(page.locator('input[name="website"]')).toBeVisible();
  });

  test('should successfully submit the application through all 3 steps', async ({ page }) => {
    // Mock the API response
    await mockApiRoute(
      page,
      '**/api/startup-application',
      mockApiResponses.startupApplication.success,
      201
    );

    // Step 1: Company Information
    await fillField(page, 'input[name="companyName"]', startupApplicationData.valid.companyName);
    await fillField(page, 'input[name="website"]', startupApplicationData.valid.website);
    await fillField(page, 'input[name="email"]', generateTestEmail('startup'));
    await fillField(page, 'input[name="foundingDate"]', startupApplicationData.valid.foundingDate);

    // Click Next to step 2
    await page.click('button:has-text("Next"), button:has-text("Continue")');

    // Wait for step 2
    await page.waitForSelector('[data-step="2"], select[name="annualRevenue"], [name="annualRevenue"]', { timeout: 5000 });

    // Step 2: Financial Information
    await page.selectOption('select[name="annualRevenue"], [name="annualRevenue"]', startupApplicationData.valid.annualRevenue);
    await page.selectOption('select[name="totalFunding"], [name="totalFunding"]', startupApplicationData.valid.totalFunding);
    await fillField(page, 'input[name="seatsNeeded"]', startupApplicationData.valid.seatsNeeded);
    await page.selectOption('select[name="customerStatus"], [name="customerStatus"]', startupApplicationData.valid.customerStatus);

    // Click Next to step 3
    await page.click('button:has-text("Next"), button:has-text("Continue")');

    // Wait for step 3
    await page.waitForSelector('[data-step="3"], textarea[name="currentTools"], [name="currentTools"]', { timeout: 5000 });

    // Step 3: Additional Information
    const currentToolsField = page.locator('textarea[name="currentTools"], input[name="currentTools"]');
    if (await currentToolsField.isVisible()) {
      await currentToolsField.fill(startupApplicationData.valid.currentTools);
    }

    const useCaseField = page.locator('textarea[name="useCase"]');
    if (await useCaseField.isVisible()) {
      await useCaseField.fill(startupApplicationData.valid.useCase);
    }

    // Submit the form
    await page.click('button[type="submit"]:has-text("Submit"), button:has-text("Apply")');

    // Wait for success state
    await page.waitForSelector(
      'text=/submitted|success|thank you|application received/i',
      { timeout: 10000 }
    );

    // Verify success message
    await expect(page.locator('text=/submitted successfully|application.*submitted|thank you/i')).toBeVisible();
  });

  test('should validate website URL format', async ({ page }) => {
    // Fill with invalid website
    await fillField(page, 'input[name="companyName"]', startupApplicationData.valid.companyName);
    await fillField(page, 'input[name="website"]', startupApplicationData.invalid.invalidWebsite);
    await fillField(page, 'input[name="email"]', generateTestEmail('validation'));
    await fillField(page, 'input[name="foundingDate"]', startupApplicationData.valid.foundingDate);

    // Try to proceed
    await page.click('button:has-text("Next"), button:has-text("Continue")');

    // Should show validation error
    await expect(page.locator('text=/invalid.*url|valid.*website|must.*http/i')).toBeVisible({ timeout: 3000 });
  });

  test('should validate email format', async ({ page }) => {
    // Fill with invalid email
    await fillField(page, 'input[name="companyName"]', startupApplicationData.valid.companyName);
    await fillField(page, 'input[name="website"]', startupApplicationData.valid.website);
    await fillField(page, 'input[name="email"]', startupApplicationData.invalid.invalidEmail);
    await fillField(page, 'input[name="foundingDate"]', startupApplicationData.valid.foundingDate);

    // Try to proceed
    await page.click('button:has-text("Next"), button:has-text("Continue")');

    // Should show validation error
    await expect(page.locator('text=/invalid email|email.*required/i')).toBeVisible({ timeout: 3000 });
  });

  test('should validate seats within 1-15 range', async ({ page }) => {
    // Get to step 2
    await fillField(page, 'input[name="companyName"]', startupApplicationData.valid.companyName);
    await fillField(page, 'input[name="website"]', startupApplicationData.valid.website);
    await fillField(page, 'input[name="email"]', generateTestEmail('seats'));
    await fillField(page, 'input[name="foundingDate"]', startupApplicationData.valid.foundingDate);

    await page.click('button:has-text("Next"), button:has-text("Continue")');
    await page.waitForSelector('select[name="annualRevenue"], [name="annualRevenue"]');

    await page.selectOption('select[name="annualRevenue"], [name="annualRevenue"]', startupApplicationData.valid.annualRevenue);
    await page.selectOption('select[name="totalFunding"], [name="totalFunding"]', startupApplicationData.valid.totalFunding);

    // Try invalid seats (0)
    await fillField(page, 'input[name="seatsNeeded"]', startupApplicationData.invalid.invalidSeats);
    await page.selectOption('select[name="customerStatus"], [name="customerStatus"]', startupApplicationData.valid.customerStatus);

    await page.click('button:has-text("Next"), button:has-text("Continue")');

    // Should show validation error
    await expect(page.locator('text=/at least 1|minimum.*1|seats.*required/i')).toBeVisible({ timeout: 3000 });

    // Try too many seats (> 15)
    await fillField(page, 'input[name="seatsNeeded"]', startupApplicationData.invalid.tooManySeats);

    await page.click('button:has-text("Next"), button:has-text("Continue")');

    // Should show validation error
    await expect(page.locator('text=/maximum.*15|too many|exceeds/i')).toBeVisible({ timeout: 3000 });
  });

  test('should navigate between steps', async ({ page }) => {
    // Fill step 1
    await fillField(page, 'input[name="companyName"]', startupApplicationData.valid.companyName);
    await fillField(page, 'input[name="website"]', startupApplicationData.valid.website);
    await fillField(page, 'input[name="email"]', generateTestEmail('navigation'));
    await fillField(page, 'input[name="foundingDate"]', startupApplicationData.valid.foundingDate);

    // Go to step 2
    await page.click('button:has-text("Next"), button:has-text("Continue")');
    await page.waitForSelector('select[name="annualRevenue"], [name="annualRevenue"]');

    // Go back to step 1
    const backButton = page.locator('button:has-text("Back"), button:has-text("Previous")');
    if (await backButton.isVisible()) {
      await backButton.click();

      // Verify we're back on step 1
      await expect(page.locator('input[name="companyName"]')).toBeVisible();
      // Check if the previously entered data persists
      await expect(page.locator('input[name="companyName"]')).toHaveValue(startupApplicationData.valid.companyName);
    }
  });

  test('should require all mandatory fields', async ({ page }) => {
    // Try to submit without filling anything
    await page.click('button:has-text("Next"), button:has-text("Continue")');

    // Should show validation errors
    const errorMessages = page.locator('text=/required|must.*provide|cannot be empty/i');
    await expect(errorMessages.first()).toBeVisible({ timeout: 3000 });
  });
});
