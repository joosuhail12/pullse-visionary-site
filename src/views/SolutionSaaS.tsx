import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import ScrollProgressIndicator from "@/components/product-inbox/ScrollProgressIndicator";
import SolutionSaaSHeroSection from "@/components/solutions/SolutionSaaSHeroSection";
import SolutionSaaSPillarsSection from "@/components/solutions/SolutionSaaSPillarsSection";
import SolutionSaaSIntegrationsSection from "@/components/solutions/SolutionSaaSIntegrationsSection";
import VisualWorkflowRace from "@/components/solutions/VisualWorkflowRace";
import SolutionSaaSWorkflowsSection from "@/components/solutions/SolutionSaaSWorkflowsSection";
import RouteButton from "@/components/RouteButton";
import RoiCalculator from "@/components/RoiCalculator";
import {
  CheckCircle2,
  Shield,
  Zap,
  Sparkles,
} from "lucide-react";

const SolutionSaaS = () => {
  return (
    <div className="min-h-screen">
      <PageLiquidBackground opacity={0.45} />
      <Navigation />
      <ScrollProgressIndicator />

      <main id="main-content" role="main">
        <SolutionSaaSHeroSection />

      <SolutionSaaSPillarsSection />

      <VisualWorkflowRace />

      <SolutionSaaSWorkflowsSection />

      <SolutionSaaSIntegrationsSection />

      {/* ROI Calculator Section */}
      <section className="relative py-16 md:py-20 lg:py-24 xl:py-32 overflow-hidden">
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            {/* Header */}
            <div className="text-center mb-8 md:mb-10 lg:mb-12 space-y-4 md:space-y-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
                See your savings in 60 seconds
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
                Calculate exactly how much Pullse saves your team with 70% automation and 20x faster execution
              </p>
            </div>

            {/* Calculator Card */}
            <div className="relative overflow-hidden rounded-[28px] border-2 border-primary/30 bg-gradient-to-br from-card via-card to-card/90 p-8 md:p-12 shadow-2xl backdrop-blur-sm">
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />

              <div className="relative z-10">
                <RoiCalculator />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-16 md:py-20 lg:py-24 xl:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.15),transparent_60%)]" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl border-2 border-primary/40 bg-gradient-to-br from-card via-card to-card/90 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.1),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--primary)/0.1),transparent_50%)]" />

              <div className="relative p-12 lg:p-16 z-10">
                <div className="text-center space-y-10">
                  <div className="space-y-6">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                      Transform your support team today
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                      Connect your stack and start executing actions instantly. Just ask—our AI handles the rest across your entire tech stack.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <RouteButton size="lg" className="text-base px-10 py-6 shadow-xl shadow-primary/20" href="/pricing">
                      Pricing
                    </RouteButton>
                    <RouteButton size="lg" variant="outline" className="text-base px-10 py-6 border border-border/40 hover:border-primary/40" href="/contact-sales">
                      Contact Sales
                    </RouteButton>
                  </div>

                  {/* Enhanced Trust Badges */}
                  <div className="pt-12 border-t border-border/40 space-y-6">
                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        </div>
                        <span>Live in 2 weeks</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                          <Shield className="h-5 w-5 text-primary" />
                        </div>
                        <span>SOC 2 controls in progress</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                          <Zap className="h-5 w-5 text-primary" />
                        </div>
                        <span>50+ integrations</span>
                      </div>
                    </div>

                    {/* Social Proof */}
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Purpose-built for modern support teams</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Glow */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            </div>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
};

export default SolutionSaaS;
