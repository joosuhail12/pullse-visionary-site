'use client';

import { motion } from 'framer-motion';
import PrincipleCard from './PrincipleCard';
import type { Value } from '@/data/companyData';

interface ApproachSectionProps {
  title: string;
  subtitle: string;
  mission: string;
  principles: Value[];
  vision: string;
}

const ApproachSection = ({
  title,
  subtitle,
  mission,
  principles,
  vision,
}: ApproachSectionProps) => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="text-center mb-20"
      >
        <h2 className="text-5xl font-semibold mb-6 tracking-tight">{title}</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </motion.div>

      {/* Mission Statement - Featured Full Width */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="mb-20"
      >
        <div className="p-12 rounded-2xl border border-gray-200 bg-white border-t-4 border-t-primary">
          <blockquote className="text-2xl leading-relaxed text-foreground font-medium text-center max-w-4xl mx-auto">
            {mission}
          </blockquote>
        </div>
      </motion.div>

      {/* 4 Core Principles - 2x2 Grid */}
      <div className="mb-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <div className="w-8 h-px bg-gray-300"></div>
          <h3 className="text-3xl font-medium">
            Our Principles
          </h3>
          <div className="w-8 h-px bg-gray-300"></div>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {principles.map((principle, index) => (
            <PrincipleCard
              key={principle.title}
              icon={principle.icon}
              title={principle.title}
              description={principle.description}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Vision Statement - Distinct Treatment */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="max-w-4xl mx-auto"
      >
        <div className="p-10 rounded-2xl border border-gray-200 bg-gray-100 border-l-4 border-l-primary">
          <p className="text-xl leading-relaxed text-foreground">
            {vision}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ApproachSection;
