/**
 * Analytics utilities for conditional loading based on cookie consent
 *
 * These utilities help ensure that analytics scripts are only loaded
 * when the user has given explicit consent for analytics cookies.
 *
 * Usage example:
 *
 * import { initializeAnalytics, trackPageView } from '@/lib/analytics';
 * import { useCookieConsent } from '@/contexts/CookieConsentContext';
 *
 * const { hasConsent } = useCookieConsent();
 *
 * if (hasConsent('analytics')) {
 *   initializeAnalytics();
 * }
 */

import { CookieCategory } from '@/contexts/CookieConsentContext';

// Track if analytics has been initialized
let analyticsInitialized = false;

/**
 * Check if analytics consent has been granted
 * This should be called before any analytics operations
 */
export const hasAnalyticsConsent = (): boolean => {
  if (typeof window === 'undefined') return false;

  try {
    const consent = localStorage.getItem('pullse_cookie_consent');
    if (!consent) return false;

    const parsed = JSON.parse(consent);
    return parsed.analytics === true;
  } catch {
    return false;
  }
};

/**
 * Initialize Google Analytics (GA4)
 * Only call this after confirming consent
 *
 * @param measurementId - Your GA4 Measurement ID (e.g., 'G-XXXXXXXXXX')
 */
export const initializeGoogleAnalytics = (measurementId: string): void => {
  if (analyticsInitialized || !hasAnalyticsConsent()) {
    return;
  }

  if (typeof window === 'undefined') return;

  // Add GA4 script
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialize gtag
  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) {
    (window as any).dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', measurementId, {
    anonymize_ip: true, // GDPR compliance
    cookie_flags: 'SameSite=None;Secure',
  });

  analyticsInitialized = true;
};

/**
 * Track a page view
 * Automatically checks for consent before tracking
 *
 * @param url - The page URL to track
 * @param title - The page title
 */
export const trackPageView = (url: string, title?: string): void => {
  if (!hasAnalyticsConsent()) return;

  // GA4 pageview
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'page_view', {
      page_path: url,
      page_title: title,
    });
  }

  // Add other analytics services here if needed
};

/**
 * Track a custom event
 * Automatically checks for consent before tracking
 *
 * @param eventName - The name of the event
 * @param eventParams - Additional event parameters
 */
export const trackEvent = (eventName: string, eventParams?: Record<string, any>): void => {
  if (!hasAnalyticsConsent()) return;

  // GA4 custom event
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams);
  }

  // Add other analytics services here
};

/**
 * Disable all analytics tracking
 * Call this when user revokes consent
 */
export const disableAnalytics = (): void => {
  if (typeof window === 'undefined') return;

  // Disable GA4
  if ((window as any).gtag) {
    // Set all GA properties to not track
    (window as any)['ga-disable-all'] = true;
  }

  // Clear any analytics cookies
  const cookiesToClear = ['_ga', '_gid', '_gat', '_ga_*'];
  cookiesToClear.forEach((cookieName) => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });

  analyticsInitialized = false;
};

/**
 * Initialize all analytics services based on consent
 * Call this on app initialization and when consent changes
 *
 * Configuration object should contain your analytics IDs:
 * {
 *   googleAnalytics: 'G-XXXXXXXXXX',
 * }
 */
export const initializeAnalytics = (config?: {
  googleAnalytics?: string;
}): void => {
  if (!hasAnalyticsConsent()) {
    disableAnalytics();
    return;
  }

  if (config?.googleAnalytics) {
    initializeGoogleAnalytics(config.googleAnalytics);
  }
};

/**
 * Get current consent state in Consent Mode v2 format
 *
 * @returns Object with consent state for all 4 Consent Mode v2 parameters
 */
export const getConsentModeState = (): {
  analytics_storage: 'granted' | 'denied';
  ad_storage: 'granted' | 'denied';
  ad_user_data: 'granted' | 'denied';
  ad_personalization: 'granted' | 'denied';
} => {
  if (typeof window === 'undefined') {
    return {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    };
  }

  try {
    const consent = localStorage.getItem('pullse_cookie_consent');
    if (!consent) {
      return {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      };
    }

    const parsed = JSON.parse(consent);

    // Map analytics consent to ALL Google consent types (simplified approach)
    const analyticsConsent = parsed.analytics ? 'granted' : 'denied';

    return {
      analytics_storage: analyticsConsent,
      ad_storage: analyticsConsent,
      ad_user_data: analyticsConsent,
      ad_personalization: analyticsConsent,
    };
  } catch {
    return {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    };
  }
};

/**
 * Update consent mode
 * Call this when user changes consent preferences
 *
 * @param consent - Consent state object with all 4 parameters
 */
export const updateConsentMode = (consent: {
  analytics_storage: 'granted' | 'denied';
  ad_storage: 'granted' | 'denied';
  ad_user_data: 'granted' | 'denied';
  ad_personalization: 'granted' | 'denied';
}): void => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('consent', 'update', consent);

    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics] Consent mode updated:', consent);
    }
  }
};

/**
 * Track events using Google Analytics 4 with Consent Mode v2
 * This is a convenience wrapper that checks consent before sending events
 *
 * Usage:
 * import { trackEventGA4 } from '@/lib/analytics';
 * trackEventGA4('button_click', { button_name: 'signup' });
 *
 * @param eventName - The name of the event to track
 * @param eventParams - Optional parameters for the event
 */
export const trackEventGA4 = (eventName: string, eventParams?: Record<string, any>): void => {
  if (!hasAnalyticsConsent()) {
    return;
  }

  if (typeof window === 'undefined') {
    return;
  }

  // Use gtag from window (loaded by custom Analytics component)
  if ((window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams);
  } else if (process.env.NODE_ENV === 'development') {
    console.warn('[Analytics] GA4 not loaded - ensure Analytics component is mounted and consent granted');
  }
};

export default {
  hasAnalyticsConsent,
  getConsentModeState,
  updateConsentMode,
  initializeAnalytics,
  trackPageView,
  trackEvent,
  trackEventGA4,
  disableAnalytics,
};
