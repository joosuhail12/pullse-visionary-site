'use client';

import { motion } from 'framer-motion';
import { type Milestone } from '@/data/companyData';

interface TimelineProps {
  milestones: Milestone[];
}

const Timeline = ({ milestones }: TimelineProps) => {
  return (
    <div className="relative">
      {/* Desktop: Horizontal Timeline */}
      <div className="hidden lg:block">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 -translate-y-1/2"></div>

          {/* Milestones */}
          <div className="grid grid-cols-6 gap-4">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              const isHighlighted = milestone.highlight;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex flex-col items-center"
                >
                  {/* Icon Node */}
                  <div
                    className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                      isHighlighted
                        ? 'bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg shadow-purple-500/50'
                        : 'glass-strong'
                    }`}
                  >
                    <Icon
                      className={`w-8 h-8 ${
                        isHighlighted ? 'text-white' : 'text-purple-600'
                      }`}
                    />
                  </div>

                  {/* Content Card */}
                  <div
                    className={`glass-strong p-4 rounded-2xl text-center ${
                      isHighlighted ? 'ring-2 ring-purple-500/50' : ''
                    }`}
                  >
                    <p className="text-xs text-purple-600 font-semibold mb-1 uppercase">
                      {milestone.date}
                    </p>
                    <h3 className="font-bold text-sm mb-2">{milestone.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {milestone.description}
                    </p>
                    {isHighlighted && (
                      <div className="mt-3 inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                        <span className="text-xs text-white font-medium">
                          Current
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile/Tablet: Vertical Timeline */}
      <div className="lg:hidden space-y-8">
        {milestones.map((milestone, index) => {
          const Icon = milestone.icon;
          const isHighlighted = milestone.highlight;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative flex gap-6"
            >
              {/* Timeline Line */}
              {index < milestones.length - 1 && (
                <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-purple-200 to-pink-200"></div>
              )}

              {/* Icon Node */}
              <div className="flex-shrink-0">
                <div
                  className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center ${
                    isHighlighted
                      ? 'bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg shadow-purple-500/50'
                      : 'glass-strong'
                  }`}
                >
                  <Icon
                    className={`w-8 h-8 ${
                      isHighlighted ? 'text-white' : 'text-purple-600'
                    }`}
                  />
                </div>
              </div>

              {/* Content Card */}
              <div className="flex-1">
                <div
                  className={`glass-strong p-6 rounded-2xl ${
                    isHighlighted ? 'ring-2 ring-purple-500/50' : ''
                  }`}
                >
                  <p className="text-xs text-purple-600 font-semibold mb-2 uppercase">
                    {milestone.date}
                  </p>
                  <h3 className="font-bold text-lg mb-2">{milestone.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {milestone.description}
                  </p>
                  {isHighlighted && (
                    <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                      <span className="text-sm text-white font-medium">
                        Current Stage
                      </span>
                    </div>
                  )}
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
