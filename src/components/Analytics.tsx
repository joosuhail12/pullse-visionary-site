'use client';

import { useEffect } from 'react';
import { isEEARegion } from '@/lib/regionDetection';

/**
 * Google Analytics 4 Consent Manager
 *
 * This component handles client-side consent updates for GA4 with Consent Mode v2.
 * The actual GA4 scripts are loaded in layout.tsx <head> for Google Tag Assistant detection.
 *
 * Responsibilities:
 * 1. Listens for consent changes from cookie banner
 * 2. Updates Google Consent Mode when user accepts/denies cookies
 * 3. Applies region-specific consent settings (EEA detection)
 * 4. Logs consent updates in development mode
 *
 * Consent Mode v2 Parameters:
 * - analytics_storage: Analytics cookies/data collection
 * - ad_storage: Advertising cookies
 * - ad_user_data: User data for advertising
 * - ad_personalization: Personalized advertising
 *
 * All four parameters map to the 'analytics' consent category
 * from CookieConsentContext for simplified UX.
 *
 * @see https://developers.google.com/tag-platform/security/guides/consent
 */

interface ConsentState {
  analytics_storage: 'granted' | 'denied';
  ad_storage: 'granted' | 'denied';
  ad_user_data: 'granted' | 'denied';
  ad_personalization: 'granted' | 'denied';
}

const Analytics = () => {
  /**
   * Check current consent state from localStorage
   * Maps 'analytics' consent to all 4 Consent Mode v2 parameters
   */
  const checkConsent = (): ConsentState => {
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
        // No consent set yet, default to denied
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
      // Error parsing, default to denied
      return {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      };
    }
  };

  useEffect(() => {
    /**
     * Wait for gtag to be available before calling consent updates
     * Retries up to 20 times (1 second total) to ensure gtag is loaded
     */
    const waitForGtag = (callback: () => void, maxAttempts = 20) => {
      let attempts = 0;
      const check = () => {
        if ((window as any).gtag) {
          callback();
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(check, 50); // Check every 50ms
        } else if (process.env.NODE_ENV === 'development') {
          console.error('[Analytics] gtag failed to load after 1 second');
        }
      };
      check();
    };

    /**
     * Apply initial consent update with region-specific settings
     * This runs once on mount to apply EEA region if applicable
     */
    const applyInitialConsent = () => {
      const isEEA = isEEARegion();
      const consent = checkConsent();

      if (typeof window !== 'undefined' && (window as any).gtag) {
        const consentUpdate: any = {
          ...consent,
          wait_for_update: 500,
        };

        // Apply EEA region if detected
        if (isEEA) {
          consentUpdate.region = ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','IS','LI','NO','GB','UK'];
        }

        (window as any).gtag('consent', 'update', consentUpdate);

        if (process.env.NODE_ENV === 'development') {
          console.log('[Analytics] Initial consent applied:', { isEEA, consent });
        }
      } else if (process.env.NODE_ENV === 'development') {
        console.warn('[Analytics] gtag not available for initial consent update');
      }
    };

    // Wait for gtag to load, then apply initial consent
    waitForGtag(applyInitialConsent);

    /**
     * Handle consent changes
     * Called when user updates preferences in cookie banner
     */
    const handleConsentChange = () => {
      const newConsent = checkConsent();

      // Update consent mode if gtag is available
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('consent', 'update', newConsent);

        // Log consent update in development
        if (process.env.NODE_ENV === 'development') {
          console.log('[Analytics] Consent updated via event:', newConsent);
        }
      } else if (process.env.NODE_ENV === 'development') {
        console.error('[Analytics] gtag not available - consent update failed');
      }
    };

    // Listen for consent changes from other tabs
    window.addEventListener('storage', handleConsentChange);

    // Listen for consent changes in same tab (custom event from CookieConsentContext)
    window.addEventListener('cookieConsentUpdated', handleConsentChange);

    return () => {
      window.removeEventListener('storage', handleConsentChange);
      window.removeEventListener('cookieConsentUpdated', handleConsentChange);
    };
  }, []);

  // This component doesn't render anything - it only handles consent updates
  return null;
};

export default Analytics;
