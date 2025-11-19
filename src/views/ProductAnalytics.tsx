// Server Component - no 'use client' directive
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";

// Import client islands
import ScrollProgressIndicator from "@/components/product-inbox/ScrollProgressIndicator";
import ProductAnalyticsHeroBackground from "@/components/product-analytics/ProductAnalyticsHeroBackground";
import ProductAnalyticsHeroSection from "@/components/product-analytics/ProductAnalyticsHeroSection";
import ProductAnalyticsBentoSection from "@/components/product-analytics/ProductAnalyticsBentoSection";
import ProductAnalyticsFinalCTA from "@/components/product-analytics/ProductAnalyticsFinalCTA";

// Import screenshot
import analyticsScreenshot from "@/assets/analytics-screenshot.webp";

const ProductAnalytics = () => {
  return (
    <div className="min-h-screen relative">
      <PageLiquidBackground opacity={0.45} />
      <Navigation />

      <main id="main-content" role="main">
      {/* Scroll Progress Indicator - Client Component */}
      <ScrollProgressIndicator />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] lg:min-h-screen flex items-center pt-24 pb-16 md:pt-32 lg:pt-40 md:pb-24 lg:pb-32 overflow-hidden">
        {/* Enhanced gradient mesh background */}
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_50%)]" />

        {/* Hero Liquid Ether Effect - Client Component */}
        <ProductAnalyticsHeroBackground />

        <div className="container mx-auto px-6 relative">
          {/* Hero Content - Client Component */}
          <ProductAnalyticsHeroSection analyticsScreenshot={analyticsScreenshot} />
        </div>
      </section>

      {/* Report Types Bento Grid */}
      <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-muted/10 via-muted/5 to-transparent">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08),transparent_60%)]" />

        <div className="container mx-auto px-6 relative">
          <div className="max-w-7xl mx-auto">
            {/* Bento Section - Client Component */}
            <ProductAnalyticsBentoSection />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
        {/* Enhanced gradient mesh background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.15),transparent_60%)]" />

        <div className="container mx-auto px-6 relative">
          <div className="max-w-5xl mx-auto">
            {/* Final CTA - Client Component */}
            <ProductAnalyticsFinalCTA />
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductAnalytics;
