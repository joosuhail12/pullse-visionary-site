// Server Component - no 'use client' directive
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageLiquidBackground from '@/components/PageLiquidBackground';

// Import client islands
import CompareHeroSection from '@/components/compare/CompareHeroSection';
import CompetitorComparisonSection from '@/components/compare/CompetitorComparisonSection';
import CompareContentSections from '@/components/compare/CompareContentSections';

const Compare = () => {
  return (
    <div className="min-h-screen scroll-smooth">
      <PageLiquidBackground opacity={0.45} />
      <Navigation />

      <main id="main-content" role="main">
        <CompareHeroSection />

        {/* Page Content */}
        <div className="relative z-10 pt-8 md:pt-10 pb-10 md:pb-12 bg-gradient-to-b from-background via-primary/5 to-background">
          <CompetitorComparisonSection />
        </div>

        {/* Detailed Content Sections */}
        <div className="container mx-auto px-4 relative z-10">
          <CompareContentSections />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Compare;
