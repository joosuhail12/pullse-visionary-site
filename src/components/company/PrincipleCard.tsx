'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface PrincipleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

const PrincipleCard = ({ icon: Icon, title, description, index }: PrincipleCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        delay: index * 0.15,
        duration: 0.5,
        type: 'spring',
        stiffness: 100,
      }}
      className="group relative h-full"
    >
      {/* Card Container */}
      <div className="relative h-full overflow-hidden rounded-3xl border-2 border-gray-200 bg-gradient-to-br from-white via-white to-gray-50/30 p-10 shadow-xl transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:-translate-y-2">
        {/* Gradient Background on Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Content */}
        <div className="relative z-10 space-y-6">
          {/* Icon */}
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-primary/20">
            <Icon className="h-10 w-10 text-primary" />
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
            {title}
          </h3>

          {/* Description */}
          <p className="text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        {/* Bottom Accent Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
    </motion.div>
  );
};

export default PrincipleCard;
