import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import RouteButton from "@/components/RouteButton";
import RoiCalculator from "@/components/RoiCalculator";
import ScrollProgressIndicator from "@/components/product-inbox/ScrollProgressIndicator";
import SolutionFintechHeroSection from "@/components/solutions/SolutionFintechHeroSection";
import SolutionFintechStatsSection from "@/components/solutions/SolutionFintechStatsSection";
import SolutionFintechPillarsSection from "@/components/solutions/SolutionFintechPillarsSection";
import SolutionFintechWorkflowsSection from "@/components/solutions/SolutionFintechWorkflowsSection";
import SolutionFintechIntegrationsSection from "@/components/solutions/SolutionFintechIntegrationsSection";
import { CheckCircle2 } from "lucide-react";

const SolutionFintech = () => {
  return (
    <div className="min-h-screen">
      <PageLiquidBackground opacity={0.45} />
      <Navigation />

      <ScrollProgressIndicator />

      <SolutionFintechHeroSection />

      <SolutionFintechStatsSection />

      <SolutionFintechPillarsSection />

      <SolutionFintechWorkflowsSection />

      {/* ROI Calculator Section */}
      <section className="relative py-16 md:py-20 lg:py-24 xl:py-32 overflow-hidden bg-gradient-to-b from-muted/10 via-muted/5 to-transparent">
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            {/* Header */}
            <div className="text-center mb-12 space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Calculate your fintech support ROI
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See how much Pullse could save with orchestrated risk workflows, faster KYC, and reduced chargebacks
              </p>
            </div>

            {/* Calculator Card */}
            <div className="relative overflow-hidden rounded-[28px] border border-primary/30 bg-gradient-to-br from-card via-card to-card/90 p-10 md:p-12 shadow-2xl backdrop-blur-sm">
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />

              <div className="relative">
                <RoiCalculator />
              </div>
            </div>
          </div>
        </div>
      </section>

      <SolutionFintechIntegrationsSection />

      {/* Final CTA */}
      <section className="relative py-16 md:py-20 lg:py-24 xl:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.15),transparent_60%)]" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card to-card/90 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.1),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--primary)/0.1),transparent_50%)]" />

              <div className="relative p-12 lg:p-16">
                <div className="text-center space-y-10">
                  <div className="space-y-6">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                      Ready for compliant, fast support?
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                      See how Pullse helps fintech teams prevent fraud, accelerate KYC, and pass audits with ease
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

                  <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-8 border-t border-border/40">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>SOC 2 controls in progress</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>14-day free trial</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Security review support included</span>
                    </div>
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

export default SolutionFintech;
