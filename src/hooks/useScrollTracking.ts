/**
 * useScrollTracking Hook
 *
 * Automatically tracks scroll depth on a page at specific thresholds.
 * Tracks when users scroll to 25%, 50%, 75%, and 100% of the page.
 *
 * Usage:
 * ```typescript
 * // In a page component
 * useScrollTracking();
 *
 * // With custom thresholds
 * useScrollTracking({
 *   thresholds: [10, 25, 50, 75, 90, 100],
 *   throttleMs: 300,
 * });
 * ```
 */

import { useEffect, useRef, useCallback } from 'react';
import { trackScrollDepth, hasAnalyticsConsent } from '@/lib/analytics';

export interface UseScrollTrackingOptions {
  /**
   * Scroll depth percentages to track
   * Default: [25, 50, 75, 100]
   */
  thresholds?: number[];

  /**
   * Throttle delay in milliseconds
   * Default: 500ms
   */
  throttleMs?: number;

  /**
   * Enable/disable tracking
   * Default: true
   */
  enabled?: boolean;
}

/**
 * Calculate current scroll percentage
 */
const getScrollPercentage = (): number => {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  const trackLength = documentHeight - windowHeight;
  const scrollPercentage = Math.round((scrollTop / trackLength) * 100);

  return Math.min(100, Math.max(0, scrollPercentage));
};

/**
 * Hook for automatic scroll depth tracking
 */
export const useScrollTracking = (options: UseScrollTrackingOptions = {}): void => {
  const {
    thresholds = [25, 50, 75, 100],
    throttleMs = 500,
    enabled = true,
  } = options;

  const trackedThresholds = useRef<Set<number>>(new Set());
  const throttleTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = useCallback(() => {
    if (!enabled || !hasAnalyticsConsent()) return;

    // Clear existing timeout
    if (throttleTimeout.current) {
      clearTimeout(throttleTimeout.current);
    }

    // Throttle scroll events
    throttleTimeout.current = setTimeout(() => {
      const scrollPercentage = getScrollPercentage();

      // Check which thresholds have been passed
      thresholds.forEach(threshold => {
        if (
          scrollPercentage >= threshold &&
          !trackedThresholds.current.has(threshold)
        ) {
          trackScrollDepth({ percent: threshold });
          trackedThresholds.current.add(threshold);

          if (process.env.NODE_ENV === 'development') {
            console.log(`[Scroll Tracking] ${threshold}% depth reached`);
          }
        }
      });
    }, throttleMs);
  }, [enabled, thresholds, throttleMs]);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // Reset tracked thresholds on mount (new page)
    trackedThresholds.current.clear();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (throttleTimeout.current) {
        clearTimeout(throttleTimeout.current);
      }
    };
  }, [enabled, handleScroll]);
};

export default useScrollTracking;
