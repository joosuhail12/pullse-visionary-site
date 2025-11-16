'use client';

import { useEffect, useState, useRef } from 'react';
import { Zap, Clock, GitBranch, Shield } from 'lucide-react';

// Animated Counter Component
const AnimatedCounter = ({
  end,
  suffix = '',
  prefix = '',
  duration = 2000,
  trigger = false
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  trigger?: boolean;
}) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!trigger || hasStarted) return;
    setHasStarted(true);

    const startTime = Date.now();
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [trigger, hasStarted, end, duration]);

  return <>{prefix}{count}{suffix}</>;
};

export default function SolutionSaaSStatsSection() {
  const [statsAnimated, setStatsAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (statsRef.current && !statsAnimated) {
        const rect = statsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          setStatsAnimated(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [statsAnimated]);

  return (
    <section className="relative py-14 md:py-20 lg:py-28 bg-gradient-to-b from-muted/10 to-transparent">
      <div className="container mx-auto px-4">
        <div className="max-w-[1400px] mx-auto">
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {[
              { value: 100, suffix: 'ms', label: 'Response time', detail: 'sub-100ms latency', icon: Zap },
              { value: 8, suffix: 's', label: 'Avg execution', detail: 'from ask to done', icon: Clock },
              { value: 50, suffix: '+', label: 'Native integrations', detail: 'ready to use', icon: GitBranch },
              { value: 99, suffix: '%', label: 'Success rate', detail: 'error-free execution', icon: Shield },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="group relative text-center"
                >
                  <div className="inline-flex h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 items-center justify-center rounded-lg md:rounded-xl bg-primary/10 border border-primary/20 mb-4 md:mb-5 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-primary" />
                  </div>
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-2 md:mb-3">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} trigger={statsAnimated} />
                  </div>
                  <div className="text-xs md:text-sm font-bold text-foreground mb-0.5 md:mb-1">{stat.label}</div>
                  <div className="text-[10px] md:text-xs text-muted-foreground">{stat.detail}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
