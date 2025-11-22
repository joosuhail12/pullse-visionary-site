/**
 * Test data for forms and components
 */

export const contactSalesData = {
  valid: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Acme Corporation',
    companySize: '11-50',
    industry: 'B2B SaaS',
    timeline: 'Immediate',
    currentSolution: 'Zendesk',
    message: 'Looking to migrate from our current solution',
  },
  invalid: {
    invalidEmail: 'not-an-email',
    emptyName: '',
    emptyCompany: '',
  },
};

export const newsletterData = {
  valid: {
    email: 'newsletter@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    source: 'blog',
  },
  invalid: {
    invalidEmail: 'invalid@',
    emptyEmail: '',
  },
};

export const startupApplicationData = {
  valid: {
    companyName: 'Startup Inc',
    website: 'https://startup.example.com',
    email: 'founder@startup.example.com',
    foundingDate: '2023-01-15',
    annualRevenue: '500k-1m',
    totalFunding: '1m-3m',
    seatsNeeded: '5',
    customerStatus: 'new',
    currentTools: 'Zendesk, Intercom, Slack',
    useCase: 'We need a unified platform for customer support',
  },
  invalid: {
    invalidWebsite: 'not-a-url',
    invalidEmail: 'not-an-email',
    futureDate: '2030-01-01',
    invalidSeats: '0',
    tooManySeats: '20',
  },
};

export const mockApiResponses = {
  contactSales: {
    success: {
      success: true,
      data: {
        id: 'test-submission-id',
        message: 'Demo request submitted successfully!',
        submittedAt: new Date().toISOString(),
      },
      requestId: 'test-request-id',
    },
    duplicate: {
      error: {
        code: 'DUPLICATE_SUBMISSION',
        message: 'You have already submitted a request recently.',
      },
      requestId: 'test-request-id',
    },
    rateLimit: {
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Too many requests. Please try again later.',
      },
      requestId: 'test-request-id',
    },
  },
  newsletter: {
    success: {
      message: 'Successfully subscribed! Check your email for confirmation.',
      success: true,
    },
    duplicate: {
      error: 'You are already subscribed to our newsletter',
    },
  },
  startupApplication: {
    success: {
      success: true,
      data: {
        id: 'test-application-id',
        message: 'Application submitted successfully!',
        submittedAt: new Date().toISOString(),
      },
      requestId: 'test-request-id',
    },
  },
};
