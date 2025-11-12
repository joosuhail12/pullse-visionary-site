'use client';

import { useEffect, useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import RouteButton from "@/components/RouteButton";
import RoiCalculator from "@/components/RoiCalculator";
import {
  Sparkles,
  CheckCircle2,
  ShoppingCart,
  Truck,
  RotateCw,
  Zap,
  TrendingUp,
  Clock,
  MessageSquare,
  Users,
  Shield,
  CreditCard,
  RefreshCw,
  AlertTriangle,
  DollarSign,
  Play,
  BarChart3,
  Heart,
  ArrowRight,
  Mail,
  Package,
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

const SolutionEcommerce = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [statsAnimated, setStatsAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Scroll progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);

      // Stats animation trigger
      if (statsRef.current && !statsAnimated) {
        const rect = statsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          setStatsAnimated(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [statsAnimated]);

  const pillars = [
    {
      icon: Truck,
      title: 'AI Chatbots',
      subtitle: 'Kill WISMO Tickets',
      description: '80% of your tickets are "Where\'s my order?" Let AI handle them. Auto-detect order numbers, pull real-time tracking from Shopify + carriers, send personalized updates.',
      stat: '80%',
      statLabel: 'WISMO auto-resolved',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: RotateCw,
      title: 'AI Copilots',
      subtitle: 'One-Command Returns',
      description: 'Returns take 6 minutes across Shopify → ShipStation → Stripe. Agent types "process return + send label"—AI executes all 4 steps in 2 minutes.',
      stat: '2 min',
      statLabel: 'from request to label sent',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: TrendingUp,
      title: 'Auto-QA',
      subtitle: 'Survive Black Friday',
      description: 'Peak season = 5x volume spike. AI handles the surge, routes complex issues, maintains quality. No temp hires needed.',
      stat: '92%',
      statLabel: 'CSAT during peak season',
      color: 'from-green-500 to-emerald-500'
    }
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
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_50%)]" />

        <div className="container relative mx-auto px-4 w-full">
          <div className="max-w-[1400px] mx-auto">
            {/* Header Content */}
            <div className="text-center space-y-8">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-foreground leading-[1.05] tracking-tight max-w-6xl mx-auto">
                Seasonal spikes crush your team. Every single time.
                <span className="block bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent mt-3">
                  Handle 10x the volume. Zero temp hires.
                </span>
              </h1>

              <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground leading-relaxed max-w-4xl mx-auto font-normal">
                AI that auto-resolves 80% of WISMO tickets, processes returns in 2 minutes, and handles every spike—holiday rushes, flash sales, product launches. Your team survives without breaking. Same agents. 10x capacity.
              </p>

              {/* CTA */}
              <div className="pt-6">
                <RouteButton size="lg" href="/contact-sales" className="text-base px-10 py-6 shadow-xl shadow-primary/20 group">
                  Book a demo
                  <Play className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                </RouteButton>
              </div>

              {/* Trust Signals */}
              <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 pt-6 text-base text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Live in 2 weeks</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>No credit card</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Shopify native</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-muted/10 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-[1400px] mx-auto">
            <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { value: 80, suffix: '%', label: 'WISMO tickets', detail: 'eliminated by AI', icon: Truck },
                { value: 6, suffix: ' min', label: 'Saved per return', detail: 'from 8 min to 2 min', icon: Clock },
                { value: 30, suffix: 's', label: 'Auto-response', detail: 'avg tracking reply', icon: MessageSquare },
                { value: 10, suffix: 'x', label: 'Peak capacity', detail: 'Black Friday ready', icon: TrendingUp },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={i}
                    className="group relative text-center"
                  >
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <div className="text-5xl md:text-6xl font-black text-foreground mb-3">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} trigger={statsAnimated} />
                    </div>
                    <div className="text-sm font-bold text-foreground mb-1">{stat.label}</div>
                    <div className="text-xs text-muted-foreground">{stat.detail}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3 Pillars Section */}
      <section className="relative py-24 md:py-32">
        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-20 space-y-6">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                Three ways to handle e-commerce chaos
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                WISMO automation, instant returns, and peak season scalability—all working together
              </p>
            </div>

            {/* Pillar Cards */}
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <div key={index} className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card transition-all hover:border-primary/40 hover:shadow-2xl hover:-translate-y-2">
                    <div className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-0 transition-opacity group-hover:opacity-5`} />

                    <div className="relative p-8 space-y-6">
                      {/* Icon & Badge */}
                      <div className="flex items-start justify-between">
                        <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${pillar.color} shadow-lg transition-all group-hover:scale-110`}>
                          <Icon className="h-8 w-8 text-background" />
                        </div>
                        <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase">
                          {pillar.subtitle}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-3">
                        <h3 className="text-2xl font-bold text-foreground">{pillar.title}</h3>
                        <p className="text-base text-muted-foreground leading-relaxed">{pillar.description}</p>
                      </div>

                      {/* Stat */}
                      <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
                        <div className={`text-5xl font-black bg-gradient-to-r ${pillar.color} bg-clip-text text-transparent mb-2`}>
                          {pillar.stat}
                        </div>
                        <div className="text-sm text-foreground/80">{pillar.statLabel}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Core E-commerce Workflows Section */}
      <section className="relative py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* WISMO Featured Workflow - 62% of all tickets */}
            <div className="mb-16">
              <div className="relative overflow-hidden rounded-3xl border-2 border-primary/40 bg-gradient-to-br from-blue-500/5 via-card to-cyan-500/5 p-10 md:p-12">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.1),transparent_50%)]" />

                <div className="relative space-y-8">
                  {/* Scenario */}
                  <div>
                    <h3 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                      WISMO Ticket Elimination
                    </h3>
                    <div className="rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/30 shrink-0">
                          <MessageSquare className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-bold text-muted-foreground mb-1">Email received • 10:43 AM</div>
                          <p className="text-lg font-semibold text-foreground italic mb-2">
                            "WHERE IS MY ORDER?! It's been 5 days and I haven't heard ANYTHING. Order #5847. If it doesn't arrive by Friday I need a FULL REFUND!"
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>3rd contact attempt</span>
                            <span>•</span>
                            <span>Customer satisfaction at risk</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Before/After Split */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Traditional Way */}
                    <div className="rounded-2xl border-2 border-destructive/40 bg-gradient-to-br from-destructive/5 to-transparent p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/20 border border-destructive/40">
                          <AlertTriangle className="h-5 w-5 text-destructive" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-destructive">Traditional Way</div>
                          <div className="text-xs text-muted-foreground">4 tools, 6 tabs, manual work</div>
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        {['Helpdesk: Read ticket', 'Shopify: Search order', 'Copy tracking number', 'FedEx: Check status', 'Email: Draft response', 'Update ticket notes'].map((step, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="h-1.5 w-1.5 rounded-full bg-destructive/60" />
                            {step}
                          </div>
                        ))}
                      </div>

                      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Time spent</span>
                          <span className="font-bold text-destructive">4 min 20s</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Cost per ticket</span>
                          <span className="font-bold text-destructive">$5.80</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Agent feeling</span>
                          <span className="font-bold text-destructive">😤 Frustrated</span>
                        </div>
                      </div>
                    </div>

                    {/* Pullse Way */}
                    <div className="rounded-2xl border-2 border-primary bg-gradient-to-br from-primary/10 to-transparent p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 shadow-md">
                          <Zap className="h-5 w-5 text-background" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-primary">Pullse AI</div>
                          <div className="text-xs text-primary/80">Zero agent time, instant resolution</div>
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        {['AI detects WISMO pattern', 'Extracts order #5847', 'Pulls tracking: FedEx APIs', 'Sends personalized response', 'Updates helpdesk', 'Ticket closed'].map((step, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                            <span className="text-foreground">{step}</span>
                          </div>
                        ))}
                      </div>

                      <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Time spent</span>
                          <span className="font-bold text-primary">28 seconds</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Cost per ticket</span>
                          <span className="font-bold text-green-600">$0.40</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Agent feeling</span>
                          <span className="font-bold text-green-600">😊 Never saw it</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Impact Summary */}
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-border/40">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                        <Clock className="h-6 w-6 text-background" />
                      </div>
                      <div>
                        <div className="text-2xl font-black text-foreground">3 min 52s saved</div>
                        <div className="text-xs text-muted-foreground">Per ticket × 1,240 WISMO/month</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg">
                        <DollarSign className="h-6 w-6 text-background" />
                      </div>
                      <div>
                        <div className="text-2xl font-black text-green-600">$6,696/mo saved</div>
                        <div className="text-xs text-muted-foreground">$5.40 savings per WISMO</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Critical Workflows - Compact Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {/* Wrong Item Emergency */}
              <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative p-6 space-y-5">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-500 shadow-md">
                      <AlertTriangle className="h-5 w-5 text-background" />
                    </div>
                    <div className="px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-600 text-xs font-bold uppercase tracking-wide">
                      Urgent
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-foreground mb-3">Wrong Item Emergency</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                      "Sent SIZE SMALL. Need LARGE for my sister's WEDDING tomorrow!"
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 py-5 border-y border-border/40">
                    <div className="text-center">
                      <div className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Traditional</div>
                      <div className="text-2xl font-black text-destructive mb-1">15 min</div>
                      <div className="text-xs text-muted-foreground">6 tool switches</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-semibold text-primary/80 mb-2 uppercase tracking-wide">Pullse AI</div>
                      <div className="text-2xl font-black text-primary mb-1">2.5 min</div>
                      <div className="text-xs text-primary/70">One command</div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Time saved</span>
                      <span className="text-base font-bold text-foreground">12.5 min</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">$ saved per ticket</span>
                      <span className="text-base font-bold text-green-600">$18.40</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Customer saved</span>
                      <span className="text-base font-bold text-green-600">$1.2K LTV</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Black Friday Surge */}
              <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative p-6 space-y-5">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 shadow-md">
                      <TrendingUp className="h-5 w-5 text-background" />
                    </div>
                    <div className="px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-600 text-xs font-bold uppercase tracking-wide">
                      Peak Season
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-foreground mb-3">Black Friday Survival</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                      Volume spikes 2,000 → 10,000 tickets. Team same size. No burnout.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 py-5 border-y border-border/40">
                    <div className="text-center">
                      <div className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Without Pullse</div>
                      <div className="text-2xl font-black text-destructive mb-1">Hire 40</div>
                      <div className="text-xs text-muted-foreground">temp agents</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-semibold text-primary/80 mb-2 uppercase tracking-wide">With Pullse</div>
                      <div className="text-2xl font-black text-primary mb-1">Same team</div>
                      <div className="text-xs text-primary/70">AI handles 70%</div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Temp hire cost avoided</span>
                      <span className="text-base font-bold text-green-600">$84K</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">CSAT maintained</span>
                      <span className="text-base font-bold text-green-600">92%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Response time</span>
                      <span className="text-base font-bold text-primary">{'<'}4 hours</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Return Fraud Detection */}
              <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative p-6 space-y-5">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-pink-500 shadow-md">
                      <Shield className="h-5 w-5 text-background" />
                    </div>
                    <div className="px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-600 text-xs font-bold uppercase tracking-wide">
                      Risk Insights
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-foreground mb-3">Return Pattern Analysis</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                      3rd return this month. Pullse surfaces: 12 orders, 8 returns (66% rate).
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 py-5 border-y border-border/40">
                    <div className="text-center">
                      <div className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Traditional</div>
                      <div className="text-2xl font-black text-destructive mb-1">No context</div>
                      <div className="text-xs text-muted-foreground">Approve blindly</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-semibold text-primary/80 mb-2 uppercase tracking-wide">Pullse AI</div>
                      <div className="text-2xl font-black text-primary mb-1">Full history</div>
                      <div className="text-xs text-primary/70">Unified context</div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Losses prevented</span>
                      <span className="text-base font-bold text-green-600">$2.4K/mo</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">False positives</span>
                      <span className="text-base font-bold text-green-600">{'<'}2%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Policy fairness</span>
                      <span className="text-base font-bold text-primary">Protected</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-muted/10 via-muted/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-20 space-y-6">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                AI executes across your retail stack
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Agents ask, Pullse executes. Our AI figures out how to take action across all your e-commerce tools—instantly.
              </p>
            </div>

            {/* Integrations Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: ShoppingCart, name: 'Shopify', description: 'Real-time order sync, inventory, customer profiles', benefit: 'Execute order actions instantly', gradient: 'from-green-500/10 to-emerald-500/10' },
                { icon: CreditCard, name: 'Stripe', description: 'Instant refunds, payment history, subscription updates', benefit: 'Process refunds in seconds', gradient: 'from-blue-500/10 to-cyan-500/10' },
                { icon: Truck, name: 'ShipStation', description: 'Auto label generation, carrier tracking, batch processing', benefit: 'Generate return labels instantly', gradient: 'from-purple-500/10 to-pink-500/10' },
                { icon: RefreshCw, name: 'Returnly', description: 'Return portal, prepaid labels, warehouse integration', benefit: 'Automate return workflows', gradient: 'from-cyan-500/10 to-teal-500/10' },
                { icon: Mail, name: 'Klaviyo', description: 'Email marketing & automation', benefit: 'Trigger campaigns from support data', gradient: 'from-pink-500/10 to-rose-500/10' },
                { icon: Package, name: 'AfterShip', description: 'Post-purchase tracking & notifications', benefit: 'Auto-update customers on delivery', gradient: 'from-indigo-500/10 to-purple-500/10' },
              ].map((integration, index) => {
                const Icon = integration.icon;
                return (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-2xl hover:-translate-y-2"
                  >
                    {/* Gradient background on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${integration.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                    {/* Shimmer effect on hover */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    <div className="relative space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shrink-0 group-hover:shadow-lg">
                          <Icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div className="px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase group-hover:bg-primary group-hover:text-background transition-all duration-300">
                          Live
                        </div>
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">{integration.name}</h3>
                        <p className="text-xs text-muted-foreground mb-3">{integration.description}</p>
                        <div className="flex items-center gap-2 text-xs font-semibold text-primary group-hover:scale-105 transition-transform duration-300 origin-left">
                          <CheckCircle2 className="h-3.5 w-3.5 group-hover:scale-110 transition-transform duration-300" />
                          <span>{integration.benefit}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                );
              })}
            </div>

            {/* Extensibility Badge */}
            <div className="flex items-center justify-center pt-8">
              <div className="flex items-center gap-2 px-6 py-3 rounded-full border border-primary/20 bg-primary/5">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">
                  40+ native e-commerce integrations
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            {/* Header */}
            <div className="text-center mb-12 space-y-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Calculate your Black Friday savings
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                See exactly how much Pullse saves during peak season with 70% WISMO automation and instant returns
              </p>
            </div>

            {/* Calculator Card */}
            <div className="relative overflow-hidden rounded-[28px] border-2 border-primary/30 bg-gradient-to-br from-card via-card to-card/90 p-8 md:p-12 shadow-2xl backdrop-blur-sm">
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />

              <div className="relative z-10">
                <RoiCalculator />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.15),transparent_60%)]" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl border-2 border-primary/40 bg-gradient-to-br from-card via-card to-card/90 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.1),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--primary)/0.1),transparent_50%)]" />

              <div className="relative p-12 lg:p-16 z-10">
                <div className="text-center space-y-10">
                  <div className="space-y-6">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                      Don't let Black Friday break your support team
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                      Handle 10x volume with your current team. WISMO tickets auto-resolved. Returns in 2 minutes. Happy customers.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <RouteButton size="lg" className="text-base px-10 py-6 shadow-xl shadow-primary/20" href="/pricing">
                      Pricing
                    </RouteButton>
                    <RouteButton size="lg" variant="outline" className="text-base px-10 py-6 border border-border/40 hover:border-primary/40" href="/contact-sales">
                      Contact Sales
                    </RouteButton>
                  </div>
                </div>
              </div>

              {/* Bottom Glow */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SolutionEcommerce;
