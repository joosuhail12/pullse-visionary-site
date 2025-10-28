'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface PrincipleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

const gradients = [
  'from-primary to-purple-600',
  'from-blue-500 to-cyan-500',
  'from-purple-500 to-pink-500',
  'from-orange-500 to-red-500',
];

const PrincipleCard = ({ icon: Icon, title, description, index }: PrincipleCardProps) => {
  const gradient = gradients[index % gradients.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group h-full"
    >
      <div className="h-full relative p-10 md:p-12 rounded-3xl bg-white/70 backdrop-blur-md border border-gray-100/40 shadow-[0_4px_20px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] hover:border-gray-200/60 transition-all duration-300 hover:-translate-y-1">
        {/* Gradient Corner Accent */}
        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${gradient} opacity-10 rounded-bl-full blur-xl`}></div>

        <div className="space-y-8 relative z-10">
          {/* Icon with Gradient Background */}
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg shadow-primary/30 group-hover:scale-105 transition-transform duration-300`}>
            <Icon className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {title}
          </h3>
          <p className="text-base leading-relaxed text-gray-700 font-medium">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PrincipleCard;
