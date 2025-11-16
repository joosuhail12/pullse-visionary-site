'use client';

import { MessageSquare, Users, ShieldCheck } from 'lucide-react';

const SolutionFintechPillarsSection = () => {
  return (
    <section className="relative py-16 md:py-20 lg:py-24 xl:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08),transparent_60%)]" />

      <div className="container relative mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
              Three ways to put AI to work
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Built for fintech teams who can't compromise on security or speed
            </p>
          </div>

          {/* Pillars Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Pillar 1: AI Chatbots */}
            <div className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card p-8 transition-all hover:border-primary/40 hover:shadow-2xl hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative space-y-6">
                {/* Icon & Badge */}
                <div className="flex items-start justify-between">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                    <MessageSquare className="h-8 w-8 text-background" />
                  </div>
                  <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-bold uppercase">
                    Orchestrate Risk Workflows
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-foreground">AI Chatbots</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    24/7 automated support that orchestrates responses to fraud alerts, payment failures, and KYC requirements across your risk tools. Escalates high-risk cases instantly.
                  </p>
                </div>

                {/* Stat */}
                <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20">
                  <div className="text-5xl font-black bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent mb-2">
                    &lt; 8s
                  </div>
                  <div className="text-sm text-foreground/80">risk response time</div>
                </div>
              </div>
            </div>

            {/* Pillar 2: AI Copilots */}
            <div className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card p-8 transition-all hover:border-primary/40 hover:shadow-2xl hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative space-y-6">
                {/* Icon & Badge */}
                <div className="flex items-start justify-between">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                    <Users className="h-8 w-8 text-background" />
                  </div>
                  <div className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 text-xs font-bold uppercase">
                    Instant KYC
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-foreground">AI Copilots</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    Real-time assistance that surfaces Stripe/Plaid data in-ticket. Suggests compliant next actions with full audit logging.
                  </p>
                </div>

                {/* Stat */}
                <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20">
                  <div className="text-5xl font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                    92%
                  </div>
                  <div className="text-sm text-foreground/80">payment recovery rate</div>
                </div>
              </div>
            </div>

            {/* Pillar 3: Auto-QA */}
            <div className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card p-8 transition-all hover:border-primary/40 hover:shadow-2xl hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative space-y-6">
                {/* Icon & Badge */}
                <div className="flex items-start justify-between">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg">
                    <ShieldCheck className="h-8 w-8 text-background" />
                  </div>
                  <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 text-xs font-bold uppercase">
                    Audit Ready
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-foreground">Auto-QA</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    Continuous quality monitoring that checks for PII exposure, verifies compliance, and generates audit reports automatically.
                  </p>
                </div>

                {/* Stat */}
                <div className="p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20">
                  <div className="text-5xl font-black bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent mb-2">
                    100%
                  </div>
                  <div className="text-sm text-foreground/80">audit compliance</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionFintechPillarsSection;
