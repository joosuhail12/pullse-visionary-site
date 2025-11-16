'use client';

import { Truck, RotateCw, TrendingUp } from "lucide-react";

const SolutionEcommercePillarsSection = () => {
  const pillars = [
    {
      icon: Truck,
      title: 'AI Chatbots',
      subtitle: 'Kill WISMO Tickets',
      description: '80% of your tickets are "Where\'s my order?" Let AI handle them. Auto-detect order numbers, pull real-time tracking from Shopify + carriers, send personalized updates.',
      stat: '80%',
      statLabel: 'WISMO auto-resolved',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: RotateCw,
      title: 'AI Copilots',
      subtitle: 'One-Command Returns',
      description: 'Returns take 6 minutes across Shopify → ShipStation → Stripe. Agent types "process return + send label"—AI executes all 4 steps in 2 minutes.',
      stat: '2 min',
      statLabel: 'from request to label sent',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: TrendingUp,
      title: 'Auto-QA',
      subtitle: 'Survive Black Friday',
      description: 'Peak season = 5x volume spike. AI handles the surge, routes complex issues, maintains quality. No temp hires needed.',
      stat: '92%',
      statLabel: 'CSAT during peak season',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <section className="relative py-16 md:py-20 lg:py-24 xl:py-32">
      <div className="container relative mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
              Three ways to handle e-commerce chaos
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              WISMO automation, instant returns, and peak season scalability—all working together
            </p>
          </div>

          {/* Pillar Cards */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div key={index} className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card transition-all hover:border-primary/40 hover:shadow-2xl hover:-translate-y-2">
                  <div className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-0 transition-opacity group-hover:opacity-5`} />

                  <div className="relative p-8 space-y-6">
                    {/* Icon & Badge */}
                    <div className="flex items-start justify-between">
                      <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${pillar.color} shadow-lg transition-all group-hover:scale-110`}>
                        <Icon className="h-8 w-8 text-background" />
                      </div>
                      <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase">
                        {pillar.subtitle}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-foreground">{pillar.title}</h3>
                      <p className="text-base text-muted-foreground leading-relaxed">{pillar.description}</p>
                    </div>

                    {/* Stat */}
                    <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
                      <div className={`text-5xl font-black bg-gradient-to-r ${pillar.color} bg-clip-text text-transparent mb-2`}>
                        {pillar.stat}
                      </div>
                      <div className="text-sm text-foreground/80">{pillar.statLabel}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionEcommercePillarsSection;
