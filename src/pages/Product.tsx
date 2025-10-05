import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare, Workflow, Bot, Brain, BarChart3, CheckCircle, Database } from "lucide-react";
import { Button } from "@/components/ui/button";

const Product = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "Unified Inbox & Channels",
      description: "Manage email, live chat, and all customer conversations in one powerful interface.",
      link: "/product/inbox-channels",
    },
    {
      icon: Workflow,
      title: "Visual Workflows & Routing",
      description: "Design complex automation flows with our drag-and-drop workflow builder.",
      link: "/product/workflows-routing",
    },
    {
      icon: Bot,
      title: "AI Suite",
      description: "Deploy intelligent chatbots and AI copilot for automated customer support.",
      link: "/product/ai-suite",
    },
    {
      icon: Brain,
      title: "AI Engine",
      description: "Advanced model orchestration, RAG, and API-connected actions for real results.",
      link: "/product/ai-engine",
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      description: "Comprehensive dashboards tracking volumes, resolution rates, and team performance.",
      link: "/product/analytics",
    },
    {
      icon: CheckCircle,
      title: "Auto-QA",
      description: "Automated quality assurance with custom rubrics and coaching insights.",
      link: "/product/auto-qa",
    },
    {
      icon: Database,
      title: "Knowledge Bases",
      description: "Centralized knowledge management powered by Appo for instant answers.",
      link: "/product/knowledge-bases",
    },
  ];

  return (
    <div className="min-h-screen">
      <PageLiquidBackground opacity={0.3} />
      <Navigation />

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Product Overview
            </h1>
            <p className="text-xl text-muted-foreground">
              A complete platform that unifies conversations, automates workflows, and delivers intelligent customer experiences.
            </p>
          </div>

          {/* How it Works */}
          <div className="glass-strong p-12 rounded-3xl mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {["Channels", "Inbox", "Workflows", "AI Actions", "QA", "Analytics"].map((step, index) => (
                <div key={step} className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {index + 1}
                  </div>
                  <span className="font-medium">{step}</span>
                  {index < 5 && <ArrowRight className="h-5 w-5 text-muted-foreground ml-2" />}
                </div>
              ))}
            </div>
            <p className="text-center text-muted-foreground max-w-3xl mx-auto">
              Connect your channels → Manage in unified inbox → Route with workflows → Automate with AI → Monitor quality → Analyze performance
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="glass-strong p-8 rounded-2xl hover:scale-105 transition-all duration-300 group"
              >
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <div className="flex items-center text-primary group-hover:gap-2 transition-all">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-20 text-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link to="/contact-sales">
                Book a Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Product;
