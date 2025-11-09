'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedCounter from './AnimatedCounter';

interface TimelineStepProps {
  step: {
    id: number;
    number: string;
    title: string;
    subtitle: string;
    description: string;
    metric: string;
    metricLabel: string;
    icon: LucideIcon;
    gradient: string;
  };
  isActive: boolean;
  isPast: boolean;
  isLeft: boolean;
}

export default function TimelineStep({ step, isActive, isPast, isLeft }: TimelineStepProps) {
  const Icon = step.icon;

  // Extract gradient colors for use
  const gradientClass = step.gradient;

  return (
    <div className={cn(
      'grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 items-center',
      'min-h-screen py-20'
    )}>
      {/* Left content or visual */}
      <motion.div
        className={cn(
          'flex',
          isLeft ? 'justify-end' : 'justify-start lg:order-3'
        )}
        initial={{ x: isLeft ? -150 : 150, opacity: 0, rotate: isLeft ? -8 : 8 }}
        whileInView={{ x: 0, opacity: 1, rotate: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {isLeft ? (
          // Content card on left
          <div className="w-full max-w-lg lg:pr-12">
            <ContentCard step={step} isActive={isActive} isPast={isPast} gradientClass={gradientClass} />
          </div>
        ) : (
          // Visual on left
          <div className="w-full max-w-md lg:pr-12">
            <VisualElement step={step} isActive={isActive} Icon={Icon} />
          </div>
        )}
      </motion.div>

      {/* Center timeline dot */}
      <div className="hidden lg:flex flex-col items-center justify-center relative">
        <motion.div
          className={cn(
            'w-16 h-16 rounded-full border-4 flex items-center justify-center relative z-10 transition-all duration-500',
            isActive && 'border-primary bg-primary shadow-lg shadow-primary/50',
            isPast && 'border-primary/50 bg-primary/20',
            !isActive && !isPast && 'border-muted bg-background'
          )}
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          animate={{
            scale: isActive ? 1.1 : 1,
          }}
        >
          <span className={cn(
            'text-sm font-bold transition-colors',
            isActive && 'text-white',
            isPast && 'text-primary',
            !isActive && !isPast && 'text-muted-foreground'
          )}>
            {step.number}
          </span>

          {/* Pulsing ring for active step */}
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </motion.div>
      </div>

      {/* Right content or visual */}
      <motion.div
        className={cn(
          'flex',
          isLeft ? 'justify-start lg:order-3' : 'justify-end'
        )}
        initial={{ x: isLeft ? 150 : -150, opacity: 0, rotate: isLeft ? 8 : -8 }}
        whileInView={{ x: 0, opacity: 1, rotate: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 }}
      >
        {isLeft ? (
          // Visual on right
          <div className="w-full max-w-md lg:pl-12">
            <VisualElement step={step} isActive={isActive} Icon={Icon} />
          </div>
        ) : (
          // Content card on right
          <div className="w-full max-w-lg lg:pl-12">
            <ContentCard step={step} isActive={isActive} isPast={isPast} gradientClass={gradientClass} />
          </div>
        )}
      </motion.div>
    </div>
  );
}

// Content Card Component - Enhanced
function ContentCard({
  step,
  isActive,
  isPast,
  gradientClass,
}: {
  step: TimelineStepProps['step'];
  isActive: boolean;
  isPast: boolean;
  gradientClass: string;
}) {
  return (
    <motion.div
      className={cn(
        'relative bg-gradient-to-br from-card/50 via-background/30 to-card/50 backdrop-blur-xl border rounded-2xl p-8 transition-all duration-500 overflow-hidden cursor-pointer',
        isActive && 'border-primary/50 shadow-2xl shadow-primary/10',
        isPast && 'border-border/50 opacity-70',
        !isActive && !isPast && 'border-border/30 opacity-50'
      )}
      animate={{
        scale: isActive ? 1.05 : 1,
      }}
      whileHover={{
        scale: 1.03,
        rotateY: 5,
        rotateX: 5,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Glassmorphism glow effect */}
      {isActive && (
        <motion.div
          className={cn(
            'absolute -inset-px rounded-2xl blur-xl opacity-50',
            `bg-gradient-to-br ${gradientClass}`
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 0.5 }}
        />
      )}

      <div className="relative">
        {/* Badge and Step Number */}
        <div className="flex items-center justify-between mb-6">
          <div className={cn(
            'inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border',
            `bg-gradient-to-r ${gradientClass}`,
            isActive ? 'text-white border-transparent' : 'text-white/80 border-white/20'
          )}>
            <span className="relative flex h-2 w-2">
              {isActive && (
                <>
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </>
              )}
              {!isActive && <span className="relative inline-flex rounded-full h-2 w-2 bg-white/50"></span>}
            </span>
            STEP {step.number}
          </div>

          {/* Metric badge */}
          <motion.div
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-bold border backdrop-blur-sm',
              `bg-gradient-to-r ${gradientClass}`,
              isActive ? 'text-white border-transparent' : 'text-white/70 border-white/10'
            )}
            animate={{
              scale: isActive ? [1, 1.05, 1] : 1,
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {step.metric}
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="text-3xl md:text-4xl font-black text-foreground mb-3 leading-tight">
          {step.title}
        </h3>

        {/* Subtitle with gradient */}
        <p className={cn(
          'font-bold mb-6 text-lg md:text-xl',
          `bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`
        )}>
          {step.subtitle}
        </p>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed text-base">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

// Visual Element Component - Enhanced
function VisualElement({
  step,
  isActive,
  Icon,
}: {
  step: TimelineStepProps['step'];
  isActive: boolean;
  Icon: LucideIcon;
}) {
  return (
    <motion.div
      className="flex items-center justify-center relative"
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className={cn(
        'relative w-80 h-80 flex items-center justify-center transition-all duration-500',
        isActive && 'scale-105'
      )}>
        {/* Animated ring */}
        <motion.div
          className={cn(
            'absolute inset-0 rounded-full border-2 opacity-30',
            `border-gradient-to-r ${step.gradient}`
          )}
          style={{
            borderImage: `linear-gradient(135deg, var(--primary), var(--purple-600)) 1`
          }}
          animate={{
            rotate: isActive ? 360 : 0,
            scale: isActive ? [1, 1.1, 1] : 1,
            opacity: isActive ? [0.3, 0.5, 0.3] : 0.2,
          }}
          transition={{ rotate: { duration: 20, repeat: Infinity, ease: 'linear' }, scale: { duration: 3, repeat: Infinity }, opacity: { duration: 2, repeat: Infinity } }}
        />

        {/* Background glow - Multi-layer */}
        <motion.div
          className={cn(
            'absolute inset-12 rounded-full blur-3xl opacity-40',
            `bg-gradient-to-br ${step.gradient}`
          )}
          animate={{
            scale: isActive ? [1, 1.3, 1] : 1,
            opacity: isActive ? [0.4, 0.6, 0.4] : 0.2,
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Icon container with glassmorphism */}
        <motion.div
          className={cn(
            'relative z-10 flex items-center justify-center w-40 h-40 rounded-3xl border backdrop-blur-xl',
            `bg-gradient-to-br ${step.gradient}`,
            isActive ? 'border-white/20 bg-opacity-10' : 'border-white/10 bg-opacity-5'
          )}
          animate={{
            y: isActive ? [0, -20, 0] : 0,
            rotateY: isActive ? [0, 15, 0] : 0,
            scale: isActive ? [1, 1.05, 1] : 1,
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.15, rotateZ: 10, y: -10 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Icon glow */}
          <motion.div
            className={cn(
              'absolute inset-0 rounded-3xl blur-2xl opacity-50',
              `bg-gradient-to-br ${step.gradient}`
            )}
            animate={{
              opacity: isActive ? [0.3, 0.6, 0.3] : 0.2,
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          <Icon className="w-20 h-20 text-white relative z-10" strokeWidth={1.5} />
        </motion.div>

        {/* Floating particles */}
        {isActive && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className={cn(
                  'absolute w-2.5 h-2.5 rounded-full',
                  `bg-gradient-to-br ${step.gradient}`
                )}
                style={{
                  left: `${50 + 38 * Math.cos((i * Math.PI * 2) / 8)}%`,
                  top: `${50 + 38 * Math.sin((i * Math.PI * 2) / 8)}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.random() * 10 - 5, 0],
                  opacity: [0.4, 1, 0.4],
                  scale: [0.6, 1.2, 0.6],
                }}
                transition={{
                  duration: 2.5 + i * 0.15,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </>
        )}

        {/* Metric counter overlay - Enhanced */}
        {isActive && (
          <motion.div
            className="absolute -bottom-4 -right-4 bg-gradient-to-br from-background/95 via-card/95 to-background/95 backdrop-blur-xl border border-primary/50 rounded-2xl px-5 py-4 shadow-2xl shadow-primary/20"
            initial={{ scale: 0, opacity: 0, rotate: -15, y: 20 }}
            animate={{ scale: 1, opacity: 1, rotate: 0, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, type: 'spring', stiffness: 200, damping: 15 }}
            whileHover={{ scale: 1.1, rotate: 3, y: -5 }}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                'flex items-center justify-center w-10 h-10 rounded-xl',
                `bg-gradient-to-br ${step.gradient}`
              )}>
                <Icon className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <div>
                <div className={cn(
                  'text-2xl font-black mb-0.5',
                  `bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`
                )}>
                  {step.metric}
                </div>
                <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wide">
                  {step.metricLabel}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
