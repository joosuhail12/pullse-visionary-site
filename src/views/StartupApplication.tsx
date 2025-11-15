'use client';

import { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageLiquidBackground from '@/components/PageLiquidBackground';

const LiquidEther = lazy(() => import('@/components/LiquidEther'));
import StartupApplicationForm from '@/components/startup/StartupApplicationForm';
import { startupProgram } from '@/data/pricingData';
import { Sparkles, Check, CheckCircle2, Clock, Users, Calendar, Shield, Zap, ChevronDown, Lock } from 'lucide-react';

const StartupApplication = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

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

      {/* ========================================
          SECTION 1: HERO
      ======================================== */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] lg:min-h-screen flex items-center justify-center pt-16 md:pt-20 overflow-hidden">
        {/* Hero Liquid Ether Effect */}
        <div className="absolute inset-0 -z-10 opacity-70 hidden md:block">
          <Suspense fallback={<div className="w-full h-full" />}>
            <LiquidEther
              colors={["#FF00C8", "#A805FF", "#D3A9EA"]}
              mouseForce={20}
              cursorSize={110}
              isViscous={false}
              resolution={0.55}
              autoDemo
              autoSpeed={0.35}
              autoIntensity={1.6}
            />
          </Suspense>
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-5 md:space-y-6 lg:space-y-8"
            >
              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent leading-snug pb-1">
                Early stage shouldn't mean limited tools.
              </h1>

              {/* Subhead */}
              <p className="text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto font-medium">
                We know what it's like to build with limited resources. That's why we're giving early-stage companies 50% off Pullse for 12 months—so you can focus on building your product, not managing support infrastructure.
              </p>

              {/* Trust Signals - Inline */}
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs md:text-sm lg:text-base text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>15 seats included</span>
                </div>
                <span className="text-gray-400">•</span>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>All Pro features</span>
                </div>
                <span className="text-gray-400">•</span>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>2-day approval</span>
                </div>
              </div>

              {/* CTA Button */}
              <div>
                <motion.a
                  href="#application-form"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative inline-flex items-center gap-2 px-6 py-3.5 md:px-8 md:py-4 lg:px-10 lg:py-5 rounded-lg md:rounded-xl bg-gradient-to-r from-primary via-purple-500 to-purple-600 text-white font-bold text-base md:text-lg shadow-2xl shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 overflow-hidden"
                >
                  {/* Shimmer effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                  <span className="relative">Start Your Application</span>
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 relative" />
                </motion.a>
                <p className="text-xs md:text-sm text-gray-500 mt-3 md:mt-4">
                  3-minute application • No credit card required
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 2: BENEFITS (FEATURE-FOCUSED)
      ======================================== */}
      <section className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-r from-primary/5 via-purple-500/5 to-transparent overflow-hidden">
        {/* Decorative grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] -z-10" />

        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 md:mb-12 lg:mb-16"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent leading-snug pb-1">
                Everything you need to build and scale
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-medium">
                Access enterprise-grade AI capabilities designed for your stage
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-5 md:gap-6 lg:gap-8">
              {/* Benefit 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="glass-strong p-5 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl border-2 border-primary/20 hover:border-primary/40 shadow-lg shadow-primary/10 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300"
              >
                <div className="mb-4">
                  <motion.div
                    whileHover={{ rotate: 3, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mb-3 md:mb-4 shadow-lg shadow-primary/30"
                  >
                    <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </motion.div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">
                    AI agents that scale with you
                  </h3>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                    Deploy autonomous AI capabilities without hiring a specialist team
                  </p>
                  <p className="text-xs md:text-sm font-semibold text-primary">
                    → Ship features 3x faster
                  </p>
                </div>
              </motion.div>

              {/* Benefit 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="glass-strong p-5 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl border-2 border-primary/20 hover:border-primary/40 shadow-lg shadow-primary/10 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300"
              >
                <div className="mb-4">
                  <motion.div
                    whileHover={{ rotate: 3, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mb-3 md:mb-4 shadow-lg shadow-primary/30"
                  >
                    <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </motion.div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">
                    Full platform access from day one
                  </h3>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                    All Pro features unlocked - unified inbox, AI copilot, Auto-QA, analytics
                  </p>
                  <p className="text-xs md:text-sm font-semibold text-primary">
                    → No crippled features, no upsells
                  </p>
                </div>
              </motion.div>

              {/* Benefit 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="glass-strong p-5 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl border-2 border-primary/20 hover:border-primary/40 shadow-lg shadow-primary/10 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300"
              >
                <div className="mb-4">
                  <motion.div
                    whileHover={{ rotate: 3, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mb-3 md:mb-4 shadow-lg shadow-primary/30"
                  >
                    <Zap className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </motion.div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">
                    Production-ready infrastructure
                  </h3>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                    Skip months of DevOps setup and integration hell
                  </p>
                  <p className="text-xs md:text-sm font-semibold text-primary">
                    → Launch in days, not quarters
                  </p>
                </div>
              </motion.div>

              {/* Benefit 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="glass-strong p-5 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl border-2 border-primary/20 hover:border-primary/40 shadow-lg shadow-primary/10 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300"
              >
                <div className="mb-4">
                  <motion.div
                    whileHover={{ rotate: 3, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mb-3 md:mb-4 shadow-lg shadow-primary/30"
                  >
                    <Shield className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </motion.div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">
                    12 months to prove ROI
                  </h3>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                    50% off gives you runway to validate product-market fit
                  </p>
                  <p className="text-xs md:text-sm font-semibold text-primary">
                    → Focus on building, not burning budget
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 3: ELIGIBILITY (3-TIER SYSTEM)
      ======================================== */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 md:mb-12 lg:mb-16"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent leading-snug pb-1">
                Three ways to qualify
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-medium">
                Most early-stage companies fit at least one of these categories
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-4 md:gap-5 lg:gap-6 mb-8 md:mb-10 lg:mb-12">
              {/* Tier 1: Early-Stage */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="glass-strong p-5 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl border border-primary/20 hover:border-primary/40 shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 bg-primary/5"
              >
                <div className="text-center mb-4 md:mb-5 lg:mb-6">
                  <motion.div
                    whileHover={{ rotate: 3, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg shadow-primary/30"
                  >
                    <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </motion.div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Early-Stage Startups</h3>
                </div>
                <div className="space-y-2.5 md:space-y-3 mb-4 md:mb-5 lg:mb-6">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm text-gray-700">Less than 3 years old</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm text-gray-700">≤ $2M ARR or ≤ $5M raised</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm text-gray-700">Up to 15 seats</span>
                  </div>
                </div>
                <div className="pt-3 md:pt-4 border-t border-primary/20">
                  <p className="text-sm font-semibold text-primary text-center">
                    → 50% off for 12 months
                  </p>
                </div>
              </motion.div>

              {/* Tier 2: Accelerator-Backed */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="glass-strong p-5 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl border-2 border-primary/30 hover:border-primary/50 shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 bg-primary/10 relative"
              >
                {/* Corner accent decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-tr-3xl" />

                <div className="text-center mb-6 relative z-10">
                  <motion.div
                    whileHover={{ rotate: 3, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/40"
                  >
                    <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </motion.div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Accelerator-Backed</h3>
                </div>
                <div className="space-y-3 mb-6 relative z-10">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm text-gray-700">YC, Techstars, Antler, or similar</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm text-gray-700">Any funding stage</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm text-gray-700">Up to 15 seats</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-primary/30 relative z-10">
                  <p className="text-sm font-semibold text-primary text-center">
                    → 50% off for 12 months
                  </p>
                </div>
              </motion.div>

              {/* Tier 3: Growing Startups */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="glass-strong p-5 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl border-2 border-primary/40 hover:border-primary/60 shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 bg-primary/15"
              >
                <div className="text-center mb-4 md:mb-5 lg:mb-6">
                  <motion.div
                    whileHover={{ rotate: 3, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg shadow-primary/30"
                  >
                    <Users className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </motion.div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Growing Startups</h3>
                </div>
                <div className="space-y-2.5 md:space-y-3 mb-4 md:mb-5 lg:mb-6">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm text-gray-700">Series A or earlier</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm text-gray-700">Need more than 15 seats</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm text-gray-700">Contact for custom terms</span>
                  </div>
                </div>
                <div className="pt-3 md:pt-4 border-t border-primary/40">
                  <p className="text-sm font-semibold text-primary text-center">
                    → Volume discounts available
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Friction Reducer */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 md:mb-10 lg:mb-12"
            >
              <p className="text-sm md:text-base text-gray-600">
                Not sure if you qualify? <span className="font-bold text-primary">Apply anyway</span> - most startups fit one of these tiers.
              </p>
            </motion.div>

            {/* What Happens After */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <div className="p-5 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-br from-purple-50/50 via-pink-50/30 to-blue-50/30 border-2 border-primary/20 shadow-lg">
                <h4 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4 text-center">
                  After 12 months
                </h4>
                <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <p>Automatically receive 25% off for year 2</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <p>Then transition to standard pricing</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <p>No surprises, no contracts</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 4: FAQ
      ======================================== */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 md:mb-10 lg:mb-12"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent leading-snug pb-1">
                Questions before you apply?
              </h2>
            </motion.div>

            {/* Category Accordion */}
            <div className="space-y-4 md:space-y-5 lg:space-y-6">
              {faqCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: categoryIndex * 0.1, duration: 0.4 }}
                  className="glass-strong rounded-2xl md:rounded-3xl border-2 border-primary/20 overflow-hidden shadow-lg"
                >
                  {/* Category Header */}
                  <button
                    onClick={() => setOpenCategory(openCategory === category.category ? null : category.category)}
                    className="w-full p-4 md:p-5 lg:p-6 flex items-center justify-between hover:bg-primary/5 transition-colors"
                  >
                    <div className="flex items-center gap-2 md:gap-3">
                      <span className="text-xl md:text-2xl">{category.icon}</span>
                      <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900">{category.category}</h3>
                      <span className="text-xs md:text-sm font-medium text-gray-500 bg-white px-2 md:px-2.5 py-0.5 md:py-1 rounded-full border border-gray-200">
                        {category.questions.length} {category.questions.length === 1 ? 'question' : 'questions'}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 md:w-6 md:h-6 text-primary transition-transform duration-300 ${
                        openCategory === category.category ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Questions List */}
                  <AnimatePresence>
                    {openCategory === category.category && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
                        className="overflow-hidden border-t-2 border-primary/10"
                      >
                        <div className="p-4 md:p-5 lg:p-6 space-y-4 md:space-y-5 lg:space-y-6 bg-primary/5">
                          {category.questions.map((faq, faqIndex) => (
                            <div
                              key={faqIndex}
                              className="bg-white rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 shadow-sm"
                            >
                              <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-2 md:mb-3">
                                {faq.question}
                              </h4>
                              <div className="pl-3 md:pl-4 border-l-2 border-primary/30">
                                <p className="text-xs md:text-sm lg:text-base text-gray-700 leading-relaxed">
                                  {faq.answer}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* "Still have questions?" CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-8 md:mt-10 lg:mt-12"
            >
              <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">Still have questions?</p>
              <a
                href="#application-form"
                className="inline-flex items-center gap-2 text-sm md:text-base text-primary font-semibold hover:underline transition-all"
              >
                Apply now and ask us directly
                <ChevronDown className="w-3.5 h-3.5 md:w-4 md:h-4 rotate-[-90deg]" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 5: APPLICATION FORM
      ======================================== */}
      <section id="application-form" className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white via-gray-50/30 to-white overflow-hidden">
        {/* Decorative grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.02)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] -z-10" />

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 md:mb-10 lg:mb-12"
            >
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
            </motion.div>

            <StartupApplicationForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StartupApplication;
