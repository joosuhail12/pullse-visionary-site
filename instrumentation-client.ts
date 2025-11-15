/**
 * PostHog Client Instrumentation
 *
 * Initializes PostHog analytics on the client side with cookie consent integration.
 * This file runs once during client initialization (Next.js 15.3+ feature).
 *
 * Features:
 * - Respects user cookie consent preferences
 * - Listens for consent changes and updates PostHog opt-in/opt-out
 * - Only initializes if analytics consent is granted
 * - Integrates with existing Pullse cookie consent system
 *
 * @see https://posthog.com/docs/libraries/next-js
 */

import posthog from 'posthog-js';

/**
 * Check if analytics consent has been granted
 */
const hasAnalyticsConsent = (): boolean => {
  if (typeof window === 'undefined') return false;

  try {
    const consent = localStorage.getItem('pullse_cookie_consent');
    if (!consent) return false;

    const parsed = JSON.parse(consent);
    return parsed?.analytics === true;
  } catch (error) {
    console.error('[PostHog] Error checking consent:', error);
    return false;
  }
};

/**
 * Initialize PostHog with consent check
 */
const initPostHog = (): void => {
  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const apiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  if (!apiKey || !apiHost) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[PostHog] API key or host not configured');
    }
    return;
  }

  // Initialize PostHog
  posthog.init(apiKey, {
    api_host: apiHost,
    person_profiles: 'identified_only', // Only create profiles for identified users
    capture_pageview: true, // Auto-capture page views
    capture_pageleave: true, // Track when users leave pages
    autocapture: true, // Enable automatic event tracking
    disable_session_recording: true, // Disable session recording by default for privacy
    loaded: (ph) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('[PostHog] Initialized successfully');
        ph.debug(); // Enable debug mode in development
      }
    },
  });

  // Check initial consent
  if (!hasAnalyticsConsent()) {
    posthog.opt_out_capturing();
    if (process.env.NODE_ENV === 'development') {
      console.log('[PostHog] Opted out (no analytics consent)');
    }
  } else {
    posthog.opt_in_capturing();
    if (process.env.NODE_ENV === 'development') {
      console.log('[PostHog] Opted in (analytics consent granted)');
    }
  }

  // Listen for consent changes
  window.addEventListener('cookieConsentUpdated', ((event: CustomEvent) => {
    const { analytics } = event.detail;

    if (analytics) {
      posthog.opt_in_capturing();
      if (process.env.NODE_ENV === 'development') {
        console.log('[PostHog] Consent granted - opted in');
      }
    } else {
      posthog.opt_out_capturing();
      if (process.env.NODE_ENV === 'development') {
        console.log('[PostHog] Consent revoked - opted out');
      }
    }
  }) as EventListener);
};

// Initialize PostHog on client
if (typeof window !== 'undefined') {
  initPostHog();
}

export {};
