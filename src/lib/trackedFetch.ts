/**
 * Tracked Fetch - Performance-monitored wrapper for fetch API
 *
 * Automatically tracks API call performance and sends metrics to analytics.
 * Drop-in replacement for native fetch() with added telemetry.
 *
 * Usage:
 * import { trackedFetch } from '@/lib/trackedFetch';
 *
 * // Same API as native fetch
 * const response = await trackedFetch('/api/users');
 * const data = await response.json();
 */

import { trackAPIPerformance } from './performanceTracking';

export interface TrackedFetchOptions extends RequestInit {
  /**
   * Custom name for this API call (defaults to endpoint path)
   */
  trackingName?: string;

  /**
   * Disable tracking for this specific request
   */
  disableTracking?: boolean;
}

/**
 * Performance-tracked wrapper for fetch API
 *
 * @param input - URL or Request object
 * @param init - Fetch options with optional tracking configuration
 * @returns Promise resolving to Response
 */
export async function trackedFetch(
  input: RequestInfo | URL,
  init?: TrackedFetchOptions
): Promise<Response> {
  const startTime = performance.now();
  const disableTracking = init?.disableTracking || false;

  // Extract URL and method for tracking
  let url: string;
  let method: string;

  if (typeof input === 'string') {
    url = input;
    method = init?.method || 'GET';
  } else if (input instanceof URL) {
    url = input.toString();
    method = init?.method || 'GET';
  } else {
    // Request object
    url = input.url;
    method = input.method || init?.method || 'GET';
  }

  // Extract just the pathname for cleaner tracking
  let endpoint: string;
  try {
    const urlObj = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
    endpoint = init?.trackingName || urlObj.pathname;
  } catch {
    endpoint = init?.trackingName || url;
  }

  try {
    // Make the actual fetch request
    const response = await fetch(input, init);
    const endTime = performance.now();
    const duration = endTime - startTime;

    // Track successful request
    if (!disableTracking) {
      trackAPIPerformance({
        endpoint,
        method: method.toUpperCase(),
        duration,
        status: response.status,
        success: response.ok,
      });
    }

    if (process.env.NODE_ENV === 'development') {
      const statusEmoji = response.ok ? '✓' : '✗';
      console.log(
        `[API ${statusEmoji}] ${method} ${endpoint} - ${response.status} (${Math.round(duration)}ms)`
      );
    }

    return response;
  } catch (error) {
    const endTime = performance.now();
    const duration = endTime - startTime;

    // Track failed request
    if (!disableTracking) {
      trackAPIPerformance({
        endpoint,
        method: method.toUpperCase(),
        duration,
        status: 0, // Network error or CORS issue
        success: false,
      });
    }

    if (process.env.NODE_ENV === 'development') {
      console.error(`[API ✗] ${method} ${endpoint} - Failed (${Math.round(duration)}ms)`, error);
    }

    // Re-throw the error for caller to handle
    throw error;
  }
}

/**
 * Convenience wrapper for GET requests
 */
export async function trackedGet(url: string, options?: TrackedFetchOptions): Promise<Response> {
  return trackedFetch(url, { ...options, method: 'GET' });
}

/**
 * Convenience wrapper for POST requests
 */
export async function trackedPost(
  url: string,
  body?: any,
  options?: TrackedFetchOptions
): Promise<Response> {
  return trackedFetch(url, {
    ...options,
    method: 'POST',
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
}

/**
 * Convenience wrapper for PUT requests
 */
export async function trackedPut(
  url: string,
  body?: any,
  options?: TrackedFetchOptions
): Promise<Response> {
  return trackedFetch(url, {
    ...options,
    method: 'PUT',
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
}

/**
 * Convenience wrapper for DELETE requests
 */
export async function trackedDelete(url: string, options?: TrackedFetchOptions): Promise<Response> {
  return trackedFetch(url, { ...options, method: 'DELETE' });
}

/**
 * Convenience wrapper for PATCH requests
 */
export async function trackedPatch(
  url: string,
  body?: any,
  options?: TrackedFetchOptions
): Promise<Response> {
  return trackedFetch(url, {
    ...options,
    method: 'PATCH',
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
}

export default trackedFetch;
