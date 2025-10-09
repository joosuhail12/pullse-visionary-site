'use client';

import { useEffect, useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import RouteButton from "@/components/RouteButton";
import MagicBento from "@/components/MagicBento";
import type { CardData } from "@/components/MagicBento";
import Image from "next/image";
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
  const [selectedStat, setSelectedStat] = useState<number | null>(null);
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
                  <span>6 AI tools</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>One training process</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <span>4.8/5 on G2</span>
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
                        Autonomous Deflection
                      </h3>
                      <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                        Handle routine customer inquiries automatically, 24/7 across every channel. Smart escalation to humans when needed.
                      </p>

                      <div className="space-y-4">
                        {[
                          { label: '24/7 Availability', detail: 'Never closes, never sleeps' },
                          { label: 'Multi-Channel', detail: 'Web, Slack, WhatsApp, Email, Teams' },
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
                        Agent Augmentation
                      </h3>
                      <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                        Give agents instant AI assistance for complex inquiries. Never touches customers—pure productivity boost.
                      </p>

                      <div className="space-y-4">
                        {[
                          { label: 'On-Demand Help', detail: 'Triggered by agents, not automated' },
                          { label: 'Knowledge Retrieval', detail: 'Instant access to all documentation' },
                          { label: 'Response Drafting', detail: 'AI-written answers in your voice' },
                          { label: 'Zero Customer Contact', detail: 'Never interacts with end users' }
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

        {/* Chatbots Use Cases - Masonry Style */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08),transparent_60%)]" />

          <div className="container mx-auto px-6 relative">
            <div className="max-w-3xl mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Bot className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Chatbot Use Cases</span>
              </div>
              <h2 className="text-5xl sm:text-6xl font-black text-foreground mb-6">
                Where chatbots
                <span className="block text-primary">excel</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Autonomous AI handling customer conversations across industries.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {[
                { icon: ShoppingCart, title: 'Order Tracking', desc: '"Where\'s my order?" handled instantly. Check status, provide updates, send tracking links—no human needed.', tag: 'E-commerce, Retail' },
                { icon: Clock, title: 'After-Hours Support', desc: 'Customers don\'t wait for business hours. Bots provide 24/7 coverage for common questions and basic troubleshooting.', tag: 'All Industries' },
                { icon: CreditCard, title: 'Account Inquiries', desc: 'Check balances, update billing info, verify transactions. Secure, instant account management.', tag: 'Financial Services, SaaS' },
                { icon: LifeBuoy, title: 'FAQ Deflection', desc: '"How do I reset my password?" answered instantly. Deflect repetitive questions, free up agents for complex issues.', tag: 'SaaS, Tech Support' },
                { icon: Users, title: 'Lead Qualification', desc: 'Engage prospects, ask qualifying questions, route hot leads to sales. Convert while you sleep.', tag: 'Sales, Marketing' },
                { icon: Settings, title: 'Self-Service Actions', desc: 'Process refunds, cancel subscriptions, reschedule appointments. Empower customers to help themselves.', tag: 'Subscriptions, Services' },
              ].map((useCase, index) => {
                const Icon = useCase.icon;
                return (
                  <div key={index} className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

                    <div className="relative">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 group-hover:scale-110 group-hover:border-primary/40 transition-all duration-300">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                        <div className="px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-xs font-semibold text-primary">
                          {useCase.tag}
                        </div>
                      </div>

                      <h4 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{useCase.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {useCase.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Copilots Use Cases - Timeline Style */}
        <section className="relative py-28 bg-gradient-to-b from-purple-500/5 via-background to-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                <Sparkles className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-semibold text-purple-500">Copilot Use Cases</span>
              </div>
              <h2 className="text-5xl sm:text-6xl font-black text-foreground mb-6">
                Where copilots
                <span className="block bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">shine</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                AI-powered agent assistance for complex scenarios that need a human touch.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {[
                { icon: Users, title: 'New Hire Onboarding', desc: 'New agents productive in days, not weeks. Copilot suggests answers, surfaces relevant docs, acts as a senior mentor.', tag: '50% faster ramp time' },
                { icon: Code, title: 'Technical Support', desc: 'Complex API questions, integration troubleshooting. Copilot retrieves docs, suggests solutions, drafts technical responses.', tag: 'Developer Tools, APIs' },
                { icon: Brain, title: 'Product Complexity', desc: '300-page documentation? No problem. Copilot instantly surfaces the exact section agents need for any question.', tag: 'Enterprise Software' },
                { icon: Shield, title: 'Compliance & Regulations', desc: 'Agents need precise, compliant language. Copilot ensures every response meets regulatory requirements.', tag: 'Healthcare, Finance, Legal' },
                { icon: TrendingUp, title: 'Peak Volume Periods', desc: 'Black Friday, product launches, incidents. Copilot helps agents handle 3x volume without sacrificing quality.', tag: 'Seasonal Businesses' },
                { icon: CheckCircle2, title: 'Response Consistency', desc: 'Every agent sounds like your best rep. Copilot ensures consistent tone, accuracy, and brand voice across all responses.', tag: 'All Industries' },
              ].map((useCase, index) => {
                const Icon = useCase.icon;
                return (
                  <div key={index} className="group relative flex items-start gap-6 p-8 rounded-3xl border border-border/50 bg-card hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
                    <div className="flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/20 group-hover:scale-110 group-hover:border-purple-500/40 transition-all duration-300">
                      <Icon className="h-7 w-7 text-purple-500" />
                    </div>

                    <div className="flex-1 pt-1">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h4 className="text-2xl font-bold group-hover:text-purple-500 transition-colors">{useCase.title}</h4>
                        <div className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-500 whitespace-nowrap">
                          {useCase.tag}
                        </div>
                      </div>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        {useCase.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Shared Infrastructure - Stacked Cards Design */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,hsl(var(--primary)/0.1),transparent_50%)]" />

          <div className="container mx-auto px-6 relative">
            <div className="text-center mb-20">
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-foreground mb-6">
                Three pillars.
                <span className="block bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  Infinite possibilities.
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Every AI tool shares the same core infrastructure. Train once, deploy everywhere, learn continuously.
              </p>
            </div>

            <div className="max-w-5xl mx-auto space-y-8">
              {/* Content Center */}
              <div className="group relative rounded-3xl border border-border/50 bg-gradient-to-r from-card via-card to-primary/5 p-10 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl">
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="flex-shrink-0">
                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-purple-600 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                      <Database className="h-10 w-10 text-background" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-black mb-3 group-hover:text-primary transition-colors">Content Center</h3>
                    <p className="text-lg text-muted-foreground mb-6">Single source of truth for all AI tools</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {['Import from Notion, Confluence, Google Docs', 'Version control and content scheduling', 'Train once, power all tools', 'Automatic freshness checks'].map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          <span className="text-sm text-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Center */}
              <div className="group relative rounded-3xl border border-border/50 bg-gradient-to-r from-card via-card to-purple-500/5 p-10 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl md:ml-12">
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="flex-shrink-0">
                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                      <Zap className="h-10 w-10 text-background" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-black mb-3 group-hover:text-purple-500 transition-colors">Action Center</h3>
                    <p className="text-lg text-muted-foreground mb-6">Connect AI to your tools and workflows</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {['Pre-built: Stripe, Salesforce, Zendesk, HubSpot', 'Custom REST API integrations', 'Execute refunds, lookups, updates', 'Permission controls and approvals'].map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                          <span className="text-sm text-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Engine */}
              <div className="group relative rounded-3xl border border-border/50 bg-gradient-to-r from-card via-card to-indigo-500/5 p-10 hover:border-indigo-500/50 transition-all duration-500 hover:shadow-2xl md:ml-24">
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="flex-shrink-0">
                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-600 to-primary shadow-2xl group-hover:scale-110 transition-transform duration-300">
                      <MessageSquare className="h-10 w-10 text-background" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-black mb-3 group-hover:text-indigo-500 transition-colors">Chat Engine</h3>
                    <p className="text-lg text-muted-foreground mb-6">Core AI brain powering conversations</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {['Contextual understanding and memory', 'Multi-turn reasoning and clarification', 'Learns from corrections and feedback', 'Enterprise-grade security'].map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                          <span className="text-sm text-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section - Interactive Cards */}
        <section ref={statsRef} className="relative py-28">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-4">
                Results that speak
                <span className="block bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent">for themselves</span>
              </h2>
              <p className="text-lg text-muted-foreground">Click on any metric to learn more</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
              {/* Stat 1: Conversations */}
              <button
                onClick={() => setSelectedStat(selectedStat === 0 ? null : 0)}
                className={`group relative overflow-hidden rounded-3xl border text-left transition-all duration-500 p-8 ${
                  selectedStat === 0
                    ? 'border-primary bg-gradient-to-br from-primary/20 via-primary/10 to-transparent shadow-2xl shadow-primary/30 scale-105'
                    : 'border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent hover:border-primary/40 hover:shadow-xl hover:shadow-primary/20'
                }`}
              >
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-6xl font-black text-primary">
                      <AnimatedCounter end={2} suffix="M+" trigger={statsAnimated} />
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 group-hover:scale-110 transition-transform">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <p className="text-lg font-bold text-foreground mb-2">Conversations</p>
                  <p className="text-sm text-muted-foreground mb-4">Powered by AI Suite</p>

                  {selectedStat === 0 && (
                    <div className="mt-4 pt-4 border-t border-primary/20 animate-in fade-in slide-in-from-top-2 duration-300">
                      <p className="text-sm text-foreground leading-relaxed">Across 50+ enterprise customers, our AI Suite has powered over 2 million customer conversations with 99.9% uptime.</p>
                    </div>
                  )}

                  <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-primary">
                    <span>{selectedStat === 0 ? 'Click to collapse' : 'Click to learn more'}</span>
                    <ArrowRight className={`h-3 w-3 transition-transform duration-300 ${selectedStat === 0 ? 'rotate-90' : ''}`} />
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              </button>

              {/* Stat 2: Deflection Rate */}
              <button
                onClick={() => setSelectedStat(selectedStat === 1 ? null : 1)}
                className={`group relative overflow-hidden rounded-3xl border text-left transition-all duration-500 p-8 ${
                  selectedStat === 1
                    ? 'border-purple-500 bg-gradient-to-br from-purple-500/20 via-purple-500/10 to-transparent shadow-2xl shadow-purple-500/30 scale-105'
                    : 'border-purple-500/20 bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/20'
                }`}
              >
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-6xl font-black text-purple-500">
                      <AnimatedCounter end={87} suffix="%" trigger={statsAnimated} />
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20 group-hover:scale-110 transition-transform">
                      <BarChart3 className="h-5 w-5 text-purple-500" />
                    </div>
                  </div>
                  <p className="text-lg font-bold text-foreground mb-2">Deflection Rate</p>
                  <p className="text-sm text-muted-foreground mb-4">Industry-leading average</p>

                  {selectedStat === 1 && (
                    <div className="mt-4 pt-4 border-t border-purple-500/20 animate-in fade-in slide-in-from-top-2 duration-300">
                      <p className="text-sm text-foreground leading-relaxed">Our chatbots successfully resolve 87% of inquiries without human intervention, freeing up your team for complex issues.</p>
                    </div>
                  )}

                  <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-purple-500">
                    <span>{selectedStat === 1 ? 'Click to collapse' : 'Click to learn more'}</span>
                    <ArrowRight className={`h-3 w-3 transition-transform duration-300 ${selectedStat === 1 ? 'rotate-90' : ''}`} />
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              </button>

              {/* Stat 3: Faster Ramp */}
              <button
                onClick={() => setSelectedStat(selectedStat === 2 ? null : 2)}
                className={`group relative overflow-hidden rounded-3xl border text-left transition-all duration-500 p-8 ${
                  selectedStat === 2
                    ? 'border-indigo-500 bg-gradient-to-br from-indigo-500/20 via-indigo-500/10 to-transparent shadow-2xl shadow-indigo-500/30 scale-105'
                    : 'border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 via-indigo-500/5 to-transparent hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/20'
                }`}
              >
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-6xl font-black text-indigo-500">
                      <AnimatedCounter end={50} suffix="%" trigger={statsAnimated} />
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 group-hover:scale-110 transition-transform">
                      <TrendingUp className="h-5 w-5 text-indigo-500" />
                    </div>
                  </div>
                  <p className="text-lg font-bold text-foreground mb-2">Faster Ramp</p>
                  <p className="text-sm text-muted-foreground mb-4">New agent onboarding</p>

                  {selectedStat === 2 && (
                    <div className="mt-4 pt-4 border-t border-indigo-500/20 animate-in fade-in slide-in-from-top-2 duration-300">
                      <p className="text-sm text-foreground leading-relaxed">AI Copilots cut new hire training time in half, getting agents productive in days instead of weeks.</p>
                    </div>
                  )}

                  <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-indigo-500">
                    <span>{selectedStat === 2 ? 'Click to collapse' : 'Click to learn more'}</span>
                    <ArrowRight className={`h-3 w-3 transition-transform duration-300 ${selectedStat === 2 ? 'rotate-90' : ''}`} />
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              </button>

              {/* Stat 4: QA Coverage */}
              <button
                onClick={() => setSelectedStat(selectedStat === 3 ? null : 3)}
                className={`group relative overflow-hidden rounded-3xl border text-left transition-all duration-500 p-8 ${
                  selectedStat === 3
                    ? 'border-primary bg-gradient-to-br from-primary/20 via-primary/10 to-transparent shadow-2xl shadow-primary/30 scale-105'
                    : 'border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent hover:border-primary/40 hover:shadow-xl hover:shadow-primary/20'
                }`}
              >
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-6xl font-black text-primary">
                      100<span className="text-4xl">%</span>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 group-hover:scale-110 transition-transform">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <p className="text-lg font-bold text-foreground mb-2">QA Coverage</p>
                  <p className="text-sm text-muted-foreground mb-4">Every conversation analyzed</p>

                  {selectedStat === 3 && (
                    <div className="mt-4 pt-4 border-t border-primary/20 animate-in fade-in slide-in-from-top-2 duration-300">
                      <p className="text-sm text-foreground leading-relaxed">Unlike manual QA that samples 5-10%, Auto-QA evaluates 100% of conversations the moment they close.</p>
                    </div>
                  )}

                  <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-primary">
                    <span>{selectedStat === 3 ? 'Click to collapse' : 'Click to learn more'}</span>
                    <ArrowRight className={`h-3 w-3 transition-transform duration-300 ${selectedStat === 3 ? 'rotate-90' : ''}`} />
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
              </button>
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
