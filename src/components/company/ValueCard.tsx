'use client';

import { motion } from 'framer-motion';
import { type Value } from '@/data/companyData';

interface ValueCardProps {
  value: Value;
  index: number;
}

const ValueCard = ({ value, index }: ValueCardProps) => {
  const Icon = value.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="glass-strong p-8 rounded-3xl hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 group"
    >
      <div className="flex flex-col h-full">
        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
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
