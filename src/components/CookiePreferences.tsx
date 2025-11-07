'use client';

import { useState, useEffect } from 'react';
import { X, Cookie, Shield, Zap, BarChart3, Check } from 'lucide-react';
import { useCookieConsent, CookieConsent as CookieConsentType } from '@/contexts/CookieConsentContext';

const CookiePreferences = () => {
  const { showPreferences, closePreferences, consent, updateConsent } = useCookieConsent();
  const [localConsent, setLocalConsent] = useState<CookieConsentType>(consent);

  useEffect(() => {
    setLocalConsent(consent);
  }, [consent, showPreferences]);

  if (!showPreferences) return null;

  const handleToggle = (category: keyof CookieConsentType) => {
    if (category === 'essential') return; // Can't toggle essential
    setLocalConsent((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSave = () => {
    updateConsent(localConsent);
  };

  const categories = [
    {
      id: 'essential' as const,
      title: 'Essential Cookies',
      description: 'Required for the website to function properly. These cookies enable core functionality such as security, authentication, and session management. They cannot be disabled.',
      icon: Shield,
      required: true,
    },
    {
      id: 'functional' as const,
      title: 'Functional Cookies',
      description: 'Enable enhanced functionality and personalization, such as remembering your preferences and enabling features like meeting scheduling.',
      icon: Zap,
      required: false,
    },
    {
      id: 'analytics' as const,
      title: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with our website by collecting and reporting information anonymously. Currently not active.',
      icon: BarChart3,
      required: false,
    },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[110] animate-in fade-in duration-200"
        onClick={closePreferences}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        className="fixed inset-0 z-[111] flex items-center justify-center p-4"
        role="dialog"
        aria-labelledby="cookie-preferences-title"
        aria-modal="true"
      >
        <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border/60 backdrop-blur-xl bg-card shadow-2xl shadow-primary/10 animate-in zoom-in-95 duration-200">
          {/* Decorative gradient accent */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          {/* Header */}
          <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-xl border-b border-border/50 p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 shrink-0">
                  <Cookie className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2
                    id="cookie-preferences-title"
                    className="text-xl font-bold text-foreground"
                  >
                    Cookie Preferences
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Manage how we use cookies on your device
                  </p>
                </div>
              </div>
              <button
                onClick={closePreferences}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all shrink-0"
                aria-label="Close dialog"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {categories.map((category) => {
              const Icon = category.icon;
              const isEnabled = localConsent[category.id];
              const isRequired = category.required;

              return (
                <div
                  key={category.id}
                  className="rounded-xl border border-border/50 bg-muted/20 p-5 transition-all hover:border-primary/30 hover:bg-muted/30"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="p-2 rounded-lg bg-primary/10 shrink-0 mt-0.5">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">
                            {category.title}
                          </h3>
                          {isRequired && (
                            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-primary/20 text-primary">
                              Required
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    {/* Toggle Switch */}
                    <button
                      onClick={() => handleToggle(category.id)}
                      disabled={isRequired}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 mt-1 ${
                        isEnabled
                          ? 'bg-primary'
                          : 'bg-muted-foreground/30'
                      } ${isRequired ? 'opacity-50 cursor-not-allowed' : ''}`}
                      role="switch"
                      aria-checked={isEnabled}
                      aria-label={`Toggle ${category.title}`}
                      aria-disabled={isRequired}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                          isEnabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      >
                        {isEnabled && (
                          <Check className="h-3 w-3 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        )}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Additional Info */}
            <div className="pt-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground leading-relaxed">
                For more information about how we use cookies, please see our{' '}
                <a
                  href="/legal/cookies"
                  className="text-primary hover:underline font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cookie Policy
                </a>{' '}
                and{' '}
                <a
                  href="/legal/privacy"
                  className="text-primary hover:underline font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-card/95 backdrop-blur-xl border-t border-border/50 p-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleSave}
                className="flex-1 px-6 py-3 text-sm font-medium rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-95"
              >
                Save Preferences
              </button>
              <button
                onClick={closePreferences}
                className="px-6 py-3 text-sm font-medium rounded-xl border border-border/60 bg-muted/30 hover:bg-muted/50 text-foreground transition-all hover:border-primary/40"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.02)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.02)_1px,transparent_1px)] bg-[size:2rem_2rem] -z-10 rounded-2xl pointer-events-none" />
        </div>
      </div>
    </>
  );
};

export default CookiePreferences;
