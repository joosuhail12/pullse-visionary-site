'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import MiniProgressBar from './MiniProgressBar';
import ComparisonBar from './ComparisonBar';
import AnimatedStars from './AnimatedStars';
import TrendBadge from './TrendBadge';

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  trigger: boolean;
  duration?: number;
  decimals?: number;
}

const AnimatedCounter = ({ end, suffix = '', trigger, duration = 1500, decimals = 0 }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuad = progress * (2 - progress);
      const currentCount = startValue + (end - startValue) * easeOutQuad;

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, trigger, duration]);

  return (
    <span>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
};

interface ResultCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  description: string;
  color: string; // Tailwind gradient class
  visualizationType: 'progress' | 'comparison' | 'stars' | 'stacked';
  animatedValue?: number; // For counter animation
  contextData?: {
    subtitle?: string;
    comparison?: { before: { label: string; value: string }, after: { label: string; value: string } };
    badge?: { text: string; color: string };
    trend?: { value: string; direction: 'up' | 'down'; label?: string };
    progressValue?: number; // For progress bar visualization
    stackedData?: { primary: number; secondary: number; primaryLabel: string; secondaryLabel: string };
  };
  delay?: number; // Stagger delay for entrance animation
}

const ResultCard = ({
  icon: Icon,
  value,
  label,
  description,
  color,
  visualizationType,
  animatedValue,
  contextData,
  delay = 0,
}: ResultCardProps) => {
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const renderVisualization = () => {
    switch (visualizationType) {
      case 'progress':
        return (
          <MiniProgressBar
            value={contextData?.progressValue || 0}
            color={color}
            height="h-3"
            animated={true}
            trigger={isInView}
          />
        );

      case 'comparison':
        if (contextData?.comparison) {
          return (
            <ComparisonBar
              before={contextData.comparison.before}
              after={contextData.comparison.after}
              color={color}
              animated={true}
              trigger={isInView}
            />
          );
        }
        return null;

      case 'stars':
        return (
          <div className="flex items-center justify-between">
            <AnimatedStars
              rating={typeof value === 'number' ? value : parseFloat(value as string)}
              size={24}
              color={color}
              animated={true}
              trigger={isInView}
              showRating={false}
            />
            {contextData?.trend && (
              <TrendBadge
                value={contextData.trend.value}
                direction={contextData.trend.direction}
                label={contextData.trend.label}
                animated={true}
                trigger={isInView}
              />
            )}
          </div>
        );

      case 'stacked':
        if (contextData?.stackedData) {
          const { primary, secondary, primaryLabel, secondaryLabel } = contextData.stackedData;
          return (
            <div className="space-y-2">
              <div className="flex h-3 w-full rounded-full overflow-hidden bg-muted/30">
                <motion.div
                  className={`bg-gradient-to-r ${color}`}
                  initial={{ width: '0%' }}
                  animate={isInView ? { width: `${primary}%` } : {}}
                  transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                />
                <motion.div
                  className="bg-muted-foreground/30"
                  initial={{ width: '0%' }}
                  animate={isInView ? { width: `${secondary}%` } : {}}
                  transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className={`bg-gradient-to-r ${color} bg-clip-text text-transparent font-semibold`}>
                  {primary}% {primaryLabel}
                </span>
                <span className="text-muted-foreground">
                  {secondary}% {secondaryLabel}
                </span>
              </div>
            </div>
          );
        }
        return null;

      default:
        return null;
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: delay, ease: 'easeOut' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Decorative glow */}
      <motion.div
        className={`absolute -inset-1 bg-gradient-to-r ${color} rounded-2xl opacity-0 blur-xl transition-opacity duration-300`}
        animate={{ opacity: isHovered ? 0.15 : 0 }}
      />

      <motion.div
        className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/90 backdrop-blur-sm p-8 h-full"
        animate={{ scale: isHovered ? 1.03 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:48px_48px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative space-y-6">
          {/* Icon */}
          <motion.div
            className={`inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${color} shadow-lg`}
            animate={{ rotate: isHovered ? 8 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Icon className="h-8 w-8 text-background" />
          </motion.div>

          {/* Value & Label */}
          <div className="space-y-2">
            <div className={`text-6xl font-black bg-gradient-to-r ${color} bg-clip-text text-transparent leading-none`}>
              {animatedValue !== undefined ? (
                <AnimatedCounter
                  end={animatedValue}
                  suffix={typeof value === 'string' ? value.replace(/[0-9.]/g, '') : ''}
                  trigger={isInView}
                  duration={1800}
                  decimals={value.toString().includes('.') ? 1 : 0}
                />
              ) : (
                value
              )}
            </div>
            <h3 className="text-xl font-bold text-foreground">{label}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>

          {/* Contextual subtitle */}
          {contextData?.subtitle && (
            <motion.div
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: delay + 0.3 }}
            >
              {contextData.subtitle}
            </motion.div>
          )}

          {/* Visualization */}
          <div className="pt-2">
            {renderVisualization()}
          </div>

          {/* Badge */}
          {contextData?.badge && (
            <motion.div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${contextData.badge.color}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: delay + 0.5 }}
            >
              {contextData.badge.text}
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResultCard;
