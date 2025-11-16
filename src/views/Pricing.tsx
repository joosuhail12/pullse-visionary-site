import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageLiquidBackground from '@/components/PageLiquidBackground';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  AlertCircle,
  Check,
  ArrowRight,
} from 'lucide-react';
import {
  faqs,
  faqCategories,
  policyFootnotes,
  trialBenefits,
} from '@/data/pricingData';

// Client island imports
import PricingHeroSection from '@/components/pricing/PricingHeroSection';
import PricingTiersSection from '@/components/pricing/PricingTiersSection';
import PricingFeatureTableSection from '@/components/pricing/PricingFeatureTableSection';
import PricingCalculatorSection from '@/components/pricing/PricingCalculatorSection';
import PricingTrustSignalsSection from '@/components/pricing/PricingTrustSignalsSection';
import PricingStartupProgramSection from '@/components/pricing/PricingStartupProgramSection';

const Pricing = () => {
  return (
    <div className="min-h-screen">
      <PageLiquidBackground opacity={0.45} />
      <Navigation />

      {/* SECTION 1: HERO */}
      <PricingHeroSection />

      {/* SECTION 2: PRICING TIERS */}
      <PricingTiersSection />

      {/* SECTION 4: FEATURE COMPARISON TABLE */}
      <PricingFeatureTableSection />

      {/* SECTION 5: COMPETITIVE PRICING CALCULATOR */}
      <PricingCalculatorSection />

      {/* SECTION 6: TRUST SIGNALS */}
      <PricingTrustSignalsSection />

      {/* SECTION 8: STARTUP PROGRAM TRIGGER */}
      <PricingStartupProgramSection />

      {/* ========================================
          SECTION 9: FAQ
      ======================================== */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
                <span className="bg-gradient-to-r from-gray-900 to-primary bg-clip-text text-transparent">
                  Frequently asked questions
                </span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Everything you need to know about pricing
              </p>
            </div>

            {/* FAQ Categories */}
            <div className="space-y-8 md:space-y-10 lg:space-y-12">
              {faqCategories.map((category, categoryIndex) => (
                <div key={category.id}>
                  {/* Category Header */}
                  <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                    <span className="text-2xl md:text-3xl">{category.icon}</span>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">{category.category}</h3>
                  </div>

                  {/* Two-column grid of FAQs */}
                  <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                    {category.questions.map((faq, faqIndex) => (
                      <Accordion
                        key={faqIndex}
                        type="single"
                        collapsible
                      >
                        <AccordionItem
                          value="item-1"
                          className="bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl md:rounded-2xl px-4 md:px-5 lg:px-6 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <AccordionTrigger className="text-left hover:no-underline py-4 md:py-5">
                            <span className="font-semibold text-sm md:text-base text-gray-900 pr-4">
                              {faq.question}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-700 text-xs md:text-sm leading-relaxed pb-4 md:pb-5">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Policy Footnotes */}
            <div className="mt-12 md:mt-14 lg:mt-16 p-4 md:p-5 lg:p-6 rounded-xl md:rounded-2xl bg-gray-50 border border-gray-200">
              <p className="text-[10px] md:text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3 md:mb-4">
                Important Notes
              </p>
              <ul className="space-y-1.5 md:space-y-2">
                {policyFootnotes.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 md:gap-2">
                    <AlertCircle className="h-3 w-3 md:h-4 md:w-4 text-gray-500 flex-shrink-0 mt-0.5" />
                    <span className="text-[10px] md:text-xs text-gray-600">{note.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 10: FINAL CTA
      ======================================== */}
      <section className="py-10 md:py-12 lg:py-16 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
              {/* Left: Reassurance */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 md:gap-3 lg:gap-4">
                {trialBenefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/80 backdrop-blur-sm border border-white/60 shadow-sm"
                  >
                    <Check className="h-3 w-3 md:h-4 md:w-4 text-primary" />
                    <span className="text-xs md:text-sm font-medium text-gray-700">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              {/* Right: CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <a
                  href="/contact-sales"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8 bg-gradient-to-r from-primary via-purple-500 to-purple-600 hover:from-primary/90 hover:via-purple-500/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl text-primary-foreground md:text-base md:px-8 md:py-4"
                >
                  Contact Sales
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </a>
                <a
                  href="/contact-sales"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 md:text-base md:px-8 md:py-4"
                >
                  Schedule demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
