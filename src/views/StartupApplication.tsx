// Server Component - no 'use client' directive
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageLiquidBackground from '@/components/PageLiquidBackground';
import StartupApplicationForm from '@/components/startup/StartupApplicationForm';
import { Lock, Shield, Clock } from 'lucide-react';

// Client islands
import StartupApplicationHero from '@/components/startup/StartupApplicationHero';
import StartupApplicationBenefits from '@/components/startup/StartupApplicationBenefits';
import StartupApplicationEligibility from '@/components/startup/StartupApplicationEligibility';
import StartupApplicationFAQ from '@/components/startup/StartupApplicationFAQ';

const StartupApplication = () => {
  const faqCategories = [
    {
      category: "Eligibility & Requirements",
      icon: "🎯",
      questions: [
        {
          question: 'Who is eligible for the startup program?',
          answer: 'Three main paths: early-stage startups (< $2M ARR or < $5M raised), accelerator-backed companies (YC, Techstars, Antler, etc.), or growing startups needing custom terms. When in doubt, just apply - we review applications within 24 hours.',
        },
        {
          question: 'What exactly do I get access to?',
          answer: 'Full access to all Pro features including AI agents, copilot, Auto-QA, unified inbox, analytics, and workflow automation. Nothing is crippled or held back. You get the same platform enterprise customers use.',
        },
      ]
    },
    {
      category: "Program Details",
      icon: "📄",
      questions: [
        {
          question: 'How long does the program last?',
          answer: '50% discount for 12 months, then automatically 25% off for year 2. After that, standard pricing applies. You\'re never locked in and can cancel anytime.',
        },
        {
          question: 'Can I switch between Standard and Pro plans?',
          answer: 'Yes, you can upgrade or downgrade anytime during the program. The 50% discount applies to whichever plan you choose.',
        },
        {
          question: 'What if I exceed 15 seats?',
          answer: 'Contact us before adding seats beyond 15. We offer volume discounts for growing teams and can work out custom terms.',
        },
      ]
    },
    {
      category: "Application & Billing",
      icon: "💳",
      questions: [
        {
          question: 'What happens when I apply?',
          answer: 'Applications are reviewed within 24 hours on business days. Once approved, you\'ll receive onboarding instructions and can start immediately. No lengthy evaluation or pitch deck required.',
        },
        {
          question: 'Do I need a credit card to apply?',
          answer: 'No credit card required to apply. We\'ll collect payment details only after approval and when you\'re ready to start.',
        },
        {
          question: 'I\'m already a Pullse customer - can I switch to the startup program?',
          answer: 'If you\'re currently on standard pricing and meet eligibility requirements, contact our team. We can help transition eligible customers to the startup program.',
        },
      ]
    },
  ];

  return (
    <div className="min-h-screen">
      <PageLiquidBackground opacity={0.45} />
      <Navigation />

      <main id="main-content" role="main">
      <StartupApplicationHero />

      <StartupApplicationBenefits />

      <StartupApplicationEligibility />

      <StartupApplicationFAQ faqCategories={faqCategories} />

      {/* Application Form Section */}
      <section id="application-form" className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white via-gray-50/30 to-white overflow-hidden">
        {/* Decorative grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.02)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] -z-10" />

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-10 lg:mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent leading-snug pb-1">
                Ready to get started?
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-4 md:mb-5 lg:mb-6 font-medium">
                2-minute application • Approved within 24 hours • No credit card required
              </p>

              {/* Trust Signals */}
              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 lg:gap-6 text-xs md:text-sm text-gray-600">
                <div className="flex items-center gap-1.5 md:gap-2">
                  <Lock className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
                  <span>Your data is secure</span>
                </div>
                <span className="text-gray-400">•</span>
                <div className="flex items-center gap-1.5 md:gap-2">
                  <Shield className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
                  <span>No credit card required</span>
                </div>
                <span className="text-gray-400">•</span>
                <div className="flex items-center gap-1.5 md:gap-2">
                  <Clock className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
                  <span>Response within 24 hours</span>
                </div>
              </div>
            </div>

            <StartupApplicationForm />
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
};

export default StartupApplication;
