'use client';

import { useEffect, useState, useRef, Suspense } from "react";
import { motion } from "framer-motion";
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
    { value: 80, suffix: "%+", label: "automation rate" },
    { value: 8, suffix: "s", label: "avg response time" },
    { value: 60, suffix: "%", label: "cost reduction" },
    { value: 24, suffix: "/7", label: "availability" },
  ];

  const pillars = [
    {
      icon: Bot,
      title: "AI Chatbots",
      subtitle: "Autonomous Execution",
      description: "Stop making customers wait for simple tasks. AI agents that execute refunds, create tickets, update accounts, and handle complex workflows automatically—resolving 70% of tickets without human intervention.",
      stat: "70%",
      statLabel: "tickets resolved automatically",
      roiText: "Save $3,500+ per agent monthly on routine tasks",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      textColor: "text-blue-600",
      features: [
        "Execute Stripe refunds in 8 seconds vs. 5 min manually → save 12 hours/week",
        "Create Jira tickets with full context → eliminate 20+ back-and-forth messages",
        "Update account settings across systems → reduce errors from 15% to <1%",
        "Send Slack alerts to right teams → cut escalation time from 2 hours to 30 seconds",
      ],
    },
    {
      icon: Brain,
      title: "AI Copilots",
      subtitle: "Real-Time Intelligence",
      description: "Turn every agent into your best agent. AI that suggests perfect responses, surfaces knowledge instantly, and automates repetitive work—making agents 3x faster while improving quality.",
      stat: "3x",
      statLabel: "faster resolution time",
      roiText: "Handle 3x more tickets with same team size",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      textColor: "text-purple-600",
      features: [
        "AI-suggested responses in real-time → reduce typing time by 80%",
        "Auto-summarize long conversations → save 5 min per handoff",
        "Surface relevant help articles instantly → eliminate 15 min of manual searching",
        "Detect sentiment and escalation triggers → prevent 90% of negative reviews",
      ],
    },
    {
      icon: ClipboardCheck,
      title: "Auto-QA",
      subtitle: "Quality at Scale",
      description: "Maintain perfect quality without the manual work. Monitor 100% of conversations, catch compliance issues instantly, and coach agents with specific feedback—eliminating the need for QA managers to review manually.",
      stat: "100%",
      statLabel: "conversation coverage",
      roiText: "Replace 40 hours weekly of manual QA review",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      textColor: "text-green-600",
      features: [
        "Score every conversation automatically → eliminate 5-10% sample bias",
        "Identify training opportunities → improve CSAT by 25% in 30 days",
        "Track compliance violations → prevent $50K+ fines from missed regulations",
        "Generate coaching insights → reduce manager time on QA by 90%",
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
      description: "Technical support that understands your product complexity",
      roi: "Reduce churn by 28% with faster technical resolutions",
      examples: [
        { tool: "Chatbot", action: "Triggers GitHub issue creation for bugs", impact: "→ Eliminates 10+ messages between support and engineering" },
        { tool: "Copilot", action: "Surfaces API docs during integration help", impact: "→ Cut integration support time from 2 hours to 15 minutes" },
        { tool: "Auto-QA", action: "Flags missed upsell opportunities", impact: "→ Capture $50K+ in expansion revenue per quarter" },
      ],
    },
    {
      industry: "E-commerce",
      icon: ShoppingCart,
      color: "text-green-600",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      description: "Handle peak season volume without scaling your team",
      roi: "Reduce WISMO tickets by 62% during Black Friday",
      examples: [
        { tool: "Chatbot", action: "Auto-processes returns via Shopify", impact: "→ Process 500+ returns daily vs. 50 manually" },
        { tool: "Copilot", action: "Suggests product recommendations", impact: "→ Increase average order value by 18%" },
        { tool: "Auto-QA", action: "Monitors holiday season performance", impact: "→ Catch issues before they become viral complaints" },
      ],
    },
    {
      industry: "Fintech",
      icon: Shield,
      color: "text-red-600",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30",
      description: "Compliance-first support that protects your customers and your license",
      roi: "Respond to fraud in <8 seconds vs. 2+ min industry average",
      examples: [
        { tool: "Chatbot", action: "Freezes accounts on fraud detection", impact: "→ Prevent $100K+ in fraud losses annually" },
        { tool: "Copilot", action: "Guides through KYC verification", impact: "→ Complete verifications 5x faster with zero compliance risk" },
        { tool: "Auto-QA", action: "Ensures regulatory compliance", impact: "→ Pass audits without dedicated compliance reviews" },
      ],
    },
  ];

  const industrySolutions = [
    {
      icon: Briefcase,
      title: "B2B SaaS",
      category: "Software & Technology",
      headline: "Convert more trials and reduce churn with technical support that scales",
      subheadline: "Support that understands your API, automates technical troubleshooting, and turns support into a growth engine",
      painPoints: [
        "Losing 40% of trials due to integration issues?",
        "Technical questions taking 2+ hours to resolve?",
        "Missing upsell opportunities in every conversation?",
      ],
      stat: { value: "28%", label: "churn reduction in first 90 days" },
      roi: "Save $180K annually per 10 agents",
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
      headline: "Handle 10x Black Friday volume without hiring seasonal staff",
      subheadline: "Automate order tracking, returns, and exchanges while your team focuses on complex issues",
      painPoints: [
        "Drowning in 1,000+ daily 'Where's my order?' tickets?",
        "Returns taking 15+ minutes to process manually?",
        "Peak season forcing you to hire (and train) 50+ temps?",
      ],
      stat: { value: "62%", label: "fewer WISMO tickets automatically resolved" },
      roi: "Save $240K during holiday season vs. hiring temps",
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
      headline: "Stop fraud in seconds while maintaining compliance",
      subheadline: "SOC 2 compliant support that freezes fraud, verifies KYC, and passes every audit automatically",
      painPoints: [
        "Fraud cases taking 2+ minutes = $100K+ annual losses?",
        "Failing SOC 2 audits due to inconsistent support?",
        "Payment failures driving 15%+ customer churn?",
      ],
      stat: { value: "<8s", label: "average fraud response time" },
      roi: "Prevent $500K+ in fraud losses annually",
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
            <div className="text-center mb-16 space-y-10">
              <h1 className="text-[2.75rem] leading-[1.1] sm:text-6xl sm:leading-[1.1] lg:text-7xl lg:leading-[1.05] xl:text-[5.5rem] xl:leading-[1.05] font-black text-foreground tracking-[-0.02em] max-w-5xl mx-auto">
                Automate 80% of support.
                <span className="block bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent animate-gradient mt-3 lg:mt-4">
                  Cut costs by 60%.
                </span>
              </h1>

              <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground/90 leading-[1.6] sm:leading-[1.65] max-w-3xl mx-auto font-normal">
                Industry-specific AI that understands your workflows—whether you're running SaaS, E-commerce, or Fintech.
                <span className="block mt-4 text-foreground font-semibold text-xl sm:text-2xl lg:text-[1.65rem] leading-[1.5]">
                  Resolve tickets in 8 seconds. Reclaim 15+ agent hours per week. Start saving in 14 days.
                </span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                <RouteButton
                  size="lg"
                  className="text-base px-10 py-6 shadow-xl shadow-primary/20"
                  href="#roi-calculator"
                >
                  Calculate your ROI
                  <TrendingUp className="ml-2 h-5 w-5" />
                </RouteButton>
                <RouteButton
                  size="lg"
                  variant="outline"
                  className="text-base px-10 py-6"
                  href="#solutions"
                >
                  See your industry
                  <ArrowRight className="ml-2 h-5 w-5" />
                </RouteButton>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-11 h-11 rounded-full bg-primary/10 ring-1 ring-primary/20">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-foreground tracking-tight">Setup in 1 hour</div>
                    <div className="text-xs text-muted-foreground/80 leading-relaxed">Start automating today</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-11 h-11 rounded-full bg-primary/10 ring-1 ring-primary/20">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-foreground tracking-tight">14-day free trial</div>
                    <div className="text-xs text-muted-foreground/80 leading-relaxed">No credit card needed</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-11 h-11 rounded-full bg-primary/10 ring-1 ring-primary/20">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-foreground tracking-tight">ROI in 14 days</div>
                    <div className="text-xs text-muted-foreground/80 leading-relaxed">See savings immediately</div>
                  </div>
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
                Performance that beats industry standards
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See how Pullse compares to traditional support platforms—real metrics that translate to immediate cost savings
              </p>
            </div>

            <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {crossIndustryStats.map((stat, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-8 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                  <div className="relative space-y-3">
                    <div className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                      <AnimatedCounter
                        end={stat.value}
                        suffix={stat.suffix}
                        trigger={statsAnimated}
                        duration={2000}
                      />
                    </div>
                    <div className="text-sm font-semibold text-foreground uppercase tracking-wide">
                      {stat.label}
                    </div>
                    <div className="text-xs text-muted-foreground leading-relaxed pt-2 border-t border-border/40">
                      {index === 0 && "vs. 30% industry average—handle 4x more tickets with same team"}
                      {index === 1 && "vs. 2-3 min average—resolve issues before customers get frustrated"}
                      {index === 2 && "vs. traditional setup—save $50K+ annually on support operations"}
                      {index === 3 && "Always-on support without hiring night shifts or weekend staff"}
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-sm text-muted-foreground">
                Based on industry benchmarks from Gartner, Forrester, and internal analysis across 100+ support teams
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The 3 Pillars - Expanded */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08),transparent_60%)]" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 space-y-5">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-4xl mx-auto leading-tight">
                From overwhelmed agents to automated excellence
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                Three AI tools working together to eliminate busywork, accelerate resolutions, and maintain quality at scale
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <span className="text-sm font-semibold text-primary">Save 15+ hours per agent weekly</span>
                </div>
                <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <span className="text-sm font-semibold text-primary">Reduce resolution time by 75%</span>
                </div>
                <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <span className="text-sm font-semibold text-primary">Zero quality compromise</span>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={index}
                    className={`group relative overflow-hidden rounded-3xl border-2 ${pillar.borderColor} bg-card transition-all hover:shadow-2xl hover:-translate-y-2`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-5`} />

                    <div className="relative p-8 space-y-6">
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
                      <div className={`p-6 rounded-2xl bg-gradient-to-br ${pillar.color} text-background space-y-3`}>
                        <div>
                          <div className="text-5xl font-black mb-2">{pillar.stat}</div>
                          <div className="text-sm font-semibold opacity-90">{pillar.statLabel}</div>
                        </div>
                        <div className="pt-3 border-t border-background/20">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 opacity-90" />
                            <div className="text-xs font-medium opacity-90">{pillar.roiText}</div>
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

      {/* Industry Adaptation Comparison */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-background" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                AI that understands your industry—not just support
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our platform automatically adapts to your tools, workflows, and business rules. No custom development required.
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

                    <div className="relative space-y-6">
                      <div className="flex items-start gap-4">
                        <div className={`h-16 w-16 rounded-2xl ${industry.bgColor} border ${industry.borderColor} flex items-center justify-center shadow-lg shrink-0`}>
                          <Icon className={`h-8 w-8 ${industry.color}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-foreground mb-2">{industry.industry}</h3>
                          <p className="text-base text-muted-foreground mb-3">{industry.description}</p>
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                            <TrendingUp className="w-4 h-4 text-primary" />
                            <span className="text-sm font-semibold text-primary">{industry.roi}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        {industry.examples.map((example, i) => (
                          <div key={i} className="p-5 rounded-xl bg-background/50 border border-border/40 hover:border-primary/40 transition-colors group">
                            <div className={`text-xs font-bold uppercase tracking-wider ${industry.color} mb-2`}>
                              {example.tool}
                            </div>
                            <p className="text-sm text-foreground font-medium mb-2">{example.action}</p>
                            <p className="text-xs text-muted-foreground leading-relaxed">{example.impact}</p>
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
      <section id="solutions" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08),transparent_60%)]" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 space-y-5">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                Choose your industry to see exact ROI
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Each solution is pre-configured for your industry's workflows, challenges, and compliance requirements
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

                    <div className="relative p-6 space-y-6">
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

                      {/* Headline & Subheadline */}
                      <div className="space-y-3">
                        <p className="text-xl font-bold text-foreground leading-tight">
                          {solution.headline}
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {solution.subheadline}
                        </p>
                      </div>

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

                      {/* Key Stat & ROI */}
                      <div className="space-y-3">
                        <div className={`p-6 rounded-2xl bg-gradient-to-br ${solution.gradient} border-2 ${solution.borderColor}`}>
                          <div className={`text-5xl font-black ${solution.textColor} mb-2`}>
                            {solution.stat.value}
                          </div>
                          <div className="text-sm font-semibold text-foreground/80">{solution.stat.label}</div>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-primary/10 border border-primary/20">
                          <TrendingUp className="w-4 h-4 text-primary shrink-0" />
                          <p className="text-sm font-semibold text-primary">{solution.roi}</p>
                        </div>
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
      <section id="roi-calculator" className="relative py-20 overflow-hidden bg-gradient-to-b from-muted/10 via-muted/5 to-transparent">
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            {/* Header */}
            <div className="text-center mb-8 space-y-5">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                See your exact savings in 60 seconds
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Calculate how much you'll save by automating 80% of tickets vs. hiring more agents or paying per-resolution fees
              </p>
              <div className="flex flex-wrap justify-center gap-6 pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>Compare vs. Intercom, Zendesk, Freshdesk</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>See monthly & annual savings</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>No email required</span>
                </div>
              </div>
            </div>

            {/* Calculator Card */}
            <div className="relative overflow-hidden rounded-[28px] border border-primary/30 bg-gradient-to-br from-card via-card to-card/90 p-8 md:p-10 shadow-2xl backdrop-blur-sm">
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
              <div className="relative">
                <RoiCalculator />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Comparison Table */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08),transparent_60%)]" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 space-y-4">
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
      <section className="relative py-40 overflow-hidden">
        {/* Animated gradient orbs background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-6 relative">
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-3xl border border-primary/30 bg-gradient-to-br from-card/50 via-background/30 to-card/50 backdrop-blur-2xl p-12 lg:p-16 shadow-2xl text-center overflow-hidden">

              {/* Inner glow effect */}
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/30 via-purple-600/30 to-indigo-600/30 opacity-50 blur-2xl" />

              <div className="relative space-y-8">
                <div className="space-y-6">
                  <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-foreground leading-tight">
                    Start automating 80% of tickets
                    <span className="block bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent mt-3">
                      in 14 days or less
                    </span>
                  </h2>

                  <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    Setup takes 1 hour. ROI starts immediately. No credit card required for your 14-day trial.
                  </p>

                  <div className="flex flex-wrap justify-center gap-6 pt-2">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">1 hour</div>
                      <div className="text-sm text-muted-foreground">Setup time</div>
                    </div>
                    <div className="h-12 w-px bg-border"></div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">14 days</div>
                      <div className="text-sm text-muted-foreground">To see ROI</div>
                    </div>
                    <div className="h-12 w-px bg-border"></div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">$0</div>
                      <div className="text-sm text-muted-foreground">To get started</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
                  <motion.div whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.98 }}>
                    <RouteButton
                      size="lg"
                      className="text-base px-10 py-6 shadow-xl shadow-primary/20"
                      href="/contact-sales"
                    >
                      Start free trial
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </RouteButton>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.98 }}>
                    <RouteButton
                      size="lg"
                      variant="outline"
                      className="text-base px-10 py-6"
                      href="#roi-calculator"
                    >
                      Calculate savings
                      <TrendingUp className="ml-2 h-5 w-5" />
                    </RouteButton>
                  </motion.div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-border/30">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>1-hour setup • Live today, not next quarter</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>No credit card • Full 14-day trial included</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Setup help included • We'll get you to 80% automation</span>
                  </div>
                </div>
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
