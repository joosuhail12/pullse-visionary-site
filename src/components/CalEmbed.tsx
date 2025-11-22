'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { trackEvent, trackBookAppointment } from '@/lib/analytics';
import { useCookieConsent } from '@/contexts/CookieConsentContext';

interface CalEmbedProps {
  calLink: string;
  className?: string;
  prefill?: {
    name?: string;
    email?: string;
    guests?: string[];
    notes?: string;
    customAnswers?: Record<string, string>;
  };
}

export function CalEmbed({ calLink, className = '', prefill }: CalEmbedProps) {
  const { consent, openPreferences } = useCookieConsent();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userInitiated, setUserInitiated] = useState(false);
  const embedRef = useRef<HTMLDivElement>(null);
  const hasTrackedLoad = useRef(false);

  const shouldLoad = consent.analytics || userInitiated;
  const prefillKey = JSON.stringify(prefill || {});

  // Reset loading state when user opts to load
  useEffect(() => {
    if (userInitiated) {
      setIsLoading(true);
      setError(null);
    }
  }, [userInitiated]);

  useEffect(() => {
    if (!shouldLoad || !embedRef.current) return;

    let cancelled = false;

    try {
      // Initialize Cal function on window if it doesn't exist
      if (typeof window !== 'undefined') {
        const w = window as any;

        // Prevent duplicate listener setup across remounts
        w.__pullseCalInitialized = w.__pullseCalInitialized || new Set();
        const listenerKey = `inline-${calLink}-${prefillKey}`;
        if (w.__pullseCalInitialized.has(listenerKey)) {
          setIsLoading(false);
          return;
        }

        // Cal.com initialization pattern
        if (!w.Cal) {
          w.Cal = function () {
            const cal = w.Cal;
            const args = arguments;
            if (!cal.loaded) {
              cal.ns = {};
              cal.q = cal.q || [];

              // Load the Cal.com embed script
              const d = document;
              const script = d.head.appendChild(d.createElement('script'));
              script.src = 'https://cal.com/embed.js';
              script.async = true;
              script.onerror = () => {
                if (cancelled) return;
                setError('Failed to load booking widget. Please try again or email sales@pullse.com.');
                setIsLoading(false);
              };

              cal.loaded = true;
            }

            if (args[0] === 'init') {
              const api = function () {
                const p = function (a: any, ar: any) { a.q.push(ar); };
                p(api, arguments);
              };
              const namespace = args[1];
              (api as any).q = (api as any).q || [];
              if (typeof namespace === 'string') {
                cal.ns[namespace] = api;
              }
              return;
            }

            cal.q.push(args);
          };
        }

        // Initialize Cal
        w.Cal('init', { origin: 'https://cal.com' });

        console.log('Cal initialized, setting up embed...');

        // Setup inline embed
        w.Cal('inline', {
          elementOrSelector: embedRef.current,
          calLink: calLink,
          config: {
            theme: 'light',
          },
          prefill: prefill
            ? {
                name: prefill.name,
                email: prefill.email,
                guests: prefill.guests?.filter(Boolean),
                notes: prefill.notes,
                customAnswers: prefill.customAnswers,
              }
            : undefined,
        });

        // Listen for UI events
        w.Cal('ui', {
          styles: { branding: { brandColor: '#000000' } },
          hideEventTypeDetails: false,
        });

        // Listen for Cal.com events
        w.Cal('on', {
          action: '__iframeReady',
          callback: () => {
            console.log('Cal.com iframe ready');
            if (cancelled) return;

            // Track calendar widget load
            if (!hasTrackedLoad.current) {
              trackEvent('calendar_load', {
                calendar_link: calLink,
                calendar_provider: 'cal.com',
              });
              hasTrackedLoad.current = true;
            }

            setIsLoading(false);
          },
        });

        // Track booking completion
        w.Cal('on', {
          action: 'bookingSuccessful',
          callback: (e: any) => {
            console.log('Booking successful:', e);
            if (cancelled) return;

            trackBookAppointment({
              booking_type: e?.data?.eventType?.title || 'Demo',
              booking_date: e?.data?.date,
              calendar_provider: 'cal.com',
              value: 200, // High-value conversion
            } as any);
          },
        });

        console.log('Cal.com inline embed configured');

        w.__pullseCalInitialized.add(listenerKey);
      }
    } catch (err) {
      console.error('Error initializing Cal.com embed:', err);
      setError('Failed to initialize booking widget.');
      setIsLoading(false);
    }
    return () => {
      cancelled = true;
    };
  }, [calLink, shouldLoad]);

  if (!shouldLoad) {
    return (
      <div className={`glass-elevated p-6 rounded-2xl border border-primary/10 ${className}`}>
        <div className="space-y-3 text-center">
          <p className="text-base font-semibold text-gray-900">Load the scheduler to pick a time</p>
          <p className="text-sm text-gray-600">We use Cal.com for booking. Enable analytics cookies or load the widget to continue.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setUserInitiated(true)}
              className="px-4 py-2 rounded-lg bg-primary text-white font-semibold shadow hover:shadow-md transition"
            >
              Load scheduler
            </button>
            <button
              onClick={openPreferences}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:border-gray-400 transition"
            >
              Manage cookie preferences
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center min-h-[600px] ${className}`}>
        <div className="text-center">
          <p className="text-red-600 mb-3">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-sm text-gray-600 hover:text-gray-900 underline"
          >
            Reload page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center min-h-[600px] z-10 bg-white">
          <div className="text-center">
            <Loader2 className="h-8 w-8 text-gray-400 animate-spin mx-auto mb-3" />
            <p className="text-sm text-gray-500">Loading calendar...</p>
          </div>
        </div>
      )}
      <div
        ref={embedRef}
        className="cal-embed-container"
        style={{
          width: '100%',
          height: '100%',
          minHeight: '650px',
          overflow: 'visible',
        }}
      />
      <style jsx>{`
        .cal-embed-container :global(iframe) {
          border-radius: 0.5rem;
        }
      `}</style>
    </div>
  );
}
