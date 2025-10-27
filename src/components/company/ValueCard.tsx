'use client';

import { motion } from 'framer-motion';
import { type Value } from '@/data/companyData';

interface ValueCardProps {
  value: Value;
  index: number;
}

const ValueCard = ({ value, index }: ValueCardProps) => {
  const Icon = value.icon;

  // Define unique gradient colors for each value based on index
  const gradients = [
    'from-teal-600 to-cyan-600', // First Principles - Teal
    'from-purple-600 to-pink-600', // Customer First - Purple
    'from-blue-600 to-indigo-600', // Build in Public - Blue
    'from-pink-600 to-rose-600', // AI-Native - Pink
    'from-green-600 to-emerald-600', // Keep It Simple - Green
    'from-orange-600 to-amber-600', // Move Fast - Orange
    'from-indigo-600 to-violet-600', // Honest & Transparent - Indigo
  ];

  const shadowColors = [
    'hover:shadow-teal-500/10',
    'hover:shadow-purple-500/10',
    'hover:shadow-blue-500/10',
    'hover:shadow-pink-500/10',
    'hover:shadow-green-500/10',
    'hover:shadow-orange-500/10',
    'hover:shadow-indigo-500/10',
  ];

  const gradient = gradients[index % gradients.length];
  const shadowColor = shadowColors[index % shadowColors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`glass-strong p-8 rounded-3xl hover:shadow-xl ${shadowColor} transition-all duration-300 group`}
    >
      <div className="flex flex-col h-full">
        {/* Icon */}
        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="w-7 h-7 text-white" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-3">{value.title}</h3>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed flex-1">
          {value.description}
        </p>
      </div>
    </motion.div>
  );
};

export default ValueCard;
