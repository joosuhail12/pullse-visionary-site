import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import RouteButton from "@/components/RouteButton";
import RoiCalculator from "@/components/RoiCalculator";
import ScrollProgressIndicator from "@/components/product-inbox/ScrollProgressIndicator";
import SolutionFintechHeroSection from "@/components/solutions/SolutionFintechHeroSection";
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

      <main id="main-content" role="main">
        <SolutionFintechHeroSection />

      <SolutionFintechPillarsSection />

      <SolutionFintechWorkflowsSection />

      {/* ROI Calculator Section */}
      <section className="relative py-14 md:py-18 lg:py-22 xl:py-28 overflow-hidden bg-gradient-to-b from-muted/10 via-muted/5 to-transparent">
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            {/* Header */}
            <div className="text-center mb-10 sm:mb-12 space-y-5">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Calculate your fintech support ROI
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                See how much Pullse could save with orchestrated risk workflows, faster KYC, and reduced chargebacks
              </p>
            </div>

            {/* Calculator Card */}
            <div className="relative overflow-hidden rounded-[28px] border border-primary/30 bg-gradient-to-br from-card via-card to-card/90 p-6 sm:p-8 md:p-12 shadow-2xl backdrop-blur-sm">
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
      <section className="relative py-14 md:py-18 lg:py-22 xl:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.15),transparent_60%)]" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card to-card/90 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.1),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--primary)/0.1),transparent_50%)]" />

              <div className="relative p-8 sm:p-10 lg:p-14">
                <div className="text-center space-y-10">
                  <div className="space-y-6">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                      Ready for compliant, fast support?
                    </h2>
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                      See how Pullse helps fintech teams prevent fraud, accelerate KYC, and pass audits with ease
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                    <RouteButton size="lg" className="text-sm sm:text-base px-8 sm:px-10 py-5 sm:py-6 shadow-xl shadow-primary/20 w-full sm:w-auto" href="/pricing">
                      Pricing
                    </RouteButton>
                    <RouteButton size="lg" variant="outline" className="text-sm sm:text-base px-8 sm:px-10 py-5 sm:py-6 border border-border/40 hover:border-primary/40 w-full sm:w-auto" href="/contact-sales">
                      Contact Sales
                    </RouteButton>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 pt-6 sm:pt-8 border-t border-border/40 text-sm">
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
      </main>

      <Footer />
    </div>
  );
};

export default SolutionFintech;
