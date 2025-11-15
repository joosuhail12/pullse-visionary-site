/**
 * Performance Tracking for Core Web Vitals
 *
 * Monitors and reports real user performance metrics to Google Analytics 4.
 * Tracks the following Core Web Vitals metrics:
 * - LCP (Largest Contentful Paint)
 * - FID (First Input Delay) / INP (Interaction to Next Paint)
 * - CLS (Cumulative Layout Shift)
 * - TTFB (Time to First Byte)
 *
 * @see https://web.dev/vitals/
 * @see https://github.com/GoogleChrome/web-vitals
 */

import { trackEvent, hasAnalyticsConsent } from './analytics';

/**
 * Metric types from web-vitals
 */
interface Metric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType?: string;
}

/**
 * Track Core Web Vitals metric to GA4
 */
const sendToAnalytics = (metric: Metric): void => {
  if (!hasAnalyticsConsent()) return;

  const { name, value, rating, id, navigationType } = metric;

  trackEvent('web_vitals', {
    metric_name: name,
    metric_value: Math.round(name === 'CLS' ? value * 1000 : value),
    metric_rating: rating,
    metric_id: id,
    navigation_type: navigationType || 'navigate',
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  });

  // Also send as custom metric for easier analysis in GA4
  trackEvent(name.toLowerCase(), {
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    rating,
  });
};

/**
 * Initialize Core Web Vitals tracking
 *
 * Uses dynamic import to load web-vitals library only when needed (reduces bundle size)
 */
export const initPerformanceTracking = async (): Promise<void> => {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) {
    return;
  }

  try {
    // Dynamically import web-vitals to reduce initial bundle size
    const { onCLS, onLCP, onTTFB, onINP } = await import('web-vitals');

    // Track Cumulative Layout Shift
    onCLS(sendToAnalytics, { reportAllChanges: false });

    // Track Largest Contentful Paint
    onLCP(sendToAnalytics, { reportAllChanges: false });

    // Track Time to First Byte
    onTTFB(sendToAnalytics, { reportAllChanges: false });

    // Track Interaction to Next Paint (replaces deprecated FID metric)
    onINP(sendToAnalytics, { reportAllChanges: false });

    if (process.env.NODE_ENV === 'development') {
      console.log('[Performance] Core Web Vitals tracking initialized');
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[Performance] Failed to initialize web-vitals:', error);
    }
  }
};

/**
 * Track custom performance metrics
 */
export const trackCustomMetric = (params: {
  metric_name: string;
  metric_value: number;
  metric_unit?: string;
}): void => {
  if (!hasAnalyticsConsent()) return;

  trackEvent('custom_metric', {
    ...params,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  });
};

/**
 * Track page load time
 */
export const trackPageLoadTime = (): void => {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) return;

  // Use Navigation Timing API
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

      if (perfData) {
        const pageLoadTime = perfData.loadEventEnd - perfData.fetchStart;
        const dnsTime = perfData.domainLookupEnd - perfData.domainLookupStart;
        const tcpTime = perfData.connectEnd - perfData.connectStart;
        const requestTime = perfData.responseEnd - perfData.requestStart;
        const domContentLoadedTime = perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart;

        trackEvent('page_load_timing', {
          page_load_time: Math.round(pageLoadTime),
          dns_time: Math.round(dnsTime),
          tcp_time: Math.round(tcpTime),
          request_time: Math.round(requestTime),
          dom_content_loaded_time: Math.round(domContentLoadedTime),
          page_path: window.location.pathname,
        });
      }
    }, 0);
  });
};

/**
 * Track route change performance (for SPA navigation)
 */
export const trackRouteChange = (params: {
  from: string;
  to: string;
  duration: number;
}): void => {
  if (!hasAnalyticsConsent()) return;

  trackEvent('route_change', {
    from_path: params.from,
    to_path: params.to,
    duration_ms: Math.round(params.duration),
  });
};

/**
 * Track resource loading performance
 */
export const trackResourceTiming = (resourceType?: string): void => {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) return;

  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];

  // Filter by resource type if specified
  const filteredResources = resourceType
    ? resources.filter(r => r.initiatorType === resourceType)
    : resources;

  if (filteredResources.length === 0) return;

  // Calculate average load time
  const avgLoadTime = filteredResources.reduce((sum, r) => sum + r.duration, 0) / filteredResources.length;

  trackEvent('resource_timing', {
    resource_type: resourceType || 'all',
    resource_count: filteredResources.length,
    avg_load_time: Math.round(avgLoadTime),
    page_path: window.location.pathname,
  });
};

/**
 * Track API call performance
 */
export const trackAPIPerformance = (params: {
  endpoint: string;
  method: string;
  duration: number;
  status: number;
  success: boolean;
}): void => {
  if (!hasAnalyticsConsent()) return;

  trackEvent('api_performance', {
    api_endpoint: params.endpoint,
    api_method: params.method,
    api_duration: Math.round(params.duration),
    api_status: params.status,
    api_success: params.success,
  });
};

export default {
  initPerformanceTracking,
  trackCustomMetric,
  trackPageLoadTime,
  trackRouteChange,
  trackResourceTiming,
  trackAPIPerformance,
};
