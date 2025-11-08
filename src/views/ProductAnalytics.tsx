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
      title: 'Custom & Scheduled Reports',
      description: 'Build custom analytics dashboards and schedule automated report delivery to stakeholders. Export data your way.',
      label: 'Coming Soon',
      icon: Calendar,
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
                Pre-built analytics for volume trends, resolution rates, team performance, customer satisfaction, AI metrics, response times, and ROI tracking.
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
