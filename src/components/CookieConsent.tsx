'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Cookie, X, Settings } from 'lucide-react';
import { useCookieConsent } from '@/contexts/CookieConsentContext';

const CookieConsent = () => {
  const { showBanner, acceptAll, acceptEssentialOnly, openPreferences, hideBanner } = useCookieConsent();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (showBanner) {
      // Delay showing banner for smooth animation
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [showBanner]);

  if (!showBanner) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 z-[100] max-w-md transition-all duration-500 ease-out ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-4 opacity-0'
      }`}
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      {/* Cookie Banner Card */}
      <div className="relative rounded-2xl border border-border/60 backdrop-blur-xl bg-card/95 shadow-2xl shadow-primary/10 overflow-hidden">
        {/* Decorative gradient accent */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        {/* Close button */}
        <button
          onClick={hideBanner}
          className="absolute top-3 right-3 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
          aria-label="Dismiss cookie banner"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Icon & Title */}
          <div className="flex items-start gap-3 pr-8">
            <div className="p-2 rounded-lg bg-primary/10 shrink-0">
              <Cookie className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3
                id="cookie-consent-title"
                className="font-semibold text-foreground text-base leading-tight"
              >
                We value your privacy
              </h3>
            </div>
          </div>

          {/* Description */}
          <p
            id="cookie-consent-description"
            className="text-sm text-muted-foreground leading-relaxed"
          >
            We use cookies to enhance your experience, remember your preferences, and enable essential website functionality. You can customize your preferences or{' '}
            <Link
              href="/legal/cookies"
              className="text-primary hover:underline font-medium"
            >
              learn more
            </Link>.
          </p>

          {/* Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={acceptAll}
              className="w-full px-4 py-2.5 text-sm font-medium rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-95"
            >
              Accept All
            </button>
            <div className="flex gap-2">
              <button
                onClick={acceptEssentialOnly}
                className="flex-1 px-4 py-2.5 text-sm font-medium rounded-xl border border-border/60 bg-muted/30 hover:bg-muted/50 text-foreground transition-all hover:border-primary/40"
              >
                Essential Only
              </button>
              <button
                onClick={openPreferences}
                className="px-4 py-2.5 text-sm font-medium rounded-xl border border-border/60 bg-muted/30 hover:bg-muted/50 text-foreground transition-all hover:border-primary/40 flex items-center gap-2"
                aria-label="Customize cookie preferences"
              >
                <Settings className="h-4 w-4" />
                Customize
              </button>
            </div>
          </div>
        </div>

        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.02)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.02)_1px,transparent_1px)] bg-[size:2rem_2rem] -z-10 rounded-2xl" />
      </div>
    </div>
  );
};

export default CookieConsent;
