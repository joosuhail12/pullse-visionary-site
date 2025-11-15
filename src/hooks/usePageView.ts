/**
 * usePageView Hook
 *
 * Automatically tracks page views in Next.js App Router.
 * Tracks initial page load and route changes.
 *
 * Usage:
 * ```typescript
 * // In layout.tsx or page component
 * usePageView();
 *
 * // With custom parameters
 * usePageView({
 *   trackOnMount: true,
 *   includeSearchParams: true,
 * });
 * ```
 */

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView, hasAnalyticsConsent } from '@/lib/analytics';
import { getUTMParams } from '@/lib/utmTracking';

export interface UsePageViewOptions {
  /**
   * Track page view on component mount
   * Default: true
   */
  trackOnMount?: boolean;

  /**
   * Include search parameters in page path
   * Default: false (to avoid tracking sensitive data)
   */
  includeSearchParams?: boolean;

  /**
   * Include UTM parameters in page view event
   * Default: true
   */
  includeUTMParams?: boolean;

  /**
   * Custom title override
   */
  title?: string;
}

/**
 * Hook for automatic page view tracking
 */
export const usePageView = (options: UsePageViewOptions = {}): void => {
  const {
    trackOnMount = true,
    includeSearchParams = false,
    includeUTMParams = true,
    title,
  } = options;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const previousPathname = useRef<string>('');

  useEffect(() => {
    if (!hasAnalyticsConsent()) return;

    // Build full path
    let fullPath = pathname || '/';

    if (includeSearchParams && searchParams) {
      const queryString = searchParams.toString();
      if (queryString) {
        fullPath += `?${queryString}`;
      }
    }

    // Only track if pathname changed (or initial mount with trackOnMount)
    const shouldTrack = trackOnMount && (
      !previousPathname.current || // Initial mount
      previousPathname.current !== pathname // Route change
    );

    if (shouldTrack) {
      // Get UTM parameters if enabled
      const utmParams = includeUTMParams ? getUTMParams() : null;

      // Track page view
      const pageViewParams: any = {
        url: fullPath,
        title: title || (typeof document !== 'undefined' ? document.title : undefined),
      };

      // Add UTM parameters if available
      if (utmParams) {
        Object.assign(pageViewParams, utmParams);
      }

      trackPageView(pageViewParams);

      if (process.env.NODE_ENV === 'development') {
        console.log('[Page View] Tracked:', fullPath, utmParams ? 'with UTM' : '');
      }

      // Update previous pathname
      previousPathname.current = pathname;
    }
  }, [pathname, searchParams, trackOnMount, includeSearchParams, includeUTMParams, title]);
};

export default usePageView;
