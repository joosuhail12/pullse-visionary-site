'use client';

import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Play,
  CheckCircle2,
  ArrowRight,
  Inbox,
  Workflow,
  Bot,
  Users,
  LineChart,
  BookOpen,
  Sparkles,
  MessageSquare,
  Zap,
  Shield,
  Clock,
} from "lucide-react";

const ProductTour = () => {
  const [currentSection, setCurrentSection] = useState<number>(0);

  // Tour sections
  const tourSections = [
    {
      id: 1,
      icon: Inbox,
      color: "from-blue-500 to-cyan-500",
      title: "Unified Inbox & Channels",
      subtitle: "All Conversations in One Place",
      description: "Connect email, chat, social media, and more. Every customer message flows into a single, intelligent inbox.",
      features: [
        "Omnichannel inbox with unified view",
        "Smart conversation threading",
        "Real-time collaboration tools",
        "Custom channel integrations",
      ],
      demo: "See how messages from Slack, email, and chat arrive in one organized workspace",
    },
    {
      id: 2,
      icon: Workflow,
      color: "from-purple-500 to-pink-500",
      title: "Intelligent Workflows & Routing",
      subtitle: "Automation that Adapts",
      description: "Route conversations to the right team instantly. Automate repetitive tasks and let AI handle the routine work.",
      features: [
        "Smart routing based on intent and priority",
        "Custom automation workflows",
        "SLA tracking and enforcement",
        "Escalation rules and triggers",
      ],
      demo: "Watch conversations auto-route to sales, support, or technical teams based on content",
    },
    {
      id: 3,
      icon: Bot,
      color: "from-emerald-500 to-teal-500",
      title: "AI Engine & Chatbots",
      subtitle: "Autonomous Support that Learns",
      description: "Deploy AI agents that resolve tickets independently. From simple FAQs to complex multi-step actions.",
      features: [
        "Autonomous resolution with confidence scoring",
        "Multi-step problem solving",
        "Tool execution and API calls",
        "Continuous learning from interactions",
      ],
      demo: "See AI handle password resets, refunds, and plan changes—all without human intervention",
    },
    {
      id: 4,
      icon: Users,
      color: "from-orange-500 to-amber-500",
      title: "Copilot for Your Team",
      subtitle: "AI-Powered Agent Assist",
      description: "Real-time suggestions, instant drafts, and context-aware help. Your team works faster with AI backup.",
      features: [
        "Real-time reply suggestions",
        "Sentiment analysis and tone detection",
        "Knowledge base auto-search",
        "Translation and summarization",
      ],
      demo: "Watch agents get instant suggestions, summaries, and the perfect reply—right when they need it",
    },
    {
      id: 5,
      icon: LineChart,
      color: "from-violet-500 to-purple-500",
      title: "Analytics & Auto QA",
      subtitle: "Data-Driven Excellence",
      description: "Track every metric that matters. Auto-QA scores conversations, coaches your team, and reveals improvement opportunities.",
      features: [
        "Real-time performance dashboards",
        "Automated quality scoring",
        "Team coaching insights",
        "Customer satisfaction tracking",
      ],
      demo: "See live dashboards showing resolution times, CSAT scores, and AI performance metrics",
    },
    {
      id: 6,
      icon: BookOpen,
      color: "from-rose-500 to-red-500",
      title: "Appo Help Centers",
      subtitle: "Self-Service at Scale",
      description: "Build beautiful, branded help centers powered by AI. Customers find answers instantly, reducing ticket volume.",
      features: [
        "AI-powered search and recommendations",
        "Custom branding and domains",
        "Multi-language support",
        "Real-time content updates",
      ],
      demo: "Explore a fully customized help center with instant AI answers and guided troubleshooting",
    },
  ];

  // Scroll to section handler
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const sectionHeight = windowHeight * 0.8;
      const newSection = Math.floor((scrollPosition - windowHeight) / sectionHeight);
      setCurrentSection(Math.max(0, Math.min(newSection, tourSections.length - 1)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tourSections.length]);

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <PageLiquidBackground />

      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 mb-6">
              <Play className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                Interactive Product Tour
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent">
                See Pullse
                <br />
                in Action
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Take an interactive journey through Pullse's unified customer support platform.
              <br />
              From inbox to insights—see how it all works together.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact-sales"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary via-purple-500 to-purple-600 text-white font-bold shadow-lg hover:shadow-xl transition-all"
              >
                <span>Request Live Demo</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/pricing"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-gray-300 text-gray-700 font-semibold hover:border-primary hover:text-primary transition-all"
              >
                <span>View Pricing</span>
              </Link>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { icon: Zap, label: "60% Faster Resolutions", color: "text-yellow-600" },
              { icon: Shield, label: "99.9% Uptime SLA", color: "text-green-600" },
              { icon: Clock, label: "24/7 AI Support", color: "text-blue-600" },
              { icon: CheckCircle2, label: "SOC 2 Certified", color: "text-purple-600" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <stat.icon className={`h-8 w-8 ${stat.color} mb-3`} />
                <p className="text-sm font-semibold text-gray-900">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Scrollytelling Tour Sections */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent">
                The Complete Platform
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Six powerful products working together as one unified system
            </p>
          </div>

          {/* Tour Steps */}
          <div className="space-y-32">
            {tourSections.map((section, idx) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  idx % 2 === 0 ? '' : 'lg:grid-flow-col-dense'
                }`}
              >
                {/* Content */}
                <div className={idx % 2 === 0 ? '' : 'lg:col-start-2'}>
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${section.color} flex items-center justify-center shadow-lg`}>
                      <section.icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="text-sm font-bold text-gray-500">
                      Step {section.id}
                    </div>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                    {section.title}
                  </h3>
                  <p className="text-lg font-semibold text-primary mb-4">
                    {section.subtitle}
                  </p>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    {section.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    {section.features.map((feature, featureIdx) => (
                      <div key={featureIdx} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Demo Note */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
                    <div className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-blue-900 mb-1">
                          In the Demo:
                        </p>
                        <p className="text-sm text-blue-700">
                          {section.demo}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visual Placeholder */}
                <div className={idx % 2 === 0 ? '' : 'lg:col-start-1 lg:row-start-1'}>
                  <div className={`relative aspect-video rounded-3xl bg-gradient-to-br ${section.color} p-1 shadow-2xl`}>
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent" />
                    <div className="relative h-full rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center overflow-hidden">
                      {/* Placeholder for screenshot/demo */}
                      <div className="text-center p-8">
                        <section.icon className="h-20 w-20 text-white/40 mx-auto mb-4" />
                        <p className="text-white/60 text-sm font-medium">
                          Screenshot placeholder
                        </p>
                        <p className="text-white/40 text-xs mt-2">
                          Demo interface for {section.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl bg-gradient-to-br from-primary via-purple-500 to-purple-600 p-12 text-center shadow-2xl overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:24px_24px]" />
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Transform Your Support?
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Schedule a personalized demo and see how Pullse can revolutionize your customer support operations.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact-sales"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-primary font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>Talk to Sales</span>
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-primary transition-all"
                >
                  <span>See Pricing</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductTour;
