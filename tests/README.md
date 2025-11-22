# E2E Testing with Playwright

This directory contains end-to-end tests for the Pullse marketing website using Playwright.

## Directory Structure

```
tests/
├── e2e/
│   ├── forms/              # Form submission tests
│   │   ├── contact-sales.spec.ts
│   │   ├── newsletter.spec.ts
│   │   └── startup-application.spec.ts
│   ├── navigation/         # Navigation and routing tests (to be added)
│   └── pages/              # Page load tests (to be added)
├── fixtures/               # Test data and mock responses
│   └── test-data.ts
├── utils/                  # Test utilities and helpers
│   └── test-helpers.ts
└── README.md              # This file
```

## Running Tests

### Run all tests
```bash
npm run test:e2e
```

### Run tests with UI mode (recommended for development)
```bash
npm run test:e2e:ui
```

### Run tests in headed mode (see browser)
```bash
npm run test:e2e:headed
```

### Debug a specific test
```bash
npm run test:e2e:debug
```

### View test report
```bash
npm run test:e2e:report
```

### Run specific test file
```bash
npx playwright test tests/e2e/forms/contact-sales.spec.ts
```

### Run tests on specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project="Mobile Chrome"
```

## Writing Tests

### Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup before each test
    await page.goto('/your-page');
  });

  test('should do something', async ({ page }) => {
    // Your test code
    await page.click('button');
    await expect(page.locator('text=Success')).toBeVisible();
  });
});
```

### Using Test Helpers

```typescript
import { fillField, generateTestEmail, mockApiRoute } from '../../utils/test-helpers';

// Fill a form field safely
await fillField(page, 'input[name="email"]', generateTestEmail());

// Mock an API response
await mockApiRoute(page, '**/api/contact-sales', mockResponse, 200);
```

### Using Test Fixtures

```typescript
import { contactSalesData, mockApiResponses } from '../../fixtures/test-data';

// Use predefined test data
await fillField(page, 'input[name="name"]', contactSalesData.valid.name);

// Use mock API responses
await mockApiRoute(page, '**/api/contact-sales', mockApiResponses.contactSales.success);
```

## Test Coverage

### Forms (✅ Complete)
- ✅ Contact Sales Form (3-step)
  - Happy path submission
  - Field validation
  - Step navigation
  - Error handling (duplicate, rate limit)
- ✅ Newsletter Subscription
  - Compact form (footer)
  - Standard form (blog pages)
  - Email validation
  - Duplicate handling
- ✅ Startup Application (3-step)
  - Happy path submission
  - URL validation
  - Seats range validation
  - Email validation

### Navigation (🔄 To Do)
- Desktop menu interactions
- Mobile menu functionality
- Page routing

### Pages (🔄 To Do)
- Home page load
- Product pages load
- Pricing page load
- Blog pages load

## CI/CD Integration

Tests are configured to run automatically in CI environments. The configuration in `playwright.config.ts` detects CI mode via `process.env.CI` and adjusts:

- Retries: 2 in CI, 0 locally
- Workers: 1 in CI, unlimited locally
- Reporters: Adds GitHub Actions reporter in CI

## Debugging Tips

### 1. Use UI Mode
```bash
npm run test:e2e:ui
```
This opens an interactive UI where you can:
- See test execution step-by-step
- Inspect DOM at each step
- See network requests
- Debug failures easily

### 2. Use Debug Mode
```bash
npm run test:e2e:debug
```
Opens Playwright Inspector for line-by-line debugging

### 3. Use Headed Mode
```bash
npm run test:e2e:headed
```
See the browser while tests run

### 4. Add test.only()
```typescript
test.only('should test specific thing', async ({ page }) => {
  // Only this test will run
});
```

### 5. Check Screenshots/Videos
Failed tests automatically capture:
- Screenshots: `test-results/`
- Videos: `test-results/`
- Traces: Available in HTML report

## Best Practices

1. **Use Data Attributes**: Prefer `[data-testid="..."]` for stable selectors
2. **Generate Unique Data**: Use `generateTestEmail()` to avoid conflicts
3. **Mock API Calls**: Mock external services to avoid test data pollution
4. **Wait Appropriately**: Use `waitFor*` methods instead of arbitrary timeouts
5. **Test User Flows**: Test complete user journeys, not just individual actions
6. **Keep Tests Independent**: Each test should be able to run in isolation
7. **Use Descriptive Names**: Test names should clearly describe what they test

## Common Issues

### Port 3000 Already in Use
Kill the process:
```bash
lsof -ti:3000 | xargs kill
```

### Tests Timing Out
- Check if dev server is running
- Increase timeout in test if needed:
```typescript
test('slow test', async ({ page }) => {
  test.setTimeout(60000); // 60 seconds
  // test code
});
```

### Flaky Tests
- Add explicit waits for dynamic content
- Use `waitForLoadState('networkidle')` after navigation
- Mock external API calls

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright Test API](https://playwright.dev/docs/api/class-test)
