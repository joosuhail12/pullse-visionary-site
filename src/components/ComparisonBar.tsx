'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ComparisonBarProps {
  before: {
    label: string;
    value: string;
  };
  after: {
    label: string;
    value: string;
  };
  color?: string; // Tailwind gradient class
  animated?: boolean;
  trigger?: boolean;
}

const ComparisonBar = ({
  before,
  after,
  color = 'from-blue-500 to-cyan-500',
  animated = true,
  trigger = true,
}: ComparisonBarProps) => {
  const [show, setShow] = useState(!animated);

  useEffect(() => {
    if (animated && trigger) {
      const timer = setTimeout(() => {
        setShow(true);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [animated, trigger]);

  return (
    <div className="flex items-center gap-3 text-sm">
      {/* Before */}
      <div className="flex-1 space-y-1">
        <div className="text-xs text-muted-foreground">{before.label}</div>
        <motion.div
          className="px-3 py-2 rounded-lg bg-muted/30 border border-border/40 text-foreground/60 font-semibold text-center"
          initial={{ opacity: 0, x: -10 }}
          animate={show ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          {before.value}
        </motion.div>
      </div>

      {/* Arrow */}
      <motion.div
        className={`text-lg font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={show ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        →
      </motion.div>

      {/* After */}
      <div className="flex-1 space-y-1">
        <div className="text-xs text-muted-foreground">{after.label}</div>
        <motion.div
          className={`px-3 py-2 rounded-lg bg-gradient-to-r ${color} bg-opacity-10 border border-current text-foreground font-bold text-center`}
          initial={{ opacity: 0, x: 10 }}
          animate={show ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {after.value}
        </motion.div>
      </div>
    </div>
  );
};

export default ComparisonBar;
