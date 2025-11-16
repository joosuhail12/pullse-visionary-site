'use client';

import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const LiquidEther = lazy(() => import('@/components/LiquidEther'));

interface CompanyHeroProps {
  cta: {
    primaryCTA: { text: string; link: string };
    secondaryCTA: { text: string; link: string };
  };
}

export default function CompanyHero({ cta }: CompanyHeroProps) {
  return (
    <section className="relative min-h-[60vh] md:min-h-[80vh] lg:min-h-screen flex items-center overflow-hidden pt-16 md:pt-20">
      {/* Gradient Base Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-background -z-20" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] -z-20" />

      {/* Liquid Ether Background */}
      <div className="absolute inset-0 -z-10 opacity-55 hidden md:block">
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

      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="max-w-5xl mx-auto">
          {/* Text Content */}
          <div className="flex flex-col items-center text-center">
            <div className="space-y-6 md:space-y-8 lg:space-y-10 w-full">
              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-foreground leading-[1.1] tracking-tight"
              >
                Building the support platform
                <span className="block text-primary">we always wished existed</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
                className="text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground leading-relaxed"
              >
                After years managing support teams drowning in 10+ disconnected tools, we're building one AI-native platform that actually works together.
              </motion.p>

              {/* Divider */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
                className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
              />

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
                className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center"
              >
                <Button
                  size="lg"
                  className="text-sm md:text-base px-6 py-5 md:px-8 md:py-7 shadow-xl shadow-primary/20 group"
                  asChild
                >
                  <Link href={cta.primaryCTA.link}>
                    {cta.primaryCTA.text}
                    <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-sm md:text-base px-6 py-5 md:px-8 md:py-7"
                  asChild
                >
                  <Link href={cta.secondaryCTA.link}>
                    {cta.secondaryCTA.text}
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
