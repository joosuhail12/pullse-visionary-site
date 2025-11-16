'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export default function CoachingAccordion() {
  const [activeTab, setActiveTab] = useState(0);

  const coachingFeatures = [
    {
      title: "Instant Scorecard",
      description: "Every ticket gets evaluated the moment it closes. No waiting, no manual reviews.",
    },
    {
      title: "Precise Feedback",
      description: "AI pinpoints exact messages where a rep could improve—with suggested rewrites.",
    },
    {
      title: "Dispute & Appeal",
      description: "Reps can dispute any score. Supervisors review, add context, and close the loop.",
    },
    {
      title: "Trend Over Time",
      description: "See if empathy is improving, handle time is dropping, or resolution rates are climbing.",
    },
  ];

  return (
    <div className="space-y-2 md:space-y-3">
      {coachingFeatures.map((feature, idx) => (
        <div
          key={idx}
          className={`group relative overflow-hidden rounded-xl border transition-all duration-300 cursor-pointer ${
            activeTab === idx
              ? 'border-primary/50 bg-primary/5 shadow-lg shadow-primary/10'
              : 'border-border/50 bg-card/30 hover:border-primary/30 hover:bg-card/50'
          }`}
          onClick={() => setActiveTab(idx)}
        >
          <div className="flex items-center justify-between p-3 md:p-4">
            <h3
              className={`text-sm md:text-base font-bold transition-colors ${
                activeTab === idx ? 'text-primary' : 'text-foreground'
              }`}
            >
              {feature.title}
            </h3>
            <ChevronRight
              className={`h-4.5 w-4.5 md:h-5 md:w-5 transition-all duration-300 ${
                activeTab === idx ? 'rotate-90 text-primary' : 'text-muted-foreground'
              }`}
            />
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              activeTab === idx ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <p className="px-3 md:px-4 pb-3 md:pb-4 text-xs md:text-sm text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
