// Server Component - no 'use client' directive
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import RouteButton from "@/components/RouteButton";
import Image from "next/image";
import SoftwareApplicationSchema from "@/components/structured-data/SoftwareApplicationSchema";
import {
  BookOpen,
  Globe,
  ArrowRight,
  CheckCircle2,
  Zap,
  Palette,
  Languages,
  Wand2,
  Search,
  Link2,
} from "lucide-react";

// Import client islands
import ProductHelpCentersScrollProgress from "@/components/product-helpcenters/ProductHelpCentersScrollProgress";
import ProductHelpCentersHeroBackground from "@/components/product-helpcenters/ProductHelpCentersHeroBackground";
import ProductHelpCentersBentoSection from "@/components/product-helpcenters/ProductHelpCentersBentoSection";
import AIAccordion from "@/components/product-helpcenters/AIAccordion";
import AppoThemeStyles from "@/components/product-helpcenters/AppoThemeStyles";

// Import Appo branding
import appoLogo from "@/assets/appo/appo-logo.webp";
import appoWordmark from "@/assets/appo/appo-wordmark.png";

// Import Pullse logo
import pullseLogo from "@/assets/logo-icon-purple.png";

const ProductHelpCenters = () => {
  return (
    <div className="min-h-screen appo-theme">
      <SoftwareApplicationSchema
        name="Help Centers"
        description="Self-service knowledge bases and documentation portals that empower customers to find answers instantly."
      />
      {/* Appo Theme Styles - Client Component */}
      <AppoThemeStyles />

      <PageLiquidBackground opacity={0.65} colors={['#F28D1B', '#FFB633', '#FEE3AC']} />
      <Navigation />

      <main id="main-content" role="main">
      {/* Scroll Progress Indicator - Client Component */}
      <ProductHelpCentersScrollProgress />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] lg:min-h-screen flex items-center pt-20 pb-16 md:pt-24 md:pb-20 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(28_88%_53%/0.15),transparent_50%)]" />

        {/* Hero Liquid Ether Effect - Client Component */}
        <ProductHelpCentersHeroBackground />

        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header Content */}
            <div className="text-center mb-10 md:mb-14 lg:mb-16 space-y-6 md:space-y-8">
              {/* Appo Wordmark */}
              <div className="flex justify-center mb-3 md:mb-4">
                <Image
                  src={appoWordmark}
                  alt="Appo"
                  className="h-8 md:h-9 lg:h-10 w-auto"
                  priority
                />
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-foreground leading-[1.05] tracking-tight max-w-5xl mx-auto">
                Help centers that
                <span className="block bg-gradient-to-r from-[#F28D1B] via-[#FFB633] to-[#FEE3AC] bg-clip-text text-transparent animate-gradient mt-2">
                  scale with you
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Appo is our help center platform—built for teams managing multiple brands. Create white-labeled knowledge bases with AI-powered writing, multilingual support, and native Pullse chatbot integration.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <RouteButton size="lg" href="/contact-sales" className="text-base px-8 py-6 md:px-9 md:py-6 lg:px-10 lg:py-7 shadow-2xl shadow-[#F28D1B]/30 bg-[#F28D1B] hover:bg-[#FFB633]">
                  Contact Sales
                  <ArrowRight className="ml-2 h-5 w-5" />
                </RouteButton>
              </div>

              {/* Trust Signals */}
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#F28D1B]" />
                  <span>Multiple help centers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#F28D1B]" />
                  <span>Custom domains</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#F28D1B]" />
                  <span>AI-powered</span>
                </div>
              </div>
            </div>

            {/* Hero Screenshot Placeholder */}
            <div className="relative max-w-6xl mx-auto">
              <div className="absolute -inset-12 bg-gradient-to-br from-[#F28D1B]/20 via-[#FFB633]/10 to-transparent blur-3xl opacity-60" />
              <div className="relative rounded-3xl border border-border/50 bg-gradient-to-br from-card/95 via-card to-card/90 p-2 sm:p-3 shadow-2xl backdrop-blur-xl">
                <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-muted/30 to-muted/50 border border-border/40 shadow-xl aspect-video flex items-center justify-center">
                  <div className="text-center space-y-2 p-8">
                    <BookOpen className="h-12 w-12 md:h-14 lg:h-16 text-[#F28D1B]/40 mx-auto" />
                    <p className="text-sm text-muted-foreground">Appo Help Center Interface</p>
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
                { icon: BookOpen, title: 'Multiple Help Centers', description: 'Unlimited help centers per workspace' },
                { icon: Palette, title: 'White-Labeled', description: 'Your brand, your domain, your colors' },
                { icon: Wand2, title: 'AI Writing Assistant', description: 'AI helps write and optimize articles' },
                { icon: Languages, title: 'Multilingual Support', description: 'Publish in multiple languages' },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 md:p-6 transition-all hover:border-[#F28D1B]/40 hover:shadow-xl hover:-translate-y-1 fade-in-up"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FEE3AC]/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative space-y-3">
                      <div className="flex h-10 w-10 md:h-11 lg:h-12 items-center justify-center rounded-xl bg-[#F28D1B]/10 border border-[#F28D1B]/20 transition-all group-hover:scale-110">
                        <Icon className="h-5 w-5 md:h-5.5 lg:h-6 text-[#F28D1B]" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Content Creation - MagicBento Section */}
      <section className="relative py-16 md:py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(28_88%_53%/0.08),transparent_60%)]" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Bento Section - Client Component */}
            <ProductHelpCentersBentoSection />
          </div>
        </div>
      </section>

      {/* AI-Powered Intelligence Section */}
      <section className="relative min-h-[600px] md:min-h-[700px] lg:h-screen lg:max-h-screen bg-gradient-to-b from-muted/10 via-background to-background flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(28_88%_53%/0.12),transparent_60%)]" />

        <div className="container relative mx-auto px-4 py-12 md:py-16 lg:py-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8 md:mb-10 lg:mb-8 space-y-3 md:space-y-4 fade-in-up">
              <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                AI that makes content better
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                From writing assistance to content gap analysis—Appo's AI helps you create knowledge that actually answers questions
              </p>
            </div>

            {/* Layout */}
            <div className="grid lg:grid-cols-2 gap-6 md:gap-7 lg:gap-8 items-center max-w-6xl mx-auto">
              {/* Left: Screenshot Placeholder */}
              <div className="fade-in-up">
                <div className="relative max-w-lg mx-auto">
                  <div className="absolute -inset-3 bg-gradient-to-br from-[#F28D1B]/20 via-[#FFB633]/10 to-transparent blur-xl opacity-50" />
                  <div className="relative rounded-xl border border-[#F28D1B]/30 bg-gradient-to-br from-[#FEE3AC]/10 via-card to-card p-2 shadow-lg backdrop-blur-xl">
                    <div className="rounded-lg overflow-hidden bg-gradient-to-br from-muted/30 to-muted/50 border border-border/40 shadow-md aspect-[4/3] flex items-center justify-center">
                      <div className="text-center space-y-2 p-6">
                        <Wand2 className="h-10 w-10 md:h-11 lg:h-12 text-[#F28D1B]/40 mx-auto" />
                        <p className="text-xs text-muted-foreground">AI Writing Assistant Interface</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Accordion - Client Component */}
              <div className="space-y-2 fade-in-up">
                <AIAccordion />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multilingual Section */}
      <section className="relative py-16 md:py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(28_88%_53%/0.08),transparent_60%)]" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 md:mb-16 lg:mb-20 space-y-4 md:space-y-5 lg:space-y-6 fade-in-up">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                Publish globally. Speak locally.
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Create multilingual help centers that serve customers in their native language
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
              {[
                { icon: Languages, title: 'Multi-Language Support', description: 'Create help centers in multiple languages from one workspace' },
                { icon: Globe, title: 'Localized Content', description: 'Different articles per language/region, manage translations easily' },
                { icon: Zap, title: 'Language Switching', description: 'Customers switch languages instantly, seamless UX' },
                { icon: Search, title: 'SEO Optimized', description: 'Each language fully indexed, meta tags, sitemaps' },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 md:p-6 transition-all hover:border-[#F28D1B]/40 hover:shadow-xl hover:-translate-y-1 fade-in-up"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FEE3AC]/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative space-y-3">
                      <div className="flex h-10 w-10 md:h-11 lg:h-12 items-center justify-center rounded-xl bg-[#F28D1B]/10 border border-[#F28D1B]/20 transition-all group-hover:scale-110">
                        <Icon className="h-5 w-5 md:h-5.5 lg:h-6 text-[#F28D1B]" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Pullse Integration + Final CTA */}
      <section className="relative py-16 md:py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(28_88%_53%/0.15),transparent_60%)]" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12 md:space-y-14 lg:space-y-16">
            {/* Integration Callout */}
            <div className="relative overflow-hidden rounded-3xl border border-[#F28D1B]/30 bg-gradient-to-br from-[#FEE3AC]/10 via-card to-card p-6 md:p-7 lg:p-8 shadow-2xl fade-in-up">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(28_88%_53%/0.1),transparent_50%)]" />

              <div className="relative">
                <div className="flex items-center justify-center gap-3 md:gap-4 mb-4 md:mb-5 lg:mb-6">
                  <Image src={pullseLogo} alt="Pullse" className="h-10 w-10 md:h-11 lg:h-12" />
                  <Link2 className="h-5 w-5 md:h-5.5 lg:h-6 text-[#F28D1B]" />
                  <Image src={appoLogo} alt="Appo" className="h-10 w-10 md:h-11 lg:h-12" />
                </div>

                <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-foreground text-center mb-4">
                  Built to work with Pullse
                </h3>

                <div className="grid sm:grid-cols-3 gap-3 md:gap-3.5 lg:gap-4 mt-6 md:mt-7 lg:mt-8">
                  {[
                    { text: 'Native chatbot integration—Appo answers questions automatically' },
                    { text: 'Agents insert articles into replies from Pullse inbox' },
                    { text: 'Track deflection rate—see ROI of self-service' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-2 p-2.5 md:p-3 rounded-lg bg-background/50">
                      <CheckCircle2 className="h-4.5 w-4.5 md:h-5 lg:h-5 text-[#F28D1B] mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Final CTA */}
            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card to-card/90 shadow-2xl fade-in-up">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(28_88%_53%/0.1),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(28_88%_53%/0.1),transparent_50%)]" />

              <div className="relative p-8 md:p-10 lg:p-12 xl:p-16">
                <div className="text-center space-y-6 md:space-y-8 lg:space-y-10">
                  {/* Appo Wordmark */}
                  <div className="flex justify-center">
                    <Image src={appoWordmark} alt="Appo" className="h-7 md:h-7.5 lg:h-8 w-auto" />
                  </div>

                  <div className="space-y-6">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                      Ready to build self-service that works?
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                      See how Appo transforms support with AI-powered help centers, multilingual publishing, and content gap analysis.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <RouteButton size="lg" className="text-base px-8 py-6 md:px-9 md:py-6 lg:px-10 lg:py-7 shadow-xl shadow-[#F28D1B]/20 bg-[#F28D1B] hover:bg-[#FFB633]" href="/contact-sales">
                      Contact Sales
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </RouteButton>
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

export default ProductHelpCenters;
