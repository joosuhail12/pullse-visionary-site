import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import RouteButton from "@/components/RouteButton";
import RoiCalculator from "@/components/RoiCalculator";
import ScrollProgressIndicator from "@/components/product-inbox/ScrollProgressIndicator";
import SolutionEcommerceHeroSection from "@/components/solutions/SolutionEcommerceHeroSection";
import SolutionEcommerceStatsSection from "@/components/solutions/SolutionEcommerceStatsSection";
import SolutionEcommercePillarsSection from "@/components/solutions/SolutionEcommercePillarsSection";
import SolutionEcommerceIntegrationsSection from "@/components/solutions/SolutionEcommerceIntegrationsSection";
import {
  Sparkles,
  CheckCircle2,
  Zap,
  AlertTriangle,
  DollarSign,
  Clock,
  MessageSquare,
  TrendingUp,
  Shield,
  ArrowRight,
} from "lucide-react";

const SolutionEcommerce = () => {
  return (
    <div className="min-h-screen">
      <PageLiquidBackground opacity={0.45} />
      <Navigation />

      <ScrollProgressIndicator />

      <SolutionEcommerceHeroSection />

      <SolutionEcommerceStatsSection />

      <SolutionEcommercePillarsSection />

      {/* Core E-commerce Workflows Section */}
      <section className="relative py-16 md:py-20 lg:py-24 xl:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* WISMO Featured Workflow - 62% of all tickets */}
            <div className="mb-16">
              <div className="relative overflow-hidden rounded-3xl border-2 border-primary/40 bg-gradient-to-br from-blue-500/5 via-card to-cyan-500/5 p-10 md:p-12">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.1),transparent_50%)]" />

                <div className="relative space-y-8">
                  {/* Scenario */}
                  <div>
                    <h3 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                      WISMO Ticket Elimination
                    </h3>
                    <div className="rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/30 shrink-0">
                          <MessageSquare className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-bold text-muted-foreground mb-1">Email received • 10:43 AM</div>
                          <p className="text-lg font-semibold text-foreground italic mb-2">
                            "WHERE IS MY ORDER?! It's been 5 days and I haven't heard ANYTHING. Order #5847. If it doesn't arrive by Friday I need a FULL REFUND!"
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>3rd contact attempt</span>
                            <span>•</span>
                            <span>Customer satisfaction at risk</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Before/After Split */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Traditional Way */}
                    <div className="rounded-2xl border-2 border-destructive/40 bg-gradient-to-br from-destructive/5 to-transparent p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/20 border border-destructive/40">
                          <AlertTriangle className="h-5 w-5 text-destructive" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-destructive">Traditional Way</div>
                          <div className="text-xs text-muted-foreground">4 tools, 6 tabs, manual work</div>
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        {['Helpdesk: Read ticket', 'Shopify: Search order', 'Copy tracking number', 'FedEx: Check status', 'Email: Draft response', 'Update ticket notes'].map((step, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="h-1.5 w-1.5 rounded-full bg-destructive/60" />
                            {step}
                          </div>
                        ))}
                      </div>

                      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Time spent</span>
                          <span className="font-bold text-destructive">4 min 20s</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Cost per ticket</span>
                          <span className="font-bold text-destructive">$5.80</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Agent feeling</span>
                          <span className="font-bold text-destructive">😤 Frustrated</span>
                        </div>
                      </div>
                    </div>

                    {/* Pullse Way */}
                    <div className="rounded-2xl border-2 border-primary bg-gradient-to-br from-primary/10 to-transparent p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 shadow-md">
                          <Zap className="h-5 w-5 text-background" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-primary">Pullse AI</div>
                          <div className="text-xs text-primary/80">Zero agent time, instant resolution</div>
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        {['AI detects WISMO pattern', 'Extracts order #5847', 'Pulls tracking: FedEx APIs', 'Sends personalized response', 'Updates helpdesk', 'Ticket closed'].map((step, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                            <span className="text-foreground">{step}</span>
                          </div>
                        ))}
                      </div>

                      <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Time spent</span>
                          <span className="font-bold text-primary">28 seconds</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Cost per ticket</span>
                          <span className="font-bold text-green-600">$0.40</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Agent feeling</span>
                          <span className="font-bold text-green-600">😊 Never saw it</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Impact Summary */}
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-border/40">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                        <Clock className="h-6 w-6 text-background" />
                      </div>
                      <div>
                        <div className="text-2xl font-black text-foreground">3 min 52s saved</div>
                        <div className="text-xs text-muted-foreground">Per ticket × 1,240 WISMO/month</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg">
                        <DollarSign className="h-6 w-6 text-background" />
                      </div>
                      <div>
                        <div className="text-2xl font-black text-green-600">$6,696/mo saved</div>
                        <div className="text-xs text-muted-foreground">$5.40 savings per WISMO</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Critical Workflows - Compact Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {/* Wrong Item Emergency */}
              <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative p-6 space-y-5">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-500 shadow-md">
                      <AlertTriangle className="h-5 w-5 text-background" />
                    </div>
                    <div className="px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-600 text-xs font-bold uppercase tracking-wide">
                      Urgent
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-foreground mb-3">Wrong Item Emergency</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                      "Sent SIZE SMALL. Need LARGE for my sister's WEDDING tomorrow!"
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 py-5 border-y border-border/40">
                    <div className="text-center">
                      <div className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Traditional</div>
                      <div className="text-2xl font-black text-destructive mb-1">15 min</div>
                      <div className="text-xs text-muted-foreground">6 tool switches</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-semibold text-primary/80 mb-2 uppercase tracking-wide">Pullse AI</div>
                      <div className="text-2xl font-black text-primary mb-1">2.5 min</div>
                      <div className="text-xs text-primary/70">One command</div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Time saved</span>
                      <span className="text-base font-bold text-foreground">12.5 min</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">$ saved per ticket</span>
                      <span className="text-base font-bold text-green-600">$18.40</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Customer saved</span>
                      <span className="text-base font-bold text-green-600">$1.2K LTV</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Black Friday Surge */}
              <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative p-6 space-y-5">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 shadow-md">
                      <TrendingUp className="h-5 w-5 text-background" />
                    </div>
                    <div className="px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-600 text-xs font-bold uppercase tracking-wide">
                      Peak Season
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-foreground mb-3">Black Friday Survival</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                      Volume spikes 2,000 → 10,000 tickets. Team same size. No burnout.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 py-5 border-y border-border/40">
                    <div className="text-center">
                      <div className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Without Pullse</div>
                      <div className="text-2xl font-black text-destructive mb-1">Hire 40</div>
                      <div className="text-xs text-muted-foreground">temp agents</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-semibold text-primary/80 mb-2 uppercase tracking-wide">With Pullse</div>
                      <div className="text-2xl font-black text-primary mb-1">Same team</div>
                      <div className="text-xs text-primary/70">AI handles 70%</div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Temp hire cost avoided</span>
                      <span className="text-base font-bold text-green-600">$84K</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">CSAT maintained</span>
                      <span className="text-base font-bold text-green-600">92%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Response time</span>
                      <span className="text-base font-bold text-primary">{'<'}4 hours</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Return Fraud Detection */}
              <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative p-6 space-y-5">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-pink-500 shadow-md">
                      <Shield className="h-5 w-5 text-background" />
                    </div>
                    <div className="px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-600 text-xs font-bold uppercase tracking-wide">
                      Risk Insights
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-foreground mb-3">Return Pattern Analysis</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                      3rd return this month. Pullse surfaces: 12 orders, 8 returns (66% rate).
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 py-5 border-y border-border/40">
                    <div className="text-center">
                      <div className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Traditional</div>
                      <div className="text-2xl font-black text-destructive mb-1">No context</div>
                      <div className="text-xs text-muted-foreground">Approve blindly</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-semibold text-primary/80 mb-2 uppercase tracking-wide">Pullse AI</div>
                      <div className="text-2xl font-black text-primary mb-1">Full history</div>
                      <div className="text-xs text-primary/70">Unified context</div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Losses prevented</span>
                      <span className="text-base font-bold text-green-600">$2.4K/mo</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">False positives</span>
                      <span className="text-base font-bold text-green-600">{'<'}2%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Policy fairness</span>
                      <span className="text-base font-bold text-primary">Protected</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SolutionEcommerceIntegrationsSection />

      {/* ROI Calculator Section */}
      <section className="relative py-16 md:py-20 lg:py-24 xl:py-32 overflow-hidden">
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            {/* Header */}
            <div className="text-center mb-12 space-y-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Calculate your Black Friday savings
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                See exactly how much Pullse saves during peak season with 70% WISMO automation and instant returns
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
                      Don't let Black Friday break your support team
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                      Handle 10x volume with your current team. WISMO tickets auto-resolved. Returns in 2 minutes. Happy customers.
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
                </div>
              </div>

              {/* Bottom Glow */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SolutionEcommerce;
