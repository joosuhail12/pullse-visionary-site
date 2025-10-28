'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface PrincipleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

const PrincipleCard = ({ icon: Icon, title, description }: PrincipleCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="group h-full"
    >
      <div className="h-full border border-gray-200 bg-white p-8 rounded-2xl transition-colors duration-200 hover:border-gray-400">
        <div className="space-y-4">
          <Icon className="h-8 w-8 text-foreground" />
          <h3 className="text-xl font-medium text-foreground">
            {title}
          </h3>
          <p className="text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PrincipleCard;
