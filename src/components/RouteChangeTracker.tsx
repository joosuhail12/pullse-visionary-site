'use client';

import { Suspense, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackRouteChange } from '@/lib/performanceTracking';

/**
 * Route Change Performance Tracker Implementation
 * (Internal component - wrapped in Suspense boundary by default export)
 */
function RouteChangeTrackerImpl() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const previousPathname = useRef<string>(pathname);
  const navigationStartTime = useRef<number>(0);

  useEffect(() => {
    // Get current URL (pathname + search params)
    const currentUrl = searchParams ? `${pathname}?${searchParams}` : pathname;
    const previousUrl = previousPathname.current;

    // If this is the first render, just store the current path
    if (!navigationStartTime.current) {
      navigationStartTime.current = performance.now();
      previousPathname.current = pathname;
      return;
    }

    // If the pathname changed, track the navigation
    if (pathname !== previousUrl) {
      const navigationEndTime = performance.now();
      const duration = navigationEndTime - navigationStartTime.current;

      // Track the route change
      trackRouteChange({
        from: previousUrl,
        to: currentUrl,
        duration,
      });

      if (process.env.NODE_ENV === 'development') {
        console.log(`[Route Change] ${previousUrl} → ${currentUrl} (${Math.round(duration)}ms)`);
      }

      // Update refs for next navigation
      previousPathname.current = pathname;
      navigationStartTime.current = navigationEndTime;
    }
  }, [pathname, searchParams]);

  // This component renders nothing
  return null;
}

/**
 * Route Change Performance Tracker
 *
 * Tracks client-side navigation performance in Next.js App Router.
 * Measures the time taken for route transitions and sends to analytics.
 *
 * Usage: Add <RouteChangeTracker /> to your root layout
 */
export default function RouteChangeTracker() {
  return (
    <Suspense fallback={null}>
      <RouteChangeTrackerImpl />
    </Suspense>
  );
}
