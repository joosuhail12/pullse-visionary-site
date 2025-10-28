'use client';

import { motion } from 'framer-motion';

interface GradientMeshProps {
  variant?: 'purple' | 'blue' | 'green' | 'orange' | 'multi';
  opacity?: number;
  className?: string;
}

const GradientMesh = ({ variant = 'multi', opacity = 0.4, className = '' }: GradientMeshProps) => {
  const gradients = {
    purple: 'from-purple-400/40 via-pink-400/40 to-primary/40',
    blue: 'from-blue-400/40 via-cyan-400/40 to-primary/40',
    green: 'from-emerald-400/40 via-teal-400/40 to-primary/40',
    orange: 'from-orange-400/40 via-amber-400/40 to-primary/40',
    multi: 'from-purple-400/30 via-pink-400/30 to-orange-400/30',
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        {/* Primary gradient blob */}
        <div className={`absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br ${gradients[variant]} blur-3xl`} />

        {/* Secondary gradient blob */}
        <div className={`absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-primary/30 via-blue-400/30 to-purple-400/30 blur-3xl`} />

        {/* Tertiary gradient blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-cyan-400/20 via-primary/20 to-pink-400/20 blur-3xl" />
      </motion.div>
    </div>
  );
};

export default GradientMesh;
