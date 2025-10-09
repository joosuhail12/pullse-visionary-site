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
  ChevronDown,
  ChevronRight,
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

// Expandable Section Component
const ExpandableSection = ({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-border/50 rounded-2xl overflow-hidden bg-card/50 backdrop-blur-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between hover:bg-muted/10 transition-colors"
      >
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
        {isOpen ? (
          <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform" />
        ) : (
          <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-6 pt-2 border-t border-border/30">
          {children}
        </div>
      )}
    </div>
  );
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
                  Infinite possibilities.
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                Six AI-powered tools working together—from customer-facing chatbots to agent copilots, automated QA to intelligent summaries. All trained on your content, all working in harmony.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <RouteButton href="#suite" className="group relative px-8 py-4 bg-gradient-to-r from-primary to-purple-600 text-background font-bold rounded-xl shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all hover:scale-105">
                  Explore the Suite
                  <ArrowRight className="ml-2 h-5 w-5 inline-block group-hover:translate-x-1 transition-transform" />
                </RouteButton>
                <RouteButton href="/book-demo" className="group px-8 py-4 border-2 border-primary/30 bg-card/50 backdrop-blur-sm text-foreground font-bold rounded-xl hover:bg-primary/10 hover:border-primary transition-all">
                  Book a Demo
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

        {/* Two Pillars Section */}
        <section className="relative py-20 bg-gradient-to-b from-muted/10 to-transparent">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-4">
                <Layers className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Two Deployment Modes</span>
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-4">
                Deploy your way
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Same AI engine, different deployment modes. Choose chatbots for autonomous customer support or copilots for agent augmentation—or deploy both.
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
                    <span className="text-muted-foreground">Multi-channel deployment (web, Slack, WhatsApp, email)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Handles routine questions, escalates when needed</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Smart handoff to human agents with full context</span>
                  </li>
                </ul>

                <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                  <span>Learn more about Chatbots</span>
                  <ArrowRight className="h-4 w-4" />
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
                    <span className="text-muted-foreground">Suggests answers without taking over conversations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">No customer-facing handoff, pure augmentation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Real-time knowledge retrieval from your content</span>
                  </li>
                </ul>

                <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                  <span>Learn more about Copilots</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-lg text-muted-foreground bg-gradient-to-r from-primary/10 via-purple-500/10 to-indigo-500/10 border border-primary/20 rounded-2xl px-8 py-6 inline-block backdrop-blur-sm">
                <span className="font-semibold text-foreground">Both powered by the same engine.</span> Both learning from every conversation.
              </p>
            </div>
          </div>
        </section>

        {/* Complete Suite Overview */}
        <section id="suite" className="relative py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-4">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Six Powerful Tools</span>
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-4">
                The complete suite
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Everything you need to deploy intelligent AI across your support operations—from customer-facing bots to behind-the-scenes quality assurance.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
              {/* AI Chatbots - Primary */}
              <div className="group relative p-10 rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-card/50 to-purple-500/5 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-purple-600 shadow-xl mb-6 group-hover:scale-110 transition-transform">
                  <Bot className="h-10 w-10 text-background" />
                </div>

                <h3 className="text-3xl font-bold mb-3">AI Chatbots</h3>
                <p className="text-xl text-muted-foreground mb-6">
                  Autonomous customer support that scales infinitely
                </p>

                <div className="mb-6 p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-foreground">Key Capabilities</span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Multi-profile personalities with custom behavior
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Conditional logic and smart routing
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Action execution (refunds, lookups, updates)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Seamless handoff to human agents
                    </li>
                  </ul>
                </div>

                <div className="mb-6 p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-5 w-5 text-purple-500" />
                    <span className="font-semibold text-foreground">Perfect For</span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>After-hours support coverage</li>
                    <li>High-volume FAQ deflection</li>
                    <li>Tier-1 customer inquiries</li>
                    <li>Order tracking and status updates</li>
                  </ul>
                </div>

                {/* Screenshot Placeholder */}
                <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted/20 border border-border/30 mb-6">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <Bot className="h-12 w-12 text-muted-foreground/30 mx-auto" />
                      <p className="text-sm text-muted-foreground/50">Chatbot Interface Preview</p>
                    </div>
                  </div>
                </div>

                <Link href="#chatbots-deepdive" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                  <span>Explore Chatbots in detail</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* AI Copilots - Primary */}
              <div className="group relative p-10 rounded-3xl border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/5 via-card/50 to-indigo-500/5 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-xl mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles className="h-10 w-10 text-background" />
                </div>

                <h3 className="text-3xl font-bold mb-3">AI Copilots</h3>
                <p className="text-xl text-muted-foreground mb-6">
                  Give every agent a senior rep in their pocket
                </p>

                <div className="mb-6 p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="h-5 w-5 text-purple-500" />
                    <span className="font-semibold text-foreground">Key Capabilities</span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                      Contextual suggestions during live conversations
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                      Instant knowledge retrieval from content center
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                      Draft responses in your brand voice
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                      Agent maintains full conversation control
                    </li>
                  </ul>
                </div>

                <div className="mb-6 p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-5 w-5 text-indigo-500" />
                    <span className="font-semibold text-foreground">Perfect For</span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Onboarding new support reps</li>
                    <li>Complex product questions</li>
                    <li>Maintaining response consistency</li>
                    <li>Reducing average handle time</li>
                  </ul>
                </div>

                {/* Screenshot Placeholder */}
                <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted/20 border border-border/30 mb-6">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <Sparkles className="h-12 w-12 text-muted-foreground/30 mx-auto" />
                      <p className="text-sm text-muted-foreground/50">Copilot Interface Preview</p>
                    </div>
                  </div>
                </div>

                <Link href="#copilots-deepdive" className="inline-flex items-center gap-2 text-purple-500 font-semibold hover:gap-3 transition-all">
                  <span>Explore Copilots in detail</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Supporting Tools */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {/* AI Rewriting */}
              <div className="group relative p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-600 shadow-lg mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="h-6 w-6 text-background" />
                </div>
                <h4 className="text-lg font-bold mb-2">AI Rewriting</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Tone perfection, every time
                </p>
                <p className="text-xs text-muted-foreground/80">
                  Transform drafted responses to match brand voice instantly
                </p>
              </div>

              {/* Conversation Summaries */}
              <div className="group relative p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg mb-4 group-hover:scale-110 transition-transform">
                  <MessageSquare className="h-6 w-6 text-background" />
                </div>
                <h4 className="text-lg font-bold mb-2">Summaries</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Context in seconds
                </p>
                <p className="text-xs text-muted-foreground/80">
                  Auto-generated summaries with key points and sentiment
                </p>
              </div>

              {/* Sentiment Analysis */}
              <div className="group relative p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg mb-4 group-hover:scale-110 transition-transform">
                  <Heart className="h-6 w-6 text-background" />
                </div>
                <h4 className="text-lg font-bold mb-2">Sentiment</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Measure what matters
                </p>
                <p className="text-xs text-muted-foreground/80">
                  Real-time emotion tracking and escalation detection
                </p>
              </div>

              {/* Auto QA */}
              <Link href="/product/auto-qa" className="group relative p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-indigo-600 shadow-lg mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="h-6 w-6 text-background" />
                </div>
                <h4 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">Auto QA</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  100% coverage, zero sampling
                </p>
                <p className="text-xs text-muted-foreground/80 mb-3">
                  Every conversation evaluated on quality parameters
                </p>
                <div className="flex items-center gap-1 text-primary text-xs font-medium">
                  <span>Learn more</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
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
                One foundation. Infinite scale.
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Every AI tool in the suite is powered by the same three core systems—train once, deploy everywhere.
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
                  Single source of truth for all AI tools
                </p>

                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Import from Notion, Confluence, Google Docs, or raw markdown</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Version control and content scheduling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>AI trains on your knowledge base once, powers everything</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Automatic content freshness checks</span>
                  </li>
                </ul>

                {/* Diagram Placeholder */}
                <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted/20 border border-border/30 mt-6">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Database className="h-12 w-12 text-muted-foreground/20" />
                  </div>
                </div>
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
                  Connect AI to your tools and systems
                </p>

                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Pre-built connectors: Stripe, Salesforce, Zendesk, HubSpot, Shopify, Intercom</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Custom REST API integration support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Define actions: refunds, lookups, updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Permission controls and approval workflows</span>
                  </li>
                </ul>

                {/* Diagram Placeholder */}
                <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted/20 border border-border/30 mt-6">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Zap className="h-12 w-12 text-muted-foreground/20" />
                  </div>
                </div>
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
                  Core AI brain powering all tools
                </p>

                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Contextual understanding with conversation memory</span>
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
                    <span>Enterprise-grade security and privacy</span>
                  </li>
                </ul>

                {/* Diagram Placeholder */}
                <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted/20 border border-border/30 mt-6">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground/20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chatbots Deep-Dive */}
        <section id="chatbots-deepdive" className="relative py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-4">
                <Bot className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">AI Chatbots</span>
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-4">
                Chatbots that feel human,
                <span className="block bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-gradient">
                  scale like machines
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Deploy autonomous AI that handles customer conversations 24/7—from simple FAQs to complex multi-step workflows.
              </p>
            </div>

            {/* Large Screenshot */}
            <div className="relative max-w-5xl mx-auto mb-16 rounded-2xl overflow-hidden shadow-2xl border border-border/50">
              <div className="aspect-video bg-gradient-to-br from-primary/10 via-muted/20 to-purple-500/10 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Bot className="h-20 w-20 text-muted-foreground/30 mx-auto" />
                  <p className="text-lg text-muted-foreground/50">Chatbot Conversation Interface</p>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="max-w-5xl mx-auto space-y-6 mb-16">
              <ExpandableSection title="Multi-Profile Personalities" defaultOpen={true}>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Create unlimited bot profiles, each with its own personality, tone, and behavior rules. Route conversations based on topic, channel, or customer type.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-purple-500/5 border border-primary/20">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Palette className="h-4 w-4 text-primary" />
                        Custom Behavior
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Define response length, formality, emoji usage, and when to offer help vs. wait for questions.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/5 to-indigo-500/5 border border-purple-500/20">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Users className="h-4 w-4 text-purple-500" />
                        Use Case Example
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Friendly "Luna" for sales inquiries, professional "Atlas" for support tickets.
                      </p>
                    </div>
                  </div>
                </div>
              </ExpandableSection>

              <ExpandableSection title="Multi-Channel Deployment">
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Deploy a single bot across multiple channels simultaneously—web widget, Slack, WhatsApp, email, MS Teams. Unified conversation history everywhere.
                  </p>

                  <div className="grid md:grid-cols-3 gap-3">
                    {['Web Widget', 'Slack', 'WhatsApp', 'Email', 'MS Teams', 'SMS'].map((channel) => (
                      <div key={channel} className="p-3 rounded-lg bg-card/50 border border-border/30 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm font-medium">{channel}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground italic">
                    Channel-specific adaptations for formatting, emojis, and interaction patterns.
                  </p>
                </div>
              </ExpandableSection>

              <ExpandableSection title="Intelligent Handoff">
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    The bot detects when it's out of depth and seamlessly transfers to a human agent—with full conversation context, confidence scores, and suggested next steps.
                  </p>

                  <div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-purple-500/5 border border-primary/20">
                    <h4 className="font-semibold mb-3">What agents see during handoff:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Complete conversation history with timestamps</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Bot confidence scores for each response</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Customer intent and sentiment analysis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Relevant knowledge base articles and suggested responses</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </ExpandableSection>

              <ExpandableSection title="Configurable Behavior & Conditional Logic">
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Build sophisticated conversation flows with if-then logic, branching paths, and dynamic responses based on customer data, ticket properties, or time conditions.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-card/50 border border-border/30">
                      <h4 className="font-semibold mb-2 text-sm">Conditional Routing</h4>
                      <p className="text-xs text-muted-foreground">
                        "If customer is on Enterprise plan, route to priority queue. Otherwise, attempt bot resolution."
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-card/50 border border-border/30">
                      <h4 className="font-semibold mb-2 text-sm">A/B Testing</h4>
                      <p className="text-xs text-muted-foreground">
                        Test different conversation flows, response styles, or handoff triggers to optimize deflection rates.
                      </p>
                    </div>
                  </div>
                </div>
              </ExpandableSection>

              <ExpandableSection title="Action Execution">
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Bots can execute actions directly—check order status, process refunds, update account information, or trigger workflows in connected systems.
                  </p>

                  <div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-purple-500/5 border border-primary/20">
                    <h4 className="font-semibold mb-3">Action Types:</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="flex items-start gap-2 text-sm">
                        <Zap className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium">Lookups</div>
                          <div className="text-xs text-muted-foreground">Check order status, account balance, subscription details</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <Zap className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium">Transactions</div>
                          <div className="text-xs text-muted-foreground">Process refunds, apply discounts, upgrade plans</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <Zap className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium">Updates</div>
                          <div className="text-xs text-muted-foreground">Change email, update address, modify preferences</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <Zap className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium">Workflows</div>
                          <div className="text-xs text-muted-foreground">Create tickets, trigger automations, schedule callbacks</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground italic">
                    Configure actions to require confirmation or auto-execute based on confidence thresholds. Full transaction logging and audit trails included.
                  </p>
                </div>
              </ExpandableSection>
            </div>

            {/* Use Cases */}
            <div className="max-w-5xl mx-auto">
              <h3 className="text-2xl font-bold mb-8 text-center">Real-world use cases</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl border border-border/50 bg-gradient-to-br from-primary/5 via-card/50 to-transparent">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="font-bold">E-commerce Support</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Handle order tracking, returns, product questions, and shipping inquiries automatically.
                  </p>
                  <div className="text-xs font-semibold text-primary">87% deflection rate</div>
                </div>

                <div className="p-6 rounded-2xl border border-border/50 bg-gradient-to-br from-purple-500/5 via-card/50 to-transparent">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <Zap className="h-5 w-5 text-purple-500" />
                    </div>
                    <h4 className="font-bold">SaaS Onboarding</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Guide new users through setup, answer feature questions, and provide personalized recommendations.
                  </p>
                  <div className="text-xs font-semibold text-purple-500">4.5min avg resolution</div>
                </div>

                <div className="p-6 rounded-2xl border border-border/50 bg-gradient-to-br from-indigo-500/5 via-card/50 to-transparent">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-indigo-500" />
                    </div>
                    <h4 className="font-bold">Financial Services</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Account inquiries, transaction history, balance checks, and basic troubleshooting.
                  </p>
                  <div className="text-xs font-semibold text-indigo-500">24/7 availability</div>
                </div>

                <div className="p-6 rounded-2xl border border-border/50 bg-gradient-to-br from-primary/5 via-card/50 to-transparent">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="font-bold">Healthcare Operations</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Appointment scheduling, prescription refills, insurance verification, and FAQ deflection.
                  </p>
                  <div className="text-xs font-semibold text-primary">HIPAA compliant</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Copilots Deep-Dive */}
        <section id="copilots-deepdive" className="relative py-20 bg-gradient-to-b from-muted/10 via-background to-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm mb-4">
                <Sparkles className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium text-purple-500">AI Copilots</span>
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-4">
                Every agent,
                <span className="block bg-gradient-to-r from-purple-500 via-indigo-500 to-primary bg-clip-text text-transparent animate-gradient">
                  instantly upgraded
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Give your support team AI-powered assistance that suggests answers, retrieves knowledge, and drafts responses—all without touching customer conversations.
              </p>
            </div>

            {/* Large Screenshot */}
            <div className="relative max-w-5xl mx-auto mb-16 rounded-2xl overflow-hidden shadow-2xl border border-border/50">
              <div className="aspect-video bg-gradient-to-br from-purple-500/10 via-muted/20 to-indigo-500/10 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Sparkles className="h-20 w-20 text-muted-foreground/30 mx-auto" />
                  <p className="text-lg text-muted-foreground/50">Copilot Agent Interface</p>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="max-w-5xl mx-auto space-y-6 mb-16">
              <ExpandableSection title="Agent-Facing Only" defaultOpen={true}>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Copilots never interact with customers directly. They're purely an augmentation layer for your human agents—the customer never knows AI is involved.
                  </p>

                  <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/5 to-indigo-500/5 border border-purple-500/20">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Shield className="h-4 w-4 text-purple-500" />
                      Why this matters
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      No handoff confusion, no "you're talking to a bot" stigma. Agents maintain full control and ownership of every conversation while getting instant AI support.
                    </p>
                  </div>
                </div>
              </ExpandableSection>

              <ExpandableSection title="On-Demand Execution">
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Copilot activates only when the agent triggers it—no automatic interjections or interruptions. The agent decides when they need help and what kind of help they need.
                  </p>

                  <div className="grid md:grid-cols-3 gap-3">
                    {[
                      { label: 'Quick Search', desc: 'Find relevant docs instantly' },
                      { label: 'Draft Response', desc: 'Generate reply suggestions' },
                      { label: 'Explain Concept', desc: 'Get context on complex topics' }
                    ].map((action) => (
                      <div key={action.label} className="p-3 rounded-lg bg-card/50 border border-border/30">
                        <div className="text-sm font-medium mb-1">{action.label}</div>
                        <div className="text-xs text-muted-foreground">{action.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </ExpandableSection>

              <ExpandableSection title="Contextual Intelligence">
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Copilot analyzes the current conversation context—customer history, sentiment, previous interactions—to provide hyper-relevant suggestions.
                  </p>

                  <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/5 to-indigo-500/5 border border-purple-500/20">
                    <h4 className="font-semibold mb-3">What Copilot considers:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                        <span>Current conversation messages and customer intent</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                        <span>Customer account details, plan type, and usage history</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                        <span>Similar past conversations and their resolutions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                        <span>Real-time sentiment and urgency signals</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </ExpandableSection>

              <ExpandableSection title="Knowledge Retrieval">
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Instant semantic search across your entire Content Center—not just keyword matching, but true understanding of what the agent needs.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-card/50 border border-border/30">
                      <h4 className="font-semibold mb-2 text-sm flex items-center gap-2">
                        <Database className="h-4 w-4 text-purple-500" />
                        Semantic Search
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Understands intent, not just keywords. "How do I cancel?" finds cancellation policies, not just docs with the word "cancel".
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-card/50 border border-border/30">
                      <h4 className="font-semibold mb-2 text-sm flex items-center gap-2">
                        <FileText className="h-4 w-4 text-indigo-500" />
                        Source Transparency
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Every suggestion shows source documents. Agents can click through to read full context and verify information.
                      </p>
                    </div>
                  </div>
                </div>
              </ExpandableSection>

              <ExpandableSection title="Response Drafting">
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    AI generates draft responses in real-time based on conversation context and your brand voice. Agents can edit, approve, reject, or regenerate.
                  </p>

                  <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/5 to-indigo-500/5 border border-purple-500/20">
                    <h4 className="font-semibold mb-3">Continuous improvement:</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      When agents edit AI-generated drafts, Copilot learns from those edits to improve future suggestions. Over time, drafts require less and less editing.
                    </p>
                    <div className="text-xs font-semibold text-purple-500">
                      Average 30% reduction in editing needed after 30 days
                    </div>
                  </div>
                </div>
              </ExpandableSection>
            </div>

            {/* Use Cases */}
            <div className="max-w-5xl mx-auto">
              <h3 className="text-2xl font-bold mb-8 text-center">Perfect for</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl border border-border/50 bg-gradient-to-br from-purple-500/5 via-card/50 to-transparent">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <Users className="h-5 w-5 text-purple-500" />
                    </div>
                    <h4 className="font-bold">New Hire Onboarding</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Get new support reps productive in days instead of weeks. Copilot acts as an always-available senior mentor.
                  </p>
                  <div className="text-xs font-semibold text-purple-500">50% faster ramp time</div>
                </div>

                <div className="p-6 rounded-2xl border border-border/50 bg-gradient-to-br from-indigo-500/5 via-card/50 to-transparent">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-indigo-500" />
                    </div>
                    <h4 className="font-bold">Complex Product Support</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Turn 300-page documentation into instant answers. Agents no longer need to memorize everything.
                  </p>
                  <div className="text-xs font-semibold text-indigo-500">3x faster answer retrieval</div>
                </div>

                <div className="p-6 rounded-2xl border border-border/50 bg-gradient-to-br from-primary/5 via-card/50 to-transparent">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="font-bold">Seasonal Volume Spikes</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Handle peak periods without sacrificing quality. Every agent performs like your best rep, even under pressure.
                  </p>
                  <div className="text-xs font-semibold text-primary">Maintain 95% CSAT during peaks</div>
                </div>

                <div className="p-6 rounded-2xl border border-border/50 bg-gradient-to-br from-purple-500/5 via-card/50 to-transparent">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-purple-500" />
                    </div>
                    <h4 className="font-bold">Response Consistency</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Ensure every customer gets accurate, on-brand responses regardless of which agent they talk to.
                  </p>
                  <div className="text-xs font-semibold text-purple-500">30% reduction in handle time</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Integration Story */}
        <section className="relative py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-4">
                <RefreshCw className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Better Together</span>
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-4">
                How they work together
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Every conversation makes every tool smarter. No data silos, one unified intelligence improving continuously.
              </p>
            </div>

            {/* Flow Diagram */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="relative p-8 rounded-3xl border border-border/50 bg-gradient-to-br from-primary/5 via-card/50 to-purple-500/5 backdrop-blur-sm">
                <div className="space-y-6">
                  {/* Step 1 */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-background font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Customer contacts support</h4>
                      <p className="text-sm text-muted-foreground">Chatbot attempts resolution using Content Center knowledge</p>
                    </div>
                  </div>

                  <div className="ml-5 border-l-2 border-primary/30 h-6" />

                  {/* Step 2a */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-background font-bold">
                      2a
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">If chatbot succeeds</h4>
                      <p className="text-sm text-muted-foreground">Ticket closed. Conversation added to training data. Auto QA evaluates quality.</p>
                    </div>
                  </div>

                  <div className="ml-5 border-l-2 border-primary/30 h-6" />

                  {/* Step 2b */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-600 text-background font-bold">
                      2b
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">If chatbot needs help</h4>
                      <p className="text-sm text-muted-foreground">Handoff to human agent with full context and confidence scores</p>
                    </div>
                  </div>

                  <div className="ml-5 border-l-2 border-purple-600/30 h-6" />

                  {/* Step 3 */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 text-background font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Agent uses Copilot</h4>
                      <p className="text-sm text-muted-foreground">Gets AI suggestions, knowledge retrieval, and draft responses</p>
                    </div>
                  </div>

                  <div className="ml-5 border-l-2 border-indigo-600/30 h-6" />

                  {/* Step 4 */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-background font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">After resolution</h4>
                      <p className="text-sm text-muted-foreground">Auto QA evaluates, Sentiment analyzed, Summary generated, Rewriting suggests improvements</p>
                    </div>
                  </div>

                  <div className="ml-5 border-l-2 border-primary/30 h-6" />

                  {/* Step 5 */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-purple-600 text-background font-bold">
                      5
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Insights loop back</h4>
                      <p className="text-sm text-muted-foreground">Copilot and Chatbot improve from learnings. Content Center updates. Next conversation is smarter.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefit Callouts */}
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm text-center">
                <RefreshCw className="h-10 w-10 text-primary mx-auto mb-3" />
                <h4 className="font-bold mb-2">Continuous Improvement</h4>
                <p className="text-sm text-muted-foreground">
                  Every conversation makes every tool smarter
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm text-center">
                <Database className="h-10 w-10 text-purple-500 mx-auto mb-3" />
                <h4 className="font-bold mb-2">No Data Silos</h4>
                <p className="text-sm text-muted-foreground">
                  One unified intelligence across all tools
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm text-center">
                <Layers className="h-10 w-10 text-indigo-500 mx-auto mb-3" />
                <h4 className="font-bold mb-2">Flexible Deployment</h4>
                <p className="text-sm text-muted-foreground">
                  Deploy incrementally or all at once
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Capabilities Bento */}
        <section className="relative py-20 bg-gradient-to-b from-muted/10 via-background to-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-4">
                <Settings className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Platform-Wide</span>
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-4">
                Enterprise-grade capabilities
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Security, compliance, customization, and control—everything you need for production deployment at scale.
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <MagicBento cardData={platformCards} />
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="relative py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-4">
                Which deployment is right for you?
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Quick comparison to help you decide—or deploy both and get the best of both worlds.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="overflow-hidden rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left p-6 font-bold text-foreground"></th>
                        <th className="text-left p-6">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                              <Bot className="h-5 w-5 text-background" />
                            </div>
                            <span className="font-bold text-foreground">Chatbots</span>
                          </div>
                        </th>
                        <th className="text-left p-6">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
                              <Sparkles className="h-5 w-5 text-background" />
                            </div>
                            <span className="font-bold text-foreground">Copilots</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/30">
                        <td className="p-6 font-semibold text-muted-foreground">Who uses it</td>
                        <td className="p-6">Customers</td>
                        <td className="p-6">Agents</td>
                      </tr>
                      <tr className="border-b border-border/30">
                        <td className="p-6 font-semibold text-muted-foreground">When it activates</td>
                        <td className="p-6">Autonomous, 24/7</td>
                        <td className="p-6">On-demand by agent</td>
                      </tr>
                      <tr className="border-b border-border/30">
                        <td className="p-6 font-semibold text-muted-foreground">Conversation ownership</td>
                        <td className="p-6">Bot → Human handoff</td>
                        <td className="p-6">Always human-owned</td>
                      </tr>
                      <tr className="border-b border-border/30">
                        <td className="p-6 font-semibold text-muted-foreground">Best for</td>
                        <td className="p-6">Deflecting routine questions</td>
                        <td className="p-6">Accelerating complex issues</td>
                      </tr>
                      <tr className="border-b border-border/30">
                        <td className="p-6 font-semibold text-muted-foreground">Training time</td>
                        <td className="p-6">Deploy in minutes</td>
                        <td className="p-6">Onboard agents in days</td>
                      </tr>
                      <tr>
                        <td className="p-6 font-semibold text-muted-foreground">Typical use cases</td>
                        <td className="p-6">After-hours, FAQs, tier-1</td>
                        <td className="p-6">Onboarding, complex products</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="text-center mt-8">
                <p className="text-lg font-semibold text-foreground bg-gradient-to-r from-primary/10 via-purple-500/10 to-indigo-500/10 border border-primary/20 rounded-2xl px-8 py-6 inline-block backdrop-blur-sm">
                  Or deploy both and get the best of both worlds
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section ref={statsRef} className="relative py-20 bg-gradient-to-b from-muted/10 to-transparent">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-4">
                Built for scale, designed for results
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-12">
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
                    "Pullse AI Suite transformed our support operations. We went from 5-10% QA coverage to 100%, deflected 87% of routine inquiries with chatbots, and cut new hire ramp time in half with copilots. It's not just AI—it's intelligent AI that actually works."
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

        {/* Additional Tools */}
        <section className="relative py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-4">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">And That's Not All</span>
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-4">
                Supporting tools that complete the suite
              </h2>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              <ExpandableSection title="AI Rewriting - Tone perfection, every time">
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Transform agent-drafted responses instantly to match your brand voice—formal to casual, technical to simple, or any tone in between.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-card/50 border border-border/30">
                      <h4 className="font-semibold mb-2 text-sm">Tone Transformation</h4>
                      <p className="text-xs text-muted-foreground">
                        Adjust formality, simplify technical jargon, or add warmth—one click to perfect tone.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-card/50 border border-border/30">
                      <h4 className="font-semibold mb-2 text-sm">Brand Voice Compliance</h4>
                      <p className="text-xs text-muted-foreground">
                        Automatically checks responses against brand guidelines and suggests improvements.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-card/50 border border-border/30">
                      <h4 className="font-semibold mb-2 text-sm">Grammar & Clarity</h4>
                      <p className="text-xs text-muted-foreground">
                        Fixes typos, improves sentence structure, and enhances readability.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-card/50 border border-border/30">
                      <h4 className="font-semibold mb-2 text-sm">Perfect Every Time</h4>
                      <p className="text-xs text-muted-foreground">
                        Agents draft, AI perfects—maintain quality at speed.
                      </p>
                    </div>
                  </div>
                </div>
              </ExpandableSection>

              <ExpandableSection title="Conversation Summaries - Context in seconds">
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Auto-generated summaries after every conversation with key points, action items, and sentiment—so you never have to read through entire threads.
                  </p>

                  <div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-purple-500/5 border border-primary/20">
                    <h4 className="font-semibold mb-3">What's included in summaries:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Key discussion points and customer concerns</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Resolution provided and actions taken</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Sentiment analysis (positive, neutral, negative)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Follow-up recommendations if needed</span>
                      </li>
                    </ul>
                  </div>

                  <p className="text-sm text-muted-foreground italic">
                    Summaries are searchable and indexed—find past conversations by topic, customer, or resolution type instantly.
                  </p>
                </div>
              </ExpandableSection>

              <ExpandableSection title="Sentiment Analysis - Measure what matters">
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Real-time emotion tracking throughout conversations—detect frustration early, identify coaching opportunities, and track sentiment trends over time.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-card/50 border border-border/30">
                      <h4 className="font-semibold mb-2 text-sm">Escalation Detection</h4>
                      <p className="text-xs text-muted-foreground">
                        Alert supervisors when customer sentiment shifts from frustrated to angry—intervene before churn.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-card/50 border border-border/30">
                      <h4 className="font-semibold mb-2 text-sm">Agent Coaching</h4>
                      <p className="text-xs text-muted-foreground">
                        Identify moments where agent response improved or worsened sentiment—teach what works.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-card/50 border border-border/30">
                      <h4 className="font-semibold mb-2 text-sm">Trend Analysis</h4>
                      <p className="text-xs text-muted-foreground">
                        Track sentiment over days, weeks, months—correlate with product releases or policy changes.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-card/50 border border-border/30">
                      <h4 className="font-semibold mb-2 text-sm">Real-Time Feedback</h4>
                      <p className="text-xs text-muted-foreground">
                        Agents see sentiment indicators during conversations—adjust approach in real-time.
                      </p>
                    </div>
                  </div>
                </div>
              </ExpandableSection>

              <ExpandableSection title="Auto QA - 100% coverage, zero sampling">
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    AI evaluates every conversation—bot and human—on quality parameters like empathy, accuracy, tone, and resolution. Get complete visibility into support quality without manual sampling.
                  </p>

                  <div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-purple-500/5 border border-primary/20 mb-4">
                    <h4 className="font-semibold mb-3">Key capabilities:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Evaluates 100% of conversations, not just 5-10% samples</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Moment-level feedback on exact messages that need improvement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Quality parameter scoring (empathy, accuracy, tone, resolution)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Trend tracking and coaching workflows</span>
                      </li>
                    </ul>
                  </div>

                  <Link href="/product/auto-qa" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                    <span>Learn more about Auto QA</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </ExpandableSection>
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
                See the entire suite
                <span className="block bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-gradient">
                  in action
                </span>
              </h2>

              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Book a personalized demo and we'll show you how the AI Suite can transform your support operations—from deflection to acceleration, QA to insights.
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
