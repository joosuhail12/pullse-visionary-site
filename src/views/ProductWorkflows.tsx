'use client';

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Package,
  Lock,
  FileText,
  AlertTriangle,
  Lightbulb,
  ChevronDown,
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

// Copilot Accordion Component (moved outside to prevent re-renders)
const CopilotAccordion = () => {
  const [activeTab, setActiveTab] = useState<number | null>(null);

  const tabs = [
    {
      icon: Code,
      title: 'Universal Integration',
      content: {
        headline: '50+ pre-built connectors for popular platforms. Or register any REST/GraphQL API—AI figures out how to use it on the fly.',
        features: [
          { icon: CheckCircle2, text: 'Pre-built connectors for Stripe, Shopify, Salesforce, and more' },
          { icon: Zap, text: 'AI creates custom integrations dynamically for any other API' },
          { icon: Shield, text: 'On-demand actions when agents need them—no business logic required' }
        ],
        badge: { text: '50+ Integrations' },
        example: {
          title: 'Example Use Case',
          description: 'Agent asks "Process refund for order #1234." AI calls your Stripe connector, executes the refund, and confirms back—or figures out your custom API on the fly if no connector exists.'
        }
      },
      colors: {
        gradient: 'from-blue-500 to-cyan-500',
        borderActive: 'border-blue-500/50',
        bgActive: 'from-blue-500/15 via-blue-500/10 to-cyan-500/5',
        shadowActive: 'shadow-blue-500/20',
        textActive: 'text-blue-500',
        bgExpanded: 'from-blue-500/5 via-blue-500/3 to-transparent',
        borderExpanded: 'border-blue-500/20',
        iconGlow: 'shadow-[0_0_20px_rgba(59,130,246,0.5)]'
      }
    },
    {
      icon: Zap,
      title: 'On-Demand Actions',
      content: {
        headline: 'Agents ask AI to take actions across any platform—instantly, without leaving the conversation.',
        features: [
          { icon: RotateCw, text: 'Process refunds, cancel subscriptions, issue credits' },
          { icon: Database, text: 'Update CRM, check inventory, pull order history' },
          { icon: Play, text: 'AI figures out what API calls to make in real-time' }
        ],
        badge: { text: 'On-Demand' },
        example: {
          title: 'Example Use Case',
          description: 'Agent types "Issue $50 credit to this customer." AI calls your billing API, creates the credit, and confirms back—all in seconds.'
        }
      },
      colors: {
        gradient: 'from-amber-500 to-orange-500',
        borderActive: 'border-amber-500/50',
        bgActive: 'from-amber-500/15 via-amber-500/10 to-orange-500/5',
        shadowActive: 'shadow-amber-500/20',
        textActive: 'text-amber-500',
        bgExpanded: 'from-amber-500/5 via-amber-500/3 to-transparent',
        borderExpanded: 'border-amber-500/20',
        iconGlow: 'shadow-[0_0_20px_rgba(245,158,11,0.5)]'
      }
    },
    {
      icon: Shield,
      title: 'Control & Security',
      content: {
        headline: 'AI suggests, agent approves. Multi-level approval workflows for sensitive operations.',
        features: [
          { icon: Lock, text: 'Role-based action permissions' },
          { icon: FileText, text: 'Full audit trail of every action' },
          { icon: AlertTriangle, text: 'Multi-step approval for high-risk actions' }
        ],
        badge: { text: 'Enterprise Security' },
        example: {
          title: 'Example Use Case',
          description: 'Refunds over $500 require manager approval—AI suggests, agent requests, manager approves in Slack.'
        }
      },
      colors: {
        gradient: 'from-purple-500 to-pink-500',
        borderActive: 'border-purple-500/50',
        bgActive: 'from-purple-500/15 via-purple-500/10 to-pink-500/5',
        shadowActive: 'shadow-purple-500/20',
        textActive: 'text-purple-500',
        bgExpanded: 'from-purple-500/5 via-purple-500/3 to-transparent',
        borderExpanded: 'border-purple-500/20',
        iconGlow: 'shadow-[0_0_20px_rgba(168,85,247,0.5)]'
      }
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
              <motion.button
                onClick={() => setActiveTab(activeTab === index ? null : index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className={`w-full text-left rounded-xl border transition-all ${
                  isActive
                    ? `${tab.colors.borderActive} bg-gradient-to-r ${tab.colors.bgActive} shadow-lg ${tab.colors.shadowActive}`
                    : 'border-border/40 bg-card/80 hover:border-primary/30 hover:bg-card'
                }`}
              >
                <div className="flex items-center gap-4 p-4">
                  <motion.div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${tab.colors.gradient} shadow-lg ${isActive ? tab.colors.iconGlow : ''}`}
                    whileHover={{ rotate: 8, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Icon className="h-6 w-6 text-background" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className={`text-base font-bold transition-colors ${isActive ? tab.colors.textActive : 'text-foreground'}`}>
                      {tab.title}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className={isActive ? tab.colors.textActive : 'text-muted-foreground'}
                  >
                    <ChevronDown className="h-5 w-5" />
                  </motion.div>
                </div>
              </motion.button>

              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.div
                    key={`accordion-${index}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className={`mt-3 rounded-2xl border backdrop-blur-xl overflow-hidden bg-gradient-to-br ${tab.colors.bgExpanded} ${tab.colors.borderExpanded}`}
                  >
                    <div className="p-6 space-y-6">
                      {/* Headline */}
                      <div className="flex items-start gap-3">
                        <Sparkles className={`h-5 w-5 mt-0.5 shrink-0 ${tab.colors.textActive}`} />
                        <p className="text-sm text-foreground font-medium leading-relaxed">
                          {tab.content.headline}
                        </p>
                      </div>

                      {/* Key Features */}
                      <div className="space-y-3">
                        {tab.content.features.map((feature, idx) => {
                          const FeatureIcon = feature.icon;
                          return (
                            <div
                              key={idx}
                              className="flex items-center gap-3 text-sm group/feature"
                            >
                              <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${tab.colors.gradient} shadow-lg group-hover/feature:scale-110 transition-transform duration-200`}>
                                <FeatureIcon className="h-4 w-4 text-background" />
                              </div>
                              <span className="text-muted-foreground group-hover/feature:text-foreground transition-colors duration-200">
                                {feature.text}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Example Use Case */}
                      <div className={`rounded-xl border p-4 space-y-2 bg-gradient-to-br ${tab.colors.bgActive} ${tab.colors.borderActive}`}>
                        <div className="flex items-center gap-2">
                          <Lightbulb className={`h-4 w-4 ${tab.colors.textActive}`} />
                          <span className={`text-xs font-bold uppercase tracking-wider ${tab.colors.textActive}`}>
                            {tab.content.example.title}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {tab.content.example.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Enhanced Bottom CTA */}
      <div className="pt-4 border-t border-border/30">
        <RouteButton
          variant="ghost"
          size="sm"
          href="/product/ai-suite"
          className={`w-full justify-between group hover:bg-gradient-to-r ${activeTab !== null ? tabs[activeTab].colors.bgActive : 'hover:bg-muted'}`}
        >
          <span className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm">Learn more about AI Copilot</span>
          </span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </RouteButton>
      </div>
    </div>
  );
};

const ProductWorkflows = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Bento Grid Card Data
  const bentoCards: CardData[] = [
    {
      color: 'hsl(var(--card))',
      title: 'Never Manually Assign Tickets Again',
      description: 'Every ticket gets routed automatically—to the right agent, at the right time, based on workload, expertise, or any criteria you choose. No more playing traffic controller.',
      label: 'Zero Manual Work',
      icon: Target,
      image: routingConfigScreenshot.src,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Handle Common Requests Without Lifting a Finger',
      description: 'Refund requests, order status, password resets—send interactive messages with buttons and forms. Customers get instant answers, you get time back.',
      label: 'Auto-Responses That Work',
      icon: MessageSquare,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Set It Once, Forget It Forever',
      description: 'Weekly reports, SLA reminders, follow-up sequences—build it once, runs automatically forever. Stop doing the same thing every Monday morning.',
      label: 'Recurring Automation',
      icon: RotateCw,
      image: workflowScreenshot.src,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Make Complex Decisions Automatically',
      description: 'VIP customer? Escalate. Refund under $50? Auto-approve. Order not shipped? Different workflow. Your judgment, automated.',
      label: 'Smart Branching',
      icon: GitBranch,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Stop Searching for Information',
      description: 'Pull order history from Shopify, payment info from Stripe, subscription data from your billing system—all automatically attached to the ticket.',
      label: 'Context Auto-Loaded',
      icon: Database,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Build Automation Without Writing Code',
      description: 'Drag-and-drop interface makes it easy to create sophisticated workflows. Add triggers, conditions, actions, and delays—no technical skills required.',
      label: 'Visual Builder',
      icon: Workflow,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Build Once, Deploy Everywhere',
      description: 'Create workflow building blocks you can reuse across every automation. Update one block, it updates everywhere. Like code libraries, but no coding.',
      label: 'Reusable Blocks',
      icon: Package,
    },
  ];

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
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

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
                  <span>Built for teams that demand excellence</span>
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
                      <div className="text-2xl font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">80%</div>
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

      {/* AI Copilot Integrations Section */}
      <section className="relative py-32 bg-gradient-to-b from-muted/10 via-muted/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-20 space-y-6 fade-in-up">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                Pre-built connectors or custom APIs
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Use our 50+ pre-built connectors for popular platforms—or register any REST/GraphQL API and AI figures it out dynamically
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
                  </div>
                </div>
              ))}
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
