'use client';

import { Shield, Zap, TrendingUp, MessageSquare } from 'lucide-react';

export default function ProductAutoQAProcessSteps() {
  const processSteps = [
    {
      number: '01',
      icon: Shield,
      color: 'from-primary to-purple-600',
      title: 'Ticket Closes',
      description: 'The moment a ticket is marked resolved, Auto-QA kicks in—no manual trigger required.',
    },
    {
      number: '02',
      icon: Zap,
      color: 'from-purple-600 to-indigo-600',
      title: 'AI Evaluates',
      description: 'Every message analyzed for empathy, clarity, policy adherence, resolution quality, and more.',
    },
    {
      number: '03',
      icon: TrendingUp,
      color: 'from-indigo-600 to-primary',
      title: 'Scorecard Generated',
      description: 'Instant feedback with scores, trend lines, and surgical coaching—delivered to the rep in real-time.',
    },
    {
      number: '04',
      icon: MessageSquare,
      color: 'from-primary to-purple-600',
      title: 'Continuous Improvement',
      description: 'Reps see progress over time. Managers spot patterns. Coaching becomes proactive, not reactive.',
    },
  ];

  return (
    <>
      <div className="text-center mb-8 md:mb-12 lg:mb-16 space-y-3 md:space-y-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
          From Ticket to Coaching
        </h2>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
          Automatic QA that turns every conversation into a learning opportunity.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6 max-w-7xl mx-auto">
        {processSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="group relative">
              <div className="relative h-full p-4 md:p-5 lg:p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="space-y-3 md:space-y-3.5 lg:space-y-4">
                  <div className={`inline-flex h-11 w-11 md:h-12 md:w-12 lg:h-14 lg:w-14 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} shadow-lg`}>
                    <Icon className="h-5.5 w-5.5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-background" />
                  </div>

                  <div className="text-5xl md:text-5xl lg:text-6xl font-bold text-muted-foreground/20 group-hover:text-primary/20 transition-colors">
                    {step.number}
                  </div>

                  <h3 className="text-lg md:text-xl font-bold group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connector Line */}
              {index < 3 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
