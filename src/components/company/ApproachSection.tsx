'use client';

import { motion } from 'framer-motion';
import PrincipleCard from './PrincipleCard';
import { Target } from 'lucide-react';
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
        transition={{ duration: 0.5 }}
        className="text-center mb-24"
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, type: 'spring' }}
          className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 mb-6"
        >
          <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Our Approach
          </span>
        </motion.div>
        <h2 className="text-6xl font-bold mb-6 tracking-tight">
          <span className="bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
            {title}
          </span>
        </h2>
        <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
          {subtitle}
        </p>
      </motion.div>

      {/* Mission Statement - Glassmorphic Featured Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-24 relative"
      >
        {/* Icon Badge */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-blue-600 shadow-xl flex items-center justify-center">
            <Target className="w-8 h-8 text-white" />
          </div>
        </div>

        <div className="relative p-12 md:p-16 pt-16 rounded-3xl bg-white/80 backdrop-blur-lg border border-white/40 shadow-2xl">
          <blockquote className="text-3xl md:text-4xl leading-relaxed font-bold text-center max-w-4xl mx-auto">
            <span className="bg-gradient-to-r from-gray-800 via-primary to-blue-600 bg-clip-text text-transparent">
              {mission}
            </span>
          </blockquote>
        </div>
      </motion.div>

      {/* 4 Core Principles - 2x2 Grid */}
      <div className="mb-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h3 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Our Principles
            </span>
          </h3>
          <p className="text-lg text-gray-600">The values that guide everything we build</p>
        </motion.div>
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

      {/* Vision Statement - Glass Card with Gradient */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        <div className="relative p-10 md:p-12 rounded-3xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/30 backdrop-blur-sm shadow-xl">
          {/* Decorative Corner Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-bl-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-600/20 to-cyan-600/20 rounded-tr-full blur-2xl"></div>

          <p className="text-2xl leading-relaxed font-semibold text-gray-800 relative z-10">
            {vision}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ApproachSection;
