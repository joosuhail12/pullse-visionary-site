'use client';

import { useEffect, useRef, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import RouteButton from "@/components/RouteButton";
import InteractiveHowItWorks from "@/components/InteractiveHowItWorks";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  MessageSquare,
  Workflow,
  Bot,
  Brain,
  BarChart3,
  CheckCircle,
  CheckCircle2,
  Database,
  Zap,
  Shield,
  Users,
  Sparkles,
  Mail,
  MessageCircle,
  Phone,
  Webhook,
  TrendingUp,
  Lock,
  ShoppingCart,
  Building2,
  Headphones,
  Star,
  Globe,
  CreditCard,
  LayoutDashboard,
  Boxes,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AIChatbotPreview from "@/components/AIChatbotPreview";
import AIToolsPreview from "@/components/AIToolsPreview";
import AutoQAPreview from "@/components/AutoQAPreview";
import inboxScreenshot from "@/assets/pullse-inbox-screenshot.png";
import workflowScreenshot from "@/assets/workflow-automation-screenshot.png";
import aiCopilotScreenshot from "@/assets/ai-copilot-screenshot.png";
import analyticsScreenshot from "@/assets/analytics-screenshot.png";

const Product = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Observe all sections with fade-in-up class
    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

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
        { label: "Smart assignments", detail: "Auto-route based on skills & workload" },
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
      headline: "Deflect 60-70% of routine requests",
      description:
        "AI chatbots that understand intent, pull live data from your APIs, and escalate gracefully to humans. Deploy in minutes, customize for your brand, measure impact in real-time.",
      features: [
        { label: "Intent detection", detail: "Natural language understanding, not keywords" },
        { label: "Live data access", detail: "Connect to Shopify, Stripe, CRMs, custom APIs" },
        { label: "Graceful handoff", detail: "Pass full context to human agents" },
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
      headline: "AI that makes every agent great",
      description:
        "Real-time AI assistance that drafts on-brand replies, summarizes threads, rewrites content, and suggests next actions. Agents stay in control while AI does the heavy lifting.",
      features: [
        { label: "Smart drafting", detail: "Context-aware responses in your tone" },
        { label: "Tone adjustment", detail: "Rewrite formal to casual, technical to simple" },
        { label: "Auto-summarization", detail: "Distill long threads into key points" },
        { label: "Action suggestions", detail: "Next-best-action recommendations" },
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
      description: "Customer data sync",
      connectors: ["Salesforce", "HubSpot", "Pipedrive"],
      color: "from-blue-500/10 to-blue-500/5",
    },
    {
      icon: ShoppingCart,
      category: "E-commerce",
      description: "Orders & inventory",
      connectors: ["Shopify", "WooCommerce", "BigCommerce"],
      color: "from-purple-500/10 to-purple-500/5",
    },
    {
      icon: CreditCard,
      category: "Payments",
      description: "Billing & transactions",
      connectors: ["Stripe", "PayPal", "Square"],
      color: "from-green-500/10 to-green-500/5",
    },
    {
      icon: Headphones,
      category: "Support Tools",
      description: "Helpdesk integration",
      connectors: ["Zendesk", "Intercom", "Freshdesk"],
      color: "from-amber-500/10 to-amber-500/5",
    },
    {
      icon: MessageCircle,
      category: "Communication",
      description: "Team collaboration",
      connectors: ["Slack", "Microsoft Teams", "Discord"],
      color: "from-rose-500/10 to-rose-500/5",
    },
    {
      icon: Boxes,
      category: "Custom",
      description: "Your systems",
      connectors: ["REST API", "Webhooks", "GraphQL"],
      color: "from-cyan-500/10 to-cyan-500/5",
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

  const useCaseExamples = [
    {
      icon: ShoppingCart,
      vertical: "E-commerce",
      stat: "40 hrs/week",
      title: "WISMO automation",
      description: "Automatically resolve 'Where is my order?' with live Shopify data. AI pulls tracking info, explains delays, and proactively updates customers.",
      result: "Reduced WISMO tickets by 73%",
      customer: "Mid-market fashion brand",
    },
    {
      icon: Building2,
      vertical: "SaaS & Fintech",
      stat: "100%",
      title: "Compliant account changes",
      description: "Process account updates, billing disputes, and cancellations with multi-level approval workflows and complete audit trails.",
      result: "Passed SOC 2 audit with zero findings",
      customer: "B2B payments platform",
    },
    {
      icon: Headphones,
      vertical: "Support Operations",
      stat: "68%",
      title: "Intent-based routing",
      description: "Route by what customers actually need, not keyword matching. AI understands intent and connects them to the right specialist instantly.",
      result: "First contact resolution up 34%",
      customer: "Enterprise SaaS company",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <PageLiquidBackground opacity={0.2} />

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-border/20">
        <div
          className="h-full bg-gradient-to-r from-primary via-primary to-primary/60 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Navigation />

      {/* Modern Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--primary)/0.1),transparent_50%)]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />

        <div className="container relative mx-auto px-4">
          <div className="grid lg:grid-cols-[1.1fr,1fr] gap-16 items-center max-w-7xl mx-auto">
            {/* Left: Content */}
            <div className="space-y-10">
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
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground leading-[1.1] tracking-tight">
                  Support platform
                  <span className="block text-primary">built for AI</span>
                </h1>
                <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
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
              <div className="flex flex-wrap gap-8 pt-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                    <Database className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">7 in 1</div>
                    <div className="text-xs text-muted-foreground">Products unified</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">68%</div>
                    <div className="text-xs text-muted-foreground">Avg automation</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">2-4 wk</div>
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
      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/10 via-transparent to-muted/10" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-24 space-y-6 fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold tracking-wide text-primary">Core Products</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-4xl mx-auto leading-tight">
                Seven products that feel like one
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Each powerful alone. Unstoppable together.
              </p>
            </div>

            {/* Products Grid - Alternating */}
            <div className="space-y-32">
              {coreProducts.map((product, index) => {
                const Icon = product.icon;
                const isEven = index % 2 === 0;

                return (
                  <div key={product.id} className="relative fade-in-up" style={{ transitionDelay: `${index * 100}ms` }}>
                    <div className={`grid lg:grid-cols-2 gap-16 items-center ${!isEven ? "lg:direction-rtl" : ""}`}>
                      {/* Content Side */}
                      <div className={`space-y-8 ${!isEven ? "lg:direction-ltr lg:text-right" : ""}`}>
                        {/* Badge & Icon */}
                        <div className={`flex items-center gap-4 ${!isEven ? "lg:flex-row-reverse lg:justify-end" : ""}`}>
                          <div className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${product.gradient} border border-${product.accentColor}-500/30 shadow-xl`}>
                            <Icon className={`h-10 w-10 text-${product.accentColor}-500`} />
                          </div>
                          <div className="text-xs font-bold uppercase tracking-wider text-primary">
                            {product.badge}
                          </div>
                        </div>

                        {/* Text Content */}
                        <div className="space-y-4">
                          <h3 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                            {product.title}
                          </h3>
                          <p className="text-xl font-semibold text-foreground/70">
                            {product.headline}
                          </p>
                          <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                            {product.description}
                          </p>
                        </div>

                        {/* Enhanced Features List */}
                        <div className="space-y-4">
                          {product.features.map((feature, fIndex) => (
                            <div
                              key={fIndex}
                              className={`group flex items-start gap-4 rounded-xl border border-border/40 bg-background/60 p-4 transition-all hover:border-primary/40 hover:bg-primary/5 ${!isEven ? "lg:flex-row-reverse lg:text-right" : ""}`}
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
      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/10 to-transparent" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-20 space-y-6 fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
                <Globe className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold tracking-wide text-primary">Integrations</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                Connect with any API in the world
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                100+ native connectors for popular tools, plus the flexibility to integrate with any custom system that has an API
              </p>
            </div>

            {/* Category Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {integrationCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card transition-all hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 fade-in-up"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 transition-opacity group-hover:opacity-100`} />

                    <div className="relative p-8 space-y-6">
                      {/* Icon & Header */}
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 transition-all group-hover:scale-110 group-hover:bg-primary/20">
                          <Icon className="h-7 w-7 text-primary" />
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
                            className="flex items-center gap-3 rounded-lg border border-border/40 bg-background/60 p-3 transition-all hover:border-primary/30 hover:bg-primary/5"
                          >
                            <div className="h-2 w-2 rounded-full bg-primary" />
                            <span className="text-sm font-semibold text-foreground">{connector}</span>
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

      {/* Why Pullse - Modern Differentiators */}
      <section className="relative py-32 bg-gradient-to-b from-muted/10 via-muted/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-20 space-y-6 fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold tracking-wide text-primary">Why Pullse</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
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

                    <div className="relative p-10 space-y-6">
                      {/* Icon & Stat */}
                      <div className="flex items-center justify-between">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 transition-all group-hover:scale-110 group-hover:bg-primary/20">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                        <div className="text-4xl font-bold text-primary">{item.stat}</div>
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

      {/* Use Cases - Modern Cards */}
      <section className="relative py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-20 space-y-6 fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold tracking-wide text-primary">Customer Stories</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                Real teams, real results
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                How leading companies use Pullse to scale support
              </p>
            </div>

            {/* Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {useCaseExamples.map((example, index) => {
                const Icon = example.icon;
                return (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card transition-all hover:border-primary/40 hover:shadow-2xl hover:-translate-y-2 fade-in-up"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                    <div className="relative p-8 space-y-6">
                      {/* Icon & Stat Badge */}
                      <div className="flex items-start justify-between">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                        <div className="rounded-full bg-primary px-3 py-1">
                          <span className="text-sm font-bold text-background">{example.stat}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-4">
                        <div className="text-xs font-bold uppercase tracking-wider text-primary">
                          {example.vertical}
                        </div>
                        <h3 className="text-2xl font-bold text-foreground">{example.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {example.description}
                        </p>

                        {/* Result */}
                        <div className="pt-4 border-t border-border/40 space-y-2">
                          <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            {example.result}
                          </div>
                          <div className="text-xs text-muted-foreground italic">
                            {example.customer}
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

      {/* Stats Banner */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-card via-card to-card/80 p-12 lg:p-16 shadow-2xl backdrop-blur-xl fade-in-up">
              <div className="text-center mb-12 space-y-4">
                <div className="text-sm font-bold uppercase tracking-widest text-primary">
                  Typical Results
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
                  Numbers that matter
                </h2>
                <p className="text-lg text-muted-foreground">
                  Average outcomes across early customers
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-12">
                <div className="text-center space-y-4">
                  <div className="text-7xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">
                    68%
                  </div>
                  <div className="text-base font-bold text-foreground">Tickets Automated</div>
                  <div className="text-sm text-muted-foreground">AI handles routine requests end-to-end</div>
                </div>
                <div className="text-center space-y-4">
                  <div className="text-7xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">
                    60-75%
                  </div>
                  <div className="text-base font-bold text-foreground">Cost Reduction</div>
                  <div className="text-sm text-muted-foreground">Total operational savings achieved</div>
                </div>
                <div className="text-center space-y-4">
                  <div className="text-7xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">
                    &lt;6mo
                  </div>
                  <div className="text-base font-bold text-foreground">Payback Period</div>
                  <div className="text-sm text-muted-foreground">Time to positive ROI</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card to-card/90 shadow-2xl fade-in-up">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.1),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--primary)/0.1),transparent_50%)]" />

              <div className="relative p-12 lg:p-16">
                <div className="text-center space-y-10">
                  {/* Headline */}
                  <div className="space-y-6">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
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

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .direction-rtl {
          direction: rtl;
        }

        .direction-ltr {
          direction: ltr;
        }

        /* Scroll-triggered animation */
        .fade-in-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .fade-in-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <Footer />
    </div>
  );
};

export default Product;
