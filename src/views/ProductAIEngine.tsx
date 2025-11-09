'use client';

import { useEffect, useState, useRef, Suspense } from "react";
import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import RouteButton from "@/components/RouteButton";
import TypingEffect from "@/components/TypingEffect";
import TiltCard from "@/components/TiltCard";
import AnimatedCounter from "@/components/AnimatedCounter";
import InfrastructureShowcase from "@/components/InfrastructureShowcase";
import DeploymentComparison from "@/components/DeploymentComparison";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { motion } from "framer-motion";

// Lazy load components for performance with SSR disabled
const DataFlowParticles = dynamic(() => import("@/components/three/DataFlowParticles"), { ssr: false });
const MorphingBackground = dynamic(() => import("@/components/three/MorphingBackground"), { ssr: false });
import ProgressHeader from "@/components/ProgressHeader";
import TimelineStep from "@/components/TimelineStep";
import {
  Shield,
  Target,
  Database,
  GitBranch,
  Play,
  CheckCircle2,
  Lock,
  MessageSquare,
  AlertTriangle,
  FileText,
  Users,
  BarChart3,
  Settings,
  Sparkles,
  ExternalLink,
  ChevronDown,
  CheckCheck,
  ArrowRight,
  Brain,
  Activity,
  Terminal,
  TrendingUp,
  Clock,
  DollarSign,
  Award,
  Zap,
  LayoutGrid,
  RotateCw,
  Code,
} from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Sticky Viewport Stepper Section Component
const StickyStepperSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isInView, setIsInView] = useState<boolean>(false);

  const stepperSteps = [
    {
      id: 0,
      number: "01",
      title: "Stop threats before they start",
      subtitle: "Input Guardrails",
      description: "Scan for jailbreaks, prompt injections, and policy violations before AI sees anything.",
      metric: "99.97%",
      metricLabel: "Attack Detection Rate",
      icon: Shield,
      gradient: "from-red-600 to-orange-600",
    },
    {
      id: 1,
      number: "02",
      title: "Know exactly what they want",
      subtitle: "Intent Classification",
      description: "Map every message to support intents with confidence scores and escalation paths.",
      metric: "94%",
      metricLabel: "Intent Accuracy",
      icon: Target,
      gradient: "from-primary to-purple-600",
    },
    {
      id: 2,
      number: "03",
      title: "Pull the right data, nothing more",
      subtitle: "Context Retrieval",
      description: "Fetch only what's needed—order history, policies, past conversations. Facts, not fantasies.",
      metric: "8ms",
      metricLabel: "Retrieval Latency",
      icon: Database,
      gradient: "from-blue-600 to-cyan-600",
    },
    {
      id: 3,
      number: "04",
      title: "Smart plans, zero guesswork",
      subtitle: "Orchestration Engine",
      description: "Build safe action plans with approval gates exactly where you want them.",
      metric: "12ms",
      metricLabel: "Planning Time",
      icon: GitBranch,
      gradient: "from-purple-600 to-indigo-600",
    },
    {
      id: 4,
      number: "05",
      title: "Execute with confidence",
      subtitle: "Safe Action Execution",
      description: "Run actions through least-privilege connectors with complete traceability.",
      metric: "100%",
      metricLabel: "Actions Logged",
      icon: Zap,
      gradient: "from-green-600 to-emerald-600",
    },
    {
      id: 5,
      number: "06",
      title: "Catch mistakes before they happen",
      subtitle: "Quality Assurance",
      description: "Verify actions match expectations. Low confidence gets escalated, violations blocked.",
      metric: "0.96",
      metricLabel: "QA Score",
      icon: CheckCircle2,
      gradient: "from-indigo-600 to-primary",
    },
    {
      id: 6,
      number: "07",
      title: "Final safety net",
      subtitle: "Output Guardrails",
      description: "Run output checks for PII redaction, policy compliance, and data leakage patterns.",
      metric: "Zero",
      metricLabel: "PII Leaks (Ever)",
      icon: Lock,
      gradient: "from-orange-600 to-red-600",
    },
    {
      id: 7,
      number: "08",
      title: "Instant, accurate responses",
      subtitle: "Response Generation",
      description: "Deliver clear answers with full context and Action Receipts for complete transparency.",
      metric: "847ms",
      metricLabel: "End-to-End Time",
      icon: MessageSquare,
      gradient: "from-primary to-purple-600",
    }
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Track if section is in view
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => setIsInView(true),
        onLeave: () => setIsInView(false),
        onEnterBack: () => setIsInView(true),
        onLeaveBack: () => setIsInView(false),
      });

      // Track scroll progress through all steps
      stepperSteps.forEach((step, index) => {
        const contentEl = sectionRef.current?.querySelector(`[data-step-content="${index}"]`);
        if (!contentEl) return;

        ScrollTrigger.create({
          trigger: contentEl,
          start: "top center",
          end: "bottom center",
          onEnter: () => setCurrentStep(index),
          onEnterBack: () => setCurrentStep(index),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Progress Header - Sticky at bottom, only visible in stepper section */}
      <ProgressHeader
        currentStep={currentStep}
        totalSteps={stepperSteps.length}
        stepTitles={stepperSteps.map(s => s.subtitle)}
        isVisible={isInView}
      />

      <section id="stepper" className="relative bg-gradient-to-b from-background via-muted/5 to-background overflow-hidden pt-24">
        {/* Enhanced background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.08),transparent_60%)]" />
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-6 relative">
          {/* Section Header - Enhanced */}
          <div className="text-center pt-32 pb-20">
            <motion.h2
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-foreground mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              8 steps.{" "}
              <span className="bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Zero hallucinations.
              </span>
            </motion.h2>

            <motion.p
              className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              From <span className="font-bold text-foreground">threat detection</span> to <span className="font-bold text-foreground">safe execution</span>—watch every action flow through our governed pipeline.
            </motion.p>
          </div>

          {/* Timeline Container */}
          <div ref={sectionRef} className="relative">
            {/* Vertical timeline line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary/50 to-primary/20 -translate-x-1/2" />

            {/* Progress line overlay */}
            <div
              className="hidden lg:block absolute left-1/2 top-0 w-0.5 bg-gradient-to-b from-primary to-purple-600 -translate-x-1/2 transition-all duration-300"
              style={{ height: `${(currentStep / (stepperSteps.length - 1)) * 100}%` }}
            />

            {/* Timeline Steps */}
            {stepperSteps.map((step, index) => (
              <div key={step.id} data-step-content={index}>
                <TimelineStep
                  step={step}
                  isActive={index === currentStep}
                  isPast={index < currentStep}
                  isLeft={index % 2 === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

const ProductAIEngine = () => {
  const [scrollOffset, setScrollOffset] = useState<number>(0);

  // Track scroll for morphing background
  useEffect(() => {
    const handleScroll = () => {
      setScrollOffset(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Morphing WebGL Background */}
      <Suspense fallback={null}>
        <MorphingBackground scrollOffset={scrollOffset} />
      </Suspense>

      <PageLiquidBackground opacity={0.3} />
      <Navigation />

      {/* Hero Section - Reimagined 2025 */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        {/* Enhanced gradient mesh background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary-rgb),0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1),transparent_50%)]" />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <div className="container mx-auto px-6 relative">
          <div className="max-w-6xl mx-auto text-center">
            {/* Enhanced Headline with better value prop */}
            <motion.h1
              className="text-6xl sm:text-7xl lg:text-8xl font-black text-foreground mb-8 tracking-tight leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Turn support tickets into{" "}
              <span className="bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                resolved issues
              </span>
              <span className="block mt-2">—automatically</span>
            </motion.h1>

            {/* Enhanced Subheadline with clearer benefits */}
            <motion.p
              className="text-2xl text-muted-foreground max-w-4xl mx-auto mb-6 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              AI that <span className="text-foreground font-bold">takes action</span>, not just suggests it.
              Process refunds, update subscriptions, and resolve issues—with <span className="text-foreground font-bold">full governance</span> and <span className="text-foreground font-bold">zero hallucinations</span>.
            </motion.p>

            {/* Single Primary CTA */}
            <motion.div
              className="flex flex-col items-center gap-4 mb-16"
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
                  className="group relative overflow-hidden bg-gradient-to-r from-primary via-purple-600 to-indigo-600 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500 px-12 py-8 text-xl font-black"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                  <span className="relative z-10 flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="h-6 w-6" />
                    </motion.div>
                    See Live Demo
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </RouteButton>
              </motion.div>

              {/* Secondary link */}
              <Link href="#stepper" className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4">
                or scroll to explore the 8-step pipeline
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCheck className="h-4 w-4 text-green-500" />
                <span className="font-semibold">SOC 2 Type II in progress</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span className="font-semibold">OWASP Guidelines</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-500" />
                <span className="font-semibold">NIST AI RMF Aligned</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8-Step Sticky Viewport Stepper */}
      <StickyStepperSection />

      {/* Infrastructure Showcase - Content & Action Centers */}
      <InfrastructureShowcase />

      {/* Outcomes You Can Show - Redesigned with Data Viz */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.08),transparent_60%)]" />

        <div className="container mx-auto px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <motion.h2
                className="text-5xl sm:text-6xl lg:text-7xl font-black text-foreground mb-8 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Results that{" "}
                <span className="bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  move the needle
                </span>
              </motion.h2>
              <motion.p
                className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Real metrics from real teams. Track what <span className="font-bold text-foreground">leadership actually cares about</span>.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Resolution Analytics - With Visual Data */}
              <motion.div
                className="group relative rounded-2xl border border-border/50 bg-gradient-to-br from-card/30 via-background/20 to-card/30 backdrop-blur-sm p-8 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -12, scale: 1.03 }}
              >
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/10 to-purple-600/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                <div className="relative">
                  {/* Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-purple-600/20 border border-primary/30">
                      <Target className="h-7 w-7 text-primary" />
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black text-primary">82%</div>
                      <div className="text-xs text-muted-foreground">Avg Rate</div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-black text-foreground mb-3 tracking-tight">Resolution Analytics</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    Track <span className="font-bold text-foreground">Actioned vs. Deflected</span> resolutions by intent. Measure real outcomes, not just information sharing.
                  </p>

                  {/* Visual Bar Chart */}
                  <div className="space-y-3 mb-6">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-muted-foreground">Refunds</span>
                        <span className="font-bold text-foreground">87%</span>
                      </div>
                      <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-purple-600 rounded-full"
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
                          className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"
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
                          className="h-full bg-gradient-to-r from-indigo-600 to-primary rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: "76%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.6 }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all">
                    <span>View Dashboard</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>

              {/* FCR & Handle Time */}
              <motion.div
                className="group relative rounded-2xl border border-border/50 bg-gradient-to-br from-card/30 via-background/20 to-card/30 backdrop-blur-sm p-10 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500"
                whileHover={{ y: -12, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-purple-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                <div className="relative">
                  <motion.div
                    className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-2xl mb-8"
                    whileHover={{ scale: 1.15, rotate: 8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      <Clock className="relative h-10 w-10 text-white" />
                    </motion.div>
                  </motion.div>
                  <h3 className="text-2xl font-black text-foreground mb-4 tracking-tight">FCR & Handle Time</h3>
                  <p className="text-base text-muted-foreground leading-relaxed mb-6">
                    <span className="font-bold text-foreground">First-Contact Resolution</span> rates and Handle Time deltas. Quantify how AI improves agent productivity and customer satisfaction.
                  </p>
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600/10">
                      <TrendingUp className="h-4 w-4" />
                    </div>
                    Track Metrics
                  </div>
                </div>
              </motion.div>

              {/* Coverage & Adoption */}
              <motion.div
                className="group relative rounded-2xl border border-border/50 bg-gradient-to-br from-card/30 via-background/20 to-card/30 backdrop-blur-sm p-10 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500"
                whileHover={{ y: -12, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-indigo-600/10 to-primary/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                <div className="relative">
                  <motion.div
                    className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-primary shadow-2xl mb-8"
                    whileHover={{ scale: 1.15, rotate: 8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-600 to-primary blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Users className="relative h-10 w-10 text-white" />
                    </motion.div>
                  </motion.div>
                  <h3 className="text-2xl font-black text-foreground mb-4 tracking-tight">Coverage & Adoption</h3>
                  <p className="text-base text-muted-foreground leading-relaxed mb-6">
                    Track tickets touched by automation and <span className="font-bold text-foreground">Copilot adoption</span> by agent. Prove ROI with clear utilization metrics.
                  </p>
                  <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/10">
                      <Award className="h-4 w-4" />
                    </div>
                    Show ROI
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Deployment Comparison - Chatbots & Copilots */}
      <DeploymentComparison />

      {/* Final CTA - Ultra Modern */}
      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/10 to-background" />

        {/* Animated background gradients */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-6 relative">
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-3xl border border-primary/30 bg-gradient-to-br from-card/50 via-background/30 to-card/50 backdrop-blur-2xl p-16 shadow-2xl text-center overflow-hidden">
              {/* Background glow */}
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/30 via-purple-600/30 to-indigo-600/30 opacity-50 blur-2xl" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.15),transparent_70%)]" />

              <div className="relative">
                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-foreground mb-8 leading-tight">
                  Ready to see it{" "}
                  <span className="bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                    in action?
                  </span>
                </h2>

                <p className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
                  Book a technical walkthrough and see how Pullse handles <span className="font-bold text-foreground">your specific use cases</span> with governed AI.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <RouteButton
                      href="/contact-sales"
                      variant="default"
                      size="lg"
                      className="group relative overflow-hidden bg-gradient-to-r from-primary via-purple-600 to-indigo-600 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500 px-12 py-6 text-lg font-black"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                      <span className="relative z-10 flex items-center gap-3">
                        Book a Demo
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                      </span>
                    </RouteButton>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <RouteButton
                      href="/product/ai-suite"
                      variant="outline"
                      size="lg"
                      className="group border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5 px-12 py-6 text-lg font-black"
                    >
                      <span className="flex items-center gap-3">
                        Explore AI Suite
                        <ExternalLink className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                      </span>
                    </RouteButton>
                  </motion.div>
                </div>

                {/* Social proof */}
                <div className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-border/30">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="text-sm font-bold text-muted-foreground">14-day trial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="text-sm font-bold text-muted-foreground">No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="text-sm font-bold text-muted-foreground">5-minute setup</span>
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

export default ProductAIEngine;
