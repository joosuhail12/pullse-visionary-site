'use client';

import { useEffect, useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import RouteButton from "@/components/RouteButton";
import MagicBento from "@/components/MagicBento";
import type { CardData } from "@/components/MagicBento";
import Image from "next/image";
import Link from "next/link";
import aiToolsScreenshot from "@/assets/ai-tools-screenshot.png";
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
  Star,
  ExternalLink,
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
  const [activeDeploymentTab, setActiveDeploymentTab] = useState<'chatbot' | 'copilot'>('chatbot');
  const [hoveredUseCase, setHoveredUseCase] = useState<number | null>(null);
  const [selectedStat, setSelectedStat] = useState<number | null>(0);
  const [activeUseCaseTab, setActiveUseCaseTab] = useState<'chatbot' | 'copilot'>('chatbot');
  const [expandedUseCase, setExpandedUseCase] = useState<number | null>(null);
  const [selectedInfrastructure, setSelectedInfrastructure] = useState<'content' | 'action' | 'engine'>('content');
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
      description: 'Deploy autonomous agents that answer questions AND take lightweight actions. Process refunds, order lookups, subscription changes—24/7 across every channel. Not just deflection, actual resolution.',
      label: 'Customer-Facing',
      icon: Bot,
    },
    {
      color: 'hsl(var(--card))',
      title: 'AI Copilots',
      description: 'On-demand action execution across your entire stack. Process refunds, update accounts, modify subscriptions—right from the conversation. Eliminate context switching and tool sprawl.',
      label: 'Agent-Facing',
      icon: Sparkles,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Sentiment Analysis',
      description: 'Real-time emotion tracking throughout conversations. Detect escalations early, identify coaching moments.',
      label: 'Measure What Matters',
      icon: Heart,
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
      title: 'Auto QA',
      description: 'AI evaluates 100% of conversations on quality parameters. No sampling, complete visibility into support quality.',
      label: '100% Coverage',
      icon: Shield,
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
                <RouteButton size="lg" href="/contact-sales" className="text-base px-10 py-7 shadow-2xl shadow-primary/30 group">
                  See it live
                  <Play className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                </RouteButton>
                <RouteButton size="lg" variant="outline" href="/pricing" className="text-base px-10 py-7">
                  View pricing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </RouteButton>
              </div>

              {/* Trust Signals */}
              <div className="flex flex-wrap gap-6 justify-center items-center pt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>6 AI tools</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>One training process</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <span>Built for teams that demand excellence</span>
                </div>
              </div>
            </div>

            {/* Hero Screenshot */}
            <div className="relative max-w-6xl mx-auto mt-16">
              {/* Glow effect */}
              <div className="absolute -inset-12 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-3xl opacity-60" />

              {/* Main screenshot card */}
              <div className="relative rounded-3xl border border-border/50 bg-gradient-to-br from-card/95 via-card to-card/90 p-2 sm:p-3 shadow-2xl backdrop-blur-xl">
                <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted/30 border border-border/30">
                  <Image
                    src={aiToolsScreenshot}
                    alt="Pullse AI Suite Dashboard"
                    className="w-full"
                    priority
                  />
                </div>
              </div>

              {/* Floating stat badges */}
              <div className="absolute -left-4 top-1/4 hidden lg:block">
                <div className="rounded-2xl border border-border/60 bg-card/95 p-5 shadow-xl backdrop-blur-xl animate-float">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-600 shadow-lg">
                      <Bot className="h-6 w-6 text-background" />
                    </div>
                    <div>
                      <div className="text-2xl font-black bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">87%</div>
                      <div className="text-xs text-muted-foreground">Deflection</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 top-1/3 hidden lg:block">
                <div className="rounded-2xl border border-border/60 bg-card/95 p-5 shadow-xl backdrop-blur-xl animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg">
                      <Sparkles className="h-6 w-6 text-background" />
                    </div>
                    <div>
                      <div className="text-2xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">100%</div>
                      <div className="text-xs text-muted-foreground">QA Coverage</div>
                    </div>
                  </div>
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

            <div className="max-w-6xl mx-auto mb-16 ai-suite-bento">
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

        {/* Two Deployment Modes - Interactive Tabbed Comparison */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background" />

          <div className="container mx-auto px-6 relative">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-foreground mb-6">
                Same engine,{" "}
                <span className="block bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  different reach
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
                Deploy AI that talks to customers or assists agents—or both.
              </p>

              {/* Tab Switcher */}
              <div className="inline-flex items-center gap-2 p-2 rounded-2xl bg-card border border-border/50 shadow-xl">
                <button
                  onClick={() => setActiveDeploymentTab('chatbot')}
                  className={`relative px-8 py-4 rounded-xl font-bold transition-all duration-300 ${
                    activeDeploymentTab === 'chatbot'
                      ? 'bg-gradient-to-r from-primary to-purple-600 text-background shadow-lg scale-105'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Bot className="h-5 w-5 inline-block mr-2" />
                  AI Chatbots
                </button>
                <button
                  onClick={() => setActiveDeploymentTab('copilot')}
                  className={`relative px-8 py-4 rounded-xl font-bold transition-all duration-300 ${
                    activeDeploymentTab === 'copilot'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-background shadow-lg scale-105'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Sparkles className="h-5 w-5 inline-block mr-2" />
                  AI Copilots
                </button>
              </div>
            </div>

            {/* Content Panel */}
            <div className="max-w-5xl mx-auto">
              {activeDeploymentTab === 'chatbot' ? (
                <div className="relative p-12 rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="absolute -top-6 left-12">
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-background font-bold shadow-xl">
                      <Bot className="h-5 w-5" />
                      Customer-Facing AI
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mt-6">
                    <div>
                      <h3 className="text-4xl font-black mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                        Autonomous Resolution
                      </h3>
                      <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                        Answer questions AND execute lightweight actions autonomously. Process refunds, lookups, updates—24/7 across every channel. Resolve with actions, not just deflect with answers.
                      </p>

                      <div className="space-y-4">
                        {[
                          { label: '24/7 Availability', detail: 'Never closes, never sleeps' },
                          { label: 'Multi-Channel', detail: 'Web, Slack, Email, Teams, API webhooks' },
                          { label: 'Smart Handoff', detail: 'Seamless escalation with full context' },
                          { label: 'Action Execution', detail: 'Refunds, updates, data lookups' }
                        ].map((feature, i) => (
                          <div key={i} className="group/feature flex items-start gap-4 p-4 rounded-xl bg-background/50 border border-primary/10 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
                              <CheckCircle2 className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-bold text-foreground">{feature.label}</div>
                              <div className="text-sm text-muted-foreground">{feature.detail}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
                        <div className="text-6xl font-black text-primary mb-2">87%</div>
                        <div className="text-lg font-bold text-foreground mb-1">Average Deflection Rate</div>
                        <div className="text-sm text-muted-foreground">Across all industries and use cases</div>
                      </div>

                      <div className="p-6 rounded-2xl bg-card border border-border/50">
                        <div className="font-bold text-foreground mb-4 flex items-center gap-2">
                          <Target className="h-5 w-5 text-primary" />
                          Best For
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div>• High-volume repetitive questions</div>
                          <div>• After-hours support coverage</div>
                          <div>• Order tracking & account inquiries</div>
                          <div>• Self-service automation</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative p-12 rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 via-card to-card shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="absolute -top-6 left-12">
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-600 text-background font-bold shadow-xl">
                      <Sparkles className="h-5 w-5" />
                      Agent-Facing AI
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mt-6">
                    <div>
                      <h3 className="text-4xl font-black mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                        Action Execution Engine
                      </h3>
                      <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                        Execute actions across your entire stack from one interface. No tool switching, no copy-paste. Agents trigger actions; Copilot executes with proper controls.
                      </p>

                      <div className="space-y-4">
                        {[
                          { label: 'Stack-Wide Actions', detail: 'Refunds, updates, cancellations across all systems' },
                          { label: 'Knowledge Retrieval', detail: 'Instant access to all documentation' },
                          { label: 'Response Drafting', detail: 'AI-written answers in your brand voice' },
                          { label: 'Agent-Triggered', detail: 'Full control with audit trails' }
                        ].map((feature, i) => (
                          <div key={i} className="group/feature flex items-start gap-4 p-4 rounded-xl bg-background/50 border border-purple-500/10 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all duration-300">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20">
                              <CheckCircle2 className="h-5 w-5 text-purple-500" />
                            </div>
                            <div>
                              <div className="font-bold text-foreground">{feature.label}</div>
                              <div className="text-sm text-muted-foreground">{feature.detail}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="p-6 rounded-2xl bg-purple-500/5 border border-purple-500/20">
                        <div className="text-6xl font-black text-purple-500 mb-2">50%</div>
                        <div className="text-lg font-bold text-foreground mb-1">Faster Ramp Time</div>
                        <div className="text-sm text-muted-foreground">New agents productive in days, not weeks</div>
                      </div>

                      <div className="p-6 rounded-2xl bg-card border border-border/50">
                        <div className="font-bold text-foreground mb-4 flex items-center gap-2">
                          <Target className="h-5 w-5 text-purple-500" />
                          Best For
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div>• Complex technical support</div>
                          <div>• New hire onboarding</div>
                          <div>• Compliance & regulations</div>
                          <div>• High-volume peak periods</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Combined Use Cases - Single Card with Sidebar */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-purple-500/5" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.1),transparent_50%)]" />

          <div className="container mx-auto px-6 relative">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 via-purple-500/10 to-indigo-500/10 border border-primary/20 mb-6">
                <Bot className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">AI-Powered Solutions</span>
                <Sparkles className="h-4 w-4 text-purple-500" />
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-6">
                Real problems.
                <span className="block bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  Real solutions.
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                See how AI Chatbots and Copilots transform your support operations
              </p>
            </div>

            {/* Single Card with Sidebar - Light Mode */}
            <div className="max-w-[1300px] mx-auto">
              <div className="relative overflow-hidden rounded-[28px] border border-border/60 bg-card/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08),0_0_1px_rgba(0,0,0,0.05)_inset]">
                {/* Light mode mesh gradients */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(var(--primary-rgb),0.08)_0%,transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(139,92,246,0.06)_0%,transparent_50%)]" />

                <div className="grid lg:grid-cols-[360px,1fr] relative">
                  {/* Left Sidebar - Use Case Selector */}
                  <div className="border-r border-border/50 bg-gradient-to-b from-background/40 via-card/20 to-background/40 p-8 relative backdrop-blur-sm">
                    {/* Tabs with sliding indicator - Light Mode */}
                    <div className="relative flex gap-1 mb-6 p-1 bg-background/80 rounded-[18px] backdrop-blur-xl border border-border/60 shadow-sm">
                      {/* Sliding indicator - Light mode */}
                      <div
                        className={`absolute top-1 h-[calc(100%-8px)] rounded-[14px] transition-all duration-700 ease-out ${
                          activeUseCaseTab === 'chatbot'
                            ? 'left-1 w-[calc(50%-6px)] bg-gradient-to-br from-primary to-purple-600 shadow-md'
                            : 'left-[calc(50%+3px)] w-[calc(50%-6px)] bg-gradient-to-br from-purple-600 to-indigo-600 shadow-md'
                        }`}
                      />
                      <button
                        onClick={() => {
                          setActiveUseCaseTab('chatbot');
                          setSelectedStat(0);
                        }}
                        className={`flex-1 px-5 py-3 rounded-[14px] text-[13px] font-bold tracking-wide transition-all duration-500 relative z-10 ${
                          activeUseCaseTab === 'chatbot'
                            ? 'text-white'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <Bot className="h-4 w-4 inline mr-2 -mt-0.5" />
                        Chatbots
                      </button>
                      <button
                        onClick={() => {
                          setActiveUseCaseTab('copilot');
                          setSelectedStat(3);
                        }}
                        className={`flex-1 px-5 py-3 rounded-[14px] text-[13px] font-bold tracking-wide transition-all duration-500 relative z-10 ${
                          activeUseCaseTab === 'copilot'
                            ? 'text-white'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <Sparkles className="h-4 w-4 inline mr-2 -mt-0.5" />
                        Copilots
                      </button>
                    </div>

                    {/* Use Case List */}
                    <div className="space-y-3">
                      {activeUseCaseTab === 'chatbot' ? (
                        <>
                          <button
                            onClick={() => setSelectedStat(0)}
                            className={`group relative w-full text-left p-4 rounded-[16px] transition-all duration-500 ease-out overflow-hidden ${
                              selectedStat === 0
                                ? 'bg-gradient-to-br from-primary/10 to-purple-600/5 border border-primary/30 shadow-lg shadow-primary/10'
                                : 'bg-card/50 border border-border/40 hover:border-primary/30 hover:bg-primary/5'
                            }`}
                          >
                            <div className={`absolute inset-0 rounded-[16px] bg-gradient-to-br from-primary/5 to-transparent transition-opacity duration-500 ${selectedStat === 0 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

                            <div className="relative flex items-center gap-3 mb-2">
                              <div className={`flex h-10 w-10 items-center justify-center rounded-[12px] bg-gradient-to-br from-primary to-purple-600 shadow-md transition-all duration-500 ${
                                selectedStat === 0 ? 'scale-100' : 'scale-95 opacity-70 group-hover:scale-100 group-hover:opacity-90'
                              }`}>
                                <ShoppingCart className="h-5 w-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className={`font-bold text-[14px] tracking-tight transition-colors duration-500 ${selectedStat === 0 ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>Order Tracking</div>
                              </div>
                              {selectedStat === 0 && (
                                <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(var(--primary-rgb),0.6)] animate-pulse" />
                              )}
                            </div>
                            <div className={`text-[11px] leading-relaxed ml-[52px] transition-colors duration-500 ${selectedStat === 0 ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>Automate WISMO inquiries</div>
                          </button>

                          <button
                            onClick={() => setSelectedStat(1)}
                            className={`group relative w-full text-left p-4 rounded-[16px] transition-all duration-500 ease-out overflow-hidden ${
                              selectedStat === 1
                                ? 'bg-gradient-to-br from-primary/10 to-purple-600/5 border border-primary/30 shadow-lg shadow-primary/10'
                                : 'bg-card/50 border border-border/40 hover:border-primary/30 hover:bg-primary/5'
                            }`}
                          >
                            <div className={`absolute inset-0 rounded-[16px] bg-gradient-to-br from-primary/5 to-transparent transition-opacity duration-500 ${selectedStat === 1 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

                            <div className="relative flex items-center gap-3 mb-2">
                              <div className={`flex h-10 w-10 items-center justify-center rounded-[12px] bg-gradient-to-br from-primary to-purple-600 shadow-md transition-all duration-500 ${
                                selectedStat === 1 ? 'scale-100' : 'scale-95 opacity-70 group-hover:scale-100 group-hover:opacity-90'
                              }`}>
                                <Clock className="h-5 w-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className={`font-bold text-[14px] tracking-tight transition-colors duration-500 ${selectedStat === 1 ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>After-Hours Support</div>
                              </div>
                              {selectedStat === 1 && (
                                <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(var(--primary-rgb),0.6)] animate-pulse" />
                              )}
                            </div>
                            <div className={`text-[11px] leading-relaxed ml-[52px] transition-colors duration-500 ${selectedStat === 1 ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>24/7 coverage</div>
                          </button>

                          <button
                            onClick={() => setSelectedStat(2)}
                            className={`group relative w-full text-left p-4 rounded-[16px] transition-all duration-500 ease-out overflow-hidden ${
                              selectedStat === 2
                                ? 'bg-gradient-to-br from-primary/10 to-purple-600/5 border border-primary/30 shadow-lg shadow-primary/10'
                                : 'bg-card/50 border border-border/40 hover:border-primary/30 hover:bg-primary/5'
                            }`}
                          >
                            <div className={`absolute inset-0 rounded-[16px] bg-gradient-to-br from-primary/5 to-transparent transition-opacity duration-500 ${selectedStat === 2 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

                            <div className="relative flex items-center gap-3 mb-2">
                              <div className={`flex h-10 w-10 items-center justify-center rounded-[12px] bg-gradient-to-br from-primary to-purple-600 shadow-md transition-all duration-500 ${
                                selectedStat === 2 ? 'scale-100' : 'scale-95 opacity-70 group-hover:scale-100 group-hover:opacity-90'
                              }`}>
                                <LifeBuoy className="h-5 w-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className={`font-bold text-[14px] tracking-tight transition-colors duration-500 ${selectedStat === 2 ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>FAQ Deflection</div>
                              </div>
                              {selectedStat === 2 && (
                                <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(var(--primary-rgb),0.6)] animate-pulse" />
                              )}
                            </div>
                            <div className={`text-[11px] leading-relaxed ml-[52px] transition-colors duration-500 ${selectedStat === 2 ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>Instant answers</div>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => setSelectedStat(3)}
                            className={`group relative w-full text-left p-4 rounded-[16px] transition-all duration-500 ease-out overflow-hidden ${
                              selectedStat === 3
                                ? 'bg-gradient-to-br from-purple-600/10 to-indigo-600/5 border border-purple-500/30 shadow-lg shadow-purple-500/10'
                                : 'bg-card/50 border border-border/40 hover:border-purple-500/30 hover:bg-purple-500/5'
                            }`}
                          >
                            <div className={`absolute inset-0 rounded-[16px] bg-gradient-to-br from-purple-600/5 to-transparent transition-opacity duration-500 ${selectedStat === 3 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

                            <div className="relative flex items-center gap-3 mb-2">
                              <div className={`flex h-10 w-10 items-center justify-center rounded-[12px] bg-gradient-to-br from-purple-600 to-indigo-600 shadow-md transition-all duration-500 ${
                                selectedStat === 3 ? 'scale-100' : 'scale-95 opacity-70 group-hover:scale-100 group-hover:opacity-90'
                              }`}>
                                <Zap className="h-5 w-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className={`font-bold text-[14px] tracking-tight transition-colors duration-500 ${selectedStat === 3 ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>Go Live Faster</div>
                              </div>
                              {selectedStat === 3 && (
                                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_6px_rgba(139,92,246,0.6)] animate-pulse" />
                              )}
                            </div>
                            <div className={`text-[11px] leading-relaxed ml-[52px] transition-colors duration-500 ${selectedStat === 3 ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>AI-guided setup</div>
                          </button>

                          <button
                            onClick={() => setSelectedStat(4)}
                            className={`group relative w-full text-left p-4 rounded-[16px] transition-all duration-500 ease-out overflow-hidden ${
                              selectedStat === 4
                                ? 'bg-gradient-to-br from-purple-600/10 to-indigo-600/5 border border-purple-500/30 shadow-lg shadow-purple-500/10'
                                : 'bg-card/50 border border-border/40 hover:border-purple-500/30 hover:bg-purple-500/5'
                            }`}
                          >
                            <div className={`absolute inset-0 rounded-[16px] bg-gradient-to-br from-purple-600/5 to-transparent transition-opacity duration-500 ${selectedStat === 4 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

                            <div className="relative flex items-center gap-3 mb-2">
                              <div className={`flex h-10 w-10 items-center justify-center rounded-[12px] bg-gradient-to-br from-purple-600 to-indigo-600 shadow-md transition-all duration-500 ${
                                selectedStat === 4 ? 'scale-100' : 'scale-95 opacity-70 group-hover:scale-100 group-hover:opacity-90'
                              }`}>
                                <Database className="h-5 w-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className={`font-bold text-[14px] tracking-tight transition-colors duration-500 ${selectedStat === 4 ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>On-Demand Execution</div>
                              </div>
                              {selectedStat === 4 && (
                                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_6px_rgba(139,92,246,0.6)] animate-pulse" />
                              )}
                            </div>
                            <div className={`text-[11px] leading-relaxed ml-[52px] transition-colors duration-500 ${selectedStat === 4 ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>Cross-system actions</div>
                          </button>

                          <button
                            onClick={() => setSelectedStat(5)}
                            className={`group relative w-full text-left p-4 rounded-[16px] transition-all duration-500 ease-out overflow-hidden ${
                              selectedStat === 5
                                ? 'bg-gradient-to-br from-purple-600/10 to-indigo-600/5 border border-purple-500/30 shadow-lg shadow-purple-500/10'
                                : 'bg-card/50 border border-border/40 hover:border-purple-500/30 hover:bg-purple-500/5'
                            }`}
                          >
                            <div className={`absolute inset-0 rounded-[16px] bg-gradient-to-br from-purple-600/5 to-transparent transition-opacity duration-500 ${selectedStat === 5 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

                            <div className="relative flex items-center gap-3 mb-2">
                              <div className={`flex h-10 w-10 items-center justify-center rounded-[12px] bg-gradient-to-br from-purple-600 to-indigo-600 shadow-md transition-all duration-500 ${
                                selectedStat === 5 ? 'scale-100' : 'scale-95 opacity-70 group-hover:scale-100 group-hover:opacity-90'
                              }`}>
                                <Users className="h-5 w-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className={`font-bold text-[14px] tracking-tight transition-colors duration-500 ${selectedStat === 5 ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>Faster Ramp Time</div>
                              </div>
                              {selectedStat === 5 && (
                                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_6px_rgba(139,92,246,0.6)] animate-pulse" />
                              )}
                            </div>
                            <div className={`text-[11px] leading-relaxed ml-[52px] transition-colors duration-500 ${selectedStat === 5 ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>Agent onboarding</div>
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Right Content Area */}
                  <div className="p-8 lg:p-12 relative">
                    {selectedStat === 0 && (
                      <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-700 relative">
                        {/* Floating gradient orbs */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-full blur-3xl opacity-40 animate-pulse" />

                        <div className="relative">
                          <div className="flex items-start gap-5 mb-6">
                            <div className="relative group">
                              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary via-purple-600 to-purple-700 shadow-2xl shadow-primary/40 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                                <ShoppingCart className="h-10 w-10 text-white relative z-10" />
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-600 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-4xl lg:text-5xl font-black text-foreground mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">Order Tracking</h3>
                              <p className="text-base text-muted-foreground font-medium">Automate "Where's my order?" inquiries with instant answers</p>
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 relative">
                          <div className="group relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-red-500/5 to-red-600/5 border-2 border-red-500/20 hover:border-red-500/40 transition-all duration-500 hover:shadow-xl hover:shadow-red-500/10">
                            <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-red-500/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="flex items-center gap-3 mb-4">
                              <div className="h-1.5 w-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg shadow-red-500/50" />
                              <span className="text-xs font-black text-red-500 uppercase tracking-widest">The Challenge</span>
                            </div>
                            <p className="text-lg text-muted-foreground leading-relaxed relative z-10">
                              Agents spending <span className="text-foreground font-bold">40% of time</span> on repetitive "Where's my order?" questions
                            </p>
                          </div>

                          <div className="group relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-purple-600/5 to-purple-700/5 border-2 border-primary/30 hover:border-primary/60 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20">
                            <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-primary/30 to-purple-600/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="flex items-center gap-3 mb-4">
                              <div className="h-1.5 w-16 bg-gradient-to-r from-primary to-purple-600 rounded-full shadow-lg shadow-primary/50" />
                              <span className="text-xs font-black text-primary uppercase tracking-widest">AI Solution</span>
                            </div>
                            <p className="text-lg text-foreground leading-relaxed font-semibold relative z-10">
                              Bot checks status, sends tracking links, updates customers—<span className="text-primary">instantly</span>
                            </p>
                          </div>
                        </div>

                        <div className="pt-8 relative">
                          <div className="group inline-flex items-center gap-6 px-8 py-6 rounded-3xl bg-gradient-to-br from-primary/20 via-purple-600/15 to-purple-700/10 border-2 border-primary/40 shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-500 hover:scale-105">
                            <div className="relative">
                              <TrendingUp className="h-12 w-12 text-primary relative z-10 group-hover:rotate-12 transition-transform duration-500" />
                              <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl" />
                            </div>
                            <div>
                              <div className="text-5xl font-black bg-gradient-to-r from-primary via-purple-600 to-purple-700 bg-clip-text text-transparent">80% reduction</div>
                              <div className="text-sm text-muted-foreground font-semibold uppercase tracking-wider mt-1">in WISMO tickets</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedStat === 1 && (
                      <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div>
                          <div className="flex items-center gap-4 mb-4">
                            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-purple-600 shadow-xl">
                              <Clock className="h-8 w-8 text-background relative z-10" />
                              <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-600 blur-xl opacity-50" />
                            </div>
                            <div>
                              <h3 className="text-3xl font-black text-foreground">After-Hours Support</h3>
                              <p className="text-sm text-muted-foreground">24/7 customer service coverage</p>
                            </div>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <div className="h-1 w-12 bg-red-500/50 rounded-full" />
                              <span className="text-xs font-bold text-red-500/70 uppercase tracking-wider">The Challenge</span>
                            </div>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                              Customers frustrated waiting until business hours
                            </p>
                          </div>
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <div className="h-1 w-12 bg-primary rounded-full" />
                              <span className="text-xs font-bold text-primary uppercase tracking-wider">AI Solution</span>
                            </div>
                            <p className="text-lg text-foreground leading-relaxed font-medium">
                              24/7 AI coverage for FAQs, basic troubleshooting, order changes
                            </p>
                          </div>
                        </div>
                        <div className="pt-6 border-t border-border/50">
                          <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-600/10 border border-primary/30">
                            <TrendingUp className="h-8 w-8 text-primary" />
                            <div>
                              <div className="text-3xl font-black text-primary">3x more</div>
                              <div className="text-sm text-muted-foreground">issues resolved outside 9-5</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedStat === 2 && (
                      <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div>
                          <div className="flex items-center gap-4 mb-4">
                            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-purple-600 shadow-xl">
                              <LifeBuoy className="h-8 w-8 text-background relative z-10" />
                              <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-600 blur-xl opacity-50" />
                            </div>
                            <div>
                              <h3 className="text-3xl font-black text-foreground">FAQ Deflection</h3>
                              <p className="text-sm text-muted-foreground">Instantly resolve common questions</p>
                            </div>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <div className="h-1 w-12 bg-red-500/50 rounded-full" />
                              <span className="text-xs font-bold text-red-500/70 uppercase tracking-wider">The Challenge</span>
                            </div>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                              Same questions asked hundreds of times daily
                            </p>
                          </div>
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <div className="h-1 w-12 bg-primary rounded-full" />
                              <span className="text-xs font-bold text-primary uppercase tracking-wider">AI Solution</span>
                            </div>
                            <p className="text-lg text-foreground leading-relaxed font-medium">
                              AI instantly answers password resets, how-tos, account setup
                            </p>
                          </div>
                        </div>
                        <div className="pt-6 border-t border-border/50">
                          <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-600/10 border border-primary/30">
                            <TrendingUp className="h-8 w-8 text-primary" />
                            <div>
                              <div className="text-3xl font-black text-primary">85%</div>
                              <div className="text-sm text-muted-foreground">FAQ deflection rate</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedStat === 3 && (
                      <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div>
                          <div className="flex items-center gap-4 mb-4">
                            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-xl">
                              <Zap className="h-8 w-8 text-background relative z-10" />
                              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-600 blur-xl opacity-50" />
                            </div>
                            <div>
                              <h3 className="text-3xl font-black text-foreground">Go Live Faster</h3>
                              <p className="text-sm text-muted-foreground">AI-guided platform configuration</p>
                            </div>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <div className="h-1 w-12 bg-red-500/50 rounded-full" />
                              <span className="text-xs font-bold text-red-500/70 uppercase tracking-wider">The Challenge</span>
                            </div>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                              Months of manual configuration delays deployment
                            </p>
                          </div>
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <div className="h-1 w-12 bg-purple-500 rounded-full" />
                              <span className="text-xs font-bold text-purple-500 uppercase tracking-wider">AI Solution</span>
                            </div>
                            <p className="text-lg text-foreground leading-relaxed font-medium">
                              Use copilots to configure Pullse—AI guides setup, suggests best practices, automates workflows
                            </p>
                          </div>
                        </div>
                        <div className="pt-6 border-t border-border/50">
                          <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-500/30">
                            <TrendingUp className="h-8 w-8 text-purple-500" />
                            <div>
                              <div className="text-3xl font-black text-purple-500">10x faster</div>
                              <div className="text-sm text-muted-foreground">time-to-value</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedStat === 4 && (
                      <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div>
                          <div className="flex items-center gap-4 mb-4">
                            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-xl">
                              <Database className="h-8 w-8 text-background relative z-10" />
                              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-600 blur-xl opacity-50" />
                            </div>
                            <div>
                              <h3 className="text-3xl font-black text-foreground">On-Demand Execution</h3>
                              <p className="text-sm text-muted-foreground">Cross-system action automation</p>
                            </div>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <div className="h-1 w-12 bg-red-500/50 rounded-full" />
                              <span className="text-xs font-bold text-red-500/70 uppercase tracking-wider">The Challenge</span>
                            </div>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                              Critical actions require jumping between multiple systems
                            </p>
                          </div>
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <div className="h-1 w-12 bg-purple-500 rounded-full" />
                              <span className="text-xs font-bold text-purple-500 uppercase tracking-wider">AI Solution</span>
                            </div>
                            <p className="text-lg text-foreground leading-relaxed font-medium">
                              Execute actions across your entire org stack—CRM, billing, ticketing—all from one place
                            </p>
                          </div>
                        </div>
                        <div className="pt-6 border-t border-border/50">
                          <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-500/30">
                            <TrendingUp className="h-8 w-8 text-purple-500" />
                            <div>
                              <div className="text-3xl font-black text-purple-500">5min → 30sec</div>
                              <div className="text-sm text-muted-foreground">task completion time</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedStat === 5 && (
                      <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div>
                          <div className="flex items-center gap-4 mb-4">
                            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-xl">
                              <Users className="h-8 w-8 text-background relative z-10" />
                              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-600 blur-xl opacity-50" />
                            </div>
                            <div>
                              <h3 className="text-3xl font-black text-foreground">Faster Ramp Time</h3>
                              <p className="text-sm text-muted-foreground">AI-powered agent onboarding</p>
                            </div>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <div className="h-1 w-12 bg-red-500/50 rounded-full" />
                              <span className="text-xs font-bold text-red-500/70 uppercase tracking-wider">The Challenge</span>
                            </div>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                              New agents take 6-8 weeks to become productive
                            </p>
                          </div>
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <div className="h-1 w-12 bg-purple-500 rounded-full" />
                              <span className="text-xs font-bold text-purple-500 uppercase tracking-wider">AI Solution</span>
                            </div>
                            <p className="text-lg text-foreground leading-relaxed font-medium">
                              Copilot acts as always-available senior mentor—suggests answers, surfaces docs in real-time
                            </p>
                          </div>
                        </div>
                        <div className="pt-6 border-t border-border/50">
                          <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-500/30">
                            <TrendingUp className="h-8 w-8 text-purple-500" />
                            <div>
                              <div className="text-3xl font-black text-purple-500">50% faster</div>
                              <div className="text-sm text-muted-foreground">agent onboarding</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Shared Infrastructure - Interactive Split Screen */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,hsl(var(--primary)/0.1),transparent_50%)]" />

          <div className="container mx-auto px-6 relative">
            <div className="text-center mb-20">
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-foreground mb-6">
                Unified infrastructure.
                <span className="block bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  Infinite scale.
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                One knowledge base, one AI brain, unlimited tools. Build faster, scale easier, manage smarter.
              </p>
            </div>

            <div className="max-w-[1300px] mx-auto">
              <div className="relative overflow-hidden rounded-[28px] border border-border/60 bg-card/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08),0_0_1px_rgba(0,0,0,0.05)_inset]">
                {/* Light mode mesh gradients */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(var(--primary-rgb),0.08)_0%,transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(139,92,246,0.06)_0%,transparent_50%)]" />

                <div className="grid lg:grid-cols-[360px,1fr] relative">
                  {/* Left Sidebar - Navigation Pills */}
                  <div className="border-r border-border/50 bg-gradient-to-b from-background/40 via-card/20 to-background/40 p-8 relative backdrop-blur-sm">
                    <div className="space-y-3">
                      {/* Content Center Pill */}
                      <button
                        onClick={() => setSelectedInfrastructure('content')}
                        className={`group relative w-full text-left p-5 rounded-[18px] transition-all duration-500 ease-out overflow-hidden ${
                          selectedInfrastructure === 'content'
                            ? 'bg-gradient-to-br from-primary/10 to-purple-600/5 border border-primary/30 shadow-lg shadow-primary/10'
                            : 'bg-card/50 border border-border/40 hover:border-primary/30 hover:bg-primary/5'
                        }`}
                      >
                        <div className={`absolute inset-0 rounded-[18px] bg-gradient-to-br from-primary/5 to-transparent transition-opacity duration-500 ${selectedInfrastructure === 'content' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                        <div className="relative flex items-center gap-4">
                          <div className={`flex h-12 w-12 items-center justify-center rounded-[14px] bg-gradient-to-br from-primary to-purple-600 shadow-md transition-all duration-500 ${
                            selectedInfrastructure === 'content' ? 'scale-100' : 'scale-95 opacity-70 group-hover:scale-100 group-hover:opacity-90'
                          }`}>
                            <Database className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className={`font-bold text-base tracking-tight transition-colors duration-500 ${selectedInfrastructure === 'content' ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>Content Center</div>
                            <div className="text-[11px] text-muted-foreground/70 mt-0.5">Knowledge hub</div>
                          </div>
                          {selectedInfrastructure === 'content' && (
                            <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.6)] animate-pulse" />
                          )}
                        </div>
                      </button>

                      {/* Action Center Pill */}
                      <button
                        onClick={() => setSelectedInfrastructure('action')}
                        className={`group relative w-full text-left p-5 rounded-[18px] transition-all duration-500 ease-out overflow-hidden ${
                          selectedInfrastructure === 'action'
                            ? 'bg-gradient-to-br from-purple-600/10 to-indigo-600/5 border border-purple-500/30 shadow-lg shadow-purple-500/10'
                            : 'bg-card/50 border border-border/40 hover:border-purple-500/30 hover:bg-purple-500/5'
                        }`}
                      >
                        <div className={`absolute inset-0 rounded-[18px] bg-gradient-to-br from-purple-500/5 to-transparent transition-opacity duration-500 ${selectedInfrastructure === 'action' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                        <div className="relative flex items-center gap-4">
                          <div className={`flex h-12 w-12 items-center justify-center rounded-[14px] bg-gradient-to-br from-purple-600 to-indigo-600 shadow-md transition-all duration-500 ${
                            selectedInfrastructure === 'action' ? 'scale-100' : 'scale-95 opacity-70 group-hover:scale-100 group-hover:opacity-90'
                          }`}>
                            <Zap className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className={`font-bold text-base tracking-tight transition-colors duration-500 ${selectedInfrastructure === 'action' ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>Action Center</div>
                            <div className="text-[11px] text-muted-foreground/70 mt-0.5">Integrations</div>
                          </div>
                          {selectedInfrastructure === 'action' && (
                            <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)] animate-pulse" />
                          )}
                        </div>
                      </button>

                      {/* AI Engine Pill */}
                      <button
                        onClick={() => setSelectedInfrastructure('engine')}
                        className={`group relative w-full text-left p-5 rounded-[18px] transition-all duration-500 ease-out overflow-hidden ${
                          selectedInfrastructure === 'engine'
                            ? 'bg-gradient-to-br from-indigo-600/10 to-primary/5 border border-indigo-500/30 shadow-lg shadow-indigo-500/10'
                            : 'bg-card/50 border border-border/40 hover:border-indigo-500/30 hover:bg-indigo-500/5'
                        }`}
                      >
                        <div className={`absolute inset-0 rounded-[18px] bg-gradient-to-br from-indigo-500/5 to-transparent transition-opacity duration-500 ${selectedInfrastructure === 'engine' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                        <div className="relative flex items-center gap-4">
                          <div className={`flex h-12 w-12 items-center justify-center rounded-[14px] bg-gradient-to-br from-indigo-600 to-primary shadow-md transition-all duration-500 ${
                            selectedInfrastructure === 'engine' ? 'scale-100' : 'scale-95 opacity-70 group-hover:scale-100 group-hover:opacity-90'
                          }`}>
                            <Brain className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className={`font-bold text-base tracking-tight transition-colors duration-500 ${selectedInfrastructure === 'engine' ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>AI Engine</div>
                            <div className="text-[11px] text-muted-foreground/70 mt-0.5">Core intelligence</div>
                          </div>
                          {selectedInfrastructure === 'engine' && (
                            <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)] animate-pulse" />
                          )}
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Right Content Panel */}
                  <div className="p-8 lg:p-12 relative">
                    <div className="relative min-h-[500px]">
                      {/* Content Center Content */}
                      {selectedInfrastructure === 'content' && (
                        <div className="animate-in fade-in slide-in-from-right-8 duration-700">
                          <div className="flex items-start gap-5 mb-10">
                            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-[20px] bg-gradient-to-br from-primary to-purple-600 shadow-2xl">
                              <Database className="h-10 w-10 text-white" />
                            </div>
                            <div>
                              <h3 className="text-4xl font-black text-foreground mb-3 tracking-tight">Content Center</h3>
                              <p className="text-lg text-muted-foreground leading-relaxed">Add content 4 ways—snippets, files, URLs, or Appo articles. The AI Engine retrieves exactly what it needs.</p>
                            </div>
                          </div>

                          <div className="space-y-5 mb-8">
                            {[
                              { icon: FileText, title: 'Snippets', desc: 'Quick FAQs and knowledge articles. Perfect for common questions and instant answers.' },
                              { icon: RefreshCw, title: 'Files', desc: 'PDFs, docs, and documents. Upload directly and we\'ll auto-index and chunk the content.' },
                              { icon: Layers, title: 'URLs', desc: 'Web scraping from any public URL. Keep content synced automatically.' },
                              { icon: CheckCircle2, title: 'Appo', desc: 'Help center articles. Connect your Appo knowledge base for seamless access.' }
                            ].map((feature, i) => (
                              <div key={i} className="group relative p-6 rounded-[20px] border border-border/40 bg-gradient-to-br from-card via-background/50 to-card hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
                                <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative flex items-start gap-4">
                                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-primary/20 to-purple-600/10 group-hover:scale-110 transition-transform duration-500">
                                    <feature.icon className="h-5 w-5 text-primary" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="font-bold text-base text-foreground mb-2 tracking-tight">{feature.title}</div>
                                    <div className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="mt-8 p-6 rounded-[20px] bg-gradient-to-br from-primary/5 via-transparent to-purple-600/5 border border-primary/20">
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <Sparkles className="h-5 w-5 text-primary" />
                              <span className="font-medium">Auto-indexes and chunks content • Always up-to-date, zero maintenance • Works across all deployments</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Action Center Content */}
                      {selectedInfrastructure === 'action' && (
                        <div className="animate-in fade-in slide-in-from-right-8 duration-700">
                          <div className="flex items-start gap-5 mb-10">
                            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-[20px] bg-gradient-to-br from-purple-600 to-indigo-600 shadow-2xl">
                              <Zap className="h-10 w-10 text-white" />
                            </div>
                            <div>
                              <h3 className="text-4xl font-black text-foreground mb-3 tracking-tight">Action Center</h3>
                              <p className="text-lg text-muted-foreground leading-relaxed">Connect tools once—the AI Engine executes real actions. Secure, governed, and fully audited.</p>
                            </div>
                          </div>

                          <div className="space-y-5 mb-8">
                            {[
                              { icon: Code, title: 'Connectors', desc: '50+ integrations including Stripe, Salesforce, Slack, HubSpot, Shopify. Pull data and trigger actions.' },
                              { icon: Settings, title: 'Custom APIs', desc: 'Any REST API. Connect internal tools or external services with custom endpoints.' },
                              { icon: Play, title: 'Approvals', desc: 'Gated actions with multi-level approval workflows. Define who can do what with full control.' },
                              { icon: Lock, title: 'Audit Log', desc: 'Full tracking of every action. Complete audit trail with who, what, when, and why for compliance.' }
                            ].map((feature, i) => (
                              <div key={i} className="group relative p-6 rounded-[20px] border border-border/40 bg-gradient-to-br from-card via-background/50 to-card hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-500">
                                <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative flex items-start gap-4">
                                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-purple-600/20 to-indigo-600/10 group-hover:scale-110 transition-transform duration-500">
                                    <feature.icon className="h-5 w-5 text-purple-600" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="font-bold text-base text-foreground mb-2 tracking-tight">{feature.title}</div>
                                    <div className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="mt-8 p-6 rounded-[20px] bg-gradient-to-br from-purple-600/5 via-transparent to-indigo-600/5 border border-purple-500/20">
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <Sparkles className="h-5 w-5 text-purple-600" />
                              <span className="font-medium">Refunds, updates, workflows, tickets • Multi-level approval workflows • Complete audit trail & governance</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* AI Engine Content */}
                      {selectedInfrastructure === 'engine' && (
                        <div className="animate-in fade-in slide-in-from-right-8 duration-700">
                          <div className="flex items-start gap-5 mb-10">
                            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-[20px] bg-gradient-to-br from-indigo-600 to-primary shadow-2xl">
                              <Brain className="h-10 w-10 text-white" />
                            </div>
                            <div>
                              <h3 className="text-4xl font-black text-foreground mb-3 tracking-tight">AI Engine</h3>
                              <p className="text-lg text-muted-foreground leading-relaxed">The intelligent core that understands context, learns from interactions, and gets smarter over time.</p>
                            </div>
                          </div>

                          <div className="space-y-5 mb-8">
                            {[
                              { icon: MessageSquare, title: 'Contextual Memory', desc: 'Remembers conversation history, user preferences, and past interactions for personalized responses.' },
                              { icon: Brain, title: 'Advanced Reasoning', desc: 'Multi-step problem solving, clarifying questions, and complex query understanding with chain-of-thought.' },
                              { icon: TrendingUp, title: 'Continuous Learning', desc: 'Learns from corrections, feedback, and human oversight to improve accuracy without retraining.' },
                              { icon: Shield, title: 'Enterprise-Grade AI', desc: 'Data isolation, complete audit logs, and role-based access control. SOC 2 Type II controls in progress.' }
                            ].map((feature, i) => (
                              <div key={i} className="group relative p-6 rounded-[20px] border border-border/40 bg-gradient-to-br from-card via-background/50 to-card hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500">
                                <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative flex items-start gap-4">
                                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-indigo-600/20 to-primary/10 group-hover:scale-110 transition-transform duration-500">
                                    <feature.icon className="h-5 w-5 text-indigo-600" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="font-bold text-base text-foreground mb-2 tracking-tight">{feature.title}</div>
                                    <div className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="mt-8 p-6 rounded-[20px] bg-gradient-to-br from-indigo-600/5 via-transparent to-primary/5 border border-indigo-500/20 mb-8">
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <Sparkles className="h-5 w-5 text-indigo-600" />
                              <span className="font-medium">Powered by GPT-4, Claude, and custom models—choose what works best for you</span>
                            </div>
                          </div>

                          <div className="pt-6 border-t border-border/50">
                            <Link href="/product/ai-engine">
                              <RouteButton
                                href="/product/ai-engine"
                                variant="default"
                                size="lg"
                                className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-primary hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-500"
                              >
                                <span className="relative z-10 flex items-center gap-2">
                                  Explore AI Engine in Detail
                                  <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                                </span>
                              </RouteButton>
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Metrics Section */}
        <section ref={statsRef} className="relative py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.1),transparent_50%)]" />

          <div className="container mx-auto px-6 relative">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-4">
                Platform capabilities
                <span className="block bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent">at a glance</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Built to handle enterprise scale with industry-leading performance</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {/* Metric 1: Response Time */}
              <div className="group relative overflow-hidden rounded-[28px] border border-border/50 bg-gradient-to-br from-card via-background/50 to-card p-8 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-[18px] bg-gradient-to-br from-primary to-purple-600 shadow-xl">
                      <Zap className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="text-5xl font-black text-foreground mb-2">
                      <AnimatedCounter end={200} suffix="ms" trigger={statsAnimated} />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Avg Response Time</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">Lightning-fast AI responses powered by optimized inference</p>
                  </div>
                </div>
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
              </div>

              {/* Metric 2: Uptime */}
              <div className="group relative overflow-hidden rounded-[28px] border border-border/50 bg-gradient-to-br from-card via-background/50 to-card p-8 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-[18px] bg-gradient-to-br from-purple-600 to-indigo-600 shadow-xl">
                      <CheckCircle2 className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="text-5xl font-black text-foreground mb-2">99.9%</div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Platform Uptime</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">Enterprise-grade reliability with redundant infrastructure</p>
                  </div>
                </div>
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
              </div>

              {/* Metric 3: Languages */}
              <div className="group relative overflow-hidden rounded-[28px] border border-border/50 bg-gradient-to-br from-card via-background/50 to-card p-8 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-[18px] bg-gradient-to-br from-indigo-600 to-primary shadow-xl">
                      <MessageSquare className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="text-5xl font-black text-foreground mb-2">
                      <AnimatedCounter end={100} suffix="+" trigger={statsAnimated} />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">AI Model Access</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">Support for 100+ LLM models and providers</p>
                  </div>
                </div>
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl" />
              </div>

              {/* Metric 4: Integration Points */}
              <div className="group relative overflow-hidden rounded-[28px] border border-border/50 bg-gradient-to-br from-card via-background/50 to-card p-8 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-[18px] bg-gradient-to-br from-primary to-purple-600 shadow-xl">
                      <Layers className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="text-5xl font-black text-foreground mb-2">
                      <AnimatedCounter end={50} suffix="+" trigger={statsAnimated} />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Pre-Built Integrations</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">Connect to your favorite tools out of the box</p>
                  </div>
                </div>
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
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
                  <span>SOC 2 Type II in progress</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>Enterprise security</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Enterprise-ready platform</span>
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
