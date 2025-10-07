'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, LayoutDashboard, Link as LinkIcon, Shield, CheckCircle2, ArrowRight } from "lucide-react";

const orchestrationSteps = [
  {
    value: "capture",
    step: "01",
    label: "Capture every signal",
    headline: "Centralise conversations and signals",
    copy: "Pullse ingests email, chat, voice, and system events so no intent slips by.",
    bullets: ["Native channel connectors", "Webhook & API ingestion", "Auto-tagging with AI"],
    stat: { label: "Target confidence", value: "95%" },
    icon: LinkIcon,
  },
  {
    value: "automate",
    step: "02",
    label: "Automate with guardrails",
    headline: "Workflow automation with human oversight",
    copy: "Design workflows that mix bots, approvals, and system actions with full audit trails.",
    bullets: ["Visual builder with approvals", "Shared credentials vault", "Policy-aware automations"],
    stat: { label: "Coverage goal", value: "60%" },
    icon: Shield,
  },
  {
    value: "assist",
    step: "03",
    label: "Assist every teammate",
    headline: "Give agents copilots that stay on-policy",
    copy: "Copilots draft replies, summaries, and translations that stay on-brand.",
    bullets: ["Context-aware drafting", "Reusable snippets", "One-click takeover"],
    stat: { label: "Productivity lift", value: "2×" },
    icon: Bot,
  },
  {
    value: "measure",
    step: "04",
    label: "Measure & improve",
    headline: "Show the impact to finance and leadership",
    copy: "Dashboards track coverage, savings, and sentiment so you know what to scale next.",
    bullets: ["Automation coverage targets", "CSAT & handle-time trends", "Executive-ready dashboards"],
    stat: { label: "Visibility", value: "Real-time" },
    icon: LayoutDashboard,
  },
];

const WhyFullStackSection = () => (
  <section className="relative overflow-hidden py-20">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.12),transparent_50%)] opacity-70" />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

    <div className="container relative z-10 mx-auto px-4">
      <div className="mx-auto mb-16 max-w-3xl text-center space-y-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-xs font-bold uppercase tracking-wider text-primary shadow-lg shadow-primary/10 backdrop-blur">
          <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          Operate end-to-end
        </div>
        <h2 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
          One platform to capture, automate, assist, and measure
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Every step of the support loop lives inside Pullse—no extra tools or stitched workflows required.
        </p>
      </div>

      <Tabs defaultValue="capture" className="mx-auto w-full max-w-6xl">
        <div className="grid gap-8 items-start lg:grid-cols-[320px,1fr]">
          <TabsList className="flex flex-col gap-2 rounded-3xl border border-border/70 bg-background/90 p-5 shadow-2xl backdrop-blur-xl">
            {orchestrationSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <TabsTrigger
                  key={step.value}
                  value={step.value}
                  className="group relative flex items-center justify-between rounded-2xl border border-transparent px-5 py-4 text-left text-sm font-semibold transition-all duration-300 hover:bg-primary/5 data-[state=active]:border-primary/50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/15 data-[state=active]:to-primary/5 data-[state=active]:text-primary data-[state=active]:shadow-lg data-[state=active]:shadow-primary/10"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary transition-all duration-300 group-data-[state=active]:bg-primary group-data-[state=active]:text-primary-foreground group-data-[state=active]:shadow-md">
                      {step.step}
                    </span>
                    <span className="flex items-center gap-2">
                      <Icon className="h-4 w-4 opacity-60 group-data-[state=active]:opacity-100" />
                      {step.label}
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:opacity-60 group-data-[state=active]:opacity-100" />
                </TabsTrigger>
              );
            })}
          </TabsList>

          {orchestrationSteps.map((step) => {
            const Icon = step.icon;
            return (
              <TabsContent
                key={step.value}
                value={step.value}
                className="rounded-3xl border border-border/70 bg-gradient-to-br from-background/95 to-background/80 p-10 shadow-2xl backdrop-blur-xl transition-all duration-500 animate-in fade-in-50 slide-in-from-bottom-4"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-lg shadow-primary/20">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                      {step.label}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-3xl font-bold text-foreground leading-tight">{step.headline}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">{step.copy}</p>
                  </div>

                  <ul className="grid gap-3 text-sm sm:grid-cols-2">
                    {step.bullets.map((item, index) => (
                      <li
                        key={item}
                        className="group flex items-start gap-3 rounded-2xl border border-border/60 bg-background/80 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                        <span className="text-foreground/90 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-2 pt-2">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-gradient-to-r from-primary/15 to-primary/5 px-5 py-2 text-sm font-bold text-primary shadow-lg shadow-primary/10">
                      <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                      {step.stat.label}: {step.stat.value}
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </div>
      </Tabs>

      <div className="mt-16 grid gap-6 rounded-3xl border border-border/70 bg-gradient-to-br from-background/95 to-background/80 p-8 shadow-2xl backdrop-blur-xl md:grid-cols-3">
        <div className="group flex flex-col gap-4 rounded-2xl border border-transparent p-5 transition-all duration-300 hover:border-primary/30 hover:bg-primary/5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20">
            <LinkIcon className="h-6 w-6" />
          </div>
          <p className="text-sm font-medium text-foreground leading-relaxed">
            Channel, CRM, billing, and custom systems sync in real time.
          </p>
        </div>
        <div className="group flex flex-col gap-4 rounded-2xl border border-transparent p-5 transition-all duration-300 hover:border-primary/30 hover:bg-primary/5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20">
            <Bot className="h-6 w-6" />
          </div>
          <p className="text-sm font-medium text-foreground leading-relaxed">
            AI copilots stay on-policy with approvals and manual takeover.
          </p>
        </div>
        <div className="group flex flex-col gap-4 rounded-2xl border border-transparent p-5 transition-all duration-300 hover:border-primary/30 hover:bg-primary/5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20">
            <LayoutDashboard className="h-6 w-6" />
          </div>
          <p className="text-sm font-medium text-foreground leading-relaxed">
            Shared dashboards highlight coverage, savings, and sentiment.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default WhyFullStackSection;
