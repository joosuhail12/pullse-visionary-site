import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Shield, Users, Zap, BarChart3, Bot, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import VideoEmbed from "@/components/VideoEmbed";
import NodeAnimation from "@/components/NodeAnimation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HomeNew = () => {
  const [activeSolution, setActiveSolution] = useState("b2b-saas");

  useEffect(() => {
    // Animate elements on scroll
    gsap.utils.toArray<HTMLElement>(".fade-in-scroll").forEach((elem) => {
      gsap.from(elem, {
        scrollTrigger: {
          trigger: elem,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    });
  }, []);

  const taxonomy = [
    {
      title: "Helpdesk (Unified Inbox)",
      desc: "One place for email & chat with SLAs, assignments, and full context.",
    },
    {
      title: "Automations (Workflows)",
      desc: "Visual routing, tagging, SLAs, escalations.",
    },
    {
      title: "AI Suite — Chatbots & Copilot",
      desc: "Deflect known intents; draft, summarize, translate.",
    },
    {
      title: "AI Agents (actions)",
      desc: "Refunds, plan changes, order status—with guardrails & audit trails.",
    },
    {
      title: "Auto-QA",
      desc: "Score 100% of conversations for accuracy, empathy, policy.",
    },
    {
      title: "Analytics",
      desc: "Coverage by intent, actioned vs. deflected, FCR, AHT in one view.",
    },
  ];

  const featureBento = [
    {
      title: "Fewer back-and-forths",
      desc: "First-contact resolutions rise; exceptions get clean handoffs.",
      icon: MessageSquare,
    },
    {
      title: "Faster agents",
      desc: "Suggested replies, instant summaries, one-click follow-ups.",
      icon: Zap,
    },
    {
      title: "Consistency by default",
      desc: "Workflows keep ops predictable; Auto-QA raises the floor.",
      icon: CheckCircle2,
    },
    {
      title: "Outcomes you can prove",
      desc: "Automation coverage, intent trends, and actioned vs. deflected in one view.",
      icon: BarChart3,
    },
  ];

  const solutions = {
    "b2b-saas": {
      title: "B2B SaaS",
      items: ["Plan changes & billing", "Provisioning/SSO", "Usage/quota tracking", "Incident comms"],
    },
    ecommerce: {
      title: "Ecommerce",
      items: ["WISMO/status updates", "Returns & exchanges", "Refunds & loyalty", "Order tracking"],
    },
    "head-of-support": {
      title: "Head of Support",
      items: ["CSAT tracking", "First-contact resolution", "Average handle time", "Team performance"],
    },
    "ops-lead": {
      title: "Ops Lead",
      items: ["Coverage by intent", "SLA compliance", "Automation metrics", "Workflow optimization"],
    },
    "cto-ciso": {
      title: "CTO/CISO",
      items: ["Security policies", "Audit trails", "Data handling", "Trust Center access"],
    },
  };

  const integrations = [
    { name: "Stripe", capabilities: ["Read", "Write", "Actions"] },
    { name: "Salesforce", capabilities: ["Read", "Write"] },
    { name: "Shopify", capabilities: ["Read", "Write", "Actions"] },
    { name: "HubSpot", capabilities: ["Read", "Write"] },
    { name: "Zendesk", capabilities: ["Read"] },
    { name: "Slack", capabilities: ["Read", "Write"] },
  ];

  const faqs = [
    {
      q: "Do we have to change our process?",
      a: "No—Pullse connects to your stack and removes manual steps.",
    },
    {
      q: "Who decides what gets automated?",
      a: "You do. Agents act only within approved guardrails.",
    },
    {
      q: "Are workflows writing to systems?",
      a: "Workflows run ticket ops; AI Agents perform the account actions you authorize.",
    },
    {
      q: "How fast to value?",
      a: "Start with top intents, wire 2–3 systems, measure from week one.",
    },
    {
      q: "Pricing?",
      a: "One plan, all capabilities. Request pricing.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            {/* Left - Copy */}
            <div className="fade-in-scroll">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                AI support that doesn't just reply — <span className="text-primary">it acts.</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Endless tickets, manual work, disconnected tools? Pullse unifies every message, automates the busywork, and lets AI answer and take real actions—while your team stays in control.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="text-lg px-8 py-6 glow" asChild>
                  <Link to="/contact-sales">
                    Book a demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
                  <Link to="/pricing">Request pricing</Link>
                </Button>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Founder-led onboarding
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Design-partner seats open
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Enterprise-grade controls
                </div>
              </div>
            </div>

            {/* Right - Video */}
            <div className="fade-in-scroll">
              <VideoEmbed videoId="ceBpscp6jIY" title="Pullse Product Demo" />
            </div>
          </div>
        </div>
      </section>

      {/* Node Animation */}
      <section className="py-20 relative fade-in-scroll">
        <div className="container mx-auto px-4">
          <div className="glass-strong rounded-3xl p-8 overflow-hidden">
            <NodeAnimation />
          </div>
        </div>
      </section>

      {/* Taxonomy */}
      <section className="py-20 fade-in-scroll">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What Pullse is</h2>
            <p className="text-xl text-muted-foreground">10-second taxonomy</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {taxonomy.map((item, index) => (
              <div key={index} className="glass-strong p-6 rounded-xl hover:scale-105 transition-all">
                <h3 className="font-bold mb-2 text-primary">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Bento */}
      <section className="py-20 fade-in-scroll">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">Built for Results</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {featureBento.map((feature, index) => (
              <div key={index} className="glass-strong p-8 rounded-2xl group hover:glow transition-all">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Tabs */}
      <section className="py-20 fade-in-scroll">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">Solutions for Every Team</h2>
          </div>

          <Tabs value={activeSolution} onValueChange={setActiveSolution} className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-5 glass-strong p-1 mb-8">
              <TabsTrigger value="b2b-saas">B2B SaaS</TabsTrigger>
              <TabsTrigger value="ecommerce">Ecommerce</TabsTrigger>
              <TabsTrigger value="head-of-support">Head of Support</TabsTrigger>
              <TabsTrigger value="ops-lead">Ops Lead</TabsTrigger>
              <TabsTrigger value="cto-ciso">CTO/CISO</TabsTrigger>
            </TabsList>

            {Object.entries(solutions).map(([key, solution]) => (
              <TabsContent key={key} value={key}>
                <div className="glass-strong p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold mb-6">{solution.title}</h3>
                  <ul className="grid md:grid-cols-2 gap-4">
                    {solution.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Analytics Preview */}
      <section className="py-20 fade-in-scroll">
        <div className="container mx-auto px-4">
          <div className="glass-strong p-12 rounded-3xl max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-center">See what's driving resolution</h2>
            <p className="text-center text-muted-foreground mb-12">Real-time insights into automation and outcomes</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl">
                <div className="text-4xl font-bold text-primary mb-2">87%</div>
                <div className="text-sm text-muted-foreground">Automation coverage</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl">
                <div className="text-4xl font-bold text-primary mb-2">+42%</div>
                <div className="text-sm text-muted-foreground">First-contact resolution</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl">
                <div className="text-4xl font-bold text-primary mb-2">-35%</div>
                <div className="text-sm text-muted-foreground">Average handle time</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl">
                <div className="text-4xl font-bold text-primary mb-2">94%</div>
                <div className="text-sm text-muted-foreground">Copilot adoption</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 fade-in-scroll">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Connect your stack. Extend with actions.</h2>
            <p className="text-muted-foreground">See exactly where Pullse can safely take write-ops</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
            {integrations.map((integration, index) => (
              <div key={index} className="glass-strong p-6 rounded-xl text-center hover:scale-105 transition-all">
                <div className="font-bold mb-3">{integration.name}</div>
                <div className="flex flex-wrap gap-1 justify-center">
                  {integration.capabilities.map((cap) => (
                    <span
                      key={cap}
                      className={`text-xs px-2 py-1 rounded ${
                        cap === "Actions"
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & FAQ */}
      <section className="py-20 fade-in-scroll">
        <div className="container mx-auto px-4">
          {/* Trust Strip */}
          <div className="glass-strong p-8 rounded-2xl mb-12 max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="font-medium">SSO/SAML</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="font-medium">RBAC</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="font-medium">Audit trails</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="font-medium">Data handling</span>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="glass-strong p-6 rounded-xl">
                  <h4 className="font-bold mb-2">{faq.q}</h4>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 fade-in-scroll">
        <div className="container mx-auto px-4">
          <div className="glass-strong p-12 rounded-3xl text-center max-w-3xl mx-auto glow">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ship your first automated resolution in days.
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              We'll map your top intents, connect systems, and go live together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <Link to="/contact-sales">
                  Book a demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
                <Link to="/pricing">Request pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomeNew;
