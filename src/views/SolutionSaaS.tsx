'use client';

import { useEffect, useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import RouteButton from "@/components/RouteButton";
import WorkflowShowcase from "@/components/WorkflowShowcase";
import RoiCalculator from "@/components/RoiCalculator";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  Zap,
  TrendingUp,
  Target,
  GitBranch,
  Shield,
  Clock,
  MessageSquare,
  BarChart3,
  Play,
  Star,
  Code,
  Rocket,
  AlertTriangle,
  Bot,
  UserCheck,
  DollarSign,
  Bell,
  Brain,
  FileText,
  RefreshCw,
  CreditCard,
  ChevronRight,
  Loader2,
  TrendingDown,
  Sparkle,
  Flame,
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

const SolutionSaaS = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [statsAnimated, setStatsAnimated] = useState(false);
  const [activeFeatureTab, setActiveFeatureTab] = useState<'workflows' | 'integrations' | 'deployment'>('workflows');
  const [raceProgress, setRaceProgress] = useState(0);
  const [raceAnimated, setRaceAnimated] = useState(false);
  const [isRacePlaying, setIsRacePlaying] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const raceRef = useRef<HTMLDivElement>(null);

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

      // Race animation trigger
      if (raceRef.current && !raceAnimated) {
        const rect = raceRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.6) {
          setRaceAnimated(true);
          // Start auto-play after a brief delay
          setTimeout(() => {
            setIsRacePlaying(true);
          }, 500);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [statsAnimated, raceAnimated]);

  // Race auto-play animation
  useEffect(() => {
    if (!isRacePlaying) return;

    const duration = 4000; // 4 seconds for snappier, more dramatic animation
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic for smooth animation
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentProgress = easeProgress * 100;

      setRaceProgress(currentProgress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsRacePlaying(false);
      }
    };

    requestAnimationFrame(animate);
  }, [isRacePlaying]);

  const pillars = [
    {
      icon: Bot,
      title: 'AI Chatbots',
      subtitle: 'Autonomous Execution',
      description: 'AI agents that don\'t just answer questions—they take action. Execute refunds, create tickets, update accounts, and send notifications autonomously across your tech stack.',
      stat: 'Unlimited',
      statLabel: 'actions per day',
      color: 'from-blue-500 to-cyan-500',
      features: [
        'Execute Stripe refunds automatically',
        'Create Jira tickets with full context',
        'Update account settings across systems',
        'Send Slack alerts to right teams'
      ]
    },
    {
      icon: Sparkles,
      title: 'AI Copilots',
      subtitle: 'Suggested Actions',
      description: 'AI that suggests the right action and executes when agents ask. Agents see exactly what to do next—refund, escalate, update—with full context and zero switching.',
      stat: '8s',
      statLabel: 'average execution time',
      color: 'from-purple-500 to-pink-500',
      features: [
        'AI suggests next best action',
        'Conversational execution across all tools',
        'Instant context from Stripe, Salesforce',
        'Pre-filled actions ready to execute'
      ]
    },
    {
      icon: Shield,
      title: 'Auto-QA',
      subtitle: 'Execution Quality',
      description: 'Ensure every action meets compliance standards. Track who executed what, when, and why. Audit trails for refunds, tickets, updates—100% coverage across all systems.',
      stat: '100%',
      statLabel: 'execution tracking',
      color: 'from-green-500 to-emerald-500',
      features: [
        'Full audit trail of all actions',
        'Compliance checks before execution',
        'Error detection and alerts',
        'Performance tracking per agent'
      ]
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
      <section className="relative pt-32 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_50%)]" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-[1400px] mx-auto">
            {/* Header Content */}
            <div className="text-center space-y-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5 shadow-sm">
                <Rocket className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-sm font-semibold tracking-wide text-primary">For B2B SaaS Companies</span>
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-black text-foreground leading-[1.05] tracking-tight max-w-6xl mx-auto">
                Your support team is drowning in 10 tools.
                <span className="block bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent mt-4">
                  Just ask. Pullse executes.
                </span>
              </h1>

              <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground leading-relaxed max-w-4xl mx-auto font-normal">
                Your agents ask our AI copilot to take action. Pullse figures out the execution—Stripe refunds, Jira tickets, Shopify orders—instantly, across your entire stack.
              </p>

              {/* Single CTA */}
              <div className="pt-4">
                <RouteButton size="lg" href="/contact-sales" className="text-lg px-12 py-8 shadow-2xl shadow-primary/30 group">
                  Watch 2-minute demo
                  <Play className="ml-2 h-6 w-6 group-hover:scale-110 transition-transform" />
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
                { value: 100, suffix: 'ms', label: 'Response time', detail: 'sub-100ms latency', icon: Zap },
                { value: 8, suffix: 's', label: 'Avg execution', detail: 'from ask to done', icon: Clock },
                { value: 50, suffix: '+', label: 'Native integrations', detail: 'ready to use', icon: GitBranch },
                { value: 99, suffix: '%', label: 'Success rate', detail: 'error-free execution', icon: Shield },
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
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold tracking-wide text-primary">How It Works</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                Three ways to execute actions
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Autonomous execution, agent-assisted actions, and quality assurance—all working together
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

                      {/* Features */}
                      <div className="space-y-3 pt-4 border-t border-border/40">
                        {pillar.features.map((feature, fIndex) => (
                          <div key={fIndex} className="flex items-start gap-3">
                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                            <p className="text-sm text-foreground/80">{feature}</p>
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

      {/* Visual Workflow Race */}
      <section ref={raceRef} className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/10 via-transparent to-muted/10" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-[1400px] mx-auto">
            {/* Hero Header */}
            <div className="text-center mb-12 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2.5 shadow-sm">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm font-bold tracking-wide text-primary">See The Difference</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground leading-[1.05] max-w-5xl mx-auto">
                One angry customer. Two completely different outcomes.
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Real refund request. Watch what happens with traditional tools vs Pullse.
              </p>
            </div>

            {/* The Scenario */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="relative rounded-2xl border-2 border-destructive/40 bg-gradient-to-br from-destructive/10 to-destructive/5 p-8 overflow-hidden">
                <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/20 border border-destructive/40">
                  <Clock className="h-3.5 w-3.5 text-destructive animate-pulse" />
                  <span className="text-xs font-bold text-destructive">Friday 4:47 PM</span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/20 border-2 border-destructive/40 shrink-0">
                      <AlertTriangle className="h-6 w-6 text-destructive" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">Enterprise Customer (ID: #8472)</div>
                      <div className="text-xs text-muted-foreground">$10,000/year subscription • 47 seats</div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm p-5">
                    <div className="text-lg font-semibold text-destructive mb-2">
                      "I was charged $500 EXTRA this month! This is UNACCEPTABLE!"
                    </div>
                    <p className="text-base text-foreground leading-relaxed">
                      "Refund me RIGHT NOW or I'm canceling our entire company account. I need this resolved immediately—I'm escalating to our executive team in 5 minutes if I don't hear back."
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-destructive" />
                    <span className="font-bold text-destructive">At Risk: $10K/year contract</span>
                    <span className="text-muted-foreground">•</span>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">5 minutes to respond</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Split-Screen Comparison */}
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {/* Traditional Side - Chaos */}
              <div className="relative rounded-3xl border-2 border-destructive/40 bg-gradient-to-br from-destructive/10 via-destructive/5 to-transparent pt-12 px-8 pb-8 overflow-hidden">
                {/* Stress Badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-destructive text-background text-xs font-bold uppercase tracking-wider z-10">
                  The Old Way
                </div>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-8 pb-8 border-b border-destructive/20">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-destructive/20 border border-destructive/40">
                      <AlertTriangle className="h-7 w-7 text-destructive" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-destructive">Traditional Tools</h3>
                      <p className="text-sm text-muted-foreground">10+ tool switches • Manual work</p>
                    </div>
                  </div>

                {/* Visual Metaphor - Stacked Tool Windows */}
                <div className="space-y-4 mb-8">
                  {[
                    { tool: 'Helpdesk', action: 'Open ticket, read message, copy customer ID...', progress: raceProgress > 0, delay: 0 },
                    { tool: 'Stripe Dashboard', action: 'Search customer, find transaction, verify amount...', progress: raceProgress > 25, delay: 100 },
                    { tool: 'Gmail', action: 'Draft email, copy details, paste confirmation...', progress: raceProgress > 50, delay: 200 },
                    { tool: 'Helpdesk (again)', action: 'Update ticket, add notes, change status...', progress: raceProgress > 75, delay: 300 },
                  ].map((window, idx) => (
                    <div
                      key={idx}
                      className={`relative rounded-lg border bg-card/50 backdrop-blur-sm p-5 transition-all duration-500 ${
                        window.progress
                          ? 'border-destructive/60 bg-destructive/5 translate-x-2 shadow-lg'
                          : 'border-border/40 opacity-40 blur-[1px]'
                      }`}
                      style={{ transitionDelay: `${window.delay}ms` }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-destructive/60" />
                          <span className="text-xs font-bold text-foreground">{window.tool}</span>
                        </div>
                        {window.progress && (
                          <Loader2 className="h-3.5 w-3.5 text-destructive/60 animate-spin" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{window.action}</p>
                    </div>
                  ))}
                </div>

                {/* Agent Stress Indicator */}
                <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-destructive">Agent Status</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
                      <span className="text-xs font-bold text-destructive">Stressed</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Time elapsed</span>
                      <span className="font-bold text-destructive tabular-nums">
                        {Math.round((raceProgress / 100) * 220)}s
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-destructive/20 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-destructive to-destructive/60 transition-all duration-300"
                        style={{ width: `${Math.min(raceProgress, 100)}%` }}
                      />
                    </div>
                  </div>

                  {raceProgress >= 100 && (
                    <div className="pt-3 border-t border-destructive/20 animate-in fade-in duration-500">
                      <p className="text-xs text-destructive font-semibold">
                        ✗ 3 minutes 40 seconds wasted • Customer still angry
                      </p>
                    </div>
                  )}
                </div>

                {/* Bottom Impact */}
                <div className="mt-8 pt-8 border-t border-destructive/20 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Tools opened</span>
                    <span className="font-bold text-destructive">4-6 different tabs</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Error risk</span>
                    <span className="font-bold text-destructive">15% (copy-paste errors)</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Customer outcome</span>
                    <span className="font-bold text-destructive">Still escalating</span>
                  </div>
                </div>
                </div>
              </div>

              {/* Pullse Side - Calm */}
              <div className="relative rounded-3xl border-2 border-primary bg-gradient-to-br from-primary/10 via-primary/5 to-transparent pt-12 px-8 pb-8 overflow-hidden">
                {/* Success Badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary to-purple-600 text-background text-xs font-bold uppercase tracking-wider shadow-lg z-10">
                  The Pullse Way
                </div>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-8 pb-8 border-b border-primary/20">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-600 shadow-lg">
                      <Zap className="h-7 w-7 text-background" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-primary">Pullse AI Execution</h3>
                      <p className="text-sm text-primary/80">One command • Instant action</p>
                    </div>
                  </div>

                {/* Visual Metaphor - Single Command Interface */}
                <div className="space-y-5 mb-8">
                  {/* Command Input */}
                  <div className="relative rounded-xl border-2 border-primary/40 bg-gradient-to-br from-primary/10 to-transparent p-5 overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(var(--primary-rgb),0.05)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer" />
                    <div className="relative">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="h-4 w-4 text-primary" />
                        <span className="text-xs font-bold text-primary">Agent Command</span>
                      </div>
                      <p className="text-base font-semibold text-foreground mb-2">
                        "Issue $250 refund and email confirmation"
                      </p>
                      <p className="text-xs text-muted-foreground">
                        That's it. AI figures out the rest.
                      </p>
                    </div>
                  </div>

                  {/* AI Execution Steps - Fast reveal */}
                  {[
                    { icon: Brain, step: 'AI analyzes request', detail: 'Understands intent: refund + notify', progress: raceProgress > 0, time: '0.5s' },
                    { icon: Zap, step: 'Executes via Stripe API', detail: '$250 credit processed instantly', progress: raceProgress > 0.9, time: '2s' },
                    { icon: CheckCircle2, step: 'Updates all systems', detail: 'Helpdesk ticket + email sent automatically', progress: raceProgress > 2, time: '4s' },
                    { icon: UserCheck, step: 'Customer notified', detail: 'Confirmation email delivered', progress: raceProgress > 3, time: '8s' },
                  ].map((action, idx) => {
                    const Icon = action.icon;
                    return (
                      <div
                        key={idx}
                        className={`flex items-start gap-3 p-5 rounded-lg border transition-all duration-500 ${
                          action.progress
                            ? 'border-primary/40 bg-primary/5 shadow-sm'
                            : 'border-border/30 bg-muted/20 opacity-30'
                        }`}
                      >
                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg shrink-0 transition-all duration-500 ${
                          action.progress
                            ? 'bg-gradient-to-br from-primary to-purple-600 shadow-md'
                            : 'bg-muted'
                        }`}>
                          <Icon className={`h-4 w-4 ${action.progress ? 'text-background' : 'text-muted-foreground'}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-sm font-bold ${action.progress ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {action.step}
                            </span>
                            {action.progress && (
                              <span className="text-xs font-bold text-primary">{action.time}</span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{action.detail}</p>
                        </div>
                        {action.progress && (
                          <CheckCircle2 className="h-5 w-5 text-primary shrink-0 animate-in zoom-in duration-300" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Agent Status - Calm */}
                <div className="rounded-xl border border-primary/30 bg-primary/5 p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-primary">Agent Status</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-xs font-bold text-green-600">Relaxed</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Time elapsed</span>
                      <span className="font-bold text-primary tabular-nums">
                        {Math.min(Math.round((raceProgress / 100) * 8), 8)}s
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-primary/20 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-purple-600 transition-all duration-300 shadow-sm"
                        style={{ width: `${Math.min(raceProgress * 27.5, 100)}%` }}
                      />
                    </div>
                  </div>

                  {raceProgress >= 3.6 && (
                    <div className="pt-3 border-t border-primary/20 animate-in fade-in duration-500">
                      <p className="text-xs text-primary font-semibold">
                        ✓ Done in 8 seconds • Customer satisfied • On to next ticket
                      </p>
                    </div>
                  )}
                </div>

                {/* Bottom Impact */}
                <div className="mt-8 pt-8 border-t border-primary/20 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Tools opened</span>
                    <span className="font-bold text-primary">1 unified platform</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Error risk</span>
                    <span className="font-bold text-primary">{'<'}1% (API-driven)</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Customer outcome</span>
                    <span className="font-bold text-green-600">Account saved</span>
                  </div>
                </div>
                </div>
              </div>
            </div>

            {/* Business Impact Summary */}
            <div className="max-w-5xl mx-auto mb-12">
              <div className="relative rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-card to-card/90 p-8 md:p-12 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.1),transparent_50%)]" />

                <div className="relative">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl md:text-4xl font-black text-foreground mb-3">
                      The Bottom Line
                    </h3>
                    <p className="text-lg text-muted-foreground">
                      What this transformation means for your business
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                    {/* Time Saved */}
                    <div className="group text-center">
                      <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg mb-4 group-hover:scale-110 transition-all duration-300">
                        <Clock className="h-8 w-8 text-background" />
                      </div>
                      <div className="text-5xl font-black text-foreground mb-2">
                        {raceProgress >= 100 ? '212s' : '---'}
                      </div>
                      <div className="text-sm font-bold text-foreground mb-1">Saved Per Refund</div>
                      <div className="text-xs text-muted-foreground">
                        27× faster execution
                      </div>
                    </div>

                    {/* Account Saved */}
                    <div className="group text-center">
                      <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg mb-4 group-hover:scale-110 transition-all duration-300">
                        <DollarSign className="h-8 w-8 text-background" />
                      </div>
                      <div className="text-5xl font-black text-green-600 mb-2">
                        {raceProgress >= 3.6 ? '$10K' : '---'}
                      </div>
                      <div className="text-sm font-bold text-foreground mb-1">Account Retained</div>
                      <div className="text-xs text-muted-foreground">
                        Customer satisfaction ↑
                      </div>
                    </div>

                    {/* Error Prevention */}
                    <div className="group text-center">
                      <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg mb-4 group-hover:scale-110 transition-all duration-300">
                        <Shield className="h-8 w-8 text-background" />
                      </div>
                      <div className="text-5xl font-black text-foreground mb-2">
                        {raceProgress >= 3.6 ? '85%' : '---'}
                      </div>
                      <div className="text-sm font-bold text-foreground mb-1">Fewer Errors</div>
                      <div className="text-xs text-muted-foreground">
                        API-driven accuracy
                      </div>
                    </div>
                  </div>

                  {raceProgress >= 100 && (
                    <div className="mt-8 pt-8 border-t border-border/40 text-center animate-in fade-in duration-500">
                      <p className="text-base text-foreground mb-4 font-semibold">
                        This is just one refund. Multiply this across your entire support team.
                      </p>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                        <div className="flex items-center gap-2 text-primary font-bold">
                          <TrendingUp className="h-4 w-4" />
                          <span>10 agents × 50 refunds/month = 29 hours saved</span>
                        </div>
                        <span className="hidden sm:inline text-border">•</span>
                        <div className="flex items-center gap-2 text-green-600 font-bold">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Zero customer churn from refund delays</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Replay Button */}
            <div className="max-w-5xl mx-auto text-center">
              <button
                onClick={() => {
                  setRaceProgress(0);
                  setTimeout(() => setIsRacePlaying(true), 100);
                }}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-purple-600 text-background font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <RefreshCw className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
                Watch Again
              </button>
              <p className="mt-4 text-sm text-muted-foreground">
                See the dramatic difference between traditional tools and Pullse AI execution
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Real SaaS Workflows Section */}
      <section className="relative py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-20 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
                <GitBranch className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold tracking-wide text-primary">Real-World Impact</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                From panic to resolution—in seconds
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                See how Pullse transforms critical support moments from multi-tool chaos to instant AI execution
              </p>
            </div>

            {/* Workflow Examples - Side by Side */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Workflow 1: Angry Customer Refund */}
              <WorkflowShowcase
                title="Angry Customer Refund"
                scenario="Friday 3pm. $10K/year customer: 'Charged $500 extra—refund NOW or I cancel.' 5 minutes to respond."
                category="URGENT REFUND"
                categoryColor="from-blue-500 to-cyan-500"
                steps={[
                  {
                    icon: AlertTriangle,
                    label: 'Customer Rage',
                    description: 'Enterprise customer threatens cancellation over billing error',
                  },
                  {
                    icon: Brain,
                    label: 'Instant Context',
                    description: 'AI loads complete Stripe history and payment timeline',
                  },
                  {
                    icon: MessageSquare,
                    label: 'Agent Commands',
                    description: 'Agent types refund request in plain English',
                  },
                  {
                    icon: CheckCircle2,
                    label: 'Complete',
                    description: 'Refund processed, email sent, account saved',
                  },
                ]}
                outcome={{
                  value: '8s',
                  metric: 'Resolution',
                  description: 'Pullse: 8s instant execution. Traditional: 220s with tool switching.',
                }}
                gradient="from-blue-500/10 to-cyan-500/10"
              />

              {/* Workflow 2: Critical Bug Escalation */}
              <WorkflowShowcase
                title="Critical Bug Escalation"
                scenario="Saturday night. Dashboard down, CEO on line. $5K/minute downtime. $120K account at risk."
                category="CRITICAL P0"
                categoryColor="from-orange-500 to-red-500"
                steps={[
                  {
                    icon: Flame,
                    label: 'Emergency',
                    description: 'Production down, 10,000 users affected, immediate escalation needed',
                  },
                  {
                    icon: BarChart3,
                    label: 'Context Ready',
                    description: 'AI shows account value, API errors, deploys, logs instantly',
                  },
                  {
                    icon: Code,
                    label: 'Escalate',
                    description: 'Create P0 ticket with full context automatically',
                  },
                  {
                    icon: Zap,
                    label: 'Alert Sent',
                    description: 'Jira, Slack, on-call paged with complete information',
                  },
                ]}
                outcome={{
                  value: '4s',
                  metric: 'Escalation',
                  description: 'Pullse: 4s with context. Traditional: 15+ min, context lost.',
                }}
                gradient="from-orange-500/10 to-red-500/10"
              />
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
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold tracking-wide text-primary">Integrations</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                AI executes across your entire stack
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Agents ask, Pullse executes. Our AI copilot figures out how to take action across all your connected tools—instantly.
              </p>
            </div>

            {/* Integrations Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: CreditCard, name: 'Stripe', description: 'Process refunds, extend trials, update subscriptions', benefit: 'Execute billing actions instantly', gradient: 'from-blue-500/10 to-cyan-500/10' },
                { icon: Code, name: 'Jira', description: 'Create tickets, update status, assign engineers', benefit: 'File bugs with full context', gradient: 'from-indigo-500/10 to-blue-500/10' },
                { icon: Zap, name: 'Slack', description: 'Send alerts, notify teams, escalate issues', benefit: 'Alert right people instantly', gradient: 'from-purple-500/10 to-pink-500/10' },
                { icon: Users, name: 'Salesforce', description: 'Create opportunities, update leads, log activities', benefit: 'Handoff to sales seamlessly', gradient: 'from-cyan-500/10 to-teal-500/10' },
                { icon: BarChart3, name: 'Segment', description: 'Track events, trigger workflows, update attributes', benefit: 'Load customer context', gradient: 'from-green-500/10 to-emerald-500/10' },
                { icon: MessageSquare, name: 'Shopify', description: 'Update orders, modify inventory, process returns', benefit: 'Execute e-commerce actions', gradient: 'from-emerald-500/10 to-green-500/10' },
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
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            {/* Header */}
            <div className="text-center mb-12 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-gradient-to-r from-primary/15 to-primary/10 px-5 py-2 text-xs font-bold uppercase tracking-wider text-primary shadow-lg backdrop-blur-sm">
                <BarChart3 className="h-3.5 w-3.5" />
                ROI Calculator
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                See your savings in 60 seconds
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Calculate exactly how much Pullse saves your team with 70% automation and 20x faster execution
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

              {/* Urgency Badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                <div className="flex items-center gap-2 rounded-full border border-primary bg-gradient-to-r from-primary via-primary to-primary/90 px-5 py-2 shadow-lg">
                  <Sparkles className="h-4 w-4 text-background" />
                  <span className="text-xs font-bold text-background uppercase tracking-wider">Early Access Available</span>
                </div>
              </div>

              <div className="relative p-12 lg:p-16 z-10">
                <div className="text-center space-y-10">
                  <div className="space-y-6">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                      Transform your support team today
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                      Connect your stack and start executing actions instantly. Just ask—our AI handles the rest across your entire tech stack.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <RouteButton size="lg" className="text-base px-10 py-7 shadow-xl shadow-primary/20 group" href="/contact-sales">
                      Watch 2-minute demo
                      <Play className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    </RouteButton>
                    <RouteButton size="lg" variant="outline" className="text-base px-10 py-7" href="/pricing">
                      View pricing
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </RouteButton>
                  </div>

                  {/* Enhanced Trust Badges */}
                  <div className="pt-8 border-t border-border/40 space-y-6">
                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                        </div>
                        <span>Live in 2 weeks</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                          <Shield className="h-4 w-4 text-primary" />
                        </div>
                        <span>SOC 2 controls in progress</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                          <Zap className="h-4 w-4 text-primary" />
                        </div>
                        <span>50+ integrations</span>
                      </div>
                    </div>

                    {/* Social Proof */}
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Built for modern support teams</span>
                    </div>
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

export default SolutionSaaS;
