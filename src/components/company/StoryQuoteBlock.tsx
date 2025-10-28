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
      gradient: 'from-red-500 to-orange-500',
      bgGradient: 'from-red-500/20 via-orange-500/10 to-transparent',
      border: 'border-red-500/20',
      icon: AlertCircle,
    },
    blue: {
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
      border: 'border-blue-500/20',
      icon: Lightbulb,
    },
    purple: {
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/20 via-pink-500/10 to-transparent',
      border: 'border-purple-500/20',
      icon: Rocket,
    },
  };

  const config = colorConfig[accentColor];
  const Icon = config.icon;

  return (
    <motion.div
      className="relative h-full"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Hero-Style Card with Gradient Background */}
      <div className={`relative h-full min-h-[500px] md:min-h-[600px] p-10 md:p-16 rounded-3xl bg-gradient-to-br ${config.bgGradient} backdrop-blur-md border ${config.border} shadow-2xl hover:shadow-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 group`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

        {/* Large Icon at Top */}
        <div className="relative z-10">
          <motion.div
            className={`inline-flex w-20 h-20 rounded-2xl bg-gradient-to-br ${config.gradient} shadow-2xl items-center justify-center mb-8`}
            whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="w-10 h-10 text-white" />
          </motion.div>

          {/* Title */}
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 transition-colors duration-300 group-hover:text-gray-800">
            {title}
          </h3>
        </div>

        {/* Large Quote - Hero Element */}
        <blockquote className="relative z-10 flex-1 flex items-center">
          <div className="relative">
            {/* Large Quote Mark */}
            <motion.div
              className={`absolute -top-6 -left-4 text-8xl font-serif bg-gradient-to-br ${config.gradient} bg-clip-text text-transparent opacity-20`}
              animate={{ opacity: [0.15, 0.25, 0.15] }}
              transition={{ duration: 4, repeat: Infinity, ease: [0.45, 0.05, 0.55, 0.95] }}
            >
              "
            </motion.div>
            <p className="text-3xl md:text-4xl lg:text-5xl leading-tight font-bold text-gray-900 relative z-10">
              {quote}
            </p>
          </div>
        </blockquote>

        {/* Content at Bottom */}
        <div className="relative z-10 pt-8 border-t border-gray-200/50 group-hover:border-gray-300/60 transition-colors duration-300">
          <p className="text-base md:text-lg leading-relaxed text-gray-700 font-medium">
            {content}
          </p>

          {/* Card Number with Animation */}
          <div className="mt-6 inline-flex items-center gap-2">
            <motion.div
              className={`w-8 h-8 rounded-lg bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-lg`}
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-sm font-bold text-white">
                {index + 1}
              </span>
            </motion.div>
            <span className="text-sm text-gray-500 font-medium">of 3</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StoryQuoteBlock;
