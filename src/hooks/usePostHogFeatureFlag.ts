/**
 * PostHog Feature Flag Hook
 *
 * React hook for accessing PostHog feature flags in components.
 * Enables A/B testing and gradual feature rollouts.
 *
 * @example
 * ```tsx
 * const NewFeature = () => {
 *   const showNewDesign = usePostHogFeatureFlag('new-pricing-page');
 *
 *   if (showNewDesign) {
 *     return <NewPricingPage />;
 *   }
 *   return <OldPricingPage />;
 * };
 * ```
 */

import { useEffect, useState } from 'react';
import posthog from 'posthog-js';
import { hasPostHogConsent } from '@/lib/posthog';

/**
 * Hook to check if a PostHog feature flag is enabled
 *
 * @param flagKey - The feature flag key to check
 * @param defaultValue - Default value if flag is not loaded or consent not granted
 * @returns boolean indicating if the flag is enabled
 */
export const usePostHogFeatureFlag = (
  flagKey: string,
  defaultValue: boolean = false
): boolean => {
  const [isEnabled, setIsEnabled] = useState<boolean>(defaultValue);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Check if PostHog is available and consent granted
    if (!hasPostHogConsent() || typeof posthog === 'undefined' || !posthog.__loaded) {
      setIsEnabled(defaultValue);
      setIsLoaded(true);
      return;
    }

    // Get feature flag value
    const checkFlag = () => {
      const flagValue = posthog.isFeatureEnabled(flagKey);
      setIsEnabled(flagValue ?? defaultValue);
      setIsLoaded(true);
    };

    // Check immediately
    checkFlag();

    // Listen for feature flag updates
    const intervalId = setInterval(checkFlag, 30000); // Check every 30s

    return () => clearInterval(intervalId);
  }, [flagKey, defaultValue]);

  return isEnabled;
};

/**
 * Hook to get feature flag variant/payload
 *
 * Useful for multivariate tests where you need to know which variant is active
 *
 * @param flagKey - The feature flag key to check
 * @returns The variant value or undefined
 *
 * @example
 * ```tsx
 * const PricingPage = () => {
 *   const variant = usePostHogFeatureFlagVariant('pricing-page-test');
 *
 *   switch (variant) {
 *     case 'control':
 *       return <PricingPageControl />;
 *     case 'variant-a':
 *       return <PricingPageVariantA />;
 *     case 'variant-b':
 *       return <PricingPageVariantB />;
 *     default:
 *       return <PricingPageControl />;
 *   }
 * };
 * ```
 */
export const usePostHogFeatureFlagVariant = (
  flagKey: string
): string | boolean | undefined => {
  const [variant, setVariant] = useState<string | boolean | undefined>(undefined);

  useEffect(() => {
    // Check if PostHog is available and consent granted
    if (!hasPostHogConsent() || typeof posthog === 'undefined' || !posthog.__loaded) {
      setVariant(undefined);
      return;
    }

    // Get feature flag variant
    const checkVariant = () => {
      const flagVariant = posthog.getFeatureFlag(flagKey);
      setVariant(flagVariant);
    };

    // Check immediately
    checkVariant();

    // Listen for feature flag updates
    const intervalId = setInterval(checkVariant, 30000); // Check every 30s

    return () => clearInterval(intervalId);
  }, [flagKey]);

  return variant;
};

/**
 * Hook to check multiple feature flags
 *
 * @param flagKeys - Array of feature flag keys to check
 * @returns Object containing all requested feature flags
 */
export const usePostHogFeatureFlags = (
  flagKeys: string[]
): Record<string, string | boolean> => {
  const [flags, setFlags] = useState<Record<string, string | boolean>>({});

  useEffect(() => {
    // Check if PostHog is available and consent granted
    if (!hasPostHogConsent() || typeof posthog === 'undefined' || !posthog.__loaded) {
      setFlags({});
      return;
    }

    // Get requested feature flags
    const checkFlags = () => {
      const flagValues: Record<string, string | boolean> = {};

      flagKeys.forEach((flag: string) => {
        flagValues[flag] = posthog.getFeatureFlag(flag) ?? false;
      });

      setFlags(flagValues);
    };

    // Check immediately
    checkFlags();

    // Listen for feature flag updates
    const intervalId = setInterval(checkFlags, 30000); // Check every 30s

    return () => clearInterval(intervalId);
  }, [flagKeys]);

  return flags;
};

export default usePostHogFeatureFlag;
