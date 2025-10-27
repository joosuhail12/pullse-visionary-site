'use client';

import { motion } from 'framer-motion';
import { type Milestone } from '@/data/companyData';

interface TimelineProps {
  milestones: Milestone[];
}

const Timeline = ({ milestones }: TimelineProps) => {
  // Determine milestone category for color coding
  const getMilestoneCategory = (milestone: Milestone) => {
    const title = milestone.title.toLowerCase();
    const description = milestone.description.toLowerCase();

    if (milestone.highlight) return 'current';
    if (
      title.includes('platform') ||
      title.includes('architecture') ||
      description.includes('platform') ||
      description.includes('aggregation')
    )
      return 'platform';
    if (
      title.includes('building') ||
      title.includes('development') ||
      title.includes('refinement')
    )
      return 'product';
    return 'milestone';
  };

  const getCategoryColors = (category: string, isHighlighted: boolean) => {
    if (isHighlighted) {
      return {
        gradient: 'from-purple-600 to-pink-600',
        iconBg: 'bg-gradient-to-br from-purple-600 to-pink-600',
        iconColor: 'text-white',
        dateColor: 'text-purple-600',
        shadow: 'shadow-lg shadow-purple-500/50',
        ring: 'ring-2 ring-purple-500/50',
      };
    }

    switch (category) {
      case 'platform':
        return {
          gradient: 'from-blue-600 to-indigo-600',
          iconBg: 'bg-gradient-to-br from-blue-100 to-indigo-100',
          iconColor: 'text-blue-600',
          dateColor: 'text-blue-600',
          shadow: '',
          ring: '',
        };
      case 'product':
        return {
          gradient: 'from-purple-600 to-pink-600',
          iconBg: 'bg-gradient-to-br from-purple-100 to-pink-100',
          iconColor: 'text-purple-600',
          dateColor: 'text-purple-600',
          shadow: '',
          ring: '',
        };
      default:
        return {
          gradient: 'from-gray-600 to-gray-700',
          iconBg: 'bg-gradient-to-br from-gray-100 to-gray-200',
          iconColor: 'text-gray-600',
          dateColor: 'text-gray-600',
          shadow: '',
          ring: '',
        };
    }
  };

  return (
    <div className="relative">
      {/* Desktop: Horizontal Timeline */}
      <div className="hidden lg:block">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 -translate-y-1/2 rounded-full"></div>

          {/* Milestones */}
          <div className={`grid gap-6`} style={{ gridTemplateColumns: `repeat(${milestones.length}, minmax(0, 1fr))` }}>
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              const isHighlighted = milestone.highlight;
              const category = getMilestoneCategory(milestone);
              const colors = getCategoryColors(category, isHighlighted || false);

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
                    className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center mb-6 ${
                      isHighlighted ? colors.iconBg : colors.iconBg
                    } ${colors.shadow}`}
                  >
                    <Icon className={`w-9 h-9 ${colors.iconColor}`} />
                  </div>

                  {/* Content Card */}
                  <div
                    className={`glass-strong p-5 rounded-2xl text-center min-h-[180px] flex flex-col ${colors.ring}`}
                  >
                    <p className={`text-sm ${colors.dateColor} font-bold mb-2 uppercase tracking-wide`}>
                      {milestone.date}
                    </p>
                    <h3 className="font-bold text-base mb-3">{milestone.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {milestone.description}
                    </p>
                    {isHighlighted && (
                      <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                        <span className="text-sm text-white font-medium">
                          Current Stage
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
          const category = getMilestoneCategory(milestone);
          const colors = getCategoryColors(category, isHighlighted || false);

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
                <div className="absolute left-10 top-20 bottom-0 w-1 bg-gradient-to-b from-purple-200 to-pink-200 rounded-full"></div>
              )}

              {/* Icon Node */}
              <div className="flex-shrink-0">
                <div
                  className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center ${colors.iconBg} ${colors.shadow}`}
                >
                  <Icon className={`w-9 h-9 ${colors.iconColor}`} />
                </div>
              </div>

              {/* Content Card */}
              <div className="flex-1">
                <div className={`glass-strong p-6 rounded-2xl ${colors.ring}`}>
                  <p className={`text-sm ${colors.dateColor} font-bold mb-2 uppercase tracking-wide`}>
                    {milestone.date}
                  </p>
                  <h3 className="font-bold text-lg mb-3">{milestone.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
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
