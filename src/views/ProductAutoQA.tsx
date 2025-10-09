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
      title: '100% Conversation Coverage',
      description: 'AI automatically QAs every conversation—bot and human—once tickets close. No manual sampling, no blind spots, complete visibility.',
      label: 'Automated',
      icon: Shield,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Conversational Quality Parameters',
      description: 'Define custom QA rubrics: tone, empathy, response time, resolution quality, policy compliance, clarity. Fully customizable to your standards.',
      label: 'Custom Rubrics',
      icon: CheckCircle2,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Moment-Level Feedback',
      description: "AI pinpoints exact conversation moments where something could've been better—and suggests the language reps should have used.",
      label: 'Precision',
      icon: Target,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Positive Reinforcement',
      description: "AI doesn't just critique—it highlights what reps did well. Celebrates wins, reinforces good habits, builds confidence.",
      label: 'Recognition',
      icon: Award,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Trend Analysis',
      description: 'Every scorecard includes performance trends from past QA results. See improvement over time across all quality dimensions.',
      label: 'Growth Tracking',
      icon: TrendingUp,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Accept/Dispute Scores',
      description: 'Reps can accept or dispute any score. Supervisors review disputes, provide context, and adjust scores—fair and transparent.',
      label: 'Fairness',
      icon: AlertCircle,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Supervisor Controls',
      description: 'Adjust parameter weights, override scores, provide feedback, manage coaching sessions. Full control over your QA process.',
      label: 'Management',
      icon: Settings,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Coaching & Feedback Management',
      description: 'Structured feedback loops. Track coaching sessions, set improvement goals, measure impact. Turn QA into continuous learning.',
      label: 'Development',
      icon: Users,
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
      description: 'When a conversation is permanently closed, Auto-QA triggers automatically.',
      icon: CheckCircle2,
      color: 'from-primary to-purple-600',
    },
    {
      number: '02',
      title: 'AI Analyzes Conversation',
      description: 'AI evaluates the entire conversation across all quality parameters, pinpointing exact moments.',
      icon: Brain,
      color: 'from-purple-600 to-indigo-600',
    },
    {
      number: '03',
      title: 'Scorecard Generated',
      description: 'Rep receives detailed scorecard with moment-level feedback, suggested language, and trend analysis.',
      icon: BarChart3,
      color: 'from-indigo-600 to-blue-600',
    },
    {
      number: '04',
      title: 'Review & Coach',
      description: 'Rep accepts/disputes scores. Supervisors coach, provide feedback, track improvement over time.',
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
      description: 'Every conversation QA'd',
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
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container relative mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center space-y-8 fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <Shield className="h-4 w-4" />
              <span>AI-Powered Quality Assurance</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              QA Every Conversation.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-indigo-500">
                Coach Every Rep.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              AI analyzes 100% of conversations—bot and human—pinpoints exact moments for improvement, suggests better language, and tracks performance trends. Turn QA into continuous coaching.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <RouteButton
                size="lg"
                href="/contact-sales"
                className="text-base px-10 py-7 shadow-2xl shadow-primary/30 group"
              >
                See Auto-QA in action
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </RouteButton>
              <RouteButton
                variant="outline"
                size="lg"
                href="/book-demo"
                className="text-base px-10 py-7 border-2"
              >
                Book a demo
              </RouteButton>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid - Core Features */}
      <section className="relative py-20 bg-gradient-to-b from-background via-muted/20 to-background">
        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4 fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Complete Quality Coverage
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From automated QA to moment-level coaching, everything you need to improve conversation quality at scale.
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
      <section className="relative py-20 overflow-hidden">
        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4 fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                <GitBranch className="h-4 w-4" />
                <span>How It Works</span>
              </div>
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
      <section className="relative py-20 bg-gradient-to-b from-muted/20 via-background to-background">
        <div className="container relative mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 space-y-4 fade-in-up">
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
      <section className="relative py-20 overflow-hidden">
        <div className="container relative mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 fade-in-up">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                    <Users className="h-4 w-4" />
                    <span>Coaching & Feedback</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                    Fair, Transparent,
                    <br />
                    Growth-Focused
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    QA isn't about punishment—it's about coaching. Reps can dispute scores, supervisors adjust parameters, and everyone sees performance trends. Build a culture of continuous improvement.
                  </p>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-600 shadow-lg">
                    <ThumbsUp className="h-5 w-5 text-background" />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Rep Empowerment</p>
                    <p className="text-sm text-muted-foreground">
                      Every rep can challenge scores and provide context. Supervisors review and adjust—ensuring fair, accurate QA.
                    </p>
                  </div>
                </div>
              </div>

              <div className="fade-in-up delay-200">
                <CoachingAccordion />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics & Stats Section */}
      <section ref={statsRef} className="relative py-20 bg-gradient-to-b from-muted/20 to-background">
        <div className="container relative mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 space-y-4 fade-in-up">
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
      <section className="relative py-20 overflow-hidden">
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8 fade-in-up">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              Ready to QA Every Conversation?
            </h2>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              See how Auto-QA turns quality assurance into continuous coaching—for every rep, every conversation, every time.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
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
                href="/book-demo"
                className="text-base px-10 py-7 border-2"
              >
                Book a demo
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
