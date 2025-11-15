'use client';

import { useEffect, useState, useRef, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";

const LiquidEther = lazy(() => import("@/components/LiquidEther"));
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
  ExternalLink,
} from "lucide-react";

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

  return (
    <div className="min-h-screen">
      <PageLiquidBackground opacity={0.45} />
      <Navigation />

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-border/20">
        <div
          className="h-full bg-gradient-to-r from-primary via-purple-500 to-indigo-500 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] lg:min-h-screen flex items-center pt-16 pb-12 md:pt-24 md:pb-18 lg:pt-32 lg:pb-24 overflow-hidden">
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
            <div className="text-center mb-8 md:mb-12 lg:mb-16 space-y-4 md:space-y-6 lg:space-y-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-foreground leading-[1.05] tracking-tight max-w-5xl mx-auto">
                Every conversation.
                <span className="block bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent animate-gradient mt-2">
                  Every rep. Every time.
                </span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Stop sampling 5% of conversations. AI automatically evaluates every ticket the moment it closes—identifying exact moments for improvement, suggesting better language, and tracking trends over time. Turn quality assurance into continuous coaching.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
                <RouteButton size="lg" href="/contact-sales" className="text-base px-6 py-4 md:px-8 md:py-5 lg:px-10 lg:py-7 shadow-2xl shadow-primary/30 group">
                  See it live
                  <Play className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:scale-110 transition-transform" />
                </RouteButton>
                <RouteButton size="lg" variant="outline" href="/pricing" className="text-base px-6 py-4 md:px-8 md:py-5 lg:px-10 lg:py-7">
                  View pricing
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </RouteButton>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 md:gap-x-6 lg:gap-x-8 md:gap-y-4 pt-6 md:pt-7 lg:pt-8 text-xs md:text-sm text-muted-foreground">
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
              <div className="absolute -inset-6 md:-inset-9 lg:-inset-12 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-3xl opacity-60" />
              <div className="relative rounded-3xl border border-border/50 bg-gradient-to-br from-card/95 via-card to-card/90 p-1.5 sm:p-2 md:p-3 shadow-2xl backdrop-blur-xl">
                <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-muted/30 to-muted/50 border border-border/40 shadow-xl aspect-video flex items-center justify-center">
                  <div className="text-center space-y-2 p-4 md:p-6 lg:p-8">
                    <Shield className="h-10 w-10 md:h-12 md:w-12 lg:h-16 lg:w-16 text-primary/40 mx-auto" />
                    <p className="text-xs md:text-sm text-muted-foreground">Auto-QA Scorecard Interface</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Value Props Section */}
      <section className="relative py-10 md:py-16 lg:py-20 bg-gradient-to-b from-muted/10 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
              <div className="group relative p-4 md:p-5 lg:p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="flex h-10 w-10 md:h-11 md:w-11 lg:h-12 lg:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-600 shadow-lg mb-3 md:mb-3.5 lg:mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="h-5 w-5 md:h-5.5 md:w-5.5 lg:h-6 lg:w-6 text-background" />
                </div>
                <h3 className="text-base md:text-lg font-bold mb-1.5 md:mb-2 group-hover:text-primary transition-colors">
                  No More Sampling
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  QA every single conversation, not just 5%. Zero blind spots.
                </p>
              </div>
              <div className="group relative p-4 md:p-5 lg:p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="flex h-10 w-10 md:h-11 md:w-11 lg:h-12 lg:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-600 shadow-lg mb-3 md:mb-3.5 lg:mb-4 group-hover:scale-110 transition-transform">
                  <Target className="h-5 w-5 md:h-5.5 md:w-5.5 lg:h-6 lg:w-6 text-background" />
                </div>
                <h3 className="text-base md:text-lg font-bold mb-1.5 md:mb-2 group-hover:text-primary transition-colors">
                  Surgical Precision
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  AI identifies exact message where rep could improve—with suggested phrasing.
                </p>
              </div>
              <div className="group relative p-4 md:p-5 lg:p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="flex h-10 w-10 md:h-11 md:w-11 lg:h-12 lg:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-600 shadow-lg mb-3 md:mb-3.5 lg:mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-5 w-5 md:h-5.5 md:w-5.5 lg:h-6 lg:w-6 text-background" />
                </div>
                <h3 className="text-base md:text-lg font-bold mb-1.5 md:mb-2 group-hover:text-primary transition-colors">
                  See the Trajectory
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  Every scorecard shows trend lines. Is empathy improving? Response time getting faster?
                </p>
              </div>
              <div className="group relative p-4 md:p-5 lg:p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="flex h-10 w-10 md:h-11 md:w-11 lg:h-12 lg:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-600 shadow-lg mb-3 md:mb-3.5 lg:mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-5 w-5 md:h-5.5 md:w-5.5 lg:h-6 lg:w-6 text-background" />
                </div>
                <h3 className="text-base md:text-lg font-bold mb-1.5 md:mb-2 group-hover:text-primary transition-colors">
                  Built-In Fairness
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  Reps can dispute any score. Supervisors review, adjust, and provide context.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid - Core Features */}
      <section className="relative py-10 md:py-16 lg:py-20">
        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 md:mb-12 lg:mb-16 space-y-3 md:space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Beyond Traditional QA
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
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
      <section className="relative py-10 md:py-16 lg:py-20 overflow-hidden bg-gradient-to-b from-background via-muted/10 to-background">
        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 md:mb-12 lg:mb-16 space-y-3 md:space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                From Ticket to Coaching
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Automatic QA that turns every conversation into a learning opportunity.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6 max-w-7xl mx-auto">
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="group relative">
                    <div className="relative h-full p-4 md:p-5 lg:p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                      <div className="space-y-3 md:space-y-3.5 lg:space-y-4">
                        <div className={`inline-flex h-11 w-11 md:h-12 md:w-12 lg:h-14 lg:w-14 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} shadow-lg`}>
                          <Icon className="h-5.5 w-5.5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-background" />
                        </div>

                        <div className="text-5xl md:text-5xl lg:text-6xl font-bold text-muted-foreground/20 group-hover:text-primary/20 transition-colors">
                          {step.number}
                        </div>

                        <h3 className="text-lg md:text-xl font-bold group-hover:text-primary transition-colors">
                          {step.title}
                        </h3>

                        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
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

      {/* Coaching & Feedback Section */}
      <section className="relative py-10 md:py-16 lg:py-20 overflow-hidden bg-gradient-to-b from-muted/10 via-background to-background">
        <div className="container relative mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-6 md:gap-9 lg:gap-12 items-center">
              <div className="space-y-4 md:space-y-6 lg:space-y-8">
                <div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 md:mb-4">
                    QA that feels like
                    <br />
                    coaching, not critique
                  </h2>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Traditional QA feels punitive—random spot checks, subjective scores, no recourse. Auto-QA is different. Every score is explainable. Every rep can dispute. Every trend line shows progress. It's QA designed for growth, not gotchas.
                  </p>
                </div>

                <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <div className="flex h-9 w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-600 shadow-lg">
                    <ThumbsUp className="h-4.5 w-4.5 md:h-5 md:w-5 text-background" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm font-medium mb-1">Reps Have a Voice</p>
                    <p className="text-xs md:text-sm text-muted-foreground">
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

      {/* Final CTA Section - Ultra Modern */}
      <section className="relative py-16 md:py-28 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/10 to-background" />

        {/* Animated background gradients */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-3xl border border-primary/30 bg-gradient-to-br from-card/50 via-background/30 to-card/50 backdrop-blur-2xl p-6 md:p-12 lg:p-16 shadow-2xl text-center overflow-hidden">
              {/* Background glow */}
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/30 via-purple-600/30 to-indigo-600/30 opacity-50 blur-2xl" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.15),transparent_70%)]" />

              <div className="relative">
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-5 md:mb-7 lg:mb-8 leading-tight">
                  Stop sampling.{" "}
                  <span className="bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                    Start seeing everything.
                  </span>
                </h2>

                <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 md:mb-10 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
                  Traditional QA teams sample 5-10% of tickets. Auto-QA evaluates <span className="font-bold text-foreground">100%</span>—with surgical feedback, trend tracking, and built-in fairness.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 md:gap-5 lg:gap-6 justify-center mb-8 md:mb-10 lg:mb-12">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <RouteButton
                      href="/contact-sales"
                      variant="default"
                      size="lg"
                      className="group relative overflow-hidden bg-gradient-to-r from-primary via-purple-600 to-indigo-600 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500 px-8 py-4 md:px-10 md:py-5 lg:px-12 lg:py-6 text-base md:text-lg font-black"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                      <span className="relative z-10 flex items-center gap-2 md:gap-3">
                        Get Started
                        <ArrowRight className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-2 transition-transform duration-300" />
                      </span>
                    </RouteButton>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <RouteButton
                      href="/pricing"
                      variant="outline"
                      size="lg"
                      className="group border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5 px-8 py-4 md:px-10 md:py-5 lg:px-12 lg:py-6 text-base md:text-lg font-black"
                    >
                      <span className="flex items-center gap-2 md:gap-3">
                        View Pricing
                        <ExternalLink className="h-4 w-4 md:h-5 md:w-5 group-hover:rotate-12 transition-transform duration-300" />
                      </span>
                    </RouteButton>
                  </motion.div>
                </div>

                {/* Social proof */}
                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 lg:gap-8 pt-6 md:pt-7 lg:pt-8 border-t border-border/30">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                    <span className="text-xs md:text-sm font-bold text-muted-foreground">14-day trial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                    <span className="text-xs md:text-sm font-bold text-muted-foreground">No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                    <span className="text-xs md:text-sm font-bold text-muted-foreground">5-minute setup</span>
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

export default ProductAutoQA;
