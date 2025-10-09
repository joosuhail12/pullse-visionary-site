'use client';

import { useEffect, useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import RouteButton from "@/components/RouteButton";
import MagicBento from "@/components/MagicBento";
import type { CardData } from "@/components/MagicBento";
import Link from "next/link";
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
  Globe,
  Lock,
  Palette,
  Code,
  GitBranch,
  Settings,
  Database,
  Layers,
  RefreshCw,
  Play,
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

  // AI Tools Bento Cards
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
      title: 'Conversation Summaries',
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

  // Platform Capabilities Bento Cards
  const platformCards: CardData[] = [
    {
      color: 'hsl(var(--card))',
      title: 'Continuous Learning',
      description: 'AI improves from every conversation, correction, and feedback. The more you use it, the smarter it gets.',
      label: 'Auto-Improvement',
      icon: RefreshCw,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Brand Voice Control',
      description: 'Configure tone, language, and personality across all AI tools. Sound like your brand, always.',
      label: 'Customization',
      icon: Palette,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Multi-Language Support',
      description: 'Deploy in 50+ languages with automatic translation. Global support, local experience.',
      label: 'Global Ready',
      icon: Globe,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Enterprise Security',
      description: 'SOC 2, GDPR compliant. Data encrypted at rest and in transit. Your data stays yours.',
      label: 'Secure',
      icon: Lock,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Analytics & Insights',
      description: 'Track performance, deflection rates, sentiment trends, and quality metrics in real-time.',
      label: 'Data-Driven',
      icon: BarChart3,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Custom Workflows',
      description: 'Build conditional logic and routing rules. Automate complex processes with visual builders.',
      label: 'Automation',
      icon: GitBranch,
    },
    {
      color: 'hsl(var(--card))',
      title: 'White-Label Ready',
      description: 'Remove Pullse branding, use your custom domain. Make it fully yours.',
      label: 'Your Brand',
      icon: Settings,
    },
    {
      color: 'hsl(var(--card))',
      title: 'API Access',
      description: 'Programmatic access to all AI capabilities. Build custom integrations and extensions.',
      label: 'Developer-Friendly',
      icon: Code,
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

        {/* Two Deployment Modes */}
        <section className="relative py-20 bg-gradient-to-b from-muted/10 to-transparent">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-4">
                <Layers className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Two Deployment Modes</span>
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-4">
                Same engine, different reach
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Deploy AI that talks to customers or assists agents—or both. Powered by the same intelligence, learning from every conversation.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Chatbots */}
              <div className="group relative p-8 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
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

                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                  <BarChart3 className="h-4 w-4" />
                  <span>87% average deflection rate</span>
                </div>
              </div>

              {/* Copilots */}
              <div className="group relative p-8 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
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

                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                  <TrendingUp className="h-4 w-4" />
                  <span>50% faster new hire ramp time</span>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-lg text-muted-foreground bg-gradient-to-r from-primary/10 via-purple-500/10 to-indigo-500/10 border border-primary/20 rounded-2xl px-8 py-6 inline-block backdrop-blur-sm">
                <span className="font-semibold text-foreground">Deploy both and get the best of both worlds.</span> Same training, different applications.
              </p>
            </div>
          </div>
        </section>

        {/* All 6 AI Tools */}
        <section className="relative py-20">
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
                Everything you need to deploy intelligent AI across your support operations—from deflection to acceleration, QA to insights.
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <MagicBento cardData={aiToolsCards} />
            </div>

            {/* Quick Feature Highlights */}
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-16">
              <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm text-center">
                <Database className="h-10 w-10 text-primary mx-auto mb-3" />
                <h4 className="font-bold mb-2">One Content Center</h4>
                <p className="text-sm text-muted-foreground">
                  Train once, deploy everywhere. All tools share the same knowledge base.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm text-center">
                <RefreshCw className="h-10 w-10 text-purple-500 mx-auto mb-3" />
                <h4 className="font-bold mb-2">Continuous Improvement</h4>
                <p className="text-sm text-muted-foreground">
                  Every conversation makes every tool smarter. No data silos.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm text-center">
                <Layers className="h-10 w-10 text-indigo-500 mx-auto mb-3" />
                <h4 className="font-bold mb-2">Flexible Deployment</h4>
                <p className="text-sm text-muted-foreground">
                  Start with one tool, add more anytime. Deploy incrementally or all at once.
                </p>
              </div>
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
                The foundation that powers it all
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Every AI tool shares the same three core systems. Train once, deploy everywhere, learn continuously.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Content Center */}
              <div className="group relative p-8 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
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
              <div className="group relative p-8 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
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
              <div className="group relative p-8 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
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
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-4">
                Built for scale, designed for results
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-16">
              <div className="text-center p-6">
                <div className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-2">
                  <AnimatedCounter end={2} suffix="M+" trigger={statsAnimated} />
                </div>
                <p className="text-muted-foreground font-medium">Conversations powered</p>
              </div>

              <div className="text-center p-6">
                <div className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  <AnimatedCounter end={87} suffix="%" trigger={statsAnimated} />
                </div>
                <p className="text-muted-foreground font-medium">Average deflection rate</p>
              </div>

              <div className="text-center p-6">
                <div className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-indigo-600 to-primary bg-clip-text text-transparent mb-2">
                  <AnimatedCounter end={50} suffix="%" trigger={statsAnimated} />
                </div>
                <p className="text-muted-foreground font-medium">Faster agent ramp time</p>
              </div>

              <div className="text-center p-6">
                <div className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-2">
                  <AnimatedCounter end={4.5} suffix="min" trigger={statsAnimated} />
                </div>
                <p className="text-muted-foreground font-medium">Average resolution time</p>
              </div>
            </div>

            {/* Testimonial */}
            <div className="max-w-4xl mx-auto">
              <div className="relative p-8 rounded-3xl border border-border/50 bg-gradient-to-br from-primary/5 via-card/50 to-purple-500/5 backdrop-blur-sm">
                <div className="text-center space-y-4">
                  <p className="text-xl text-foreground italic leading-relaxed">
                    "Pullse AI Suite transformed our support operations. We went from 5-10% QA coverage to 100%, deflected 87% of routine inquiries with chatbots, and cut new hire ramp time in half with copilots."
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-purple-600" />
                    <div className="text-left">
                      <div className="font-bold text-foreground">Sarah Chen</div>
                      <div className="text-sm text-muted-foreground">VP of Customer Success, TechCorp</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Capabilities */}
        <section className="relative py-20 bg-gradient-to-b from-muted/10 via-background to-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-4">
                <Settings className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Enterprise-Grade</span>
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-4">
                Everything you need for production
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Security, compliance, customization, and control built in from day one.
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <MagicBento cardData={platformCards} />
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="relative py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-4">
                <Target className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Real-World Impact</span>
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-4">
                See how teams use the suite
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <div className="p-6 rounded-2xl border border-border/50 bg-gradient-to-br from-primary/5 via-card/50 to-transparent">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="font-bold">E-commerce</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Chatbots handle order tracking and returns. Copilots help agents with product questions. Auto QA ensures quality at scale.
                </p>
                <div className="text-xs font-semibold text-primary">87% deflection, 4.5min resolution</div>
              </div>

              <div className="p-6 rounded-2xl border border-border/50 bg-gradient-to-br from-purple-500/5 via-card/50 to-transparent">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-purple-500" />
                  </div>
                  <h4 className="font-bold">SaaS</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Bots onboard new users. Copilots accelerate complex feature questions. Sentiment tracks satisfaction trends.
                </p>
                <div className="text-xs font-semibold text-purple-500">50% faster onboarding</div>
              </div>

              <div className="p-6 rounded-2xl border border-border/50 bg-gradient-to-br from-indigo-500/5 via-card/50 to-transparent">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                    <Users className="h-5 w-5 text-indigo-500" />
                  </div>
                  <h4 className="font-bold">Financial Services</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Secure chatbots for account inquiries. Copilots ensure compliance. Auto QA maintains quality standards.
                </p>
                <div className="text-xs font-semibold text-indigo-500">100% conversation coverage</div>
              </div>

              <div className="p-6 rounded-2xl border border-border/50 bg-gradient-to-br from-primary/5 via-card/50 to-transparent">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="font-bold">Healthcare</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  HIPAA-compliant bots for appointment scheduling. Copilots assist with insurance verification. Summaries save time.
                </p>
                <div className="text-xs font-semibold text-primary">24/7 availability</div>
              </div>

              <div className="p-6 rounded-2xl border border-border/50 bg-gradient-to-br from-purple-500/5 via-card/50 to-transparent">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-purple-500" />
                  </div>
                  <h4 className="font-bold">High-Growth Startups</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Scale support without scaling headcount. Bots deflect, copilots accelerate, QA maintains standards.
                </p>
                <div className="text-xs font-semibold text-purple-500">3x volume, same team size</div>
              </div>

              <div className="p-6 rounded-2xl border border-border/50 bg-gradient-to-br from-indigo-500/5 via-card/50 to-transparent">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-indigo-500" />
                  </div>
                  <h4 className="font-bold">Enterprise</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Multi-brand deployment. White-labeled chatbots. Centralized analytics. Enterprise security and compliance.
                </p>
                <div className="text-xs font-semibold text-indigo-500">SOC 2, GDPR ready</div>
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
