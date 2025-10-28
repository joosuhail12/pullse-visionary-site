'use client';

import { motion } from 'framer-motion';
import { type Milestone } from '@/data/companyData';

interface TimelineProps {
  milestones: Milestone[];
}

const gradients = [
  'from-blue-500 to-cyan-500',
  'from-purple-500 to-pink-500',
  'from-orange-500 to-red-500',
  'from-primary to-blue-600',
  'from-green-500 to-emerald-500',
];

const Timeline = ({ milestones }: TimelineProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Vertical Timeline - Modern Glassmorphic Treatment */}
      <div className="space-y-6">
        {milestones.map((milestone, index) => {
          const Icon = milestone.icon;
          const isHighlighted = milestone.highlight;
          const gradient = gradients[index % gradients.length];

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Timeline Line */}
              {index < milestones.length - 1 && (
                <div className="absolute left-8 top-20 bottom-0 w-px bg-gradient-to-b from-gray-300 to-transparent"></div>
              )}

              {/* Glassmorphic Card */}
              <div className={`relative flex gap-6 p-6 rounded-2xl transition-all duration-300 ${
                isHighlighted
                  ? 'bg-white/80 backdrop-blur-md border border-white/40 shadow-xl hover:shadow-2xl'
                  : 'bg-white/50 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl'
              }`}>
                {/* Icon with Gradient */}
                <div className="flex-shrink-0 relative z-10">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${gradient} shadow-lg flex items-center justify-center ${
                    isHighlighted ? 'scale-110' : ''
                  } transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Milestone Number */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center shadow-md">
                    {index + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  {/* Date Badge */}
                  <div className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 ${
                    isHighlighted
                      ? `bg-gradient-to-r ${gradient} text-white shadow-md`
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {milestone.date}
                  </div>

                  {/* Title */}
                  <h3 className={`text-xl font-bold mb-3 ${
                    isHighlighted ? 'text-gray-900' : 'text-gray-800'
                  }`}>
                    {milestone.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base text-gray-700 leading-relaxed font-medium">
                    {milestone.description}
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

export default Timeline;
