'use client';

import { useEffect, useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import RouteButton from "@/components/RouteButton";
import Link from "next/link";
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
} from "lucide-react";

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

const ProductAIEngine = () => {
  const [expandedStep, setExpandedStep] = useState<number>(0);
  const [activeConsoleStep, setActiveConsoleStep] = useState<number>(0);
  const stepperRef = useRef<HTMLDivElement>(null);

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
      <PageLiquidBackground opacity={0.3} />
      <Navigation />

      {/* Hero Section - Ultra Modern */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary-rgb),0.15),transparent_50%)]" />

        {/* Floating stat badges */}
        <div className="absolute top-40 left-10 animate-float">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-purple-600/20 border border-primary/30 backdrop-blur-xl shadow-lg">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-bold text-foreground">8 Safety Checks</span>
          </div>
        </div>

        <div className="absolute top-60 right-16 animate-float" style={{animationDelay: '1s'}}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 backdrop-blur-xl shadow-lg">
            <Zap className="h-4 w-4 text-green-500" />
            <span className="text-sm font-bold text-foreground">200ms Response</span>
          </div>
        </div>

        <div className="absolute bottom-40 left-20 animate-float" style={{animationDelay: '2s'}}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600/20 to-primary/20 border border-indigo-500/30 backdrop-blur-xl shadow-lg">
            <CheckCircle2 className="h-4 w-4 text-indigo-500" />
            <span className="text-sm font-bold text-foreground">99.9% Uptime</span>
          </div>
        </div>

        <div className="container mx-auto px-6 relative">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 via-purple-500/10 to-indigo-500/10 border border-primary/30 backdrop-blur-xl mb-8 shadow-lg">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-bold bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent">Governed AI Engine</span>
            </div>

            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-foreground mb-8 tracking-tight leading-tight">
              Turn conversations into
              <span className="block bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent mt-2">
                safe, auditable actions
              </span>
            </h1>

            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
              Every request flows through <span className="text-foreground font-bold">8 governed steps</span>—from guardrails to execution—in milliseconds. No guesswork. No risk. Just results.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center mb-16">
              <RouteButton
                href="/contact-sales"
                variant="default"
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-primary via-purple-600 to-indigo-600 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500 px-8 py-6 text-lg"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Play className="h-5 w-5" />
                  Book Technical Demo
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </RouteButton>

              <RouteButton
                href="#stepper"
                variant="outline"
                size="lg"
                className="group px-8 py-6 text-lg border-2 hover:bg-primary/5"
              >
                <span className="flex items-center gap-3">
                  <ChevronDown className="h-5 w-5 group-hover:translate-y-1 transition-transform duration-300" />
                  See How It Works
                </span>
              </RouteButton>
            </div>

            {/* Key stats row */}
            <div className="flex flex-wrap items-center justify-center gap-8 mb-16 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCheck className="h-4 w-4 text-green-500" />
                <span>SOC 2 Type II</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span>OWASP Compliant</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-500" />
                <span>NIST AI RMF</span>
              </div>
            </div>
          </div>

          {/* Enhanced flow diagram with better visual design */}
          <div className="mt-20 max-w-6xl mx-auto">
            <div className="relative rounded-[32px] border border-border/50 bg-gradient-to-br from-card/80 via-background/50 to-card/80 backdrop-blur-2xl p-12 overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.15),transparent_70%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.1),transparent_60%)]" />

              <div className="relative grid grid-cols-1 md:grid-cols-7 gap-6 items-center">
                {/* Customer Request */}
                <div className="flex flex-col items-center gap-3 group">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 shadow-2xl ring-4 ring-blue-600/20">
                      <MessageSquare className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-foreground">Customer</span>
                  <span className="text-xs text-muted-foreground">"Refund my order"</span>
                </div>

                {/* Arrow */}
                <div className="flex items-center justify-center">
                  <div className="flex flex-col items-center gap-1">
                    <ArrowRight className="h-6 w-6 text-primary animate-pulse" />
                    <span className="text-[10px] text-muted-foreground font-mono">INPUT</span>
                  </div>
                </div>

                {/* Guardrails */}
                <div className="flex flex-col items-center gap-3 group">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-orange-600 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-orange-600 shadow-2xl ring-4 ring-red-600/20">
                      <Shield className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-foreground">Guardrails</span>
                  <span className="text-xs text-muted-foreground">Safety checks</span>
                </div>

                {/* Arrow */}
                <div className="flex items-center justify-center">
                  <div className="flex flex-col items-center gap-1">
                    <ArrowRight className="h-6 w-6 text-purple-500 animate-pulse" style={{animationDelay: '0.5s'}} />
                    <span className="text-[10px] text-muted-foreground font-mono">PROCESS</span>
                  </div>
                </div>

                {/* AI Engine */}
                <div className="flex flex-col items-center gap-3 group">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-600 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-purple-600 shadow-2xl ring-4 ring-primary/20">
                      <Brain className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-foreground">AI Engine</span>
                  <span className="text-xs text-muted-foreground">Plan & Execute</span>
                </div>

                {/* Arrow */}
                <div className="flex items-center justify-center">
                  <div className="flex flex-col items-center gap-1">
                    <ArrowRight className="h-6 w-6 text-green-500 animate-pulse" style={{animationDelay: '1s'}} />
                    <span className="text-[10px] text-muted-foreground font-mono">OUTPUT</span>
                  </div>
                </div>

                {/* Action Receipt */}
                <div className="flex flex-col items-center gap-3 group">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-emerald-600 shadow-2xl ring-4 ring-green-600/20">
                      <CheckCheck className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-foreground">Receipt</span>
                  <span className="text-xs text-muted-foreground">Auditable log</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8-Step Interactive Stepper - Ultra Modern */}
      <section id="stepper" ref={stepperRef} className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-20">
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
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Our 8-step pipeline transforms unstructured requests into <span className="font-bold text-foreground">safe, auditable actions</span>.
              Click any step to see the security checks in action.
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[1fr,520px] gap-12">
              {/* Left: Vertical Stepper with Progress Line */}
              <div className="relative">
                {/* Vertical progress line */}
                <div className="absolute left-7 top-10 bottom-10 w-0.5 bg-gradient-to-b from-primary/30 via-primary/10 to-transparent hidden lg:block" />

                <div className="space-y-5">
                  {steps.map((step, index) => {
                    const isExpanded = expandedStep === step.id;
                    return (
                      <button
                        key={step.id}
                        type="button"
                        onClick={() => setExpandedStep(step.id)}
                        className="w-full text-left transition-all duration-500 group relative"
                        aria-expanded={String(isExpanded)}
                        aria-label={`${step.title} - Click to ${isExpanded ? 'collapse' : 'expand'}`}
                      >
                        {/* Step number circle on progress line */}
                        <div className={`absolute left-7 top-7 -translate-x-1/2 z-10 hidden lg:flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-br ${step.color} shadow-xl ring-4 ring-background transition-all duration-500 ${
                          isExpanded ? 'scale-125 ring-8' : 'scale-100 group-hover:scale-110'
                        }`}>
                          <span className="text-xs font-black text-white">{index + 1}</span>
                        </div>

                        <div className={`relative rounded-2xl border transition-all duration-500 lg:ml-16 ${
                          isExpanded
                            ? 'border-primary/50 bg-gradient-to-br from-card via-background to-card shadow-2xl shadow-primary/20 scale-[1.02]'
                            : 'border-border/40 bg-card/30 backdrop-blur-sm hover:border-primary/30 hover:shadow-xl hover:scale-[1.01]'
                        }`}>
                          {/* Animated glow effect */}
                          <div className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${step.color} opacity-0 blur-xl transition-all duration-500 ${
                            isExpanded ? 'opacity-20' : 'group-hover:opacity-10'
                          }`} />

                          {/* Content */}
                          <div className="relative p-6">
                            <div className="flex items-start gap-5">
                              {/* Icon */}
                              <div className={`relative flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} shadow-xl transition-all duration-500 ${
                                isExpanded ? 'scale-110 rotate-3' : 'scale-100 rotate-0 group-hover:scale-105'
                              }`}>
                                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${step.color} blur-lg opacity-0 transition-opacity duration-500 ${
                                  isExpanded ? 'opacity-60' : 'group-hover:opacity-40'
                                }`} />
                                <step.icon className="relative h-7 w-7 text-white" />
                              </div>

                              {/* Text content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-4 mb-2">
                                  <div>
                                    <div className="flex items-center gap-3 mb-1">
                                      <h3 className="text-xl font-black text-foreground">{step.title}</h3>
                                      {/* Mobile step number */}
                                      <span className="lg:hidden inline-flex items-center justify-center h-6 w-6 rounded-full bg-gradient-to-br from-primary to-purple-600 text-[10px] font-black text-white">
                                        {index + 1}
                                      </span>
                                    </div>
                                    <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                                      isExpanded ? 'text-foreground' : 'text-muted-foreground'
                                    }`}>{step.description}</p>
                                  </div>
                                  {isExpanded && (
                                    <CheckCircle2 className="h-6 w-6 text-primary animate-in fade-in zoom-in duration-300 flex-shrink-0" />
                                  )}
                                </div>

                                {/* Expanded content */}
                                {isExpanded && (
                                  <div className="animate-in slide-in-from-top-4 fade-in duration-500 space-y-4 mt-5 pt-5 border-t border-border/30">
                                    {/* Why this matters */}
                                    <div className="relative p-4 rounded-xl bg-gradient-to-br from-primary/5 to-purple-600/5 border border-primary/20 overflow-hidden">
                                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl" />
                                      <p className="relative text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                                        <AlertCircle className="h-4 w-4 text-primary" />
                                        Why this matters
                                      </p>
                                      <p className="relative text-sm text-muted-foreground leading-relaxed">{step.why}</p>
                                    </div>

                                    {/* Source badge */}
                                    <div className="flex items-center gap-3">
                                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-card to-card/50 border border-border/50 text-xs font-mono font-bold text-foreground shadow-sm">
                                        <span className="text-primary">◆</span>
                                        Source: {step.source}
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right: Live Console - Enhanced */}
              <div className="sticky top-24 h-fit">
                <div className="relative rounded-2xl border border-primary/30 bg-gradient-to-br from-zinc-950 to-zinc-900 shadow-2xl overflow-hidden">
                  {/* Glow effect */}
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/20 to-purple-600/20 opacity-50 blur-xl" />

                  <div className="relative">
                    {/* Console header */}
                    <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-primary/20 via-purple-600/20 to-primary/20 border-b border-primary/30 backdrop-blur-xl">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                          <div className="h-3 w-3 rounded-full bg-red-500/80 shadow-sm" />
                          <div className="h-3 w-3 rounded-full bg-yellow-500/80 shadow-sm" />
                          <div className="h-3 w-3 rounded-full bg-green-500/80 shadow-sm" />
                        </div>
                        <span className="text-sm font-mono font-black text-foreground tracking-wide">LIVE CONSOLE</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                        </div>
                        <span className="text-xs text-green-400 font-mono font-bold">ACTIVE</span>
                      </div>
                    </div>

                    {/* Console body */}
                    <div className="relative p-6 font-mono text-sm min-h-[400px]">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50" />
                      <pre className="relative text-green-400/90 leading-relaxed overflow-x-auto whitespace-pre-wrap break-all">
                        {steps[activeConsoleStep].console}
                      </pre>
                    </div>

                    {/* Console footer */}
                    <div className="px-6 py-4 border-t border-zinc-800 bg-black/40">
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-zinc-400 font-mono">
                          Step <span className="text-primary font-bold">{activeConsoleStep + 1}</span> of {steps.length}
                        </div>
                        <div className="text-xs text-zinc-500 font-mono">
                          {steps[activeConsoleStep].title}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
              {/* Approvals - Enhanced */}
              <div className="group relative rounded-2xl border border-border/50 bg-gradient-to-br from-card/50 via-background/30 to-card/50 backdrop-blur-sm p-10 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:scale-[1.02]">
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
              </div>

              {/* Simulation Mode - Enhanced */}
              <div className="group relative rounded-2xl border border-border/50 bg-gradient-to-br from-card/50 via-background/30 to-card/50 backdrop-blur-sm p-10 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:scale-[1.02]">
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
              </div>

              {/* Policy Packs - Enhanced */}
              <div className="group relative rounded-2xl border border-border/50 bg-gradient-to-br from-card/50 via-background/30 to-card/50 backdrop-blur-sm p-10 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 hover:scale-[1.02]">
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
              </div>

              {/* Observability - Enhanced */}
              <div className="group relative rounded-2xl border border-border/50 bg-gradient-to-br from-card/50 via-background/30 to-card/50 backdrop-blur-sm p-10 hover:border-green-500/50 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 hover:scale-[1.02]">
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
              </div>
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
