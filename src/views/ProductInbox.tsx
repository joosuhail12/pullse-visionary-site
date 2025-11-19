// Server Component - no 'use client' directive
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";

// Import client islands
import ScrollProgressIndicator from "@/components/product-inbox/ScrollProgressIndicator";
import ProductInboxHeroBackground from "@/components/product-inbox/ProductInboxHeroBackground";
import ProductInboxHeroSection from "@/components/product-inbox/ProductInboxHeroSection";
import QuickValuePropsGrid from "@/components/product-inbox/QuickValuePropsGrid";
import AIFeaturesSection from "@/components/product-inbox/AIFeaturesSection";
import ProductInboxBentoGrid from "@/components/product-inbox/ProductInboxBentoGrid";
import AnalyticsStatsSection from "@/components/product-inbox/AnalyticsStatsSection";
import FinalCTASection from "@/components/product-inbox/FinalCTASection";

// Import screenshots
import fullInboxScreenshot from "@/assets/screenshots/full-inbox.png";
import aiRewritingScreenshot from "@/assets/screenshots/ai-rewriting.png";
import multiChannelScreenshot from "@/assets/screenshots/Multi-Channel-Unified-View.png";
import customerContextScreenshot from "@/assets/screenshots/Customer-Context-Panel.png";
import internalCollabScreenshot from "@/assets/screenshots/internal-collaboration.png";
import routingConfigScreenshot from "@/assets/screenshots/routing-config.png";
import cannedResponsesScreenshot from "@/assets/screenshots/canned-responses-library.png";
import searchFilterScreenshot from "@/assets/screenshots/search-filter.png";

const ProductInbox = () => {
  return (
    <div className="min-h-screen">
      <PageLiquidBackground opacity={0.45} />
      <Navigation />

      <main id="main-content" role="main">
      {/* Scroll Progress Indicator - Client Component */}
      <ScrollProgressIndicator />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] lg:min-h-screen flex items-center pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_50%)]" />

        {/* Hero Liquid Ether Effect - Client Component */}
        <ProductInboxHeroBackground />

        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Hero Content - Client Component */}
            <ProductInboxHeroSection fullInboxScreenshot={fullInboxScreenshot} />
          </div>
        </div>
      </section>

      {/* Quick Value Props Section */}
      <section className="relative py-20 bg-gradient-to-b from-muted/10 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Quick Value Props - Client Component */}
            <QuickValuePropsGrid />
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08),transparent_60%)]" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* AI Features - Client Component */}
            <AIFeaturesSection />
          </div>
        </div>
      </section>

      {/* Features Bento Grid Section */}
      <section className="relative py-32 bg-gradient-to-b from-muted/10 via-muted/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header - Server Rendered */}
            <div className="text-center mb-20 space-y-6">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
                Everything you need in one inbox
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Email, live chat, AI assistance, smart routing, and team collaboration—all unified
              </p>
            </div>

            {/* MagicBento Grid - Client Component */}
            <ProductInboxBentoGrid
              screenshots={{
                multiChannel: multiChannelScreenshot.src,
                aiRewriting: aiRewritingScreenshot.src,
                customerContext: customerContextScreenshot.src,
                searchFilter: searchFilterScreenshot.src,
                routingConfig: routingConfigScreenshot.src,
                internalCollab: internalCollabScreenshot.src,
                cannedResponses: cannedResponsesScreenshot.src,
              }}
            />
          </div>
        </div>
      </section>

      {/* Analytics & Results Section */}
      <section className="relative py-32 bg-gradient-to-b from-muted/10 via-muted/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Analytics Stats - Client Component */}
            <AnalyticsStatsSection />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.15),transparent_60%)]" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Final CTA - Client Component */}
            <FinalCTASection />
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductInbox;
