import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Bot, Zap, BarChart3, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ThreeScene from "@/components/ThreeScene";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animations
    if (heroRef.current) {
      gsap.from(heroRef.current.querySelectorAll(".hero-text"), {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }

    // Features scroll animations
    if (featuresRef.current) {
      gsap.from(featuresRef.current.querySelectorAll(".feature-card"), {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }
  }, []);

  const features = [
    {
      icon: Bot,
      title: "AI-Powered Automation",
      description: "Intelligent chatbots and copilot that handle routine queries with human-like precision.",
    },
    {
      icon: Zap,
      title: "Visual Workflows",
      description: "Build complex routing and automation flows with our intuitive drag-and-drop designer.",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Deep insights into customer interactions, team performance, and automation coverage.",
    },
  ];

  const benefits = [
    "Unified inbox across all channels",
    "AI-powered smart replies and summaries",
    "Visual workflow designer",
    "Real-time collaboration tools",
    "Auto-QA with custom rubrics",
    "Knowledge base integration",
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <ThreeScene />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background z-10"></div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="hero-text inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">AI-Powered Customer Support</span>
            </div>
            
            <h1 className="hero-text text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Support That Scales
              <span className="block bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent">
                With Intelligence
              </span>
            </h1>
            
            <p className="hero-text text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Unify all customer conversations, automate with AI, and deliver exceptional support experiences at scale.
            </p>
            
            <div className="hero-text flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90" asChild>
                <Link to="/contact-sales">
                  Book a Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 glass" asChild>
                <Link to="/product">Explore Features</Link>
              </Button>
            </div>

            {/* Social Proof */}
            <div className="hero-text mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A complete platform to manage, automate, and optimize your customer support operations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card glass-strong p-8 rounded-2xl hover:scale-105 transition-all duration-300 group"
              >
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="glass-strong p-12 rounded-3xl max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">
                  Built for Modern Teams
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  From startups to enterprises, Pullse adapts to your workflow with powerful features that grow with you.
                </p>
                <Button size="lg" asChild>
                  <Link to="/solutions">
                    Explore Solutions
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-lg glass hover:glass-strong transition-all"
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="glass-strong p-12 rounded-3xl text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Transform Your Support?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join hundreds of teams delivering exceptional customer experiences with Pullse.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90" asChild>
                <Link to="/contact-sales">
                  Book a Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 glass" asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
