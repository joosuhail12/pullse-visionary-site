/**
 * Performance Tracking for Core Web Vitals
 *
 * Monitors and reports real user performance metrics to Google Analytics 4.
 * Tracks the following Core Web Vitals metrics:
 * - LCP (Largest Contentful Paint)
 * - FCP (First Contentful Paint)
 * - INP (Interaction to Next Paint)
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
    const { onCLS, onLCP, onFCP, onTTFB, onINP } = await import('web-vitals');

    // Track Cumulative Layout Shift
    onCLS(sendToAnalytics, { reportAllChanges: false });

    // Track Largest Contentful Paint
    onLCP(sendToAnalytics, { reportAllChanges: false });

    // Track First Contentful Paint
    onFCP(sendToAnalytics, { reportAllChanges: false });

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
 * Initialize Long Task Observer to track blocking JavaScript
 *
 * Long tasks are JavaScript executions that take >50ms, blocking the main thread
 * and degrading user experience. Tracking these helps identify performance bottlenecks.
 */
export const initLongTaskObserver = (): void => {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) {
    return;
  }

  try {
    // Check if PerformanceObserver and longtask are supported
    if (!('PerformanceObserver' in window)) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[Performance] PerformanceObserver not supported');
      }
      return;
    }

    // Create observer for long tasks
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Long tasks are any tasks >50ms
        trackEvent('long_task', {
          task_duration: Math.round(entry.duration),
          task_name: entry.name || 'unknown',
          task_start_time: Math.round(entry.startTime),
          page_path: window.location.pathname,
          // Attribution helps identify which script caused the long task
          attribution: (entry as any).attribution
            ? (entry as any).attribution.map((a: any) => a.containerType || a.containerName).join(', ')
            : 'unknown',
        });

        if (process.env.NODE_ENV === 'development') {
          console.warn(
            `[Performance] Long task detected: ${Math.round(entry.duration)}ms at ${Math.round(entry.startTime)}ms`
          );
        }
      }
    });

    // Start observing long tasks
    observer.observe({ entryTypes: ['longtask'] });

    if (process.env.NODE_ENV === 'development') {
      console.log('[Performance] Long Task Observer initialized');
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[Performance] Failed to initialize Long Task Observer:', error);
    }
  }
};

/**
 * Measure Time to Interactive (TTI)
 *
 * TTI is when the page becomes fully interactive:
 * - The page has displayed useful content (FCP)
 * - Event handlers are registered for most visible page elements
 * - The page responds to user interactions within 50ms
 *
 * This simplified implementation measures TTI as:
 * FCP + first 5-second quiet window (no long tasks)
 */
export const measureTTI = (): void => {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) {
    return;
  }

  try {
    let fcpTime = 0;
    let lastLongTaskEnd = 0;
    let quietWindowStart = 0;
    const QUIET_WINDOW_DURATION = 5000; // 5 seconds of quiet
    let ttiReported = false;

    // Get FCP (First Contentful Paint)
    const fcpObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          fcpTime = entry.startTime;
          fcpObserver.disconnect();
        }
      }
    });

    fcpObserver.observe({ entryTypes: ['paint'] });

    // Track long tasks to find quiet window
    const longTaskObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const taskEnd = entry.startTime + entry.duration;
        lastLongTaskEnd = Math.max(lastLongTaskEnd, taskEnd);
        quietWindowStart = 0; // Reset quiet window when long task occurs
      }
    });

    try {
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    } catch {
      // Longtask not supported, fallback to load event
    }

    // Check for TTI after page load
    const checkTTI = () => {
      if (ttiReported) return;

      const now = performance.now();
      const timeSinceLastLongTask = now - lastLongTaskEnd;

      // If we haven't seen a long task yet, use FCP as baseline
      if (lastLongTaskEnd === 0 && fcpTime > 0) {
        lastLongTaskEnd = fcpTime;
      }

      // Start quiet window if we haven't already
      if (quietWindowStart === 0 && fcpTime > 0) {
        quietWindowStart = lastLongTaskEnd;
      }

      // Check if we've had a 5-second quiet window
      if (
        quietWindowStart > 0 &&
        timeSinceLastLongTask >= QUIET_WINDOW_DURATION &&
        now - quietWindowStart >= QUIET_WINDOW_DURATION
      ) {
        const tti = quietWindowStart;
        ttiReported = true;

        // Send TTI to analytics
        trackEvent('tti', {
          value: Math.round(tti),
          metric_name: 'TTI',
          metric_value: Math.round(tti),
          page_path: window.location.pathname,
        });

        if (process.env.NODE_ENV === 'development') {
          console.log(`[Performance] TTI: ${Math.round(tti)}ms`);
        }

        // Clean up observers
        longTaskObserver.disconnect();
        clearInterval(checkInterval);
      }
    };

    // Check every second for TTI
    const checkInterval = setInterval(checkTTI, 1000);

    // Fallback: Report TTI at load event if not already reported
    window.addEventListener('load', () => {
      setTimeout(() => {
        if (!ttiReported) {
          const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          if (perfData) {
            const tti = perfData.domInteractive;
            ttiReported = true;

            trackEvent('tti', {
              value: Math.round(tti),
              metric_name: 'TTI',
              metric_value: Math.round(tti),
              page_path: window.location.pathname,
              fallback: true,
            });

            if (process.env.NODE_ENV === 'development') {
              console.log(`[Performance] TTI (fallback): ${Math.round(tti)}ms`);
            }
          }
          clearInterval(checkInterval);
          longTaskObserver.disconnect();
        }
      }, QUIET_WINDOW_DURATION);
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[Performance] Failed to measure TTI:', error);
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

/**
 * Create a performance mark for custom timing measurements
 *
 * Usage:
 * markPerformance('form-submit-start');
 * // ... user flow logic ...
 * markPerformance('form-submit-end');
 * measurePerformance('form-submit', 'form-submit-start', 'form-submit-end');
 */
export const markPerformance = (markName: string): void => {
  if (typeof window === 'undefined' || !('performance' in window)) return;

  try {
    performance.mark(markName);

    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] Mark created: ${markName}`);
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`[Performance] Failed to create mark ${markName}:`, error);
    }
  }
};

/**
 * Measure performance between two marks and send to analytics
 *
 * @param measureName - Name for this measurement (e.g., 'form-submit-duration')
 * @param startMark - Name of the start mark
 * @param endMark - Name of the end mark (optional, defaults to current time)
 */
export const measurePerformance = (
  measureName: string,
  startMark: string,
  endMark?: string
): number | null => {
  if (typeof window === 'undefined' || !('performance' in window)) return null;

  try {
    // Create measurement
    const measure = endMark
      ? performance.measure(measureName, startMark, endMark)
      : performance.measure(measureName, startMark);

    const duration = measure.duration;

    // Send to analytics if consent granted
    if (hasAnalyticsConsent()) {
      trackEvent('custom_measure', {
        measure_name: measureName,
        measure_duration: Math.round(duration),
        page_path: window.location.pathname,
      });
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] Measurement: ${measureName} = ${Math.round(duration)}ms`);
    }

    // Clean up marks to prevent memory leaks
    try {
      performance.clearMarks(startMark);
      if (endMark) performance.clearMarks(endMark);
      performance.clearMeasures(measureName);
    } catch {
      // Ignore cleanup errors
    }

    return duration;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`[Performance] Failed to measure ${measureName}:`, error);
    }
    return null;
  }
};

/**
 * Track a complete user journey with automatic start/end timing
 *
 * Usage:
 * const journey = trackUserJourney('checkout-flow');
 * // ... user completes checkout ...
 * journey.end({ success: true, items: 3 });
 *
 * @param journeyName - Name of the user journey to track
 * @returns Object with end() method to complete the journey
 */
export const trackUserJourney = (journeyName: string) => {
  const startMark = `${journeyName}-start`;
  const endMark = `${journeyName}-end`;

  markPerformance(startMark);

  return {
    /**
     * End the user journey and send measurement to analytics
     * @param metadata - Optional metadata about the journey
     */
    end: (metadata?: Record<string, any>) => {
      markPerformance(endMark);
      const duration = measurePerformance(journeyName, startMark, endMark);

      // Send detailed journey event if consent granted
      if (hasAnalyticsConsent() && duration !== null) {
        trackEvent('user_journey', {
          journey_name: journeyName,
          journey_duration: Math.round(duration),
          page_path: typeof window !== 'undefined' ? window.location.pathname : '',
          ...metadata,
        });
      }

      return duration;
    },
  };
};

export default {
  initPerformanceTracking,
  initLongTaskObserver,
  measureTTI,
  trackCustomMetric,
  trackPageLoadTime,
  trackRouteChange,
  trackResourceTiming,
  trackAPIPerformance,
  markPerformance,
  measurePerformance,
  trackUserJourney,
};
