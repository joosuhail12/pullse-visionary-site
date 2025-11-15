'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { isEEARegion } from '@/lib/regionDetection';

/**
 * Google Analytics 4 with Consent Mode v2 Implementation
 *
 * Implements proper consent workflow per Google's requirements:
 * 1. Sets default consent state to 'denied' BEFORE GA4 loads
 * 2. Applies region-specific defaults (stricter for EEA)
 * 3. Loads GA4 gtag.js directly (no GTM)
 * 4. Updates consent when user interacts with banner
 * 5. Enables advanced features (url_passthrough, ads_data_redaction)
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
 * @see https://developers.google.com/analytics/devguides/collection/ga4
 */

interface ConsentState {
  analytics_storage: 'granted' | 'denied';
  ad_storage: 'granted' | 'denied';
  ad_user_data: 'granted' | 'denied';
  ad_personalization: 'granted' | 'denied';
}

const Analytics = () => {
  const [isEEA, setIsEEA] = useState<boolean>(false);

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

  useEffect(() => {
    // Detect region on client
    setIsEEA(isEEARegion());

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
          console.log('[Analytics] Consent updated:', newConsent);
        }
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

  // Don't render if GA ID not configured
  if (!gaId) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Analytics] NEXT_PUBLIC_GA_MEASUREMENT_ID not configured - Analytics disabled');
    }
    return null;
  }

  // Get initial consent state (will be 'denied' if not set)
  const initialConsent = checkConsent();

  return (
    <>
      {/*
        Step 1: Initialize dataLayer and set default consent
        This MUST run BEFORE GA4 loads
      */}
      <Script
        id="google-consent-mode-init"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            // Set default consent state based on region and user preferences
            gtag('consent', 'default', {
              'analytics_storage': '${initialConsent.analytics_storage}',
              'ad_storage': '${initialConsent.ad_storage}',
              'ad_user_data': '${initialConsent.ad_user_data}',
              'ad_personalization': '${initialConsent.ad_personalization}',
              'wait_for_update': 500,
              ${isEEA ? `'region': ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','IS','LI','NO','GB','UK']` : ''}
            });

            // Enable advanced consent mode features
            gtag('set', 'ads_data_redaction', true);
            gtag('set', 'url_passthrough', true);

            gtag('js', new Date());

            ${process.env.NODE_ENV === 'development' ? `console.log('[Analytics] Consent Mode v2 initialized', { isEEA: ${isEEA}, consent: ${JSON.stringify(initialConsent)} });` : ''}
          `,
        }}
      />

      {/*
        Step 2: Load Google Analytics gtag.js script
        Loads after consent defaults are set
      */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="beforeInteractive"
      />

      {/*
        Step 3: Configure GA4 measurement
        Sets GA4-specific configuration options
      */}
      <Script
        id="google-analytics-config"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            gtag('config', '${gaId}', {
              'anonymize_ip': true,
              'cookie_flags': 'SameSite=None;Secure',
              'allow_google_signals': ${initialConsent.ad_personalization === 'granted'},
              'allow_ad_personalization_signals': ${initialConsent.ad_personalization === 'granted'}
            });

            ${process.env.NODE_ENV === 'development' ? `console.log('[Analytics] GA4 configured with ID: ${gaId}');` : ''}
          `,
        }}
      />
    </>
  );
};

export default Analytics;
