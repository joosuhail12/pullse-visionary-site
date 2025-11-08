'use client';

import { useState } from 'react';
import { MessageCircle, Workflow, Bot, Sparkles, BarChart3, ArrowRight, Zap } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Connect',
    description: 'Unify all customer signals across every channel',
    icon: MessageCircle,
    details: [
      'Omnichannel inbox consolidates email, chat, voice, and webhooks',
      'Real-time ingestion with sub-100ms latency',
      'Context-rich threads preserve full conversation history',
      'Native integrations sync bidirectionally',
    ],
    color: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-500/10 via-cyan-500/5 to-transparent',
  },
  {
    number: '02',
    title: 'Route',
    description: 'Intelligent triage and assignment at scale',
    icon: Workflow,
    details: [
      'Visual workflow builder with drag-and-drop logic',
      'Skills-based routing matches tickets to best agents',
      'Priority scoring uses AI + custom business rules',
      'SLA tracking with automated escalation paths',
    ],
    color: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-500/10 via-pink-500/5 to-transparent',
  },
  {
    number: '03',
    title: 'Automate',
    description: 'AI handles 60-70% of routine requests',
    icon: Bot,
    details: [
      'Intent classification with 95%+ accuracy',
      'Knowledge retrieval from docs, tickets, and APIs',
      'Auto-resolution for common scenarios',
      'Graceful handoff to humans when needed',
    ],
    color: 'from-green-500 to-emerald-500',
    bgGradient: 'from-green-500/10 via-emerald-500/5 to-transparent',
  },
  {
    number: '04',
    title: 'Assist',
    description: 'Empower agents with AI superpowers',
    icon: Sparkles,
    details: [
      'Real-time response drafting from knowledge base',
      'Sentiment analysis and tone recommendations',
      'Instant translation for 30+ languages',
      'Context surfacing from CRM, order history, and past tickets',
    ],
    color: 'from-amber-500 to-orange-500',
    bgGradient: 'from-amber-500/10 via-orange-500/5 to-transparent',
  },
  {
    number: '05',
    title: 'Measure',
    description: 'Track ROI and continuously optimize',
    icon: BarChart3,
    details: [
      'Real-time automation rate tracking',
      'Cost savings calculator (deflection × avg handle cost)',
      'Quality scoring for AI and human responses',
      'Executive dashboards with drill-down analytics',
    ],
    color: 'from-cyan-500 to-teal-500',
    bgGradient: 'from-cyan-500/10 via-teal-500/5 to-transparent',
  },
];

const InteractiveHowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const active = steps[activeStep];
  const ActiveIcon = active.icon;

  return (
    <section className="relative py-24 md:py-28 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/8 to-background" />
        <div className={`absolute inset-0 bg-gradient-to-br ${active.bgGradient} transition-all duration-700 opacity-60`} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.04),transparent_70%)]" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
              Five layers, one platform
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              From first contact to final insight
            </p>
          </div>

          {/* Main Layout */}
          <div className="grid lg:grid-cols-5 gap-6 mb-12">
            {/* Step Pills */}
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;

              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(index)}
                  className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? 'border-primary/40 bg-card shadow-xl scale-105'
                      : 'border-border/40 bg-card/60 hover:border-primary/30 hover:shadow-lg hover:scale-102'
                  }`}
                >
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 transition-opacity duration-300 ${isActive ? 'opacity-10' : 'group-hover:opacity-5'}`} />

                  <div className="relative p-6 space-y-4">
                    {/* Icon */}
                    <div className={`flex h-14 w-14 mx-auto items-center justify-center rounded-xl transition-all duration-300 ${
                      isActive
                        ? `bg-gradient-to-br ${step.color} shadow-lg`
                        : 'bg-primary/10 group-hover:bg-primary/15'
                    }`}>
                      <Icon className={`h-7 w-7 ${isActive ? 'text-background' : 'text-primary'}`} />
                    </div>

                    {/* Number */}
                    <div className={`text-xs font-bold tracking-wider ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                      {step.number}
                    </div>

                    {/* Title */}
                    <h3 className={`text-lg font-bold transition-colors ${isActive ? 'text-foreground' : 'text-foreground/70'}`}>
                      {step.title}
                    </h3>
                  </div>

                  {/* Active Indicator */}
                  {isActive && (
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color}`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Step Details Card */}
          <div className="relative">
            {/* Decorative Elements */}
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 blur-3xl" />

            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card to-card/80 shadow-2xl">
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${active.bgGradient}`} />

              {/* Grid Pattern Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

              <div className="relative p-12 lg:p-16">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Left: Details */}
                  <div className="space-y-8">
                    {/* Icon & Title */}
                    <div className="space-y-4">
                      <div className={`inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${active.color} shadow-xl`}>
                        <ActiveIcon className="h-10 w-10 text-background" />
                      </div>
                      <div>
                        <div className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
                          Step {active.number}
                        </div>
                        <h3 className="text-4xl lg:text-5xl font-bold text-foreground mb-3">
                          {active.title}
                        </h3>
                        <p className="text-xl text-muted-foreground">
                          {active.description}
                        </p>
                      </div>
                    </div>

                    {/* Details List */}
                    <div className="space-y-4">
                      {active.details.map((detail, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 group"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/10 mt-0.5">
                            <ArrowRight className="h-3.5 w-3.5 text-primary" />
                          </div>
                          <p className="text-base text-foreground/90 leading-relaxed">
                            {detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Visual Element */}
                  <div className="relative">
                    {/* Large Number Watermark */}
                    <div className="relative">
                      <div className={`absolute inset-0 flex items-center justify-center opacity-10`}>
                        <div className={`text-[280px] font-black bg-gradient-to-br ${active.color} bg-clip-text text-transparent leading-none`}>
                          {activeStep + 1}
                        </div>
                      </div>

                      {/* Floating Stats */}
                      <div className="relative space-y-6 py-12">
                        <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/90 p-6 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                          <div className={`absolute inset-0 bg-gradient-to-br ${active.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                          <div className="relative space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="text-sm font-bold text-muted-foreground">Performance</div>
                              <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${active.color}`} />
                            </div>
                            <div className={`text-4xl font-black bg-gradient-to-r ${active.color} bg-clip-text text-transparent`}>
                              {activeStep === 0 && '<100ms'}
                              {activeStep === 1 && '95%'}
                              {activeStep === 2 && '80%'}
                              {activeStep === 3 && '2.5x'}
                              {activeStep === 4 && '60-75%'}
                            </div>
                            <div className="text-sm text-foreground/80">
                              {activeStep === 0 && 'Message ingestion latency'}
                              {activeStep === 1 && 'Routing accuracy'}
                              {activeStep === 2 && 'Tickets automated'}
                              {activeStep === 3 && 'Agent productivity boost'}
                              {activeStep === 4 && 'Cost reduction'}
                            </div>
                          </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/90 p-6 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                          <div className={`absolute inset-0 bg-gradient-to-br ${active.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                          <div className="relative space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="text-sm font-bold text-muted-foreground">Impact</div>
                              <Sparkles className="h-4 w-4 text-primary" />
                            </div>
                            <div className="text-lg font-bold text-foreground">
                              {activeStep === 0 && 'Every channel, one workspace'}
                              {activeStep === 1 && 'Right ticket, right agent, right time'}
                              {activeStep === 2 && 'From 1,000 to 100 tickets overnight'}
                              {activeStep === 3 && 'Draft responses in seconds, not minutes'}
                              {activeStep === 4 && 'ROI visible in weeks, not quarters'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex items-center justify-center gap-3 mt-12">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeStep === index
                    ? 'w-12 bg-primary'
                    : 'w-2 bg-border hover:bg-primary/40'
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveHowItWorks;
