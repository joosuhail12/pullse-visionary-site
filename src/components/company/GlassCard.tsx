'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'strong';
  gradient?: boolean;
}

const GlassCard = ({
  children,
  className = '',
  intensity = 'medium',
  gradient = false,
  ...motionProps
}: GlassCardProps) => {
  const intensityClasses = {
    light: 'bg-white/40 backdrop-blur-sm',
    medium: 'bg-white/60 backdrop-blur-md',
    strong: 'bg-white/80 backdrop-blur-lg',
  };

  const gradientClass = gradient
    ? 'before:absolute before:inset-0 before:rounded-2xl before:p-[2px] before:bg-gradient-to-br before:from-primary/30 before:via-purple-400/30 before:to-pink-400/30 before:-z-10'
    : '';

  return (
    <motion.div
      {...motionProps}
      className={`
        relative
        rounded-2xl
        border border-white/20
        ${intensityClasses[intensity]}
        shadow-xl shadow-black/5
        ${gradientClass}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
