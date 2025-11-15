/**
 * Scroll Depth Tracker Component
 *
 * Tracks scroll depth milestones (25%, 50%, 75%, 100%) and sends events to analytics.
 * Helps understand how far users scroll on pages and identify content engagement.
 *
 * @example
 * ```tsx
 * export default function Page() {
 *   return (
 *     <>
 *       <ScrollTracker />
 *       <PageContent />
 *     </>
 *   );
 * }
 * ```
 */

'use client';

import { useEffect, useRef } from 'react';
import { trackEvent } from '@/lib/analytics';

const SCROLL_MILESTONES = [25, 50, 75, 100] as const;

export const ScrollTracker: React.FC = () => {
  const trackedMilestones = useRef<Set<number>>(new Set());
  const maxScrollDepth = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll percentage
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      const scrollableHeight = documentHeight - windowHeight;
      const scrollPercentage = scrollableHeight > 0
        ? Math.round((scrollTop / scrollableHeight) * 100)
        : 100;

      // Update max scroll depth
      if (scrollPercentage > maxScrollDepth.current) {
        maxScrollDepth.current = scrollPercentage;
      }

      // Track milestones
      SCROLL_MILESTONES.forEach((milestone) => {
        if (
          scrollPercentage >= milestone &&
          !trackedMilestones.current.has(milestone)
        ) {
          trackedMilestones.current.add(milestone);

          trackEvent('scroll_depth', {
            scroll_depth: milestone,
            page_path: window.location.pathname,
            page_title: document.title,
            max_scroll_depth: maxScrollDepth.current,
          });
        }
      });
    };

    // Initial check for pages that don't require scrolling
    handleScroll();

    // Throttle scroll events
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    // Track final scroll depth on page unload
    const handleBeforeUnload = () => {
      if (maxScrollDepth.current > 0) {
        trackEvent('scroll_final_depth', {
          scroll_depth: maxScrollDepth.current,
          page_path: window.location.pathname,
          page_title: document.title,
        });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default ScrollTracker;
