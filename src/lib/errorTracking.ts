/**
 * Error Tracking and Monitoring
 *
 * Automatically captures and reports errors to Google Analytics 4.
 * Provides both automatic error capture and manual error reporting.
 *
 * Features:
 * - Global error handler for uncaught errors
 * - Promise rejection handler for unhandled promises
 * - React error boundary integration
 * - API error tracking
 * - Custom error reporting
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror
 */

import { trackError, trackAPIError, hasAnalyticsConsent } from './analytics';

let errorTrackingInitialized = false;

/**
 * Initialize global error tracking
 * Sets up listeners for uncaught errors and unhandled promise rejections
 */
export const initErrorTracking = (): void => {
  if (typeof window === 'undefined' || errorTrackingInitialized) {
    return;
  }

  // Handle uncaught JavaScript errors
  window.addEventListener('error', (event: ErrorEvent) => {
    if (!hasAnalyticsConsent()) return;

    const { message, filename, lineno, colno, error } = event;

    trackError({
      error_type: 'javascript',
      error_message: message,
      error_stack: error?.stack,
      error_component: filename || 'unknown',
      error_fatal: true,
      line_number: lineno,
      column_number: colno,
    });

    if (process.env.NODE_ENV === 'development') {
      console.error('[Error Tracking] Uncaught error:', { message, filename, lineno, colno });
    }
  });

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
    if (!hasAnalyticsConsent()) return;

    const reason = event.reason;
    const message = reason?.message || reason?.toString() || 'Unhandled Promise Rejection';

    trackError({
      error_type: 'javascript',
      error_message: message,
      error_stack: reason?.stack,
      error_fatal: false,
      promise_rejection: true,
    });

    if (process.env.NODE_ENV === 'development') {
      console.error('[Error Tracking] Unhandled promise rejection:', reason);
    }
  });

  errorTrackingInitialized = true;

  if (process.env.NODE_ENV === 'development') {
    console.log('[Error Tracking] Initialized global error handlers');
  }
};

/**
 * Track a client-side error manually
 */
export const trackClientError = (params: {
  message: string;
  stack?: string;
  component?: string;
  fatal?: boolean;
  metadata?: Record<string, any>;
}): void => {
  if (!hasAnalyticsConsent()) return;

  trackError({
    error_type: 'javascript',
    error_message: params.message,
    error_stack: params.stack,
    error_component: params.component,
    error_fatal: params.fatal || false,
    ...params.metadata,
  });
};

/**
 * Track a form validation error
 */
export const trackValidationError = (params: {
  form_name: string;
  field_name: string;
  error_message: string;
}): void => {
  if (!hasAnalyticsConsent()) return;

  trackError({
    error_type: 'validation',
    error_message: `Validation error in ${params.form_name}: ${params.error_message}`,
    error_component: params.form_name,
    error_fatal: false,
    field_name: params.field_name,
  });
};

/**
 * Track a network/fetch error
 */
export const trackNetworkError = (params: {
  url: string;
  method?: string;
  status?: number;
  error_message: string;
}): void => {
  if (!hasAnalyticsConsent()) return;

  trackError({
    error_type: 'network',
    error_message: `Network error: ${params.error_message}`,
    error_component: params.url,
    error_fatal: false,
    http_method: params.method,
    http_status: params.status,
  });
};

/**
 * Track a 404 error
 */
export const track404Error = (path: string): void => {
  if (!hasAnalyticsConsent()) return;

  trackError({
    error_type: 'network',
    error_message: `404 Not Found: ${path}`,
    error_component: path,
    error_fatal: false,
    http_status: 404,
  });
};

/**
 * Wrap an async function with error tracking
 *
 * Usage:
 * ```typescript
 * const fetchData = withErrorTracking(
 *   async () => {
 *     const res = await fetch('/api/data');
 *     return res.json();
 *   },
 *   'fetchData'
 * );
 * ```
 */
export const withErrorTracking = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  componentName: string
): T => {
  return (async (...args: any[]) => {
    try {
      return await fn(...args);
    } catch (error: any) {
      trackClientError({
        message: error?.message || 'Unknown error',
        stack: error?.stack,
        component: componentName,
        fatal: false,
      });
      throw error; // Re-throw to allow caller to handle
    }
  }) as T;
};

/**
 * Error boundary error handler
 * Use this in React Error Boundaries to track component errors
 *
 * Usage in Error Boundary:
 * ```typescript
 * componentDidCatch(error: Error, errorInfo: ErrorInfo) {
 *   trackErrorBoundary(error, errorInfo);
 * }
 * ```
 */
export const trackErrorBoundary = (
  error: Error,
  errorInfo: { componentStack: string }
): void => {
  if (!hasAnalyticsConsent()) return;

  trackError({
    error_type: 'javascript',
    error_message: error.message,
    error_stack: error.stack,
    error_component: 'ErrorBoundary',
    error_fatal: true,
    component_stack: errorInfo.componentStack,
  });
};

/**
 * Track API errors with enhanced details
 */
export const trackDetailedAPIError = (params: {
  endpoint: string;
  method: string;
  status_code?: number;
  error_message: string;
  response_body?: any;
  request_body?: any;
}): void => {
  if (!hasAnalyticsConsent()) return;

  trackAPIError({
    endpoint: params.endpoint,
    status_code: params.status_code,
    error_message: params.error_message,
  });

  // Also track as a detailed error for debugging
  trackError({
    error_type: 'api',
    error_message: `API Error: ${params.method} ${params.endpoint} - ${params.error_message}`,
    error_component: params.endpoint,
    error_fatal: false,
    http_method: params.method,
    http_status: params.status_code,
    response_preview: params.response_body ? JSON.stringify(params.response_body).substring(0, 200) : undefined,
  });
};

/**
 * Create a fetch wrapper with automatic error tracking
 */
export const createTrackedFetch = () => {
  const originalFetch = window.fetch;

  return async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
    const method = init?.method || 'GET';
    const startTime = Date.now();

    try {
      const response = await originalFetch(input, init);
      const duration = Date.now() - startTime;

      // Track failed API calls (4xx, 5xx)
      if (!response.ok) {
        trackDetailedAPIError({
          endpoint: url,
          method,
          status_code: response.status,
          error_message: response.statusText,
        });
      }

      // Track successful API performance
      if (hasAnalyticsConsent() && response.ok) {
        // Can optionally track successful API calls for performance monitoring
        if (process.env.NODE_ENV === 'development') {
          console.log(`[API] ${method} ${url} - ${response.status} (${duration}ms)`);
        }
      }

      return response;
    } catch (error: any) {
      const duration = Date.now() - startTime;

      trackNetworkError({
        url,
        method,
        error_message: error?.message || 'Network request failed',
      });

      throw error; // Re-throw to allow caller to handle
    }
  };
};

/**
 * Replace global fetch with tracked version
 * Call this once in your app initialization
 */
export const enableFetchTracking = (): void => {
  if (typeof window === 'undefined') return;

  const trackedFetch = createTrackedFetch();
  (window as any).fetch = trackedFetch;

  if (process.env.NODE_ENV === 'development') {
    console.log('[Error Tracking] Fetch tracking enabled');
  }
};

export default {
  initErrorTracking,
  trackClientError,
  trackValidationError,
  trackNetworkError,
  track404Error,
  withErrorTracking,
  trackErrorBoundary,
  trackDetailedAPIError,
  createTrackedFetch,
  enableFetchTracking,
};
