'use client';

import { motion } from 'framer-motion';
import { AlertCircle, Lightbulb, Rocket } from 'lucide-react';

interface StoryQuoteBlockProps {
  title: string;
  quote: string;
  content: string;
  index: number;
  accentColor?: 'red' | 'blue' | 'purple';
}

const StoryQuoteBlock = ({
  title,
  quote,
  content,
  index,
  accentColor = 'purple',
}: StoryQuoteBlockProps) => {
  const colorConfig = {
    red: {
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-500/20 via-purple-600/10 to-transparent',
      border: 'border-purple-500/20',
      icon: AlertCircle,
    },
    blue: {
      gradient: 'from-primary to-purple-500',
      bgGradient: 'from-primary/20 via-purple-500/10 to-transparent',
      border: 'border-primary/20',
      icon: Lightbulb,
    },
    purple: {
      gradient: 'from-purple-400 to-primary',
      bgGradient: 'from-purple-400/20 via-primary/10 to-transparent',
      border: 'border-purple-400/20',
      icon: Rocket,
    },
  };

  const config = colorConfig[accentColor];
  const Icon = config.icon;

  return (
    <motion.div
      className="relative h-full"
      whileHover={{ scale: 1.01, y: -2 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Compact Card for Grid Layout */}
      <div className={`relative h-full min-h-[450px] p-10 md:p-12 lg:p-14 rounded-3xl bg-gradient-to-br ${config.bgGradient} backdrop-blur-md border ${config.border} ring-1 ring-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col justify-between transition-all duration-300 group`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

        {/* Icon at Top */}
        <div className="relative z-10">
          <motion.div
            className={`inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br ${config.gradient} shadow-2xl items-center justify-center mb-6`}
            whileHover={{ rotate: [0, 360] }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>

          {/* Title - Compact */}
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 transition-colors duration-300 group-hover:text-gray-800">
            {title}
          </h3>
        </div>

        {/* Quote - Sized for Grid Column */}
        <blockquote className="relative z-10 flex-1 flex items-center">
          <div className="relative">
            {/* Quote Mark - Aligned to 6s pattern */}
            <motion.div
              className={`absolute -top-4 -left-3 text-6xl font-serif bg-gradient-to-br ${config.gradient} bg-clip-text text-transparent opacity-20`}
              animate={{ opacity: [0.15, 0.25, 0.15] }}
              transition={{ duration: 6, repeat: Infinity, ease: [0.25, 0.1, 0.25, 1] }}
            >
              "
            </motion.div>
            <p className="text-2xl md:text-3xl xl:text-4xl leading-snug font-semibold italic text-gray-900 relative z-10">
              {quote}
            </p>
          </div>
        </blockquote>

        {/* Content at Bottom */}
        <div className="relative z-10 pt-6 border-t border-gray-200/50 group-hover:border-gray-300/60 transition-colors duration-300">
          <p className="text-sm md:text-base leading-relaxed text-gray-700 font-medium">
            {content}
          </p>

          {/* Card Number with Animation */}
          <div className="mt-4 inline-flex items-center gap-2">
            <motion.div
              className={`w-7 h-7 rounded-lg bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-lg`}
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className="text-xs font-bold text-white">
                {index + 1}
              </span>
            </motion.div>
            <span className="text-xs text-gray-500 font-medium">of 3</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StoryQuoteBlock;
