'use client';

import { useEffect, useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import RouteButton from "@/components/RouteButton";
import ResultCard from "@/components/ResultCard";
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
  GitBranch,
  Hand,
  FileText,
  Search,
  Keyboard,
  Bell,
  TrendingUp,
  Lightbulb,
  Scale,
  RotateCw,
  Bot,
} from "lucide-react";
import inboxScreenshot from "@/assets/pullse-inbox-screenshot.png";

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

const ProductInboxChannels = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeRouting, setActiveRouting] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroStatsRef = useRef<HTMLDivElement>(null);
  const [statsAnimated, setStatsAnimated] = useState(false);

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

  // Track mouse position for magnetic effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Trigger stats animation
            if (entry.target === heroStatsRef.current && !statsAnimated) {
              setStatsAnimated(true);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach((el) => observer.observe(el));

    // Observe stats section
    if (heroStatsRef.current) {
      observer.observe(heroStatsRef.current);
    }

    return () => observer.disconnect();
  }, [statsAnimated]);

  const channels = [
    {
      id: 'email',
      icon: Mail,
      title: 'Email',
      headline: 'Multi-account email management',
      description: 'Connect unlimited email accounts and manage all messages in one intelligent workspace.',
      features: [
        { label: 'Multi-account support', detail: 'Gmail, Outlook, custom domains' },
        { label: 'Threaded conversations', detail: 'Full context in every reply' },
        { label: 'Rich formatting', detail: 'HTML editor with templates' },
        { label: 'Smart forwarding', detail: 'Auto-route to inbox by rules' },
      ],
      color: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/10 via-cyan-500/5 to-transparent',
      stats: { value: '< 2s', label: 'Avg sync time' },
    },
    {
      id: 'chat',
      icon: MessageSquare,
      title: 'Live Chat',
      headline: 'Real-time customer engagement',
      description: 'Embeddable chat widget with instant messaging, typing indicators, and offline message capture.',
      features: [
        { label: 'Website widget', detail: 'Embed in 5 minutes' },
        { label: 'Real-time messaging', detail: 'Sub-100ms latency' },
        { label: 'File sharing', detail: 'Images, docs, screenshots' },
        { label: 'Offline messages', detail: 'Capture leads 24/7' },
      ],
      color: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-500/10 via-emerald-500/5 to-transparent',
      stats: { value: '< 100ms', label: 'Message latency' },
    },
  ];

  const aiFeatures = [
    {
      icon: FileText,
      title: 'AI Summaries',
      description: 'Instant conversation context at a glance',
      capabilities: [
        'Auto-generate summaries of long ticket threads',
        'Extract key points and action items',
        'Sentiment analysis (positive/neutral/negative)',
        'Customer intent detection for routing',
      ],
      color: 'from-amber-500 to-orange-500',
      demo: 'Summarize → AI extracts: Issue, sentiment, next steps',
    },
    {
      icon: Lightbulb,
      title: 'Smart Suggestions',
      description: 'AI recommends the best next action',
      capabilities: [
        'Knowledge base article suggestions',
        'Canned response recommendations',
        'Suggested tags based on content',
        'Escalation triggers for complex issues',
      ],
      color: 'from-cyan-500 to-teal-500',
      demo: 'Type "refund" → AI suggests refund policy article + template',
    },
  ];

  const routingMethods = [
    {
      icon: Scale,
      title: 'Load Balanced',
      description: 'Distribute tickets evenly across your team',
      details: [
        'Assigns based on current agent workload',
        'Prevents burnout and bottlenecks',
        'Real-time capacity monitoring',
        'Best for teams with equal skill levels',
      ],
      useCase: 'High-volume support with generalists',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: RotateCw,
      title: 'Round Robin',
      description: 'Sequential assignment to available agents',
      details: [
        'Fair distribution in predictable order',
        'Respects agent status (online/offline)',
        'Configurable agent pools',
        'Best for steady ticket flow',
      ],
      useCase: 'Balanced teams with consistent availability',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Hand,
      title: 'Manual Assignment',
      description: 'Human-controlled routing with smart filters',
      details: [
        'Managers assign based on expertise',
        'Filter by team, skills, or availability',
        'Override rules for VIP customers',
        'Best for specialized support',
      ],
      useCase: 'Enterprise accounts requiring specific expertise',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const productivityFeatures = [
    {
      icon: MessageCircle,
      title: 'Canned Responses',
      description: 'Library of pre-written replies with shortcuts and variables',
      benefit: '5x faster replies',
    },
    {
      icon: AtSign,
      title: 'Internal Notes',
      description: 'Team collaboration with @mentions and private comments',
      benefit: 'Seamless handoffs',
    },
    {
      icon: Users,
      title: 'Collision Detection',
      description: 'See who is viewing or replying in real-time',
      benefit: 'Zero duplicate work',
    },
    {
      icon: Keyboard,
      title: 'Keyboard Shortcuts',
      description: 'Quick actions for power users (assign, close, tag)',
      benefit: '40% faster workflows',
    },
    {
      icon: Bell,
      title: 'Status Management',
      description: 'Online/away/busy indicators with auto-away',
      benefit: 'Accurate routing',
    },
    {
      icon: Search,
      title: 'Search & Filters',
      description: 'Advanced ticket search with saved views',
      benefit: 'Find anything instantly',
    },
  ];

  const results = [
    {
      value: '73%',
      label: 'Faster responses',
      description: 'With AI rewriting and canned responses',
      icon: Zap,
      color: 'from-blue-500 to-cyan-500',
      visualizationType: 'comparison' as const,
      animatedValue: 73,
      contextData: {
        subtitle: 'Average response time reduction',
        comparison: {
          before: { label: 'Manual', value: '60min' },
          after: { label: 'With AI', value: '16min' },
        },
        progressValue: 73,
      },
    },
    {
      value: '80%',
      label: 'Automation rate',
      description: 'Tickets handled without human touch',
      icon: Bot,
      color: 'from-purple-500 to-pink-500',
      visualizationType: 'stacked' as const,
      animatedValue: 80,
      contextData: {
        subtitle: '2.4M tickets per year',
        stackedData: {
          primary: 80,
          secondary: 20,
          primaryLabel: 'Automated',
          secondaryLabel: 'Manual',
        },
        badge: {
          text: 'Savings: $2.1M annually',
          color: 'bg-green-500/10 text-green-500 border border-green-500/20',
        },
      },
    },
    {
      value: '4.8',
      label: 'CSAT score',
      description: 'Average customer satisfaction rating',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      visualizationType: 'stars' as const,
      animatedValue: 4.8,
      contextData: {
        subtitle: 'From 12,847 responses',
        trend: {
          value: '0.3',
          direction: 'up' as const,
          label: 'vs last quarter',
        },
      },
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

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.1),transparent_50%)]" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Content */}
              <div className="space-y-10">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    <span className="text-xs font-semibold tracking-wide text-primary">Unified Inbox</span>
                  </div>

                  <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-foreground leading-[1.1] tracking-tight">
                    Every conversation,
                    <span className="block bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent animate-gradient">
                      one workspace
                    </span>
                  </h1>

                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Email and live chat unified in a single intelligent inbox. AI-powered rewriting, smart routing, and collaboration tools that keep your team moving fast.
                  </p>
                </div>

                {/* Stats */}
                <div ref={heroStatsRef} className="grid grid-cols-2 gap-6">
                  <div className="group relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-card/60 to-card/30 p-6 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-xl hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative space-y-2">
                      <div className="text-5xl font-black bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent tabular-nums">
                        <AnimatedCounter end={2} trigger={statsAnimated} duration={1500} />
                      </div>
                      <div className="text-sm font-semibold text-muted-foreground">channels</div>
                      <div className="text-xs text-muted-foreground/70">Email + Live Chat</div>
                    </div>
                    <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-primary animate-pulse" />
                  </div>

                  <div className="group relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-card/60 to-card/30 p-6 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-xl hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative space-y-2">
                      <div className="text-5xl font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent tabular-nums">
                        <AnimatedCounter end={80} suffix="%" trigger={statsAnimated} duration={1800} />
                      </div>
                      <div className="text-sm font-semibold text-muted-foreground">automation</div>
                      <div className="text-xs text-muted-foreground/70">Avg rate achieved</div>
                    </div>
                    <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-purple-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
                  </div>

                  <div className="group relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-card/60 to-card/30 p-6 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-xl hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative space-y-2">
                      <div className="text-5xl font-black bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent tabular-nums">
                        &lt;<AnimatedCounter end={100} trigger={statsAnimated} duration={1600} />ms
                      </div>
                      <div className="text-sm font-semibold text-muted-foreground">latency</div>
                      <div className="text-xs text-muted-foreground/70">Real-time sync</div>
                    </div>
                    <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>

                  <div className="group relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-card/60 to-card/30 p-6 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-xl hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative space-y-2">
                      <div className="text-5xl font-black bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent tabular-nums">
                        <AnimatedCounter end={3} trigger={statsAnimated} duration={1400} />
                      </div>
                      <div className="text-sm font-semibold text-muted-foreground">routing methods</div>
                      <div className="text-xs text-muted-foreground/70">Assignment options</div>
                    </div>
                    <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-amber-500 animate-pulse" style={{ animationDelay: '0.6s' }} />
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <RouteButton size="lg" href="/contact-sales" className="text-base px-8 py-6 shadow-xl shadow-primary/20">
                    See the inbox
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </RouteButton>
                  <RouteButton size="lg" variant="outline" href="/pricing" className="text-base px-8 py-6">
                    View pricing
                  </RouteButton>
                </div>
              </div>

              {/* Right: Visual */}
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-8 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-3xl" />

                {/* Main card */}
                <div className="relative rounded-3xl border border-border/50 bg-gradient-to-br from-card/95 via-card to-card/90 p-3 shadow-2xl backdrop-blur-xl">
                  <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted/30 border border-border/30">
                    <Image
                      src={inboxScreenshot}
                      alt="Pullse Unified Inbox"
                      className="w-full"
                      priority
                    />
                  </div>
                </div>

                {/* Floating badges */}
                <div className="absolute -left-6 top-1/4 hidden lg:block">
                  <div className="rounded-2xl border border-border/60 bg-card/95 p-4 shadow-xl backdrop-blur-xl animate-float" style={{ animationDelay: '0s' }}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Zap className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-foreground">AI-powered</div>
                        <div className="text-xs text-muted-foreground">Smart features</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-6 bottom-1/4 hidden lg:block">
                  <div className="rounded-2xl border border-border/60 bg-card/95 p-4 shadow-xl backdrop-blur-xl animate-float" style={{ animationDelay: '1s' }}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-foreground">Real-time</div>
                        <div className="text-xs text-muted-foreground">Instant sync</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Channels */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/10 via-transparent to-muted/10" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-20 space-y-6 fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
                <GitBranch className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold tracking-wide text-primary">Channels</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                Two channels, infinite possibilities
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Email and live chat, unified in one workspace
              </p>
            </div>

            {/* Channel Cards */}
            <div className="space-y-24">
              {channels.map((channel, index) => {
                const Icon = channel.icon;
                const isEven = index % 2 === 0;

                return (
                  <div key={channel.id} className="relative fade-in-up" style={{ transitionDelay: `${index * 100}ms` }}>
                    <div className={`grid lg:grid-cols-2 gap-16 items-center ${!isEven ? 'lg:direction-rtl' : ''}`}>
                      {/* Content */}
                      <div className={`space-y-8 ${!isEven ? 'lg:direction-ltr' : ''}`}>
                        <div className="space-y-4">
                          <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${channel.color} shadow-lg`}>
                            <Icon className="h-8 w-8 text-background" />
                          </div>
                          <div>
                            <div className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
                              {channel.title}
                            </div>
                            <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
                              {channel.headline}
                            </h3>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                              {channel.description}
                            </p>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="space-y-4">
                          {channel.features.map((feature, fIndex) => (
                            <div key={fIndex} className="flex items-start gap-4">
                              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/10 mt-1">
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <div className="text-base font-bold text-foreground">{feature.label}</div>
                                <div className="text-sm text-muted-foreground">{feature.detail}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Visual */}
                      <div className={`relative ${!isEven ? 'lg:direction-ltr' : ''}`}>
                        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card to-card/80 shadow-2xl">
                          <div className={`absolute inset-0 bg-gradient-to-br ${channel.bgGradient}`} />
                          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:48px_48px]" />

                          <div className="relative p-12 lg:p-16">
                            <div className="space-y-8">
                              {/* Large Icon */}
                              <div className="flex items-center justify-center">
                                <div className={`flex h-32 w-32 items-center justify-center rounded-3xl bg-gradient-to-br ${channel.color} shadow-2xl`}>
                                  <Icon className="h-16 w-16 text-background" />
                                </div>
                              </div>

                              {/* Stat */}
                              <div className="text-center space-y-2">
                                <div className={`text-6xl font-black bg-gradient-to-r ${channel.color} bg-clip-text text-transparent`}>
                                  {channel.stats.value}
                                </div>
                                <div className="text-lg text-foreground/80">
                                  {channel.stats.label}
                                </div>
                              </div>
                            </div>
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

      {/* AI Features */}
      <section className="relative py-32 bg-gradient-to-b from-muted/10 via-muted/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-20 space-y-6 fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold tracking-wide text-primary">AI Intelligence</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                AI that makes agents superhuman
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Built-in tools that rewrite, summarize, and suggest
              </p>
            </div>

            {/* AI Feature Cards */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* AI Feature Cards */}
              {aiFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card transition-all hover:border-primary/40 hover:shadow-2xl hover:-translate-y-2 fade-in-up"
                    style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 transition-opacity group-hover:opacity-5`} />

                    <div className="relative p-8 space-y-6">
                      <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg transition-all group-hover:scale-110`}>
                        <Icon className="h-8 w-8 text-background" />
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-2xl font-bold text-foreground">{feature.title}</h3>
                        <p className="text-base text-muted-foreground">{feature.description}</p>
                      </div>

                      <div className="space-y-3 pt-4 border-t border-border/40">
                        {feature.capabilities.map((capability, cIndex) => (
                          <div key={cIndex} className="flex items-start gap-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                            <p className="text-sm text-foreground/80 leading-relaxed">
                              {capability}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4">
                        <div className="rounded-xl bg-muted/30 p-4 border border-border/30">
                          <p className="text-xs font-mono text-muted-foreground">
                            {feature.demo}
                          </p>
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

      {/* Routing Mechanisms */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/10 to-transparent" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-20 space-y-6 fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
                <GitBranch className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold tracking-wide text-primary">Smart Routing</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                Three ways to route conversations
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Choose the assignment method that fits your team
              </p>
            </div>

            {/* Routing Cards */}
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              {routingMethods.map((method, index) => {
                const Icon = method.icon;
                const isActive = activeRouting === index;

                return (
                  <button
                    key={index}
                    onClick={() => setActiveRouting(index)}
                    className={`group relative overflow-hidden rounded-3xl border transition-all duration-300 text-left fade-in-up ${
                      isActive
                        ? 'border-primary/40 bg-card shadow-2xl scale-105'
                        : 'border-border/60 bg-card/60 hover:border-primary/30 hover:shadow-xl hover:scale-102'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 transition-opacity ${isActive ? 'opacity-10' : 'group-hover:opacity-5'}`} />

                    <div className="relative p-8 space-y-6">
                      {/* Icon */}
                      <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 ${
                        isActive
                          ? `bg-gradient-to-br ${method.color} shadow-lg`
                          : 'bg-primary/10 group-hover:bg-primary/15'
                      }`}>
                        <Icon className={`h-8 w-8 ${isActive ? 'text-background' : 'text-primary'}`} />
                      </div>

                      {/* Content */}
                      <div className="space-y-3">
                        <h3 className={`text-2xl font-bold transition-colors ${isActive ? 'text-foreground' : 'text-foreground/80'}`}>
                          {method.title}
                        </h3>
                        <p className="text-base text-muted-foreground leading-relaxed">
                          {method.description}
                        </p>
                      </div>

                      {/* Details */}
                      <div className="space-y-2">
                        {method.details.map((detail, dIndex) => (
                          <div key={dIndex} className="flex items-start gap-3">
                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                            <p className="text-sm text-foreground/80">{detail}</p>
                          </div>
                        ))}
                      </div>

                      {/* Use case */}
                      <div className="pt-4 border-t border-border/40">
                        <div className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
                          Best For
                        </div>
                        <div className="text-sm font-semibold text-foreground">
                          {method.useCase}
                        </div>
                      </div>
                    </div>

                    {/* Active indicator */}
                    {isActive && (
                      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${method.color}`} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Productivity Features */}
      <section className="relative py-32 bg-gradient-to-b from-muted/10 via-muted/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-20 space-y-6 fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold tracking-wide text-primary">Productivity</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                Built for speed and collaboration
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything your team needs to work faster together
              </p>
            </div>

            {/* Bento Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productivityFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-8 transition-all hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 fade-in-up"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                    <div className="relative space-y-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 transition-all group-hover:scale-110 group-hover:bg-primary/15">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-foreground">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>

                      <div className="pt-2">
                        <div className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1.5 border border-primary/20">
                          <Zap className="h-3.5 w-3.5 text-primary" />
                          <span className="text-xs font-bold text-primary">{feature.benefit}</span>
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

      {/* Results */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-20 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold tracking-wide text-primary">Expected Results</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                Real impact, measurable results
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Target outcomes for your team
              </p>
            </div>

            {/* Result Cards */}
            <div className="grid md:grid-cols-3 gap-8">
              {results.map((result, index) => (
                <ResultCard
                  key={index}
                  icon={result.icon}
                  value={result.value}
                  label={result.label}
                  description={result.description}
                  color={result.color}
                  visualizationType={result.visualizationType}
                  animatedValue={result.animatedValue}
                  contextData={result.contextData}
                  delay={index * 0.1}
                />
              ))}
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
                  <div className="space-y-6">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                      See the inbox in action
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                      Book a demo with our team. We'll show you how Pullse unifies your channels and supercharges your agents.
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
                      <span>2-4 week implementation</span>
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

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 0 20px rgba(var(--primary-rgb), 0.3);
          }
          50% {
            opacity: 0.8;
            box-shadow: 0 0 30px rgba(var(--primary-rgb), 0.5);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-shimmer {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 100%
          );
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }

        .direction-rtl {
          direction: rtl;
        }

        .direction-ltr {
          direction: ltr;
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

        /* Glassmorphism effect */
        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Smooth transitions for all interactive elements */
        button, a {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: hsl(var(--background));
        }

        ::-webkit-scrollbar-thumb {
          background: hsl(var(--primary) / 0.3);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--primary) / 0.5);
        }
      `}</style>
    </div>
  );
};

export default ProductInboxChannels;
