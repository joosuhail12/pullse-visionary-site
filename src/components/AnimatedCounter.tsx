'use client';

import { useEffect, useRef, useState } from 'react';
import type { gsap as GSAPType } from 'gsap';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  decimals?: number;
}

export default function AnimatedCounter({
  value,
  duration = 2000,
  suffix = '',
  prefix = '',
  className = '',
  decimals = 0,
}: AnimatedCounterProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const [gsapInstance, setGsapInstance] = useState<typeof GSAPType | null>(null);

  useEffect(() => {
    let isMounted = true;

    import('gsap').then(({ gsap }) => {
      if (isMounted) {
        setGsapInstance(() => gsap);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!counterRef.current || !elementRef.current || !gsapInstance) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            // Animate the counter
            const obj = { value: 0 };
            gsapInstance.to(obj, {
              value: value,
              duration: duration / 1000,
              ease: 'expo.out',
              onUpdate: () => {
                if (counterRef.current) {
                  counterRef.current.textContent = obj.value.toFixed(decimals);
                }
              },
            });

            // Particle burst effect
            if (elementRef.current) {
              const particleCount = 12;
              for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'absolute w-1 h-1 rounded-full bg-current opacity-60';
                particle.style.left = '50%';
                particle.style.top = '50%';
                elementRef.current.appendChild(particle);

                const angle = (i / particleCount) * Math.PI * 2;
                const distance = 30 + Math.random() * 20;

                gsapInstance.to(particle, {
                  x: Math.cos(angle) * distance,
                  y: Math.sin(angle) * distance,
                  opacity: 0,
                  scale: 0,
                  duration: 0.8,
                  ease: 'power2.out',
                  onComplete: () => {
                    particle.remove();
                  },
                });
              }
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(elementRef.current);

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [value, duration, decimals, hasAnimated, gsapInstance]);

  return (
    <div ref={elementRef} className={`relative inline-block ${className}`}>
      {prefix}
      <span ref={counterRef}>0</span>
      {suffix}
    </div>
  );
}
