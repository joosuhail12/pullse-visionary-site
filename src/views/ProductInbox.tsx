'use client';

import { useEffect, useState, useRef, lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";

const LiquidEther = lazy(() => import("@/components/LiquidEther"));
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import RouteButton from "@/components/RouteButton";
import MagicBento from "@/components/MagicBento";
import type { CardData } from "@/components/MagicBento";
import Image from "next/image";
import {
  Mail,
  MessageSquare,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  MessageCircle,
  AtSign,
  Zap,
  Bot,
  Search,
  Keyboard,
  Bell,
  TrendingUp,
  Clock,
  Target,
  LayoutGrid,
  GitBranch,
  BarChart3,
  Play,
  Star,
  Hand,
  RotateCw,
} from "lucide-react";
// Import all screenshots
import fullInboxScreenshot from "@/assets/screenshots/full-inbox.png";
import aiRewritingScreenshot from "@/assets/screenshots/ai-rewriting.png";
import multiChannelScreenshot from "@/assets/screenshots/Multi-Channel-Unified-View.png";
import customerContextScreenshot from "@/assets/screenshots/Customer-Context-Panel.png";
import internalCollabScreenshot from "@/assets/screenshots/internal-collaboration.png";
import routingConfigScreenshot from "@/assets/screenshots/routing-config.png";
import cannedResponsesScreenshot from "@/assets/screenshots/canned-responses-library.png";
import searchFilterScreenshot from "@/assets/screenshots/search-filter.png";
import analyticsScreenshot from "@/assets/screenshots/analytics.png";

// Animated Counter Component
const AnimatedCounter = ({ end, suffix = '', duration = 2000, trigger = false }: { end: number; suffix?: string; duration?: number; trigger?: boolean }) => {
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

  return <>{count}{suffix}</>;
};

const ProductInbox = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);
  const [statsAnimated, setStatsAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Bento Grid Card Data
  const bentoCards: CardData[] = [
    {
      color: 'hsl(var(--card))',
      title: 'Email + Live Chat Unified',
      description: 'Support customers across both channels from one workspace. No tab switching, no separate tools.',
      label: 'Multi-Channel',
      icon: MessageSquare,
      image: multiChannelScreenshot.src,
    },
    {
      color: 'hsl(var(--card))',
      title: 'AI-Powered Assistance',
      description: 'AI rewriting, summaries, and auto-responses that make every agent superhuman.',
      label: 'AI Features',
      icon: Sparkles,
      image: aiRewritingScreenshot.src,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Complete Customer Context',
      description: 'Full history, custom fields, and interaction timeline in one glance.',
      label: 'Customer Data',
      icon: Users,
      image: customerContextScreenshot.src,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Powerful Search & Filters',
      description: 'Find any conversation instantly with advanced filters and saved views.',
      label: 'Search',
      icon: Search,
      image: searchFilterScreenshot.src,
    },
    {
      color: 'hsl(var(--card))',
      title: '100% Auto-Routing',
      description: 'Every ticket gets auto-assigned. Load balanced, round robin, or manual control.',
      label: 'Smart Routing',
      icon: GitBranch,
      image: routingConfigScreenshot.src,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Team Collaboration',
      description: 'Internal notes, @mentions, and collision detection for seamless teamwork.',
      label: 'Collaboration',
      icon: AtSign,
      image: internalCollabScreenshot.src,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Canned Responses',
      description: 'Pre-written templates with variables for 5x faster replies.',
      label: 'Productivity',
      icon: MessageSquare,
      image: cannedResponsesScreenshot.src,
    },
  ];

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

            // Trigger stats animation
            if (entry.target === statsRef.current && !statsAnimated) {
              setStatsAnimated(true);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach((el) => observer.observe(el));

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [statsAnimated]);

  const aiFeatures = [
    {
      icon: Sparkles,
      title: 'AI Rewriting',
      description: 'Transform any message with one click',
      benefit: '5x faster replies',
      details: [
        'Adjust tone: Formal, casual, friendly, empathetic',
        'Fix grammar and spelling automatically',
        'Expand or condense messages',
        'Maintain brand voice consistency',
      ],
      stat: '73% faster',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: MessageCircle,
      title: 'AI Summaries',
      description: 'Instant conversation context',
      benefit: 'Instant context',
      details: [
        'Auto-summarize long ticket threads',
        'Extract key points and action items',
        'Sentiment analysis',
        'Intent detection for smart routing',
      ],
      stat: '80% time saved',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Bot,
      title: 'AI Auto-Response',
      description: 'Resolve common issues automatically',
      benefit: '80% automated',
      details: [
        'Knowledge base powered answers',
        'Handle FAQs without human touch',
        'Escalate complex issues gracefully',
        'Learn from agent responses',
      ],
      stat: '80% automated',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const workspaceFeatures = [
    {
      icon: Mail,
      title: 'Email & Chat Unified',
      description: 'All conversations in one place—no tab switching',
      image: 'inbox-unified.png', // Replace with actual screenshot
    },
    {
      icon: Users,
      title: 'Customer Context',
      description: 'Full history, custom fields, and interaction timeline',
      image: 'customer-context.png',
    },
    {
      icon: Search,
      title: 'Powerful Search',
      description: 'Find any conversation instantly with advanced filters',
      image: 'search-filters.png',
    },
  ];

  const collaborationFeatures = [
    {
      icon: AtSign,
      title: 'Internal Notes',
      description: '@mention teammates and discuss tickets privately',
      benefit: 'Seamless handoffs',
    },
    {
      icon: Users,
      title: 'Collision Detection',
      description: 'See who is viewing or replying in real-time',
      benefit: 'Zero duplicate work',
    },
    {
      icon: GitBranch,
      title: 'Smart Assignment',
      description: 'Auto-route by workload or round robin',
      benefit: 'Fair distribution',
    },
    {
      icon: Bell,
      title: 'Real-time Notifications',
      description: 'Stay updated on @mentions and escalations',
      benefit: 'Never miss urgent issues',
    },
  ];

  const productivityTools = [
    {
      icon: MessageSquare,
      title: 'Canned Responses',
      description: 'Pre-written templates with variables',
      shortcut: '/shortcut',
    },
    {
      icon: Keyboard,
      title: 'Keyboard Shortcuts',
      description: 'Navigate at lightning speed',
      shortcut: 'Cmd+K',
    },
    {
      icon: LayoutGrid,
      title: 'Custom Views',
      description: 'Save filter combinations',
      shortcut: '',
    },
    {
      icon: Target,
      title: 'SLA Tracking',
      description: 'Never miss a deadline',
      shortcut: '',
    },
  ];

  const stats = [
    {
      id: 'automation-rate',
      value: 80,
      suffix: '%',
      label: 'Automation rate',
      description: 'Tickets handled without human touch',
      icon: Bot,
      color: 'from-purple-500 to-pink-500',
      badge: { text: 'Industry leading', trend: 'neutral' },
      featured: true,
      gridSpan: 'lg:col-span-2 lg:row-span-2',
    },
    {
      id: 'new-tickets',
      value: 1247,
      label: 'New Tickets',
      description: 'Created this month',
      icon: Mail,
      color: 'from-blue-500 to-cyan-500',
      badge: { text: '+12.5%', trend: 'up' },
      featured: false,
      gridSpan: 'lg:col-span-1',
    },
    {
      id: 'tickets-closed',
      value: 1156,
      label: 'Tickets Closed',
      description: 'Resolved this month',
      icon: CheckCircle2,
      color: 'from-green-500 to-emerald-500',
      badge: { text: '+8.2%', trend: 'up' },
      featured: false,
      gridSpan: 'lg:col-span-1',
    },
    {
      id: 'replies-sent',
      value: 2843,
      label: 'Replies Sent',
      description: 'Total responses',
      icon: MessageCircle,
      color: 'from-amber-500 to-orange-500',
      badge: { text: '+15.7%', trend: 'up' },
      featured: false,
      gridSpan: 'lg:col-span-1',
    },
    {
      id: 'first-response',
      value: 42,
      suffix: ' min',
      label: 'Avg First Response',
      description: 'Time to first reply',
      icon: Clock,
      color: 'from-rose-500 to-pink-500',
      badge: { text: '-18% faster', trend: 'down' },
      featured: false,
      gridSpan: 'lg:col-span-1',
    },
  ];

  return (
    <div className="min-h-screen">
      <PageLiquidBackground opacity={0.45} />
      <Navigation />

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-border/20">
        <div
          className="h-full bg-gradient-to-r from-primary via-primary to-primary/60 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] lg:min-h-screen flex items-center pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_50%)]" />

        {/* Hero Liquid Ether Effect */}
        <div className="absolute inset-0 -z-10 opacity-70 hidden md:block">
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

        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header Content */}
            <div className="text-center mb-16 space-y-8">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-foreground leading-[1.05] tracking-tight max-w-5xl mx-auto">
                The inbox that makes
                <span className="block bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent animate-gradient mt-2">
                  agents superhuman
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Support your customers across email and live chat from one unified inbox. AI writes replies, auto-routing handles assignment. Your team moves 3x faster.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>2-week setup</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>No credit card</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <span>Built for teams that demand excellence</span>
                </div>
              </div>
            </div>

            {/* Hero Screenshot */}
            <div className="relative max-w-6xl mx-auto">
              {/* Glow effect */}
              <div className="absolute -inset-12 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-3xl opacity-60" />

              {/* Main screenshot card */}
              <div className="relative rounded-3xl border border-border/50 bg-gradient-to-br from-card/95 via-card to-card/90 p-2 sm:p-3 shadow-2xl backdrop-blur-xl">
                <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted/30 border border-border/30">
                  <Image
                    src={fullInboxScreenshot}
                    alt="Pullse Inbox Interface - Unified workspace for email and chat"
                    className="w-full"
                    priority
                  />
                </div>
              </div>

              {/* Floating stat badges */}
              <div className="absolute -left-4 top-1/4 hidden lg:block">
                <div className="rounded-2xl border border-border/60 bg-card/95 p-5 shadow-xl backdrop-blur-xl animate-float">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                      <Bot className="h-6 w-6 text-background" />
                    </div>
                    <div>
                      <div className="text-2xl font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">68%</div>
                      <div className="text-xs text-muted-foreground">Automated</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 top-1/3 hidden lg:block">
                <div className="rounded-2xl border border-border/60 bg-card/95 p-5 shadow-xl backdrop-blur-xl animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg">
                      <TrendingUp className="h-6 w-6 text-background" />
                    </div>
                    <div>
                      <div className="text-2xl font-black bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">3x</div>
                      <div className="text-xs text-muted-foreground">Faster replies</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Value Props Section */}
      <section className="relative py-20 bg-gradient-to-b from-muted/10 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Mail, title: 'Email & Live Chat', description: 'Two channels, one inbox' },
                { icon: Sparkles, title: 'AI writes replies', description: '5x faster responses' },
                { icon: Zap, title: '100% auto-routing', description: 'Zero manual assignment' },
                { icon: Clock, title: '2-week setup', description: 'Not 6 months' },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-all hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 fade-in-up"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative space-y-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 transition-all group-hover:scale-110">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08),transparent_60%)]" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-20 space-y-6 fade-in-up">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                AI that actually helps agents
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Built-in AI features that make every agent as effective as your best agent
              </p>
            </div>

            {/* AI Features Grid */}
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              {aiFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card transition-all hover:border-primary/40 hover:shadow-2xl hover:-translate-y-2 fade-in-up"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 transition-opacity group-hover:opacity-5`} />

                    <div className="relative p-8 space-y-6">
                      {/* Icon & Stat */}
                      <div className="flex items-start justify-between">
                        <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg transition-all group-hover:scale-110`}>
                          <Icon className="h-8 w-8 text-background" />
                        </div>
                        <div className="rounded-xl bg-primary/10 px-4 py-2 border border-primary/20">
                          <div className="text-sm font-bold text-primary">{feature.stat}</div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-3">
                        <h3 className="text-2xl font-bold text-foreground">{feature.title}</h3>
                        <p className="text-base text-muted-foreground">{feature.description}</p>
                      </div>

                      {/* Details */}
                      <div className="space-y-3 pt-4 border-t border-border/40">
                        {feature.details.map((detail, dIndex) => (
                          <div key={dIndex} className="flex items-start gap-3">
                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                            <p className="text-sm text-foreground/80 leading-relaxed">
                              {detail}
                            </p>
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

      {/* Features Bento Grid Section */}
      <section className="relative py-32 bg-gradient-to-b from-muted/10 via-muted/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-20 space-y-6 fade-in-up">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                Everything you need in one inbox
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Email, live chat, AI assistance, smart routing, and team collaboration—all unified
              </p>
            </div>

            {/* MagicBento Grid */}
            <div className="fade-in-up">
              <MagicBento
                cardData={bentoCards}
                enableSpotlight={true}
                enableBorderGlow={true}
                enableStars={true}
                enableTilt={false}
                enableMagnetism={true}
                clickEffect={true}
              />
            </div>
          </div>
        </div>
      </section>


      {/* Analytics & Results Section */}
      <section className="relative py-32 bg-gradient-to-b from-muted/10 via-muted/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-20 space-y-6 fade-in-up">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                Measure what matters
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Real-time insights into team performance, automation rates, and customer satisfaction
              </p>
            </div>

            {/* Stats Bento Grid */}
            <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                const getBadgeColor = (trend: string) => {
                  if (trend === 'up') return 'bg-green-500/10 text-green-500 border-green-500/20';
                  if (trend === 'down') return 'bg-green-500/10 text-green-500 border-green-500/20';
                  return 'bg-primary/10 text-primary border-primary/20';
                };

                return (
                  <div
                    key={stat.id}
                    className={`group relative overflow-hidden rounded-3xl
                      border border-white/40 shadow-[0_8px_32px_rgba(124,58,237,0.12)] ring-1 ring-black/5
                      bg-white/70 backdrop-blur-[20px] backdrop-saturate-150
                      ${stat.gridSpan}
                      ${stat.featured ? 'p-12' : 'p-8'}
                      transition-[transform,box-shadow,border-color] duration-300 ease-out
                      hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/20
                      hover:-translate-y-2 hover:scale-[1.01]
                      focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                      fade-in-up`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                    role="article"
                    aria-label={`${stat.label}: ${stat.value}${stat.suffix || ''}`}
                    tabIndex={0}
                  >
                    {/* Dual-layer hover glow */}
                    <div className={`absolute -inset-2 bg-gradient-to-r ${stat.color} rounded-3xl opacity-0 group-hover:opacity-30 blur-3xl transition-all duration-300`} />
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-all duration-300`} />

                    {/* Enhanced gradient background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-[0.08] group-hover:opacity-[0.15] transition-opacity duration-300`} />

                    {/* Radial gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-radial from-white/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Featured card distinction */}
                    {stat.featured && (
                      <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 rounded-3xl blur-sm" />
                    )}

                    <div className="relative space-y-6">
                      {/* Icon and Badge Row */}
                      <div className="flex items-start justify-between transition-all duration-300 delay-100 group-hover:translate-x-1">
                        <div className={`inline-flex ${stat.featured ? 'h-20 w-20' : 'h-16 w-16'} items-center justify-center rounded-2xl bg-gradient-to-br ${stat.color} shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-2xl`}>
                          <Icon className={`${stat.featured ? 'h-10 w-10' : 'h-8 w-8'} text-background transition-transform duration-300 group-hover:scale-110`} />
                        </div>

                        {/* Percentage Badge */}
                        <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 border ${getBadgeColor(stat.badge.trend)} transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg`}>
                          {stat.badge.trend === 'up' && <TrendingUp className="h-3.5 w-3.5" />}
                          {stat.badge.trend === 'down' && <TrendingUp className="h-3.5 w-3.5 rotate-180" />}
                          <span className="text-[10px] md:text-xs font-semibold tracking-wide uppercase">{stat.badge.text}</span>
                        </div>
                      </div>

                      {/* Value */}
                      <div className="space-y-1.5 transition-all duration-300 delay-150 group-hover:translate-x-1">
                        <div className={`${stat.featured ? 'text-6xl md:text-7xl lg:text-8xl' : 'text-4xl md:text-5xl lg:text-6xl'} font-extrabold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent leading-[0.9] tracking-tighter tabular-nums drop-shadow-sm`}>
                          <AnimatedCounter
                            end={stat.value}
                            suffix={stat.suffix || ''}
                            trigger={statsAnimated}
                            duration={2000}
                          />
                        </div>
                        <div className={`${stat.featured ? 'text-lg md:text-xl' : 'text-sm md:text-base'} font-bold text-foreground/90 tracking-tight leading-tight`}>
                          {stat.label}
                        </div>
                        <div className="text-xs md:text-sm text-muted-foreground/80 leading-relaxed">
                          {stat.description}
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

      {/* Final CTA */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.15),transparent_60%)]" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card to-card/90 shadow-2xl fade-in-up">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.1),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--primary)/0.1),transparent_50%)]" />

              <div className="relative p-12 lg:p-16">
                <div className="text-center space-y-10">
                  <div className="space-y-6">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                      Ready to make your agents superhuman?
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                      See Pullse Inbox in action. Book a personalized demo with our team.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <RouteButton size="lg" className="text-base px-10 py-7 shadow-xl shadow-primary/20" href="/contact-sales">
                      Book a demo
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </RouteButton>
                    <RouteButton size="lg" variant="outline" className="text-base px-10 py-7" href="/pricing">
                      View pricing
                    </RouteButton>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-8 border-t border-border/40">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>2-week setup</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Founder-led onboarding</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>No credit card required</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

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
    </div>
  );
};

export default ProductInbox;
