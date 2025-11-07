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
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', measurementId, {
    anonymize_ip: true, // GDPR compliance
    cookie_flags: 'SameSite=None;Secure',
  });

  analyticsInitialized = true;
};

/**
 * Initialize Mixpanel
 * Only call this after confirming consent
 *
 * @param token - Your Mixpanel project token
 */
export const initializeMixpanel = (token: string): void => {
  if (analyticsInitialized || !hasAnalyticsConsent()) {
    return;
  }

  if (typeof window === 'undefined') return;

  // Mixpanel initialization code would go here
  // Example structure (actual implementation depends on Mixpanel SDK)
  console.log('Mixpanel would be initialized with token:', token);

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
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: url,
      page_title: title,
    });
  }

  // Add other analytics services here (Mixpanel, etc.)
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
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
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
  if (window.gtag) {
    // Set all GA properties to not track
    window['ga-disable-all'] = true;
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
 *   mixpanel: 'your-token',
 * }
 */
export const initializeAnalytics = (config?: {
  googleAnalytics?: string;
  mixpanel?: string;
}): void => {
  if (!hasAnalyticsConsent()) {
    disableAnalytics();
    return;
  }

  if (config?.googleAnalytics) {
    initializeGoogleAnalytics(config.googleAnalytics);
  }

  if (config?.mixpanel) {
    initializeMixpanel(config.mixpanel);
  }
};

// Type declarations for global window object
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

export default {
  hasAnalyticsConsent,
  initializeAnalytics,
  trackPageView,
  trackEvent,
  disableAnalytics,
};
