'use client';

import { motion } from 'framer-motion';
import { type Milestone } from '@/data/companyData';

interface TimelineProps {
  milestones: Milestone[];
}

const gradients = [
  { bg: 'from-blue-500 to-cyan-500', glow: 'shadow-blue-500/30' },
  { bg: 'from-purple-500 to-pink-500', glow: 'shadow-purple-500/30' },
  { bg: 'from-orange-500 to-red-500', glow: 'shadow-orange-500/30' },
  { bg: 'from-primary to-blue-600', glow: 'shadow-primary/30' },
  { bg: 'from-green-500 to-emerald-500', glow: 'shadow-green-500/30' },
];

const Timeline = ({ milestones }: TimelineProps) => {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Enhanced Vertical Timeline with Story-Driven Design */}
      <div className="space-y-8">
        {milestones.map((milestone, index) => {
          const Icon = milestone.icon;
          const isHighlighted = milestone.highlight;
          const gradient = gradients[index % gradients.length];

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                type: 'spring',
                stiffness: 100,
              }}
              className="relative group"
            >
              {/* Enhanced Timeline Line with Gradient */}
              {index < milestones.length - 1 && (
                <div className="absolute left-10 md:left-12 top-28 md:top-32 bottom-0 w-0.5 bg-gradient-to-b from-gray-300 via-gray-200 to-transparent"></div>
              )}

              {/* Premium Glassmorphic Card */}
              <div
                className={`relative flex flex-col md:flex-row gap-6 md:gap-8 p-6 md:p-10 rounded-3xl transition-all duration-500 ${
                  isHighlighted
                    ? 'bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-2xl border-2 border-primary/30 shadow-2xl hover:shadow-3xl hover:-translate-y-2'
                    : 'bg-white/70 backdrop-blur-xl border border-white/50 shadow-xl hover:shadow-2xl hover:-translate-y-1'
                }`}
              >
                {/* Large Icon Section */}
                <div className="flex-shrink-0 relative z-10 flex items-start">
                  <div
                    className={`relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${gradient.bg} ${gradient.glow} shadow-2xl flex items-center justify-center ${
                      isHighlighted ? 'scale-110 animate-pulse' : 'group-hover:scale-105'
                    } transition-all duration-500`}
                  >
                    <Icon className="w-10 h-10 md:w-12 md:h-12 text-white" />

                    {/* Milestone Number Badge */}
                    <div
                      className={`absolute -top-3 -right-3 w-8 h-8 md:w-10 md:h-10 rounded-full ${
                        isHighlighted
                          ? 'bg-gradient-to-br from-primary to-purple-600 ring-4 ring-primary/20'
                          : 'bg-gray-900 ring-2 ring-gray-300'
                      } text-white text-sm md:text-base font-bold flex items-center justify-center shadow-xl`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 space-y-4">
                  {/* Date Badge with Enhanced Style */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`inline-flex items-center px-5 py-2 rounded-full text-sm font-bold tracking-wide ${
                        isHighlighted
                          ? `bg-gradient-to-r ${gradient.bg} text-white shadow-lg ${gradient.glow}`
                          : 'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}
                    >
                      {milestone.date}
                    </div>
                    {isHighlighted && (
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/40 text-primary text-xs font-bold uppercase tracking-wider"
                      >
                        Coming Soon
                      </motion.div>
                    )}
                  </div>

                  {/* Title with Better Typography */}
                  <h3
                    className={`text-2xl md:text-3xl font-bold tracking-tight ${
                      isHighlighted
                        ? 'bg-gradient-to-r from-gray-900 to-primary bg-clip-text text-transparent'
                        : 'text-gray-900'
                    }`}
                  >
                    {milestone.title}
                  </h3>

                  {/* Description with Enhanced Readability */}
                  <p className={`text-base md:text-lg text-gray-700 leading-relaxed ${
                    isHighlighted ? 'font-medium' : ''
                  }`}>
                    {milestone.description}
                  </p>

                  {/* Gradient Progress Bar for Highlighted */}
                  {isHighlighted && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-1 bg-gradient-to-r from-primary via-purple-500 to-primary rounded-full origin-left"
                    />
                  )}
                </div>

                {/* Decorative Corner Accent for Highlighted */}
                {isHighlighted && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl pointer-events-none" />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
