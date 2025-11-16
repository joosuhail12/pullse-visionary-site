'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import RouteButton from '@/components/RouteButton';
import { Sparkles, ArrowRight, CheckCheck, Shield } from 'lucide-react';

export default function ProductAIEngineHeroContent() {
  return (
    <div className="container mx-auto px-4 md:px-6 relative">
      <div className="max-w-6xl mx-auto text-center">
        {/* Enhanced Headline with better value prop */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-foreground mb-6 md:mb-7 lg:mb-8 tracking-tight leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Turn support tickets into{" "}
          <span className="bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            resolved issues
          </span>
          <span className="block mt-2">—automatically</span>
        </motion.h1>

        {/* Enhanced Subheadline with clearer benefits */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-5 md:mb-6 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          AI that <span className="text-foreground font-bold">takes action</span>, not just suggests it.
          Process refunds, update subscriptions, and resolve issues—with <span className="text-foreground font-bold">full governance</span> and <span className="text-foreground font-bold">zero hallucinations</span>.
        </motion.p>

        {/* Single Primary CTA */}
        <motion.div
          className="flex flex-col items-center gap-3 md:gap-4 mb-10 md:mb-14 lg:mb-16"
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
              className="group relative overflow-hidden bg-gradient-to-r from-primary via-purple-600 to-indigo-600 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500 px-8 py-5 md:px-10 md:py-6 lg:px-12 lg:py-8 text-base sm:text-lg md:text-xl font-black"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <span className="relative z-10 flex items-center gap-2 md:gap-3">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-5 w-5 md:h-6 md:w-6" />
                </motion.div>
                See Live Demo
                <ArrowRight className="h-5 w-5 md:h-6 md:w-6 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </RouteButton>
          </motion.div>

          {/* Secondary link */}
          <Link href="#stepper" className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4">
            or scroll to explore the 8-step pipeline
          </Link>
        </motion.div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 lg:gap-8 text-xs md:text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCheck className="h-4 w-4 text-green-500" />
            <span className="font-semibold">SOC 2 Type II in progress</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="font-semibold">OWASP Guidelines</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-500" />
            <span className="font-semibold">NIST AI RMF Aligned</span>
          </div>
        </div>
      </div>
    </div>
  );
}
