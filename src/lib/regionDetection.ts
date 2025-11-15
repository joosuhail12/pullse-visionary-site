/**
 * Utility for detecting user's region for GDPR compliance
 * Used to set region-specific consent defaults per Google Consent Mode v2
 */

/**
 * List of EEA (European Economic Area) country codes
 * Based on ISO 3166-1 alpha-2 codes
 *
 * Includes all EU member states plus EEA countries (Iceland, Liechtenstein, Norway)
 * and UK (maintains GDPR-equivalent regulations)
 */
const EEA_COUNTRIES = [
  'AT', // Austria
  'BE', // Belgium
  'BG', // Bulgaria
  'HR', // Croatia
  'CY', // Cyprus
  'CZ', // Czech Republic
  'DK', // Denmark
  'EE', // Estonia
  'FI', // Finland
  'FR', // France
  'DE', // Germany
  'GR', // Greece
  'HU', // Hungary
  'IE', // Ireland
  'IT', // Italy
  'LV', // Latvia
  'LT', // Lithuania
  'LU', // Luxembourg
  'MT', // Malta
  'NL', // Netherlands
  'PL', // Poland
  'PT', // Portugal
  'RO', // Romania
  'SK', // Slovakia
  'SI', // Slovenia
  'ES', // Spain
  'SE', // Sweden
  'IS', // Iceland (EEA, not EU)
  'LI', // Liechtenstein (EEA, not EU)
  'NO', // Norway (EEA, not EU)
  'GB', // United Kingdom (post-Brexit, maintains GDPR-equivalent)
  'UK', // Alternative code for United Kingdom
];

/**
 * Detect if user is from EEA/GDPR region
 *
 * Detection methods (in order of reliability):
 * 1. Intl.DateTimeFormat API (client-side timezone detection)
 * 2. Browser language preferences
 *
 * Note: This is a best-effort client-side detection. For more reliable
 * detection, consider server-side geolocation via IP address.
 *
 * @returns true if user appears to be from EEA region
 */
export const isEEARegion = (): boolean => {
  if (typeof window === 'undefined') {
    // Server-side: default to EEA compliance (safer default)
    return true;
  }

  try {
    // Method 1: Try to detect region via Intl API
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Common European timezones
    const europeanTimezones = [
      'Europe/',
      'Atlantic/Reykjavik', // Iceland
      'Atlantic/Faroe', // Faroe Islands (Denmark)
      'Atlantic/Canary', // Canary Islands (Spain)
      'Atlantic/Madeira', // Madeira (Portugal)
    ];

    if (europeanTimezones.some(tz => timeZone?.startsWith(tz))) {
      return true;
    }

    // Method 2: Check browser language settings
    const language = navigator.language || (navigator as any).userLanguage;
    if (language) {
      // Extract country code from language (e.g., 'en-GB' -> 'GB')
      const countryCode = language.split('-')[1]?.toUpperCase();
      if (countryCode && EEA_COUNTRIES.includes(countryCode)) {
        return true;
      }
    }

    // Method 3: Check all navigator languages
    if (navigator.languages) {
      for (const lang of navigator.languages) {
        const countryCode = lang.split('-')[1]?.toUpperCase();
        if (countryCode && EEA_COUNTRIES.includes(countryCode)) {
          return true;
        }
      }
    }

    // Default to non-EEA if no indicators found
    return false;
  } catch (error) {
    // On error, default to EEA compliance (safer)
    console.warn('Error detecting region, defaulting to EEA compliance:', error);
    return true;
  }
};

/**
 * Get region code for consent mode regional settings
 * Returns array of region codes to pass to gtag consent default
 *
 * @returns Array of ISO 3166-2 region codes, or undefined for global
 */
export const getConsentRegions = (): string[] | undefined => {
  if (isEEARegion()) {
    return EEA_COUNTRIES;
  }
  return undefined; // Global default
};
