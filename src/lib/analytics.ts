/**
 * Comprehensive Analytics Utilities for GA4 with Consent Mode v2
 *
 * This module provides type-safe tracking for all analytics events across the application.
 * All tracking respects user consent and only fires when analytics consent is granted.
 *
 * Features:
 * - Form tracking with field-level granularity
 * - Video interaction tracking
 * - Button/CTA click tracking
 * - User property management
 * - UTM parameter capture
 * - Conversion tracking
 * - Error tracking
 * - Debug mode for development
 *
 * @see https://developers.google.com/tag-platform/gtagjs/reference
 */

import { CookieCategory } from '@/contexts/CookieConsentContext';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Standard GA4 event parameter types
 */
export interface BaseEventParams {
  page_path?: string;
  page_title?: string;
  page_location?: string;
  [key: string]: string | number | boolean | undefined;
}

/**
 * Form tracking event parameters
 */
export interface FormEventParams extends BaseEventParams {
  form_id: string;
  form_name: string;
  form_destination?: string;
  form_submit_text?: string;
  form_step?: number;
  form_step_name?: string;
  field_name?: string;
  field_value?: string;
  error_message?: string;
  time_to_submit?: number;
}

/**
 * Video tracking event parameters
 */
export interface VideoEventParams extends BaseEventParams {
  video_title: string;
  video_url: string;
  video_provider: 'youtube' | 'vimeo' | 'custom';
  video_current_time?: number;
  video_duration?: number;
  video_percent?: number;
}

/**
 * Button/CTA tracking event parameters
 */
export interface ButtonEventParams extends BaseEventParams {
  button_text: string;
  button_location: string;
  button_destination?: string;
  button_type?: 'primary' | 'secondary' | 'tertiary';
  link_domain?: string;
  link_url?: string;
  outbound?: boolean;
}

/**
 * Conversion event parameters
 */
export interface ConversionEventParams {
  value?: number;
  currency?: string;
  transaction_id?: string;
  items?: Array<Record<string, any>>;
  page_path?: string;
  page_title?: string;
  page_location?: string;
  [key: string]: any;
}

/**
 * Error tracking event parameters
 */
export interface ErrorEventParams extends BaseEventParams {
  error_type: 'javascript' | 'api' | 'form' | 'network' | 'validation';
  error_message: string;
  error_stack?: string;
  error_component?: string;
  error_fatal?: boolean;
}

/**
 * User property types
 */
export interface UserProperties {
  user_type?: 'new' | 'returning';
  device_category?: 'mobile' | 'tablet' | 'desktop';
  traffic_source?: string;
  landing_page?: string;
  session_count?: number;
  first_visit_time?: string;
  [key: string]: string | number | undefined;
}

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

let analyticsInitialized = false;
let debugMode = false;

/**
 * Enable debug mode for development
 * Logs all analytics events to console
 */
export const enableDebugMode = (): void => {
  debugMode = true;
  if (typeof window !== 'undefined') {
    (window as any).gtag?.('set', 'debug_mode', true);
  }
};

/**
 * Disable debug mode
 */
export const disableDebugMode = (): void => {
  debugMode = false;
  if (typeof window !== 'undefined') {
    (window as any).gtag?.('set', 'debug_mode', false);
  }
};

/**
 * Log analytics events in development
 */
const logDebug = (eventName: string, params?: Record<string, any>): void => {
  if (debugMode || process.env.NODE_ENV === 'development') {
    console.log(`[GA4 Event] ${eventName}`, params);
  }
};

// ============================================================================
// CONSENT MANAGEMENT
// ============================================================================

/**
 * Check if analytics consent has been granted
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
 * Get current consent state in Consent Mode v2 format
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
 */
export const updateConsentMode = (consent: {
  analytics_storage: 'granted' | 'denied';
  ad_storage: 'granted' | 'denied';
  ad_user_data: 'granted' | 'denied';
  ad_personalization: 'granted' | 'denied';
}): void => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('consent', 'update', consent);
    logDebug('consent_update', consent);
  }
};

// ============================================================================
// CORE TRACKING FUNCTIONS
// ============================================================================

/**
 * Track a page view with enhanced parameters
 */
export const trackPageView = (params?: {
  url?: string;
  title?: string;
  referrer?: string;
}): void => {
  if (!hasAnalyticsConsent()) return;

  const url = params?.url || (typeof window !== 'undefined' ? window.location.pathname : '');
  const title = params?.title || (typeof window !== 'undefined' ? document.title : '');
  const referrer = params?.referrer || (typeof window !== 'undefined' ? document.referrer : '');

  const eventParams: BaseEventParams = {
    page_path: url,
    page_title: title,
    page_location: typeof window !== 'undefined' ? window.location.href : '',
    page_referrer: referrer,
  };

  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'page_view', eventParams);
    logDebug('page_view', eventParams);
  }
};

/**
 * Track a custom event
 */
export const trackEvent = (eventName: string, eventParams?: Record<string, any>): void => {
  if (!hasAnalyticsConsent()) return;

  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams);
    logDebug(eventName, eventParams);
  }
};

/**
 * Convenience wrapper for GA4 events (alias for trackEvent)
 */
export const trackEventGA4 = trackEvent;

/**
 * Set user properties
 */
export const setUserProperties = (properties: UserProperties): void => {
  if (!hasAnalyticsConsent()) return;

  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('set', 'user_properties', properties);
    logDebug('user_properties_set', properties);
  }
};

// ============================================================================
// FORM TRACKING
// ============================================================================

/**
 * Track form view/impression
 */
export const trackFormView = (params: Pick<FormEventParams, 'form_id' | 'form_name' | 'form_destination'>): void => {
  trackEvent('form_view', {
    ...params,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  });
};

/**
 * Track form start (first interaction)
 */
export const trackFormStart = (params: Pick<FormEventParams, 'form_id' | 'form_name'>): void => {
  trackEvent('form_start', {
    ...params,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  });
};

/**
 * Track form step progression (for multi-step forms)
 */
export const trackFormStep = (params: Pick<FormEventParams, 'form_id' | 'form_name' | 'form_step' | 'form_step_name'>): void => {
  trackEvent('form_step', params);
};

/**
 * Track form field interaction
 */
export const trackFormField = (params: Pick<FormEventParams, 'form_id' | 'form_name' | 'field_name'>): void => {
  trackEvent('form_field_interaction', params);
};

/**
 * Track form submission attempt
 */
export const trackFormSubmit = (params: Pick<FormEventParams, 'form_id' | 'form_name' | 'time_to_submit'>): void => {
  trackEvent('form_submit', params);
};

/**
 * Track successful form submission (conversion)
 */
export const trackFormComplete = (params: Pick<FormEventParams, 'form_id' | 'form_name' | 'form_destination' | 'time_to_submit'>): void => {
  trackEvent('form_complete', params);
};

/**
 * Track form abandonment
 */
export const trackFormAbandonment = (params: Pick<FormEventParams, 'form_id' | 'form_name' | 'form_step' | 'form_step_name'>): void => {
  trackEvent('form_abandon', params);
};

/**
 * Track form validation error
 */
export const trackFormError = (params: Pick<FormEventParams, 'form_id' | 'form_name' | 'field_name' | 'error_message'>): void => {
  trackEvent('form_error', params);
};

// ============================================================================
// VIDEO TRACKING
// ============================================================================

/**
 * Track video impression/load
 */
export const trackVideoView = (params: Pick<VideoEventParams, 'video_title' | 'video_url' | 'video_provider'>): void => {
  trackEvent('video_view', params);
};

/**
 * Track video play start
 */
export const trackVideoStart = (params: Pick<VideoEventParams, 'video_title' | 'video_url' | 'video_provider'>): void => {
  trackEvent('video_start', params);
};

/**
 * Track video progress milestones
 */
export const trackVideoProgress = (params: VideoEventParams): void => {
  trackEvent('video_progress', params);
};

/**
 * Track video completion
 */
export const trackVideoComplete = (params: Pick<VideoEventParams, 'video_title' | 'video_url' | 'video_provider' | 'video_duration'>): void => {
  trackEvent('video_complete', params);
};

// ============================================================================
// BUTTON & CTA TRACKING
// ============================================================================

/**
 * Track button/CTA click
 */
export const trackButtonClick = (params: ButtonEventParams): void => {
  trackEvent('button_click', params);
};

/**
 * Track navigation link click
 */
export const trackNavigationClick = (params: Pick<ButtonEventParams, 'button_text' | 'button_destination' | 'button_location'>): void => {
  trackEvent('navigation_click', params);
};

/**
 * Track external link click
 */
export const trackExternalLink = (params: Pick<ButtonEventParams, 'link_url' | 'link_domain' | 'button_location'>): void => {
  trackEvent('outbound_link', {
    ...params,
    outbound: true,
  });
};

/**
 * Track CTA click (high-value action)
 */
export const trackCTAClick = (params: Pick<ButtonEventParams, 'button_text' | 'button_location' | 'button_destination'>): void => {
  trackEvent('cta_click', params);
};

// ============================================================================
// CONVERSION TRACKING
// ============================================================================

/**
 * Track lead generation (demo request, contact sales)
 * Google recommended event for B2B conversions
 */
export const trackGenerateLead = (params?: ConversionEventParams): void => {
  trackEvent('generate_lead', {
    currency: 'USD',
    value: params?.value || 100, // Estimated lead value
    ...params,
  });
};

/**
 * Track newsletter signup
 */
export const trackNewsletterSignup = (params?: { source?: string }): void => {
  trackEvent('newsletter_signup', {
    value: 10,
    currency: 'USD',
    ...params,
  });
};

/**
 * Track appointment booking (Cal.com)
 */
export const trackBookAppointment = (params?: { appointment_type?: string; source?: string }): void => {
  trackEvent('book_appointment', {
    value: 200, // High-value conversion
    currency: 'USD',
    ...params,
  });
};

/**
 * Track startup application submission
 */
export const trackStartupApplication = (params?: { company_name?: string; annual_revenue?: string }): void => {
  trackEvent('submit_application', {
    value: 150,
    currency: 'USD',
    ...params,
  });
};

/**
 * Track pricing page view (high intent)
 */
export const trackViewPricing = (): void => {
  trackEvent('view_pricing', {
    page_path: '/pricing',
  });
};

// ============================================================================
// ERROR TRACKING
// ============================================================================

/**
 * Track JavaScript error
 */
export const trackError = (params: ErrorEventParams): void => {
  trackEvent('exception', {
    description: params.error_message,
    fatal: params.error_fatal || false,
    ...params,
  });
};

/**
 * Track API call failure
 */
export const trackAPIError = (params: { endpoint: string; status_code?: number; error_message: string }): void => {
  trackError({
    error_type: 'api',
    error_message: `API Error: ${params.endpoint} - ${params.error_message}`,
    error_component: params.endpoint,
    error_fatal: false,
    status_code: params.status_code,
  });
};

// ============================================================================
// SCROLL TRACKING
// ============================================================================

/**
 * Track scroll depth milestone
 */
export const trackScrollDepth = (params: { percent: number; page_path?: string }): void => {
  trackEvent('scroll', {
    percent_scrolled: params.percent,
    page_path: params.page_path || (typeof window !== 'undefined' ? window.location.pathname : ''),
  });
};

// ============================================================================
// ENGAGEMENT TRACKING
// ============================================================================

/**
 * Track user engagement time
 */
export const trackEngagement = (params: { engagement_time: number; page_path?: string }): void => {
  trackEvent('user_engagement', {
    engagement_time_msec: params.engagement_time,
    page_path: params.page_path || (typeof window !== 'undefined' ? window.location.pathname : ''),
  });
};

// ============================================================================
// SEARCH TRACKING
// ============================================================================

/**
 * Track site search (if applicable)
 */
export const trackSiteSearch = (params: { search_term: string; results_count?: number }): void => {
  trackEvent('search', {
    search_term: params.search_term,
    ...params,
  });
};

// ============================================================================
// LEGACY COMPATIBILITY
// ============================================================================

/**
 * Initialize Google Analytics (GA4)
 * Note: GA4 is now initialized in layout.tsx with Consent Mode v2
 * This function is kept for backward compatibility but is not required
 */
export const initializeGoogleAnalytics = (measurementId: string): void => {
  if (analyticsInitialized || !hasAnalyticsConsent()) {
    return;
  }

  if (typeof window === 'undefined') return;

  // GA4 is already loaded via layout.tsx
  // This function is for backward compatibility only
  analyticsInitialized = true;
  logDebug('analytics_initialized', { measurementId });
};

/**
 * Disable all analytics tracking
 */
export const disableAnalytics = (): void => {
  if (typeof window === 'undefined') return;

  if ((window as any).gtag) {
    (window as any)['ga-disable-all'] = true;
  }

  const cookiesToClear = ['_ga', '_gid', '_gat', '_ga_*'];
  cookiesToClear.forEach((cookieName) => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });

  analyticsInitialized = false;
  logDebug('analytics_disabled', {});
};

/**
 * Initialize all analytics services based on consent
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

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  // Consent
  hasAnalyticsConsent,
  getConsentModeState,
  updateConsentMode,

  // Core tracking
  trackPageView,
  trackEvent,
  trackEventGA4,
  setUserProperties,

  // Forms
  trackFormView,
  trackFormStart,
  trackFormStep,
  trackFormField,
  trackFormSubmit,
  trackFormComplete,
  trackFormAbandonment,
  trackFormError,

  // Video
  trackVideoView,
  trackVideoStart,
  trackVideoProgress,
  trackVideoComplete,

  // Buttons & CTAs
  trackButtonClick,
  trackNavigationClick,
  trackExternalLink,
  trackCTAClick,

  // Conversions
  trackGenerateLead,
  trackNewsletterSignup,
  trackBookAppointment,
  trackStartupApplication,
  trackViewPricing,

  // Errors
  trackError,
  trackAPIError,

  // Engagement
  trackScrollDepth,
  trackEngagement,
  trackSiteSearch,

  // Debug
  enableDebugMode,
  disableDebugMode,

  // Legacy
  initializeAnalytics,
  disableAnalytics,
};
