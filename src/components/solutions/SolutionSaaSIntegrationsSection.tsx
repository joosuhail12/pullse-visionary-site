'use client';

import { CreditCard, Code, Zap, Users, BarChart3, GitBranch, Target, Rocket, Bell, FileText, Sparkle, CheckCircle2 } from "lucide-react";

export default function SolutionSaaSIntegrationsSection() {
  const integrations = [
    { icon: CreditCard, name: 'Stripe', description: 'Process refunds, extend trials, update subscriptions', benefit: 'Execute billing actions instantly', gradient: 'from-blue-500/10 to-cyan-500/10' },
    { icon: Code, name: 'Jira', description: 'Create tickets, update status, assign engineers', benefit: 'File bugs with full context', gradient: 'from-indigo-500/10 to-blue-500/10' },
    { icon: Zap, name: 'Slack', description: 'Send alerts, notify teams, escalate issues', benefit: 'Alert right people instantly', gradient: 'from-purple-500/10 to-pink-500/10' },
    { icon: Users, name: 'Salesforce', description: 'Create opportunities, update leads, log activities', benefit: 'Handoff to sales seamlessly', gradient: 'from-cyan-500/10 to-teal-500/10' },
    { icon: BarChart3, name: 'Segment', description: 'Track events, trigger workflows, update attributes', benefit: 'Load customer context', gradient: 'from-green-500/10 to-emerald-500/10' },
    { icon: GitBranch, name: 'GitHub', description: 'Create issues, update PRs, link commits', benefit: 'Connect bugs to code instantly', gradient: 'from-slate-500/10 to-gray-500/10' },
  ];

  return (
    <section className="relative py-16 md:py-20 lg:py-24 xl:py-32 bg-gradient-to-b from-muted/10 via-muted/5 to-transparent">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
              AI executes across your entire stack
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Agents ask, Pullse executes. Our AI copilot figures out how to take action across all your connected tools—instantly.
            </p>
          </div>

          {/* Integrations Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((integration, index) => {
              const Icon = integration.icon;
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-2xl hover:-translate-y-2"
                >
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${integration.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  <div className="relative space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shrink-0 group-hover:shadow-lg">
                        <Icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase group-hover:bg-primary group-hover:text-background transition-all duration-300">
                        Live
                      </div>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">{integration.name}</h3>
                      <p className="text-xs text-muted-foreground mb-3">{integration.description}</p>
                      <div className="flex items-center gap-2 text-xs font-semibold text-primary group-hover:scale-105 transition-transform duration-300 origin-left">
                        <CheckCircle2 className="h-3.5 w-3.5 group-hover:scale-110 transition-transform duration-300" />
                        <span>{integration.benefit}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              );
            })}
          </div>

          {/* Extensibility Indicator */}
          <div className="text-center mt-10">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-primary/20 bg-primary/5">
              <GitBranch className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-foreground">
                50+ native integrations
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                Connect any tool via API or webhooks
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
