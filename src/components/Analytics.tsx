'use client';

import { useEffect } from 'react';
import { isEEARegion } from '@/lib/regionDetection';
import { initPerformanceTracking, initLongTaskObserver, measureTTI } from '@/lib/performanceTracking';
import { initErrorTracking } from '@/lib/errorTracking';
import { initUTMTracking } from '@/lib/utmTracking';
import { setUserProperties } from '@/lib/analytics';

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
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

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

  /**
   * Call gtag('config') to initialize GA4 tracking
   * MUST be called AFTER consent is granted for hits to be sent
   */
  const applyConfig = (consentGranted: boolean) => {
    if (!gaId || typeof window === 'undefined') return;

    if ((window as any).gtag) {
      (window as any).gtag('config', gaId, {
        'anonymize_ip': true,
        'cookie_flags': 'SameSite=None;Secure',
        'allow_google_signals': consentGranted,
        'allow_ad_personalization_signals': consentGranted
      });

      if (process.env.NODE_ENV === 'development') {
        console.log('[Analytics] GA4 config applied:', { gaId, consentGranted });
      }
    } else if (process.env.NODE_ENV === 'development') {
      console.warn('[Analytics] gtag not available for config');
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
      const consentGranted = consent.analytics_storage === 'granted';

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

        // If consent is already granted, call config immediately
        if (consentGranted) {
          applyConfig(true);
        }

        if (process.env.NODE_ENV === 'development') {
          console.log('[Analytics] Initial consent applied:', { isEEA, consent, consentGranted });
        }
      } else if (process.env.NODE_ENV === 'development') {
        console.warn('[Analytics] gtag not available for initial consent update');
      }
    };

    // Initialize additional tracking features (always initialize, consent is checked internally)
    initErrorTracking();
    const utmParams = initUTMTracking();

    // Wait for gtag to load, then apply initial consent and initialize tracking
    waitForGtag(() => {
      applyInitialConsent();

      // Check consent for conditional tracking
      const consent = checkConsent();
      const consentGranted = consent.analytics_storage === 'granted';

      // Initialize performance tracking (Core Web Vitals) if consent granted
      if (consentGranted) {
        initPerformanceTracking();
        initLongTaskObserver();
        measureTTI();

        // Set initial user properties
        if (typeof window !== 'undefined') {
          const userProperties: Record<string, string> = {
            user_type: document.cookie.includes('_ga') ? 'returning' : 'new',
            device_category: /Mobile|Android|iPhone/i.test(navigator.userAgent)
              ? 'mobile'
              : /Tablet|iPad/i.test(navigator.userAgent)
              ? 'tablet'
              : 'desktop',
          };

          // Get traffic source from UTM parameters
          if (utmParams?.utm_source) {
            userProperties.traffic_source = utmParams.utm_source;
          }

          setUserProperties(userProperties);
        }
      }
    });

    /**
     * Handle consent changes
     * Called when user updates preferences in cookie banner
     */
    const handleConsentChange = () => {
      const newConsent = checkConsent();
      const consentGranted = newConsent.analytics_storage === 'granted';

      // Update consent mode if gtag is available
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('consent', 'update', newConsent);

        // Call config when consent is granted to start sending hits
        if (consentGranted) {
          applyConfig(true);
        }

        // Log consent update in development
        if (process.env.NODE_ENV === 'development') {
          console.log('[Analytics] Consent updated via event:', { newConsent, consentGranted });
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
