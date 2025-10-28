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
    <div className="max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6">{title}</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {subtitle}
        </p>
      </motion.div>

      {/* Mission Statement - Featured Block */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="max-w-4xl mx-auto mb-20"
      >
        <div className="relative p-10 md:p-12 rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 shadow-xl">
          <div className="absolute top-6 left-6 text-sm font-bold uppercase tracking-wider text-primary/60">
            Our Mission
          </div>
          <blockquote className="pt-8 text-xl md:text-2xl leading-relaxed text-foreground font-medium">
            {mission}
          </blockquote>
        </div>
      </motion.div>

      {/* 4 Core Principles - 2x2 Grid */}
      <div className="mb-20">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-center mb-12"
        >
          Our Principles
        </motion.h3>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
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
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl mx-auto"
      >
        <div className="p-10 md:p-12 rounded-3xl border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-white">
          <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-6">
            Our Vision
          </div>
          <p className="text-lg md:text-xl leading-relaxed text-foreground">
            {vision}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ApproachSection;
