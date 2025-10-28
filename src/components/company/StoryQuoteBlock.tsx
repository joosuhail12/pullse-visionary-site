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
      bgGradient: 'from-red-500/10 to-orange-500/10',
      border: 'border-red-500/30',
      icon: AlertCircle,
    },
    blue: {
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/10 to-cyan-500/10',
      border: 'border-blue-500/30',
      icon: Lightbulb,
    },
    purple: {
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/10 to-pink-500/10',
      border: 'border-purple-500/30',
      icon: Rocket,
    },
  };

  const config = colorConfig[accentColor];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto relative group"
    >
      {/* Glassmorphic Card */}
      <div className={`relative p-10 md:p-12 rounded-3xl bg-white/70 backdrop-blur-md border ${config.border} shadow-xl hover:shadow-2xl transition-all duration-300`}>
        {/* Number Badge with Gradient */}
        <div className="absolute -top-4 -left-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.gradient} shadow-lg flex items-center justify-center`}>
            <span className="text-xl font-bold text-white">
              0{index + 1}
            </span>
          </div>
        </div>

        {/* Icon Badge */}
        <div className="absolute -top-4 -right-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.gradient} shadow-lg flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Title with Gradient */}
        <h3 className="text-4xl font-bold mb-10 tracking-tight">
          <span className={`bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}>
            {title}
          </span>
        </h3>

        {/* Quote Block with Glass Effect */}
        <blockquote className={`relative mb-10 p-8 md:p-10 rounded-2xl bg-gradient-to-br ${config.bgGradient} border ${config.border} backdrop-blur-sm`}>
          {/* Quote Mark */}
          <div className={`absolute -top-3 -left-3 text-6xl font-serif bg-gradient-to-br ${config.gradient} bg-clip-text text-transparent opacity-30`}>
            "
          </div>
          <p className="text-2xl md:text-3xl leading-relaxed text-gray-800 font-semibold relative z-10">
            {quote}
          </p>
        </blockquote>

        {/* Content */}
        <p className="text-lg leading-relaxed text-gray-700 font-medium">
          {content}
        </p>
      </div>
    </motion.div>
  );
};

export default StoryQuoteBlock;
