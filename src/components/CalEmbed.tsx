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
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Prevent loading script multiple times
    if (scriptLoadedRef.current) {
      setIsLoading(false);
      return;
    }

    // Check if Cal.com script is already loaded
    if (typeof window !== 'undefined' && (window as any).Cal) {
      scriptLoadedRef.current = true;
      initializeEmbed();
      return;
    }

    // Load Cal.com embed script
    const script = document.createElement('script');
    script.src = 'https://app.cal.com/embed/embed.js';
    script.async = true;

    script.onload = () => {
      scriptLoadedRef.current = true;
      initializeEmbed();
    };

    script.onerror = () => {
      setError('Failed to load booking widget. Please refresh the page.');
      setIsLoading(false);
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup: Remove script if component unmounts
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const initializeEmbed = () => {
    try {
      if (typeof window !== 'undefined' && (window as any).Cal && embedRef.current) {
        const Cal = (window as any).Cal;

        // Initialize Cal.com inline embed
        Cal('inline', {
          elementOrSelector: embedRef.current,
          calLink: calLink,
          layout: 'month_view',
          config: {
            theme: 'light',
          },
        });

        // Listen for booking events
        Cal('on', {
          action: 'bookingSuccessful',
          callback: (e: any) => {
            console.log('Booking successful:', e.detail);
          },
        });

        setIsLoading(false);
      }
    } catch (err) {
      console.error('Error initializing Cal.com embed:', err);
      setError('Failed to initialize booking widget.');
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className={`flex items-center justify-center min-h-[450px] ${className}`}>
        <div className="text-center">
          <p className="text-red-600 font-medium mb-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-primary hover:underline text-sm"
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
        <div className="absolute inset-0 flex items-center justify-center min-h-[450px] bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 rounded-3xl">
          <div className="text-center">
            <Loader2 className="h-12 w-12 text-primary mx-auto mb-4 animate-spin" />
            <p className="text-gray-600 font-medium">Loading booking calendar...</p>
          </div>
        </div>
      )}
      <div
        ref={embedRef}
        className="cal-embed"
        style={{
          width: '100%',
          height: '100%',
          minHeight: '450px',
          overflow: 'auto',
        }}
      />
    </div>
  );
}
