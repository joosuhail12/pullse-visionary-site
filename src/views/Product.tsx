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
  Star,
  Globe,
  CreditCard,
  Boxes,
  TrendingUp,
} from "lucide-react";
import AIChatbotPreview from "@/components/AIChatbotPreview";
import AIToolsPreview from "@/components/AIToolsPreview";
import AutoQAPreview from "@/components/AutoQAPreview";
import inboxScreenshot from "@/assets/pullse-inbox-screenshot.png";
import workflowScreenshot from "@/assets/workflow-automation-screenshot.png";
import aiCopilotScreenshot from "@/assets/ai-copilot-screenshot.png";
import analyticsScreenshot from "@/assets/analytics-screenshot.png";

// Import client islands
import ScrollProgressIndicator from "@/components/product-inbox/ScrollProgressIndicator";
import FadeInUpObserver from "@/components/product-workflows/FadeInUpObserver";
import ProductHeroBackground from "@/components/product/ProductHeroBackground";
import ProductStyles from "@/components/product/ProductStyles";

const Product = () => {
  const coreProducts = [
    {
      id: "inbox",
      icon: MessageSquare,
      badge: "Foundation",
      title: "Unified Inbox",
      headline: "Every conversation in one place",
      description:
        "Centralize email, chat, and API events into a single intelligent workspace. Context-rich threads, smart assignments, and automated routing keep your team moving fast.",
      features: [
        { label: "Omnichannel inbox", detail: "Email, chat, webhooks unified" },
        { label: "Smart assignments", detail: "Auto-route based on workload or round robin" },
        { label: "Collision detection", detail: "Prevent duplicate work in real-time" },
        { label: "Collaboration tools", detail: "Internal notes, @mentions, handoffs" },
      ],
      link: "/product/inbox-channels",
      image: inboxScreenshot.src,
      gradient: "from-blue-500/20 via-blue-500/10 to-transparent",
      accentColor: "blue",
    },
    {
      id: "workflows",
      icon: Workflow,
      badge: "Automation",
      title: "Visual Workflows",
      headline: "No-code automation that scales",
      description:
        "Build sophisticated routing, tagging, and action sequences with our intuitive workflow builder. Pre-built templates get you started, full customization keeps you growing.",
      features: [
        { label: "Drag-and-drop builder", detail: "Visual interface, zero coding required" },
        { label: "Conditional logic", detail: "Branch on any ticket property or action" },
        { label: "Multi-step sequences", detail: "Chain actions with delays and triggers" },
        { label: "Industry templates", detail: "E-commerce, SaaS, support ops" },
      ],
      link: "/product/workflows-routing",
      image: workflowScreenshot.src,
      gradient: "from-purple-500/20 via-purple-500/10 to-transparent",
      accentColor: "purple",
    },
    {
      id: "chatbots",
      icon: Bot,
      badge: "AI Agents",
      title: "Intelligent Chatbots",
      headline: "Resolve 60-70% autonomously with actions",
      description:
        "AI agents that answer questions AND take lightweight actions for customers. Process order lookups, simple refunds, subscription changes, password resets—autonomously with proper guardrails. Not just deflection, actual resolution.",
      features: [
        { label: "Lightweight actions", detail: "Refunds, updates, lookups executed autonomously" },
        { label: "Live data access", detail: "Connect to Shopify, Stripe, CRMs, custom APIs" },
        { label: "Graceful handoff", detail: "Pass full context to human agents when needed" },
        { label: "RAG knowledge retrieval", detail: "Cite help articles and past conversations" },
      ],
      link: "/product/ai-suite",
      customPreview: <AIChatbotPreview />,
      gradient: "from-green-500/20 via-green-500/10 to-transparent",
      accentColor: "green",
    },
    {
      id: "copilots",
      icon: Sparkles,
      badge: "AI Assistance",
      title: "Agent Copilots",
      headline: "Execute actions across your entire stack",
      description:
        "On-demand action execution engine for support reps. Process refunds, update accounts, modify orders, change subscriptions—all from the conversation. No context switching, no tool sprawl. Agents trigger actions; Copilot executes them with proper controls.",
      features: [
        { label: "Action execution", detail: "Refunds, updates, modifications across your stack" },
        { label: "Smart drafting", detail: "Context-aware responses in your brand voice" },
        { label: "Auto-summarization", detail: "Distill long threads into actionable insights" },
        { label: "Tone adjustment", detail: "Rewrite formal to casual, technical to simple" },
      ],
      link: "/product/ai-suite",
      image: aiCopilotScreenshot.src,
      gradient: "from-amber-500/20 via-amber-500/10 to-transparent",
      accentColor: "amber",
    },
    {
      id: "tools",
      icon: Zap,
      badge: "Actions",
      title: "AI Tools & Actions",
      headline: "Execute with guardrails built in",
      description:
        "Connect AI to real actions—refunds, account updates, subscription changes. Approval workflows, audit trails, and role permissions ensure safety without slowing teams down.",
      features: [
        { label: "Secure integrations", detail: "Encrypted credential vault, token management" },
        { label: "Approval gates", detail: "Multi-level workflows for sensitive actions" },
        { label: "Complete audit log", detail: "Every action timestamped and traceable" },
        { label: "Role-based access", detail: "Granular permissions per team and action" },
      ],
      link: "/product/ai-engine",
      customPreview: <AIToolsPreview />,
      gradient: "from-rose-500/20 via-rose-500/10 to-transparent",
      accentColor: "rose",
    },
    {
      id: "qa",
      icon: CheckCircle,
      badge: "Quality",
      title: "Automated QA",
      headline: "Score 100% of conversations",
      description:
        "AI-powered quality assurance that evaluates every interaction for accuracy, tone, policy compliance, and resolution quality. Get coaching insights that actually help agents improve.",
      features: [
        { label: "Custom rubrics", detail: "Define scoring criteria for your brand" },
        { label: "Auto-scoring", detail: "Evaluate 100% of conversations, not samples" },
        { label: "Coaching insights", detail: "Actionable feedback for each agent" },
        { label: "Trend analysis", detail: "Spot issues before they become problems" },
      ],
      link: "/product/auto-qa",
      customPreview: <AutoQAPreview />,
      gradient: "from-indigo-500/20 via-indigo-500/10 to-transparent",
      accentColor: "indigo",
    },
    {
      id: "analytics",
      icon: BarChart3,
      badge: "Insights",
      title: "Analytics & Reporting",
      headline: "Prove ROI to leadership",
      description:
        "Real-time dashboards that track what matters: automation rates, cost savings, CSAT, handle time, and coverage by intent. Export executive-ready reports that tell the full story.",
      features: [
        { label: "Automation metrics", detail: "Deflection rate, coverage by intent" },
        { label: "Cost tracking", detail: "Calculate savings vs traditional setup" },
        { label: "Performance KPIs", detail: "CSAT, AHT, FCR, team productivity" },
        { label: "Custom reports", detail: "Build and export reports for leadership" },
      ],
      link: "/product/analytics",
      image: analyticsScreenshot.src,
      gradient: "from-cyan-500/20 via-cyan-500/10 to-transparent",
      accentColor: "cyan",
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
      title: "True All-in-One",
      stat: "7 → 1",
      description: "Not a suite of loosely connected apps. One database, one UI, one login. Your data flows seamlessly across every layer.",
      highlight: "No integration sprawl",
    },
    {
      icon: Shield,
      title: "AI You Can Trust",
      stat: "100%",
      description: "Every automation includes approval workflows, audit trails, and role-based permissions. AI that's safe for production from day one.",
      highlight: "Built-in guardrails",
    },
    {
      icon: Lock,
      title: "Enterprise Ready",
      stat: "SOC 2",
      description: "SOC 2 Type II controls in progress, encrypted at rest and in transit, RBAC, and complete audit trails. SSO and enhanced compliance features coming soon.",
      highlight: "Compliance first",
    },
    {
      icon: Users,
      title: "Founder Led",
      stat: "Direct",
      description: "Work directly with our founding team during implementation. No handoffs to junior CSMs. We're invested in your success.",
      highlight: "White-glove service",
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
      <section className="relative min-h-[60vh] md:min-h-[80vh] lg:min-h-screen flex items-center pt-16 sm:pt-24 md:pt-40 pb-12 sm:pb-16 md:pb-32 overflow-hidden">
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--primary)/0.1),transparent_50%)]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />

        <ProductHeroBackground />

        <div className="container relative mx-auto px-4">
          <div className="grid lg:grid-cols-[1.1fr,1fr] gap-16 items-center max-w-7xl mx-auto">
            {/* Left: Content */}
            <div className="space-y-6 md:space-y-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 backdrop-blur-sm">
                <div className="flex h-2 w-2">
                  <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                </div>
                <span className="text-xs font-semibold tracking-wide text-primary">Product Platform</span>
              </div>

              {/* Headline */}
              <div className="space-y-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold text-foreground leading-[1.1] tracking-tight">
                  Support platform
                  <span className="block text-primary">built for AI</span>
                </h1>
                <p className="text-base sm:text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                  The only platform where inbox, workflows, AI agents, and analytics work as one. Built for teams who need control, not chaos.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <RouteButton size="lg" className="text-base px-8 py-7 shadow-xl shadow-primary/20 group" href="/contact-sales">
                  Get started
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </RouteButton>
              </div>

              {/* Trust metrics */}
              <div className="flex flex-wrap gap-4 md:gap-6 lg:gap-8 pt-2 md:pt-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                    <Database className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-bold text-foreground">7 in 1</div>
                    <div className="text-xs text-muted-foreground">Products unified</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                    <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-bold text-foreground">80%</div>
                    <div className="text-xs text-muted-foreground">Avg automation</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                    <Zap className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-bold text-foreground">2-4 wk</div>
                    <div className="text-xs text-muted-foreground">To production</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Enhanced Visual */}
            <div className="relative lg:ml-auto">
              {/* Glow effect */}
              <div className="absolute -inset-8 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-3xl" />

              {/* Main card */}
              <div className="relative rounded-3xl border border-border/50 bg-gradient-to-br from-card/95 via-card to-card/90 p-3 shadow-2xl backdrop-blur-xl">
                <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted/30 border border-border/30">
                  <Image
                    src={inboxScreenshot}
                    alt="Pullse Platform"
                    className="w-full"
                    priority
                  />
                </div>
              </div>

              {/* Floating stat cards */}
              <div className="absolute -left-6 top-1/4 hidden lg:block">
                <div className="rounded-2xl border border-border/60 bg-card/95 p-4 shadow-xl backdrop-blur-xl animate-float" style={{ animationDelay: '0s' }}>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">73% deflected</div>
                      <div className="text-xs text-muted-foreground">by AI</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-6 bottom-1/4 hidden lg:block">
                <div className="rounded-2xl border border-border/60 bg-card/95 p-4 shadow-xl backdrop-blur-xl animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                      <Star className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">4.8 CSAT</div>
                      <div className="text-xs text-muted-foreground">avg score</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive How It Works with Three.js */}
      <InteractiveHowItWorks />

      {/* Core Products - Modern Showcase */}
      <section className="relative py-16 md:py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/10 via-transparent to-muted/10" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 md:mb-16 lg:mb-24 space-y-4 md:space-y-6 fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold tracking-wide text-primary">Core Products</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-foreground max-w-4xl mx-auto leading-tight">
                Seven products that feel like one
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Each powerful alone. Unstoppable together.
              </p>
            </div>

            {/* Products Grid - Alternating */}
            <div className="space-y-16 md:space-y-24 lg:space-y-32">
              {coreProducts.map((product, index) => {
                const Icon = product.icon;
                const isEven = index % 2 === 0;

                return (
                  <div key={product.id} className="relative fade-in-up" style={{ transitionDelay: `${index * 100}ms` }}>
                    <div className={`grid lg:grid-cols-2 gap-16 items-center ${!isEven ? "lg:direction-rtl" : ""}`}>
                      {/* Content Side */}
                      <div className={`space-y-4 md:space-y-6 lg:space-y-8 ${!isEven ? "lg:direction-ltr lg:text-right" : ""}`}>
                        {/* Badge & Icon */}
                        <div className={`flex items-center gap-4 ${!isEven ? "lg:flex-row-reverse lg:justify-end" : ""}`}>
                          <div className={`flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${product.gradient} border border-${product.accentColor}-500/30 shadow-xl`}>
                            <Icon className={`h-8 w-8 md:h-10 md:w-10 text-${product.accentColor}-500`} />
                          </div>
                          <div className="text-xs font-bold uppercase tracking-wider text-primary">
                            {product.badge}
                          </div>
                        </div>

                        {/* Text Content */}
                        <div className="space-y-4">
                          <h3 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-foreground leading-tight">
                            {product.title}
                          </h3>
                          <p className="text-base sm:text-lg lg:text-xl font-semibold text-foreground/70">
                            {product.headline}
                          </p>
                          <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                            {product.description}
                          </p>
                        </div>

                        {/* Enhanced Features List */}
                        <div className="space-y-2 md:space-y-3 lg:space-y-4">
                          {product.features.map((feature, fIndex) => (
                            <div
                              key={fIndex}
                              className={`group flex items-start gap-2 md:gap-3 lg:gap-4 rounded-xl border border-border/40 bg-background/60 p-3 md:p-4 transition-all hover:border-primary/40 hover:bg-primary/5 ${!isEven ? "lg:flex-row-reverse lg:text-right" : ""}`}
                            >
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 shrink-0 transition-all group-hover:scale-110 group-hover:bg-primary/20">
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-bold text-foreground mb-1">{feature.label}</div>
                                <div className="text-xs text-muted-foreground">{feature.detail}</div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className={`pt-4 ${!isEven ? "lg:flex lg:justify-end" : ""}`}>
                          <RouteButton href={product.link} variant="outline" className="group">
                            Learn more
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </RouteButton>
                        </div>
                      </div>

                      {/* Visual Side */}
                      <div className={`relative ${!isEven ? "lg:direction-ltr" : ""}`}>
                        {/* Glow */}
                        <div className={`absolute -inset-6 bg-gradient-to-br ${product.gradient} blur-3xl opacity-20`} />

                        {/* Card */}
                        <div className="relative rounded-3xl border border-border/50 bg-card/50 p-4 shadow-2xl backdrop-blur-sm">
                          <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted/30 border border-border/30">
                            {product.customPreview ? (
                              <div className="min-h-[400px]">
                                {product.customPreview}
                              </div>
                            ) : product.image ? (
                              <Image
                                src={product.image}
                                alt={product.title}
                                width={800}
                                height={600}
                                className="w-full"
                              />
                            ) : null}
                          </div>
                        </div>

                        {/* Floating badge */}
                        <div className="absolute -top-4 -right-4 rounded-2xl border border-primary/30 bg-card/95 px-4 py-2 shadow-xl backdrop-blur-xl">
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-primary fill-primary" />
                            <span className="text-xs font-bold text-foreground">Popular</span>
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

      {/* Integration Ecosystem - Modern Grid */}
      <section className="relative py-16 md:py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/10 to-transparent" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 md:mb-16 lg:mb-20 space-y-4 md:space-y-6 fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
                <Globe className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold tracking-wide text-primary">Integrations</span>
              </div>
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

      {/* Why Pullse - Modern Differentiators */}
      <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-b from-muted/10 via-muted/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 md:mb-16 lg:mb-20 space-y-4 md:space-y-6 fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold tracking-wide text-primary">Why Pullse</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                Built different by design
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                The only platform built for AI from the ground up
              </p>
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {differentiators.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card transition-all hover:border-primary/40 hover:shadow-2xl hover:-translate-y-1 fade-in-up"
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                    <div className="relative p-6 md:p-8 lg:p-10 space-y-4 md:space-y-5 lg:space-y-6">
                      {/* Icon & Stat */}
                      <div className="flex items-center justify-between">
                        <div className="flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 transition-all group-hover:scale-110 group-hover:bg-primary/20">
                          <Icon className="h-7 w-7 md:h-8 md:w-8 text-primary" />
                        </div>
                        <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">{item.stat}</div>
                      </div>

                      {/* Content */}
                      <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1">
                          <span className="text-xs font-bold text-primary">{item.highlight}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
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
