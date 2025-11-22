'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import type { gsap as GSAPType } from 'gsap';
import ProgressHeader from '@/components/ProgressHeader';
import TimelineStep from '@/components/TimelineStep';
import {
  Shield,
  Target,
  Database,
  GitBranch,
  CheckCircle2,
  Lock,
  MessageSquare,
  Zap,
} from 'lucide-react';

export default function StickyStepperSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isInView, setIsInView] = useState<boolean>(false);
  const [gsapInstance, setGsapInstance] = useState<typeof GSAPType | null>(null);
  const scrollTriggerRef = useRef<any>(null);

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
    let isMounted = true;
    Promise.all([import('gsap'), import('gsap/dist/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (!isMounted) return;
      gsap.registerPlugin(ScrollTrigger);
      scrollTriggerRef.current = ScrollTrigger;
      setGsapInstance(() => gsap);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !gsapInstance || !scrollTriggerRef.current) return;

    const ScrollTrigger = scrollTriggerRef.current;

    const ctx = gsapInstance.context(() => {
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
  }, [gsapInstance]);

  return (
    <>
      {/* Progress Header - Sticky at bottom, only visible in stepper section */}
      <ProgressHeader
        currentStep={currentStep}
        totalSteps={stepperSteps.length}
        stepTitles={stepperSteps.map(s => s.subtitle)}
        isVisible={isInView}
      />

      <section id="stepper" className="relative bg-gradient-to-b from-background via-muted/5 to-background overflow-hidden pt-12 md:pt-18 lg:pt-24">
        {/* Enhanced background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.08),transparent_60%)]" />
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-purple-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 md:px-6 relative">
          {/* Section Header - Enhanced */}
          <div className="text-center pt-16 pb-10 md:pt-24 md:pb-16 lg:pt-32 lg:pb-20">
            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-6 md:mb-7 lg:mb-8 leading-tight"
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
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-5 md:mb-6"
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
}
