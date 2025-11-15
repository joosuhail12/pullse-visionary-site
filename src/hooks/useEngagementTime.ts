/**
 * useEngagementTime Hook
 *
 * Tracks actual user engagement time on a page (time actively interacting).
 * Only counts time when user is actively engaged (mouse movement, scrolling, clicking).
 *
 * Sends engagement time to GA4 at regular intervals and on page unload.
 *
 * Usage:
 * ```typescript
 * // In a page component
 * useEngagementTime();
 *
 * // With custom options
 * useEngagementTime({
 *   reportInterval: 30000, // Report every 30 seconds
 *   inactivityThreshold: 5000, // 5 seconds of inactivity
 * });
 * ```
 */

import { useEffect, useRef, useCallback } from 'react';
import { trackEngagement, hasAnalyticsConsent } from '@/lib/analytics';

export interface UseEngagementTimeOptions {
  /**
   * Interval to report engagement time (ms)
   * Default: 15000 (15 seconds)
   */
  reportInterval?: number;

  /**
   * Time of inactivity before considering user as not engaged (ms)
   * Default: 3000 (3 seconds)
   */
  inactivityThreshold?: number;

  /**
   * Enable/disable tracking
   * Default: true
   */
  enabled?: boolean;
}

/**
 * Hook for tracking user engagement time
 */
export const useEngagementTime = (options: UseEngagementTimeOptions = {}): void => {
  const {
    reportInterval = 15000, // 15 seconds
    inactivityThreshold = 3000, // 3 seconds
    enabled = true,
  } = options;

  const engagementStartTime = useRef<number | null>(null);
  const totalEngagementTime = useRef<number>(0);
  const lastActivityTime = useRef<number>(Date.now());
  const isEngaged = useRef<boolean>(true);
  const reportIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Start tracking engagement
   */
  const startEngagement = useCallback(() => {
    if (!isEngaged.current) {
      engagementStartTime.current = Date.now();
      isEngaged.current = true;

      if (process.env.NODE_ENV === 'development') {
        console.log('[Engagement] User re-engaged');
      }
    }
  }, []);

  /**
   * Stop tracking engagement (due to inactivity)
   */
  const stopEngagement = useCallback(() => {
    if (isEngaged.current && engagementStartTime.current) {
      const sessionTime = Date.now() - engagementStartTime.current;
      totalEngagementTime.current += sessionTime;
      isEngaged.current = false;
      engagementStartTime.current = null;

      if (process.env.NODE_ENV === 'development') {
        console.log(`[Engagement] User disengaged. Session time: ${sessionTime}ms`);
      }
    }
  }, []);

  /**
   * Handle user activity
   */
  const handleActivity = useCallback(() => {
    lastActivityTime.current = Date.now();
    startEngagement();

    // Reset inactivity timeout
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }

    inactivityTimeoutRef.current = setTimeout(() => {
      stopEngagement();
    }, inactivityThreshold);
  }, [startEngagement, stopEngagement, inactivityThreshold]);

  /**
   * Report engagement time to analytics
   */
  const reportEngagementTime = useCallback(() => {
    if (!enabled || !hasAnalyticsConsent()) return;

    let currentEngagementTime = totalEngagementTime.current;

    // Add current session time if user is still engaged
    if (isEngaged.current && engagementStartTime.current) {
      currentEngagementTime += Date.now() - engagementStartTime.current;
    }

    // Only report if there's meaningful engagement (> 1 second)
    if (currentEngagementTime > 1000) {
      trackEngagement({ engagement_time: currentEngagementTime });

      if (process.env.NODE_ENV === 'development') {
        console.log(`[Engagement] Reported ${Math.round(currentEngagementTime / 1000)}s of engagement time`);
      }

      // Reset counter after reporting
      totalEngagementTime.current = 0;
      if (isEngaged.current) {
        engagementStartTime.current = Date.now();
      }
    }
  }, [enabled]);

  /**
   * Report final engagement time on page unload
   */
  const handleBeforeUnload = useCallback(() => {
    stopEngagement();
    reportEngagementTime();
  }, [stopEngagement, reportEngagementTime]);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // Start engagement tracking
    engagementStartTime.current = Date.now();
    isEngaged.current = true;

    // Activity listeners (mouse, keyboard, scroll, touch)
    const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];

    activityEvents.forEach(event => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    // Start reporting interval
    reportIntervalRef.current = setInterval(reportEngagementTime, reportInterval);

    // Set initial inactivity timeout
    inactivityTimeoutRef.current = setTimeout(() => {
      stopEngagement();
    }, inactivityThreshold);

    // Report on page unload
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Report on visibility change (tab switch)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopEngagement();
        reportEngagementTime();
      } else {
        startEngagement();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      // Cleanup
      activityEvents.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });

      if (reportIntervalRef.current) {
        clearInterval(reportIntervalRef.current);
      }

      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }

      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      // Final report
      stopEngagement();
      reportEngagementTime();
    };
  }, [
    enabled,
    reportInterval,
    inactivityThreshold,
    handleActivity,
    handleBeforeUnload,
    startEngagement,
    stopEngagement,
    reportEngagementTime,
  ]);
};

export default useEngagementTime;
