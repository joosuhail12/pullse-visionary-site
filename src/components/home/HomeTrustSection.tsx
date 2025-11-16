'use client';

import {
  CheckCircle2,
  Shield,
  Users,
  BarChart3,
  MessageSquare,
  Sparkles,
} from "lucide-react";

const problemPoints = [
  {
    title: "Channels live in silos",
    description: "Email, chat, and voice tools don't share context, leaving agents to copy-paste between tabs.",
    icon: MessageSquare,
  },
  {
    title: "AI experiments lack guardrails",
    description: "Standalone bots can't talk to your systems or enforce approvals, so teams stall after pilot.",
    icon: Shield,
  },
  {
    title: "Leaders can't show ROI",
    description: "Without shared workflows and metrics, it's hard to prove the value of automation to finance.",
    icon: BarChart3,
  },
];

const HomeTrustSection = () => {
  return (
    <section className="relative bg-background py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/2 to-background" />

      <div className="container relative mx-auto px-4">
        <div className="grid gap-10 sm:gap-12 md:gap-14 lg:gap-16 lg:grid-cols-[1.3fr,1fr] items-start">
          {/* Left: Trust & Backing */}
          <div className="space-y-6 sm:space-y-8">
            {/* Punchier headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
              One platform. Zero silos. Total control.
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Stop stitching together disconnected tools. Pullse unifies channels, workflows, AI agents, and analytics—with security and compliance built in from day one.
            </p>

            {/* Enhanced trust signals with icons */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-gradient-to-r from-background to-muted/20 p-3 sm:p-4 transition-all hover:border-primary/30 hover:shadow-md">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">SOC 2 Type II</div>
                  <div className="text-xs text-muted-foreground">In progress</div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-gradient-to-r from-background to-muted/20 p-3 sm:p-4 transition-all hover:border-primary/30 hover:shadow-md">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">Founder-Led Support</div>
                  <div className="text-xs text-muted-foreground">Direct access</div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-gradient-to-r from-background to-muted/20 p-3 sm:p-4 transition-all hover:border-primary/30 hover:shadow-md">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">AI Guardrails</div>
                  <div className="text-xs text-muted-foreground">Audit trails included</div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-gradient-to-r from-background to-muted/20 p-3 sm:p-4 transition-all hover:border-primary/30 hover:shadow-md">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">Backed by Antler</div>
                  <div className="text-xs text-muted-foreground">+ Microsoft & Google</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Problem points with gradient accents */}
          <div className="space-y-4">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Why Teams Switch to Pullse
              </h3>
            </div>
            {problemPoints.map((point, index) => {
              const gradients = [
                'from-blue-500/10 to-cyan-500/10',
                'from-purple-500/10 to-pink-500/10',
                'from-orange-500/10 to-amber-500/10'
              ];
              return (
                <div
                  key={point.title}
                  className="group relative overflow-hidden rounded-[20px] border border-border/60 bg-card p-5 sm:p-6 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md md:hover:-translate-y-1 md:hover:shadow-lg"
                >
                  {/* Gradient background on hover - only on desktop */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index]} opacity-0 transition-opacity duration-300 md:group-hover:opacity-100`} />

                  <div className="relative">
                    <div className="flex items-start gap-3 sm:gap-4 mb-3">
                      <div className={`flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradients[index]} border border-primary/20 transition-all duration-300 md:group-hover:scale-110 md:group-hover:shadow-lg`}>
                        <point.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base font-bold text-foreground mb-2 leading-tight md:group-hover:text-primary transition-colors">
                          {point.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom accent line - only on desktop hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 md:group-hover:opacity-100" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeTrustSection;
