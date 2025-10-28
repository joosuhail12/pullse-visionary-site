'use client';

import { motion } from 'framer-motion';
import { type Milestone } from '@/data/companyData';

interface TimelineProps {
  milestones: Milestone[];
}

const Timeline = ({ milestones }: TimelineProps) => {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Vertical Timeline - Enhanced Visual Treatment */}
      <div className="space-y-10">
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
              className={`relative flex gap-8 ${isHighlighted ? 'p-6 rounded-2xl border border-gray-200 bg-gray-50' : ''}`}
            >
              {/* Timeline Line */}
              {index < milestones.length - 1 && (
                <div className={`absolute ${isHighlighted ? 'left-10' : 'left-5'} top-14 bottom-0 w-px bg-gray-200`}></div>
              )}

              {/* Milestone Number Badge */}
              <div className="flex-shrink-0 flex flex-col items-center gap-3">
                <div className="text-xs font-semibold text-muted-foreground">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Icon Circle */}
                <div className={`relative z-10 w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                  isHighlighted
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-200 bg-white'
                }`}>
                  <Icon className={`w-5 h-5 ${isHighlighted ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 pb-2 pt-1">
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                  isHighlighted
                    ? 'bg-primary/10 text-primary'
                    : 'bg-gray-100 text-muted-foreground'
                }`}>
                  {milestone.date}
                </div>
                <h3 className={`text-lg mb-3 ${isHighlighted ? 'font-semibold text-foreground' : 'font-medium text-foreground'}`}>
                  {milestone.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
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
