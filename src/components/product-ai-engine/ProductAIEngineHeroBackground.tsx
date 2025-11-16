'use client';

import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';

const LiquidEther = lazy(() => import('@/components/LiquidEther'));

export default function ProductAIEngineHeroBackground() {
  return (
    <>
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

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-primary/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-purple-600/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </>
  );
}
