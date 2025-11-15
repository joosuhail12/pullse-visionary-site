/**
 * PostHog Analytics Utilities
 *
 * Consent-aware wrapper functions for PostHog event tracking.
 * All functions check for analytics consent before sending events.
 *
 * @see https://posthog.com/docs/product-analytics/capture-events
 */

import posthog from 'posthog-js';

/**
 * Check if analytics consent has been granted
 */
export const hasPostHogConsent = (): boolean => {
  if (typeof window === 'undefined') return false;

  try {
    const consent = localStorage.getItem('pullse_cookie_consent');
    if (!consent) return false;

    const parsed = JSON.parse(consent);
    return parsed?.analytics === true;
  } catch (error) {
    return false;
  }
};

/**
 * Track a custom event in PostHog
 *
 * @param eventName - Name of the event to track
 * @param properties - Optional properties to attach to the event
 */
export const trackPostHogEvent = (
  eventName: string,
  properties?: Record<string, any>
): void => {
  if (!hasPostHogConsent()) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[PostHog] Event blocked (no consent):', eventName);
    }
    return;
  }

  try {
    posthog.capture(eventName, {
      ...properties,
      $current_url: typeof window !== 'undefined' ? window.location.href : undefined,
    });

    if (process.env.NODE_ENV === 'development') {
      console.log('[PostHog] Event tracked:', eventName, properties);
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[PostHog] Error tracking event:', error);
    }
  }
};

/**
 * Identify a user in PostHog
 *
 * @param userId - Unique user identifier
 * @param userProperties - Optional user properties
 */
export const identifyPostHogUser = (
  userId: string,
  userProperties?: Record<string, any>
): void => {
  if (!hasPostHogConsent()) return;

  try {
    posthog.identify(userId, userProperties);

    if (process.env.NODE_ENV === 'development') {
      console.log('[PostHog] User identified:', userId);
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[PostHog] Error identifying user:', error);
    }
  }
};

/**
 * Set user properties in PostHog
 *
 * @param properties - User properties to set
 */
export const setPostHogUserProperties = (
  properties: Record<string, any>
): void => {
  if (!hasPostHogConsent()) return;

  try {
    posthog.setPersonProperties(properties);

    if (process.env.NODE_ENV === 'development') {
      console.log('[PostHog] User properties set:', properties);
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[PostHog] Error setting user properties:', error);
    }
  }
};

/**
 * Reset PostHog user (e.g., on logout)
 */
export const resetPostHogUser = (): void => {
  if (!hasPostHogConsent()) return;

  try {
    posthog.reset();

    if (process.env.NODE_ENV === 'development') {
      console.log('[PostHog] User reset');
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[PostHog] Error resetting user:', error);
    }
  }
};

/**
 * Track a page view in PostHog
 *
 * @param pageName - Optional custom page name
 */
export const trackPostHogPageView = (pageName?: string): void => {
  if (!hasPostHogConsent()) return;

  try {
    posthog.capture('$pageview', {
      $current_url: typeof window !== 'undefined' ? window.location.href : undefined,
      page_name: pageName,
    });

    if (process.env.NODE_ENV === 'development') {
      console.log('[PostHog] Page view tracked:', pageName || window.location.pathname);
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[PostHog] Error tracking page view:', error);
    }
  }
};

/**
 * Check if PostHog is initialized and available
 */
export const isPostHogAvailable = (): boolean => {
  return typeof posthog !== 'undefined' && posthog.__loaded;
};

export default {
  trackPostHogEvent,
  identifyPostHogUser,
  setPostHogUserProperties,
  resetPostHogUser,
  trackPostHogPageView,
  hasPostHogConsent,
  isPostHogAvailable,
};
