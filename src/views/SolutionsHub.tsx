// Server Component - no 'use client' directive
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import RouteButton from "@/components/RouteButton";
import RoiCalculator from "@/components/RoiCalculator";
import { CheckCircle2 } from "lucide-react";

// Client islands
import SolutionsHubHeroSection from "@/components/solutions-hub/SolutionsHubHeroSection";
import SolutionsHubStatsSection from "@/components/solutions-hub/SolutionsHubStatsSection";
import SolutionsHubPillarsSection from "@/components/solutions-hub/SolutionsHubPillarsSection";
import SolutionsHubIndustrySolutionsSection from "@/components/solutions-hub/SolutionsHubIndustrySolutionsSection";
import SolutionsHubIntegrationsSection from "@/components/solutions-hub/SolutionsHubIntegrationsSection";

const SolutionsHub = () => {
  return (
    <div className="min-h-screen">
      <PageLiquidBackground opacity={0.45} />
      <Navigation />

      <main id="main-content" role="main">
        <SolutionsHubHeroSection />

      <SolutionsHubStatsSection />

      <SolutionsHubPillarsSection />

      <SolutionsHubIndustrySolutionsSection />

      {/* ROI Calculator Section */}
      <section id="roi-calculator" className="relative py-14 md:py-16 lg:py-20 overflow-hidden bg-gradient-to-b from-muted/10 via-muted/5 to-transparent">
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            {/* Header */}
            <div className="text-center mb-6 md:mb-8 space-y-4 md:space-y-5">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                See your exact savings in 60 seconds
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Calculate how much you'll save by automating 80% of tickets vs. hiring more agents or paying per-resolution fees
              </p>
              <div className="flex flex-wrap justify-center gap-3 md:gap-4 lg:gap-6 pt-2 md:pt-4">
                <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary shrink-0" />
                  <span>Compare vs. Intercom, Zendesk, Freshdesk</span>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary shrink-0" />
                  <span>See monthly & annual savings</span>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary shrink-0" />
                  <span>No email required</span>
                </div>
              </div>
            </div>

            {/* Calculator Card */}
            <div className="relative overflow-hidden rounded-2xl md:rounded-[24px] lg:rounded-[28px] border border-primary/30 bg-gradient-to-br from-card via-card to-card/90 p-5 md:p-8 lg:p-10 shadow-2xl backdrop-blur-sm">
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
              <div className="relative">
                <RoiCalculator />
              </div>
            </div>
          </div>
        </div>
      </section>

      <SolutionsHubIntegrationsSection />

      {/* Final CTA */}
      <section className="relative py-20 md:py-28 lg:py-40 overflow-hidden">
        {/* Animated gradient orbs background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-2xl md:rounded-3xl border border-primary/30 bg-gradient-to-br from-card/50 via-background/30 to-card/50 backdrop-blur-2xl p-6 md:p-10 lg:p-12 xl:p-16 shadow-2xl text-center overflow-hidden">

              {/* Inner glow effect */}
              <div className="absolute -inset-px rounded-2xl md:rounded-3xl bg-gradient-to-br from-primary/30 via-purple-600/30 to-indigo-600/30 opacity-50 blur-2xl" />

              <div className="relative space-y-6 md:space-y-8">
                <div className="space-y-4 md:space-y-6">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-foreground leading-tight">
                    Start automating 80% of tickets
                    <span className="block bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent mt-2 md:mt-3">
                      in 14 days or less
                    </span>
                  </h2>

                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    Setup takes 1 hour. ROI starts immediately. No credit card required for your 14-day trial.
                  </p>

                  <div className="flex flex-wrap justify-center gap-4 md:gap-6 pt-1 md:pt-2">
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-bold text-primary">1 hour</div>
                      <div className="text-xs md:text-sm text-muted-foreground">Setup time</div>
                    </div>
                    <div className="h-10 md:h-12 w-px bg-border"></div>
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-bold text-primary">14 days</div>
                      <div className="text-xs md:text-sm text-muted-foreground">To see ROI</div>
                    </div>
                    <div className="h-10 md:h-12 w-px bg-border"></div>
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-bold text-primary">$0</div>
                      <div className="text-xs md:text-sm text-muted-foreground">To get started</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pt-2 md:pt-4">
                  <RouteButton
                    size="lg"
                    className="text-sm md:text-base px-6 py-4 md:px-8 md:py-5 lg:px-10 lg:py-6 shadow-xl shadow-primary/20"
                    href="/pricing"
                  >
                    Pricing
                  </RouteButton>
                  <RouteButton
                    size="lg"
                    variant="outline"
                    className="text-sm md:text-base px-6 py-4 md:px-8 md:py-5 lg:px-10 lg:py-6 border border-border/40 hover:border-primary/40"
                    href="/contact-sales"
                  >
                    Contact Sales
                  </RouteButton>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 lg:gap-8 pt-6 md:pt-8 border-t border-border/30">
                  <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-primary shrink-0" />
                    <span>1-hour setup • Live today, not next quarter</span>
                  </div>
                  <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-primary shrink-0" />
                    <span>No credit card • Full 14-day trial included</span>
                  </div>
                  <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-primary shrink-0" />
                    <span>Setup help included • We'll get you to 80% automation</span>
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

export default SolutionsHub;
