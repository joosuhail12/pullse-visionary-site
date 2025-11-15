/**
 * useAnalytics Hook
 *
 * Provides easy access to analytics tracking methods in React components.
 * Automatically checks consent before tracking events.
 *
 * Usage:
 * ```typescript
 * const analytics = useAnalytics();
 *
 * analytics.trackButtonClick({
 *   button_text: 'Sign Up',
 *   button_location: 'header',
 * });
 * ```
 */

import { useCallback } from 'react';
import {
  trackEvent,
  trackButtonClick,
  trackFormStart,
  trackFormComplete,
  trackFormError,
  trackVideoStart,
  trackVideoComplete,
  trackCTAClick,
  trackGenerateLead,
  trackNewsletterSignup,
  trackBookAppointment,
  trackScrollDepth,
  trackEngagement,
  setUserProperties,
  hasAnalyticsConsent,
  type ButtonEventParams,
  type FormEventParams,
  type VideoEventParams,
  type UserProperties,
} from '@/lib/analytics';

/**
 * Hook return type with all tracking methods
 */
export interface UseAnalyticsReturn {
  // Core tracking
  trackEvent: (eventName: string, params?: Record<string, any>) => void;
  setUserProperties: (properties: UserProperties) => void;
  hasConsent: () => boolean;

  // Button/CTA tracking
  trackButtonClick: (params: ButtonEventParams) => void;
  trackCTAClick: (params: Pick<ButtonEventParams, 'button_text' | 'button_location' | 'button_destination'>) => void;

  // Form tracking
  trackFormStart: (params: Pick<FormEventParams, 'form_id' | 'form_name'>) => void;
  trackFormComplete: (params: Pick<FormEventParams, 'form_id' | 'form_name' | 'form_destination' | 'time_to_submit'>) => void;
  trackFormError: (params: Pick<FormEventParams, 'form_id' | 'form_name' | 'field_name' | 'error_message'>) => void;

  // Video tracking
  trackVideoStart: (params: Pick<VideoEventParams, 'video_title' | 'video_url' | 'video_provider'>) => void;
  trackVideoComplete: (params: Pick<VideoEventParams, 'video_title' | 'video_url' | 'video_provider' | 'video_duration'>) => void;

  // Conversion tracking
  trackGenerateLead: () => void;
  trackNewsletterSignup: (source?: string) => void;
  trackBookAppointment: (source?: string) => void;

  // Engagement tracking
  trackScrollDepth: (percent: number) => void;
  trackEngagement: (engagementTime: number) => void;
}

/**
 * Analytics hook for component-level tracking
 */
export const useAnalytics = (): UseAnalyticsReturn => {
  // Core tracking
  const handleTrackEvent = useCallback((eventName: string, params?: Record<string, any>) => {
    trackEvent(eventName, params);
  }, []);

  const handleSetUserProperties = useCallback((properties: UserProperties) => {
    setUserProperties(properties);
  }, []);

  const handleHasConsent = useCallback(() => {
    return hasAnalyticsConsent();
  }, []);

  // Button/CTA tracking
  const handleTrackButtonClick = useCallback((params: ButtonEventParams) => {
    trackButtonClick(params);
  }, []);

  const handleTrackCTAClick = useCallback((params: Pick<ButtonEventParams, 'button_text' | 'button_location' | 'button_destination'>) => {
    trackCTAClick(params);
  }, []);

  // Form tracking
  const handleTrackFormStart = useCallback((params: Pick<FormEventParams, 'form_id' | 'form_name'>) => {
    trackFormStart(params);
  }, []);

  const handleTrackFormComplete = useCallback((params: Pick<FormEventParams, 'form_id' | 'form_name' | 'form_destination' | 'time_to_submit'>) => {
    trackFormComplete(params);
  }, []);

  const handleTrackFormError = useCallback((params: Pick<FormEventParams, 'form_id' | 'form_name' | 'field_name' | 'error_message'>) => {
    trackFormError(params);
  }, []);

  // Video tracking
  const handleTrackVideoStart = useCallback((params: Pick<VideoEventParams, 'video_title' | 'video_url' | 'video_provider'>) => {
    trackVideoStart(params);
  }, []);

  const handleTrackVideoComplete = useCallback((params: Pick<VideoEventParams, 'video_title' | 'video_url' | 'video_provider' | 'video_duration'>) => {
    trackVideoComplete(params);
  }, []);

  // Conversion tracking
  const handleTrackGenerateLead = useCallback(() => {
    trackGenerateLead();
  }, []);

  const handleTrackNewsletterSignup = useCallback((source?: string) => {
    trackNewsletterSignup({ source });
  }, []);

  const handleTrackBookAppointment = useCallback((source?: string) => {
    trackBookAppointment({ source });
  }, []);

  // Engagement tracking
  const handleTrackScrollDepth = useCallback((percent: number) => {
    trackScrollDepth({ percent });
  }, []);

  const handleTrackEngagement = useCallback((engagementTime: number) => {
    trackEngagement({ engagement_time: engagementTime });
  }, []);

  return {
    // Core
    trackEvent: handleTrackEvent,
    setUserProperties: handleSetUserProperties,
    hasConsent: handleHasConsent,

    // Buttons/CTAs
    trackButtonClick: handleTrackButtonClick,
    trackCTAClick: handleTrackCTAClick,

    // Forms
    trackFormStart: handleTrackFormStart,
    trackFormComplete: handleTrackFormComplete,
    trackFormError: handleTrackFormError,

    // Video
    trackVideoStart: handleTrackVideoStart,
    trackVideoComplete: handleTrackVideoComplete,

    // Conversions
    trackGenerateLead: handleTrackGenerateLead,
    trackNewsletterSignup: handleTrackNewsletterSignup,
    trackBookAppointment: handleTrackBookAppointment,

    // Engagement
    trackScrollDepth: handleTrackScrollDepth,
    trackEngagement: handleTrackEngagement,
  };
};

export default useAnalytics;
