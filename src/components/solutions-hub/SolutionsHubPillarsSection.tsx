'use client';

import { Bot, Brain, ClipboardCheck, CheckCircle2, TrendingUp } from "lucide-react";

const SolutionsHubPillarsSection = () => {
  const pillars = [
    {
      icon: Bot,
      title: "AI Chatbots",
      subtitle: "Autonomous Execution",
      description: "Stop making customers wait for simple tasks. AI agents that execute refunds, create tickets, update accounts, and handle complex workflows automatically—resolving 70% of tickets without human intervention.",
      stat: "70%",
      statLabel: "tickets resolved automatically",
      roiText: "Save $3,500+ per agent monthly on routine tasks",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      textColor: "text-blue-600",
      features: [
        "Process refunds and account updates in seconds with automatic integrations",
        "Create detailed tickets and alerts across all your tools",
      ],
    },
    {
      icon: Brain,
      title: "AI Copilots",
      subtitle: "Real-Time Intelligence",
      description: "Turn every agent into your best agent. AI that suggests perfect responses, surfaces knowledge instantly, and automates repetitive work—making agents 3x faster while improving quality.",
      stat: "3x",
      statLabel: "faster resolution time",
      roiText: "Handle 3x more tickets with same team size",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      textColor: "text-purple-600",
      features: [
        "Get instant answers with context from Zendesk, Stripe, and Salesforce",
        "Auto-generate responses with links and order details in one click",
      ],
    },
    {
      icon: ClipboardCheck,
      title: "Auto-QA",
      subtitle: "Quality at Scale",
      description: "Maintain perfect quality without the manual work. Monitor 100% of conversations, catch compliance issues instantly, and coach agents with specific feedback—eliminating the need for QA managers to review manually.",
      stat: "100%",
      statLabel: "conversation coverage",
      roiText: "Replace 40 hours weekly of manual QA review",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      textColor: "text-green-600",
      features: [
        "Catch issues before customers do with real-time quality monitoring",
        "Get actionable coaching insights from every customer interaction",
      ],
    },
  ];

  return (
    <section className="relative py-12 md:py-14 lg:py-16 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08),transparent_60%)]" />

      <div className="container relative mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 md:mb-7 lg:mb-8 space-y-3 md:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground max-w-4xl mx-auto leading-tight">
              From overwhelmed agents to automated excellence
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Three AI tools working together to eliminate busywork, accelerate resolutions, and maintain quality at scale
            </p>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 pt-1 md:pt-2">
              <div className="px-2.5 py-1 md:px-3 md:py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <span className="text-xs md:text-sm font-semibold text-primary">Save 15+ hours per agent weekly</span>
              </div>
              <div className="px-2.5 py-1 md:px-3 md:py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <span className="text-xs md:text-sm font-semibold text-primary">Reduce resolution time by 75%</span>
              </div>
              <div className="px-2.5 py-1 md:px-3 md:py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <span className="text-xs md:text-sm font-semibold text-primary">Zero quality compromise</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-4 md:gap-5">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-2xl md:rounded-3xl border-2 ${pillar.borderColor} bg-card transition-all hover:shadow-2xl hover:-translate-y-2`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-5`} />

                  <div className="relative p-4 md:p-5 lg:p-6 space-y-3 md:space-y-4">
                    {/* Header */}
                    <div className="space-y-2 md:space-y-3">
                      <div className={`inline-flex h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 items-center justify-center rounded-xl md:rounded-2xl bg-gradient-to-br ${pillar.color} shadow-lg`}>
                        <Icon className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-background" />
                      </div>
                      <div>
                        <div className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ${pillar.textColor} mb-1 md:mb-1.5`}>
                          {pillar.subtitle}
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-foreground">{pillar.title}</h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                      {pillar.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-1.5 md:space-y-2">
                      {pillar.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2 md:gap-2.5">
                          <div className={`mt-0.5 h-3.5 w-3.5 md:h-4 md:w-4 rounded-full ${pillar.bgColor} border ${pillar.borderColor} flex items-center justify-center shrink-0`}>
                            <CheckCircle2 className={`h-2 w-2 md:h-2.5 md:w-2.5 ${pillar.textColor}`} />
                          </div>
                          <p className="text-xs md:text-sm text-foreground/80 leading-relaxed">{feature}</p>
                        </div>
                      ))}
                    </div>

                    {/* Stat */}
                    <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-br ${pillar.color} text-background space-y-1.5 md:space-y-2`}>
                      <div>
                        <div className="text-4xl md:text-5xl font-black mb-1.5 md:mb-2">{pillar.stat}</div>
                        <div className="text-xs md:text-sm font-semibold opacity-90">{pillar.statLabel}</div>
                      </div>
                      <div className="pt-2 md:pt-3 border-t border-background/20">
                        <div className="flex items-center gap-1.5 md:gap-2">
                          <TrendingUp className="w-3.5 h-3.5 md:w-4 md:h-4 opacity-90" />
                          <div className="text-[10px] md:text-xs font-medium opacity-90">{pillar.roiText}</div>
                        </div>
                      </div>
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

export default SolutionsHubPillarsSection;
