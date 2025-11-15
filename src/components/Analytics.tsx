'use client';

import { GoogleAnalytics } from '@next/third-parties/google';
import { useEffect, useState } from 'react';

/**
 * Analytics component that conditionally loads Google Analytics 4
 * based on user cookie consent preferences.
 *
 * Only loads GA4 when:
 * 1. User has explicitly granted analytics consent
 * 2. NEXT_PUBLIC_GA_MEASUREMENT_ID environment variable is set
 *
 * Automatically handles consent changes:
 * - Mounts GA4 when consent is granted
 * - Unmounts GA4 when consent is revoked
 *
 * Note: This component directly reads from localStorage to avoid SSR issues
 * with the CookieConsentProvider context.
 */
const Analytics = () => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Check analytics consent from localStorage
    const checkConsent = () => {
      try {
        const consent = localStorage.getItem('pullse_cookie_consent');
        if (!consent) return false;

        const parsed = JSON.parse(consent);
        return parsed.analytics === true;
      } catch {
        return false;
      }
    };

    const consentGranted = checkConsent();
    setShouldLoad(consentGranted);

    // Listen for consent changes
    const handleConsentChange = () => {
      const newConsent = checkConsent();
      setShouldLoad(newConsent);

      // Clear GA cookies if consent was revoked
      if (!newConsent) {
        const cookiesToClear = ['_ga', '_gid', '_gat', '_ga_*'];
        cookiesToClear.forEach((cookieName) => {
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        });
      }
    };

    // Listen for storage events (consent changes in other tabs)
    window.addEventListener('storage', handleConsentChange);

    // Listen for custom event (consent changes in same tab)
    window.addEventListener('cookieConsentUpdated', handleConsentChange);

    return () => {
      window.removeEventListener('storage', handleConsentChange);
      window.removeEventListener('cookieConsentUpdated', handleConsentChange);
    };
  }, []);

  // Don't render if consent not granted
  if (!shouldLoad) {
    return null;
  }

  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  // Don't render if GA ID not configured
  if (!gaId) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('NEXT_PUBLIC_GA_MEASUREMENT_ID not configured - Analytics disabled');
    }
    return null;
  }

  // Render Google Analytics component from @next/third-parties
  return <GoogleAnalytics gaId={gaId} />;
};

export default Analytics;
