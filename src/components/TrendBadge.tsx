'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TrendBadgeProps {
  value: string; // e.g., "0.3" or "12%"
  direction: 'up' | 'down';
  label?: string; // e.g., "vs last quarter"
  animated?: boolean;
  trigger?: boolean;
}

const TrendBadge = ({
  value,
  direction,
  label = '',
  animated = true,
  trigger = true,
}: TrendBadgeProps) => {
  const isPositive = direction === 'up';
  const Icon = isPositive ? TrendingUp : TrendingDown;
  const colorClass = isPositive
    ? 'text-green-500 border-green-500/20 bg-green-500/10'
    : 'text-red-500 border-red-500/20 bg-red-500/10';

  return (
    <motion.div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${colorClass} text-xs font-semibold`}
      initial={animated ? { opacity: 0, y: -10, scale: 0.9 } : {}}
      animate={trigger ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.4, ease: 'backOut' }}
    >
      <Icon size={14} className={isPositive ? 'text-green-500' : 'text-red-500'} />
      <span>{isPositive ? '+' : '-'}{value}</span>
      {label && <span className="text-muted-foreground">{label}</span>}
    </motion.div>
  );
};

export default TrendBadge;
