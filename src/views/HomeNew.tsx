'use client';

import { useEffect, useRef, lazy, Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { prefersReducedMotion, getLiquidEtherResolution, getDeviceType } from "@/lib/deviceDetection";
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Users,
  Zap,
  BarChart3,
  Bot,
  MessageSquare,
  Sparkles,
  ShoppingCart,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import RouteButton from "@/components/RouteButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { homepageFaqs } from "@/data/homepageFaqData";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import VideoEmbed from "@/components/VideoEmbed";
import PlatformOverview from "@/components/PlatformOverview";
import type { CardData } from "@/components/MagicBento";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import InteractiveHowItWorks from "@/components/InteractiveHowItWorks";
import RoiCalculator from "@/components/RoiCalculator";

const MagicBento = lazy(() => import("@/components/MagicBento"));
import antlerLogo from "@/assets/antler-logo.png";
import inboxScreenshot from "@/assets/pullse-inbox-screenshot.png";
import workflowScreenshot from "@/assets/workflow-automation-screenshot.png";
import aiCopilotScreenshot from "@/assets/ai-copilot-screenshot.png";
import analyticsScreenshot from "@/assets/analytics-screenshot.png";
import AIChatbotPreview from "@/components/AIChatbotPreview";
import AIToolsPreview from "@/components/AIToolsPreview";
import AutoQAPreview from "@/components/AutoQAPreview";

const LiquidEther = lazy(() => import("@/components/LiquidEther"));

let gsap: any = null;

const loadGSAP = async () => {
  if (!gsap) {
    const module = await import("gsap");
    gsap = module.default;
  }
  return { gsap };
};

const heroStats = [
  { label: "Handled with AI", value: "80%", caption: "Intent coverage" },
  { label: "Response time", value: "-43%", caption: "Avg. reduction" },
  { label: "Time to launch", value: "<14 days", caption: "First automations" },
];


const problemPoints = [
  {
    title: "Channels live in silos",
    description: "Email, chat, and voice tools don’t share context, leaving agents to copy-paste between tabs.",
    icon: MessageSquare,
  },
  {
    title: "AI experiments lack guardrails",
    description: "Standalone bots can’t talk to your systems or enforce approvals, so teams stall after pilot.",
    icon: Shield,
  },
  {
    title: "Leaders can’t show ROI",
    description: "Without shared workflows and metrics, it’s hard to prove the value of automation to finance.",
    icon: BarChart3,
  },
];


const useCaseTabs = [
  {
    value: 'ecommerce',
    label: 'E-commerce & Retail',
    icon: ShoppingCart,
    headline: 'Answer order questions instantly',
    summary: 'Resolve "Where is my order?" and return requests in seconds. Pull real-time data from Shopify, inventory systems, and shipping providers—no agent lookup required.',
    bullets: [
      'Automated WISMO with live tracking updates',
      'Self-service returns and exchanges',
      'Loyalty balance and points inquiries',
      'Product recommendations in brand voice'
    ],
    gradient: 'from-green-500/20 to-emerald-500/20',
    primaryColor: 'rgb(34, 197, 94)', // green-500
    accentColor: 'rgb(16, 185, 129)', // emerald-500
    cssVars: {
      bg: 'from-green-500/6 via-emerald-500/3',
      border: 'border-green-500/40',
      text: 'text-green-500',
      bgLight: 'bg-green-500/10',
      bgHover: 'hover:bg-green-500/5',
      borderHover: 'hover:border-green-500/40',
      shadow: 'shadow-green-500/10'
    },
    stat: { label: 'WISMO Reduction', value: '80%', description: 'fewer order status inquiries' },
  },
  {
    value: 'fintech',
    label: 'Fintech',
    icon: Shield,
    headline: 'Respond to financial risks instantly',
    summary: 'Handle account changes, billing disputes, and fraud alerts with orchestrated workflows that include approval gates, audit trails, and role-based permissions by default.',
    bullets: [
      'Real-time fraud alert orchestration',
      'Automated KYC verification workflows',
      'Dispute resolution with full audit logs',
      'Compliance-ready documentation export'
    ],
    gradient: 'from-red-500/20 to-orange-500/20',
    primaryColor: 'rgb(239, 68, 68)', // red-500
    accentColor: 'rgb(249, 115, 22)', // orange-500
    cssVars: {
      bg: 'from-red-500/6 via-orange-500/3',
      border: 'border-red-500/40',
      text: 'text-red-500',
      bgLight: 'bg-red-500/10',
      bgHover: 'hover:bg-red-500/5',
      borderHover: 'hover:border-red-500/40',
      shadow: 'shadow-red-500/10'
    },
    stat: { label: 'Risk Response', value: '<8s', description: 'average risk response time' },
  },
  {
    value: 'saas',
    label: 'SaaS',
    icon: Building2,
    headline: 'Turn trial users into paying customers',
    summary: 'Guide users through onboarding, troubleshoot technical issues, and proactively prevent churn with AI that understands your product and connects to your entire stack.',
    bullets: [
      'Onboarding assistance with product guidance',
      'Technical troubleshooting with Jira integration',
      'Usage-based proactive outreach',
      'Trial-to-paid conversion workflows'
    ],
    gradient: 'from-blue-500/20 to-cyan-500/20',
    primaryColor: 'rgb(59, 130, 246)', // blue-500
    accentColor: 'rgb(6, 182, 212)', // cyan-500
    cssVars: {
      bg: 'from-blue-500/6 via-cyan-500/3',
      border: 'border-blue-500/40',
      text: 'text-blue-500',
      bgLight: 'bg-blue-500/10',
      bgHover: 'hover:bg-blue-500/5',
      borderHover: 'hover:border-blue-500/40',
      shadow: 'shadow-blue-500/10'
    },
    stat: { label: 'Churn Reduction', value: '28%', description: 'lower customer churn rate' },
  },
];

const connectorHighlights = [
  { name: 'Shopify', status: 'live', description: 'Look up orders, process refunds, check inventory in real-time' },
  { name: 'Stripe', status: 'live', description: 'Issue refunds, manage subscriptions, check payment status' },
  { name: 'Slack', status: 'live', description: 'Route urgent escalations, request approvals, notify teams' },
  { name: 'Salesforce', status: 'live', description: 'Pull customer context, update records, create follow-up tasks' },
  { name: 'HubSpot', status: 'live', description: 'Sync contact data, track interactions, update deal stages' },
  { name: 'REST API', status: 'live', description: 'Build custom actions for any internal or external system' },
];






const resources = [
  {
    title: "Manifesto",
    description: "Why we're building Pullse and our vision for AI-powered support.",
    href: "/blog/the-era-of-tool-sprawl-is-ending-here-s-what-comes-next",
    badge: "Read",
  },
];

const taxonomy: CardData[] = [
  {
    title: "Unified Inbox",
    description: "One place for email & chat with SLAs, assignments, and full context.",
    label: "Communication",
    color: "hsl(var(--background))",
    icon: MessageSquare,
    image: inboxScreenshot.src,
  },
  {
    title: "Workflow Automation",
    description: "Visual routing, tagging, SLAs, escalations.",
    label: "Automation",
    color: "hsl(var(--background))",
    icon: Zap,
    image: workflowScreenshot.src,
  },
  {
    title: "AI Chatbots",
    description: "Answer questions AND take lightweight actions—refunds, lookups, updates—autonomously.",
    label: "AI Agent",
    color: "hsl(var(--background))",
    icon: Bot,
    customComponent: <AIChatbotPreview />,
  },
  {
    title: "AI Copilots",
    description: "Execute actions across your stack—refunds, updates, changes—right from the conversation.",
    label: "Action Engine",
    color: "hsl(var(--background))",
    icon: Sparkles,
    image: aiCopilotScreenshot.src,
  },
  {
    title: "AI Tools",
    description: "Refunds, plan changes, order status—with guardrails & audit trails.",
    label: "Actions",
    color: "hsl(var(--background))",
    icon: Users,
    customComponent: <AIToolsPreview />,
  },
  {
    title: "Auto-QA",
    description: "Score 100% of conversations for accuracy, empathy, policy.",
    label: "Quality",
    color: "hsl(var(--background))",
    icon: CheckCircle2,
    customComponent: <AutoQAPreview />,
  },
  {
    title: "Analytics",
    description: "Coverage by intent, actioned vs. deflected, FCR, AHT in one view.",
    label: "Insights",
    color: "hsl(var(--background))",
    icon: BarChart3,
    image: analyticsScreenshot.src,
  },
];

const HomeNew = () => {  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const [activeIndustry, setActiveIndustry] = useState('ecommerce');
  const activeTab = useCaseTabs.find(tab => tab.value === activeIndustry) || useCaseTabs[0];

  // Device and performance detection
  const [shouldShowLiquidEther, setShouldShowLiquidEther] = useState(false);
  const [liquidEtherResolution, setLiquidEtherResolution] = useState(0.55);

  // Detect device capabilities and motion preferences on client-side
  useEffect(() => {
    const hasReducedMotion = prefersReducedMotion();
    const { isDesktop } = getDeviceType();
    const adaptiveResolution = getLiquidEtherResolution();

    // Only show on desktop without reduced motion preference
    setShouldShowLiquidEther(isDesktop && !hasReducedMotion);
    setLiquidEtherResolution(adaptiveResolution);
  }, []);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    let isMounted = true;

    const init = async () => {
      const { gsap } = await loadGSAP();
      if (!isMounted) return;

      ctx = gsap.context(() => {
        if (titleRef.current) {
          gsap.from(titleRef.current.querySelectorAll<HTMLElement>(".word"), {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.08,
            ease: "power3.out",
          });
        }
        if (descRef.current) {
          gsap.from(descRef.current, {
            y: 30,
            opacity: 0,
            delay: 0.3,
            duration: 1,
            ease: "power3.out",
          });
        }
        if (buttonsRef.current) {
          gsap.from(buttonsRef.current.children, {
            scale: 0.9,
            opacity: 0,
            delay: 0.6,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)",
          });
        }
      }, heroRef);
    };

    init();

    return () => {
      isMounted = false;
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen">
      <PageLiquidBackground opacity={0.3} />
      <Navigation />

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[60vh] md:min-h-[80vh] lg:min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-background -z-20" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] -z-20" />

        {/* LiquidEther - Conditionally rendered on desktop without reduced motion */}
        {shouldShowLiquidEther && (
          <div className="absolute inset-0 -z-10 opacity-55">
            <Suspense fallback={
              <div className="w-full h-full bg-gradient-to-br from-[#FF00C8]/8 via-[#A805FF]/4 to-[#D3A9EA]/8 animate-pulse" />
            }>
              <LiquidEther
                colors={["#FF00C8", "#A805FF", "#D3A9EA"]}
                mouseForce={20}
                cursorSize={110}
                isViscous={false}
                resolution={liquidEtherResolution}
                autoDemo
                autoSpeed={0.35}
                autoIntensity={1.6}
              />
            </Suspense>
          </div>
        )}

        <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
          <div className="grid gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6 sm:space-y-8">
              <h1 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-tight text-foreground">
                <span className="word inline-block">AI</span>{" "}
                <span className="word inline-block">support</span>{" "}
                <span className="word inline-block">that</span>{" "}
                <span className="word inline-block">feels</span>{" "}
                <span className="word inline-block">human,</span>{" "}
                <span className="word inline-block">not</span>{" "}
                <span className="word inline-block">handed</span>{" "}
                <span className="word inline-block">off</span>
              </h1>

              <p ref={descRef} className="max-w-2xl text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                Pullse unifies channels, workflows, automations, and action-execution copilots so teams resolve complex intents in minutes. Execute actions across your entire stack without context switching.
              </p>

              <div ref={buttonsRef} className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="px-6 py-6 text-base min-h-[44px]" asChild>
                  <Link href="/contact-sales">
                    Book a demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              <div className="grid gap-3 sm:gap-4 sm:grid-cols-3">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-border/60 bg-background/60 p-3 sm:p-4 backdrop-blur-sm md:backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{stat.label}</p>
                    <p className="mt-2 text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.caption}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 bg-primary/20 blur-3xl -z-10" />
              <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-background/70 via-background/90 to-background/70 p-1 shadow-2xl">
                <div className="rounded-[2.3rem] overflow-hidden">
                  <VideoEmbed videoId="NItSkrvcS04" title="Pullse product intro" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & problem framing */}
      <section className="relative bg-background py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/2 to-background" />

        <div className="container relative mx-auto px-4">
          <div className="grid gap-10 sm:gap-12 md:gap-14 lg:gap-16 lg:grid-cols-[1.3fr,1fr] items-start">
            {/* Left: Trust & Backing */}
            <div className="space-y-6 sm:space-y-8">
              {/* Punchier headline */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
                One platform. Zero silos. Total control.
              </h2>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Stop stitching together disconnected tools. Pullse unifies channels, workflows, AI agents, and analytics—with security and compliance built in from day one.
              </p>

              {/* Enhanced trust signals with icons */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-gradient-to-r from-background to-muted/20 p-3 sm:p-4 transition-all hover:border-primary/30 hover:shadow-md">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">SOC 2 Type II</div>
                    <div className="text-xs text-muted-foreground">In progress</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-gradient-to-r from-background to-muted/20 p-3 sm:p-4 transition-all hover:border-primary/30 hover:shadow-md">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">Founder-Led Support</div>
                    <div className="text-xs text-muted-foreground">Direct access</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-gradient-to-r from-background to-muted/20 p-3 sm:p-4 transition-all hover:border-primary/30 hover:shadow-md">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">AI Guardrails</div>
                    <div className="text-xs text-muted-foreground">Audit trails included</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-gradient-to-r from-background to-muted/20 p-3 sm:p-4 transition-all hover:border-primary/30 hover:shadow-md">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">Backed by Antler</div>
                    <div className="text-xs text-muted-foreground">+ Microsoft & Google</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Problem points with gradient accents */}
            <div className="space-y-4">
              <div className="mb-4 sm:mb-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Why Teams Switch to Pullse
                </h3>
              </div>
              {problemPoints.map((point, index) => {
                const gradients = [
                  'from-blue-500/10 to-cyan-500/10',
                  'from-purple-500/10 to-pink-500/10',
                  'from-orange-500/10 to-amber-500/10'
                ];
                return (
                  <div
                    key={point.title}
                    className="group relative overflow-hidden rounded-[20px] border border-border/60 bg-card p-5 sm:p-6 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md md:hover:-translate-y-1 md:hover:shadow-lg"
                  >
                    {/* Gradient background on hover - only on desktop */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index]} opacity-0 transition-opacity duration-300 md:group-hover:opacity-100`} />

                    <div className="relative">
                      <div className="flex items-start gap-3 sm:gap-4 mb-3">
                        <div className={`flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradients[index]} border border-primary/20 transition-all duration-300 md:group-hover:scale-110 md:group-hover:shadow-lg`}>
                          <point.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base font-bold text-foreground mb-2 leading-tight md:group-hover:text-primary transition-colors">
                            {point.title}
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {point.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom accent line - only on desktop hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 md:group-hover:opacity-100" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Platform taxonomy */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/3 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.04),transparent_60%)]" />

        <div className="container relative mx-auto px-4">
          <div className="mx-auto mb-12 sm:mb-16 md:mb-20 max-w-4xl text-center space-y-4 sm:space-y-6">
            {/* Stronger headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight px-4">
              Seven products. One platform. Zero integration headaches.
            </h2>

            {/* Better value prop */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
              From unified inbox to AI agents to real-time analytics—everything your team needs to deliver world-class support is built in, battle-tested, and ready to deploy.
            </p>

            {/* Social proof stat */}
            <div className="inline-flex items-center gap-3 sm:gap-4 md:gap-6 rounded-2xl border border-border/50 bg-card px-4 sm:px-6 md:px-8 py-3 sm:py-4 shadow-lg flex-wrap justify-center">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary">7</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Products</div>
              </div>
              <div className="h-8 w-px bg-border/60" />
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary">1</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Login</div>
              </div>
              <div className="h-8 w-px bg-border/60" />
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary">0</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Integrations</div>
              </div>
            </div>
          </div>

          <Suspense fallback={
            <div className="min-h-[400px] bg-gradient-to-b from-background via-primary/3 to-background rounded-2xl border border-border/50">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 p-4">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-32 rounded-xl bg-gradient-to-br from-muted/50 to-muted/30 animate-pulse"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            </div>
          }>
            <MagicBento cardData={taxonomy} />
          </Suspense>
        </div>
      </section>

      <PlatformOverview />
      <InteractiveHowItWorks />

      {/* Redesigned Use cases section - Card Grid Layout */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 transition-colors duration-700">
        {/* Enhanced background - dynamically colored */}
        <div
          className="absolute inset-0 bg-gradient-to-br to-background transition-all duration-700"
          style={{
            backgroundImage: `linear-gradient(to bottom right, ${activeTab.primaryColor}0F, transparent)`
          }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            background: `radial-gradient(ellipse at top right, ${activeTab.primaryColor}14, transparent 60%)`
          }}
        />

        <div className="container relative mx-auto px-4">
          {/* Enhanced header */}
          <div className="mx-auto mb-10 sm:mb-12 md:mb-16 max-w-3xl text-center space-y-4 sm:space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Purpose-built for your vertical
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              Proven automation patterns and compliance frameworks ready to deploy—no guesswork required
            </p>
          </div>

          {/* Horizontal Tab Pills */}
          <Tabs defaultValue="ecommerce" onValueChange={(value) => setActiveIndustry(value)} className="mx-auto w-full max-w-6xl">
            <TabsList className="!h-auto !inline-flex w-full justify-center gap-2 sm:gap-3 rounded-2xl border border-border/60 bg-card/90 p-1.5 sm:p-2 shadow-lg mb-8 sm:mb-10 md:mb-12 backdrop-blur-sm flex-wrap">
              {useCaseTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeIndustry === tab.value;
                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="flex items-center gap-1.5 sm:gap-2 rounded-xl px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold transition-all data-[state=active]:text-background data-[state=active]:shadow-lg min-h-[44px]"
                    style={isActive ? {
                      backgroundColor: tab.primaryColor
                    } : {}}
                  >
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="whitespace-nowrap">{tab.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {/* Card-based content */}
            {useCaseTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsContent
                  key={tab.value}
                  value={tab.value}
                  className="space-y-6 sm:space-y-8 data-[state=active]:animate-in data-[state=active]:fade-in-50"
                >
                  {/* Featured card with stat */}
                  <div
                    className="relative overflow-hidden rounded-[24px] border-l-4 bg-card p-4 sm:p-6 md:p-8 lg:p-10 shadow-xl transition-all md:hover:shadow-2xl"
                    style={{ borderLeftColor: tab.primaryColor }}
                  >
                    <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1fr,1.3fr] items-start">
                      <div className="space-y-4 sm:space-y-5 md:space-y-6">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div
                            className={`flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${tab.gradient} border shadow-lg`}
                            style={{ borderColor: `${tab.primaryColor}4D` }}
                          >
                            <Icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" style={{ color: tab.primaryColor }} />
                          </div>
                          <div>
                            <div
                              className="text-xs font-bold uppercase tracking-wider mb-1"
                              style={{ color: tab.primaryColor }}
                            >
                              {tab.label}
                            </div>
                            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
                              {tab.headline}
                            </h3>
                          </div>
                        </div>

                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          {tab.summary}
                        </p>

                        {/* Industry stat callout */}
                        <div
                          className="rounded-2xl border p-3 sm:p-4 md:p-5"
                          style={{
                            borderColor: `${tab.primaryColor}4D`,
                            background: `linear-gradient(to bottom right, ${tab.primaryColor}1A, ${tab.primaryColor}0D)`
                          }}
                        >
                          <div className="flex items-end gap-2 sm:gap-3 mb-2">
                            <div className="text-3xl sm:text-4xl font-bold" style={{ color: tab.primaryColor }}>{tab.stat.value}</div>
                            <div className="pb-1 text-xs sm:text-sm font-semibold text-foreground">{tab.stat.label}</div>
                          </div>
                          <div className="text-xs text-muted-foreground">{tab.stat.description}</div>
                        </div>

                        <Button
                          size="lg"
                          className="w-full sm:w-auto text-background shadow-lg hover:opacity-90 transition-opacity min-h-[44px]"
                          style={{ backgroundColor: tab.primaryColor }}
                          asChild
                        >
                          <Link href="/contact-sales">
                            See it in action
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>

                      {/* Feature bullets in right column */}
                      <ul className="space-y-2.5 sm:space-y-3">
                        {tab.bullets.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 sm:gap-3 rounded-xl border border-border/50 bg-gradient-to-r from-background/80 to-background/60 p-3 sm:p-4 md:p-5 backdrop-blur-sm transition-all md:hover:shadow-md group"
                            style={{
                              '--hover-border': `${tab.primaryColor}66`,
                              '--hover-bg': `${tab.primaryColor}0D`
                            } as React.CSSProperties}
                            onMouseEnter={(e) => {
                              if (window.matchMedia('(hover: hover)').matches) {
                                e.currentTarget.style.borderColor = `${tab.primaryColor}66`;
                                e.currentTarget.style.backgroundColor = `${tab.primaryColor}0D`;
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (window.matchMedia('(hover: hover)').matches) {
                                e.currentTarget.style.borderColor = 'hsl(var(--border) / 0.5)';
                                e.currentTarget.style.backgroundColor = 'transparent';
                              }
                            }}
                          >
                            <div
                              className="flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full border mt-0.5"
                              style={{
                                backgroundColor: `${tab.primaryColor}33`,
                                borderColor: `${tab.primaryColor}4D`
                              }}
                            >
                              <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" style={{ color: tab.primaryColor }} />
                            </div>
                            <span className="text-xs sm:text-sm font-semibold text-foreground leading-relaxed">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Three supporting feature cards */}
                  <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    <div
                      className="group rounded-2xl border border-border/60 bg-card p-4 sm:p-5 md:p-6 shadow-sm transition-all md:hover:shadow-lg md:hover:-translate-y-1"
                      onMouseEnter={(e) => {
                        if (window.matchMedia('(hover: hover)').matches) {
                          e.currentTarget.style.borderColor = `${tab.primaryColor}66`;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (window.matchMedia('(hover: hover)').matches) {
                          e.currentTarget.style.borderColor = 'hsl(var(--border) / 0.6)';
                        }
                      }}
                    >
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
                        <div
                          className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 items-center justify-center rounded-lg border transition-all md:group-hover:scale-110"
                          style={{
                            backgroundColor: `${tab.primaryColor}1A`,
                            borderColor: `${tab.primaryColor}33`
                          }}
                        >
                          <Shield className="h-4.5 w-4.5 sm:h-5 sm:w-5" style={{ color: tab.primaryColor }} />
                        </div>
                        <h4 className="text-sm font-bold text-foreground">Security First</h4>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        SOC 2 controls, encrypted data, role-based access, and full audit trails for every action
                      </p>
                    </div>

                    <div
                      className="group rounded-2xl border border-border/60 bg-card p-4 sm:p-5 md:p-6 shadow-sm transition-all md:hover:shadow-lg md:hover:-translate-y-1"
                      onMouseEnter={(e) => {
                        if (window.matchMedia('(hover: hover)').matches) {
                          e.currentTarget.style.borderColor = `${tab.primaryColor}66`;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (window.matchMedia('(hover: hover)').matches) {
                          e.currentTarget.style.borderColor = 'hsl(var(--border) / 0.6)';
                        }
                      }}
                    >
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
                        <div
                          className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 items-center justify-center rounded-lg border transition-all md:group-hover:scale-110"
                          style={{
                            backgroundColor: `${tab.primaryColor}1A`,
                            borderColor: `${tab.primaryColor}33`
                          }}
                        >
                          <Zap className="h-4.5 w-4.5 sm:h-5 sm:w-5" style={{ color: tab.primaryColor }} />
                        </div>
                        <h4 className="text-sm font-bold text-foreground">Rapid Deployment</h4>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        2-4 week implementation with dedicated founder support and industry-specific playbooks
                      </p>
                    </div>

                    <div
                      className="group rounded-2xl border border-border/60 bg-card p-4 sm:p-5 md:p-6 shadow-sm transition-all md:hover:shadow-lg md:hover:-translate-y-1"
                      onMouseEnter={(e) => {
                        if (window.matchMedia('(hover: hover)').matches) {
                          e.currentTarget.style.borderColor = `${tab.primaryColor}66`;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (window.matchMedia('(hover: hover)').matches) {
                          e.currentTarget.style.borderColor = 'hsl(var(--border) / 0.6)';
                        }
                      }}
                    >
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
                        <div
                          className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 items-center justify-center rounded-lg border transition-all md:group-hover:scale-110"
                          style={{
                            backgroundColor: `${tab.primaryColor}1A`,
                            borderColor: `${tab.primaryColor}33`
                          }}
                        >
                          <BarChart3 className="h-4.5 w-4.5 sm:h-5 sm:w-5" style={{ color: tab.primaryColor }} />
                        </div>
                        <h4 className="text-sm font-bold text-foreground">Measurable Impact</h4>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Real-time dashboards showing automation rates, cost savings, and ROI metrics leadership trusts
                      </p>
                    </div>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </section>

      {/* Enhanced ROI Section */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/3 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.04),transparent_70%)]" />

        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            {/* Header with social proof */}
            <div className="text-center mb-10 sm:mb-12 space-y-4 sm:space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
                See your potential savings
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Industry benchmarks show 60-75% cost reduction potential with AI automation. Calculate your team's potential impact.
              </p>
            </div>

            {/* Calculator Card with enhanced styling */}
            <div className="relative overflow-hidden rounded-[28px] border border-primary/30 bg-gradient-to-br from-card via-card to-card/90 p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl backdrop-blur-sm">
              {/* Decorative gradient */}
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />

              <div className="relative">
                <RoiCalculator />
              </div>
            </div>

            {/* Enhanced CTA with trust indicators */}
            <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 grid-cols-1 md:grid-cols-2">
              <div className="rounded-2xl border border-border/50 bg-card p-5 sm:p-6 shadow-md transition-all md:hover:shadow-lg md:hover:-translate-y-1">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                    <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm sm:text-base font-bold text-foreground mb-2">
                      Get Your Custom Analysis
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-4 leading-relaxed">
                      Schedule a session with our team to model your exact costs and automation opportunities
                    </p>
                    <RouteButton href="/contact-sales" className="w-full sm:w-auto min-h-[44px]">
                      Book analysis call
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </RouteButton>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-primary/10 to-primary/5 p-5 sm:p-6 shadow-md">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <CheckCircle2 className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-primary shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-foreground">Target 80% automation rate for your team</span>
                  </div>
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <CheckCircle2 className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-primary shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-foreground">Typical payback period under 6 months</span>
                  </div>
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <CheckCircle2 className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-primary shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-foreground">Real-time dashboards to prove ROI to leadership</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Integrations Section */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-accent-pink/3 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--accent-pink)/0.04),transparent_70%)]" />

        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            {/* Enhanced Header */}
            <div className="text-center mb-12 sm:mb-14 md:mb-16 space-y-4 sm:space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Take action across your entire stack
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                100+ native connectors to execute actions in real-time—refunds, updates, lookups—right from the conversation. Plus full REST API support for unlimited custom workflows. No middleware, no sync delays.
              </p>
            </div>

            {/* Enhanced Grid with detailed cards */}
            <div className="grid gap-4 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8 sm:mb-10">
              {connectorHighlights.map((connector) => {
                const isBeta = connector.status === 'beta';
                const isLive = connector.status === 'live';
                return (
                  <div
                    key={connector.name}
                    className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 sm:p-6 transition-all duration-300 md:hover:border-accent-pink/40 md:hover:shadow-xl md:hover:shadow-accent-pink/10 md:hover:-translate-y-1"
                  >
                    {/* Status badge */}
                    <div className="absolute top-3 right-3">
                      {isBeta && (
                        <div className="px-2.5 py-1 rounded-full bg-accent-pink/20 border border-accent-pink/30 text-accent-pink text-[10px] font-bold uppercase tracking-wider">
                          Beta
                        </div>
                      )}
                      {isLive && (
                        <div className="px-2.5 py-1 rounded-full bg-accent-green/20 border border-accent-green/30 text-accent-green text-[10px] font-bold uppercase tracking-wider">
                          Live
                        </div>
                      )}
                    </div>

                    {/* Connector content */}
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-pink/20 to-accent-pink/10 border border-accent-pink/30 shadow-md transition-all duration-300 md:group-hover:scale-110 md:group-hover:shadow-lg md:group-hover:shadow-accent-pink/20">
                          <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-accent-pink" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm sm:text-base font-bold text-foreground">{connector.name}</div>
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {connector.description}
                      </p>
                    </div>

                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent-pink/50 to-transparent opacity-0 transition-opacity duration-300 md:group-hover:opacity-100" />
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* Optimized Final CTA - Split Layout */}
      <section className="relative overflow-hidden py-16 sm:py-20 md:py-24 lg:py-32">
        {/* Enhanced background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/3 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.04),transparent_70%)]" />

        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            {/* Main CTA Container - Enhanced Split Design */}
            <div className="relative overflow-hidden rounded-[32px] border border-border/60 bg-gradient-to-br from-card via-card to-card/95 shadow-2xl backdrop-blur-sm">
              <div className="grid lg:grid-cols-[1fr,1.3fr] gap-0">
                {/* Left: Stats & Social Proof */}
                <div className="relative overflow-hidden lg:border-r border-b lg:border-b-0 border-border/60 bg-gradient-to-br from-primary/12 via-primary/6 to-transparent p-6 sm:p-8 md:p-10 lg:p-14">
                  {/* Decorative elements - hidden on mobile for performance */}
                  <div className="absolute -top-24 -left-24 h-56 w-56 rounded-full bg-primary/20 blur-3xl hidden md:block" />
                  <div className="absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-primary/15 blur-3xl hidden md:block" />

                  <div className="relative space-y-8 sm:space-y-10">
                    {/* Impact Stats with attribution */}
                    <div className="space-y-6 sm:space-y-8">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground mb-4 sm:mb-5">
                          Expected Results
                        </div>
                        <div className="grid gap-5 sm:gap-6">
                          <div className="group">
                            <div className="flex items-end gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
                              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary">80%</div>
                              <div className="pb-1.5 sm:pb-2 text-xs sm:text-sm font-bold text-foreground">Tickets Automated</div>
                            </div>
                            <div className="h-2 sm:h-2.5 bg-muted/50 rounded-full overflow-hidden mb-2">
                              <div className="h-full bg-gradient-to-r from-primary via-primary to-primary/60 rounded-full w-[80%] transition-all duration-1000" />
                            </div>
                            <div className="text-xs text-muted-foreground">Average automation rate</div>
                          </div>

                          <div className="group">
                            <div className="flex items-end gap-2.5 sm:gap-3 mb-2">
                              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary">60-75%</div>
                              <div className="pb-1.5 sm:pb-2 text-xs sm:text-sm font-bold text-foreground">Cost Reduction</div>
                            </div>
                            <div className="text-xs text-muted-foreground">Total operational savings range</div>
                          </div>

                          <div className="group">
                            <div className="flex items-end gap-2.5 sm:gap-3 mb-2">
                              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary">&lt;6mo</div>
                              <div className="pb-1.5 sm:pb-2 text-xs sm:text-sm font-bold text-foreground">Payback Period</div>
                            </div>
                            <div className="text-xs text-muted-foreground">Typical ROI timeframe</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="pt-6 sm:pt-8 border-t border-border/50">
                      <div className="space-y-2.5 sm:space-y-3">
                        <div className="flex items-center gap-2.5 sm:gap-3 text-xs font-semibold text-foreground">
                          <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-primary/20 shrink-0">
                            <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary" />
                          </div>
                          <span>SOC 2 Type II controls in progress</span>
                        </div>
                        <div className="flex items-center gap-2.5 sm:gap-3 text-xs font-semibold text-foreground">
                          <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-primary/20 shrink-0">
                            <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary" />
                          </div>
                          <span>Data encryption and audit trails</span>
                        </div>
                        <div className="flex items-center gap-2.5 sm:gap-3 text-xs font-semibold text-foreground">
                          <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-primary/20 shrink-0">
                            <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary" />
                          </div>
                          <span>Dedicated implementation support</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: CTA Content */}
                <div className="p-6 sm:p-8 md:p-10 lg:p-16 flex flex-col justify-center">
                  <div className="space-y-6 sm:space-y-8">
                    {/* Headline */}
                    <div className="space-y-4 sm:space-y-5">
                      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1]">
                        Transform your customer support with AI automation
                      </h2>
                      <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                        Join growing companies automating 80% of support tickets with our AI-powered platform. From setup to full automation in just 4 weeks.
                      </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <RouteButton size="lg" className="text-sm sm:text-base px-6 sm:px-8 py-6 sm:py-7 shadow-xl shadow-primary/25 min-h-[44px]" href="/contact-sales">
                        Book a demo
                        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                      </RouteButton>
                    </div>

                    {/* Visual Implementation Timeline */}
                    <div className="pt-6 sm:pt-8 border-t border-border/50">
                      <div className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground mb-5 sm:mb-6">
                        Your Implementation Journey
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                        <div className="relative">
                          <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
                            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-primary/15 border border-primary/30 text-base sm:text-lg font-bold text-primary shrink-0">1</div>
                            <div className="text-lg sm:text-xl font-bold text-primary">Week 1</div>
                          </div>
                          <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            Setup channels and systems
                          </div>
                        </div>
                        <div className="relative">
                          <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
                            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-primary/15 border border-primary/30 text-base sm:text-lg font-bold text-primary shrink-0">2</div>
                            <div className="text-lg sm:text-xl font-bold text-primary">Week 2</div>
                          </div>
                          <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            Design and test automation
                          </div>
                        </div>
                        <div className="relative">
                          <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
                            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-primary/15 border border-primary/30 text-base sm:text-lg font-bold text-primary shrink-0">3</div>
                            <div className="text-lg sm:text-xl font-bold text-primary">Week 3</div>
                          </div>
                          <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            Team training and testing
                          </div>
                        </div>
                        <div className="relative">
                          <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
                            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-primary/15 border border-primary/30 text-base sm:text-lg font-bold text-primary shrink-0">4</div>
                            <div className="text-lg sm:text-xl font-bold text-primary">Week 4</div>
                          </div>
                          <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            Go live
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Resource Links */}
                    <div className="pt-5 sm:pt-6">
                      <div className="max-w-sm">
                        {resources.map((resource) => (
                          <Link
                            key={resource.title}
                            href={resource.href}
                            className="group rounded-xl border border-border/50 bg-muted/30 p-3.5 sm:p-4 transition-all md:hover:border-primary/40 md:hover:bg-primary/5 md:hover:shadow-md flex items-center justify-between min-h-[44px]"
                          >
                            <div className="flex-1">
                              <div className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1">
                                {resource.badge}
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-foreground leading-tight">{resource.title}</span>
                              </div>
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform md:group-hover:translate-x-1 md:group-hover:text-primary shrink-0 ml-3" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          FAQ Section - Answer Engine Optimization
      ======================================== */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to know about Pullse and how it can transform your customer support
              </p>
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-3 md:space-y-4">
              {homepageFaqs.map((faq, index) => (
                <Accordion
                  key={index}
                  type="single"
                  collapsible
                >
                  <AccordionItem
                    value="item-1"
                    className="bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl md:rounded-2xl px-4 md:px-5 lg:px-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-4 md:py-5">
                      <span className="font-semibold text-sm md:text-base text-gray-900 pr-4">
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700 text-xs md:text-sm leading-relaxed pb-4 md:pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>

            {/* CTA at bottom of FAQ */}
            <div className="mt-10 md:mt-12 text-center">
              <p className="text-sm md:text-base text-muted-foreground mb-4">
                Still have questions?
              </p>
              <RouteButton
                size="lg"
                className="text-sm sm:text-base px-6 sm:px-8 py-6 sm:py-7 shadow-xl shadow-primary/25 min-h-[44px]"
                href="/contact-sales"
              >
                Contact our team
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </RouteButton>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomeNew;
