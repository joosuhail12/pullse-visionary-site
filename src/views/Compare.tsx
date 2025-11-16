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

      <CompareHeroSection />

      {/* Page Content */}
      <div className="container mx-auto px-4 relative z-10 pt-20">
        <CompetitorComparisonSection />
        <CompareContentSections />
      </div>

      <Footer />
    </div>
  );
};

export default Compare;
