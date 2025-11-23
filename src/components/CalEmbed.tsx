'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
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
  submissionId?: string;
}

export function CalEmbed({ calLink, className = '', prefill, submissionId }: CalEmbedProps) {
  const { consent, openPreferences } = useCookieConsent();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userInitiated, setUserInitiated] = useState(false);
  const embedRef = useRef<HTMLDivElement>(null);
  const hasTrackedLoad = useRef(false);

  const shouldLoad = consent.analytics || userInitiated;
  const sanitizedPrefill = useMemo(() => {
    if (!prefill) return undefined;

    const guests = prefill.guests
      ?.map((guest) => guest?.trim())
      .filter(Boolean);

    const customAnswers = prefill.customAnswers
      ? Object.fromEntries(
          Object.entries(prefill.customAnswers)
            .map(([key, value]) => [key.trim(), value.trim()])
            .filter(([, value]) => Boolean(value))
        )
      : undefined;

    const hasCustomAnswers = customAnswers && Object.keys(customAnswers).length > 0;

    const cleaned = {
      name: prefill.name?.trim() || undefined,
      email: prefill.email?.trim() || undefined,
      guests: guests?.length ? guests : undefined,
      notes: prefill.notes?.trim() || undefined,
      customAnswers: hasCustomAnswers ? customAnswers : undefined,
    };

    return Object.values(cleaned).some(Boolean) ? cleaned : undefined;
  }, [prefill]);

  const prefillKey = JSON.stringify(sanitizedPrefill || {});

  const calLinkWithPrefill = useMemo(() => {
    if (!sanitizedPrefill) return calLink;

    const params = new URLSearchParams();
    if (sanitizedPrefill.name) params.set('name', sanitizedPrefill.name);
    if (sanitizedPrefill.email) params.set('email', sanitizedPrefill.email);
    if (sanitizedPrefill.notes) params.set('notes', sanitizedPrefill.notes);
    if (sanitizedPrefill.guests?.length) params.set('guests', sanitizedPrefill.guests.join(','));

    if (sanitizedPrefill.customAnswers) {
      Object.entries(sanitizedPrefill.customAnswers).forEach(([key, value]) => {
        params.set(`custom_${key}`, String(value));
      });
    }

    const qs = params.toString();
    return qs ? `${calLink}?${qs}` : calLink;
  }, [calLink, sanitizedPrefill]);

  const timeZone = useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      return undefined;
    }
  }, []);

  // Reset loading state when user opts to load
  useEffect(() => {
    if (userInitiated) {
      setIsLoading(true);
      setError(null);
    }
  }, [userInitiated]);

  useEffect(() => {
    if (!shouldLoad || !embedRef.current) return;

    setIsLoading(true);
    setError(null);

    let cancelled = false;

    // Clear any previous iframe so we can mount a fresh instance with the latest prefill data
    embedRef.current.innerHTML = '';

    try {
      // Initialize Cal function on window if it doesn't exist
      if (typeof window !== 'undefined') {
        const w = window as any;

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
          calLink: calLinkWithPrefill,
          config: {
            theme: 'light',
            ...(timeZone ? { timezone: timeZone } : {}),
          },
          prefill: sanitizedPrefill
            ? {
                name: sanitizedPrefill.name,
                email: sanitizedPrefill.email,
                guests: sanitizedPrefill.guests,
                notes: sanitizedPrefill.notes,
                customAnswers: sanitizedPrefill.customAnswers,
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

            // Send booking details to backend for webhook handling
            const payload = {
              submission_id: submissionId,
              name: sanitizedPrefill?.name || e?.data?.name,
              email: sanitizedPrefill?.email || e?.data?.email,
              event_title: e?.data?.eventType?.title,
              start_time: e?.data?.startTime,
              end_time: e?.data?.endTime,
              timezone: e?.data?.timeZone,
              location: e?.data?.location,
              meeting_url: e?.data?.meetingUrl,
              notes: sanitizedPrefill?.notes,
              custom_answers: sanitizedPrefill?.customAnswers,
              raw: e?.data,
            };

            fetch('/api/contact-sales/booking', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            }).catch((err) => console.error('Booking webhook send failed', err));
          },
        });

        console.log('Cal.com inline embed configured');
      }
    } catch (err) {
      console.error('Error initializing Cal.com embed:', err);
      setError('Failed to initialize booking widget.');
      setIsLoading(false);
    }
    return () => {
      cancelled = true;
    };
  }, [calLink, shouldLoad, prefillKey, timeZone, sanitizedPrefill]);

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
