import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import RouteButton from "@/components/RouteButton";
import InteractiveHowItWorks from "@/components/InteractiveHowItWorks";
import Image from "next/image";
import {
  ArrowRight,
  MessageSquare,
  Workflow,
  Bot,
  BarChart3,
  CheckCircle,
  CheckCircle2,
  Database,
  Zap,
  Shield,
  Users,
  Sparkles,
  Lock,
  ShoppingCart,
  Building2,
  Headphones,
  CreditCard,
  Boxes,
  TrendingUp,
} from "lucide-react";
import AIChatbotPreview from "@/components/AIChatbotPreview";
import AIToolsPreview from "@/components/AIToolsPreview";
import AutoQAPreview from "@/components/AutoQAPreview";
import heroScreenshot from "@/assets/Platform-inbox-view.webp";

// Import client islands
import ScrollProgressIndicator from "@/components/product-inbox/ScrollProgressIndicator";
import FadeInUpObserver from "@/components/product-workflows/FadeInUpObserver";
import ProductHeroBackground from "@/components/product/ProductHeroBackground";
import ProductStyles from "@/components/product/ProductStyles";

const PreviewShell = ({
  title,
  meta,
  children,
}: {
  title: string;
  meta?: string;
  children: React.ReactNode;
}) => (
  <div className="flex h-full min-h-[360px] flex-col overflow-hidden rounded-2xl border border-border/40 bg-white shadow-xl">
    <div className="flex items-center justify-between border-b border-border/40 bg-gradient-to-r from-muted/40 via-white to-muted/20 px-4 py-3">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-primary" />
        <span className="text-sm font-semibold text-foreground/80">{title}</span>
      </div>
      {meta ? (
        <span className="rounded-full bg-primary/10 px-2 py-1 text-[11px] font-semibold text-primary">{meta}</span>
      ) : null}
    </div>
    <div className="flex-1 overflow-hidden bg-gradient-to-b from-white to-muted/30 p-4">{children}</div>
  </div>
);

const InboxPreview = () => (
  <PreviewShell title="Unified Inbox" meta="Queue health">
    <div className="grid h-full gap-3 sm:grid-cols-[0.55fr,0.45fr]">
      <div className="space-y-2">
        {[
          { name: "Alex Chen", status: "New", intent: "Refund", time: "2m", color: "bg-blue-500" },
          { name: "Dana Ruiz", status: "In progress", intent: "Shipping", time: "6m", color: "bg-amber-500" },
          { name: "Nolan Patel", status: "Waiting", intent: "Account", time: "12m", color: "bg-emerald-500" },
        ].map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-xl border border-border/50 bg-white/90 px-3 py-2.5 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
              <div>
                <div className="text-sm font-semibold text-foreground">{item.name}</div>
                <div className="text-xs text-muted-foreground">
                  {item.intent} - {item.status}
                </div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">{item.time} ago</div>
          </div>
        ))}
      </div>
      <div className="flex h-full flex-col gap-3 rounded-2xl border border-border/40 bg-white/95 p-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-foreground">Context</div>
          <span className="rounded-full bg-primary/10 px-2 py-1 text-[11px] font-semibold text-primary">AI Assist</span>
        </div>
        <div className="rounded-xl border border-dashed border-border/60 bg-muted/30 p-3 text-xs text-muted-foreground">
          Shopify - Order #1248 - Premium plan - CSAT 4.8<br />
          Last interaction: Asked about refund policy.<br />
          Suggested next: Offer instant credit, confirm address.
        </div>
        <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-foreground">
          <span className="rounded-lg border border-border/60 bg-muted/20 px-3 py-2">Assign: Skilled</span>
          <span className="rounded-lg border border-border/60 bg-muted/20 px-3 py-2">Approve action</span>
          <span className="rounded-lg border border-border/60 bg-muted/20 px-3 py-2">Tag: Refund</span>
          <span className="rounded-lg border border-border/60 bg-muted/20 px-3 py-2">Note to team</span>
        </div>
      </div>
    </div>
  </PreviewShell>
);

const WorkflowPreview = () => (
  <PreviewShell title="Workflow Builder" meta="No-code">
    <div className="mt-1 space-y-3">
      {[
        { label: "Trigger: New ticket", detail: "Channel = Email" },
        { label: "Branch: Intent", detail: "Refund / Shipping / Account" },
        { label: "Action: Call API", detail: "GET /orders/:id" },
        { label: "Guardrail: Approval", detail: "Refunds greater than $100" },
      ].map((step, idx, arr) => (
        <div
          key={step.label}
          className="relative flex items-start gap-3 rounded-2xl border border-border/50 bg-white/90 px-4 py-3 shadow-sm"
        >
          {idx < arr.length - 1 && <div className="absolute left-[14px] top-9 h-[calc(100%-18px)] w-px bg-border/60" aria-hidden />}
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
            {idx + 1}
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">{step.label}</div>
            <div className="text-xs text-muted-foreground">{step.detail}</div>
          </div>
        </div>
      ))}
    </div>
  </PreviewShell>
);

const CopilotPreview = () => (
  <PreviewShell title="Agent Copilot" meta="In-context actions">
    <div className="grid h-full gap-3 sm:grid-cols-[0.55fr,0.45fr]">
      <div className="space-y-2">
        <div className="rounded-2xl border border-border/50 bg-white/90 p-3 text-sm text-foreground shadow-sm">
          Customer: "Can I get a refund for order 1248?"<br />
          Copilot draft: Offers instant credit, cites policy, asks for confirmation.
        </div>
        <div className="flex gap-2">
          <button className="w-full rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-xs font-semibold text-primary">
            Insert reply
          </button>
          <button className="w-full rounded-lg border border-border/60 bg-muted/30 px-3 py-2 text-xs font-semibold text-foreground">
            Adjust tone
          </button>
        </div>
      </div>
      <div className="space-y-2 rounded-2xl border border-border/50 bg-white/95 p-3 shadow-sm">
        <div className="text-xs font-semibold text-muted-foreground">Actions</div>
        <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-foreground">
          <span className="rounded-lg border border-border/60 bg-muted/20 px-3 py-2">Refund $25</span>
          <span className="rounded-lg border border-border/60 bg-muted/20 px-3 py-2">Credit wallet</span>
          <span className="rounded-lg border border-border/60 bg-muted/20 px-3 py-2">Update shipping</span>
          <span className="rounded-lg border border-border/60 bg-muted/20 px-3 py-2">Escalate</span>
        </div>
        <div className="rounded-xl border border-dashed border-border/60 bg-muted/30 p-3 text-xs text-muted-foreground">
          Approval required for refunds &gt; $100. Logged to audit trail.
        </div>
      </div>
    </div>
  </PreviewShell>
);

const AnalyticsPreview = () => (
  <PreviewShell title="Automation Impact" meta="Exec-ready">
    <div className="grid h-full gap-3 sm:grid-cols-[0.6fr,0.4fr]">
      <div className="space-y-3">
        <div className="h-28 rounded-xl border border-border/40 bg-gradient-to-t from-primary/15 via-white to-white p-3">
          <div className="mb-2 text-xs font-semibold text-muted-foreground">Automation rate</div>
          <div className="flex h-full items-end gap-2">
            {[45, 62, 78, 82, 86].map((v, i) => (
              <div key={i} className="flex-1 rounded-md bg-primary/30" style={{ height: `${v}%` }} />
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-border/40 bg-muted/30 p-3 text-xs text-muted-foreground">
          Coverage by intent: Refunds 82%, Shipping 68%, Account 54%. Next: automate cancellations.
        </div>
      </div>
      <div className="space-y-2 rounded-2xl border border-border/40 bg-white/95 p-3 shadow-sm">
        <div className="flex items-center justify-between text-sm font-semibold text-foreground">
          <span>CSAT</span>
          <span className="text-primary">4.8</span>
        </div>
        <div className="flex items-center justify-between text-sm font-semibold text-foreground">
          <span>Time to first response</span>
          <span className="text-primary">-42%</span>
        </div>
        <div className="flex items-center justify-between text-sm font-semibold text-foreground">
          <span>Cost per ticket</span>
          <span className="text-primary">-28%</span>
        </div>
        <div className="rounded-xl border border-dashed border-border/60 bg-muted/30 p-3 text-xs text-muted-foreground">
          Export ready: PDF / CSV / Slack. Filters: intent, channel, team.
        </div>
      </div>
    </div>
  </PreviewShell>
);

const Product = () => {
  const coreProducts = [
    {
      id: "inbox",
      icon: MessageSquare,
      badge: "Foundation",
      title: "Unified Inbox",
      headline: "Command center that never loses context",
      description:
        "Bring every channel and API event into a single, action-ready workspace. Auto-route by workload and intent, keep teams from colliding, and keep customer history in the room at all times.",
      features: [
        { label: "Omnichannel queue", detail: "Email, chat, social, and webhooks land in one stream" },
        { label: "Live routing", detail: "Workload, skills, and intent drive assignments automatically" },
        { label: "Collision-proof", detail: "Presence and locks stop duplicate work before it starts" },
        { label: "Team console", detail: "Internal notes, @mentions, and handoffs stay tied to the thread" },
      ],
      link: "/product/inbox-channels",
      customPreview: <InboxPreview />,
      gradient: "from-blue-500/20 via-blue-500/10 to-transparent",
      accentColor: "blue",
      actionTags: ["One queue, zero tab switching", "Context cards stay pinned", "SLA timers inline"],
      guardrail: "Routing rules + approvals keep ownership clean",
      impact: "Queue clarity",
    },
    {
      id: "workflows",
      icon: Workflow,
      badge: "Automation",
      title: "Visual Workflows",
      headline: "Automations you can ship before lunch",
      description:
        "Design multi-step routing, tagging, and actions without code. Human approvals, testing, and versioning keep operations in control while teams move faster.",
      features: [
        { label: "Branch on any signal", detail: "Intent, sentiment, customer tier, or SLA state" },
        { label: "Action blocks", detail: "Call APIs, wait, reassign, tag, and notify downstream tools" },
        { label: "Template library", detail: "E-commerce, SaaS, and support ops blueprints ready to use" },
        { label: "Versioning + tests", detail: "Ship safely with previews, approvals, and audit trails" },
      ],
      link: "/product/workflows-routing",
      customPreview: <WorkflowPreview />,
      gradient: "from-purple-500/20 via-purple-500/10 to-transparent",
      accentColor: "purple",
      actionTags: ["Drag-and-drop builder", "Versioned releases", "Human approvals baked in"],
      guardrail: "Approvals + versioning keep ops in control",
      impact: "Ship automations fast",
    },
    {
      id: "chatbots",
      icon: Bot,
      badge: "AI Agents",
      title: "Intelligent Chatbots",
      headline: "Bots that actually resolve",
      description:
        "Agentic chatbots handle answers and actions with clear guardrails. They fetch order data, process simple changes, and hand off with full context when a human needs to step in.",
      features: [
        { label: "Actionable responses", detail: "Executes refunds, resets, and order checks autonomously" },
        { label: "Live data retrieval", detail: "Connects to Shopify, Stripe, CRMs, and custom APIs in real time" },
        { label: "Hallucination guardrails", detail: "Cites sources, limits scope, and logs every action" },
        { label: "Graceful escalation", detail: "Hands off with transcript, intent, and next best actions" },
      ],
      link: "/product/ai-suite",
      customPreview: <AIChatbotPreview />,
      gradient: "from-green-500/20 via-green-500/10 to-transparent",
      accentColor: "green",
      actionTags: ["Executes real actions", "Cites every source", "Escalates with receipts"],
      guardrail: "Every bot action is logged and approval-ready",
      impact: "Autonomy with receipts",
    },
    {
      id: "copilots",
      icon: Sparkles,
      badge: "AI Assistance",
      title: "Agent Copilots",
      headline: "Your reps' fast lane",
      description:
        "AI copilots live in the inbox to draft replies, summarize threads, and execute approved actions without leaving the conversation. Reps stay in flow, customers get faster outcomes.",
      features: [
        { label: "One-click actions", detail: "Process refunds, account edits, and plan changes inline" },
        { label: "Smart drafts", detail: "Brand-safe replies with citations and policy awareness" },
        { label: "Thread briefs", detail: "Summaries and intent highlights on demand" },
        { label: "Tone + format shifts", detail: "Flip formal to casual, technical to simple instantly" },
      ],
      link: "/product/ai-suite",
      customPreview: <CopilotPreview />,
      gradient: "from-amber-500/20 via-amber-500/10 to-transparent",
      accentColor: "amber",
      actionTags: ["Works across your stack", "Understands policy", "No copy/paste"],
      guardrail: "Role-based actions with full audit history",
      impact: "Agents stay in flow",
    },
    {
      id: "tools",
      icon: Zap,
      badge: "Actions",
      title: "AI Tools & Actions",
      headline: "Action rails with guardrails",
      description:
        "Define reusable tools that connect to your stack. Add approvals, limits, and full audit trails so AI can act safely every single time.",
      features: [
        { label: "Credential vault", detail: "Encrypted storage with rotation and scoping" },
        { label: "Approval queues", detail: "Multi-level workflows for sensitive actions" },
        { label: "Complete audit log", detail: "Timestamps, actor, and payloads for every execution" },
        { label: "Role scoping", detail: "Granular permissions with rate limits and retries" },
      ],
      link: "/product/ai-engine",
      customPreview: <AIToolsPreview />,
      gradient: "from-rose-500/20 via-rose-500/10 to-transparent",
      accentColor: "rose",
      actionTags: ["Connect any API", "Pre-flight checks", "Limits + retries included"],
      guardrail: "Approvals, limits, and audit are defaults",
      impact: "Safe to let AI act",
    },
    {
      id: "qa",
      icon: CheckCircle,
      badge: "Quality",
      title: "Automated QA",
      headline: "Quality without manual sampling",
      description:
        "Score 100% of conversations automatically. Custom rubrics catch accuracy, tone, and compliance issues with coaching-ready feedback for every agent.",
      features: [
        { label: "Custom scorecards", detail: "Define rubrics that match your brand and policies" },
        { label: "Auto-scoring coverage", detail: "Evaluate every interaction, not just samples" },
        { label: "Coach-ready insights", detail: "Actionable feedback with citations per agent" },
        { label: "Trend alerts", detail: "Spot emerging issues before they hit KPIs" },
      ],
      link: "/product/auto-qa",
      customPreview: <AutoQAPreview />,
      gradient: "from-indigo-500/20 via-indigo-500/10 to-transparent",
      accentColor: "indigo",
      actionTags: ["Policy aware", "Coach-ready notes", "Noise-free alerts"],
      guardrail: "Rubrics and sources keep scoring fair",
      impact: "QA that scales",
    },
    {
      id: "analytics",
      icon: BarChart3,
      badge: "Insights",
      title: "Analytics & Reporting",
      headline: "Exec-ready reporting in one click",
      description:
        "Track automation coverage, cost savings, CSAT, handle time, and intent trends in real time. Export views leadership understands - no CSV gymnastics required.",
      features: [
        { label: "Automation ROI", detail: "Deflection rate, coverage by intent, and savings" },
        { label: "Team performance", detail: "CSAT, AHT, FCR, and coaching impact" },
        { label: "Intent coverage", detail: "See what's automated, human-only, or needs rules" },
        { label: "Custom exports", detail: "Share exec-ready reports without spreadsheet cleanup" },
      ],
      link: "/product/analytics",
      customPreview: <AnalyticsPreview />,
      gradient: "from-cyan-500/20 via-cyan-500/10 to-transparent",
      accentColor: "cyan",
      actionTags: ["Automation ROI", "Coverage by intent", "Exec-ready exports"],
      guardrail: "Single source of truth - no CSV chaos",
      impact: "Proof for leadership",
    },
  ];

  const integrationCategories = [
    {
      icon: Building2,
      category: "CRM & Sales",
      description: "Pull customer context, update records, create tasks",
      connectors: ["Salesforce", "HubSpot", "Pipedrive"],
      color: "from-blue-500/10 to-blue-500/5",
      action: "Auto-sync support interactions to customer timelines"
    },
    {
      icon: ShoppingCart,
      category: "E-commerce",
      description: "Check inventory, process refunds, update orders",
      connectors: ["Shopify", "WooCommerce", "BigCommerce"],
      color: "from-purple-500/10 to-purple-500/5",
      action: "Instantly look up orders and initiate returns"
    },
    {
      icon: CreditCard,
      category: "Payments",
      description: "Process refunds, check subscriptions, update billing",
      connectors: ["Stripe", "PayPal", "Square"],
      color: "from-green-500/10 to-green-500/5",
      action: "Issue refunds and manage subscriptions in-conversation"
    },
    {
      icon: Headphones,
      category: "Knowledge Base",
      description: "Ingest docs, train AI, cite sources automatically",
      connectors: ["Appo", "Notion", "Markdown files"],
      color: "from-amber-500/10 to-amber-500/5",
      action: "AI agents cite help articles with source links"
    },
    {
      icon: Boxes,
      category: "Communication",
      description: "Route to channels, notify teams, create threads",
      connectors: ["Slack", "Microsoft Teams", "Discord"],
      color: "from-rose-500/10 to-rose-500/5",
      action: "Alert teams instantly when escalation is needed"
    },
    {
      icon: Boxes,
      category: "Custom APIs",
      description: "Connect any internal tool or external service",
      connectors: ["REST API", "Webhooks", "GraphQL"],
      color: "from-cyan-500/10 to-cyan-500/5",
      action: "Build custom actions for your unique workflows"
    },
  ];

  const differentiators = [
    {
      icon: Database,
      title: "Single platform spine",
      highlight: "One platform",
      description: "One data model, one UI, one permissions layer. Inbox, automations, bots, QA, and analytics share the same source of truth instead of loosely stitched tools.",
      bullets: [
        "Shared data layer for every product",
        "Unified actions engine across inbox, bots, workflows",
        "Single permissions model and audit trail",
      ],
    },
    {
      icon: Shield,
      title: "Guardrails first",
      highlight: "Safety by default",
      description: "Approvals, audit logs, and RBAC wrap every AI action. Humans and automation follow the same controls so you can ship safely on day one.",
      bullets: [
        "Approvals required for sensitive actions",
        "Complete audit log for every execution",
        "Role-based access with least privilege",
      ],
    },
    {
      icon: Lock,
      title: "Enterprise posture",
      highlight: "Security + compliance",
      description: "Encryption in transit/at rest, SOC 2 in progress, and SSO on the roadmap. Built to clear security reviews without slowing deployment.",
      bullets: [
        "Encryption end-to-end with key rotation",
        "SOC 2 program underway",
        "SSO and compliance features shipping soon",
      ],
    },
    {
      icon: Users,
      title: "Customer success partnership",
      highlight: "Included onboarding",
      description: "Implementation is included with a named CS lead who stays with you post-launch. Playbooks are tailored to your stack so you go live fast and stay optimized.",
      bullets: [
        "Implementation included (no PS fees)",
        "Weekly checkpoints with your CS lead",
        "Launch in weeks without forced migrations",
      ],
    },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <ProductStyles />
      <FadeInUpObserver />

      <PageLiquidBackground opacity={0.35} />

      {/* Scroll Progress Indicator */}
      <ScrollProgressIndicator />

      <Navigation />

      <main id="main-content" role="main">
      {/* Modern Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] lg:min-h-screen flex items-center pt-16 pb-12 md:pt-24 md:pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--primary)/0.1),transparent_50%)]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />

        <ProductHeroBackground />

        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto space-y-8 md:space-y-10 text-center">
            {/* Header Content */}
            <div className="space-y-5 md:space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-foreground leading-[1.05] tracking-tight">
                Turn every ticket into
                <span className="block bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent mt-2">
                  a resolved issue
                </span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                Inbox, workflows, agentic bots, copilots, and QA in one place that acts across your stack - with approvals and audit trails built in.
              </p>

              <div className="space-y-2.5 text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto">
                {[
                  'Executes refunds, updates, and lookups across your tools',
                  'Humans approve every action; full audit trails',
                  'Launch in days without forced migrations',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 justify-center text-left mx-auto max-w-xl">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <RouteButton size="lg" className="text-sm md:text-base px-6 py-4 md:px-8 md:py-5 lg:px-10 lg:py-7 shadow-2xl shadow-primary/30 group" href="/contact-sales">
                  Book a demo
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
                </RouteButton>
                <RouteButton size="lg" variant="outline" className="text-sm md:text-base px-6 py-4 md:px-8 md:py-5 lg:px-10 lg:py-7" href="/pricing">
                  View pricing
                </RouteButton>
              </div>
            </div>

            {/* Hero Screenshot BELOW TEXT */}
            <div className="relative max-w-6xl mx-auto">
              {/* Glow effect */}
              <div className="absolute -inset-12 bg-gradient-to-br from-primary/15 via-primary/8 to-transparent blur-3xl opacity-50" />

              {/* Screenshot only */}
              <div className="relative overflow-hidden rounded-[28px] border border-border/30 bg-white/90 shadow-2xl">
                <Image
                  src={heroScreenshot}
                  alt="Pullse Platform"
                  className="w-full"
                  width={1400}
                  height={860}
                  sizes="(min-width: 1280px) 70vw, (min-width: 768px) 90vw, 100vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive How It Works with Three.js */}
      <InteractiveHowItWorks />

      {/* Core Products - Simplified Storytelling */}
      <section className="relative py-16 md:py-24 lg:py-28 xl:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-muted/20" />
        <div className="absolute -left-24 -top-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-[-10%] top-10 h-96 w-96 rounded-full bg-emerald-200/15 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.08)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.08)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40" aria-hidden />

        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 md:mb-16">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary shadow-sm">
                Platform capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Seven products that behave like one.
              </h2>
              <p className="text-lg text-muted-foreground">
                Clear story, clear outcomes. Every card shows what it does, how it's safe, and where to go next.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {["Action-ready", "Guardrails built in", "Launch quickly"].map((chip) => (
                  <span key={chip} className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1.5 text-xs font-semibold text-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-8 md:space-y-10">
              {coreProducts.map((product, index) => {
                const Icon = product.icon;
                return (
                  <div
                    key={product.id}
                    className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/85 backdrop-blur shadow-[0_24px_60px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-1"
                    style={{ transitionDelay: `${index * 60}ms` }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-80`} aria-hidden />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ffffff2e_0,transparent_50%)]" aria-hidden />

                    <div className="relative grid md:grid-cols-[1.15fr,0.95fr] gap-6 md:gap-10 p-6 md:p-8">
                      <div className="space-y-5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/50 bg-white/85 shadow-lg">
                              <Icon className="h-6 w-6 text-foreground" />
                            </div>
                            <div className="space-y-1">
                              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">{product.badge}</p>
                              <h3 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">{product.title}</h3>
                              <p className="text-sm text-muted-foreground">{product.headline}</p>
                            </div>
                          </div>
                          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1.5 text-xs font-semibold text-foreground">
                            {product.impact}
                          </span>
                        </div>

                        <p className="text-base text-muted-foreground leading-relaxed">{product.description}</p>

                        <div className="flex flex-wrap gap-2">
                          {product.actionTags.map((tag) => (
                            <span key={tag} className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-white/85 px-3 py-1.5 text-[11px] font-semibold text-foreground shadow-sm">
                              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="grid sm:grid-cols-2 gap-3">
                          {product.features.slice(0, 4).map((feature) => (
                            <div key={feature.label} className="rounded-2xl border border-white/40 bg-white/85 p-3 shadow-sm">
                              <div className="text-sm font-semibold text-foreground">{feature.label}</div>
                              <p className="text-xs text-muted-foreground leading-relaxed">{feature.detail}</p>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 font-semibold text-primary">
                            {product.guardrail}
                          </span>
                          <RouteButton href={product.link} variant="ghost" className="group px-0 text-primary hover:text-primary/80">
                            Explore {product.title}
                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </RouteButton>
                        </div>
                      </div>

                      <div className="relative">
                        <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-white shadow-lg">
                          <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 bg-gradient-to-r from-muted/40 to-muted/10">
                            <span className="text-sm font-semibold text-foreground/80">{product.title} workspace</span>
                            <span className="text-xs font-semibold text-primary">{product.headline}</span>
                          </div>
                          {product.customPreview ? (
                            <div className="min-h-[280px] md:min-h-[320px] bg-white">{product.customPreview}</div>
                          ) : null}
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

      {/* Integration Ecosystem - Modern Grid */}
      <section className="relative py-16 md:py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/10 to-transparent" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 md:mb-16 lg:mb-20 space-y-4 md:space-y-6 fade-in-up">
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                Execute actions across your entire business stack
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                100+ native connectors to pull data and trigger actions in real-time. Plus full REST API support for unlimited custom integrations. No middleware, no sync delays.
              </p>
            </div>

            {/* Category Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-12">
              {integrationCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card transition-all hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 fade-in-up"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 transition-opacity group-hover:opacity-100`} />

                    <div className="relative p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
                      {/* Icon & Header */}
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 transition-all group-hover:scale-110 group-hover:bg-primary/20">
                          <Icon className="h-6 w-6 md:h-7 md:w-7 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-foreground">{category.category}</h3>
                          <p className="text-xs text-muted-foreground">{category.description}</p>
                        </div>
                      </div>

                      {/* Connectors */}
                      <div className="space-y-2">
                        {category.connectors.map((connector, cIndex) => (
                          <div
                            key={cIndex}
                            className="flex items-center gap-3 rounded-lg border border-border/40 bg-background/60 p-2 md:p-3 transition-all hover:border-primary/30 hover:bg-primary/5"
                          >
                            <div className="h-2 w-2 rounded-full bg-primary" />
                            <span className="text-sm font-semibold text-foreground">{connector}</span>
                          </div>
                        ))}
                      </div>

                      {/* Action Use Case */}
                      <div className="pt-4 border-t border-border/50">
                        <div className="flex items-start gap-2">
                          <Zap className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-muted-foreground leading-relaxed">{category.action}</p>
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

      {/* Why Pullse - Differentiators */}
      <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-b from-muted/10 via-muted/5 to-transparent">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.12),transparent_45%),radial-gradient(circle_at_bottom_right,hsl(var(--primary)/0.08),transparent_40%)]" />
        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-4 md:space-y-6 fade-in-up">
              <div className="inline-flex flex-wrap justify-center gap-2">
                {["One brain, one UI", "Guardrails first", "Founder-led onboarding"].map((chip) => (
                  <span key={chip} className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1.5 text-xs font-semibold text-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {chip}
                  </span>
                ))}
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Built different by design
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                The only platform built for AI from the ground up - action-ready, safe by default, and shipped with the founders.
              </p>
            </div>

            <div className="grid gap-4 md:gap-5 lg:grid-cols-2">
              {differentiators.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1 hover:border-primary/40"
                    style={{ transitionDelay: `${index * 80}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary/60 via-primary/30 to-transparent" />
                    <div className="relative p-6 md:p-7 lg:p-8 space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 shadow-sm">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                            {item.highlight}
                          </p>
                          <h4 className="text-xl font-bold text-foreground">{item.title}</h4>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                      <div className="space-y-2">
                        {item.bullets.map((bullet) => (
                          <div
                            key={bullet}
                            className="flex items-start gap-2 rounded-xl border border-border/50 bg-white/85 px-3 py-2 text-xs text-foreground"
                          >
                            <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{bullet}</span>
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

      {/* Final CTA */}
      <section className="relative py-16 md:py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card to-card/90 shadow-2xl fade-in-up">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.1),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--primary)/0.1),transparent_50%)]" />

              <div className="relative p-6 sm:p-8 md:p-10 lg:p-16">
                <div className="text-center space-y-6 md:space-y-8 lg:space-y-10">
                  {/* Headline */}
                  <div className="space-y-6">
                    <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                      Ready to transform support?
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                      Schedule a demo with our founding team. We'll show you exactly how Pullse fits your workflow.
                    </p>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <RouteButton size="lg" className="text-base px-10 py-7 shadow-xl shadow-primary/20" href="/contact-sales">
                      Get started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </RouteButton>
                    <RouteButton size="lg" variant="outline" className="text-base px-10 py-7" href="/pricing">
                      View pricing
                    </RouteButton>
                  </div>

                  {/* Trust badges */}
                  <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-8 border-t border-border/40">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>No credit card required</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>2-4 week implementation</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Founder-led onboarding</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
};

export default Product;
