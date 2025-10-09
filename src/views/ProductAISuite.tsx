'use client';

import { useEffect, useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import RouteButton from "@/components/RouteButton";
import MagicBento from "@/components/MagicBento";
import type { CardData } from "@/components/MagicBento";
import {
  Bot,
  Sparkles,
  MessageSquare,
  FileText,
  Heart,
  Shield,
  CheckCircle2,
  ArrowRight,
  Zap,
  Users,
  Clock,
  Target,
  TrendingUp,
  BarChart3,
  Lock,
  Database,
  Layers,
  RefreshCw,
  Play,
  ShoppingCart,
  Code,
  CreditCard,
  Settings,
  Brain,
  LifeBuoy,
} from "lucide-react";

// Animated Counter Component
const AnimatedCounter = ({ end, suffix = '', prefix = '', duration = 2000, trigger = false }: { end: number; suffix?: string; prefix?: string; duration?: number; trigger?: boolean }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!trigger || hasStarted) return;
    setHasStarted(true);

    const startTime = Date.now();
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [trigger, hasStarted, end, duration]);

  return <>{prefix}{count}{suffix}</>;
};

const ProductAISuite = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [statsAnimated, setStatsAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      setScrollProgress(progress);

      // Stats animation trigger
      if (statsRef.current && !statsAnimated) {
        const rect = statsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          setStatsAnimated(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [statsAnimated]);

  // AI Tools Bento Cards - 6 cards configured for MagicBento
  const aiToolsCards: CardData[] = [
    {
      color: 'hsl(var(--card))',
      title: 'AI Chatbots',
      description: 'Deploy autonomous bots across web, Slack, WhatsApp, and email. Handle routine questions 24/7 with smart handoff to humans when needed.',
      label: 'Customer-Facing',
      icon: Bot,
    },
    {
      color: 'hsl(var(--card))',
      title: 'AI Copilots',
      description: 'Give agents instant AI assistance. Suggest answers, retrieve knowledge, draft responses—without ever touching customer conversations.',
      label: 'Agent-Facing',
      icon: Sparkles,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Auto QA',
      description: 'AI evaluates 100% of conversations on quality parameters. No sampling, complete visibility into support quality.',
      label: '100% Coverage',
      icon: Shield,
    },
    {
      color: 'hsl(var(--card))',
      title: 'AI Rewriting',
      description: 'Transform tone instantly—formal to casual, technical to simple. Perfect brand voice compliance, every time.',
      label: 'Tone Perfection',
      icon: FileText,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Summaries',
      description: 'Auto-generated summaries with key points, action items, and sentiment after every conversation.',
      label: 'Context in Seconds',
      icon: MessageSquare,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Sentiment Analysis',
      description: 'Real-time emotion tracking throughout conversations. Detect escalations early, identify coaching moments.',
      label: 'Measure What Matters',
      icon: Heart,
    },
  ];

  return (
    <div className="min-h-screen relative bg-background text-foreground">
      <PageLiquidBackground />

      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-indigo-500 z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      <Navigation />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_50%)]" />

          <div className="container mx-auto px-6 relative">
            <div className="text-center max-w-6xl mx-auto space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-4">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Complete AI Platform</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-foreground leading-[1.05] tracking-tight">
                One AI engine.
                <span className="block bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-gradient mt-2">
                  Six powerful tools.
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                From customer-facing chatbots to agent copilots, automated QA to intelligent summaries. All trained on your content, all working in harmony.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <RouteButton href="/book-demo" className="group relative px-8 py-4 bg-gradient-to-r from-primary to-purple-600 text-background font-bold rounded-xl shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all hover:scale-105">
                  Book a Demo
                  <ArrowRight className="ml-2 h-5 w-5 inline-block group-hover:translate-x-1 transition-transform" />
                </RouteButton>
                <RouteButton href="/contact" className="group px-8 py-4 border-2 border-primary/30 bg-card/50 backdrop-blur-sm text-foreground font-bold rounded-xl hover:bg-primary/10 hover:border-primary transition-all">
                  Talk to Sales
                  <Play className="ml-2 h-5 w-5 inline-block group-hover:scale-110 transition-transform" />
                </RouteButton>
              </div>

              {/* Trust Signals */}
              <div className="flex flex-wrap gap-6 justify-center items-center pt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>50+ Enterprise Customers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>2M+ Conversations Powered</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>SOC 2 Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* All 6 AI Tools - MagicBento */}
        <section className="relative py-20 bg-gradient-to-b from-muted/10 to-transparent">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-4">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Complete AI Suite</span>
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-4">
                Six tools, one platform
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Everything you need to deploy intelligent AI across your support operations.
              </p>
            </div>

            <div className="max-w-6xl mx-auto mb-16">
              <MagicBento cardData={aiToolsCards} />
            </div>

            {/* Quick Feature Highlights */}
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="group p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-600 shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Database className="h-6 w-6 text-background" />
                </div>
                <h4 className="font-bold mb-2 group-hover:text-primary transition-colors">One Content Center</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Train once, deploy everywhere. All tools share the same knowledge base.
                </p>
              </div>

              <div className="group p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <RefreshCw className="h-6 w-6 text-background" />
                </div>
                <h4 className="font-bold mb-2 group-hover:text-primary transition-colors">Continuous Improvement</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Every conversation makes every tool smarter. No data silos.
                </p>
              </div>

              <div className="group p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-primary shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Layers className="h-6 w-6 text-background" />
                </div>
                <h4 className="font-bold mb-2 group-hover:text-primary transition-colors">Flexible Deployment</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Start with one tool, add more anytime. Deploy incrementally or all at once.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Two Deployment Modes */}
        <section className="relative py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-4">
                <Layers className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Two Deployment Modes</span>
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-4">
                Same engine,
                <span className="block bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-gradient">
                  different reach
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Deploy AI that talks to customers or assists agents—or both. Same intelligence, different applications.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Chatbots */}
              <div className="group relative p-8 rounded-3xl border border-border/50 bg-gradient-to-br from-primary/5 via-card/50 to-transparent backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-purple-600 shadow-lg mb-6 group-hover:scale-110 transition-transform">
                  <Bot className="h-8 w-8 text-background" />
                </div>

                <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                  AI Chatbots
                </h3>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Customer-facing deflection at scale
                </p>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">24/7 autonomous support without human intervention</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Multi-channel: web, Slack, WhatsApp, email, MS Teams</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Smart handoff to humans with full context</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Execute actions: refunds, lookups, updates</span>
                  </li>
                </ul>

                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-semibold text-primary w-fit">
                  <BarChart3 className="h-4 w-4" />
                  <span>87% average deflection rate</span>
                </div>
              </div>

              {/* Copilots */}
              <div className="group relative p-8 rounded-3xl border border-border/50 bg-gradient-to-br from-purple-500/5 via-card/50 to-transparent backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles className="h-8 w-8 text-background" />
                </div>

                <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                  AI Copilots
                </h3>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Agent-facing acceleration for complex issues
                </p>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">On-demand assistance triggered by agents</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Never talks to customers—pure augmentation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Real-time knowledge retrieval and suggestions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Draft responses in your brand voice</span>
                  </li>
                </ul>

                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm font-semibold text-purple-500 w-fit">
                  <TrendingUp className="h-4 w-4" />
                  <span>50% faster new hire ramp time</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chatbots Use Cases */}
        <section className="relative py-20 bg-gradient-to-b from-muted/10 via-background to-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-4">
                <Bot className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Chatbot Use Cases</span>
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-4">
                Where chatbots excel
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Autonomous AI handling customer conversations across industries and use cases.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                { icon: ShoppingCart, title: 'Order Tracking', desc: '"Where\'s my order?" handled instantly. Check status, provide updates, send tracking links—no human needed.', tag: 'E-commerce, Retail', color: 'from-primary to-purple-600' },
                { icon: Clock, title: 'After-Hours Support', desc: 'Customers don\'t wait for business hours. Bots provide 24/7 coverage for common questions and basic troubleshooting.', tag: 'All Industries', color: 'from-purple-600 to-indigo-600' },
                { icon: CreditCard, title: 'Account Inquiries', desc: 'Check balances, update billing info, verify transactions. Secure, instant account management.', tag: 'Financial Services, SaaS', color: 'from-indigo-600 to-primary' },
                { icon: LifeBuoy, title: 'FAQ Deflection', desc: '"How do I reset my password?" answered instantly. Deflect repetitive questions, free up agents for complex issues.', tag: 'SaaS, Tech Support', color: 'from-primary to-purple-600' },
                { icon: Users, title: 'Lead Qualification', desc: 'Engage prospects, ask qualifying questions, route hot leads to sales. Convert while you sleep.', tag: 'Sales, Marketing', color: 'from-purple-600 to-pink-600' },
                { icon: Settings, title: 'Self-Service Actions', desc: 'Process refunds, cancel subscriptions, reschedule appointments. Empower customers to help themselves.', tag: 'Subscriptions, Services', color: 'from-indigo-600 to-purple-600' },
              ].map((useCase, index) => {
                const Icon = useCase.icon;
                return (
                  <div key={index} className="group p-6 rounded-2xl border border-border/50 bg-gradient-to-br from-primary/5 via-card/50 to-transparent backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${useCase.color} shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon className="h-5 w-5 text-background" />
                      </div>
                      <h4 className="font-bold group-hover:text-primary transition-colors">{useCase.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      {useCase.desc}
                    </p>
                    <div className="text-xs font-semibold text-primary">{useCase.tag}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Copilots Use Cases */}
        <section className="relative py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm mb-4">
                <Sparkles className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium text-purple-500">Copilot Use Cases</span>
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-4">
                Where copilots shine
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                AI-powered agent assistance for complex scenarios that need a human touch.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                { icon: Users, title: 'New Hire Onboarding', desc: 'New agents productive in days, not weeks. Copilot suggests answers, surfaces relevant docs, acts as a senior mentor.', tag: '50% faster ramp time', color: 'from-purple-600 to-indigo-600' },
                { icon: Code, title: 'Technical Support', desc: 'Complex API questions, integration troubleshooting. Copilot retrieves docs, suggests solutions, drafts technical responses.', tag: 'Developer Tools, APIs', color: 'from-indigo-600 to-primary' },
                { icon: Brain, title: 'Product Complexity', desc: '300-page documentation? No problem. Copilot instantly surfaces the exact section agents need for any question.', tag: 'Enterprise Software', color: 'from-primary to-purple-600' },
                { icon: Shield, title: 'Compliance & Regulations', desc: 'Agents need precise, compliant language. Copilot ensures every response meets regulatory requirements.', tag: 'Healthcare, Finance, Legal', color: 'from-purple-600 to-pink-600' },
                { icon: TrendingUp, title: 'Peak Volume Periods', desc: 'Black Friday, product launches, incidents. Copilot helps agents handle 3x volume without sacrificing quality.', tag: 'Seasonal Businesses', color: 'from-indigo-600 to-purple-600' },
                { icon: CheckCircle2, title: 'Response Consistency', desc: 'Every agent sounds like your best rep. Copilot ensures consistent tone, accuracy, and brand voice across all responses.', tag: 'All Industries', color: 'from-primary to-indigo-600' },
              ].map((useCase, index) => {
                const Icon = useCase.icon;
                return (
                  <div key={index} className="group p-6 rounded-2xl border border-border/50 bg-gradient-to-br from-purple-500/5 via-card/50 to-transparent backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${useCase.color} shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon className="h-5 w-5 text-background" />
                      </div>
                      <h4 className="font-bold group-hover:text-primary transition-colors">{useCase.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      {useCase.desc}
                    </p>
                    <div className="text-xs font-semibold text-purple-500">{useCase.tag}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Shared Infrastructure */}
        <section className="relative py-20 bg-gradient-to-b from-muted/10 via-background to-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-4">
                <Database className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Built on Three Pillars</span>
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-4">
                The foundation that
                <span className="block bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-gradient">
                  powers it all
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Every AI tool shares the same three core systems. Train once, deploy everywhere, learn continuously.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Content Center */}
              <div className="group relative p-8 rounded-3xl border border-border/50 bg-gradient-to-br from-primary/5 via-card/50 to-transparent backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-purple-600 shadow-lg mb-6 group-hover:scale-110 transition-transform">
                  <Database className="h-8 w-8 text-background" />
                </div>

                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  Content Center
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Single source of truth for all AI
                </p>

                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Import from Notion, Confluence, Google Docs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Version control and content scheduling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Train once, power all tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Automatic freshness checks</span>
                  </li>
                </ul>
              </div>

              {/* Action Center */}
              <div className="group relative p-8 rounded-3xl border border-border/50 bg-gradient-to-br from-purple-500/5 via-card/50 to-transparent backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="h-8 w-8 text-background" />
                </div>

                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  Action Center
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Connect AI to your tools
                </p>

                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Pre-built: Stripe, Salesforce, Zendesk, HubSpot</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Custom REST API integrations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Execute refunds, lookups, updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Permission controls and approvals</span>
                  </li>
                </ul>
              </div>

              {/* Chat Engine */}
              <div className="group relative p-8 rounded-3xl border border-border/50 bg-gradient-to-br from-indigo-500/5 via-card/50 to-transparent backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-primary shadow-lg mb-6 group-hover:scale-110 transition-transform">
                  <MessageSquare className="h-8 w-8 text-background" />
                </div>

                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  Chat Engine
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Core AI brain
                </p>

                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Contextual understanding and memory</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Multi-turn reasoning and clarification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Learns from corrections and feedback</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Enterprise-grade security</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section ref={statsRef} className="relative py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-4">
                Built for scale,
                <span className="block bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-gradient">
                  designed for results
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="text-center p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm">
                <div className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-2">
                  <AnimatedCounter end={2} suffix="M+" trigger={statsAnimated} />
                </div>
                <p className="text-muted-foreground font-medium">Conversations powered</p>
              </div>

              <div className="text-center p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm">
                <div className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  <AnimatedCounter end={87} suffix="%" trigger={statsAnimated} />
                </div>
                <p className="text-muted-foreground font-medium">Average deflection rate</p>
              </div>

              <div className="text-center p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm">
                <div className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-indigo-600 to-primary bg-clip-text text-transparent mb-2">
                  <AnimatedCounter end={50} suffix="%" trigger={statsAnimated} />
                </div>
                <p className="text-muted-foreground font-medium">Faster agent ramp time</p>
              </div>

              <div className="text-center p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm">
                <div className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-2">
                  <AnimatedCounter end={4.5} suffix="min" trigger={statsAnimated} />
                </div>
                <p className="text-muted-foreground font-medium">Average resolution time</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.15),transparent_50%)]" />

          <div className="container mx-auto px-6 relative">
            <div className="text-center max-w-4xl mx-auto space-y-8">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-tight">
                Ready to deploy AI that
                <span className="block bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-gradient">
                  actually works?
                </span>
              </h2>

              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Book a personalized demo and see how the AI Suite can transform your support operations—from deflection to acceleration, QA to insights.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <RouteButton href="/book-demo" className="group relative px-10 py-5 bg-gradient-to-r from-primary to-purple-600 text-background font-bold rounded-xl shadow-2xl hover:shadow-3xl hover:shadow-primary/25 transition-all hover:scale-105 text-lg">
                  Book a Demo
                  <ArrowRight className="ml-2 h-6 w-6 inline-block group-hover:translate-x-1 transition-transform" />
                </RouteButton>
                <RouteButton href="/contact" className="group px-10 py-5 border-2 border-primary/30 bg-card/50 backdrop-blur-sm text-foreground font-bold rounded-xl hover:bg-primary/10 hover:border-primary transition-all text-lg">
                  Talk to Sales
                </RouteButton>
              </div>

              {/* Trust Signals */}
              <div className="flex flex-wrap gap-8 justify-center items-center pt-12">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Lock className="h-4 w-4 text-primary" />
                  <span>SOC 2 Compliant</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>GDPR Ready</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>50+ Enterprise Customers</span>
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

export default ProductAISuite;
