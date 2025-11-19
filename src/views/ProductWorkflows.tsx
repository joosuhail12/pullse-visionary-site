// Server Component - no 'use client' directive
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import RouteButton from "@/components/RouteButton";
import Image from "next/image";
import {
  Workflow,
  GitBranch,
  ArrowRight,
  CheckCircle2,
  Zap,
  Play,
  Star,
  LayoutGrid,
  MessageCircle,
  Sparkles,
  Code,
} from "lucide-react";

// Import client islands
import ScrollProgressIndicator from "@/components/product-inbox/ScrollProgressIndicator";
import ProductWorkflowsHeroBackground from "@/components/product-workflows/ProductWorkflowsHeroBackground";
import ProductWorkflowsBentoSection from "@/components/product-workflows/ProductWorkflowsBentoSection";
import CopilotAccordion from "@/components/product-workflows/CopilotAccordion";
import FadeInUpObserver from "@/components/product-workflows/FadeInUpObserver";
import ProductWorkflowsStyles from "@/components/product-workflows/ProductWorkflowsStyles";

// Import screenshots
import workflowScreenshot from "@/assets/workflow-automation-screenshot.png";
import routingConfigScreenshot from "@/assets/screenshots/routing-config.png";
import copilotScreenshot from "@/assets/copilot-interface-screenshot.png";

const ProductWorkflows = () => {
  // AI Copilot Connectors data
  const copilotConnectors = [
    {
      category: 'Payments & Billing',
      color: 'from-green-500 to-emerald-500',
      platforms: ['Stripe', 'PayPal', 'Square']
    },
    {
      category: 'CRM & Sales',
      color: 'from-blue-500 to-cyan-500',
      platforms: ['Salesforce', 'HubSpot', 'Pipedrive']
    },
    {
      category: 'E-commerce',
      color: 'from-orange-500 to-amber-500',
      platforms: ['Shopify', 'WooCommerce', 'Magento']
    },
    {
      category: 'Communication',
      color: 'from-purple-500 to-pink-500',
      platforms: ['Slack', 'Microsoft Teams', 'Email']
    },
    {
      category: 'Custom APIs',
      color: 'from-indigo-500 to-purple-500',
      platforms: ['Any REST API']
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Global Styles - Client Component */}
      <ProductWorkflowsStyles />

      {/* Fade In Up Observer - Client Component */}
      <FadeInUpObserver />

      <PageLiquidBackground opacity={0.45} />
      <Navigation />

      <main id="main-content" role="main">
      {/* Scroll Progress Indicator - Client Component */}
      <ScrollProgressIndicator />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] lg:min-h-screen flex items-center pt-16 pb-12 md:pt-24 md:pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_50%)]" />

        {/* Hero Liquid Ether Effect - Client Component */}
        <ProductWorkflowsHeroBackground />

        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header Content */}
            <div className="text-center mb-8 md:mb-12 lg:mb-16 space-y-4 md:space-y-6 lg:space-y-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-foreground leading-[1.05] tracking-tight max-w-5xl mx-auto">
                Automate support with
                <span className="block bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent animate-gradient mt-2">
                  workflows and AI
                </span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Build recurring workflows that run automatically. Take on-demand actions with AI Copilot that connects to any API.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
                <RouteButton size="lg" href="/contact-sales" className="text-sm md:text-base px-6 py-4 md:px-8 md:py-5 lg:px-10 lg:py-7 shadow-2xl shadow-primary/30 group">
                  See it live
                  <Play className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:scale-110 transition-transform" />
                </RouteButton>
                <RouteButton size="lg" variant="outline" href="/pricing" className="text-sm md:text-base px-6 py-4 md:px-8 md:py-5 lg:px-10 lg:py-7">
                  View pricing
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </RouteButton>
              </div>

              {/* Trust Signals */}
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 md:gap-x-6 md:gap-y-3 lg:gap-x-8 lg:gap-y-4 pt-4 md:pt-6 lg:pt-8 text-xs md:text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5 md:gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary shrink-0" />
                  <span>2-week setup</span>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary shrink-0" />
                  <span>No credit card</span>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2">
                  <Star className="h-3.5 w-3.5 md:h-4 md:w-4 text-amber-500 fill-amber-500 shrink-0" />
                  <span>Built for teams that demand excellence</span>
                </div>
              </div>
            </div>

            {/* Hero Screenshot */}
            <div className="relative max-w-6xl mx-auto">
              {/* Glow effect */}
              <div className="absolute -inset-12 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-3xl opacity-60" />

              {/* Main screenshot card */}
              <div className="relative rounded-3xl border border-border/50 bg-gradient-to-br from-card/95 via-card to-card/90 p-2 md:p-2.5 lg:p-3 shadow-2xl backdrop-blur-xl">
                <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted/30 border border-border/30">
                  <Image
                    src={workflowScreenshot}
                    alt="Pullse Visual Workflow Builder"
                    className="w-full"
                    priority
                  />
                </div>
              </div>

              {/* Floating stat badges */}
              <div className="absolute -left-4 top-1/4 hidden lg:block">
                <div className="rounded-2xl border border-border/60 bg-card/95 p-4 md:p-5 shadow-xl backdrop-blur-xl animate-float">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                      <Zap className="h-5 w-5 md:h-6 md:w-6 text-background" />
                    </div>
                    <div>
                      <div className="text-xl md:text-2xl font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">80%</div>
                      <div className="text-xs text-muted-foreground">Automated</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 top-1/3 hidden lg:block">
                <div className="rounded-2xl border border-border/60 bg-card/95 p-4 md:p-5 shadow-xl backdrop-blur-xl animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg">
                      <LayoutGrid className="h-5 w-5 md:h-6 md:w-6 text-background" />
                    </div>
                    <div>
                      <div className="text-xl md:text-2xl font-black bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">50+</div>
                      <div className="text-xs text-muted-foreground">Templates</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Value Props Section */}
      <section className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-b from-muted/10 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
              {[
                { icon: Workflow, title: 'Visual Builder', description: 'Drag-and-drop recurring automation' },
                { icon: GitBranch, title: 'Smart Logic', description: 'Conditional branching & routing' },
                { icon: MessageCircle, title: 'Customer Engagement', description: 'Interactive messages & feedback' },
                { icon: Sparkles, title: 'AI Copilot', description: 'On-demand actions via any API' },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-4 md:p-5 lg:p-6 transition-all hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 fade-in-up"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative space-y-2 md:space-y-3">
                      <div className="flex h-10 w-10 md:h-11 md:w-11 lg:h-12 lg:w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 transition-all group-hover:scale-110">
                        <Icon className="h-5 w-5 md:h-5.5 md:w-5.5 lg:h-6 lg:w-6 text-primary" />
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-foreground">{item.title}</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Bento Grid Section */}
      <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-b from-muted/10 via-muted/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Bento Section - Client Component */}
            <ProductWorkflowsBentoSection
              screenshots={{
                routing: routingConfigScreenshot.src,
                workflow: workflowScreenshot.src,
              }}
            />
          </div>
        </div>
      </section>

      {/* AI Copilot Section */}
      <section className="relative py-16 md:py-20 lg:py-24 bg-gradient-to-b from-muted/10 via-background to-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--amber-500)/0.12),transparent_60%)]" />

        <div className="container relative mx-auto px-4 py-4 md:py-6 lg:py-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-6 md:mb-7 lg:mb-8 space-y-2 md:space-y-2.5 lg:space-y-3 fade-in-up">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                AI Copilot for real-time actions
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                Let agents take actions across any platform—from Stripe refunds to CRM updates—right from the chat. Connects to any REST API.
              </p>
            </div>

            {/* Enhanced Layout */}
            <div className="grid lg:grid-cols-2 gap-6 md:gap-7 lg:gap-8 items-center max-w-6xl mx-auto">
              {/* Left: Screenshot with Enhanced Frame */}
              <div className="fade-in-up">
                <div className="relative max-w-lg mx-auto">
                  {/* Glow Effect */}
                  <div className="absolute -inset-3 bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent blur-xl opacity-50" />

                  <div className="relative rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-500/5 via-card to-card p-1.5 md:p-2 shadow-lg backdrop-blur-xl">
                    <div className="rounded-lg overflow-hidden bg-gradient-to-br from-muted/30 to-muted/50 border border-border/40 shadow-md">
                      <Image
                        src={copilotScreenshot}
                        alt="AI Copilot Interface"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Accordion Tabs - Client Component */}
              <div className="space-y-2 md:space-y-2.5 lg:space-y-3 fade-in-up">
                <CopilotAccordion />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Copilot Integrations Section */}
      <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-b from-muted/10 via-muted/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 md:mb-16 lg:mb-20 space-y-4 md:space-y-5 lg:space-y-6 fade-in-up">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                Pre-built connectors or custom APIs
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Use our 50+ pre-built connectors for popular platforms—or register any REST/GraphQL API and AI figures it out dynamically
              </p>
            </div>

            {/* Connectors Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8 fade-in-up">
              {copilotConnectors.map((connector, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card p-4 md:p-5 lg:p-6 transition-all hover:border-primary/40 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${connector.color} opacity-0 transition-opacity group-hover:opacity-10`} />
                  <div className="relative space-y-4 md:space-y-5 lg:space-y-6">
                    {/* Category Header */}
                    <div className="space-y-1.5 md:space-y-2">
                      <div className={`inline-flex h-10 w-10 md:h-11 md:w-11 lg:h-12 lg:w-12 items-center justify-center rounded-xl bg-gradient-to-br ${connector.color} shadow-lg`}>
                        <Code className="h-5 w-5 md:h-5.5 md:w-5.5 lg:h-6 lg:w-6 text-background" />
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-foreground">{connector.category}</h3>
                    </div>

                    {/* Platforms */}
                    <div className="space-y-1.5 md:space-y-2">
                      {connector.platforms.map((platform, pIndex) => (
                        <div key={pIndex} className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-foreground font-medium">
                          <CheckCircle2 className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary shrink-0" />
                          {platform}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-16 md:py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.15),transparent_60%)]" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card to-card/90 shadow-2xl fade-in-up">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.1),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--primary)/0.1),transparent_50%)]" />

              <div className="relative p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16">
                <div className="text-center space-y-6 md:space-y-8 lg:space-y-10">
                  <div className="space-y-4 md:space-y-5 lg:space-y-6">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                      Ready to automate with workflows and AI?
                    </h2>
                    <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
                      See Pullse Workflows and Copilot in action. Book a personalized demo with our team.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                    <RouteButton size="lg" className="text-sm md:text-base px-6 py-4 md:px-8 md:py-5 lg:px-10 lg:py-7 shadow-xl shadow-primary/20" href="/contact-sales">
                      Book a demo
                      <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                    </RouteButton>
                    <RouteButton size="lg" variant="outline" className="text-sm md:text-base px-6 py-4 md:px-8 md:py-5 lg:px-10 lg:py-7" href="/pricing">
                      View pricing
                    </RouteButton>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 md:gap-x-6 md:gap-y-3 lg:gap-x-8 lg:gap-y-4 pt-4 md:pt-6 lg:pt-8 border-t border-border/40">
                    <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary shrink-0" />
                      <span>2-week setup</span>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary shrink-0" />
                      <span>Founder-led onboarding</span>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary shrink-0" />
                      <span>No credit card required</span>
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

export default ProductWorkflows;
