import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, LayoutDashboard, Link as LinkIcon, Shield } from "lucide-react";

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
  <section className="relative overflow-hidden bg-muted/10 py-20">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.1),transparent_60%)] opacity-70" />

    <div className="container relative z-10 mx-auto px-4">
      <div className="mx-auto mb-12 max-w-3xl text-center space-y-4">
        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
          Operate end-to-end
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">One platform to capture, automate, assist, and measure</h2>
        <p className="text-lg text-muted-foreground">
          Every step of the support loop lives inside Pullse—no extra tools or stitched workflows required.
        </p>
      </div>

      <Tabs defaultValue="capture" className="mx-auto w-full max-w-6xl">
        <div className="grid gap-8 items-start lg:grid-cols-[280px,1fr]">
          <TabsList className="flex flex-col gap-3 rounded-3xl border border-border/60 bg-background/80 p-4 shadow-lg backdrop-blur">
            {orchestrationSteps.map((step) => (
              <TabsTrigger
                key={step.value}
                value={step.value}
                className="flex items-center justify-between rounded-2xl border border-transparent px-4 py-3 text-left text-sm font-medium data-[state=active]:border-primary/40 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                <span className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-muted-foreground">{step.step}</span>
                  {step.label}
                </span>
                <span className="text-xs text-muted-foreground">→</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {orchestrationSteps.map((step) => {
            const Icon = step.icon;
            return (
              <TabsContent
                key={step.value}
                value={step.value}
                className="rounded-3xl border border-border/70 bg-background/80 p-8 shadow-xl backdrop-blur transition"
              >
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary/80">
                  <Icon className="h-4 w-4" />
                  {step.label}
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-foreground">{step.headline}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{step.copy}</p>
                <ul className="mt-6 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                  {step.bullets.map((item) => (
                    <li key={item} className="flex items-start gap-2 rounded-2xl border border-border/60 bg-background/75 p-3">
                      <Shield className="mt-1 h-4 w-4 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {step.stat.label}: {step.stat.value}
                </div>
              </TabsContent>
            );
          })}
        </div>
      </Tabs>

      <div className="mt-12 grid gap-4 rounded-3xl border border-border/70 bg-background/80 p-6 text-sm text-muted-foreground shadow-lg backdrop-blur md:grid-cols-3">
        <div className="flex items-start gap-3">
          <LinkIcon className="mt-1 h-5 w-5 text-primary" /> Channel, CRM, billing, and custom systems sync in real time.
        </div>
        <div className="flex items-start gap-3">
          <Bot className="mt-1 h-5 w-5 text-primary" /> AI copilots stay on-policy with approvals and manual takeover.
        </div>
        <div className="flex items-start gap-3">
          <LayoutDashboard className="mt-1 h-5 w-5 text-primary" /> Shared dashboards highlight coverage, savings, and sentiment.
        </div>
      </div>
    </div>
  </section>
);

export default WhyFullStackSection;
