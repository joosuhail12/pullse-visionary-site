'use client';

import { useEffect, useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import RouteButton from "@/components/RouteButton";
import MagicBento from "@/components/MagicBento";
import type { CardData } from "@/components/MagicBento";
import Image from "next/image";
import {
  Shield,
  CheckCircle2,
  TrendingUp,
  MessageSquare,
  Target,
  Users,
  BarChart3,
  AlertCircle,
  Settings,
  Sparkles,
  Clock,
  Award,
  ArrowRight,
  Zap,
  ThumbsUp,
  MessageCircle,
  GitBranch,
  FileText,
  Brain,
  LineChart,
  Play,
} from "lucide-react";

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

// Coaching Features Accordion Component
const CoachingAccordion = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      icon: AlertCircle,
      title: 'Accept/Dispute Workflow',
      content: "Reps can accept scores or dispute them with context. Supervisors review disputes, adjust scores if needed, and provide feedback—creating a fair, transparent QA process.",
      color: 'from-primary to-purple-600'
    },
    {
      icon: TrendingUp,
      title: 'Trend Analysis',
      content: "Every scorecard shows performance trends from past QA results. See if reps are improving on empathy, response time, or resolution quality over weeks and months.",
      color: 'from-purple-600 to-indigo-600'
    },
    {
      icon: Settings,
      title: 'Supervisor Controls',
      content: "Supervisors can adjust parameter weights in real-time, override scores, provide direct feedback, and manage coaching sessions—full control over your QA process.",
      color: 'from-indigo-600 to-primary'
    }
  ];

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          const isActive = activeTab === index;

          return (
            <div key={index} className="group">
              <button
                onClick={() => setActiveTab(index)}
                className={`w-full text-left rounded-xl border transition-all ${
                  isActive
                    ? 'border-primary/50 bg-gradient-to-r from-primary/15 to-purple-500/5 shadow-lg'
                    : 'border-border/40 bg-card/80 hover:border-primary/30 hover:bg-card'
                }`}
              >
                <div className="flex items-center gap-3 p-4">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${tab.color} shadow-lg transition-all ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                    <Icon className="h-5 w-5 text-background" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-sm font-bold transition-colors ${isActive ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}>
                      {tab.title}
                    </h3>
                  </div>
                  <div className={`transition-all ${isActive ? 'rotate-90 text-primary' : 'text-muted-foreground'}`}>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </button>

              {isActive && (
                <div className="mt-2 rounded-lg border border-border/30 bg-muted/30 p-4 text-sm text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200">
                  {tab.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ProductAutoQA = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [statsAnimated, setStatsAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate stats on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsAnimated) {
            setStatsAnimated(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [statsAnimated]);

  // Bento Grid Card Data
  const bentoCards: CardData[] = [
    {
      color: 'hsl(var(--card))',
      title: 'Every Ticket, Every Time',
      description: 'Traditional QA samples 5-10% of conversations. Auto-QA analyzes 100% of tickets—bot and human—the moment they close.',
      label: 'Zero Sampling',
      icon: Shield,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Your Standards, Automated',
      description: 'Build custom scoring rubrics: tone, empathy, speed, resolution quality. Define what quality means, let AI enforce it consistently.',
      label: 'Custom Rubrics',
      icon: CheckCircle2,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Surgical Feedback',
      description: "AI highlights the exact message where a rep could improve—and suggests the specific phrasing they should have used.",
      label: 'Moment-Level',
      icon: Target,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Celebrate Wins Too',
      description: "AI calls out what reps did well—great empathy, fast response, clear explanation. Reinforces good behaviors.",
      label: 'Recognition',
      icon: Award,
    },
    {
      color: 'hsl(var(--card))',
      title: 'See the Trajectory',
      description: 'Every scorecard shows trend lines from past results. Is empathy improving? Is response time getting faster?',
      label: 'Trend Tracking',
      icon: TrendingUp,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Built-In Fairness',
      description: 'Reps can dispute any score. Supervisors review the full context, adjust if needed, and explain decisions.',
      label: 'Dispute Flow',
      icon: AlertCircle,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Full Supervisor Control',
      description: 'Change parameter weights anytime. Override AI scores. Add manual feedback. You stay in control—AI handles the heavy lifting.',
      label: 'Management',
      icon: Settings,
    },
  ];

  // Quality Parameters Data
  const qualityParameters = [
    { icon: MessageCircle, name: 'Tone & Empathy', description: 'Warm, understanding, customer-first language' },
    { icon: Clock, name: 'Response Time', description: 'Speed of replies and overall resolution time' },
    { icon: CheckCircle2, name: 'Resolution Quality', description: 'Did the issue get fully resolved?' },
    { icon: FileText, name: 'Policy Compliance', description: 'Following company guidelines and procedures' },
    { icon: Sparkles, name: 'Communication Clarity', description: 'Clear, concise, easy-to-understand responses' },
    { icon: Brain, name: 'Knowledge Accuracy', description: 'Correct information and best practices' },
  ];

  // Process Steps
  const processSteps = [
    {
      number: '01',
      title: 'Ticket Closes',
      description: 'Rep marks the ticket as resolved. Auto-QA triggers instantly—no manual selection, no waiting.',
      icon: CheckCircle2,
      color: 'from-primary to-purple-600',
    },
    {
      number: '02',
      title: 'AI Reads Everything',
      description: 'AI reads every message, evaluates against your rubric, and identifies the exact moments where quality could improve.',
      icon: Brain,
      color: 'from-purple-600 to-indigo-600',
    },
    {
      number: '03',
      title: 'Scorecard Delivered',
      description: 'Rep gets a detailed scorecard: scores per parameter, exact messages flagged, suggested improvements, plus trend lines showing progress.',
      icon: BarChart3,
      color: 'from-indigo-600 to-blue-600',
    },
    {
      number: '04',
      title: 'Coaching Happens',
      description: 'Rep can accept scores or dispute with context. Supervisors review, adjust if needed, and schedule coaching sessions. Growth tracked over time.',
      icon: Users,
      color: 'from-blue-600 to-primary',
    },
  ];

  // Analytics Stats
  const stats = [
    {
      value: 100,
      suffix: '%',
      label: 'Coverage',
      description: "Every conversation QA'd",
      icon: Shield,
      color: 'from-primary to-purple-600',
    },
    {
      value: 90,
      suffix: '%',
      label: 'Faster',
      description: 'Than manual QA',
      icon: Zap,
      color: 'from-purple-600 to-indigo-600',
    },
    {
      value: 0,
      suffix: 's',
      label: 'Post-Closure',
      description: 'Instant feedback',
      icon: Clock,
      color: 'from-indigo-600 to-primary',
    },
  ];

  return (
    <div className="min-h-screen">
      <PageLiquidBackground opacity={0.3} />
      <Navigation />

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-border/20">
        <div
          className="h-full bg-gradient-to-r from-primary via-purple-500 to-indigo-500 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_50%)]" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-8">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-foreground leading-[1.05] tracking-tight max-w-5xl mx-auto">
                Every conversation.
                <span className="block bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent animate-gradient mt-2">
                  Every rep. Every time.
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Stop sampling 5% of conversations. AI automatically evaluates every ticket the moment it closes—identifying exact moments for improvement, suggesting better language, and tracking trends over time. Turn quality assurance into continuous coaching.
              </p>

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

              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>100% of tickets analyzed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Real-time feedback</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Dispute & appeal workflow</span>
                </div>
              </div>
            </div>

            <div className="relative max-w-6xl mx-auto">
              <div className="absolute -inset-12 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-3xl opacity-60" />
              <div className="relative rounded-3xl border border-border/50 bg-gradient-to-br from-card/95 via-card to-card/90 p-2 sm:p-3 shadow-2xl backdrop-blur-xl">
                <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-muted/30 to-muted/50 border border-border/40 shadow-xl aspect-video flex items-center justify-center">
                  <div className="text-center space-y-2 p-8">
                    <Shield className="h-16 w-16 text-primary/40 mx-auto" />
                    <p className="text-sm text-muted-foreground">Auto-QA Scorecard Interface</p>
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
              <div className="group relative p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-600 shadow-lg mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="h-6 w-6 text-background" />
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  No More Sampling
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  QA every single conversation, not just 5%. Zero blind spots.
                </p>
              </div>
              <div className="group relative p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-600 shadow-lg mb-4 group-hover:scale-110 transition-transform">
                  <Target className="h-6 w-6 text-background" />
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  Surgical Precision
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  AI identifies exact message where rep could improve—with suggested phrasing.
                </p>
              </div>
              <div className="group relative p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-600 shadow-lg mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-6 w-6 text-background" />
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  See the Trajectory
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Every scorecard shows trend lines. Is empathy improving? Response time getting faster?
                </p>
              </div>
              <div className="group relative p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-600 shadow-lg mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6 text-background" />
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  Built-In Fairness
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Reps can dispute any score. Supervisors review, adjust, and provide context.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid - Core Features */}
      <section className="relative py-20">
        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Beyond Traditional QA
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Manual QA teams sample 5-10% of conversations. Auto-QA analyzes 100%—evaluating every ticket against your quality standards the moment it closes, with zero extra headcount.
              </p>
            </div>

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
      </section>

      {/* How It Works - Process Flow */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-background via-muted/10 to-background">
        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                From Ticket to Coaching
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Automatic QA that turns every conversation into a learning opportunity.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="group relative">
                    <div className="relative h-full p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                      <div className="space-y-4">
                        <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} shadow-lg`}>
                          <Icon className="h-7 w-7 text-background" />
                        </div>

                        <div className="text-6xl font-bold text-muted-foreground/20 group-hover:text-primary/20 transition-colors">
                          {step.number}
                        </div>

                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                          {step.title}
                        </h3>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Connector Line */}
                    {index < processSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Quality Parameters Showcase */}
      <section className="relative py-20">
        <div className="container relative mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Customizable Quality Parameters
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Define what quality means for your team. AI evaluates conversations across all dimensions you care about.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {qualityParameters.map((param, index) => {
                const Icon = param.icon;
                return (
                  <div key={index} className="group p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-600 shadow-lg group-hover:scale-110 transition-transform">
                        <Icon className="h-6 w-6 text-background" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                          {param.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {param.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Coaching & Feedback Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-muted/10 via-background to-background">
        <div className="container relative mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                    QA that feels like
                    <br />
                    coaching, not critique
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Traditional QA feels punitive—random spot checks, subjective scores, no recourse. Auto-QA is different. Every score is explainable. Every rep can dispute. Every trend line shows progress. It's QA designed for growth, not gotchas.
                  </p>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-600 shadow-lg">
                    <ThumbsUp className="h-5 w-5 text-background" />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Reps Have a Voice</p>
                    <p className="text-sm text-muted-foreground">
                      Disagree with a score? Click dispute, add context, and request supervisor review. Fair, transparent, and built into every scorecard.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <CoachingAccordion />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics & Stats Section */}
      <section ref={statsRef} className="relative py-20">
        <div className="container relative mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Real-Time Quality Intelligence
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Instant feedback, complete coverage, exponentially faster than manual QA.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="group relative p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 text-center">
                    <div className={`inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} shadow-lg mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-8 w-8 text-background" />
                    </div>

                    <div className="text-5xl font-bold mb-2 bg-gradient-to-br from-primary to-purple-600 bg-clip-text text-transparent">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} trigger={statsAnimated} />
                    </div>

                    <div className="text-xl font-bold mb-1">
                      {stat.label}
                    </div>

                    <div className="text-sm text-muted-foreground">
                      {stat.description}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-muted/10 to-background">
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              Stop sampling. Start seeing everything.
            </h2>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Traditional QA teams sample 5-10% of tickets. Auto-QA evaluates 100%—with surgical feedback, trend tracking, and built-in fairness. See how it works.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <RouteButton
                size="lg"
                href="/contact-sales"
                className="text-base px-10 py-7 shadow-2xl shadow-primary/30 group"
              >
                Get started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </RouteButton>
              <RouteButton
                variant="outline"
                size="lg"
                href="/pricing"
                className="text-base px-10 py-7"
              >
                View pricing
              </RouteButton>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductAutoQA;
