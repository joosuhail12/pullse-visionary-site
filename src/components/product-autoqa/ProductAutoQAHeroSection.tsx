'use client';

import { motion } from 'framer-motion';
import RouteButton from '@/components/RouteButton';
import { Play, ArrowRight, CheckCircle2, Shield } from 'lucide-react';

export default function ProductAutoQAHeroSection() {
  return (
    <div className="relative max-w-6xl mx-auto text-center px-4 py-8 md:py-12 lg:py-16">
      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-foreground mb-6 md:mb-8 tracking-tight leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        AI-Powered QA.{" "}
        <span className="bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent">
          Every rep. Every time.
        </span>
      </motion.h1>

      <motion.p
        className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8 md:mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Stop sampling 5% of conversations. AI automatically evaluates every ticket the moment it closes—identifying exact moments for improvement, suggesting better language, and tracking trends over time. Turn quality assurance into continuous coaching.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-8 md:mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <motion.div
          whileHover={{ scale: 1.05, y: -6 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <RouteButton
            size="lg"
            href="/contact-sales"
            className="group text-base px-6 py-4 md:px-8 md:py-5 lg:px-10 lg:py-7 shadow-2xl shadow-primary/30 font-black"
          >
            <span className="flex items-center gap-2 md:gap-3">
              See it live
              <Play className="h-4 w-4 md:h-5 md:w-5 group-hover:scale-110 transition-transform" />
            </span>
          </RouteButton>
        </motion.div>

        <RouteButton
          size="lg"
          variant="outline"
          href="/pricing"
          className="text-base px-6 py-4 md:px-8 md:py-5 lg:px-10 lg:py-7 font-black"
        >
          <span className="flex items-center gap-2 md:gap-3">
            View pricing
            <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
          </span>
        </RouteButton>
      </motion.div>

      <motion.div
        className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 md:gap-x-6 lg:gap-x-8 md:gap-y-4 text-xs md:text-sm text-muted-foreground mb-10 md:mb-14 lg:mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-primary" />
          <span>100% of tickets analyzed</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-primary" />
          <span>Real-time feedback</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-primary" />
          <span>Dispute & appeal workflow</span>
        </div>
      </motion.div>

      <div className="relative max-w-6xl mx-auto">
        <div className="absolute -inset-6 md:-inset-9 lg:-inset-12 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-3xl opacity-60" />
        <div className="relative rounded-3xl border border-border/50 bg-gradient-to-br from-card/95 via-card to-card/90 p-1.5 sm:p-2 md:p-3 shadow-2xl backdrop-blur-xl">
          <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-muted/30 to-muted/50 border border-border/40 shadow-xl aspect-video flex items-center justify-center">
            <div className="text-center space-y-2 p-4 md:p-6 lg:p-8">
              <Shield className="h-10 w-10 md:h-12 md:w-12 lg:h-16 lg:w-16 text-primary/40 mx-auto" />
              <p className="text-xs md:text-sm text-muted-foreground">Auto-QA Scorecard Interface</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
