/**
 * PostHog Server-Side Tracking
 *
 * Server-side PostHog client for tracking backend events like:
 * - Form submissions (after validation)
 * - API responses
 * - Email sends/deliveries
 * - User lifecycle events
 * - Backend errors
 *
 * @see https://posthog.com/docs/libraries/node
 */

import { PostHog } from 'posthog-node';

// Singleton instance
let posthogInstance: PostHog | null = null;

/**
 * Get or create PostHog server instance
 */
export const getPostHogServer = (): PostHog | null => {
  if (posthogInstance) {
    return posthogInstance;
  }

  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const apiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

  if (!apiKey) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[PostHog Server] API key not configured');
    }
    return null;
  }

  try {
    posthogInstance = new PostHog(apiKey, {
      host: apiHost,
    });

    if (process.env.NODE_ENV === 'development') {
      console.log('[PostHog Server] Initialized successfully');
    }

    return posthogInstance;
  } catch (error) {
    console.error('[PostHog Server] Initialization error:', error);
    return null;
  }
};

/**
 * Track a server-side event
 *
 * @param userId - User identifier (can be anonymous ID from frontend)
 * @param eventName - Name of the event
 * @param properties - Event properties
 */
export const trackServerEvent = async (
  userId: string,
  eventName: string,
  properties?: Record<string, any>
): Promise<void> => {
  const posthog = getPostHogServer();
  if (!posthog) return;

  try {
    posthog.capture({
      distinctId: userId,
      event: eventName,
      properties: {
        ...properties,
        $lib: 'posthog-node',
        server_side: true,
      },
    });

    if (process.env.NODE_ENV === 'development') {
      console.log('[PostHog Server] Event tracked:', eventName, properties);
    }
  } catch (error) {
    console.error('[PostHog Server] Error tracking event:', error);
  }
};

/**
 * Identify a user on the server side
 *
 * @param userId - User identifier
 * @param properties - User properties
 */
export const identifyServerUser = async (
  userId: string,
  properties?: Record<string, any>
): Promise<void> => {
  const posthog = getPostHogServer();
  if (!posthog) return;

  try {
    posthog.identify({
      distinctId: userId,
      properties,
    });

    if (process.env.NODE_ENV === 'development') {
      console.log('[PostHog Server] User identified:', userId);
    }
  } catch (error) {
    console.error('[PostHog Server] Error identifying user:', error);
  }
};

/**
 * Set user properties on the server side
 *
 * @param userId - User identifier
 * @param properties - Properties to set
 */
export const setServerUserProperties = async (
  userId: string,
  properties: Record<string, any>
): Promise<void> => {
  const posthog = getPostHogServer();
  if (!posthog) return;

  try {
    posthog.identify({
      distinctId: userId,
      properties: {
        $set: properties,
      },
    });

    if (process.env.NODE_ENV === 'development') {
      console.log('[PostHog Server] User properties set:', userId, properties);
    }
  } catch (error) {
    console.error('[PostHog Server] Error setting user properties:', error);
  }
};

/**
 * Track a group/organization event
 *
 * @param userId - User identifier
 * @param groupType - Type of group (e.g., 'company', 'organization')
 * @param groupId - Group identifier
 * @param properties - Group properties
 */
export const trackServerGroupEvent = async (
  userId: string,
  groupType: string,
  groupId: string,
  properties?: Record<string, any>
): Promise<void> => {
  const posthog = getPostHogServer();
  if (!posthog) return;

  try {
    posthog.groupIdentify({
      groupType,
      groupKey: groupId,
      properties,
    });

    if (process.env.NODE_ENV === 'development') {
      console.log('[PostHog Server] Group event tracked:', groupType, groupId);
    }
  } catch (error) {
    console.error('[PostHog Server] Error tracking group event:', error);
  }
};

/**
 * Flush all pending events
 * Call this before serverless function terminates
 */
export const flushServerEvents = async (): Promise<void> => {
  const posthog = getPostHogServer();
  if (!posthog) return;

  try {
    await posthog.shutdown();
    if (process.env.NODE_ENV === 'development') {
      console.log('[PostHog Server] Events flushed');
    }
  } catch (error) {
    console.error('[PostHog Server] Error flushing events:', error);
  }
};

/**
 * Correlate frontend and backend events by user ID
 *
 * Helper to ensure same user ID is used across client and server tracking
 */
export const correlateUserEvent = async (
  userId: string,
  frontendEventName: string,
  backendEventName: string,
  properties?: Record<string, any>
): Promise<void> => {
  await trackServerEvent(userId, backendEventName, {
    ...properties,
    correlated_with: frontendEventName,
    correlation_timestamp: new Date().toISOString(),
  });
};

export default {
  trackServerEvent,
  identifyServerUser,
  setServerUserProperties,
  trackServerGroupEvent,
  flushServerEvents,
  correlateUserEvent,
};
