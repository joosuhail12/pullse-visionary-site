'use client';

import { motion } from 'framer-motion';
import PrincipleCard from './PrincipleCard';
import type { Value } from '@/data/companyData';

interface ValuesSectionProps {
  values: Value[];
}

const ValuesSection = ({ values }: ValuesSectionProps) => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-24"
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, type: 'spring' }}
          className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 mb-6"
        >
          <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Our Principles
          </span>
        </motion.div>
        <h2 className="text-6xl font-bold mb-6 tracking-[-0.01em]">
          <span className="bg-gradient-to-r from-gray-900 to-purple-600 bg-clip-text text-transparent">
            What We Stand For
          </span>
        </h2>
        <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
          The values that guide everything we build
        </p>
      </motion.div>

      {/* 4 Core Values - 2x2 Grid */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-10 xl:gap-12">
        {values.map((value, index) => (
          <PrincipleCard
            key={value.title}
            icon={value.icon}
            title={value.title}
            description={value.description}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ValuesSection;
