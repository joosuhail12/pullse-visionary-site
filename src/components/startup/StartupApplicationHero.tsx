'use client';

import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2 } from 'lucide-react';

const LiquidEther = lazy(() => import('@/components/LiquidEther'));

const StartupApplicationHero = () => {
  return (
    <section className="relative min-h-[60vh] md:min-h-[80vh] lg:min-h-screen flex items-center justify-center pt-16 md:pt-20 overflow-hidden">
      {/* Hero Liquid Ether Effect */}
      <div className="absolute inset-0 -z-10 opacity-70 hidden md:block">
        <Suspense fallback={<div className="w-full h-full" />}>
          <LiquidEther
            colors={["#FF00C8", "#A805FF", "#D3A9EA"]}
            mouseForce={20}
            cursorSize={110}
            isViscous={false}
            resolution={0.55}
            autoDemo
            autoSpeed={0.35}
            autoIntensity={1.6}
          />
        </Suspense>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-5 md:space-y-6 lg:space-y-8"
          >
            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent leading-snug pb-1">
              Early stage shouldn't mean limited tools.
            </h1>

            {/* Subhead */}
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto font-medium">
              We know what it's like to build with limited resources. That's why we're giving early-stage companies 50% off Pullse for 12 months—so you can focus on building your product, not managing support infrastructure.
            </p>

            {/* Trust Signals - Inline */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs md:text-sm lg:text-base text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>15 seats included</span>
              </div>
              <span className="text-gray-400">•</span>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>All Pro features</span>
              </div>
              <span className="text-gray-400">•</span>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>2-day approval</span>
              </div>
            </div>

            {/* CTA Button */}
            <div>
              <motion.a
                href="#application-form"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center gap-2 px-6 py-3.5 md:px-8 md:py-4 lg:px-10 lg:py-5 rounded-lg md:rounded-xl bg-gradient-to-r from-primary via-purple-500 to-purple-600 text-white font-bold text-base md:text-lg shadow-2xl shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 overflow-hidden"
              >
                {/* Shimmer effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                <span className="relative">Start Your Application</span>
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 relative" />
              </motion.a>
              <p className="text-xs md:text-sm text-gray-500 mt-3 md:mt-4">
                3-minute application • No credit card required
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StartupApplicationHero;
