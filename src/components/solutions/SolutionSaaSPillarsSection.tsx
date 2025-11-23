'use client';

import { Bot, Sparkles, Shield, CheckCircle2, ChevronRight } from "lucide-react";

export default function SolutionSaaSPillarsSection() {
  const pillars = [
    {
      icon: Bot,
      title: 'AI Chatbots',
      subtitle: 'Autonomous Execution',
      description: 'AI agents that don\'t just answer questions—they take action. Execute refunds, create tickets, update accounts, and send notifications autonomously across your tech stack.',
      stat: 'Unlimited',
      statLabel: 'actions per day',
      color: 'from-blue-500 to-cyan-500',
      features: [
        'Execute Stripe refunds automatically',
        'Create Jira tickets with full context',
        'Update account settings across systems',
        'Send Slack alerts to right teams'
      ]
    },
    {
      icon: Sparkles,
      title: 'AI Copilots',
      subtitle: 'Suggested Actions',
      description: 'AI that suggests the right action and executes when agents ask. Agents see exactly what to do next—refund, escalate, update—with full context and zero switching.',
      stat: '8s',
      statLabel: 'average execution time',
      color: 'from-purple-500 to-pink-500',
      features: [
        'AI suggests next best action',
        'Conversational execution across all tools',
        'Instant context from Stripe, Salesforce',
        'Pre-filled actions ready to execute'
      ]
    },
    {
      icon: Shield,
      title: 'Auto-QA',
      subtitle: 'Execution Quality',
      description: 'Ensure every action meets compliance standards. Track who executed what, when, and why. Audit trails for refunds, tickets, updates—100% coverage across all systems.',
      stat: '100%',
      statLabel: 'execution tracking',
      color: 'from-green-500 to-emerald-500',
      features: [
        'Full audit trail of all actions',
        'Compliance checks before execution',
        'Error detection and alerts',
        'Performance tracking per agent'
      ]
    }
  ];

  return (
    <section className="relative py-16 md:py-20 lg:py-24 xl:py-32">
      <div className="container relative mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16 lg:mb-20 space-y-4 md:space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
              Three ways to execute actions
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Autonomous execution, agent-assisted actions, and quality assurance—all working together
            </p>
          </div>

          {/* Pillar Cards */}
          <div className="grid lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8 mb-8 md:mb-10 lg:mb-12">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div key={index} className="group relative overflow-hidden rounded-2xl md:rounded-3xl border border-border/60 bg-card transition-all hover:border-primary/40 hover:shadow-2xl hover:-translate-y-2">
                  <div className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-0 transition-opacity group-hover:opacity-5`} />

                  <div className="relative p-5 md:p-6 lg:p-8 space-y-4 md:space-y-5 lg:space-y-6">
                    {/* Icon & Badge */}
                    <div className="flex items-start justify-between">
                      <div className={`inline-flex h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 items-center justify-center rounded-xl md:rounded-2xl bg-gradient-to-br ${pillar.color} shadow-lg transition-all group-hover:scale-110`}>
                        <Icon className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-background" />
                      </div>
                      <div className="px-2.5 py-0.5 md:px-3 md:py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] md:text-xs font-bold uppercase">
                        {pillar.subtitle}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-2 md:space-y-3">
                      <h3 className="text-xl md:text-2xl font-bold text-foreground">{pillar.title}</h3>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{pillar.description}</p>
                    </div>

                    {/* Stat */}
                    <div className="p-4 md:p-5 lg:p-6 rounded-lg md:rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
                      <div className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${pillar.color} bg-clip-text text-transparent mb-1.5 md:mb-2`}>
                        {pillar.stat}
                      </div>
                      <div className="text-xs md:text-sm text-foreground/80">{pillar.statLabel}</div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2 md:space-y-3 pt-3 md:pt-4 border-t border-border/40">
                      {pillar.features.map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-start gap-2 md:gap-3">
                          <CheckCircle2 className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary mt-0.5 shrink-0" />
                          <p className="text-xs md:text-sm text-foreground/80 leading-relaxed">{feature}</p>
                        </div>
                      ))}
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
}
