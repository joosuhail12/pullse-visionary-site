// Server Component - no 'use client' directive
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";

// Import client islands
import ScrollProgressIndicator from "@/components/product-inbox/ScrollProgressIndicator";
import ProductAutoQAHeroBackground from "@/components/product-autoqa/ProductAutoQAHeroBackground";
import ProductAutoQAHeroSection from "@/components/product-autoqa/ProductAutoQAHeroSection";
import ProductAutoQABentoSection from "@/components/product-autoqa/ProductAutoQABentoSection";
import ProductAutoQAProcessSteps from "@/components/product-autoqa/ProductAutoQAProcessSteps";
import CoachingAccordion from "@/components/product-autoqa/CoachingAccordion";
import ProductAutoQAFinalCTA from "@/components/product-autoqa/ProductAutoQAFinalCTA";

// Import icons for static sections
import { Shield, Target, TrendingUp, Users, ThumbsUp } from "lucide-react";

const ProductAutoQA = () => {
  return (
    <div className="min-h-screen relative">
      <PageLiquidBackground opacity={0.45} />
      <Navigation />

      {/* Scroll Progress Indicator - Client Component */}
      <ScrollProgressIndicator />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] lg:min-h-screen flex items-center overflow-hidden pt-16 md:pt-20">
        {/* Static background layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_50%)]" />

        {/* Hero Liquid Ether Effect - Client Component */}
        <ProductAutoQAHeroBackground />

        <div className="container relative mx-auto">
          {/* Hero Content - Client Component */}
          <ProductAutoQAHeroSection />
        </div>
      </section>

      {/* Quick Value Props Section */}
      <section className="relative py-10 md:py-16 lg:py-20 bg-gradient-to-b from-muted/10 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
              <div className="group relative p-4 md:p-5 lg:p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="flex h-10 w-10 md:h-11 md:w-11 lg:h-12 lg:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-600 shadow-lg mb-3 md:mb-3.5 lg:mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="h-5 w-5 md:h-5.5 md:w-5.5 lg:h-6 lg:w-6 text-background" />
                </div>
                <h3 className="text-base md:text-lg font-bold mb-1.5 md:mb-2 group-hover:text-primary transition-colors">
                  No More Sampling
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  QA every single conversation, not just 5%. Zero blind spots.
                </p>
              </div>
              <div className="group relative p-4 md:p-5 lg:p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="flex h-10 w-10 md:h-11 md:w-11 lg:h-12 lg:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-600 shadow-lg mb-3 md:mb-3.5 lg:mb-4 group-hover:scale-110 transition-transform">
                  <Target className="h-5 w-5 md:h-5.5 md:w-5.5 lg:h-6 lg:w-6 text-background" />
                </div>
                <h3 className="text-base md:text-lg font-bold mb-1.5 md:mb-2 group-hover:text-primary transition-colors">
                  Surgical Precision
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  AI identifies exact message where rep could improve—with suggested phrasing.
                </p>
              </div>
              <div className="group relative p-4 md:p-5 lg:p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="flex h-10 w-10 md:h-11 md:w-11 lg:h-12 lg:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-600 shadow-lg mb-3 md:mb-3.5 lg:mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-5 w-5 md:h-5.5 md:w-5.5 lg:h-6 lg:w-6 text-background" />
                </div>
                <h3 className="text-base md:text-lg font-bold mb-1.5 md:mb-2 group-hover:text-primary transition-colors">
                  See the Trajectory
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  Every scorecard shows trend lines. Is empathy improving? Response time getting faster?
                </p>
              </div>
              <div className="group relative p-4 md:p-5 lg:p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="flex h-10 w-10 md:h-11 md:w-11 lg:h-12 lg:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-600 shadow-lg mb-3 md:mb-3.5 lg:mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-5 w-5 md:h-5.5 md:w-5.5 lg:h-6 lg:w-6 text-background" />
                </div>
                <h3 className="text-base md:text-lg font-bold mb-1.5 md:mb-2 group-hover:text-primary transition-colors">
                  Built-In Fairness
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  Reps can dispute any score. Supervisors review, adjust, and provide context.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid - Core Features */}
      <section className="relative py-10 md:py-16 lg:py-20">
        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Bento Section - Client Component */}
            <ProductAutoQABentoSection />
          </div>
        </div>
      </section>

      {/* How It Works - Process Flow */}
      <section className="relative py-10 md:py-16 lg:py-20 overflow-hidden bg-gradient-to-b from-background via-muted/10 to-background">
        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Process Steps - Client Component */}
            <ProductAutoQAProcessSteps />
          </div>
        </div>
      </section>

      {/* Coaching & Feedback Section */}
      <section className="relative py-10 md:py-16 lg:py-20 overflow-hidden bg-gradient-to-b from-muted/10 via-background to-background">
        <div className="container relative mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-6 md:gap-9 lg:gap-12 items-center">
              <div className="space-y-4 md:space-y-6 lg:space-y-8">
                <div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 md:mb-4">
                    QA that feels like
                    <br />
                    coaching, not critique
                  </h2>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Traditional QA feels punitive—random spot checks, subjective scores, no recourse. Auto-QA is different. Every score is explainable. Every rep can dispute. Every trend line shows progress. It's QA designed for growth, not gotchas.
                  </p>
                </div>

                <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <div className="flex h-9 w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-600 shadow-lg">
                    <ThumbsUp className="h-4.5 w-4.5 md:h-5 md:w-5 text-background" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm font-medium mb-1">Reps Have a Voice</p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Disagree with a score? Click dispute, add context, and request supervisor review. Fair, transparent, and built into every scorecard.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                {/* Coaching Accordion - Client Component */}
                <CoachingAccordion />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section - Ultra Modern */}
      <section className="relative py-16 md:py-28 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/10 to-background" />

        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="max-w-5xl mx-auto">
            {/* Final CTA - Client Component */}
            <ProductAutoQAFinalCTA />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductAutoQA;
