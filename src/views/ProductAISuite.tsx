// Server Component - no 'use client' directive
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import RouteButton from "@/components/RouteButton";
import Image from "next/image";
import aiToolsScreenshot from "@/assets/ai-tools-screenshot.webp";
import SoftwareApplicationSchema from "@/components/structured-data/SoftwareApplicationSchema";
import {
  Bot,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Zap,
  Database,
  Layers,
  RefreshCw,
  Play,
  Star,
} from "lucide-react";

// Import client islands
import ScrollProgressIndicator from "@/components/product-inbox/ScrollProgressIndicator";
import ProductAISuiteHeroBackground from "@/components/product-ai-suite/ProductAISuiteHeroBackground";
import AIToolsBentoSection from "@/components/product-ai-suite/AIToolsBentoSection";
import DeploymentModesSection from "@/components/product-ai-suite/DeploymentModesSection";
import UseCasesSection from "@/components/product-ai-suite/UseCasesSection";
import InfrastructureSection from "@/components/product-ai-suite/InfrastructureSection";
import ProductAISuiteFinalCTA from "@/components/product-ai-suite/ProductAISuiteFinalCTA";

const ProductAISuite = () => {

  return (
    <div className="min-h-screen relative bg-background text-foreground">
      <SoftwareApplicationSchema
        name="Pullse AI Suite"
        description="Complete AI platform with six powerful tools for customer support - from chatbots to agent copilots, automated QA to intelligent summaries. All trained on your content, all working in harmony."
      />
      <PageLiquidBackground opacity={0.45} />
      <ScrollProgressIndicator />
      <Navigation />

      <main id="main-content" role="main" className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] md:min-h-[80vh] lg:min-h-screen flex items-center pt-16 pb-12 md:pt-24 md:pb-18 lg:pt-32 lg:pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_50%)]" />

          <ProductAISuiteHeroBackground />

          <div className="container mx-auto px-6 relative">
            <div className="text-center max-w-6xl mx-auto space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-4">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Complete AI Platform</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-foreground leading-[1.05] tracking-tight">
                One AI engine.
                <span className="block bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-gradient mt-2">
                  Six powerful tools.
                </span>
              </h1>

              <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                From customer-facing chatbots to agent copilots, automated QA to intelligent summaries. All trained on your content, all working in harmony.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <RouteButton size="lg" href="/contact-sales" className="text-base px-8 py-5 md:px-9 md:py-6 lg:px-10 lg:py-7 shadow-2xl shadow-primary/30 group">
                  See it live
                  <Play className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                </RouteButton>
                <RouteButton size="lg" variant="outline" href="/pricing" className="text-base px-8 py-5 md:px-9 md:py-6 lg:px-10 lg:py-7">
                  View pricing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </RouteButton>
              </div>

              {/* Trust Signals */}
              <div className="flex flex-wrap gap-6 justify-center items-center pt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>6 AI tools</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>One training process</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <span>Built for teams that demand excellence</span>
                </div>
              </div>
            </div>

            {/* Hero Screenshot */}
            <div className="relative max-w-6xl mx-auto mt-10 md:mt-12 lg:mt-16">
              {/* Glow effect */}
              <div className="absolute -inset-12 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-3xl opacity-60" />

              {/* Main screenshot card */}
              <div className="relative rounded-3xl border border-border/50 bg-gradient-to-br from-card/95 via-card to-card/90 p-2 sm:p-3 shadow-2xl backdrop-blur-xl">
                <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted/30 border border-border/30">
                  <Image
                    src={aiToolsScreenshot}
                    alt="Pullse AI Suite Dashboard"
                    className="w-full"
                    priority
                  />
                </div>
              </div>

              {/* Floating stat badges */}
              <div className="absolute -left-4 top-1/4 hidden lg:block">
                <div className="rounded-2xl border border-border/60 bg-card/95 p-5 shadow-xl backdrop-blur-xl animate-float">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 md:h-11 lg:h-12 md:w-11 lg:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-600 shadow-lg">
                      <Bot className="h-5 w-5 md:h-5.5 lg:h-6 md:w-5.5 lg:w-6 text-background" />
                    </div>
                    <div>
                      <div className="text-2xl font-black bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">87%</div>
                      <div className="text-xs text-muted-foreground">Deflection</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 top-1/3 hidden lg:block">
                <div className="rounded-2xl border border-border/60 bg-card/95 p-5 shadow-xl backdrop-blur-xl animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 md:h-11 lg:h-12 md:w-11 lg:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg">
                      <Sparkles className="h-5 w-5 md:h-5.5 lg:h-6 md:w-5.5 lg:w-6 text-background" />
                    </div>
                    <div>
                      <div className="text-2xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">100%</div>
                      <div className="text-xs text-muted-foreground">QA Coverage</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* All 6 AI Tools - MagicBento */}
        <section className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-b from-muted/10 to-transparent">
          <div className="container mx-auto px-6">
            <div className="text-center mb-10 md:mb-12 lg:mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-4">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Complete AI Suite</span>
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-4">
                Six tools, one platform
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                Everything you need to deploy intelligent AI across your support operations.
              </p>
            </div>

            <AIToolsBentoSection />

            {/* Quick Feature Highlights */}
            <div className="grid md:grid-cols-3 gap-4 md:gap-5 lg:gap-6 max-w-5xl mx-auto">
              <div className="group p-5 md:p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 text-center">
                <div className="flex h-10 w-10 md:h-11 lg:h-12 md:w-11 lg:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-600 shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Database className="h-5 w-5 md:h-5.5 lg:h-6 md:w-5.5 lg:w-6 text-background" />
                </div>
                <h4 className="font-bold mb-2 group-hover:text-primary transition-colors">One Content Center</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Train once, deploy everywhere. All tools share the same knowledge base.
                </p>
              </div>

              <div className="group p-5 md:p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 text-center">
                <div className="flex h-10 w-10 md:h-11 lg:h-12 md:w-11 lg:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <RefreshCw className="h-5 w-5 md:h-5.5 lg:h-6 md:w-5.5 lg:w-6 text-background" />
                </div>
                <h4 className="font-bold mb-2 group-hover:text-primary transition-colors">Continuous Improvement</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Every conversation makes every tool smarter. No data silos.
                </p>
              </div>

              <div className="group p-5 md:p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 text-center">
                <div className="flex h-10 w-10 md:h-11 lg:h-12 md:w-11 lg:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-primary shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Layers className="h-5 w-5 md:h-5.5 lg:h-6 md:w-5.5 lg:w-6 text-background" />
                </div>
                <h4 className="font-bold mb-2 group-hover:text-primary transition-colors">Flexible Deployment</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Start with one tool, add more anytime. Deploy incrementally or all at once.
                </p>
              </div>
            </div>
          </div>
        </section>

        <DeploymentModesSection />

        <UseCasesSection />


        <InfrastructureSection />
        {/* Final CTA - Ultra Modern */}
        <section className="relative py-20 md:py-32 lg:py-40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/10 to-background" />

          {/* Animated background gradients */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div className="container mx-auto px-6 relative">
            <div className="max-w-5xl mx-auto">
              <div className="relative rounded-3xl border border-primary/30 bg-gradient-to-br from-card/50 via-background/30 to-card/50 backdrop-blur-2xl p-8 md:p-12 lg:p-16 shadow-2xl text-center overflow-hidden">
                {/* Background glow */}
                <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/30 via-purple-600/30 to-indigo-600/30 opacity-50 blur-2xl" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.15),transparent_70%)]" />

                <div className="relative">
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-6 md:mb-8 leading-tight">
                    Ready to deploy AI that{" "}
                    <span className="bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                      actually works?
                    </span>
                  </h2>

                  <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 md:mb-10 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
                    Book a personalized demo and see how the AI Suite can <span className="font-bold text-foreground">transform your support operations</span>—from deflection to acceleration, QA to insights.
                  </p>

                  <ProductAISuiteFinalCTA />

                  {/* Social proof */}
                  <div className="flex flex-wrap items-center justify-center gap-5 md:gap-6 lg:gap-8 pt-6 md:pt-7 lg:pt-8 border-t border-border/30">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                      <span className="text-xs md:text-sm font-bold text-muted-foreground">14-day trial</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                      <span className="text-xs md:text-sm font-bold text-muted-foreground">No credit card required</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                      <span className="text-xs md:text-sm font-bold text-muted-foreground">5-minute setup</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductAISuite;
