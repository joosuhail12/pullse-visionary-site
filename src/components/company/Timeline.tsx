'use client';

import { motion } from 'framer-motion';
import { type Milestone } from '@/data/companyData';

interface TimelineProps {
  milestones: Milestone[];
}

const Timeline = ({ milestones }: TimelineProps) => {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Vertical Timeline - Simple Text List */}
      <div className="space-y-8">
        {milestones.map((milestone, index) => {
          const Icon = milestone.icon;
          const isHighlighted = milestone.highlight;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="relative flex gap-6"
            >
              {/* Timeline Line */}
              {index < milestones.length - 1 && (
                <div className="absolute left-4 top-10 bottom-0 w-px bg-gray-200"></div>
              )}

              {/* Icon Dot */}
              <div className="flex-shrink-0">
                <div className="relative z-10 w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center">
                  <Icon className="w-4 h-4 text-foreground" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 pb-2">
                <p className={`text-sm mb-1 ${isHighlighted ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
                  {milestone.date}
                </p>
                <h3 className={`text-base mb-2 ${isHighlighted ? 'font-semibold' : 'font-medium'}`}>
                  {milestone.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
