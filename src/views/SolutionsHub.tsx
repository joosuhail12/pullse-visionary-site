'use client';

import { useEffect, useState, useRef, Suspense } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import LiquidEther from "@/components/LiquidEther";
import RouteButton from "@/components/RouteButton";
import RoiCalculator from "@/components/RoiCalculator";
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Target,
  Briefcase,
  ShoppingCart,
  MessageSquare,
  Users,
  ShieldCheck,
  HelpCircle,
  Zap,
  BarChart3,
  Bot,
  Brain,
  ClipboardCheck,
  Sparkles,
  Activity,
  TrendingUp,
  Globe,
  Code,
  CreditCard,
  Package,
  Settings,
  Lock,
} from "lucide-react";
import Link from "next/link";

// AnimatedCounter component for stats
interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  trigger: boolean;
  duration?: number;
}

const AnimatedCounter = ({ end, suffix = "", trigger, duration = 2000 }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(startValue + (end - startValue) * easeOutQuart));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [trigger, end, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

const SolutionsHub = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [statsAnimated, setStatsAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

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

  // Stats animation trigger
  useEffect(() => {
    const handleScroll = () => {
      if (statsRef.current && !statsAnimated) {
        const rect = statsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          setStatsAnimated(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [statsAnimated]);

  const crossIndustryStats = [
    { value: 70, suffix: "%", label: "automation rate" },
    { value: 8, suffix: "s", label: "avg response time" },
    { value: 45, suffix: "%", label: "cost reduction" },
    { value: 24, suffix: "/7", label: "availability" },
  ];

  const pillars = [
    {
      icon: Bot,
      title: "AI Chatbots",
      subtitle: "Autonomous Execution",
      description: "AI agents that don't just answer questions—they take action. Execute refunds, create tickets, update accounts, and handle complex workflows automatically.",
      stat: "70%",
      statLabel: "automation rate",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      textColor: "text-blue-600",
      features: [
        "Execute Stripe refunds automatically",
        "Create Jira tickets with full context",
        "Update account settings across systems",
        "Send Slack alerts to right teams",
      ],
    },
    {
      icon: Brain,
      title: "AI Copilots",
      subtitle: "Real-Time Intelligence",
      description: "Empower your agents with AI that suggests responses, surfaces knowledge, and automates repetitive tasks—all while they work.",
      stat: "3x",
      statLabel: "faster resolution",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      textColor: "text-purple-600",
      features: [
        "AI-suggested responses in real-time",
        "Auto-summarize long conversations",
        "Surface relevant help articles instantly",
        "Detect sentiment and escalation triggers",
      ],
    },
    {
      icon: ClipboardCheck,
      title: "Auto-QA",
      subtitle: "Quality at Scale",
      description: "Monitor 100% of conversations automatically. Catch compliance issues, coach agents with specific feedback, and maintain quality without manual review.",
      stat: "100%",
      statLabel: "coverage",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      textColor: "text-green-600",
      features: [
        "Score every conversation automatically",
        "Identify training opportunities",
        "Track compliance violations",
        "Generate coaching insights",
      ],
    },
  ];

  const industryAdaptations = [
    {
      industry: "B2B SaaS",
      icon: Briefcase,
      color: "text-blue-600",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      examples: [
        { tool: "Chatbot", action: "Triggers GitHub issue creation for bugs" },
        { tool: "Copilot", action: "Surfaces API docs during integration help" },
        { tool: "Auto-QA", action: "Flags missed upsell opportunities" },
      ],
    },
    {
      industry: "E-commerce",
      icon: ShoppingCart,
      color: "text-green-600",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      examples: [
        { tool: "Chatbot", action: "Auto-processes returns via Shopify" },
        { tool: "Copilot", action: "Suggests product recommendations" },
        { tool: "Auto-QA", action: "Monitors holiday season performance" },
      ],
    },
    {
      industry: "Fintech",
      icon: Shield,
      color: "text-red-600",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30",
      examples: [
        { tool: "Chatbot", action: "Freezes accounts on fraud detection" },
        { tool: "Copilot", action: "Guides through KYC verification" },
        { tool: "Auto-QA", action: "Ensures regulatory compliance" },
      ],
    },
  ];

  const industrySolutions = [
    {
      icon: Briefcase,
      title: "B2B SaaS",
      category: "Software & Technology",
      headline: "Turn trial users into paying customers",
      painPoints: [
        "Losing users during onboarding?",
        "Technical issues causing churn?",
        "No visibility into usage patterns?",
      ],
      stat: { value: "28%", label: "churn reduction" },
      link: "/solutions/b2b-saas",
      gradient: "from-blue-500/10 to-cyan-500/10",
      borderColor: "border-blue-500/20",
      textColor: "text-blue-600",
      bgColor: "bg-blue-500/10",
      ctaGradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: ShoppingCart,
      title: "E-commerce",
      category: "Online Retail",
      headline: "Scale support during your busiest seasons",
      painPoints: [
        "Overwhelmed by order status inquiries?",
        "Returns process slowing you down?",
        "Black Friday traffic crushing your team?",
      ],
      stat: { value: "62%", label: "fewer WISMO tickets" },
      link: "/solutions/ecommerce",
      gradient: "from-green-500/10 to-emerald-500/10",
      borderColor: "border-green-500/20",
      textColor: "text-green-600",
      bgColor: "bg-green-500/10",
      ctaGradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Shield,
      title: "Fintech",
      category: "Financial Services",
      headline: "Prevent fraud while staying compliant",
      painPoints: [
        "Fraud cases sitting for hours?",
        "Failing compliance audits?",
        "Payment failures driving churn?",
      ],
      stat: { value: "<8s", label: "fraud response time" },
      link: "/solutions/fintech",
      gradient: "from-red-500/10 to-orange-500/10",
      borderColor: "border-red-500/20",
      textColor: "text-red-600",
      bgColor: "bg-red-500/10",
      ctaGradient: "from-red-500 to-orange-500",
    },
  ];

  const integrations = [
    { name: "Slack", icon: MessageSquare },
    { name: "Teams", icon: MessageSquare },
    { name: "Stripe", icon: CreditCard },
    { name: "Shopify", icon: ShoppingCart },
    { name: "Salesforce", icon: Users },
    { name: "Jira", icon: Settings },
    { name: "GitHub", icon: Code },
    { name: "HubSpot", icon: Users },
  ];

  const comparisonData = [
    {
      label: "Best for",
      saas: "SaaS companies",
      ecommerce: "Online retail",
      fintech: "Financial services",
    },
    {
      label: "Top challenge",
      saas: "Churn prevention",
      ecommerce: "WISMO automation",
      fintech: "Fraud prevention",
    },
    {
      label: "Key stat",
      saas: "28% less churn",
      ecommerce: "62% fewer tickets",
      fintech: "<8s response",
    },
    {
      label: "Unique feature",
      saas: "GitHub integration",
      ecommerce: "Peak season scaling",
      fintech: "SOC 2 compliance",
    },
  ];

  return (
    <div className="min-h-screen">
      <PageLiquidBackground opacity={0.3} />
      <Navigation />

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-border/20">
        <div
          className="h-full bg-gradient-to-r from-primary via-primary to-primary/60 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero Section - Platform Value Proposition */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background/80 to-background/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_50%)]" />

        {/* Hero Liquid Ether Effect */}
        <div className="absolute inset-0 -z-10 opacity-40">
          <Suspense fallback={<div className="w-full h-full" />}>
            <LiquidEther
              colors={["#FF00C8", "#A805FF", "#D3A9EA"]}
              mouseForce={20}
              cursorSize={110}
              isViscous={false}
              resolution={0.55}
              autoDemo
              autoSpeed={0.35}
              autoIntensity={1.6}
            />
          </Suspense>
        </div>

        <div className="container relative mx-auto px-4 w-full">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-8">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-foreground leading-[1.05] tracking-tight max-w-5xl mx-auto">
                Support that
                <span className="block bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent animate-gradient mt-2">
                  adapts to your industry
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                One platform, three powerful AI tools—customized for B2B SaaS, E-commerce, and Fintech.
                Automate 70% of tickets while delivering industry-specific workflows your team actually needs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                <RouteButton
                  size="lg"
                  className="text-base px-10 py-6 shadow-xl shadow-primary/20"
                  href="/contact-sales"
                >
                  See it in action
                  <ArrowRight className="ml-2 h-5 w-5" />
                </RouteButton>
                <RouteButton
                  size="lg"
                  variant="outline"
                  className="text-base px-10 py-6"
                  href="#solutions"
                >
                  Explore solutions
                </RouteButton>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>SOC 2 Type II in progress</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-Industry Stats Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/10 via-muted/5 to-transparent" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                Results that scale across industries
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Whether you're in SaaS, E-commerce, or Fintech—Pullse delivers measurable impact from day one
              </p>
            </div>

            <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {crossIndustryStats.map((stat, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-8 text-center shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                  <div className="relative space-y-2">
                    <div className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                      <AnimatedCounter
                        end={stat.value}
                        suffix={stat.suffix}
                        trigger={statsAnimated}
                        duration={2000}
                      />
                    </div>
                    <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The 3 Pillars - Expanded */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08),transparent_60%)]" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 space-y-6">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-4xl mx-auto leading-tight">
                Three AI tools. One platform. Infinite adaptability.
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                Every solution includes these three core pillars—each intelligently adapted to your industry's workflows
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={index}
                    className={`group relative overflow-hidden rounded-3xl border-2 ${pillar.borderColor} bg-card transition-all hover:shadow-2xl hover:-translate-y-2`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-5`} />

                    <div className="relative p-10 space-y-8">
                      {/* Header */}
                      <div className="space-y-4">
                        <div className={`inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${pillar.color} shadow-lg`}>
                          <Icon className="h-10 w-10 text-background" />
                        </div>
                        <div>
                          <div className={`text-xs font-bold uppercase tracking-wider ${pillar.textColor} mb-2`}>
                            {pillar.subtitle}
                          </div>
                          <h3 className="text-3xl font-bold text-foreground">{pillar.title}</h3>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-base text-muted-foreground leading-relaxed">
                        {pillar.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-3">
                        {pillar.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className={`mt-1 h-5 w-5 rounded-full ${pillar.bgColor} border ${pillar.borderColor} flex items-center justify-center shrink-0`}>
                              <CheckCircle2 className={`h-3 w-3 ${pillar.textColor}`} />
                            </div>
                            <p className="text-sm text-foreground/80">{feature}</p>
                          </div>
                        ))}
                      </div>

                      {/* Stat */}
                      <div className={`p-6 rounded-2xl bg-gradient-to-br ${pillar.color} text-background`}>
                        <div className="text-5xl font-black mb-2">{pillar.stat}</div>
                        <div className="text-sm font-semibold opacity-90">{pillar.statLabel}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Industry Adaptation Comparison */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-background" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                Same platform, different superpowers
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See how the same three tools adapt their behavior based on your industry
              </p>
            </div>

            <div className="space-y-6">
              {industryAdaptations.map((industry, index) => {
                const Icon = industry.icon;
                return (
                  <div
                    key={index}
                    className={`relative overflow-hidden rounded-3xl border-2 ${industry.borderColor} bg-card p-8 transition-all hover:shadow-xl`}
                  >
                    <div className={`absolute inset-0 ${industry.bgColor} opacity-30`} />

                    <div className="relative">
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`h-16 w-16 rounded-2xl ${industry.bgColor} border ${industry.borderColor} flex items-center justify-center shadow-lg`}>
                          <Icon className={`h-8 w-8 ${industry.color}`} />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground">{industry.industry}</h3>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        {industry.examples.map((example, i) => (
                          <div key={i} className="p-4 rounded-xl bg-background/50 border border-border/40">
                            <div className={`text-xs font-bold uppercase tracking-wider ${industry.color} mb-2`}>
                              {example.tool}
                            </div>
                            <p className="text-sm text-foreground/80">{example.action}</p>
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

      {/* Choose Your Industry - Solution Cards */}
      <section id="solutions" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08),transparent_60%)]" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 space-y-6">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                Ready to see it in action?
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Explore industry-specific workflows, features, and results
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {industrySolutions.map((solution, index) => {
                const Icon = solution.icon;
                return (
                  <div
                    key={index}
                    className={`group relative overflow-hidden rounded-3xl border-2 ${solution.borderColor} bg-card transition-all hover:border-primary/40 hover:shadow-2xl hover:-translate-y-2`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-50`} />

                    <div className="relative p-8 space-y-8">
                      {/* Header */}
                      <div className="space-y-4">
                        <div className={`inline-flex h-20 w-20 items-center justify-center rounded-2xl ${solution.bgColor} border-2 ${solution.borderColor} shadow-lg`}>
                          <Icon className={`h-10 w-10 ${solution.textColor}`} />
                        </div>
                        <div>
                          <div className={`text-xs font-bold uppercase tracking-wider ${solution.textColor} mb-2`}>
                            {solution.category}
                          </div>
                          <h3 className="text-3xl font-bold text-foreground">{solution.title}</h3>
                        </div>
                      </div>

                      {/* Headline */}
                      <p className="text-xl font-semibold text-foreground leading-tight">
                        {solution.headline}
                      </p>

                      {/* Pain Points as Questions */}
                      <div className="space-y-3">
                        {solution.painPoints.map((point, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className={`mt-1 h-5 w-5 rounded-full ${solution.bgColor} border ${solution.borderColor} flex items-center justify-center shrink-0`}>
                              <HelpCircle className={`h-3 w-3 ${solution.textColor}`} />
                            </div>
                            <p className="text-sm text-muted-foreground">{point}</p>
                          </div>
                        ))}
                      </div>

                      {/* Key Stat */}
                      <div className={`p-6 rounded-2xl bg-gradient-to-br ${solution.gradient} border-2 ${solution.borderColor}`}>
                        <div className={`text-5xl font-black ${solution.textColor} mb-2`}>
                          {solution.stat.value}
                        </div>
                        <div className="text-sm font-semibold text-foreground/80">{solution.stat.label}</div>
                      </div>

                      {/* CTA Button */}
                      <Link
                        href={solution.link}
                        className={`block w-full py-4 px-6 rounded-xl bg-gradient-to-r ${solution.ctaGradient} text-background font-bold text-center shadow-lg hover:shadow-xl hover:scale-105 transition-all`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <span>Explore {solution.title} Solution</span>
                          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-muted/10 via-muted/5 to-transparent">
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            {/* Header */}
            <div className="text-center mb-12 space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Calculate your support savings
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See how Pullse could reduce your support costs while improving quality and response times
              </p>
            </div>

            {/* Calculator Card */}
            <div className="relative overflow-hidden rounded-[28px] border border-primary/30 bg-gradient-to-br from-card via-card to-card/90 p-10 md:p-12 shadow-2xl backdrop-blur-sm">
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
              <div className="relative">
                <RoiCalculator />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Comparison Table */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08),transparent_60%)]" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                Still deciding? Compare solutions
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See how each solution stacks up at a glance
              </p>
            </div>

            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-xl">
                  <table className="min-w-full divide-y divide-border/40">
                    <thead className="bg-muted/30">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-bold text-foreground uppercase tracking-wider">
                          {/* Empty header cell */}
                        </th>
                        <th className="px-6 py-4 text-center">
                          <div className="flex flex-col items-center gap-2">
                            <div className="h-12 w-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                              <Briefcase className="h-6 w-6 text-blue-600" />
                            </div>
                            <span className="text-sm font-bold text-foreground">B2B SaaS</span>
                          </div>
                        </th>
                        <th className="px-6 py-4 text-center">
                          <div className="flex flex-col items-center gap-2">
                            <div className="h-12 w-12 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                              <ShoppingCart className="h-6 w-6 text-green-600" />
                            </div>
                            <span className="text-sm font-bold text-foreground">E-commerce</span>
                          </div>
                        </th>
                        <th className="px-6 py-4 text-center">
                          <div className="flex flex-col items-center gap-2">
                            <div className="h-12 w-12 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                              <Shield className="h-6 w-6 text-red-600" />
                            </div>
                            <span className="text-sm font-bold text-foreground">Fintech</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40">
                      {comparisonData.map((row, index) => (
                        <tr key={index} className="hover:bg-muted/20 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-foreground">
                            {row.label}
                          </td>
                          <td className="px-6 py-4 text-center text-sm text-muted-foreground">
                            {row.saas}
                          </td>
                          <td className="px-6 py-4 text-center text-sm text-muted-foreground">
                            {row.ecommerce}
                          </td>
                          <td className="px-6 py-4 text-center text-sm text-muted-foreground">
                            {row.fintech}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-muted/20">
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4 text-center">
                          <Link
                            href="/solutions/b2b-saas"
                            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <span>Explore</span>
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Link
                            href="/solutions/ecommerce"
                            className="inline-flex items-center gap-2 text-sm font-bold text-green-600 hover:text-green-700 transition-colors"
                          >
                            <span>Explore</span>
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Link
                            href="/solutions/fintech"
                            className="inline-flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700 transition-colors"
                          >
                            <span>Explore</span>
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Showcase */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-background" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Execute actions across your entire business stack
              </h2>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Pull data and trigger actions in real-time across your CRM, payment processor, e-commerce platform, and 100+ business tools. No migration, no middleware, no sync delays.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                {integrations.map((integration, index) => {
                  const Icon = integration.icon;
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-border/40 bg-card hover:border-primary/30 hover:shadow-lg transition-all"
                    >
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <span className="text-sm font-semibold text-foreground">{integration.name}</span>
                    </div>
                  );
                })}
              </div>

              <p className="text-sm text-muted-foreground pt-4">
                And 50+ more integrations through API and webhooks
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Not Sure Section - Updated */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08),transparent_60%)]" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-card via-card to-card/90 p-12 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.15),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--primary)/0.15),transparent_50%)]" />

              <div className="relative text-center space-y-8">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 shadow-lg">
                  <HelpCircle className="h-8 w-8 text-primary" />
                </div>

                <div className="space-y-4">
                  <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                    Not sure which solution is right for you?
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Let's talk. We'll show you how Pullse adapts to your specific workflows, team size, and goals.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <RouteButton
                    size="lg"
                    className="text-base px-10 py-6 shadow-xl shadow-primary/20"
                    href="/contact-sales"
                  >
                    Talk to our solutions team
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </RouteButton>
                </div>

                <div className="flex items-center justify-center gap-6 pt-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Free consultation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Custom demo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>No commitment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Improved */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.12),transparent_60%)]" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-10">
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Transform your support from cost center to
                <span className="block bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent mt-2">
                  competitive advantage
                </span>
              </h2>

              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join teams that have automated 70% of tickets while delivering faster, more personalized support than ever before.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <RouteButton
                size="lg"
                className="text-base px-10 py-6 shadow-xl shadow-primary/20"
                href="/contact-sales"
              >
                Schedule a demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </RouteButton>
              <RouteButton
                size="lg"
                variant="outline"
                className="text-base px-10 py-6"
                href="/pricing"
              >
                View pricing
              </RouteButton>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Setup assistance included</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary" />
                <span>SOC 2 Type II in progress</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SolutionsHub;
