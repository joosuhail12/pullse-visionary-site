'use client';

import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';

const LiquidEther = lazy(() => import('@/components/LiquidEther'));

export default function CompareHeroSection() {
  return (
    <div className="min-h-[60vh] md:min-h-[80vh] lg:min-h-screen relative flex items-center justify-center pt-12 pb-20 md:pt-16 md:pb-28 lg:pt-20 lg:pb-32">
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

      <div className="container mx-auto px-4 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center space-y-8 md:space-y-10 lg:space-y-12"
        >
          {/* Simplified Headline with Statement + Subtext */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4 md:space-y-5 lg:space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] tracking-tight text-black dark:text-white">
              The First AI-Native Customer Support Platform
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-gray-500 dark:text-gray-400 font-medium">
              Built for 2024, not retrofitted from 2010
            </p>
          </motion.div>

          {/* Concise Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Pullse executes actions, not just answers. Built AI-native from day one.
          </motion.p>

          {/* Enhanced CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" asChild className="relative group h-12 md:h-14 px-6 md:px-8 text-sm md:text-base">
                <Link href="/contact-sales">
                  <span className="relative z-10 font-bold">Experience AI-Native Support</span>
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-lg opacity-0 group-hover:opacity-100 blur-xl"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" variant="outline" asChild className="h-12 md:h-14 px-6 md:px-8 text-sm md:text-base border-2">
                <Link href="#comparison-table">
                  <span className="font-bold">See the Difference</span>
                  <ChevronDown className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust Indicators - Innovation Focused */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-muted-foreground"
          >
            {[
              { icon: '⚡', text: 'Live in 10 minutes' },
              { icon: '🧠', text: 'Learns from day one' },
              { icon: '🔄', text: 'No migration headaches' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2"
              >
                <span className="text-base md:text-lg">
                  {item.icon}
                </span>
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient Fade Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-b from-transparent to-background pointer-events-none" />
    </div>
  );
}
