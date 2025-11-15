'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import {
  trackFormView,
  trackFormStart,
  trackFormSubmit,
  trackFormComplete,
  trackFormError,
  trackNewsletterSignup,
} from '@/lib/analytics';
import { trackValidationError } from '@/lib/errorTracking';

interface NewsletterCTAProps {
  variant?: 'compact' | 'standard';
  source: 'footer' | 'blog-listing' | 'blog-detail';
}

export default function NewsletterCTA({ variant = 'standard', source }: NewsletterCTAProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Tracking state
  const hasTrackedStart = useRef(false);
  const formStartTime = useRef<number | null>(null);
  const formId = `newsletter-${variant}-${source}`;
  const formName = `Newsletter Signup (${variant})`;

  // Track form view on mount
  useEffect(() => {
    trackFormView({
      form_id: formId,
      form_name: formName,
      form_destination: '/api/newsletter',
    });
  }, [formId, formName]);

  // Track form start on first interaction
  const handleFormStart = () => {
    if (!hasTrackedStart.current) {
      trackFormStart({
        form_id: formId,
        form_name: formName,
      });
      formStartTime.current = Date.now();
      hasTrackedStart.current = true;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset message
    setMessage(null);

    // Basic validation
    if (!email.trim()) {
      const errorMessage = 'Please enter your email address';
      setMessage({ type: 'error', text: errorMessage });

      // Track validation error
      trackValidationError({
        form_name: formName,
        field_name: 'email',
        error_message: errorMessage,
      });

      trackFormError({
        form_id: formId,
        form_name: formName,
        field_name: 'email',
        error_message: errorMessage,
      });

      return;
    }

    // Calculate time to submit
    const timeToSubmit = formStartTime.current
      ? Date.now() - formStartTime.current
      : undefined;

    // Track form submission attempt
    trackFormSubmit({
      form_id: formId,
      form_name: formName,
      time_to_submit: timeToSubmit,
    });

    setIsLoading(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          firstName: variant === 'standard' ? firstName.trim() || undefined : undefined,
          lastName: variant === 'standard' ? lastName.trim() || undefined : undefined,
          source,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      // Success - Track conversion
      setMessage({ type: 'success', text: data.message || 'Successfully subscribed!' });

      trackFormComplete({
        form_id: formId,
        form_name: formName,
        form_destination: '/api/newsletter',
        time_to_submit: timeToSubmit,
      });

      trackNewsletterSignup({ source });

      // Reset form
      setFirstName('');
      setLastName('');
      setEmail('');
      hasTrackedStart.current = false;
      formStartTime.current = null;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred. Please try again.';
      setMessage({
        type: 'error',
        text: errorMessage,
      });

      // Track error
      trackFormError({
        form_id: formId,
        form_name: formName,
        field_name: 'submission',
        error_message: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Compact variant (for Footer)
  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={handleFormStart}
            disabled={isLoading}
            required
            className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>

        {/* Success/Error Message */}
        {message && (
          <div
            className={`mt-2 rounded-md px-3 py-2 text-sm ${
              message.type === 'success'
                ? 'bg-green-500/10 text-green-600 border border-green-500/20'
                : 'bg-red-500/10 text-red-600 border border-red-500/20'
            }`}
          >
            {message.text}
          </div>
        )}

        <p className="mt-2 text-xs text-muted-foreground">No spam. Unsubscribe anytime.</p>
      </form>
    );
  }

  // Standard variant (for Blog pages)
  return (
    <div className="group relative isolate overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-primary via-primary/95 to-accent-pink shadow-2xl shadow-primary/25 backdrop-blur-xl transition-all duration-500 hover:shadow-3xl hover:shadow-primary/35">
      {/* Decorative blur circles */}
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent-pink/40 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-primary/50 blur-3xl" />

      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

      {/* Content */}
      <div className="relative p-8 md:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          {/* Left: Heading */}
          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider shadow-lg backdrop-blur-xl">
              <Sparkles className="h-3.5 w-3.5" />
              Newsletter
            </div>
            <h3 className="text-3xl font-bold leading-tight text-white md:text-4xl">
              Want more insights like this?
            </h3>
            <p className="text-base leading-relaxed text-white/90 md:text-lg">
              Get weekly articles on AI, support automation, and customer experience.
            </p>
          </div>

          {/* Right: Form */}
          <div className="flex-shrink-0 lg:w-[480px]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {/* Row 1: First Name + Last Name */}
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-2">
                <input
                  type="text"
                  placeholder="First name (optional)"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  onFocus={handleFormStart}
                  disabled={isLoading}
                  className="flex-1 rounded-xl border border-white/40 bg-white/20 px-4 py-3.5 text-sm text-white placeholder:text-white/70 shadow-lg backdrop-blur-xl transition-all focus:border-white/60 focus:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:cursor-not-allowed disabled:opacity-50 md:text-base"
                />
                <input
                  type="text"
                  placeholder="Last name (optional)"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  onFocus={handleFormStart}
                  disabled={isLoading}
                  className="flex-1 rounded-xl border border-white/40 bg-white/20 px-4 py-3.5 text-sm text-white placeholder:text-white/70 shadow-lg backdrop-blur-xl transition-all focus:border-white/60 focus:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:cursor-not-allowed disabled:opacity-50 md:text-base"
                />
              </div>

              {/* Row 2: Email + Subscribe Button */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email*"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={handleFormStart}
                  disabled={isLoading}
                  required
                  className="flex-1 rounded-xl border border-white/40 bg-white/20 px-4 py-3.5 text-sm text-white placeholder:text-white/70 shadow-lg backdrop-blur-xl transition-all focus:border-white/60 focus:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:cursor-not-allowed disabled:opacity-50 md:text-base"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group/btn flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-primary shadow-xl transition-all hover:bg-white/95 hover:shadow-2xl hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 md:text-base"
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe'}
                  {!isLoading && <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />}
                </button>
              </div>
            </form>

            {/* Success/Error Message */}
            {message && (
              <div
                className={`mt-3 rounded-lg px-4 py-2 text-sm font-medium ${
                  message.type === 'success'
                    ? 'bg-green-500/20 text-green-50 border border-green-500/30'
                    : 'bg-red-500/20 text-red-50 border border-red-500/30'
                }`}
              >
                {message.text}
              </div>
            )}

            <p className="mt-3 text-xs text-white/70">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
