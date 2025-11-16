'use client';

import { lazy, Suspense } from 'react';

const LiquidEther = lazy(() => import('@/components/LiquidEther'));

export default function ProductHelpCentersHeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 opacity-70 hidden md:block">
      <Suspense fallback={<div className="w-full h-full" />}>
        <LiquidEther
          colors={["#F28D1B", "#FFB633", "#FEE3AC"]}
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
  );
}
