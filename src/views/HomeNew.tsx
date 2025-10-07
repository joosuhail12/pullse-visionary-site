'use client';

import { useEffect, useRef, lazy, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import RouteButton from "@/components/RouteButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import VideoEmbed from "@/components/VideoEmbed";
import PlatformOverview from "@/components/PlatformOverview";
import MagicBento, { CardData } from "@/components/MagicBento";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import WhyFullStackSection from "@/components/WhyFullStackSection";
import RoiCalculator from "@/components/RoiCalculator";
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
  { label: "Handled with AI", value: "68%", caption: "Intent coverage" },
  { label: "Response time", value: "-43%", caption: "Avg. reduction" },
  { label: "Time to launch", value: "<14 days", caption: "First automations" },
];

const trustSignals = [
  "Backed by Antler",
  "Microsoft for Startups",
  "Google for Startups",
  "SOC 2 controls in progress",
  "AI guardrails & audit trails",
  "Founder-led onboarding",
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
    value: 'ops',
    label: 'Support Operations',
    headline: 'Automate triage and back-office updates',
    summary: 'Route intents, update CRM fields, and surface context so agents stay focused on high-touch work.',
    bullets: ['Intent-based routing & SLAs', 'Auto-tagging and CRM updates', 'Agent copilots with policy guardrails'],
  },
  {
    value: 'commerce',
    label: 'Commerce Experience',
    headline: 'Resolve WISMO, returns, and loyalty questions instantly',
    summary: 'Pull order status, policy logic, and loyalty balances directly into the reply.',
    bullets: ['Refunds & exchanges with approval paths', 'Real-time order + inventory lookups', 'Customer updates in brand voice'],
  },
  {
    value: 'fintech',
    label: 'Financial & Ops Workflows',
    headline: 'Blend automation with compliance-ready approvals',
    summary: 'Automate account actions and investigations while keeping audit trails airtight.',
    bullets: ['Role-based guardrails on every workflow', 'Automated disputes & account changes', 'Exportable audit logs and reports'],
  },
];

const roiHighlights = [
  'Co-design automation targets with the founding team',
  'Share dashboards that track coverage, CSAT, and savings',
  'Request connectors via our public roadmap and ship them fast',
];

const connectorHighlights = ['Shopify', 'Stripe', 'Slack', 'Salesforce (beta)', 'Zendesk (beta)', 'REST API'];






const resources = [
  {
    title: "Founder vision letter",
    description: "Why we’re building Pullse and how the early access cohort works.",
    href: "/blog/founder-letter",
    badge: "Read",
  },
  {
    title: "Integration roadmap",
    description: "See upcoming connectors and how to request the systems you rely on.",
    href: "/integrations",
    badge: "Roadmap",
  },
  {
    title: "Early access FAQ",
    description: "Everything you need to know about partnering with Pullse in 2025.",
    href: "/contact-sales",
    badge: "Guide",
  },
];

const faqs = [
  {
    question: "What do we get as an early design partner?",
    answer:
      "Hands-on implementation with the founders, access to new connectors as they ship, and shared dashboards to prove ROI internally.",
  },
  {
    question: "How opinionated is the Pullse AI?",
    answer:
      "You control the prompts, tone, and guardrails. Every automation requires explicit approval paths and can be paused instantly.",
  },
  {
    question: "Which integrations are available today?",
    answer:
      "Core email/chat ingestion plus native connectors for Shopify, Stripe, Slack, and REST APIs. Salesforce, Zendesk, and HubSpot are in active development.",
  },
  {
    question: "What is the implementation lift?",
    answer:
      "Expect a 2-4 week sprint: discovery workshop, workflow design, sandbox review, and pilot rollout. Our team joins every working session.",
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
    description: "Deflect known intents with intelligent automated responses.",
    label: "AI Agent",
    color: "hsl(var(--background))",
    icon: Bot,
    customComponent: <AIChatbotPreview />,
  },
  {
    title: "AI Copilots",
    description: "Draft, summarize, translate—AI assistance for your team.",
    label: "AI Assistant",
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
      <PageLiquidBackground opacity={0.25} />
      <Navigation />

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-background -z-20" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] -z-20" />

        <div className="absolute inset-0 -z-10 opacity-55">
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

        <div className="container mx-auto px-4 py-20">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur">
                <span>Backed by</span>
                <Image src={antlerLogo} alt="Antler" width={60} height={24} className="h-4 w-auto" />
              </div>

              <h1 ref={titleRef} className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight text-foreground">
                <span className="word inline-block">AI</span>{" "}
                <span className="word inline-block">support</span>{" "}
                <span className="word inline-block">that</span>{" "}
                <span className="word inline-block">feels</span>{" "}
                <span className="word inline-block">human,</span>{" "}
                <span className="word inline-block">not</span>{" "}
                <span className="word inline-block">handed</span>{" "}
                <span className="word inline-block">off</span>
              </h1>

              <p ref={descRef} className="max-w-2xl text-lg md:text-xl text-muted-foreground">
                Pullse unifies channels, workflows, automations, and AI copilots so teams resolve complex intents in minutes. Automate the repetitive, empower agents, and keep every interaction on-brand.
              </p>

              <div ref={buttonsRef} className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="px-6 py-6 text-base" asChild>
                  <Link href="/contact-sales">
                    Book a demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="px-6 py-6 text-base" asChild>
                  <Link href="/product-tour">Watch product tour</Link>
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-border/60 bg-background/60 p-4 backdrop-blur">
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
                  <VideoEmbed videoId="nUHaQJU5q5c" title="Pullse product intro" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & problem framing */}
      <section className="border-y border-border/60 bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[1.4fr,1fr] items-start">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                Built with trust from day one
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
                Backed by Antler, Microsoft for Startups, and Google for Startups to deliver a secure, measurable AI support desk
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                Pullse replaces channel silos and brittle experiments with one workspace: capture every signal, automate repetitive work, empower humans, and ship ROI dashboards that leadership can trust.
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-medium text-muted-foreground">
                {trustSignals.map((signal) => (
                  <span key={signal} className="rounded-full border border-border bg-background px-3 py-1">
                    {signal}
                  </span>
                ))}
                <Button variant="link" className="h-auto px-0 text-primary" asChild>
                  <Link href="/security">View security & roadmap</Link>
                </Button>
              </div>
            </div>
            <div className="grid gap-5">
              {problemPoints.map((point) => (
                <div key={point.title} className="rounded-3xl border border-border/60 bg-background/80 p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-primary/40">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <point.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground">{point.title}</h3>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Platform taxonomy */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center space-y-4">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              The Pullse platform
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Everything your agents and automations need in one place
            </h2>
            <p className="text-lg text-muted-foreground">
              Visual workflows, AI copilots, and analytics that prove the impact—all inside a unified inbox.
            </p>
          </div>
          <MagicBento cardData={taxonomy} />
        </div>
      </section>

      <PlatformOverview />
      <WhyFullStackSection />

      {/* Use cases */}
      <section className="relative py-18">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-green/10 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--accent-green)/0.18),transparent_50%)] opacity-70" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center space-y-4">
            <div className="inline-flex items-center rounded-full border border-accent-green/30 bg-accent-green/10 px-4 py-1 text-sm font-medium text-accent-green">
              Where teams start with Pullse
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Launch automations and copilots where they matter most</h2>
            <p className="text-lg text-muted-foreground">Toggle through the tabs to see how we co-design early workflows across support ops, commerce, and regulated teams.</p>
          </div>

          <Tabs defaultValue="ops" className="mx-auto w-full max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-[280px,1fr]">
              <TabsList className="flex flex-col gap-3 rounded-3xl border border-border/70 bg-background/70 p-4 shadow-xl backdrop-blur">
                {useCaseTabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="justify-between rounded-2xl border border-transparent px-4 py-3 text-left text-sm font-medium data-[state=active]:border-primary/40 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                  >
                    {tab.label}
                    <ArrowRight className="h-4 w-4 opacity-60" />
                  </TabsTrigger>
                ))}
              </TabsList>

              {useCaseTabs.map((tab) => (
                <TabsContent key={tab.value} value={tab.value} className="rounded-3xl border border-border/70 bg-background/80 p-8 shadow-2xl backdrop-blur">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      Co-design focus
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground">{tab.headline}</h3>
                    <p className="text-sm text-muted-foreground">{tab.summary}</p>
                    <ul className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                      {tab.bullets.map((point) => (
                        <li key={point} className="flex items-start gap-2 rounded-2xl border border-border/60 bg-background/70 p-3">
                          <CheckCircle2 className="mt-1 h-4 w-4 text-primary" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-primary">
                      <ArrowRight className="h-4 w-4" />
                      <span>Book a working session to map this track</span>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </section>

      {/* ROI & next steps */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,hsl(var(--primary)/0.15),transparent_55%)] opacity-70" />
        <div className="container relative mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr),minmax(0,1fr)] items-start">
            <div className="rounded-3xl border border-white/10 bg-background/80 p-6 shadow-xl backdrop-blur">
              <RoiCalculator />
            </div>
            <div className="space-y-6 rounded-3xl border border-border/60 bg-background/80 p-8 shadow-lg backdrop-blur">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                  Plan your rollout with us
                </div>
                <h2 className="text-3xl font-semibold text-foreground">Model the before-and-after, then plug in your real data together</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The calculator gives you a directional view. During onboarding we replace the defaults with your handle times, cost structure, and automation targets so finance and leadership are aligned.
                </p>
              </div>
              <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                {roiHighlights.map((item) => (
                  <li key={item} className="flex items-start gap-2 rounded-2xl border border-border/60 bg-background/75 p-3">
                    <Zap className="mt-1 h-4 w-4 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="rounded-2xl border border-border/60 bg-background/75 p-4 text-xs text-muted-foreground">
                <Shield className="mr-2 inline h-4 w-4 text-primary" />
                Connectors shipping with early access: {connectorHighlights.join(', ')}. Follow the roadmap to request the next systems we should wire in.
              </div>
              <div className="flex flex-wrap gap-3">
                <RouteButton size="lg" href="/contact-sales">
                  Schedule a planning session
                  <ArrowRight className="ml-2 h-4 w-4" />
                </RouteButton>
                <RouteButton variant="outline" href="/integrations">View integration roadmap</RouteButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full-stack connectivity */}
      <section className="py-18 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center space-y-4">
            <div className="inline-flex items-center rounded-full border border-accent-pink/30 bg-accent-pink/10 px-4 py-1 text-sm font-medium text-accent-pink">
              Full-stack connectivity
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Connect Pullse to every system that matters</h2>
            <p className="text-lg text-muted-foreground">Native connectors, secure APIs, and webhooks let automations update the tools you already rely on.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {connectorHighlights.map((logo) => (
              <div key={logo} className="flex h-24 items-center justify-center rounded-2xl border border-border/60 bg-background/80 text-sm font-semibold text-muted-foreground">
                {logo}
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button variant="link" className="text-primary" asChild>
              <Link href="/integrations">
                Browse the integration roadmap and request connectors
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Plan your rollout */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/12 via-background to-background" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center space-y-4">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              Plan your rollout
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Resources for buyers and operators</h2>
            <p className="text-lg text-muted-foreground">Guides, catalogues, and stories to help you make the case and launch with confidence.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {resources.map((resource) => (
              <div key={resource.title} className="flex h-full flex-col gap-4 rounded-3xl border border-border/60 bg-background/80 p-8 shadow-lg backdrop-blur">
                <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                  {resource.badge}
                </div>
                <h3 className="text-lg font-semibold text-foreground">{resource.title}</h3>
                <p className="text-sm text-muted-foreground flex-1">{resource.description}</p>
                <Button variant="ghost" className="justify-start px-0 text-primary" asChild>
                  <Link href={resource.href}>
                    Open resource
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden py-18">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-accent/20 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--background))_20%,transparent_60%)]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="mx-auto max-w-4xl rounded-3xl border border-border/60 bg-background/70 p-12 text-center shadow-2xl backdrop-blur">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              Ready to build the future of support
            </div>
            <h2 className="mt-6 text-4xl md:text-5xl font-bold text-foreground">
              Spend more time on customers, not coordination
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              If you’re exploring how AI and automation can shoulder real work, let’s map it together. We’ll share the latest product milestones, integrations, and onboarding plan.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <RouteButton size="lg" className="px-8" href="/contact-sales">
                Talk to the founders
                <ArrowRight className="ml-2 h-4 w-4" />
              </RouteButton>
              <RouteButton size="lg" variant="outline" className="px-8" href="/product-tour">
                Watch the product tour
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
