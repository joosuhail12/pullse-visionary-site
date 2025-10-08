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
  Workflow,
  GitBranch,
  Target,
  MessageSquare,
  LayoutGrid,
  Bell,
  RotateCw,
  ArrowRight,
  CheckCircle2,
  Zap,
  Play,
  Star,
  TrendingUp,
  BarChart3,
  Users,
  MessageCircle,
  Shield,
  Link as LinkIcon,
  Sparkles,
  Code,
  Database,
} from "lucide-react";

// Import screenshots
import workflowScreenshot from "@/assets/workflow-automation-screenshot.png";
import routingConfigScreenshot from "@/assets/screenshots/routing-config.png";
import copilotScreenshot from "@/assets/copilot-interface-screenshot.png";

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

const ProductWorkflows = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [statsAnimated, setStatsAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Bento Grid Card Data
  const bentoCards: CardData[] = [
    {
      color: 'hsl(var(--card))',
      title: 'Build Complex Flows Visually',
      description: 'Design sophisticated automation with an intuitive drag-and-drop interface. Add triggers, conditions, actions, and delays—no coding required.',
      label: 'Drag & Drop',
      icon: Workflow,
      image: workflowScreenshot.src,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Intelligent Ticket Routing',
      description: 'Auto-route tickets by agent skills, workload, round-robin, or custom rules. 100% automated assignment with approval gates.',
      label: 'Auto-Assignment',
      icon: GitBranch,
      image: routingConfigScreenshot.src,
    },
    {
      color: 'hsl(var(--card))',
      title: 'If-Then Workflows',
      description: 'Branch workflows based on ticket properties, customer data, button clicks, or time conditions.',
      label: 'Smart Logic',
      icon: Target,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Messages, Buttons & Forms',
      description: 'Send interactive messages with action buttons. Collect customer data through forms. Set reply expectations.',
      label: 'Interactive',
      icon: MessageSquare,
    },
    {
      color: 'hsl(var(--card))',
      title: '50+ Pre-Built Workflows',
      description: 'Start with proven templates for e-commerce, SaaS, fintech, support ops. Copy, customize, and deploy in minutes.',
      label: 'Templates',
      icon: LayoutGrid,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Notify & Tag',
      description: 'Auto-tag tickets for organization. Send Slack/email alerts to agents. Track team performance.',
      label: 'Collaboration',
      icon: Bell,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Build Once, Use Everywhere',
      description: 'Create workflow libraries. Call nested workflows from any flow. Update once, deploy everywhere.',
      label: 'Modular',
      icon: RotateCw,
    },
  ];

  // Copilot Accordion Component
  const CopilotAccordion = () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
      {
        icon: Code,
        title: 'Universal Integration',
        content: 'Connect to any REST API—from Stripe and Salesforce to custom internal systems. No code required, just configure and deploy.',
        color: 'from-blue-500 to-cyan-500'
      },
      {
        icon: Zap,
        title: 'Real-Time Actions',
        content: 'Agents take actions instantly without leaving the conversation. Process refunds, update CRM records, or trigger workflows—all in one place.',
        color: 'from-amber-500 to-orange-500'
      },
      {
        icon: Shield,
        title: 'Control & Security',
        content: 'AI suggests, agent approves. Multi-level approval workflows for sensitive operations. Full audit trail of every action taken.',
        color: 'from-purple-500 to-pink-500'
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
                      ? 'border-amber-500/50 bg-gradient-to-r from-amber-500/15 to-amber-500/5 shadow-lg'
                      : 'border-border/40 bg-card/80 hover:border-amber-500/30 hover:bg-card'
                  }`}
                >
                  <div className="flex items-center gap-3 p-4">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${tab.color} shadow-lg transition-all ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                      <Icon className="h-5 w-5 text-background" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-sm font-bold transition-colors ${isActive ? 'text-amber-500' : 'text-foreground group-hover:text-amber-500'}`}>
                        {tab.title}
                      </h3>
                    </div>
                    <div className={`text-amber-500 transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`}>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </button>

                {isActive && (
                  <div className="mt-2 rounded-xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent backdrop-blur-sm p-5 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {tab.content}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Single Link at Bottom */}
        <div className="pt-2 border-t border-border/30">
          <RouteButton
            variant="ghost"
            size="sm"
            href="/product/ai-suite"
            className="w-full justify-center text-xs text-amber-500 hover:text-amber-400 hover:bg-amber-500/10"
          >
            Learn more about AI Copilot
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </RouteButton>
        </div>
      </div>
    );
  };

  // AI Copilot Connectors
  const copilotConnectors = [
    {
      category: 'Payments & Billing',
      color: 'from-green-500 to-emerald-500',
      platforms: ['Stripe', 'PayPal', 'Square']
    },
    {
      category: 'CRM & Sales',
      color: 'from-blue-500 to-cyan-500',
      platforms: ['Salesforce', 'HubSpot', 'Pipedrive']
    },
    {
      category: 'E-commerce',
      color: 'from-orange-500 to-amber-500',
      platforms: ['Shopify', 'WooCommerce', 'Magento']
    },
    {
      category: 'Communication',
      color: 'from-purple-500 to-pink-500',
      platforms: ['Slack', 'Microsoft Teams', 'Email']
    },
    {
      category: 'Custom APIs',
      color: 'from-indigo-500 to-purple-500',
      platforms: ['Any REST API']
    },
  ];

  // Stats
  const stats = [
    {
      value: 68,
      suffix: '%',
      label: 'Average automation rate',
      description: 'With AI-powered workflows',
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      value: 3,
      suffix: 'x',
      label: 'Faster resolution',
      description: 'vs manual routing',
      icon: Zap,
      color: 'from-purple-500 to-pink-500',
    },
    {
      value: 50,
      suffix: '+',
      label: 'Pre-built templates',
      description: 'Ready to deploy',
      icon: LayoutGrid,
      color: 'from-green-500 to-emerald-500',
    },
  ];

  // Scroll progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Trigger stats animation
            if (entry.target === statsRef.current && !statsAnimated) {
              setStatsAnimated(true);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach((el) => observer.observe(el));

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [statsAnimated]);

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
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_50%)]" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header Content */}
            <div className="text-center mb-16 space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5 shadow-sm">
                <Workflow className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-sm font-semibold tracking-wide text-primary">Visual Automation</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-foreground leading-[1.05] tracking-tight max-w-5xl mx-auto">
                Automate support with
                <span className="block bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent animate-gradient mt-2">
                  workflows and AI
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Build recurring workflows that run automatically. Take on-demand actions with AI Copilot that connects to any API.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <RouteButton size="lg" href="/contact-sales" className="text-base px-10 py-7 shadow-2xl shadow-primary/30 group">
                  See it live
                  <Play className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                </RouteButton>
                <RouteButton size="lg" variant="outline" href="/pricing" className="text-base px-10 py-7">
                  View pricing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </RouteButton>
              </div>

              {/* Trust Signals */}
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>2-week setup</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>No credit card</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <span>4.8/5 on G2</span>
                </div>
              </div>
            </div>

            {/* Hero Screenshot */}
            <div className="relative max-w-6xl mx-auto">
              {/* Glow effect */}
              <div className="absolute -inset-12 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-3xl opacity-60" />

              {/* Main screenshot card */}
              <div className="relative rounded-3xl border border-border/50 bg-gradient-to-br from-card/95 via-card to-card/90 p-2 sm:p-3 shadow-2xl backdrop-blur-xl">
                <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted/30 border border-border/30">
                  <Image
                    src={workflowScreenshot}
                    alt="Pullse Visual Workflow Builder"
                    className="w-full"
                    priority
                  />
                </div>
              </div>

              {/* Floating stat badges */}
              <div className="absolute -left-4 top-1/4 hidden lg:block">
                <div className="rounded-2xl border border-border/60 bg-card/95 p-5 shadow-xl backdrop-blur-xl animate-float">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                      <Zap className="h-6 w-6 text-background" />
                    </div>
                    <div>
                      <div className="text-2xl font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">68%</div>
                      <div className="text-xs text-muted-foreground">Automated</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 top-1/3 hidden lg:block">
                <div className="rounded-2xl border border-border/60 bg-card/95 p-5 shadow-xl backdrop-blur-xl animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg">
                      <LayoutGrid className="h-6 w-6 text-background" />
                    </div>
                    <div>
                      <div className="text-2xl font-black bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">50+</div>
                      <div className="text-xs text-muted-foreground">Templates</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Value Props Section */}
      <section className="relative py-20 bg-gradient-to-b from-muted/10 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Workflow, title: 'Visual Builder', description: 'Drag-and-drop recurring automation' },
                { icon: GitBranch, title: 'Smart Logic', description: 'Conditional branching & routing' },
                { icon: MessageCircle, title: 'Customer Engagement', description: 'Interactive messages & feedback' },
                { icon: Sparkles, title: 'AI Copilot', description: 'On-demand actions via any API' },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-all hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 fade-in-up"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative space-y-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 transition-all group-hover:scale-110">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Bento Grid Section */}
      <section className="relative py-32 bg-gradient-to-b from-muted/10 via-muted/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-20 space-y-6 fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold tracking-wide text-primary">Complete Automation</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                Everything you need to automate support
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                From simple routing to complex multi-step workflows—build it all with visual drag-and-drop
              </p>
            </div>

            {/* MagicBento Grid */}
            <div className="fade-in-up">
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
        </div>
      </section>

      {/* AI Copilot Section */}
      <section className="relative h-screen max-h-screen bg-gradient-to-b from-muted/10 via-background to-background flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--amber-500)/0.12),transparent_60%)]" />

        <div className="container relative mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8 space-y-3 fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-gradient-to-r from-amber-500/15 to-amber-500/10 px-4 py-1.5 shadow-lg backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-500">On-Demand Actions</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                AI Copilot for real-time actions
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                Let agents take actions across any platform—from Stripe refunds to CRM updates—right from the chat. Connects to any REST API.
              </p>
            </div>

            {/* Enhanced Layout */}
            <div className="grid lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
              {/* Left: Screenshot with Enhanced Frame */}
              <div className="fade-in-up">
                <div className="relative max-w-lg mx-auto">
                  {/* Glow Effect */}
                  <div className="absolute -inset-3 bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent blur-xl opacity-50" />

                  <div className="relative rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-500/5 via-card to-card p-2 shadow-lg backdrop-blur-xl">
                    <div className="rounded-lg overflow-hidden bg-gradient-to-br from-muted/30 to-muted/50 border border-border/40 shadow-md">
                      <Image
                        src={copilotScreenshot}
                        alt="AI Copilot Interface"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Accordion Tabs */}
              <div className="space-y-2 fade-in-up">
                <CopilotAccordion />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Built AI Copilot Connectors Section */}
      <section className="relative py-32 bg-gradient-to-b from-muted/10 via-muted/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-20 space-y-6 fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2">
                <LinkIcon className="h-4 w-4 text-amber-500" />
                <span className="text-xs font-semibold tracking-wide text-amber-500">Pre-Built Connectors</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                Connect Copilot to your tools
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Pre-configured integrations for common platforms—or connect to any custom API
              </p>
            </div>

            {/* Connectors Grid */}
            <div className="grid lg:grid-cols-5 gap-8 fade-in-up">
              {copilotConnectors.map((connector, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card p-6 transition-all hover:border-primary/40 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${connector.color} opacity-0 transition-opacity group-hover:opacity-10`} />
                  <div className="relative space-y-6">
                    {/* Category Header */}
                    <div className="space-y-2">
                      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${connector.color} shadow-lg`}>
                        <Code className="h-6 w-6 text-background" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground">{connector.category}</h3>
                    </div>

                    {/* Platforms */}
                    <div className="space-y-2">
                      {connector.platforms.map((platform, pIndex) => (
                        <div key={pIndex} className="flex items-center gap-2 text-sm text-foreground font-medium">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                          {platform}
                        </div>
                      ))}
                    </div>

                    {/* AI Ready Badge */}
                    <div className="pt-4 border-t border-border/40">
                      <div className="inline-flex items-center gap-2 rounded-lg bg-amber-500/10 px-3 py-1.5 border border-amber-500/20">
                        <Sparkles className="h-3 w-3 text-amber-500" />
                        <span className="text-xs font-bold text-amber-500">AI Copilot Ready</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Analytics & Results Section */}
      <section className="relative py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-20 space-y-6 fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
                <BarChart3 className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold tracking-wide text-primary">Performance</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                Track what matters
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Real-time dashboards showing workflow execution rates, success metrics, and ROI tracking
              </p>
            </div>

            {/* Stats Grid */}
            <div ref={statsRef} className="grid md:grid-cols-3 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card p-8 transition-all hover:border-primary/40 hover:shadow-2xl hover:-translate-y-2 fade-in-up"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 transition-opacity group-hover:opacity-10`} />
                    <div className="relative space-y-6">
                      <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                        <Icon className="h-8 w-8 text-background" />
                      </div>
                      <div className="space-y-2">
                        <div className={`text-5xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent tabular-nums`}>
                          <AnimatedCounter end={stat.value} suffix={stat.suffix} trigger={statsAnimated} duration={2000} />
                        </div>
                        <div className="text-lg font-bold text-foreground">{stat.label}</div>
                        <div className="text-sm text-muted-foreground">{stat.description}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.15),transparent_60%)]" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card to-card/90 shadow-2xl fade-in-up">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.1),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--primary)/0.1),transparent_50%)]" />

              <div className="relative p-12 lg:p-16">
                <div className="text-center space-y-10">
                  <div className="space-y-6">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                      Ready to automate with workflows and AI?
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                      See Pullse Workflows and Copilot in action. Book a personalized demo with our team.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <RouteButton size="lg" className="text-base px-10 py-7 shadow-xl shadow-primary/20" href="/contact-sales">
                      Book a demo
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </RouteButton>
                    <RouteButton size="lg" variant="outline" className="text-base px-10 py-7" href="/pricing">
                      View pricing
                    </RouteButton>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-8 border-t border-border/40">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>2-week setup</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Founder-led onboarding</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>No credit card required</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .fade-in-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .fade-in-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default ProductWorkflows;
