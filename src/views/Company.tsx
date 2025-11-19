// Server Component - no 'use client' directive
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageLiquidBackground from '@/components/PageLiquidBackground';
import CompanyHeroBackground from '@/components/company/CompanyHeroBackground';
import CompanyHeroContent from '@/components/company/CompanyHeroContent';
import CompanyBentoGrid from '@/components/company/CompanyBentoGrid';
import CompanyBeliefGrid from '@/components/company/CompanyBeliefGrid';
import CompanyAntlerCard from '@/components/company/CompanyAntlerCard';
import CompanyCtaSection from '@/components/company/CompanyCtaSection';
import {
  cta,
  whatWeBelieve,
  antler,
} from '@/data/companyData';
import antlerLogo from '@/assets/new-images/antler-logo.png';

const Company = () => {
  return (
    <div className="min-h-screen">
      <PageLiquidBackground opacity={0.3} />
      <Navigation />

      <main id="main-content" role="main">
      {/* ========================================
          SECTION 1: HERO - Founder-Led
      ======================================== */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] lg:min-h-screen flex items-center overflow-hidden pt-16 md:pt-20">
        {/* Gradient Base Layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-background -z-20" />

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] -z-20" />

        {/* Liquid Ether Background - Client Component */}
        <CompanyHeroBackground />

        <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
          <div className="max-w-5xl mx-auto">
            {/* Hero Content - Client Component */}
            <CompanyHeroContent cta={cta} />
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 2: FOUNDER'S LETTER - Modern Bento Grid
      ======================================== */}
      <section className="relative py-12 md:py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-background via-muted/5 to-background">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-purple-500/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Bento Grid - Client Component */}
            <CompanyBentoGrid />
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 3: WHAT WE BELIEVE
      ======================================== */}
      <section className="relative py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Belief Grid - Client Component */}
            <CompanyBeliefGrid
              title={whatWeBelieve.title}
              subtitle={whatWeBelieve.subtitle}
              beliefs={whatWeBelieve.beliefs}
            />
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 4: BACKED BY ANTLER
      ======================================== */}
      <section className="relative py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Antler Card - Client Component */}
            <CompanyAntlerCard antler={antler} antlerLogo={antlerLogo} />
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 5: GET STARTED
      ======================================== */}
      <section className="relative py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto relative">
            {/* CTA Section - Client Component */}
            <CompanyCtaSection cta={cta} />
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
};

export default Company;
