'use client';

import { useEffect, useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import RouteButton from "@/components/RouteButton";
import MagicBento from "@/components/MagicBento";
import type { CardData } from "@/components/MagicBento";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Target,
  Activity,
  Users,
  Clock,
  Shield,
  Zap,
  CheckCircle2,
  ArrowRight,
  Play,
  Sparkles,
  FileText,
  Download,
  Share2,
  Filter,
  Calendar,
  Database,
  LineChart,
  PieChart,
  Award,
  DollarSign,
  MessageSquare,
  Globe,
  Code,
  Layers,
  Settings,
  Mail,
  Slack,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Animated Counter Component
const AnimatedCounter = ({
  end,
  suffix = '',
  prefix = '',
  decimals = 0,
  duration = 2000,
  trigger = false
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  trigger?: boolean;
}) => {
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
      const value = easeOutQuart * end;
      setCount(decimals > 0 ? parseFloat(value.toFixed(decimals)) : Math.floor(value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [trigger, hasStarted, end, duration, decimals]);

  return <>{prefix}{count}{suffix}</>;
};

const ProductAnalytics = () => {
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
      title: 'Volume & Trends',
      description: 'Track ticket volumes over time with trend analysis. Identify patterns, forecast demand, and optimize staffing.',
      label: 'Forecasting',
      icon: TrendingUp,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Resolution Breakdown',
      description: 'Analyze resolution rates by intent, channel, agent, and time period. Understand what works and what does not.',
      label: 'Deep Dive',
      icon: Target,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Agent Performance',
      description: 'Individual scorecards with FCR, handle time, CSAT, and quality scores. Fair, transparent, data-driven coaching.',
      label: 'Team Metrics',
      icon: Users,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Customer Satisfaction',
      description: 'Track CSAT, NPS, and sentiment analysis across all interactions. See what drives customer happiness.',
      label: 'CSAT & NPS',
      icon: MessageSquare,
    },
    {
      color: 'hsl(var(--card))',
      title: 'AI Performance',
      description: 'Bot accuracy, deflection rates, action success rates, and hallucination detection. Prove AI is working.',
      label: 'AI Metrics',
      icon: Activity,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Response Time Analysis',
      description: 'First response time, resolution time, SLA compliance. Track speed metrics that matter to customers.',
      label: 'Speed Metrics',
      icon: Clock,
    },
    {
      color: 'hsl(var(--card))',
      title: 'ROI Dashboard',
      description: 'Cost per ticket, automation savings, headcount impact. Prove value in dollars, not just percentages.',
      label: 'Business Impact',
      icon: DollarSign,
    },
  ];

  return (
    <div className="min-h-screen relative">
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
      <section className="relative pt-40 pb-32 overflow-hidden">
        {/* Enhanced gradient mesh background */}
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_50%)]" />

        <div className="container mx-auto px-6 relative">
          <div className="max-w-6xl mx-auto text-center">
            {/* Enhanced Headline */}
            <motion.h1
              className="text-6xl sm:text-7xl lg:text-8xl font-black text-foreground mb-8 tracking-tight leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Turn data into{" "}
              <span className="bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
                decisions that matter
              </span>
            </motion.h1>

            {/* Enhanced Subheadline */}
            <motion.p
              className="text-2xl text-muted-foreground max-w-4xl mx-auto mb-6 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Real-time dashboards streaming live support data. Custom reports for every stakeholder.
              Analytics that <span className="text-foreground font-bold">prove ROI</span> and drive
              <span className="text-foreground font-bold"> strategic decisions</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -6 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <RouteButton
                  href="/contact-sales"
                  variant="default"
                  size="lg"
                  className="group relative overflow-hidden px-12 py-8 text-xl font-black shadow-2xl shadow-primary/30"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <Play className="h-6 w-6" />
                    See Live Demo
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </RouteButton>
              </motion.div>

              <RouteButton
                href="/pricing"
                variant="outline"
                size="lg"
                className="px-12 py-8 text-xl font-black"
              >
                View Pricing
              </RouteButton>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Real-time data streaming</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>No data silos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Custom dashboards</span>
              </div>
            </motion.div>

            {/* Hero Stats - 3 Column - Enhanced */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <motion.div
                className="group relative p-8 rounded-2xl border border-border/50 bg-gradient-to-br from-card/50 via-background/30 to-card/50 backdrop-blur-xl hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ y: -12, scale: 1.05 }}
              >
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/20 to-primary/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                <div className="relative text-center">
                  <motion.div
                    className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/20 border border-primary/30 mb-4"
                    whileHover={{ scale: 1.1, rotate: 8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <BarChart3 className="h-7 w-7 text-primary" />
                  </motion.div>
                  <motion.div
                    className="text-5xl md:text-6xl font-black bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent mb-2"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    82%
                  </motion.div>
                  <div className="text-sm text-muted-foreground font-semibold mb-4">Avg Resolution Rate</div>
                  {/* Enhanced mini chart with gradient background */}
                  <div className="mt-4 p-3 rounded-lg bg-gradient-to-br from-primary/5 to-primary/5 border border-primary/10">
                    <div className="flex items-end justify-center gap-1.5 h-12">
                      {[65, 72, 78, 82, 85].map((val, i) => (
                        <motion.div
                          key={i}
                          className="w-3 bg-gradient-to-t from-primary to-primary rounded-t-full"
                          initial={{ height: 0 }}
                          animate={{ height: `${(val / 85) * 100}%` }}
                          transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="group relative p-8 rounded-2xl border border-border/50 bg-gradient-to-br from-card/50 via-background/30 to-card/50 backdrop-blur-xl hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                whileHover={{ y: -12, scale: 1.05 }}
              >
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/20 to-primary/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                <div className="relative text-center">
                  <motion.div
                    className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/20 border border-primary/30 mb-4"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Clock className="h-7 w-7 text-primary" />
                  </motion.div>
                  <motion.div
                    className="text-5xl md:text-6xl font-black bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent mb-2"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  >
                    &lt;4min
                  </motion.div>
                  <div className="text-sm text-muted-foreground font-semibold mb-4">First Response Time</div>
                  {/* Enhanced trend indicator */}
                  <motion.div
                    className="mt-4 p-3 rounded-lg bg-gradient-to-br from-primary/5 to-primary/5 border border-primary/10 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <TrendingUp className="h-4 w-4 text-primary" />
                    </motion.div>
                    <span className="text-xs text-primary font-bold">18% faster than avg</span>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className="group relative p-8 rounded-2xl border border-border/50 bg-gradient-to-br from-card/50 via-background/30 to-card/50 backdrop-blur-xl hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 sm:col-span-2 md:col-span-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ y: -12, scale: 1.05 }}
              >
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/20 to-primary/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                <div className="relative text-center">
                  <motion.div
                    className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/20 border border-primary/30 mb-4"
                    whileHover={{ scale: 1.1, rotate: -8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <Award className="h-7 w-7 text-primary" />
                  </motion.div>
                  <motion.div
                    className="text-5xl md:text-6xl font-black bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent mb-2"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    4.8/5
                  </motion.div>
                  <div className="text-sm text-muted-foreground font-semibold mb-4">Customer Satisfaction</div>
                  {/* Enhanced stars with animation */}
                  <div className="mt-4 p-3 rounded-lg bg-gradient-to-br from-primary/5 to-primary/5 border border-primary/10">
                    <div className="flex items-center justify-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={cn("text-2xl", i === 4 ? "text-amber-500/40" : "text-amber-500")}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.4, delay: 0.9 + i * 0.1, type: "spring" }}
                          whileHover={{ scale: 1.2 }}
                        >
                          ★
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Value Props Section - Enhanced */}
      <section className="relative py-24 bg-gradient-to-b from-muted/10 to-transparent overflow-hidden">
        {/* Animated background orbs */}
        <motion.div
          className="absolute top-1/2 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], x: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                className="group relative p-8 rounded-2xl border border-border/50 bg-gradient-to-br from-card/50 via-background/30 to-card/50 backdrop-blur-xl hover:bg-card hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -10, scale: 1.03 }}
              >
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/10 to-primary/10 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500" />
                <div className="relative">
                  <motion.div
                    className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary shadow-2xl mb-5"
                    whileHover={{ scale: 1.15, rotate: 8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Activity className="h-7 w-7 text-background" />
                    </motion.div>
                  </motion.div>
                  <h3 className="text-xl font-black mb-3 group-hover:text-primary transition-colors">
                    Real-Time Dashboards
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Live updates streaming every second. No refresh needed, no stale data.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="group relative p-8 rounded-2xl border border-border/50 bg-gradient-to-br from-card/50 via-background/30 to-card/50 backdrop-blur-xl hover:bg-card hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -10, scale: 1.03 }}
              >
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/10 to-primary/10 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500" />
                <div className="relative">
                  <motion.div
                    className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary shadow-2xl mb-5"
                    whileHover={{ scale: 1.15, rotate: -8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Settings className="h-7 w-7 text-background" />
                    </motion.div>
                  </motion.div>
                  <h3 className="text-xl font-black mb-3 group-hover:text-primary transition-colors">
                    Pre-built Reports
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Template library for every stakeholder. Export and share instantly.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="group relative p-8 rounded-2xl border border-border/50 bg-gradient-to-br from-card/50 via-background/30 to-card/50 backdrop-blur-xl hover:bg-card hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -10, scale: 1.03 }}
              >
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/10 to-primary/10 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500" />
                <div className="relative">
                  <motion.div
                    className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary shadow-2xl mb-5"
                    whileHover={{ scale: 1.15, rotate: 8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Users className="h-7 w-7 text-background" />
                    </motion.div>
                  </motion.div>
                  <h3 className="text-xl font-black mb-3 group-hover:text-primary transition-colors">
                    Team Performance
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Agent-level and team-level metrics. Fair, transparent, actionable.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="group relative p-8 rounded-2xl border border-border/50 bg-gradient-to-br from-card/50 via-background/30 to-card/50 backdrop-blur-xl hover:bg-card hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -10, scale: 1.03 }}
              >
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/10 to-primary/10 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500" />
                <div className="relative">
                  <motion.div
                    className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary shadow-2xl mb-5"
                    whileHover={{ scale: 1.15, rotate: -8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    >
                      <DollarSign className="h-7 w-7 text-background" />
                    </motion.div>
                  </motion.div>
                  <h3 className="text-xl font-black mb-3 group-hover:text-primary transition-colors">
                    ROI Tracking
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Prove value with cost savings data. Dollars, not just percentages.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Dashboards Showcase - 3 Column with Charts */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-muted/10 via-muted/5 to-transparent">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08),transparent_60%)]" />

        <div className="container mx-auto px-6 relative">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-20">
              <motion.h2
                className="text-5xl sm:text-6xl lg:text-7xl font-black text-foreground mb-8 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                See the{" "}
                <span className="bg-gradient-to-r from-primary via-primary to-primary bg-clip-text text-transparent">
                  complete picture
                </span>
              </motion.h2>

              <motion.p
                className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Three essential dashboards that give every stakeholder the metrics they need to{" "}
                <span className="font-bold text-foreground">make better decisions</span>.
              </motion.p>
            </div>

            {/* 3-Column Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Resolution Analytics - Left */}
              <motion.div
                className="group relative rounded-2xl border border-border/50 bg-gradient-to-br from-card/50 via-background/30 to-card/50 backdrop-blur-sm p-8 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -12, scale: 1.03 }}
              >
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/10 to-primary/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

                <div className="relative">
                  {/* Large Icon */}
                  <motion.div
                    className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary shadow-2xl mb-8"
                    whileHover={{ scale: 1.15, rotate: 8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-primary blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                    <BarChart3 className="relative h-10 w-10 text-white" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-3xl font-black text-foreground mb-3 tracking-tight">Resolution Analytics</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    Track Actioned vs. Deflected resolutions by intent. Measure real outcomes, not just information sharing.
                  </p>

                  {/* Visual Bar Charts */}
                  <div className="space-y-3 mb-6 p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/5 border border-primary/10">
                    <div className="text-xs font-bold text-primary mb-3">Resolution by Intent</div>

                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-muted-foreground">Refunds</span>
                        <span className="font-bold text-foreground">87%</span>
                      </div>
                      <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-primary rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: "87%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-muted-foreground">Plan Changes</span>
                        <span className="font-bold text-foreground">91%</span>
                      </div>
                      <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-primary rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: "91%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.4 }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-muted-foreground">WISMO</span>
                        <span className="font-bold text-foreground">76%</span>
                      </div>
                      <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-primary rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: "76%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.6 }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Large Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-primary/20">
                    <div>
                      <div className="text-3xl font-black bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent mb-1">82%</div>
                      <div className="text-xs text-muted-foreground">Avg Rate</div>
                    </div>
                    <div className="h-12 w-px bg-primary/20" />
                    <div className="text-right">
                      <div className="text-3xl font-black bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent mb-1">2.4M</div>
                      <div className="text-xs text-muted-foreground">Resolved</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Performance Metrics - Center */}
              <motion.div
                className="group relative rounded-2xl border border-border/50 bg-gradient-to-br from-card/50 via-background/30 to-card/50 backdrop-blur-sm p-8 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ y: -12, scale: 1.03 }}
              >
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/10 to-primary/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

                <div className="relative">
                  {/* Large Icon */}
                  <motion.div
                    className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary shadow-2xl mb-8"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(16,185,129,0.3)",
                        "0 0 40px rgba(16,185,129,0.5)",
                        "0 0 20px rgba(16,185,129,0.3)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-primary blur-xl opacity-60 animate-pulse" />
                    <TrendingUp className="relative h-10 w-10 text-white" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-3xl font-black text-foreground mb-3 tracking-tight">Team Performance</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    Agent scorecards with FCR, handle time, CSAT. Fair, transparent, data-driven coaching.
                  </p>

                  {/* Agent Leaderboard Mini-View */}
                  <div className="space-y-2 mb-6 p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/5 border border-primary/10">
                    <div className="text-xs font-bold text-primary mb-3">Top Performers</div>

                    {[
                      { name: 'Sarah M.', score: 96 },
                      { name: 'Alex K.', score: 94 },
                      { name: 'Jordan P.', score: 92 }
                    ].map((agent, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="flex-1 flex items-center gap-2">
                          <div className={cn(
                            "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
                            i === 0 ? "bg-amber-500 text-white" : i === 1 ? "bg-gray-400 text-white" : "bg-orange-600 text-white"
                          )}>
                            {i + 1}
                          </div>
                          <span className="text-xs font-semibold text-foreground">{agent.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-muted/30 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-primary to-primary"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${agent.score}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                            />
                          </div>
                          <span className="text-xs font-bold text-primary">{agent.score}</span>
                        </div>
                      </div>
                    ))}

                    <div className="pt-2 mt-2 border-t border-primary/20 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Team Avg</span>
                      <span className="font-bold text-foreground">88</span>
                    </div>
                  </div>

                  {/* Large Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-primary/20">
                    <div>
                      <div className="text-3xl font-black bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent mb-1">43%</div>
                      <div className="text-xs text-muted-foreground">Faster</div>
                    </div>
                    <div className="h-12 w-px bg-primary/20" />
                    <div className="text-right">
                      <div className="text-3xl font-black bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent mb-1">91%</div>
                      <div className="text-xs text-muted-foreground">FCR</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Business Intelligence - Right */}
              <motion.div
                className="group relative rounded-2xl border border-border/50 bg-gradient-to-br from-card/50 via-background/30 to-card/50 backdrop-blur-sm p-8 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ y: -12, scale: 1.03 }}
              >
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/10 to-primary/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

                <div className="relative">
                  {/* Large Icon */}
                  <motion.div
                    className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary shadow-2xl mb-8"
                    whileHover={{ scale: 1.15, rotate: -8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-primary blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                    <DollarSign className="relative h-10 w-10 text-white" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-3xl font-black text-foreground mb-3 tracking-tight">Business Impact</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    ROI, cost savings, automation rates. Prove value in dollars, not just percentages.
                  </p>

                  {/* Cost Savings Chart */}
                  <div className="space-y-4 mb-6 p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/5 border border-primary/10">
                    <div className="text-xs font-bold text-primary mb-3">Cost Comparison</div>

                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-muted-foreground">Manual Support</span>
                        <span className="font-bold text-red-500">$4.2M</span>
                      </div>
                      <div className="h-8 bg-red-500/20 rounded-lg flex items-center px-2">
                        <span className="text-xs font-bold text-red-500">Manual</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-muted-foreground">With Automation</span>
                        <span className="font-bold text-primary">$1.8M</span>
                      </div>
                      <div className="h-8 bg-primary/20 rounded-lg flex items-center px-2" style={{ width: '43%' }}>
                        <span className="text-xs font-bold text-primary">AI</span>
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-primary/20 flex items-center justify-between">
                      <span className="text-xs font-bold text-primary">Annual Savings</span>
                      <span className="text-lg font-black bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">$2.4M</span>
                    </div>
                  </div>

                  {/* Large Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-primary/20">
                    <div>
                      <div className="text-3xl font-black bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent mb-1">$2.4M</div>
                      <div className="text-xs text-muted-foreground">Saved</div>
                    </div>
                    <div className="h-12 w-px bg-primary/20" />
                    <div className="text-right">
                      <div className="text-3xl font-black bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent mb-1">80%</div>
                      <div className="text-xs text-muted-foreground">Automated</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Report Types Bento Grid */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-muted/10 via-muted/5 to-transparent">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08),transparent_60%)]" />

        <div className="container mx-auto px-6 relative">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-20">
              <motion.h2
                className="text-5xl sm:text-6xl lg:text-7xl font-black text-foreground mb-8 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Every report{" "}
                <span className="bg-gradient-to-r from-primary via-primary to-primary bg-clip-text text-transparent">
                  every stakeholder needs
                </span>
              </motion.h2>

              <motion.p
                className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Pre-built templates for executives, managers, agents, and analysts.{" "}
                <span className="font-bold text-foreground">Customize everything</span> or use as-is.
              </motion.p>
            </div>

            {/* Bento Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <MagicBento cardData={bentoCards} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Enhanced gradient mesh background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.15),transparent_60%)]" />

        {/* Enhanced animated gradient orbs with movement */}
        <motion.div
          className="absolute top-1/2 left-1/3 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, -30, 0],
            y: [0, -40, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/2 right-1/3 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.6, 0.3, 0.6],
            x: [0, -60, 40, 0],
            y: [0, 50, -40, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-72 h-72 bg-primary/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, 40, -50, 0],
            y: [0, 60, -30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />

        <div className="container mx-auto px-6 relative">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="relative p-12 md:p-16 rounded-3xl border border-border/50 bg-gradient-to-br from-card/80 via-background/60 to-card/80 backdrop-blur-2xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl" />

              <div className="relative text-center">
                {/* Enhanced Icon with rotation */}
                <motion.div
                  className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-primary shadow-2xl mb-8 mx-auto"
                  whileHover={{ scale: 1.1, rotate: 8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-primary blur-xl opacity-60 animate-pulse" />
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="relative h-10 w-10 text-white" />
                  </motion.div>
                </motion.div>

                {/* Headline */}
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-tight">
                  Ready to see your{" "}
                  <span className="bg-gradient-to-r from-primary via-primary to-primary bg-clip-text text-transparent">
                    data in action?
                  </span>
                </h2>

                {/* Description */}
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
                  Watch a live demo with your own data. See how Pullse turns raw support interactions into
                  <span className="font-bold text-foreground"> strategic intelligence</span>.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -6 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <RouteButton
                      href="/contact-sales"
                      variant="default"
                      size="lg"
                      className="group relative overflow-hidden px-12 py-8 text-xl font-black shadow-2xl shadow-primary/30"
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        <Play className="h-6 w-6" />
                        Book a Demo
                        <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                      </span>
                    </RouteButton>
                  </motion.div>

                  <RouteButton
                    href="/pricing"
                    variant="outline"
                    size="lg"
                    className="px-12 py-8 text-xl font-black border-2 hover:border-primary/50"
                  >
                    View Pricing
                  </RouteButton>
                </div>

                {/* Enhanced Trust indicators with animated checkmarks */}
                <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground mt-12">
                  {[
                    'Setup in minutes',
                    'No credit card required',
                    '14-day free trial'
                  ].map((text, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1, type: "spring" }}
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1, type: "spring", stiffness: 200 }}
                      >
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </motion.div>
                      <span>{text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductAnalytics;
