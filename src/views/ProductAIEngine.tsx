import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import InfrastructureShowcase from "@/components/InfrastructureShowcase";
import DeploymentComparison from "@/components/DeploymentComparison";

// Import client islands
import MorphingBackgroundTracker from "@/components/product-ai-engine/MorphingBackgroundTracker";
import ProductAIEngineHeroBackground from "@/components/product-ai-engine/ProductAIEngineHeroBackground";
import ProductAIEngineHeroContent from "@/components/product-ai-engine/ProductAIEngineHeroContent";
import StickyStepperSection from "@/components/product-ai-engine/StickyStepperSection";
import ProductAIEngineFinalCTA from "@/components/product-ai-engine/ProductAIEngineFinalCTA";

const ProductAIEngine = () => {
  return (
    <div className="min-h-screen relative">
      {/* Morphing WebGL Background */}
      <MorphingBackgroundTracker />

      <PageLiquidBackground opacity={0.45} />
      <Navigation />

      <main id="main-content" role="main">
        {/* Hero Section - Reimagined 2025 */}
        <section className="relative min-h-[60vh] md:min-h-[80vh] lg:min-h-screen flex items-center pt-20 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Enhanced gradient mesh background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary-rgb),0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1),transparent_50%)]" />

        <ProductAIEngineHeroBackground />
        <ProductAIEngineHeroContent />
      </section>

      {/* 8-Step Sticky Viewport Stepper */}
      <StickyStepperSection />

      {/* Infrastructure Showcase - Content & Action Centers */}
      <InfrastructureShowcase />

      {/* Deployment Comparison - Chatbots & Copilots */}
      <DeploymentComparison />

        {/* Final CTA - Ultra Modern */}
        <ProductAIEngineFinalCTA />
      </main>

      <Footer />
    </div>
  );
};

export default ProductAIEngine;
