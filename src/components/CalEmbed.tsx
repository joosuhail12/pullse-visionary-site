'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface CalEmbedProps {
  calLink: string;
  className?: string;
}

export function CalEmbed({ calLink, className = '' }: CalEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const embedRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

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
        <div className="text-center glass p-8 rounded-2xl border border-red-200">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-red-600 font-semibold mb-3 text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors"
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
        <div className="absolute inset-0 flex items-center justify-center min-h-[600px] z-10">
          <div className="text-center glass-strong p-10 rounded-3xl border border-primary/20 shadow-2xl">
            <div className="relative inline-block mb-6">
              <Loader2 className="h-16 w-16 text-primary animate-spin" />
              <div className="absolute inset-0 blur-xl bg-primary/20 animate-pulse" />
            </div>
            <p className="text-gray-700 font-semibold text-lg mb-2">Setting up your booking calendar</p>
            <p className="text-gray-500 text-sm">This will only take a moment...</p>
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
          border-radius: 1rem;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }
      `}</style>
    </div>
  );
}
