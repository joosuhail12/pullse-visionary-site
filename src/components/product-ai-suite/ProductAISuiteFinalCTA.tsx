'use client';

import { motion } from 'framer-motion';
import RouteButton from '@/components/RouteButton';
import { ArrowRight, ExternalLink } from 'lucide-react';

export default function ProductAISuiteFinalCTA() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 md:gap-5 lg:gap-6 justify-center mb-8 md:mb-10 lg:mb-12">
      <motion.div
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <RouteButton
          href="/contact-sales"
          variant="default"
          size="lg"
          className="group relative overflow-hidden bg-gradient-to-r from-primary via-purple-600 to-indigo-600 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500 px-10 py-5 md:px-11 md:py-5.5 lg:px-12 lg:py-6 text-base md:text-lg font-black"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
          <span className="relative z-10 flex items-center gap-2 md:gap-3">
            Book a Demo
            <ArrowRight className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-2 transition-transform duration-300" />
          </span>
        </RouteButton>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <RouteButton
          href="/pricing"
          variant="outline"
          size="lg"
          className="group border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5 px-10 py-5 md:px-11 md:py-5.5 lg:px-12 lg:py-6 text-base md:text-lg font-black"
        >
          <span className="flex items-center gap-2 md:gap-3">
            View Pricing
            <ExternalLink className="h-4 w-4 md:h-5 md:w-5 group-hover:rotate-12 transition-transform duration-300" />
          </span>
        </RouteButton>
      </motion.div>
    </div>
  );
}
