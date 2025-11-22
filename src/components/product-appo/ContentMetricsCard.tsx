'use client';

import { motion } from 'framer-motion';
import { Eye, ThumbsUp, TrendingDown, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Metric {
  label: string;
  value: number;
  displayValue: string;
  change: number;
  changeLabel: string;
  icon: typeof Eye;
  color: string;
}

const ContentMetricsCard = () => {
  const [animatedValues, setAnimatedValues] = useState({
    views: 0,
    helpful: 0,
    deflection: 0,
  });

  const metrics: Metric[] = [
    {
      label: 'Article Views',
      value: 12847,
      displayValue: '12.8K',
      change: 18.5,
      changeLabel: '+18.5% from last week',
      icon: Eye,
      color: 'hsl(217 91% 60%)', // Blue
    },
    {
      label: 'Helpfulness Rate',
      value: 94,
      displayValue: '94%',
      change: 3.2,
      changeLabel: '+3.2% from last week',
      icon: ThumbsUp,
      color: 'hsl(142 76% 36%)', // Green
    },
    {
      label: 'Ticket Deflection',
      value: 87,
      displayValue: '87%',
      change: -2.1,
      changeLabel: '-2.1% from last week',
      icon: TrendingDown,
      color: 'hsl(28 88% 53%)', // Orange
    },
  ];

  // Animate numbers on mount
  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOutQuad = 1 - Math.pow(1 - progress, 3);

      setAnimatedValues({
        views: Math.floor(12847 * easeOutQuad),
        helpful: Math.floor(94 * easeOutQuad),
        deflection: Math.floor(87 * easeOutQuad),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedValues({ views: 12847, helpful: 94, deflection: 87 });
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-br from-background via-accent-green/5 to-background p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h3 className="text-sm font-bold text-foreground">Content Analytics</h3>
        </div>
        <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          Last 7 Days
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="space-y-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const animatedValue =
            metric.label === 'Article Views'
              ? animatedValues.views
              : metric.label === 'Helpfulness Rate'
              ? animatedValues.helpful
              : animatedValues.deflection;

          const displayValue =
            metric.label === 'Article Views'
              ? animatedValue >= 1000
                ? `${(animatedValue / 1000).toFixed(1)}K`
                : animatedValue.toString()
              : `${animatedValue}%`;

          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl border border-border/50 bg-card p-4 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
            >
              {/* Background Glow */}
              <div
                className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-20"
                style={{ backgroundColor: metric.color }}
              />

              <div className="relative flex items-start justify-between">
                {/* Left: Icon + Label */}
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg shadow-sm"
                    style={{ backgroundColor: `${metric.color}20` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: metric.color }} />
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-medium text-muted-foreground">
                      {metric.label}
                    </p>
                    <motion.p
                      key={animatedValue}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-2xl font-bold text-foreground"
                    >
                      {displayValue}
                    </motion.p>
                  </div>
                </div>

                {/* Right: Change Indicator */}
                <div
                  className={`flex items-center gap-1 rounded-full px-2 py-1 ${
                    metric.change >= 0
                      ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                      : 'bg-red-500/10 text-red-600 dark:text-red-400'
                  }`}
                >
                  {metric.change >= 0 ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  <span className="text-xs font-semibold">
                    {Math.abs(metric.change)}%
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted/30">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width:
                      metric.label === 'Article Views'
                        ? `${(animatedValue / metric.value) * 100}%`
                        : `${animatedValue}%`,
                  }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: metric.color }}
                />
              </div>

              {/* Change Label */}
              <p className="mt-2 text-xs text-muted-foreground">{metric.changeLabel}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 rounded-lg border border-border/30 bg-gradient-to-r from-primary/5 to-primary/10 px-4 py-3"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-foreground">Overall Performance</p>
            <p className="text-xs text-muted-foreground">Help center is performing well</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
            <span className="text-sm font-bold text-primary">A+</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContentMetricsCard;
