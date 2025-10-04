import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Shield, Users, Zap, BarChart3, Bot, MessageSquare, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import VideoEmbed from "@/components/VideoEmbed";
import NodeAnimation from "@/components/NodeAnimation";
import PlatformOverview from "@/components/PlatformOverview";
import HeroFloating3D from "@/components/HeroFloating3D";
import MagicBento, { CardData } from "@/components/MagicBento";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";
import antlerLogo from "@/assets/antler-logo.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const HomeNew = () => {
  const [activeSolution, setActiveSolution] = useState<"b2b-saas" | "ecommerce" | "edtech" | "fintech">("b2b-saas");
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Hero text animations with GSAP
    if (titleRef.current) {
      gsap.from(titleRef.current.querySelectorAll('.word'), {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      });
    }
    if (descRef.current) {
      gsap.from(descRef.current, {
        y: 30,
        opacity: 0,
        delay: 0.4,
        duration: 1.2,
        ease: "power3.out"
      });
    }
    if (buttonsRef.current) {
      gsap.from(buttonsRef.current.children, {
        scale: 0.8,
        opacity: 0,
        delay: 0.6,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)"
      });
    }

    // Animate elements on scroll
    gsap.utils.toArray<HTMLElement>(".fade-in-scroll").forEach(elem => {
      gsap.from(elem, {
        scrollTrigger: {
          trigger: elem,
          start: "top 80%"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });
    });
  }, []);
  const taxonomy: CardData[] = [{
    title: "Unified Inbox",
    description: "One place for email & chat with SLAs, assignments, and full context.",
    label: "Communication",
    color: "hsl(var(--background))",
    icon: MessageSquare
  }, {
    title: "Workflow Automation",
    description: "Visual routing, tagging, SLAs, escalations.",
    label: "Automation",
    color: "hsl(var(--background))",
    icon: Zap
  }, {
    title: "AI Chatbots",
    description: "Deflect known intents with intelligent automated responses.",
    label: "AI Agent",
    color: "hsl(var(--background))",
    icon: Bot
  }, {
    title: "AI Copilots",
    description: "Draft, summarize, translate—AI assistance for your team.",
    label: "AI Assistant",
    color: "hsl(var(--background))",
    icon: Sparkles
  }, {
    title: "AI Tools",
    description: "Refunds, plan changes, order status—with guardrails & audit trails.",
    label: "Actions",
    color: "hsl(var(--background))",
    icon: Users
  }, {
    title: "Auto-QA",
    description: "Score 100% of conversations for accuracy, empathy, policy.",
    label: "Quality",
    color: "hsl(var(--background))",
    icon: Shield
  }, {
    title: "Analytics",
    description: "Coverage by intent, actioned vs. deflected, FCR, AHT in one view.",
    label: "Insights",
    color: "hsl(var(--background))",
    icon: BarChart3
  }];
  const featureBento = [{
    title: "Fewer back-and-forths",
    desc: "First-contact resolutions rise; exceptions get clean handoffs.",
    icon: MessageSquare
  }, {
    title: "Faster agents",
    desc: "Suggested replies, instant summaries, one-click follow-ups.",
    icon: Zap
  }, {
    title: "Consistency by default",
    desc: "Workflows keep ops predictable; Auto-QA raises the floor.",
    icon: CheckCircle2
  }, {
    title: "Outcomes you can prove",
    desc: "Automation coverage, intent trends, and actioned vs. deflected in one view.",
    icon: BarChart3
  }];
  const solutions = {
    "b2b-saas": {
      title: "B2B SaaS",
      items: [
        { benefit: "Reduce churn instantly", detail: "Handle plan changes & billing disputes before customers leave" },
        { benefit: "Onboard faster", detail: "Automated provisioning and SSO setup cuts wait times" },
        { benefit: "Prevent overages", detail: "Proactive usage & quota alerts keep customers happy" },
        { benefit: "Turn incidents into trust", detail: "Real-time status updates and transparent communication" }
      ]
    },
    ecommerce: {
      title: "Ecommerce",
      items: [
        { benefit: "Stop WISMO flooding", detail: "Automated order tracking updates reduce repeat inquiries" },
        { benefit: "Streamline returns", detail: "Self-service exchanges & refunds with instant confirmations" },
        { benefit: "Boost loyalty retention", detail: "Smart refund routing to store credit increases LTV" },
        { benefit: "Recover abandoned carts", detail: "Proactive shipping issue resolution saves revenue" }
      ]
    },
    edtech: {
      title: "Edtech",
      items: [
        { benefit: "Enroll more students", detail: "Instant onboarding support removes friction at signup" },
        { benefit: "Reduce drop-off", detail: "24/7 course access help keeps learners engaged" },
        { benefit: "Process payments faster", detail: "Automated billing support prevents enrollment delays" },
        { benefit: "Increase completion rates", detail: "Real-time assignment help reduces frustration" }
      ]
    },
    fintech: {
      title: "Fintech",
      items: [
        { benefit: "Resolve disputes in minutes", detail: "Automated transaction lookups and instant resolutions" },
        { benefit: "Speed up verification", detail: "Smart document validation cuts approval times by 80%" },
        { benefit: "Prevent payment failures", detail: "Proactive issue detection before transactions fail" },
        { benefit: "Build trust instantly", detail: "Real-time fraud alerts with transparent explanations" }
      ]
    }
  };
  const integrations = [{
    name: "Stripe",
    capabilities: ["Read", "Write", "Actions"]
  }, {
    name: "Salesforce",
    capabilities: ["Read", "Write"]
  }, {
    name: "Shopify",
    capabilities: ["Read", "Write", "Actions"]
  }, {
    name: "HubSpot",
    capabilities: ["Read", "Write"]
  }, {
    name: "Zendesk",
    capabilities: ["Read"]
  }, {
    name: "Slack",
    capabilities: ["Read", "Write"]
  }];
  const faqs = [{
    q: "Do we have to change our process?",
    a: "No—Pullse connects to your stack and removes manual steps."
  }, {
    q: "Who decides what gets automated?",
    a: "You do. Agents act only within approved guardrails."
  }, {
    q: "Are workflows writing to systems?",
    a: "Workflows run ticket ops; AI Agents perform the account actions you authorize."
  }, {
    q: "How fast to value?",
    a: "Start with top intents, wire 2–3 systems, measure from week one."
  }, {
    q: "Pricing?",
    a: "One plan, all capabilities. Request pricing."
  }];
  return <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background -z-10" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] -z-10" />

        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Copy */}
            <div className="z-10 space-y-8">
              <div className="inline-flex items-center gap-2 glass-strong px-4 py-2 rounded-full text-sm">
                <span>Backed by</span>
                <img src={antlerLogo} alt="Antler" className="h-4" />
              </div>

              <h1 ref={titleRef} className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="word inline-block">AI</span>{" "}
                <span className="word inline-block">support</span>{" "}
                <span className="word inline-block">that</span>{" "}
                <span className="word inline-block">doesn't</span>{" "}
                <span className="word inline-block">just</span>{" "}
                <span className="word inline-block">reply</span>{" "}
                <span className="word inline-block">—</span>{" "}
                <span className="word inline-block text-primary">it</span>{" "}
                <span className="word inline-block text-primary">acts.</span>
              </h1>

              <p ref={descRef} className="text-xl text-muted-foreground leading-relaxed">
                Endless tickets, manual work, disconnected tools? Pullse unifies every message, automates the busywork, and lets AI answer and take real actions—while your team stays in control.
              </p>

              <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 py-6 glow group" asChild>
                  <Link to="/contact-sales">
                    Book a demo
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary/20" asChild>
                  <Link to="/pricing">
                    Request pricing
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap gap-6 pt-4">
                {[{
                icon: CheckCircle2,
                text: "Founder-led onboarding"
              }, {
                icon: CheckCircle2,
                text: "Design-partner seats open"
              }, {
                icon: CheckCircle2,
                text: "Enterprise-grade controls"
              }].map((item, index) => <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <item.icon className="h-4 w-4 text-primary" />
                    {item.text}
                  </div>)}
              </div>
            </div>

            {/* Right - Video */}
            <div className="relative">
              <VideoEmbed videoId="NItSkrvcS04" title="Pullse Product Demo" />
              
              {/* Simple floating stats */}
              <div className="absolute -top-4 -right-4 glass-strong p-4 rounded-xl shadow-xl border-l-2 border-accent-teal">
                <div className="text-2xl font-bold text-accent-teal">87%</div>
                <div className="text-xs text-muted-foreground">Automation</div>
              </div>

              <div className="absolute -bottom-4 -left-4 glass-strong p-4 rounded-xl shadow-xl border-l-2 border-accent-green">
                <div className="text-2xl font-bold text-accent-green">+42%</div>
                <div className="text-xs text-muted-foreground">FCR Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Node Animation */}
      <section className="py-32 relative fade-in-scroll overflow-hidden">
        {/* Decorative background with color variety */}
        
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-teal/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-orange/10 rounded-full blur-3xl -z-10" />
        
        <div className="container mx-auto px-4">
          
          
          <div className="relative">
            {/* Glow effect behind animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent-teal/20 via-primary/20 to-accent-orange/20 rounded-3xl blur-2xl -z-10" />
            
            <div className="glass-strong p-8 rounded-3xl">
              <NodeAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* Taxonomy */}
      <section className="min-h-screen flex items-center py-20 fade-in-scroll relative overflow-hidden">
        {/* Background accents with variety */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-accent-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent-pink/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 space-y-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-accent-teal-light to-primary/10 border border-accent-teal/20 backdrop-blur-sm mb-4">
              <span className="text-sm font-semibold bg-gradient-to-r from-accent-teal to-primary bg-clip-text text-transparent">Complete Platform</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              What Pullse is
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need in one unified platform
            </p>
          </div>

          {/* Magic Bento Grid */}
          <MagicBento
            cardData={taxonomy}
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={400}
            particleCount={12}
            glowColor="132, 0, 255"
          />
        </div>
      </section>

      {/* Benefits Showcase */}
      <section className="py-32 fade-in-scroll relative overflow-hidden">
        {/* Background gradient orbs with variety */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent-pink/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-teal/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-accent-orange-light to-primary/10 border border-accent-orange/20 backdrop-blur-sm mb-6">
              <span className="text-sm font-semibold bg-gradient-to-r from-accent-orange to-primary bg-clip-text text-transparent">Real Impact</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Built for Results
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See the measurable impact across your support operations
            </p>
          </div>

          {/* Benefits Grid - Symmetrical & Sleek */}
          <ScrollStack 
            className="max-w-4xl mx-auto h-screen"
            itemDistance={150}
            itemStackDistance={80}
            baseScale={0.92}
            useWindowScroll={false}
          >
            {featureBento.map((feature, index) => {
            const Icon = feature.icon;
            const metrics = ['45%', '3.2x', '92%', '68%'];
            return <ScrollStackItem key={index} itemClassName="!h-[320px]">
                  {/* Main card with border gradient effect */}
                  <div className="relative h-full rounded-xl p-[1px] bg-gradient-to-br from-primary/20 to-accent/20 hover:from-primary/30 hover:to-accent/30 transition-all duration-300">
                    <div className="relative h-full rounded-xl bg-background/95 backdrop-blur-xl overflow-hidden flex flex-col">
                      {/* Top accent bar */}
                      <div className="h-0.5 w-full bg-gradient-to-r from-primary to-accent" />
                      
                      <div className="p-6 flex-1 flex flex-col">
                        {/* Icon & Metric Row */}
                        <div className="flex items-center justify-between mb-4">
                          <div className={`relative h-12 w-12 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300 ${
                            index === 0 ? 'bg-gradient-to-br from-accent-teal to-primary' :
                            index === 1 ? 'bg-gradient-to-br from-accent-orange to-primary' :
                            index === 2 ? 'bg-gradient-to-br from-accent-green to-primary' :
                            'bg-gradient-to-br from-accent-pink to-primary'
                          }`}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          
                          <div className="text-right">
                            <div className={`text-2xl font-black ${
                              index === 0 ? 'text-accent-teal' :
                              index === 1 ? 'text-accent-orange' :
                              index === 2 ? 'text-accent-green' :
                              'text-accent-pink'
                            }`}>
                              {metrics[index]}
                            </div>
                            <div className="text-[10px] text-muted-foreground uppercase tracking-wide">
                              Faster
                            </div>
                          </div>
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                          {feature.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                          {feature.desc}
                        </p>
                        
                        {/* Bottom CTA */}
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:gap-2 transition-all mt-4">
                          <span>Learn more</span>
                          <ArrowRight className="h-3 w-3" />
                        </div>
                      </div>
                      
                      {/* Subtle decorative glow */}
                      <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                </ScrollStackItem>;
          })}
          </ScrollStack>
        </div>
      </section>

      {/* Platform Overview - The whole desk in one view */}
      <PlatformOverview />

      {/* Solutions - Split Box Design */}
      <section className="py-32 fade-in-scroll relative overflow-hidden">
        {/* Animated background orbs with variety */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-orange/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-green/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-accent-green-light to-primary/10 border border-accent-green/20 backdrop-blur-sm mb-4">
              <span className="text-sm font-semibold bg-gradient-to-r from-accent-green to-primary bg-clip-text text-transparent">Built for Your Team</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Solutions that scale with you
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Select your team to see relevant capabilities
            </p>
          </div>

          {/* Single Box with Split Layout */}
          <div className="max-w-6xl mx-auto">
            <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-primary/30 via-accent/30 to-primary/30">
              <div className="relative rounded-3xl bg-background/95 backdrop-blur-xl overflow-hidden">
                <div className="grid md:grid-cols-[300px,1fr] min-h-[500px]">
                  
                  {/* Left Side - Options */}
                  <div className="border-r border-primary/10 bg-gradient-to-b from-primary/5 to-accent/5 p-6">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-6">Select Team</h3>
                    
                    <div className="space-y-2">
                      {Object.entries(solutions).map(([key, solution], index) => {
                        const isActive = activeSolution === key;
                        const icons = [Zap, Shield, Users, BarChart3];
                        const Icon = icons[index] || Users;
                        
                        return (
                          <button
                            key={key}
                            onClick={() => setActiveSolution(key as "b2b-saas" | "ecommerce" | "edtech" | "fintech")}
                            className={`w-full text-left p-4 rounded-xl transition-all duration-300 group ${
                              isActive 
                                ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg scale-[1.02]' 
                                : 'hover:bg-primary/5 hover:scale-[1.01]'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`h-10 w-10 rounded-lg flex items-center justify-center transition-all ${
                                isActive 
                                  ? 'bg-white/20' 
                                  : 'bg-gradient-to-br from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/20'
                              }`}>
                                <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-primary'}`} />
                              </div>
                              <div className="flex-1">
                                <div className={`font-semibold ${isActive ? 'text-white' : 'text-foreground'}`}>
                                  {solution.title}
                                </div>
                              </div>
                              <ArrowRight className={`h-4 w-4 transition-all ${
                                isActive ? 'text-white opacity-100' : 'text-primary opacity-0 group-hover:opacity-100'
                              }`} />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Side - Benefits & Use Cases */}
                  <div className="p-8 lg:p-12">
                    {Object.entries(solutions).map(([key, solution], index) => {
                      const isActive = activeSolution === key;
                      const icons = [Zap, Shield, Users, BarChart3];
                      const Icon = icons[index] || Users;
                      
                      if (!isActive) return null;
                      
                      return (
                        <div key={key} className="h-full flex flex-col animate-fade-in">
                          {/* Header */}
                          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-primary/10">
                            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25">
                              <Icon className="h-7 w-7 text-white" />
                            </div>
                            <div>
                              <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                {solution.title}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1">How Pullse drives results</p>
                            </div>
                          </div>

                          {/* Benefits Grid */}
                          <div className="flex-1 space-y-4 content-start">
                            {solution.items.map((item, i) => (
                              <div 
                                key={i}
                                className="group p-5 rounded-xl bg-gradient-to-br from-background to-primary/5 border border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all"
                                style={{ animationDelay: `${i * 50}ms` }}
                              >
                                <div className="flex items-start gap-4">
                                  {/* Number badge */}
                                  <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                                    <span className="text-sm font-bold text-white">{i + 1}</span>
                                  </div>
                                  
                                  <div className="flex-1 space-y-1">
                                    {/* Benefit - bold and prominent */}
                                    <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                                      {item.benefit}
                                    </h4>
                                    {/* Detail - supporting explanation */}
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                      {item.detail}
                                    </p>
                                  </div>

                                  {/* Arrow indicator */}
                                  <ArrowRight className="flex-shrink-0 h-5 w-5 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* CTA */}
                          <div className="mt-8 pt-6 border-t border-primary/10">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                              <div className="text-center sm:text-left">
                                <p className="text-sm font-semibold text-foreground">Ready to see it in action?</p>
                                <p className="text-xs text-muted-foreground">Get a personalized demo for {solution.title}</p>
                              </div>
                              <Button size="lg" className="group/btn" asChild>
                                <Link to="/contact-sales">
                                  Book a demo
                                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Ticker */}
      <section className="py-20 fade-in-scroll relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-accent-pink-light to-primary/10 border border-accent-pink/20 backdrop-blur-sm mb-6">
              <span className="text-sm font-semibold bg-gradient-to-r from-accent-pink to-primary bg-clip-text text-transparent">Trusted Partners</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Integrates with your stack
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect seamlessly with the tools you already use
            </p>
          </div>

          {/* Ticker container */}
          <div className="relative">
            {/* Gradient masks */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
            
            {/* Scrolling ticker */}
            <div className="overflow-hidden py-8">
              <div className="flex animate-scroll">
                {/* First set of logos */}
                {['Salesforce', 'Zendesk', 'Slack', 'HubSpot', 'Intercom', 'Shopify', 'Stripe', 'Microsoft', 'Google', 'Amazon', 'Atlassian', 'Twilio'].map((company, index) => <div key={`first-${index}`} className="flex-shrink-0 mx-6 w-40 h-24 glass-strong rounded-xl flex items-center justify-center hover:scale-105 transition-transform group">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-muted-foreground group-hover:text-primary transition-colors">
                        {company}
                      </div>
                    </div>
                  </div>)}
                {/* Duplicate set for seamless loop */}
                {['Salesforce', 'Zendesk', 'Slack', 'HubSpot', 'Intercom', 'Shopify', 'Stripe', 'Microsoft', 'Google', 'Amazon', 'Atlassian', 'Twilio'].map((company, index) => <div key={`second-${index}`} className="flex-shrink-0 mx-6 w-40 h-24 glass-strong rounded-xl flex items-center justify-center hover:scale-105 transition-transform group">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-muted-foreground group-hover:text-primary transition-colors">
                        {company}
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Plus 100+ more integrations
            </p>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Integrations */}
      

      {/* Trust & FAQ */}
      <section className="py-20 fade-in-scroll">
        
      </section>

      {/* Final CTA - Hero Style */}
      <section className="py-32 fade-in-scroll relative overflow-hidden">
        {/* Dramatic background with color variety */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/20 via-primary/20 to-accent-orange/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_100%)]" />
        
        {/* Animated orbs with variety */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent-teal/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-accent-orange/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Main CTA Card */}
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse" />
              
              <div className="relative glass-strong rounded-3xl p-12 md:p-16 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent-orange-light to-accent-teal-light border border-accent-orange/30 backdrop-blur-sm mb-8">
                  <Sparkles className="h-4 w-4 text-accent-orange animate-pulse" />
                  <span className="text-sm font-semibold bg-gradient-to-r from-accent-orange to-accent-teal bg-clip-text text-transparent">
                    Limited Design Partner Spots Available
                  </span>
                </div>

                {/* Headline */}
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                    Ship your first
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    automated resolution
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
                    in days, not months.
                  </span>
                </h2>

                {/* Subheadline */}
                <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
                  We'll map your top intents, wire your systems, and go live together. 
                  <span className="text-primary font-semibold"> Founder-led onboarding included.</span>
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <Button size="lg" className="text-lg px-10 py-7 glow group shadow-2xl shadow-primary/25" asChild>
                    <Link to="/contact-sales">
                      Book a demo
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg px-10 py-7 border-primary/30 hover:bg-primary/5" asChild>
                    <Link to="/pricing">
                      Request pricing
                    </Link>
                  </Button>
                </div>

                {/* Social Proof */}
                <div className="grid md:grid-cols-3 gap-8 pt-8 border-t border-primary/10">
                  <div className="space-y-2">
                    <div className="text-3xl font-bold bg-gradient-to-r from-accent-teal to-primary bg-clip-text text-transparent">
                      87%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Average automation rate
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold bg-gradient-to-r from-accent-orange to-primary bg-clip-text text-transparent">
                      &lt;2 weeks
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Time to first resolution
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold bg-gradient-to-r from-accent-green to-primary bg-clip-text text-transparent">
                      24/7
                    </div>
                    <div className="text-sm text-muted-foreground">
                      AI-powered coverage
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating trust indicators */}
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              {[
                { icon: Shield, text: "Enterprise-grade security", color: "accent-teal" },
                { icon: Zap, text: "Deploy in days, not quarters", color: "accent-orange" },
                { icon: CheckCircle2, text: "Cancel anytime", color: "accent-green" }
              ].map((item, i) => (
                <div 
                  key={i}
                  className="glass-strong p-4 rounded-xl flex items-center gap-3 hover:scale-105 transition-transform border-l-2"
                  style={{ 
                    animationDelay: `${i * 100}ms`,
                    borderLeftColor: `hsl(var(--${item.color}))`
                  }}
                >
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-${item.color} to-primary`}>
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default HomeNew;