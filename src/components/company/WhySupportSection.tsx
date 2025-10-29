'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface Reason {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface WhySupportSectionProps {
  headline: string;
  reasons: Reason[];
}

const gradients = [
  'from-blue-500 to-cyan-500',
  'from-purple-500 to-pink-500',
  'from-orange-500 to-red-500',
  'from-green-500 to-emerald-500',
];

const WhySupportSection = ({ headline, reasons }: WhySupportSectionProps) => {
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
            Our Strategy
          </span>
        </motion.div>
        <h2 className="text-6xl font-bold mb-6 tracking-[-0.01em]">
          <span className="bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
            {headline}
          </span>
        </h2>
        <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
          The strategic reasoning behind our platform approach
        </p>
      </motion.div>

      {/* 4 Reasons - 2x2 Grid */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-10 xl:gap-12">
        {reasons.map((reason, index) => {
          const Icon = reason.icon;
          const gradient = gradients[index % gradients.length];

          return (
            <motion.div
              key={reason.title}
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
                    {reason.title}
                  </h3>
                  <p className="text-base leading-relaxed text-gray-700 font-medium">
                    {reason.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default WhySupportSection;
