'use client';

import { lazy, Suspense } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { trustSignals } from '@/data/pricingData';

const LiquidEther = lazy(() => import('@/components/LiquidEther'));

const PricingHeroSection = () => {
  return (
    <section className="relative min-h-[60vh] md:min-h-[80vh] lg:min-h-screen flex items-center justify-center pt-16 md:pt-20">
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
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold"
          >
            <span className="bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent">
              Simple plans.
              <br />
              No per-resolution surprises.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
          >
            All AI included—bots, copilots, QA, analytics, and workflows. Built for teams that need execution, not just answers, without hidden add-ons or per-resolution fees.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button
              size="lg"
              className="text-base md:text-lg px-6 py-4 md:px-8 md:py-5 lg:px-10 lg:py-6 bg-gradient-to-r from-primary via-purple-500 to-purple-600 hover:from-primary/90 hover:via-purple-500/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl"
              asChild
            >
              <Link href="/contact-sales">
                Pick a plan
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingHeroSection;
