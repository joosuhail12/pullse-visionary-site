/**
 * Engagement Time Tracker Component
 *
 * Tracks active time spent on page by monitoring user activity (mouse movement, scrolling, clicks).
 * Sends engagement events at intervals to measure true user engagement vs. passive time.
 *
 * @example
 * ```tsx
 * export default function Page() {
 *   return (
 *     <>
 *       <EngagementTracker />
 *       <PageContent />
 *     </>
 *   );
 * }
 * ```
 */

'use client';

import { useEffect, useRef } from 'react';
import { trackEvent } from '@/lib/analytics';

const ENGAGEMENT_INTERVAL = 30000; // Send event every 30 seconds
const INACTIVE_THRESHOLD = 5000; // Consider inactive after 5 seconds of no activity

export const EngagementTracker: React.FC = () => {
  const startTime = useRef<number>(Date.now());
  const lastActivityTime = useRef<number>(Date.now());
  const totalActiveTime = useRef<number>(0);
  const isActive = useRef<boolean>(true);
  const lastReportedTime = useRef<number>(0);

  useEffect(() => {
    // Update last activity time on user interactions
    const updateActivity = () => {
      const now = Date.now();
      const wasInactive = !isActive.current;

      lastActivityTime.current = now;

      if (wasInactive) {
        // User became active again
        isActive.current = true;
      }
    };

    // Listen for user activity
    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
    events.forEach((event) => {
      window.addEventListener(event, updateActivity, { passive: true });
    });

    // Check for inactivity periodically
    const inactivityInterval = setInterval(() => {
      const now = Date.now();
      const timeSinceActivity = now - lastActivityTime.current;

      if (timeSinceActivity > INACTIVE_THRESHOLD && isActive.current) {
        // User became inactive
        isActive.current = false;
        totalActiveTime.current += timeSinceActivity;
      } else if (isActive.current) {
        // User is still active, accumulate time
        totalActiveTime.current += (now - lastActivityTime.current);
        lastActivityTime.current = now;
      }
    }, 1000); // Check every second

    // Send engagement events periodically
    const engagementInterval = setInterval(() => {
      const activeSeconds = Math.round(totalActiveTime.current / 1000);
      const totalSeconds = Math.round((Date.now() - startTime.current) / 1000);

      // Only send if there's been meaningful engagement since last report
      if (activeSeconds > lastReportedTime.current) {
        trackEvent('user_engagement', {
          engagement_time_seconds: activeSeconds,
          total_time_seconds: totalSeconds,
          engagement_rate: totalSeconds > 0 ? (activeSeconds / totalSeconds) * 100 : 0,
          page_path: window.location.pathname,
          page_title: document.title,
        });

        lastReportedTime.current = activeSeconds;
      }
    }, ENGAGEMENT_INTERVAL);

    // Send final engagement on page unload
    const handleBeforeUnload = () => {
      const activeSeconds = Math.round(totalActiveTime.current / 1000);
      const totalSeconds = Math.round((Date.now() - startTime.current) / 1000);

      if (activeSeconds > 0) {
        trackEvent('user_engagement_final', {
          engagement_time_seconds: activeSeconds,
          total_time_seconds: totalSeconds,
          engagement_rate: totalSeconds > 0 ? (activeSeconds / totalSeconds) * 100 : 0,
          page_path: window.location.pathname,
          page_title: document.title,
        });
      }
    };

    // Track page visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page hidden, mark as inactive
        isActive.current = false;
      } else {
        // Page visible again, update activity time
        updateActivity();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, updateActivity);
      });
      clearInterval(inactivityInterval);
      clearInterval(engagementInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default EngagementTracker;
