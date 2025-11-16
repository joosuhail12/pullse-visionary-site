'use client';

import { useEffect, useState, useRef } from "react";
import { Truck, Clock, MessageSquare, TrendingUp } from "lucide-react";

const AnimatedCounter = ({ end, suffix = '', prefix = '', duration = 2000, trigger = false }: { end: number; suffix?: string; prefix?: string; duration?: number; trigger?: boolean }) => {
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

const SolutionEcommerceStatsSection = () => {
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
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [statsAnimated]);

  return (
    <section className="relative py-14 md:py-20 lg:py-28 bg-gradient-to-b from-muted/10 to-transparent">
      <div className="container mx-auto px-4">
        <div className="max-w-[1400px] mx-auto">
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: 80, suffix: '%', label: 'WISMO tickets', detail: 'eliminated by AI', icon: Truck },
              { value: 6, suffix: ' min', label: 'Saved per return', detail: 'from 8 min to 2 min', icon: Clock },
              { value: 30, suffix: 's', label: 'Auto-response', detail: 'avg tracking reply', icon: MessageSquare },
              { value: 10, suffix: 'x', label: 'Peak capacity', detail: 'Black Friday ready', icon: TrendingUp },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="group relative text-center"
                >
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <div className="text-5xl md:text-6xl font-black text-foreground mb-3">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} trigger={statsAnimated} />
                  </div>
                  <div className="text-sm font-bold text-foreground mb-1">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.detail}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionEcommerceStatsSection;
