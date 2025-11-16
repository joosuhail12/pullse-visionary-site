'use client';

import { useEffect, useState, useRef } from "react";
import { TrendingUp } from "lucide-react";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  trigger: boolean;
  duration?: number;
}

const AnimatedCounter = ({ end, suffix = "", trigger, duration = 2000 }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(startValue + (end - startValue) * easeOutQuart));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [trigger, end, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

const SolutionsHubStatsSection = () => {
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
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [statsAnimated]);

  const crossIndustryStats = [
    { value: 80, suffix: "%+", label: "automation rate" },
    { value: 8, suffix: "s", label: "avg response time" },
    { value: 60, suffix: "%", label: "cost reduction" },
    { value: 24, suffix: "/7", label: "availability" },
  ];

  return (
    <section className="relative py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/10 via-muted/5 to-transparent" />

      <div className="container relative mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-14 lg:mb-16 space-y-3 md:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Performance that beats industry standards
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              See how Pullse compares to traditional support platforms—real metrics that translate to immediate cost savings
            </p>
          </div>

          <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {crossIndustryStats.map((stat, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl md:rounded-2xl border border-border/60 bg-card p-5 md:p-6 lg:p-8 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                <div className="relative space-y-2 md:space-y-3">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    <AnimatedCounter
                      end={stat.value}
                      suffix={stat.suffix}
                      trigger={statsAnimated}
                      duration={2000}
                    />
                  </div>
                  <div className="text-xs md:text-sm font-semibold text-foreground uppercase tracking-wide">
                    {stat.label}
                  </div>
                  <div className="text-[10px] md:text-xs text-muted-foreground leading-relaxed pt-1.5 md:pt-2 border-t border-border/40">
                    {index === 0 && "vs. 30% industry average—handle 4x more tickets with same team"}
                    {index === 1 && "vs. 2-3 min average—resolve issues before customers get frustrated"}
                    {index === 2 && "vs. traditional setup—save $50K+ annually on support operations"}
                    {index === 3 && "Always-on support without hiring night shifts or weekend staff"}
                  </div>
                </div>
                <div className="absolute top-2 md:top-3 right-2 md:right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 md:mt-10 lg:mt-12 text-center">
            <p className="text-xs md:text-sm text-muted-foreground">
              Based on industry benchmarks from Gartner, Forrester, and internal analysis across 100+ support teams
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsHubStatsSection;
