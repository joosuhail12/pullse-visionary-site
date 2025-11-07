'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface MiniProgressBarProps {
  value: number; // 0-100
  color?: string; // Tailwind gradient class, e.g., "from-blue-500 to-cyan-500"
  height?: string; // Tailwind height class, e.g., "h-2"
  showLabel?: boolean;
  animated?: boolean;
  trigger?: boolean; // External trigger for animation
}

const MiniProgressBar = ({
  value,
  color = 'from-primary to-primary',
  height = 'h-2',
  showLabel = false,
  animated = true,
  trigger = true,
}: MiniProgressBarProps) => {
  const [displayValue, setDisplayValue] = useState(animated ? 0 : value);

  useEffect(() => {
    if (animated && trigger) {
      const timer = setTimeout(() => {
        setDisplayValue(value);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [animated, trigger, value]);

  return (
    <div className="w-full space-y-1">
      {showLabel && (
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>Progress</span>
          <span className="font-semibold">{value}%</span>
        </div>
      )}
      <div className={`w-full bg-muted/30 rounded-full overflow-hidden ${height}`}>
        <motion.div
          className={`${height} bg-gradient-to-r ${color} rounded-full transition-all duration-1000 ease-out`}
          initial={{ width: '0%' }}
          animate={{ width: `${displayValue}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export default MiniProgressBar;
