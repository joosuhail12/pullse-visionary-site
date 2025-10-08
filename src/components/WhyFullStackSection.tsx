import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Bot, CheckCircle2, LayoutDashboard, Link as LinkIcon, Shield } from "lucide-react";

const orchestrationSteps = [
  {
    value: "capture",
    step: "01",
    label: "Capture",
    headline: "Never miss a customer signal",
    copy: "Pullse unifies every conversation and event into one intelligent stream—email, chat, voice, webhooks, and system events all flow through a single source of truth.",
    bullets: [
      "Connect any channel in minutes",
      "AI auto-tags and routes intelligently",
      "Webhook & API ingestion at scale"
    ],
    stat: { label: "Accuracy", value: "95%" },
    icon: LinkIcon,
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    value: "automate",
    step: "02",
    label: "Automate",
    headline: "Safe, auditable automation at scale",
    copy: "Build workflows that blend AI, human approvals, and system actions. Every automation includes guardrails, audit trails, and policy enforcement by default.",
    bullets: [
      "Visual workflow builder with approval gates",
      "Secure credentials vault for integrations",
      "Policy-aware bots that know the rules"
    ],
    stat: { label: "Coverage", value: "60%" },
    icon: Shield,
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    value: "assist",
    step: "03",
    label: "Assist",
    headline: "AI copilots that amplify your team",
    copy: "Give every agent an AI assistant that drafts replies, suggests responses, and stays on-brand. Humans stay in control with one-click takeover and full context at their fingertips.",
    bullets: [
      "Context-aware response drafting",
      "Reusable snippet library",
      "Seamless human-AI handoff"
    ],
    stat: { label: "Speed boost", value: "2.4×" },
    icon: Bot,
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    value: "measure",
    step: "04",
    label: "Measure",
    headline: "Prove the ROI to leadership",
    copy: "Track automation coverage, cost savings, CSAT trends, and handle times in real-time dashboards. Show exactly where AI is working—and where humans add the most value.",
    bullets: [
      "Real-time automation analytics",
      "CSAT and handle-time tracking",
      "Executive-ready impact reports"
    ],
    stat: { label: "Visibility", value: "Live" },
    icon: LayoutDashboard,
    color: "from-orange-500/20 to-amber-500/20",
  },
];

const WhyFullStackSection = () => (
  <section className="relative overflow-hidden bg-gradient-to-b from-muted/5 via-background to-muted/10 py-24 md:py-32">
    {/* Enhanced background effects */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_50%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--primary)/0.08),transparent_50%)]" />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

    <div className="container relative z-10 mx-auto px-4">
      {/* Enhanced header */}
      <div className="mx-auto mb-20 max-w-4xl space-y-8 text-center">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/30 bg-gradient-to-r from-primary/10 to-primary/5 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.25em] text-primary shadow-lg shadow-primary/10 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
          </span>
          Full-Stack Platform
        </div>
        <h2 className="text-balance text-5xl font-bold leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl">
          Capture. Automate. Assist. Measure.
        </h2>
        <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground">
          Stop stitching tools together. <span className="font-semibold text-foreground">Pullse is the only platform that handles the entire support lifecycle</span>—from first signal to final insight.
        </p>
      </div>

      <Tabs defaultValue="capture" className="mx-auto w-full max-w-7xl">
        <div className="grid items-start gap-10 lg:grid-cols-[360px,1fr]">
          {/* Enhanced tabs list */}
          <TabsList className="!h-auto !inline-block w-full rounded-[28px] border border-border/40 bg-gradient-to-b from-card/95 to-card/80 p-5 shadow-2xl backdrop-blur-xl sticky top-24 lg:top-28 space-y-2.5">
            <div className="mb-4 pb-4 border-b border-border/40">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                The Full Stack
              </h3>
            </div>
            {orchestrationSteps.map((step, stepIndex) => {
              const Icon = step.icon;
              return (
                <div key={step.value} className="relative">
                  <TabsTrigger
                    value={step.value}
                    className="group relative flex w-full items-center gap-4 rounded-[20px] border border-transparent bg-transparent px-5 py-4 text-left transition-all duration-300 hover:border-border/60 hover:bg-muted/40 data-[state=active]:border-primary/40 data-[state=active]:bg-gradient-to-r data-[state=active]:shadow-lg data-[state=active]:shadow-primary/10"
                  >
                    {/* Step number with gradient */}
                    <div className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border border-border/50 bg-gradient-to-br ${step.color} text-xs font-bold text-foreground transition-all duration-300 group-data-[state=active]:border-primary/50 group-data-[state=active]:shadow-lg group-data-[state=active]:shadow-primary/20 group-data-[state=active]:scale-105`}>
                      <span className="relative z-10">{step.step}</span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-base font-bold text-foreground transition-colors group-data-[state=active]:text-primary">
                          {step.label}
                        </span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-muted-foreground group-data-[state=active]:translate-x-1.5 group-data-[state=active]:text-primary" />
                      </div>

                      <div className="flex items-center gap-2 text-xs font-medium">
                        <Icon className="h-3.5 w-3.5 text-muted-foreground/50 transition-all duration-300 group-data-[state=active]:text-primary" />
                        <span className="text-muted-foreground/60 transition-colors group-data-[state=active]:text-primary/70">
                          {step.stat.value}
                        </span>
                      </div>
                    </div>

                    {/* Active indicator bar */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-1 rounded-r-full bg-gradient-to-b from-primary to-primary/50 opacity-0 transition-all duration-300 group-data-[state=active]:opacity-100" />
                  </TabsTrigger>

                  {/* Connector line between steps */}
                  {stepIndex < orchestrationSteps.length - 1 && (
                    <div className="absolute left-[42px] top-[calc(100%)] h-2.5 w-[2px] bg-gradient-to-b from-border/40 to-transparent" />
                  )}
                </div>
              );
            })}
          </TabsList>

          {/* Enhanced tab content */}
          {orchestrationSteps.map((step) => {
            const Icon = step.icon;
            return (
              <TabsContent
                key={step.value}
                value={step.value}
                className="relative overflow-hidden rounded-[28px] border border-border/40 bg-gradient-to-br from-card via-card to-card/80 p-12 shadow-2xl backdrop-blur-sm transition-all duration-500 data-[state=active]:animate-in data-[state=active]:fade-in-50 data-[state=active]:slide-in-from-right-8"
              >
                {/* Decorative gradient orb matching step color */}
                <div className={`absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br ${step.color} opacity-30 blur-3xl`} />

                {/* Header */}
                <div className="relative mb-10 flex flex-wrap items-center gap-5 border-b border-border/30 pb-8">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-[20px] border border-primary/30 bg-gradient-to-br ${step.color} shadow-xl backdrop-blur-sm`}>
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary/70">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10 text-[10px]">
                        {step.step}
                      </span>
                      {step.label}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {step.stat.label}: <span className="font-bold text-foreground">{step.stat.value}</span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <h3 className="mb-6 text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
                    {step.headline}
                  </h3>
                  <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
                    {step.copy}
                  </p>

                  {/* Enhanced feature bullets */}
                  <ul className="mt-10 grid gap-4 sm:grid-cols-2">
                    {step.bullets.map((item) => (
                      <li
                        key={item}
                        className="group flex items-start gap-4 rounded-[20px] border border-border/40 bg-gradient-to-br from-background/60 to-background/30 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:from-primary/5 hover:to-primary/[0.02] hover:shadow-lg hover:shadow-primary/5"
                      >
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:shadow-primary/20">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                        </div>
                        <span className="pt-0.5 text-base font-semibold leading-relaxed text-foreground">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            );
          })}
        </div>
      </Tabs>

      {/* Enhanced bottom section */}
      <div className="relative mt-32">
        {/* Decorative divider */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center gap-4 rounded-full border border-border/40 bg-gradient-to-r from-card/80 via-card to-card/80 px-8 py-3 shadow-xl backdrop-blur-xl">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-border" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-foreground">
              Why It Matters
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-border" />
          </div>
        </div>

        <div className="grid gap-8 pt-16 md:grid-cols-3">
          {[
            {
              icon: LinkIcon,
              text: "Connect every channel, CRM, billing system, and custom tool. Real-time sync means no manual copying, no data drift, no dropped signals.",
              label: "Unified Integration",
              gradient: "from-blue-500/10 to-cyan-500/10"
            },
            {
              icon: Bot,
              text: "AI that works for you, not against your policies. Every automation includes approval gates, audit logs, and human oversight.",
              label: "AI with Guardrails",
              gradient: "from-purple-500/10 to-pink-500/10"
            },
            {
              icon: LayoutDashboard,
              text: "See exactly where AI saves time, where humans add value, and what leadership needs to scale confidently.",
              label: "ROI Transparency",
              gradient: "from-orange-500/10 to-amber-500/10"
            },
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-[24px] border border-border/40 bg-gradient-to-br from-card to-card/80 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2"
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

                <div className="relative">
                  <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-[18px] border border-primary/30 bg-gradient-to-br ${feature.gradient} shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-primary/20`}>
                    <Icon className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <h4 className="mb-3 text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                    {feature.label}
                  </h4>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {feature.text}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default WhyFullStackSection;
