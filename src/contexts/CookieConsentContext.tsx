'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type CookieCategory = 'essential' | 'functional' | 'analytics';

export interface CookieConsent {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
}

interface CookieConsentContextType {
  consent: CookieConsent;
  hasConsent: (category: CookieCategory) => boolean;
  updateConsent: (newConsent: Partial<CookieConsent>) => void;
  acceptAll: () => void;
  acceptEssentialOnly: () => void;
  hasSetPreferences: boolean;
  showBanner: boolean;
  hideBanner: () => void;
  showPreferences: boolean;
  openPreferences: () => void;
  closePreferences: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

const STORAGE_KEY = 'pullse_cookie_consent';
const BANNER_DISMISSED_KEY = 'pullse_cookie_banner_dismissed';

const defaultConsent: CookieConsent = {
  essential: true, // Always true, can't be disabled
  functional: false,
  analytics: false,
};

export const CookieConsentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [consent, setConsent] = useState<CookieConsent>(defaultConsent);
  const [hasSetPreferences, setHasSetPreferences] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    setIsClient(true);

    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        const bannerDismissed = localStorage.getItem(BANNER_DISMISSED_KEY);

        if (stored) {
          const parsedConsent = JSON.parse(stored);
          setConsent({ ...parsedConsent, essential: true }); // Ensure essential is always true
          setHasSetPreferences(true);
          setShowBanner(false);
        } else if (!bannerDismissed) {
          // Show banner if no preferences set and banner not dismissed
          setShowBanner(true);
        }
      } catch (error) {
        console.error('Error loading cookie consent:', error);
        setShowBanner(true);
      }
    }
  }, []);

  const saveConsent = (newConsent: CookieConsent) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newConsent));
        localStorage.setItem(BANNER_DISMISSED_KEY, 'true');
      } catch (error) {
        console.error('Error saving cookie consent:', error);
      }
    }
  };

  const hasConsent = (category: CookieCategory): boolean => {
    if (category === 'essential') return true; // Essential always allowed
    return consent[category];
  };

  const updateConsent = (newConsent: Partial<CookieConsent>) => {
    const updated: CookieConsent = {
      ...consent,
      ...newConsent,
      essential: true, // Always true
    };
    setConsent(updated);
    saveConsent(updated);
    setHasSetPreferences(true);
    setShowBanner(false);
    setShowPreferences(false);

    // Notify Analytics component of consent change
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cookieConsentUpdated'));
    }
  };

  const acceptAll = () => {
    const allAccepted: CookieConsent = {
      essential: true,
      functional: true,
      analytics: true,
    };
    setConsent(allAccepted);
    saveConsent(allAccepted);
    setHasSetPreferences(true);
    setShowBanner(false);
    setShowPreferences(false);

    // Notify Analytics component of consent change
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cookieConsentUpdated'));
    }
  };

  const acceptEssentialOnly = () => {
    const essentialOnly: CookieConsent = {
      essential: true,
      functional: false,
      analytics: false,
    };
    setConsent(essentialOnly);
    saveConsent(essentialOnly);
    setHasSetPreferences(true);
    setShowBanner(false);
    setShowPreferences(false);

    // Notify Analytics component of consent change
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cookieConsentUpdated'));
    }
  };

  const hideBanner = () => {
    setShowBanner(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem(BANNER_DISMISSED_KEY, 'true');
    }
  };

  const openPreferences = () => {
    setShowPreferences(true);
  };

  const closePreferences = () => {
    setShowPreferences(false);
  };

  // Don't render children until client-side hydration
  if (!isClient) {
    return null;
  }

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        hasConsent,
        updateConsent,
        acceptAll,
        acceptEssentialOnly,
        hasSetPreferences,
        showBanner,
        hideBanner,
        showPreferences,
        openPreferences,
        closePreferences,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = (): CookieConsentContextType => {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
};
