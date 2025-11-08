'use client';

import { LucideIcon } from "lucide-react";
import { CheckCircle2, Clock, ArrowRight } from "lucide-react";

interface WorkflowStep {
  icon: LucideIcon;
  label: string;
  description: string;
}

interface WorkflowShowcaseProps {
  title: string;
  scenario: string;
  steps: WorkflowStep[];
  outcome: {
    metric: string;
    value: string;
    description: string;
  };
  gradient?: string;
  category?: string;
  categoryColor?: string;
}

const WorkflowShowcase = ({
  title,
  scenario,
  steps,
  outcome,
  gradient = "from-blue-500/10 to-cyan-500/10",
  category = "WORKFLOW",
  categoryColor = "from-blue-500 to-cyan-500"
}: WorkflowShowcaseProps) => {
  return (
    <div className="group relative overflow-hidden rounded-3xl border-2 border-border/40 bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-2xl hover:-translate-y-1">
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-40`} />
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />

      {/* Floating Outcome Badge - Top Right */}
      <div className="absolute top-6 right-6 z-10">
        <div className={`rounded-2xl border-2 border-primary bg-gradient-to-br ${gradient} backdrop-blur-md p-4 shadow-xl`}>
          <div className="flex items-center gap-2 mb-1">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              {outcome.metric}
            </span>
          </div>
          <div className="text-4xl font-black text-primary mb-1">
            {outcome.value}
          </div>
          <div className="text-[10px] text-muted-foreground font-semibold">
            vs 220s traditional
          </div>
        </div>
      </div>

      <div className="relative p-8">
        {/* Title - More Prominent */}
        <div className="mb-6 pr-32">
          <h4 className="text-2xl font-black text-foreground leading-tight mb-3">
            {title}
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {scenario}
          </p>
        </div>

        {/* Steps Grid - 2x2 Layout */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative rounded-xl border border-border/50 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm p-4 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:scale-105"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${categoryColor} shadow-md`}>
                    <Icon className="h-5 w-5 text-background" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-bold text-primary uppercase tracking-wider mb-0.5">
                      Step {index + 1}
                    </div>
                    <div className="text-sm font-bold text-foreground leading-tight">
                      {step.label}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {step.description}
                </p>

                {/* Checkmark indicator */}
                <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 border-2 border-background shadow-lg">
                  <CheckCircle2 className="h-3.5 w-3.5 text-background" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Summary */}
        <div className="flex items-center justify-between pt-6 border-t border-border/40">
          <p className="text-xs text-muted-foreground max-w-md">
            {outcome.description}
          </p>
          <ArrowRight className="h-5 w-5 text-primary opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
        </div>
      </div>

      {/* Bottom glow */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${categoryColor} opacity-60`} />
    </div>
  );
};

export default WorkflowShowcase;
