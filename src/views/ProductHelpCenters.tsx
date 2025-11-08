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
  BookOpen,
  Globe,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Zap,
  Play,
  TrendingUp,
  BarChart3,
  Palette,
  Languages,
  Wand2,
  Search,
  Users,
  Link2,
  Code,
  MessageCircle,
  GitBranch,
  ExternalLink,
} from "lucide-react";

// Import Appo branding
import appoLogo from "@/assets/appo/appo-logo.png";
import appoWordmark from "@/assets/appo/appo-wordmark.png";

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

// AI Accordion Component
const AIAccordion = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      icon: Wand2,
      title: 'AI Writing & Optimization',
      content: 'AI co-authors articles with you. Suggests better phrasing, improves clarity, optimizes for SEO. Makes every writer sound like your best writer.',
      color: 'from-[#F28D1B] to-[#FFB633]'
    },
    {
      icon: Search,
      title: 'Content Gap Analysis',
      content: 'AI identifies missing content by analyzing unanswered searches and customer questions. Shows you exactly what articles to write next.',
      color: 'from-[#FFB633] to-[#FEE3AC]'
    },
    {
      icon: MessageCircle,
      title: 'Pullse Chatbot Integration',
      content: 'Appo plugs directly into Pullse AI chatbots. Customers ask questions, chatbot pulls instant answers from your help centers—no setup required.',
      color: 'from-[#F28D1B] to-[#503225]'
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
                    ? 'border-[#F28D1B]/50 bg-gradient-to-r from-[#F28D1B]/15 to-[#FFB633]/5 shadow-lg'
                    : 'border-border/40 bg-card/80 hover:border-[#F28D1B]/30 hover:bg-card'
                }`}
              >
                <div className="flex items-center gap-3 p-4">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${tab.color} shadow-lg transition-all ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-sm font-bold transition-colors ${isActive ? 'text-[#F28D1B]' : 'text-foreground group-hover:text-[#F28D1B]'}`}>
                      {tab.title}
                    </h3>
                  </div>
                  <div className={`text-[#F28D1B] transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`}>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>

              {isActive && (
                <div className="mt-2 rounded-xl border border-[#F28D1B]/20 bg-gradient-to-br from-[#FEE3AC]/10 to-transparent backdrop-blur-sm p-5 animate-in fade-in slide-in-from-top-2 duration-300">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tab.content}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ProductHelpCenters = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [statsAnimated, setStatsAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Scroll progress tracking
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const winScroll = document.documentElement.scrollTop;
          const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scrolled = (winScroll / height) * 100;
          setScrollProgress(scrolled);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Stats animation trigger
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

  // MagicBento Grid - Content Creation Features
  const bentoCards: CardData[] = [
    {
      color: 'hsl(var(--card))',
      title: 'Notion-Style Editor',
      description: 'Real-time collaborative editing with slash commands, drag-and-drop blocks, and inline comments. Multiple authors, one document.',
      label: 'Collaborative',
      icon: MessageCircle,
    },
    {
      color: 'hsl(var(--card))',
      title: 'AI Writing Agents',
      description: 'AI co-writes articles with you. Suggests better phrasing, improves clarity, optimizes for SEO and readability.',
      label: 'AI-Powered',
      icon: Wand2,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Rich Content Blocks',
      description: 'Text, images, videos, code snippets, embeds, tables—all supported. Build engaging help articles with any media.',
      label: 'Rich Media',
      icon: Code,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Real-Time Collaboration',
      description: "See teammates' cursors, edit simultaneously, leave inline comments, track changes. True multi-author experience.",
      label: 'Team Editing',
      icon: Users,
    },
    {
      color: 'hsl(var(--card))',
      title: 'AI Optimization',
      description: 'AI analyzes articles for readability, suggests better headlines, identifies content gaps, and improves structure.',
      label: 'Smart',
      icon: Sparkles,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Version History',
      description: 'Full revision tracking. Rollback to any version, see who changed what and when. Never lose work.',
      label: 'Version Control',
      icon: GitBranch,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Custom Domains',
      description: 'Connect your own domain—help.yourcompany.com—with one click. SSL, DNS, and CDN handled automatically.',
      label: 'Professional',
      icon: Link2,
    },
  ];

  // Analytics Stats
  const stats = [
    {
      value: 10,
      suffix: 'K+',
      label: 'Monthly article views',
      description: 'Across all help centers',
      icon: BarChart3,
      color: 'from-[#F28D1B] to-[#FFB633]',
    },
    {
      value: 87,
      suffix: '%',
      label: 'Self-service resolution',
      description: 'Customers find answers',
      icon: TrendingUp,
      color: 'from-[#FFB633] to-[#FEE3AC]',
    },
    {
      value: 200,
      suffix: 'ms',
      label: 'Search speed',
      description: 'Lightning-fast results',
      icon: Zap,
      color: 'from-[#FFB633] to-[#503225]',
    },
  ];

  return (
    <div className="min-h-screen appo-theme">
      <style jsx global>{`
        .appo-theme nav button {
          background-color: transparent !important;
        }
        .appo-theme nav button:hover {
          background-color: transparent !important;
        }
        .appo-theme nav button span[class*="bg-gradient"] {
          background: linear-gradient(to right, transparent, rgb(242, 141, 27), transparent) !important;
        }
        .appo-theme nav a:not([href*="demo"]) {
          background-color: transparent !important;
        }
        .appo-theme nav a:hover:not([href*="demo"]) {
          background-color: transparent !important;
        }
        .appo-theme nav a[class*="bg-primary"] {
          background-color: #F28D1B !important;
        }
        .appo-theme nav a[class*="bg-primary"]:hover {
          background-color: #FFB633 !important;
        }
        .appo-theme nav a[class*="shadow-primary"] {
          box-shadow: 0 10px 15px -3px rgba(242, 141, 27, 0.25) !important;
        }
        .appo-theme nav a[class*="shadow-primary"]:hover {
          box-shadow: 0 20px 25px -5px rgba(242, 141, 27, 0.4) !important;
        }
      `}</style>
      <PageLiquidBackground opacity={0.5} colors={['#F28D1B', '#FFB633', '#FEE3AC']} />
      <Navigation />

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-border/20">
        <div
          className="h-full bg-gradient-to-r from-[#F28D1B] via-[#FFB633] to-[#FEE3AC] transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(28_88%_53%/0.15),transparent_50%)]" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header Content */}
            <div className="text-center mb-16 space-y-8">
              {/* Appo Wordmark */}
              <div className="flex justify-center mb-4">
                <Image
                  src={appoWordmark}
                  alt="Appo"
                  className="h-10 w-auto"
                />
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-foreground leading-[1.05] tracking-tight max-w-5xl mx-auto">
                Help centers that
                <span className="block bg-gradient-to-r from-[#F28D1B] via-[#FFB633] to-[#FEE3AC] bg-clip-text text-transparent animate-gradient mt-2">
                  scale with you
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Appo is our help center platform—built for teams managing multiple brands. Create white-labeled knowledge bases with AI-powered writing, multilingual support, and native Pullse chatbot integration.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <RouteButton size="lg" href="/contact-sales" className="text-base px-10 py-7 shadow-2xl shadow-[#F28D1B]/30 bg-[#F28D1B] hover:bg-[#FFB633]">
                  Contact Sales
                  <ArrowRight className="ml-2 h-5 w-5" />
                </RouteButton>
              </div>

              {/* Trust Signals */}
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#F28D1B]" />
                  <span>Multiple help centers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#F28D1B]" />
                  <span>Custom domains</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#F28D1B]" />
                  <span>AI-powered</span>
                </div>
              </div>
            </div>

            {/* Hero Screenshot Placeholder */}
            <div className="relative max-w-6xl mx-auto">
              <div className="absolute -inset-12 bg-gradient-to-br from-[#F28D1B]/20 via-[#FFB633]/10 to-transparent blur-3xl opacity-60" />
              <div className="relative rounded-3xl border border-border/50 bg-gradient-to-br from-card/95 via-card to-card/90 p-2 sm:p-3 shadow-2xl backdrop-blur-xl">
                <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-muted/30 to-muted/50 border border-border/40 shadow-xl aspect-video flex items-center justify-center">
                  <div className="text-center space-y-2 p-8">
                    <BookOpen className="h-16 w-16 text-[#F28D1B]/40 mx-auto" />
                    <p className="text-sm text-muted-foreground">Appo Help Center Interface</p>
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
                { icon: BookOpen, title: 'Multiple Help Centers', description: 'Unlimited help centers per workspace' },
                { icon: Palette, title: 'White-Labeled', description: 'Your brand, your domain, your colors' },
                { icon: Wand2, title: 'AI Writing Assistant', description: 'AI helps write and optimize articles' },
                { icon: Languages, title: 'Multilingual Support', description: 'Publish in multiple languages' },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-all hover:border-[#F28D1B]/40 hover:shadow-xl hover:-translate-y-1 fade-in-up"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FEE3AC]/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative space-y-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F28D1B]/10 border border-[#F28D1B]/20 transition-all group-hover:scale-110">
                        <Icon className="h-6 w-6 text-[#F28D1B]" />
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

      {/* Content Creation - MagicBento Section */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(28_88%_53%/0.08),transparent_60%)]" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-20 space-y-6 fade-in-up">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                Build content that helps
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Powerful editor, AI writing assistance, and collaboration tools—everything you need to create great help articles
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
                glowColor="242, 141, 27"
              />
            </div>
          </div>
        </div>
      </section>

      {/* AI-Powered Intelligence Section */}
      <section className="relative h-screen max-h-screen bg-gradient-to-b from-muted/10 via-background to-background flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(28_88%_53%/0.12),transparent_60%)]" />

        <div className="container relative mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8 space-y-3 fade-in-up">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                AI that makes content better
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                From writing assistance to content gap analysis—Appo's AI helps you create knowledge that actually answers questions
              </p>
            </div>

            {/* Layout */}
            <div className="grid lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
              {/* Left: Screenshot Placeholder */}
              <div className="fade-in-up">
                <div className="relative max-w-lg mx-auto">
                  <div className="absolute -inset-3 bg-gradient-to-br from-[#F28D1B]/20 via-[#FFB633]/10 to-transparent blur-xl opacity-50" />
                  <div className="relative rounded-xl border border-[#F28D1B]/30 bg-gradient-to-br from-[#FEE3AC]/10 via-card to-card p-2 shadow-lg backdrop-blur-xl">
                    <div className="rounded-lg overflow-hidden bg-gradient-to-br from-muted/30 to-muted/50 border border-border/40 shadow-md aspect-[4/3] flex items-center justify-center">
                      <div className="text-center space-y-2 p-6">
                        <Wand2 className="h-12 w-12 text-[#F28D1B]/40 mx-auto" />
                        <p className="text-xs text-muted-foreground">AI Writing Assistant Interface</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Accordion */}
              <div className="space-y-2 fade-in-up">
                <AIAccordion />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multilingual Section */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(28_88%_53%/0.08),transparent_60%)]" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-20 space-y-6 fade-in-up">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                Publish globally. Speak locally.
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Create multilingual help centers that serve customers in their native language
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Languages, title: 'Multi-Language Support', description: 'Create help centers in multiple languages from one workspace' },
                { icon: Globe, title: 'Localized Content', description: 'Different articles per language/region, manage translations easily' },
                { icon: Zap, title: 'Language Switching', description: 'Customers switch languages instantly, seamless UX' },
                { icon: Search, title: 'SEO Optimized', description: 'Each language fully indexed, meta tags, sitemaps' },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-all hover:border-[#F28D1B]/40 hover:shadow-xl hover:-translate-y-1 fade-in-up"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FEE3AC]/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative space-y-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F28D1B]/10 border border-[#F28D1B]/20 transition-all group-hover:scale-110">
                        <Icon className="h-6 w-6 text-[#F28D1B]" />
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

      {/* Analytics & Content Gap Section */}
      <section className="relative py-32 bg-gradient-to-b from-muted/10 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-20 space-y-6 fade-in-up">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                Measure what matters
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Track performance, identify content gaps, and optimize your help centers with AI-powered analytics
              </p>
            </div>

            {/* Stats Grid */}
            <div ref={statsRef} className="grid md:grid-cols-3 gap-8 mb-16">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card p-8 transition-all hover:border-[#F28D1B]/40 hover:shadow-2xl hover:-translate-y-2 fade-in-up"
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

            {/* Content Gap Analysis */}
            <div className="grid lg:grid-cols-2 gap-12 items-center fade-in-up">
              {/* Left: Screenshot */}
              <div className="relative rounded-3xl border border-border/50 bg-card p-6 shadow-xl">
                <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-muted/30 to-muted/50 border border-border/40 aspect-video flex items-center justify-center">
                  <div className="text-center space-y-2 p-6">
                    <Search className="h-14 w-14 text-[#F28D1B]/40 mx-auto" />
                    <p className="text-sm text-muted-foreground">Content Gap Analysis Dashboard</p>
                  </div>
                </div>
              </div>

              {/* Right: Description */}
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-foreground">AI Content Gap Analysis</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Appo's AI analyzes customer searches and identifies questions you don't have answers for. See exactly what content to create next.
                </p>
                <ul className="space-y-3">
                  {[
                    'Track unanswered searches',
                    'Identify missing content',
                    "See which questions customers ask but you don't answer",
                    'AI suggests article topics to write'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-[#F28D1B] mt-0.5 shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pullse Integration + Final CTA */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(28_88%_53%/0.15),transparent_60%)]" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-16">
            {/* Integration Callout */}
            <div className="relative overflow-hidden rounded-3xl border border-[#F28D1B]/30 bg-gradient-to-br from-[#FEE3AC]/10 via-card to-card p-8 shadow-2xl fade-in-up">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(28_88%_53%/0.1),transparent_50%)]" />

              <div className="relative">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <Image src={appoLogo} alt="Appo" className="h-12 w-12" />
                  <Link2 className="h-6 w-6 text-[#F28D1B]" />
                  <div className="h-12 w-12 rounded-lg bg-[#F28D1B]/10 border border-[#F28D1B]/20 flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-[#F28D1B]" />
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-4">
                  Built to work with Pullse
                </h3>

                <div className="grid sm:grid-cols-3 gap-4 mt-8">
                  {[
                    { text: 'Native chatbot integration—Appo answers questions automatically' },
                    { text: 'Agents insert articles into replies from Pullse inbox' },
                    { text: 'Track deflection rate—see ROI of self-service' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-2 p-3 rounded-lg bg-background/50">
                      <CheckCircle2 className="h-5 w-5 text-[#F28D1B] mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Final CTA */}
            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card to-card/90 shadow-2xl fade-in-up">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(28_88%_53%/0.1),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(28_88%_53%/0.1),transparent_50%)]" />

              <div className="relative p-12 lg:p-16">
                <div className="text-center space-y-10">
                  {/* Appo Wordmark */}
                  <div className="flex justify-center">
                    <Image src={appoWordmark} alt="Appo" className="h-8 w-auto" />
                  </div>

                  <div className="space-y-6">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                      Ready to build self-service that works?
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                      See how Appo transforms support with AI-powered help centers, multilingual publishing, and content gap analysis.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <RouteButton size="lg" className="text-base px-10 py-7 shadow-xl shadow-[#F28D1B]/20 bg-[#F28D1B] hover:bg-[#FFB633]" href="/contact-sales">
                      Contact Sales
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </RouteButton>
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

export default ProductHelpCenters;
