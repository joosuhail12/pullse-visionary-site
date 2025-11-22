'use client';

import RouteButton from '@/components/RouteButton';
import { ArrowRight, Play } from 'lucide-react';

export default function ProductAnalyticsFinalCTA() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card to-card shadow-2xl">
      {/* Soft ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-10 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative p-8 md:p-12 lg:p-14 flex flex-col gap-8 lg:gap-10">
        <div className="mx-auto flex flex-col items-center text-center gap-5 max-w-3xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight">
            Turn every support interaction into
            <span className="block bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              actionable revenue intelligence
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
            See deflection, CSAT, AI accuracy, and ROI in one workspace. Pullse Analytics gives leaders and agents the same truth—no spreadsheets required.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6">
          <RouteButton
            href="/contact-sales"
            size="lg"
            className="group relative overflow-hidden px-8 py-6 md:px-10 md:py-7 text-base md:text-lg font-semibold shadow-xl shadow-primary/20 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <span className="relative z-10 flex items-center gap-3">
              <Play className="h-5 w-5" />
              Book a live demo
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </span>
          </RouteButton>

          <RouteButton
            href="/pricing"
            variant="outline"
            size="lg"
            className="px-8 py-6 md:px-10 md:py-7 text-base md:text-lg font-semibold border-2 hover:border-primary/60"
          >
            View pricing
          </RouteButton>
        </div>

      </div>
    </div>
  );
}
