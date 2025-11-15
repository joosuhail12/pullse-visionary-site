/**
 * UTM Parameter Tracking and Management
 *
 * Captures, persists, and retrieves UTM parameters for marketing attribution.
 * UTM parameters are stored in sessionStorage to persist across page navigations.
 *
 * Tracked parameters:
 * - utm_source: Traffic source (e.g., google, newsletter, facebook)
 * - utm_medium: Marketing medium (e.g., cpc, email, social)
 * - utm_campaign: Campaign name
 * - utm_term: Paid search keywords
 * - utm_content: Content variation for A/B testing
 *
 * @see https://support.google.com/analytics/answer/1033863
 */

const UTM_STORAGE_KEY = 'pullse_utm_params';
const UTM_EXPIRY_KEY = 'pullse_utm_expiry';
const UTM_SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

/**
 * UTM parameter interface
 */
export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  utm_id?: string;
  first_touch_time?: string;
  last_touch_time?: string;
}

/**
 * Extract UTM parameters from URL
 */
export const getUTMFromURL = (url?: string): UTMParams | null => {
  if (typeof window === 'undefined') return null;

  const urlString = url || window.location.href;
  const urlObj = new URL(urlString);
  const params: UTMParams = {};

  // Extract all UTM parameters
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id'];
  let hasUTM = false;

  utmKeys.forEach(key => {
    const value = urlObj.searchParams.get(key);
    if (value) {
      params[key as keyof UTMParams] = value;
      hasUTM = true;
    }
  });

  return hasUTM ? params : null;
};

/**
 * Save UTM parameters to sessionStorage
 */
export const saveUTMParams = (params: UTMParams): void => {
  if (typeof window === 'undefined') return;

  try {
    const now = new Date().toISOString();
    const existing = getStoredUTMParams();

    const updatedParams: UTMParams = {
      ...params,
      first_touch_time: existing?.first_touch_time || now,
      last_touch_time: now,
    };

    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(updatedParams));
    sessionStorage.setItem(UTM_EXPIRY_KEY, (Date.now() + UTM_SESSION_DURATION).toString());

    if (process.env.NODE_ENV === 'development') {
      console.log('[UTM] Saved parameters:', updatedParams);
    }
  } catch (error) {
    console.error('[UTM] Failed to save parameters:', error);
  }
};

/**
 * Get stored UTM parameters from sessionStorage
 */
export const getStoredUTMParams = (): UTMParams | null => {
  if (typeof window === 'undefined') return null;

  try {
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
    const expiry = sessionStorage.getItem(UTM_EXPIRY_KEY);

    if (!stored || !expiry) return null;

    // Check if expired
    if (Date.now() > parseInt(expiry)) {
      clearUTMParams();
      return null;
    }

    return JSON.parse(stored);
  } catch (error) {
    console.error('[UTM] Failed to retrieve parameters:', error);
    return null;
  }
};

/**
 * Get UTM parameters (from URL or storage)
 * Prioritizes URL parameters, falls back to stored parameters
 */
export const getUTMParams = (): UTMParams | null => {
  const urlParams = getUTMFromURL();

  if (urlParams) {
    // New UTM parameters in URL, save them
    saveUTMParams(urlParams);
    return urlParams;
  }

  // No UTM in URL, return stored parameters
  return getStoredUTMParams();
};

/**
 * Clear stored UTM parameters
 */
export const clearUTMParams = (): void => {
  if (typeof window === 'undefined') return;

  try {
    sessionStorage.removeItem(UTM_STORAGE_KEY);
    sessionStorage.removeItem(UTM_EXPIRY_KEY);

    if (process.env.NODE_ENV === 'development') {
      console.log('[UTM] Cleared parameters');
    }
  } catch (error) {
    console.error('[UTM] Failed to clear parameters:', error);
  }
};

/**
 * Initialize UTM tracking
 * Call this on app load to capture and persist UTM parameters
 */
export const initUTMTracking = (): UTMParams | null => {
  if (typeof window === 'undefined') return null;

  const params = getUTMParams();

  if (params && process.env.NODE_ENV === 'development') {
    console.log('[UTM] Active parameters:', params);
  }

  return params;
};

/**
 * Get UTM parameters as query string
 */
export const getUTMQueryString = (): string => {
  const params = getUTMParams();
  if (!params) return '';

  const queryParts: string[] = [];

  Object.entries(params).forEach(([key, value]) => {
    // Skip internal tracking fields
    if (key === 'first_touch_time' || key === 'last_touch_time') return;
    if (value) {
      queryParts.push(`${key}=${encodeURIComponent(value)}`);
    }
  });

  return queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
};

/**
 * Append UTM parameters to a URL
 */
export const appendUTMToURL = (url: string): string => {
  const params = getUTMParams();
  if (!params) return url;

  const urlObj = new URL(url, window.location.origin);

  Object.entries(params).forEach(([key, value]) => {
    // Skip internal tracking fields
    if (key === 'first_touch_time' || key === 'last_touch_time') return;
    if (value && !urlObj.searchParams.has(key)) {
      urlObj.searchParams.set(key, value);
    }
  });

  return urlObj.toString();
};

/**
 * Get traffic source information
 */
export const getTrafficSource = (): {
  source: string;
  medium: string;
  campaign?: string;
} => {
  const utmParams = getUTMParams();

  if (utmParams?.utm_source && utmParams?.utm_medium) {
    return {
      source: utmParams.utm_source,
      medium: utmParams.utm_medium,
      campaign: utmParams.utm_campaign,
    };
  }

  // Fallback: detect from referrer
  if (typeof window !== 'undefined' && document.referrer) {
    try {
      const referrerURL = new URL(document.referrer);
      const referrerDomain = referrerURL.hostname;

      // Common sources
      if (referrerDomain.includes('google.')) {
        return { source: 'google', medium: 'organic' };
      }
      if (referrerDomain.includes('facebook.') || referrerDomain.includes('fb.')) {
        return { source: 'facebook', medium: 'social' };
      }
      if (referrerDomain.includes('twitter.') || referrerDomain.includes('t.co')) {
        return { source: 'twitter', medium: 'social' };
      }
      if (referrerDomain.includes('linkedin.')) {
        return { source: 'linkedin', medium: 'social' };
      }
      if (referrerDomain.includes('youtube.')) {
        return { source: 'youtube', medium: 'video' };
      }

      return { source: referrerDomain, medium: 'referral' };
    } catch {
      return { source: 'direct', medium: 'none' };
    }
  }

  return { source: 'direct', medium: 'none' };
};

/**
 * Check if user came from paid advertising
 */
export const isPaidTraffic = (): boolean => {
  const params = getUTMParams();
  if (!params?.utm_medium) return false;

  const paidMediums = ['cpc', 'ppc', 'paid', 'paidsearch', 'cpm', 'cpv', 'cpa'];
  return paidMediums.includes(params.utm_medium.toLowerCase());
};

/**
 * Check if user came from organic search
 */
export const isOrganicTraffic = (): boolean => {
  const { medium } = getTrafficSource();
  return medium === 'organic';
};

/**
 * Check if user came from social media
 */
export const isSocialTraffic = (): boolean => {
  const params = getUTMParams();
  if (params?.utm_medium === 'social') return true;

  const { source, medium } = getTrafficSource();
  const socialSources = ['facebook', 'twitter', 'linkedin', 'instagram', 'youtube', 'tiktok'];
  return medium === 'social' || socialSources.includes(source);
};

export default {
  getUTMFromURL,
  saveUTMParams,
  getStoredUTMParams,
  getUTMParams,
  clearUTMParams,
  initUTMTracking,
  getUTMQueryString,
  appendUTMToURL,
  getTrafficSource,
  isPaidTraffic,
  isOrganicTraffic,
  isSocialTraffic,
};
