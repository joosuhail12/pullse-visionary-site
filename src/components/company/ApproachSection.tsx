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
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-semibold mb-6">{title}</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {subtitle}
        </p>
      </motion.div>

      {/* Mission Statement */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="max-w-4xl mx-auto mb-16"
      >
        <div className="p-8 rounded-2xl border border-gray-200 bg-gray-50">
          <blockquote className="text-xl leading-relaxed text-foreground font-medium">
            {mission}
          </blockquote>
        </div>
      </motion.div>

      {/* 4 Core Principles - 2x2 Grid */}
      <div className="mb-16">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-3xl font-medium text-center mb-12"
        >
          Our Principles
        </motion.h3>
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

      {/* Vision Statement */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="max-w-4xl mx-auto"
      >
        <div className="p-8 rounded-2xl border border-gray-200 bg-gray-50">
          <p className="text-xl leading-relaxed text-foreground">
            {vision}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ApproachSection;
