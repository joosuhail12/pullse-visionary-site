import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Users,
  Zap,
  Sparkles,
} from "lucide-react";
import RouteButton from "@/components/RouteButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { homepageFaqs } from "@/data/homepageFaqData";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PlatformOverview from "@/components/PlatformOverview";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import InteractiveHowItWorks from "@/components/InteractiveHowItWorks";
import RoiCalculator from "@/components/RoiCalculator";
import HomeHeroSection from "@/components/home/HomeHeroSection";
import HomeTrustSection from "@/components/home/HomeTrustSection";
import HomePlatformTaxonomySection from "@/components/home/HomePlatformTaxonomySection";
import HomeUseCasesSection from "@/components/home/HomeUseCasesSection";
import HomeIntegrationsSection from "@/components/home/HomeIntegrationsSection";

const resources = [
  {
    title: "Manifesto",
    description: "Why we're building Pullse and our vision for AI-powered support.",
    href: "/blog/the-era-of-tool-sprawl-is-ending-here-s-what-comes-next",
    badge: "Read",
  },
];

const HomeNew = () => {
  return (
    <div className="min-h-screen">
      <PageLiquidBackground opacity={0.3} />
      <Navigation />

      <HomeHeroSection />

      <HomeTrustSection />

      <HomePlatformTaxonomySection />

      <PlatformOverview />
      <InteractiveHowItWorks />

      <HomeUseCasesSection />

      {/* Enhanced ROI Section */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/3 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.04),transparent_70%)]" />

        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            {/* Header with social proof */}
            <div className="text-center mb-10 sm:mb-12 space-y-4 sm:space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
                See your potential savings
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Industry benchmarks show 60-75% cost reduction potential with AI automation. Calculate your team's potential impact.
              </p>
            </div>

            {/* Calculator Card with enhanced styling */}
            <div className="relative overflow-hidden rounded-[28px] border border-primary/30 bg-gradient-to-br from-card via-card to-card/90 p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl backdrop-blur-sm">
              {/* Decorative gradient */}
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />

              <div className="relative">
                <RoiCalculator />
              </div>
            </div>

            {/* Enhanced CTA with trust indicators */}
            <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 grid-cols-1 md:grid-cols-2">
              <div className="rounded-2xl border border-border/50 bg-card p-5 sm:p-6 shadow-md transition-all md:hover:shadow-lg md:hover:-translate-y-1">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                    <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm sm:text-base font-bold text-foreground mb-2">
                      Get Your Custom Analysis
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-4 leading-relaxed">
                      Schedule a session with our team to model your exact costs and automation opportunities
                    </p>
                    <RouteButton href="/contact-sales" className="w-full sm:w-auto min-h-[44px]">
                      Book analysis call
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </RouteButton>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-primary/10 to-primary/5 p-5 sm:p-6 shadow-md">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <CheckCircle2 className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-primary shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-foreground">Target 80% automation rate for your team</span>
                  </div>
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <CheckCircle2 className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-primary shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-foreground">Typical payback period under 6 months</span>
                  </div>
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <CheckCircle2 className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-primary shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-foreground">Real-time dashboards to prove ROI to leadership</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeIntegrationsSection />

      {/* Optimized Final CTA - Split Layout */}
      <section className="relative overflow-hidden py-16 sm:py-20 md:py-24 lg:py-32">
        {/* Enhanced background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/3 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.04),transparent_70%)]" />

        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            {/* Main CTA Container - Enhanced Split Design */}
            <div className="relative overflow-hidden rounded-[32px] border border-border/60 bg-gradient-to-br from-card via-card to-card/95 shadow-2xl backdrop-blur-sm">
              <div className="grid lg:grid-cols-[1fr,1.3fr] gap-0">
                {/* Left: Stats & Social Proof */}
                <div className="relative overflow-hidden lg:border-r border-b lg:border-b-0 border-border/60 bg-gradient-to-br from-primary/12 via-primary/6 to-transparent p-6 sm:p-8 md:p-10 lg:p-14">
                  {/* Decorative elements - hidden on mobile for performance */}
                  <div className="absolute -top-24 -left-24 h-56 w-56 rounded-full bg-primary/20 blur-3xl hidden md:block" />
                  <div className="absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-primary/15 blur-3xl hidden md:block" />

                  <div className="relative space-y-8 sm:space-y-10">
                    {/* Impact Stats with attribution */}
                    <div className="space-y-6 sm:space-y-8">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground mb-4 sm:mb-5">
                          Expected Results
                        </div>
                        <div className="grid gap-5 sm:gap-6">
                          <div className="group">
                            <div className="flex items-end gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
                              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary">80%</div>
                              <div className="pb-1.5 sm:pb-2 text-xs sm:text-sm font-bold text-foreground">Tickets Automated</div>
                            </div>
                            <div className="h-2 sm:h-2.5 bg-muted/50 rounded-full overflow-hidden mb-2">
                              <div className="h-full bg-gradient-to-r from-primary via-primary to-primary/60 rounded-full w-[80%] transition-all duration-1000" />
                            </div>
                            <div className="text-xs text-muted-foreground">Average automation rate</div>
                          </div>

                          <div className="group">
                            <div className="flex items-end gap-2.5 sm:gap-3 mb-2">
                              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary">60-75%</div>
                              <div className="pb-1.5 sm:pb-2 text-xs sm:text-sm font-bold text-foreground">Cost Reduction</div>
                            </div>
                            <div className="text-xs text-muted-foreground">Total operational savings range</div>
                          </div>

                          <div className="group">
                            <div className="flex items-end gap-2.5 sm:gap-3 mb-2">
                              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary">&lt;6mo</div>
                              <div className="pb-1.5 sm:pb-2 text-xs sm:text-sm font-bold text-foreground">Payback Period</div>
                            </div>
                            <div className="text-xs text-muted-foreground">Typical ROI timeframe</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="pt-6 sm:pt-8 border-t border-border/50">
                      <div className="space-y-2.5 sm:space-y-3">
                        <div className="flex items-center gap-2.5 sm:gap-3 text-xs font-semibold text-foreground">
                          <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-primary/20 shrink-0">
                            <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary" />
                          </div>
                          <span>SOC 2 Type II controls in progress</span>
                        </div>
                        <div className="flex items-center gap-2.5 sm:gap-3 text-xs font-semibold text-foreground">
                          <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-primary/20 shrink-0">
                            <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary" />
                          </div>
                          <span>Data encryption and audit trails</span>
                        </div>
                        <div className="flex items-center gap-2.5 sm:gap-3 text-xs font-semibold text-foreground">
                          <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-primary/20 shrink-0">
                            <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary" />
                          </div>
                          <span>Dedicated implementation support</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: CTA Content */}
                <div className="p-6 sm:p-8 md:p-10 lg:p-16 flex flex-col justify-center">
                  <div className="space-y-6 sm:space-y-8">
                    {/* Headline */}
                    <div className="space-y-4 sm:space-y-5">
                      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1]">
                        Transform your customer support with AI automation
                      </h2>
                      <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                        Join growing companies automating 80% of support tickets with our AI-powered platform. From setup to full automation in just 4 weeks.
                      </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <RouteButton size="lg" className="text-sm sm:text-base px-6 sm:px-8 py-6 sm:py-7 shadow-xl shadow-primary/25 min-h-[44px]" href="/contact-sales">
                        Book a demo
                        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                      </RouteButton>
                    </div>

                    {/* Visual Implementation Timeline */}
                    <div className="pt-6 sm:pt-8 border-t border-border/50">
                      <div className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground mb-5 sm:mb-6">
                        Your Implementation Journey
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                        <div className="relative">
                          <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
                            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-primary/15 border border-primary/30 text-base sm:text-lg font-bold text-primary shrink-0">1</div>
                            <div className="text-lg sm:text-xl font-bold text-primary">Week 1</div>
                          </div>
                          <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            Setup channels and systems
                          </div>
                        </div>
                        <div className="relative">
                          <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
                            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-primary/15 border border-primary/30 text-base sm:text-lg font-bold text-primary shrink-0">2</div>
                            <div className="text-lg sm:text-xl font-bold text-primary">Week 2</div>
                          </div>
                          <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            Design and test automation
                          </div>
                        </div>
                        <div className="relative">
                          <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
                            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-primary/15 border border-primary/30 text-base sm:text-lg font-bold text-primary shrink-0">3</div>
                            <div className="text-lg sm:text-xl font-bold text-primary">Week 3</div>
                          </div>
                          <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            Team training and testing
                          </div>
                        </div>
                        <div className="relative">
                          <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
                            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-primary/15 border border-primary/30 text-base sm:text-lg font-bold text-primary shrink-0">4</div>
                            <div className="text-lg sm:text-xl font-bold text-primary">Week 4</div>
                          </div>
                          <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            Go live
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Resource Links */}
                    <div className="pt-5 sm:pt-6">
                      <div className="max-w-sm">
                        {resources.map((resource) => (
                          <a
                            key={resource.title}
                            href={resource.href}
                            className="group rounded-xl border border-border/50 bg-muted/30 p-3.5 sm:p-4 transition-all md:hover:border-primary/40 md:hover:bg-primary/5 md:hover:shadow-md flex items-center justify-between min-h-[44px]"
                          >
                            <div className="flex-1">
                              <div className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1">
                                {resource.badge}
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-foreground leading-tight">{resource.title}</span>
                              </div>
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform md:group-hover:translate-x-1 md:group-hover:text-primary shrink-0 ml-3" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          FAQ Section - Answer Engine Optimization
      ======================================== */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to know about Pullse and how it can transform your customer support
              </p>
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-3 md:space-y-4">
              {homepageFaqs.map((faq, index) => (
                <Accordion
                  key={index}
                  type="single"
                  collapsible
                >
                  <AccordionItem
                    value="item-1"
                    className="bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl md:rounded-2xl px-4 md:px-5 lg:px-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-4 md:py-5">
                      <span className="font-semibold text-sm md:text-base text-gray-900 pr-4">
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700 text-xs md:text-sm leading-relaxed pb-4 md:pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>

            {/* CTA at bottom of FAQ */}
            <div className="mt-10 md:mt-12 text-center">
              <p className="text-sm md:text-base text-muted-foreground mb-4">
                Still have questions?
              </p>
              <RouteButton
                size="lg"
                className="text-sm sm:text-base px-6 sm:px-8 py-6 sm:py-7 shadow-xl shadow-primary/25 min-h-[44px]"
                href="/contact-sales"
              >
                Contact our team
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </RouteButton>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomeNew;
