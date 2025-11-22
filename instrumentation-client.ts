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

import type { PostHog } from 'posthog-js';

/**
 * Generate a unique anonymous user ID
 */
const generateAnonymousId = (): string => {
  return `anon_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
};

/**
 * Get or create user ID for tracking
 */
const getUserId = (): string => {
  if (typeof window === 'undefined') return '';

  try {
    // Check for existing user ID
    let userId = localStorage.getItem('pullse_user_id');

    if (!userId) {
      // Generate new anonymous ID
      userId = generateAnonymousId();
      localStorage.setItem('pullse_user_id', userId);
    }

    return userId;
  } catch (error) {
    console.error('[PostHog] Error getting user ID:', error);
    return generateAnonymousId();
  }
};

/**
 * Get UTM parameters from URL
 */
const getUTMParams = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};

  try {
    const params = new URLSearchParams(window.location.search);
    const utmParams: Record<string, string> = {};

    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((param) => {
      const value = params.get(param);
      if (value) {
        utmParams[param] = value;
      }
    });

    return utmParams;
  } catch (error) {
    return {};
  }
};

/**
 * Get visit count for current user
 */
const getVisitCount = (): number => {
  if (typeof window === 'undefined') return 1;

  try {
    const count = parseInt(localStorage.getItem('pullse_visit_count') || '0', 10);
    const newCount = count + 1;
    localStorage.setItem('pullse_visit_count', newCount.toString());
    return newCount;
  } catch (error) {
    return 1;
  }
};

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
let posthogClient: PostHog | null = null;
let posthogInitialized = false;
let posthogIdentified = false;

const loadPostHog = async (): Promise<PostHog | null> => {
  try {
    if (posthogClient) return posthogClient;
    const { default: posthog } = await import('posthog-js');
    posthogClient = posthog;
    return posthogClient;
  } catch (error) {
    console.error('[PostHog] Failed to load client', error);
    return null;
  }
};

const initPostHog = async (): Promise<PostHog | null> => {
  if (posthogInitialized) return posthogClient;

  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const apiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  if (!apiKey || !apiHost) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[PostHog] API key or host not configured');
    }
    return null;
  }

  const posthog = await loadPostHog();
  if (!posthog) return null;

  posthog.init(apiKey, {
    api_host: apiHost,
    defaults: '2025-05-24', // Required: API configuration version
    person_profiles: 'identified_only', // Only create profiles for identified users

    // Page Navigation Tracking
    capture_pageview: true, // Auto-capture page views
    capture_pageleave: true, // Track when users leave pages
    save_referrer: true, // Track referrers
    save_campaign_params: true, // Track UTM parameters
    disable_scroll_properties: false, // Enable scroll depth tracking

    // User Interaction Autocapture
    autocapture: {
      capture_copied_text: true, // Track copy/cut text
      url_ignorelist: [/\/admin/, /\/private/], // Exclude sensitive pages
      element_attribute_ignorelist: ['data-sensitive'], // Exclude sensitive attributes
    },

    // Frustration Signal Detection
    rageclick: true, // Detect rapid clicking (user frustration)
    capture_dead_clicks: true, // Detect clicks with no effect

    // Performance Monitoring
    capture_performance: {
      web_vitals: true, // Track Core Web Vitals (LCP, FCP, CLS, INP)
      network_timing: true, // Track network performance
      web_vitals_allowed_metrics: ['LCP', 'CLS', 'FCP', 'INP'],
      web_vitals_delayed_flush_ms: 5000, // Batch web vitals events
    },

    // Error Tracking
    capture_exceptions: {
      capture_unhandled_errors: true, // Track unhandled errors
      capture_unhandled_rejections: true, // Track promise rejections
      capture_console_errors: false, // Don't track console.error() to avoid sensitive logs
    },

    // Session Recording Configuration
    disable_session_recording: false, // Enable session recording
    session_recording: {
      maskAllInputs: true, // Mask all input fields by default
      maskTextSelector: '[data-private], .private', // Mask elements with data-private attribute
      recordCrossOriginIframes: false, // Don't record cross-origin iframes
    },
    enable_recording_console_log: true, // Record console logs in sessions

    // Heatmap Data Collection
    capture_heatmaps: true, // Enable heatmap data capture

    // Privacy Controls
    mask_all_text: false, // Don't mask all text (we want to see content)
    mask_all_element_attributes: false, // Don't mask attributes
    mask_personal_data_properties: true, // Mask gclid, fbclid, etc.

    loaded: (ph) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('[PostHog] Initialized successfully with session recordings');
        ph.debug(); // Enable debug mode in development
      }

      if (!posthogIdentified) {
        // Identify user for cross-session tracking
        const userId = getUserId();
        if (userId) {
          ph.identify(userId);

          // Set user properties
          const utmParams = getUTMParams();
          const visitCount = getVisitCount();
          const referrer = document.referrer || 'direct';
          const landingPage = window.location.pathname;

          ph.setPersonProperties({
            device_type: /mobile/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
            browser: navigator.userAgent,
            visit_count: visitCount,
            referrer,
            landing_page: visitCount === 1 ? landingPage : undefined,
            first_visit: visitCount === 1,
            ...utmParams,
          });

          if (process.env.NODE_ENV === 'development') {
            console.log('[PostHog] User identified:', userId);
            console.log('[PostHog] User properties set:', { visitCount, utmParams, referrer });
          }
        }

        // Send installation verification event
        ph.capture('posthog_installation_verified', {
          environment: process.env.NODE_ENV || 'production',
          timestamp: new Date().toISOString(),
          source: 'instrumentation-client',
          consent_granted: hasAnalyticsConsent(),
          session_recording_enabled: true,
        });

        if (process.env.NODE_ENV === 'development') {
          console.log('[PostHog] Installation verification event sent');
        }

        posthogIdentified = true;
      }
    },
  });

  posthogInitialized = true;
  return posthog;
};

const applyConsent = async (analyticsAllowed: boolean) => {
  if (!analyticsAllowed) {
    if (posthogInitialized && posthogClient) {
      posthogClient.opt_out_capturing();
      if (process.env.NODE_ENV === 'development') {
        console.log('[PostHog] Consent revoked - opted out');
      }
    }
    return;
  }

  const posthog = await initPostHog();
  if (!posthog) return;

  posthog.opt_in_capturing();
  if (process.env.NODE_ENV === 'development') {
    console.log('[PostHog] Opted in (analytics consent granted)');
  }
};

// Initialize PostHog on client when consent is present
if (typeof window !== 'undefined') {
  void applyConsent(hasAnalyticsConsent());

  // Listen for consent changes
  window.addEventListener('cookieConsentUpdated', ((event: CustomEvent) => {
    const { analytics } = event.detail || {};
    void applyConsent(Boolean(analytics));
  }) as EventListener);
}

export {};
