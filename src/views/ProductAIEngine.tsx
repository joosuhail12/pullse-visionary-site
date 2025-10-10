'use client';

import { useEffect, useState, useRef, Suspense, lazy } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import RouteButton from "@/components/RouteButton";
import TypingEffect from "@/components/TypingEffect";
import TiltCard from "@/components/TiltCard";
import AnimatedCounter from "@/components/AnimatedCounter";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Lazy load 3D components for performance
const DataFlowParticles = lazy(() => import("@/components/three/DataFlowParticles"));
const MorphingBackground = lazy(() => import("@/components/three/MorphingBackground"));
const EngineAssembly = lazy(() => import("@/components/three/EngineAssembly"));
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
  AlertCircle,
  TrendingUp,
  Clock,
  DollarSign,
  Award,
  Zap,
} from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Step type definition
interface Step {
  id: number;
  title: string;
  icon: React.ElementType;
  description: string;
  why: string;
  source?: string;
  console: string;
  color: string;
}


// Sticky Viewport Stepper Section Component
const StickyStepperSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  const stepperSteps = [
    {
      id: 0,
      number: "01",
      title: "Stop threats before they start",
      subtitle: "Input Guardrails",
      description: "Before AI sees anything, we scan for jailbreaks, prompt injections, and policy violations. OWASP-aligned security ensures malicious prompts never reach your engine.",
      why: "Prompt injection is the #1 LLM vulnerability. Pre-generation defenses are non-negotiable.",
      metric: "99.97%",
      metricLabel: "Attack Detection Rate",
      icon: Shield,
      gradient: "from-red-600 to-orange-600",
      console: `{
  "step": "input_guardrail",
  "status": "blocked",
  "reason": "prompt_injection_detected",
  "rule": "external_instructions",
  "threat_level": "critical",
  "action": "request_rejected"
}`,
      source: "OWASP Top 10"
    },
    {
      id: 1,
      number: "02",
      title: "Know exactly what they want",
      subtitle: "Intent Classification",
      description: "We map every message to your support intents—refund, plan change, WISMO, login help—with confidence scores, fallbacks, and escalation paths built in.",
      why: "The right workflow starts with knowing the real intent. No guessing, no mistakes.",
      metric: "94%",
      metricLabel: "Intent Accuracy",
      icon: Target,
      gradient: "from-primary to-purple-600",
      console: `{
  "step": "classify_intent",
  "intent": "refund_request",
  "confidence": 0.94,
  "sub_intent": "order_quality_issue",
  "fallback": "human_review_queue",
  "priority": "high"
}`,
      source: "Proprietary ML"
    },
    {
      id: 2,
      number: "03",
      title: "Pull the right data, nothing more",
      subtitle: "Context Retrieval",
      description: "We fetch only what's needed—order history, entitlements, policies, past conversations. The model gets facts, not fantasies. Zero hallucinations.",
      why: "RAG (Retrieval-Augmented Generation) keeps answers grounded in reality. Industry standard for accuracy.",
      metric: "8ms",
      metricLabel: "Retrieval Latency",
      icon: Database,
      gradient: "from-blue-600 to-cyan-600",
      console: `{
  "step": "retrieve_context",
  "order_id": "ORD-4931",
  "customer_tier": "premium",
  "policy": "REF-30",
  "sources": ["orders_db", "policy_docs", "conversation_history"],
  "facts_retrieved": 7
}`,
      source: "MDPI Research"
    },
    {
      id: 3,
      number: "04",
      title: "Smart plans, zero guesswork",
      subtitle: "Orchestration Engine",
      description: "The AI builds a safe action plan—verify eligibility → calculate refund → execute → notify customer. Multi-step workflows with approval gates exactly where you want them.",
      why: "Function calling is powerful. Ungoverned function calling is dangerous. We enforce guardrails at every step.",
      metric: "12ms",
      metricLabel: "Planning Time",
      icon: GitBranch,
      gradient: "from-purple-600 to-indigo-600",
      console: `{
  "step": "orchestrate",
  "plan": [
    {"action": "verify_eligibility", "approved": true},
    {"action": "calculate_refund", "amount": 49.99},
    {"action": "execute_refund", "approval": "required"},
    {"action": "notify_customer", "channel": "email"}
  ],
  "approval_required": true
}`,
      source: "OpenAI Best Practices"
    },
    {
      id: 4,
      number: "05",
      title: "Execute with confidence",
      subtitle: "Safe Action Execution",
      description: "Actions run through least-privilege connectors. Every execution writes an Action Receipt—who did what, when, and why. Complete traceability, zero ambiguity.",
      why: "Tool execution without scoping and logging is a security nightmare. We make it bulletproof.",
      metric: "100%",
      metricLabel: "Actions Logged",
      icon: Zap,
      gradient: "from-green-600 to-emerald-600",
      console: `{
  "step": "execute_action",
  "connector": "stripe_refunds",
  "operation": "create_refund",
  "amount": 49.99,
  "receipt_id": "AR-2025-001",
  "status": "success",
  "duration_ms": 342,
  "audit_trail": "complete"
}`,
      source: "OpenAI + NIST"
    },
    {
      id: 5,
      number: "06",
      title: "Catch mistakes before they happen",
      subtitle: "Quality Assurance",
      description: "We verify the action did what we expected and the answer matches the facts. Low confidence? Automatic escalation. Policy violation? Blocked instantly.",
      why: "Continuous evaluation across the AI lifecycle isn't optional—it's required for production AI.",
      metric: "0.96",
      metricLabel: "QA Score",
      icon: CheckCircle2,
      gradient: "from-indigo-600 to-primary",
      console: `{
  "step": "evaluate_quality",
  "facts_verified": 5,
  "confidence": 0.96,
  "qa_metrics": {
    "accuracy": 0.98,
    "tone": 0.94,
    "policy_compliance": 1.0,
    "hallucination_check": "passed"
  }
}`,
      source: "NIST AI RMF"
    },
    {
      id: 6,
      number: "07",
      title: "Final safety net",
      subtitle: "Output Guardrails",
      description: "Before anything reaches the customer, we run output checks—PII redaction, policy compliance, data leakage patterns. Unsafe content gets blocked or rewritten with full logging.",
      why: "Defense-in-depth. Input AND output filtering. Because one layer is never enough.",
      metric: "Zero",
      metricLabel: "PII Leaks (Ever)",
      icon: Lock,
      gradient: "from-orange-600 to-red-600",
      console: `{
  "step": "output_guardrail",
  "status": "passed",
  "pii_redacted": true,
  "policy_violations": 0,
  "data_leakage_check": "clean",
  "safe_to_send": true,
  "redactions": ["ssn", "credit_card"]
}`,
      source: "OWASP + SOC 2"
    },
    {
      id: 7,
      number: "08",
      title: "Instant, accurate responses",
      subtitle: "Response Generation",
      description: "Customers get clear, human-sounding answers. Agents get context, the full action plan, and the Action Receipt. Everyone knows exactly what happened and why.",
      why: "Transparency builds trust. Auditability ensures compliance. Both are built into every response.",
      metric: "847ms",
      metricLabel: "End-to-End Time",
      icon: MessageSquare,
      gradient: "from-primary to-purple-600",
      console: `{
  "step": "generate_response",
  "message": "Your refund of $49.99 has been processed and will appear in 5-7 business days.",
  "receipt_attached": true,
  "total_duration_ms": 847,
  "steps_completed": 8,
  "approval_status": "auto_approved"
}`,
      source: "Full Pipeline"
    }
  ];

  useEffect(() => {
    if (!sectionRef.current || !stickyRef.current) return;

    const ctx = gsap.context(() => {
      // Pin the sticky content
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: stickyRef.current,
        pinSpacing: false,
        onUpdate: (self) => {
          // Calculate which step should be active based on scroll progress
          const stepIndex = Math.min(
            Math.floor(self.progress * stepperSteps.length),
            stepperSteps.length - 1
          );
          setCurrentStep(stepIndex);
          setProgress(self.progress);
        }
      });

      // Animate each step content section
      stepperSteps.forEach((step, index) => {
        const contentEl = sectionRef.current?.querySelector(`[data-step-content="${index}"]`);
        if (!contentEl) return;

        gsap.fromTo(
          contentEl,
          {
            opacity: 0,
            y: 50
          },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: contentEl,
              start: "top 80%",
              end: "top 50%",
              scrub: 1
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentStepData = stepperSteps[currentStep];

  return (
    <section ref={sectionRef} id="stepper" className="relative bg-gradient-to-b from-background via-muted/5 to-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center pt-32 pb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm font-bold text-primary">8 Governed Steps</span>
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-foreground mb-8 leading-tight">
            Every action,{" "}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              fully governed
            </span>
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-4">
            Watch how a customer request flows through our <span className="font-bold text-foreground">8-step pipeline</span> in under a second.
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Scroll to see each step in action →
          </p>
        </div>

        {/* Sticky Split Layout */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* LEFT: 3D Pipeline Model (Sticky) */}
          <div className="lg:sticky lg:top-0 lg:h-screen flex items-center justify-center" ref={stickyRef}>
            <div className="relative w-full h-full">
              {/* Progress Ring */}
              <div className="absolute top-6 right-6 z-20">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-border"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 36}`}
                    strokeDashoffset={`${2 * Math.PI * 36 * (1 - progress)}`}
                    className="text-primary transition-all duration-300"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-black text-foreground">{currentStep + 1}/8</span>
                </div>
              </div>

              {/* 3D Pipeline Model */}
              <div className="relative w-full h-full rounded-3xl border border-border/50 bg-gradient-to-b from-zinc-950 to-zinc-900 shadow-2xl overflow-hidden">
                <Suspense fallback={
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full" />
                  </div>
                }>
                  <EngineAssembly currentStep={currentStep} progress={progress} />
                </Suspense>

                {/* Gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/50 via-transparent to-zinc-900/50 pointer-events-none" />

                {/* Step Info Overlay */}
                <div className="absolute bottom-6 left-6 right-6 z-10 bg-zinc-900/90 backdrop-blur-xl rounded-2xl border border-border/50 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${currentStepData.gradient} shadow-lg`}>
                      <currentStepData.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground font-mono">{currentStepData.subtitle}</div>
                      <div className="text-xs text-muted-foreground/60">{currentStepData.source}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className={`text-3xl font-black bg-gradient-to-r ${currentStepData.gradient} bg-clip-text text-transparent`}>
                        {currentStepData.metric}
                      </span>
                      <span className="text-xs text-muted-foreground ml-2">{currentStepData.metricLabel}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Scrolling Content */}
          <div className="space-y-0 pb-[100vh]">
            {stepperSteps.map((step, index) => (
              <div
                key={step.id}
                data-step-content={index}
                className="h-screen flex items-center"
              >
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border/50">
                    <span className="text-xs font-mono text-muted-foreground">STEP {step.number}</span>
                  </div>

                  <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-tight">
                    {step.title}
                  </h3>

                  <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>

                  <div className="relative p-6 rounded-xl bg-gradient-to-br from-primary/5 to-purple-600/5 border border-primary/20">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-foreground mb-2">Why this matters</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{step.why}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                    <span className="text-xs text-muted-foreground font-mono">Source: {step.source}</span>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProductAIEngine = () => {
  const [expandedStep, setExpandedStep] = useState<number>(0);
  const [activeConsoleStep, setActiveConsoleStep] = useState<number>(0);
  const [scrollOffset, setScrollOffset] = useState<number>(0);
  const stepperRef = useRef<HTMLDivElement>(null);

  // Track scroll for morphing background
  useEffect(() => {
    const handleScroll = () => {
      setScrollOffset(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 8-step flow data
  const steps: Step[] = [
    {
      id: 0,
      title: "Guardrails (Input)",
      icon: Shield,
      description: "We scan prompts and attached content to catch jailbreaks, injections, data-exfiltration attempts, and policy violations before the model sees them.",
      why: "Prompt injection/jailbreaks are a top LLM risk; pre-generation defenses are recommended by OWASP and commercial safety stacks (e.g., Azure Prompt Shields).",
      source: "OWASP",
      console: '{"step":"input_guardrail","status":"blocked","reason":"prompt_injection","rule":"external_instructions"}',
      color: "from-red-600 to-orange-600"
    },
    {
      id: 1,
      title: "Classify Intent",
      icon: Target,
      description: "We map the message to your support intents (e.g., refund, plan change, WISMO, login help) with confidence scores, fallbacks, and \"needs human\" routes.",
      why: "Intent classification ensures the right workflow handles each request, with fallback safety nets.",
      console: '{"step":"classify","intent":"refund_request","confidence":0.94,"fallback":"human_review"}',
      color: "from-primary to-purple-600"
    },
    {
      id: 2,
      title: "Gather Context",
      icon: Database,
      description: "We pull only what's needed—orders, entitlement, policy, prior conversations—so the model is grounded, not guessing.",
      why: "Retrieval-Augmented Generation (RAG) is an established way to reduce hallucinations and keep answers current; multiple studies and industry write-ups recommend RAG to improve factuality.",
      source: "MDPI",
      console: '{"step":"retrieve","order_id":"4931","eligibility":true,"policy":"REF-30","sources":["orders_db","policy_docs"]}',
      color: "from-blue-600 to-cyan-600"
    },
    {
      id: 3,
      title: "Plan & Orchestrate",
      icon: GitBranch,
      description: "The engine chooses a safe path (self-serve, assist, or human) and composes a short action plan—verify → compute → execute → notify—with approvals where required.",
      why: "Connecting models to tools (\"function calling/tool use\") is powerful, but you should enforce approval gates and scope credentials—standard safety guidance.",
      source: "OpenAI",
      console: '{"step":"plan","path":"self_service_with_approval","nodes":["verify","compute_refund","execute","notify"],"approval_required":true}',
      color: "from-purple-600 to-indigo-600"
    },
    {
      id: 4,
      title: "Execute",
      icon: Play,
      description: "Actions run via least-privilege connectors (e.g., refund, plan update, status check). Every step writes an Action Receipt into the ticket (who/what/when/source).",
      why: "Tool execution without scoping and audit creates avoidable risk; secure tool use + logging is best practice.",
      source: "OpenAI",
      console: '{"step":"action","connector":"stripe","operation":"refund","amount":49.00,"receipt_id":"AR-2025-10-07-001","status":"success","timestamp":"2025-10-07T14:32:01Z"}',
      color: "from-green-600 to-emerald-600"
    },
    {
      id: 5,
      title: "Evaluate Answers",
      icon: CheckCircle2,
      description: "We verify that the action did what we expected and the answer matches the facts/context; low confidence escalates or requests approval.",
      why: "Continuous evaluation & monitoring across the lifecycle is part of recognized AI risk frameworks.",
      source: "NIST",
      console: '{"step":"eval","facts_checked":3,"confidence":0.92,"qa_score":{"accuracy":0.95,"tone":0.9,"policy_compliance":0.98}}',
      color: "from-indigo-600 to-primary"
    },
    {
      id: 6,
      title: "Guardrails (Output)",
      icon: Lock,
      description: "Before anything is sent, we run output checks for policy, PII redaction, and leakage patterns; unsafe content is blocked or rewritten with a reason code.",
      why: "Defense-in-depth (input + output filtering) is advised by OWASP and enterprise safety stacks.",
      source: "OWASP",
      console: '{"step":"output_guardrail","status":"passed","pii_redacted":true,"policy_violations":0,"safe_to_send":true}',
      color: "from-orange-600 to-red-600"
    },
    {
      id: 7,
      title: "Generate Response",
      icon: MessageSquare,
      description: "Customers get a clear, human-sounding answer. Agents see context, the plan that ran, and the Action Receipt—so they can trust and audit the result.",
      why: "Full transparency and auditability build trust with both customers and support teams.",
      console: '{"step":"response","message":"Your refund of $49.00 has been processed and will appear in 5-7 business days.","receipt_attached":true,"agent_notes":"Auto-resolved with approval"}',
      color: "from-primary to-purple-600"
    }
  ];

  useEffect(() => {
    // Auto-update active console as user scrolls through steps
    setActiveConsoleStep(expandedStep);
  }, [expandedStep]);

  return (
    <div className="min-h-screen relative">
      {/* Morphing WebGL Background */}
      <Suspense fallback={null}>
        <MorphingBackground scrollOffset={scrollOffset} />
      </Suspense>

      <PageLiquidBackground opacity={0.3} />
      <Navigation />

      {/* Hero Section - Enhanced */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary-rgb),0.15),transparent_50%)]" />

        <div className="container mx-auto px-6 relative">
          <div className="max-w-6xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 via-purple-500/10 to-indigo-500/10 border border-primary/30 backdrop-blur-xl mb-8 shadow-lg">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-bold bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent">Governed AI Engine</span>
            </div>

            {/* Enhanced Headline */}
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-foreground mb-8 tracking-tight leading-tight">
              AI that acts like a{" "}
              <span className="bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                senior agent
              </span>
              <span className="block mt-2">—in milliseconds</span>
            </h1>

            {/* Enhanced Subheadline */}
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto mb-6 leading-relaxed">
              Turn every customer conversation into governed actions. No hallucinations. No risk.
              Just <span className="text-foreground font-bold">results your leadership can trust</span>.
            </p>

            {/* Social proof stat */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border/50 mb-12">
              <div className="flex -space-x-2">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary to-purple-600 border-2 border-background" />
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 border-2 border-background" />
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-indigo-600 to-primary border-2 border-background" />
              </div>
              <span className="text-sm text-muted-foreground">
                Processing <span className="font-bold text-foreground">2.4M actions/month</span> for teams like yours
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center mb-16">
              <RouteButton
                href="/contact-sales"
                variant="default"
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-primary via-purple-600 to-indigo-600 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500 px-10 py-7 text-lg font-black"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                <span className="relative z-10 flex items-center gap-3">
                  <Play className="h-5 w-5" />
                  See It Process a Real Request
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </RouteButton>

              <RouteButton
                href="#stepper"
                variant="outline"
                size="lg"
                className="group px-10 py-7 text-lg border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5 font-black"
              >
                <span className="flex items-center gap-3">
                  <ChevronDown className="h-5 w-5 group-hover:translate-y-1 transition-transform duration-300" />
                  Explore the 8-Step Pipeline
                </span>
              </RouteButton>
            </div>

            {/* Animated Stats Showcase */}
            <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
              <div className="text-center">
                <div className="text-5xl font-black bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-2">
                  <AnimatedCounter value={99.97} decimals={2} suffix="%" />
                </div>
                <div className="text-sm text-muted-foreground font-semibold">Attack Detection</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  <AnimatedCounter value={850} suffix="ms" />
                </div>
                <div className="text-sm text-muted-foreground font-semibold">Avg Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black bg-gradient-to-r from-indigo-600 to-primary bg-clip-text text-transparent mb-2">
                  <AnimatedCounter value={2.4} decimals={1} suffix="M" />
                </div>
                <div className="text-sm text-muted-foreground font-semibold">Actions/Month</div>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCheck className="h-4 w-4 text-green-500" />
                <span className="font-semibold">SOC 2 Type II</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span className="font-semibold">OWASP Compliant</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-500" />
                <span className="font-semibold">NIST AI RMF</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8-Step Sticky Viewport Stepper */}
      <StickyStepperSection />

      {/* Controls You'll Love - Ultra Modern */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

        <div className="container mx-auto px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/10 border border-purple-600/30 mb-6">
                <Settings className="h-4 w-4 text-purple-400" />
                <span className="text-sm font-bold text-purple-400">Powerful Controls</span>
              </div>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-foreground mb-8 leading-tight">
                Controls you'll{" "}
                <span className="bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  actually love
                </span>
              </h2>
              <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Fine-grained governance <span className="font-bold text-foreground">without sacrificing</span> speed or flexibility
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Approvals - Enhanced with 3D Tilt */}
              <TiltCard className="group relative rounded-2xl border border-border/50 bg-gradient-to-br from-card/50 via-background/30 to-card/50 backdrop-blur-sm p-10 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500" intensity={8}>
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/10 to-purple-600/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                <div className="relative">
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-purple-600 shadow-2xl mb-8 group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-purple-600 blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                    <CheckCircle2 className="relative h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-foreground mb-4 tracking-tight">Approvals Anywhere</h3>
                  <p className="text-base text-muted-foreground leading-relaxed mb-6">
                    Set thresholds by intent, amount, or segment. Multi-level workflows when needed. Every high-risk action can require <span className="font-bold text-foreground">explicit human approval</span> before execution.
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/30 text-sm text-primary font-bold">
                    <ExternalLink className="h-4 w-4" />
                    OpenAI Best Practices
                  </div>
                </div>
              </TiltCard>

              {/* Simulation Mode - Enhanced with 3D Tilt */}
              <TiltCard className="group relative rounded-2xl border border-border/50 bg-gradient-to-br from-card/50 via-background/30 to-card/50 backdrop-blur-sm p-10 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500" intensity={8}>
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-purple-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                <div className="relative">
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-2xl mb-8 group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                    <Play className="relative h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-foreground mb-4 tracking-tight">Simulation Mode</h3>
                  <p className="text-base text-muted-foreground leading-relaxed mb-6">
                    Dry-run actions and see the plan <span className="font-bold text-foreground">without touching systems</span>. Perfect for testing new intents, policies, or approval flows before going live.
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-600/10 border border-purple-600/30 text-sm text-purple-400 font-bold">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-400"></span>
                    </span>
                    Test Mode Active
                  </div>
                </div>
              </TiltCard>

              {/* Policy Packs - Enhanced with 3D Tilt */}
              <TiltCard className="group relative rounded-2xl border border-border/50 bg-gradient-to-br from-card/50 via-background/30 to-card/50 backdrop-blur-sm p-10 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500" intensity={8}>
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-indigo-600/10 to-primary/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                <div className="relative">
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-primary shadow-2xl mb-8 group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-600 to-primary blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                    <FileText className="relative h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-foreground mb-4 tracking-tight">Policy Packs</h3>
                  <p className="text-base text-muted-foreground leading-relaxed mb-6">
                    SaaS and Ecommerce starter packs with <span className="font-bold text-foreground">pre-built rules</span>: refund windows, proration logic, RMA policies, and more. Customize to match your brand.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 rounded-md bg-indigo-600/10 text-xs text-indigo-400 font-bold">SaaS</span>
                    <span className="px-2 py-1 rounded-md bg-indigo-600/10 text-xs text-indigo-400 font-bold">Ecommerce</span>
                    <span className="px-2 py-1 rounded-md bg-indigo-600/10 text-xs text-indigo-400 font-bold">Custom</span>
                  </div>
                </div>
              </TiltCard>

              {/* Observability - Enhanced with 3D Tilt */}
              <TiltCard className="group relative rounded-2xl border border-border/50 bg-gradient-to-br from-card/50 via-background/30 to-card/50 backdrop-blur-sm p-10 hover:border-green-500/50 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500" intensity={8}>
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-green-600/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                <div className="relative">
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-green-600 to-emerald-600 shadow-2xl mb-8 group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-600 blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                    <BarChart3 className="relative h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-foreground mb-4 tracking-tight">Full Observability</h3>
                  <p className="text-base text-muted-foreground leading-relaxed mb-6">
                    Step-by-step logs, latency tracking, success rates, retry patterns, and <span className="font-bold text-foreground">rollback capability</span>. Every action is traceable and auditable.
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-green-600/10 border border-green-600/30 text-sm text-green-400 font-bold">
                    <Activity className="h-4 w-4" />
                    100% Coverage
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes You Can Show - Ultra Modern */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

        <div className="container mx-auto px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-600/10 border border-green-600/30 mb-6">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <span className="text-sm font-bold text-green-400">Measurable Impact</span>
              </div>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-foreground mb-8 leading-tight">
                Outcomes you can{" "}
                <span className="bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  show upstairs
                </span>
              </h2>
              <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Metrics that <span className="font-bold text-foreground">matter to leadership</span>, tracked automatically
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Resolution Analytics */}
              <div className="group relative rounded-2xl border border-border/50 bg-gradient-to-br from-card/30 via-background/20 to-card/30 backdrop-blur-sm p-10 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:scale-[1.05]">
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/10 to-purple-600/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                <div className="relative">
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-purple-600 shadow-2xl mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-purple-600 blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                    <Target className="relative h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-foreground mb-4 tracking-tight">Resolution Analytics</h3>
                  <p className="text-base text-muted-foreground leading-relaxed mb-6">
                    <span className="font-bold text-foreground">Actioned vs. Deflected</span> resolutions by intent. See which workflows drive real outcomes vs. simple information sharing.
                  </p>
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                    View Reports
                  </div>
                </div>
              </div>

              {/* FCR & Handle Time */}
              <div className="group relative rounded-2xl border border-border/50 bg-gradient-to-br from-card/30 via-background/20 to-card/30 backdrop-blur-sm p-10 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:scale-[1.05]">
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-purple-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                <div className="relative">
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-2xl mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                    <Clock className="relative h-10 w-10 text-white" />
                  </div>
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
              </div>

              {/* Coverage & Adoption */}
              <div className="group relative rounded-2xl border border-border/50 bg-gradient-to-br from-card/30 via-background/20 to-card/30 backdrop-blur-sm p-10 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 hover:scale-[1.05]">
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-indigo-600/10 to-primary/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                <div className="relative">
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-primary shadow-2xl mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-600 to-primary blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                    <Users className="relative h-10 w-10 text-white" />
                  </div>
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust, Safety & Governance - Ultra Modern */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

        <div className="container mx-auto px-6 relative">
          <div className="max-w-6xl mx-auto">
            <div className="relative rounded-3xl border border-primary/30 bg-gradient-to-br from-card/50 via-background/30 to-card/50 backdrop-blur-xl p-16 shadow-2xl">
              {/* Background glow */}
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/20 via-purple-600/20 to-indigo-600/20 opacity-50 blur-2xl" />
              <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_30%_30%,rgba(var(--primary-rgb),0.15),transparent_70%)]" />

              <div className="relative">
                <div className="text-center mb-16">
                  <div className="relative inline-flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-purple-600 shadow-2xl mb-8">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-purple-600 blur-xl opacity-60" />
                    <Shield className="relative h-12 w-12 text-white" />
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                    <Lock className="h-4 w-4 text-primary" />
                    <span className="text-sm font-bold text-primary">Enterprise-Grade Security</span>
                  </div>
                  <h2 className="text-5xl sm:text-6xl font-black text-foreground mb-6 leading-tight">
                    Trust, safety &{" "}
                    <span className="bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                      governance
                    </span>
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    We align to <span className="font-bold text-foreground">recognized guidance (NIST AI RMF)</span> and industry security practice <span className="font-bold text-foreground">(OWASP Top 10 for LLM apps)</span>: guardrails, human-in-the-loop for risky actions, approvals, and continuous monitoring.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* NIST AI RMF */}
                  <div className="group relative flex items-start gap-5 p-8 rounded-2xl border border-border/40 bg-gradient-to-br from-background/80 to-card/50 backdrop-blur-sm hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500">
                    <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500" />
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-purple-600/20 border border-primary/30 group-hover:scale-110 transition-transform duration-500">
                      <CheckCircle2 className="h-7 w-7 text-primary" />
                    </div>
                    <div className="relative flex-1">
                      <h4 className="text-xl font-black text-foreground mb-3">NIST AI RMF</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Lifecycle risk management with continuous evaluation and human oversight
                      </p>
                    </div>
                  </div>

                  {/* OWASP Top 10 */}
                  <div className="group relative flex items-start gap-5 p-8 rounded-2xl border border-border/40 bg-gradient-to-br from-background/80 to-card/50 backdrop-blur-sm hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500">
                    <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500" />
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border border-purple-600/30 group-hover:scale-110 transition-transform duration-500">
                      <Shield className="h-7 w-7 text-purple-400" />
                    </div>
                    <div className="relative flex-1">
                      <h4 className="text-xl font-black text-foreground mb-3">OWASP Top 10</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Defense against prompt injection, jailbreaks, and data exfiltration attempts
                      </p>
                    </div>
                  </div>

                  {/* Least-Privilege Access */}
                  <div className="group relative flex items-start gap-5 p-8 rounded-2xl border border-border/40 bg-gradient-to-br from-background/80 to-card/50 backdrop-blur-sm hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-500">
                    <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-indigo-600/10 to-transparent opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500" />
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600/20 to-primary/20 border border-indigo-600/30 group-hover:scale-110 transition-transform duration-500">
                      <Lock className="h-7 w-7 text-indigo-400" />
                    </div>
                    <div className="relative flex-1">
                      <h4 className="text-xl font-black text-foreground mb-3">Least-Privilege Access</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Scoped credentials and approval gates for every sensitive action
                      </p>
                    </div>
                  </div>

                  {/* Full Audit Trails */}
                  <div className="group relative flex items-start gap-5 p-8 rounded-2xl border border-border/40 bg-gradient-to-br from-background/80 to-card/50 backdrop-blur-sm hover:border-green-500/50 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-500">
                    <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-green-600/10 to-transparent opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500" />
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-600/30 group-hover:scale-110 transition-transform duration-500">
                      <FileText className="h-7 w-7 text-green-400" />
                    </div>
                    <div className="relative flex-1">
                      <h4 className="text-xl font-black text-foreground mb-3">Full Audit Trails</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Action Receipts with source attribution for every automated decision
                      </p>
                    </div>
                  </div>
                </div>

                {/* Certification badges */}
                <div className="mt-12 pt-12 border-t border-border/30">
                  <div className="flex flex-wrap items-center justify-center gap-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/5 border border-primary/20">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span className="text-sm font-bold text-foreground">SOC 2 Type II</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600/5 border border-purple-600/20">
                      <Shield className="h-4 w-4 text-purple-400" />
                      <span className="text-sm font-bold text-foreground">GDPR Compliant</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600/5 border border-indigo-600/20">
                      <Lock className="h-4 w-4 text-indigo-400" />
                      <span className="text-sm font-bold text-foreground">HIPAA Ready</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8">
                  <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                  <span className="text-sm font-bold text-primary">Get Started Today</span>
                </div>

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
