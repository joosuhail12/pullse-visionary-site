'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import {
  Bot,
  Mail,
  CheckCircle2,
  MessageCircle,
  Clock,
  TrendingUp,
} from 'lucide-react';

// Animated Counter Component
const AnimatedCounter = ({ end, suffix = '', duration = 2000, trigger = false }: { end: number; suffix?: string; duration?: number; trigger?: boolean }) => {
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

  return <>{count}{suffix}</>;
};

const stats = [
  {
    id: 'automation-rate',
    value: 80,
    suffix: '%',
    label: 'Automation rate',
    description: 'Tickets handled without human touch',
    icon: Bot,
    color: 'from-purple-500 to-pink-500',
    badge: { text: 'Industry leading', trend: 'neutral' },
    featured: true,
    gridSpan: 'lg:col-span-2 lg:row-span-2',
  },
  {
    id: 'new-tickets',
    value: 1247,
    label: 'New Tickets',
    description: 'Created this month',
    icon: Mail,
    color: 'from-blue-500 to-cyan-500',
    badge: { text: '+12.5%', trend: 'up' },
    featured: false,
    gridSpan: 'lg:col-span-1',
  },
  {
    id: 'tickets-closed',
    value: 1156,
    label: 'Tickets Closed',
    description: 'Resolved this month',
    icon: CheckCircle2,
    color: 'from-green-500 to-emerald-500',
    badge: { text: '+8.2%', trend: 'up' },
    featured: false,
    gridSpan: 'lg:col-span-1',
  },
  {
    id: 'replies-sent',
    value: 2843,
    label: 'Replies Sent',
    description: 'Total responses',
    icon: MessageCircle,
    color: 'from-amber-500 to-orange-500',
    badge: { text: '+15.7%', trend: 'up' },
    featured: false,
    gridSpan: 'lg:col-span-1',
  },
  {
    id: 'first-response',
    value: 42,
    suffix: ' min',
    label: 'Avg First Response',
    description: 'Time to first reply',
    icon: Clock,
    color: 'from-rose-500 to-pink-500',
    badge: { text: '-18% faster', trend: 'down' },
    featured: false,
    gridSpan: 'lg:col-span-1',
  },
];

export default function AnalyticsStatsSection() {
  const [statsAnimated, setStatsAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target === statsRef.current && !statsAnimated) {
            setStatsAnimated(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [statsAnimated]);

  const getBadgeColor = (trend: string) => {
    if (trend === 'up') return 'bg-green-500/10 text-green-500 border-green-500/20';
    if (trend === 'down') return 'bg-green-500/10 text-green-500 border-green-500/20';
    return 'bg-primary/10 text-primary border-primary/20';
  };

  return (
    <>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20 space-y-6"
      >
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
          Measure what matters
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          Real-time insights into team performance, automation rates, and customer satisfaction
        </p>
      </motion.div>

      {/* Stats Bento Grid */}
      <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-3xl
                border border-white/40 shadow-[0_8px_32px_rgba(124,58,237,0.12)] ring-1 ring-black/5
                bg-white/70 backdrop-blur-[20px] backdrop-saturate-150
                ${stat.gridSpan}
                ${stat.featured ? 'p-12' : 'p-8'}
                transition-[transform,box-shadow,border-color] duration-300 ease-out
                hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/20
                hover:-translate-y-2 hover:scale-[1.01]
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
              role="article"
              aria-label={`${stat.label}: ${stat.value}${stat.suffix || ''}`}
              tabIndex={0}
            >
              {/* Dual-layer hover glow */}
              <div className={`absolute -inset-2 bg-gradient-to-r ${stat.color} rounded-3xl opacity-0 group-hover:opacity-30 blur-3xl transition-all duration-300`} />
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-all duration-300`} />

              {/* Enhanced gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-[0.08] group-hover:opacity-[0.15] transition-opacity duration-300`} />

              {/* Radial gradient overlay */}
              <div className="absolute inset-0 bg-gradient-radial from-white/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Featured card distinction */}
              {stat.featured && (
                <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 rounded-3xl blur-sm" />
              )}

              <div className="relative space-y-6">
                {/* Icon and Badge Row */}
                <div className="flex items-start justify-between transition-all duration-300 delay-100 group-hover:translate-x-1">
                  <div className={`inline-flex ${stat.featured ? 'h-20 w-20' : 'h-16 w-16'} items-center justify-center rounded-2xl bg-gradient-to-br ${stat.color} shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-2xl`}>
                    <Icon className={`${stat.featured ? 'h-10 w-10' : 'h-8 w-8'} text-background transition-transform duration-300 group-hover:scale-110`} />
                  </div>

                  {/* Percentage Badge */}
                  <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 border ${getBadgeColor(stat.badge.trend)} transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg`}>
                    {stat.badge.trend === 'up' && <TrendingUp className="h-3.5 w-3.5" />}
                    {stat.badge.trend === 'down' && <TrendingUp className="h-3.5 w-3.5 rotate-180" />}
                    <span className="text-[10px] md:text-xs font-semibold tracking-wide uppercase">{stat.badge.text}</span>
                  </div>
                </div>

                {/* Value */}
                <div className="space-y-1.5 transition-all duration-300 delay-150 group-hover:translate-x-1">
                  <div className={`${stat.featured ? 'text-6xl md:text-7xl lg:text-8xl' : 'text-4xl md:text-5xl lg:text-6xl'} font-extrabold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent leading-[0.9] tracking-tighter tabular-nums drop-shadow-sm`}>
                    <AnimatedCounter
                      end={stat.value}
                      suffix={stat.suffix || ''}
                      trigger={statsAnimated}
                      duration={2000}
                    />
                  </div>
                  <div className={`${stat.featured ? 'text-lg md:text-xl' : 'text-sm md:text-base'} font-bold text-foreground/90 tracking-tight leading-tight`}>
                    {stat.label}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground/80 leading-relaxed">
                    {stat.description}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
