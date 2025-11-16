'use client';

import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';

const MorphingBackground = dynamic(() => import('@/components/three/MorphingBackground'), { ssr: false });

export default function MorphingBackgroundTracker() {
  const [scrollOffset, setScrollOffset] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollOffset(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Suspense fallback={null}>
      <MorphingBackground scrollOffset={scrollOffset} />
    </Suspense>
  );
}
