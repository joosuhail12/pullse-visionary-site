// Server Component - no 'use client' directive
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageLiquidBackground from '@/components/PageLiquidBackground';
import CompanyHeroBackground from '@/components/company/CompanyHeroBackground';
import CompanyHeroContent from '@/components/company/CompanyHeroContent';
import CompanyBentoGrid from '@/components/company/CompanyBentoGrid';
import CompanyAntlerCard from '@/components/company/CompanyAntlerCard';
import CompanyCtaSection from '@/components/company/CompanyCtaSection';
import {
  cta,
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
          SECTION 2: MISSION & WHY NOW
      ======================================== */}
      <section className="relative py-12 md:py-16 lg:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background -z-10" />
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-6 md:space-y-8 text-center">
            <div className="space-y-3">
              <p className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                Our mission
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                Build less software, get more work done.
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                We’re replacing tool sprawl with agentic platforms that share one brain across your stack, so humans and AI work in the same environment and outcomes compound.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {[
                {
                  title: 'One brain, shared context',
                  body: 'Unified architecture so agents (human + AI) see the same data, act with guardrails, and hand work off seamlessly.',
                },
                {
                  title: 'Start in support, design for scale',
                  body: 'Support is our first proof point, but the pattern—always-on agents + on-demand copilots—extends to every function.',
                },
                {
                  title: 'Humans stay in control',
                  body: 'Every action AI can take, people can too. Approvals, audit trails, and policy are built in from day one.',
                },
                {
                  title: 'Speed with respect',
                  body: 'Ship fast for teams drowning in tabs, iterate with customers, and keep the stack coherent as capabilities grow.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border/60 bg-card/70 p-5 md:p-6 text-left shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 3: FOUNDER'S LETTER - Modern Bento Grid
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
          SECTION 4: TRANSPARENCY & TRUST
      ======================================== */}
      <section className="relative py-12 md:py-16 lg:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background -z-10" />
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <p className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                Radical transparency
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">How we operate, in the open</h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                Clarity on pricing, data, and accountability—so you know exactly how we work with you.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {[
                {
                  title: 'Straightforward pricing',
                  body: 'No gotchas or per-resolution surprises. Every capability is visible up front.',
                  link: { href: '/pricing', label: 'View pricing' },
                },
                {
                  title: 'Data ownership',
                  body: 'You own your data. We explain what we collect, why, and give you controls to export or delete.',
                  link: { href: '/legal', label: 'Security & policies' },
                },
                {
                  title: 'Hands-on support',
                  body: 'If something breaks, we fix it. If you’re stuck, we pair with you. Outcomes are the metric that matters.',
                  link: { href: '/contact-sales', label: 'Talk to us' },
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border/60 bg-card/70 p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-3">{item.body}</p>
                  <a
                    href={item.link.href}
                    className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    {item.link.label} →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 5: BACKED BY ANTLER
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
          SECTION 6: GET STARTED
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
