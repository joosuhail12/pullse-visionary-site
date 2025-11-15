'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { trackEvent, trackBookAppointment } from '@/lib/analytics';

interface CalEmbedProps {
  calLink: string;
  className?: string;
}

export function CalEmbed({ calLink, className = '' }: CalEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const embedRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
  const hasTrackedLoad = useRef(false);

  useEffect(() => {
    if (initializedRef.current || !embedRef.current) return;

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

            // Track calendar widget load
            if (!hasTrackedLoad.current) {
              trackEvent('calendar_load', {
                calendar_link: calLink,
                calendar_provider: 'cal.com',
              });
              hasTrackedLoad.current = true;
            }
          },
        });

        // Track booking completion
        w.Cal('on', {
          action: 'bookingSuccessful',
          callback: (e: any) => {
            console.log('Booking successful:', e);

            trackBookAppointment({
              booking_type: e?.data?.eventType?.title || 'Demo',
              booking_date: e?.data?.date,
              calendar_provider: 'cal.com',
              value: 200, // High-value conversion
            } as any);
          },
        });

        console.log('Cal.com inline embed configured');

        initializedRef.current = true;
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Error initializing Cal.com embed:', err);
      setError('Failed to initialize booking widget.');
      setIsLoading(false);
    }
  }, [calLink]);

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
