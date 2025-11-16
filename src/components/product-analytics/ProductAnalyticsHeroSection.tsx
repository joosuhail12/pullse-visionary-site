'use client';

import { motion } from 'framer-motion';
import RouteButton from '@/components/RouteButton';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { CheckCircle2, Play, ArrowRight } from 'lucide-react';

interface ProductAnalyticsHeroSectionProps {
  analyticsScreenshot: StaticImageData;
}

export default function ProductAnalyticsHeroSection({ analyticsScreenshot }: ProductAnalyticsHeroSectionProps) {
  return (
    <div className="max-w-6xl mx-auto text-center">
      {/* Enhanced Headline */}
      <motion.h1
        className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-foreground mb-6 md:mb-8 tracking-tight leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Turn data into{" "}
        <span className="bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
          decisions that matter
        </span>
      </motion.h1>

      {/* Enhanced Subheadline */}
      <motion.p
        className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto mb-4 md:mb-6 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Real-time dashboards streaming live support data. Custom reports for every stakeholder.
        Analytics that <span className="text-foreground font-bold">prove ROI</span> and drive
        <span className="text-foreground font-bold"> strategic decisions</span>.
      </motion.p>

      {/* CTAs */}
      <motion.div
        className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-8 md:mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <motion.div
          whileHover={{ scale: 1.05, y: -6 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <RouteButton
            href="/contact-sales"
            variant="default"
            size="lg"
            className="group relative overflow-hidden px-8 py-6 md:px-10 lg:px-12 md:py-7 lg:py-8 text-lg md:text-xl font-black shadow-2xl shadow-primary/30"
          >
            <span className="relative z-10 flex items-center gap-2 md:gap-3">
              <Play className="h-5 w-5 md:h-6 md:w-6" />
              See it live
              <ArrowRight className="h-5 w-5 md:h-6 md:w-6 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
          </RouteButton>
        </motion.div>

        <RouteButton
          href="/pricing"
          variant="outline"
          size="lg"
          className="px-8 py-6 md:px-10 lg:px-12 md:py-7 lg:py-8 text-lg md:text-xl font-black"
        >
          View pricing
        </RouteButton>
      </motion.div>

      {/* Trust indicators */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-4 md:gap-6 lg:gap-8 text-xs md:text-sm text-muted-foreground mb-10 md:mb-14 lg:mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="flex items-center gap-1.5 md:gap-2">
          <CheckCircle2 className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary shrink-0" />
          <span>Real-time data streaming</span>
        </div>
        <div className="flex items-center gap-1.5 md:gap-2">
          <CheckCircle2 className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary shrink-0" />
          <span>No data silos</span>
        </div>
        <div className="flex items-center gap-1.5 md:gap-2">
          <CheckCircle2 className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary shrink-0" />
          <span>Custom dashboards</span>
        </div>
      </motion.div>

      {/* Hero Screenshot */}
      <div className="relative max-w-6xl mx-auto">
        {/* Glow effect */}
        <div className="absolute -inset-12 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-3xl opacity-60" />

        {/* Main screenshot card */}
        <div className="relative rounded-3xl border border-border/50 bg-gradient-to-br from-card/95 via-card to-card/90 p-2 sm:p-3 shadow-2xl backdrop-blur-xl">
          <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted/30 border border-border/30">
            <Image
              src={analyticsScreenshot}
              alt="Pullse Analytics Dashboard - Real-time support metrics and insights"
              className="w-full"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
