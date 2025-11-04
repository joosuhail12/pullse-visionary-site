'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageLiquidBackground from '@/components/PageLiquidBackground';
import StartupApplicationForm from '@/components/startup/StartupApplicationForm';
import { startupProgram } from '@/data/pricingData';
import { Sparkles, Check, CheckCircle2, Clock, Users, Calendar } from 'lucide-react';

const StartupApplication = () => {
  return (
    <div className="min-h-screen">
      <PageLiquidBackground opacity={0.3} />
      <Navigation />

      {/* ========================================
          SECTION 1: HERO
      ======================================== */}
      <section className="pt-32 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-200/50 mb-6">
                  <Sparkles className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-bold text-orange-600 uppercase tracking-wider">
                    FOR STARTUPS
                  </span>
                </div>

                {/* Headline */}
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-orange-600 to-amber-600 bg-clip-text text-transparent">
                  {startupProgram.headline}
                </h1>

                {/* Subhead */}
                <p className="text-xl text-gray-600 mb-8">
                  {startupProgram.subhead}
                </p>

                {/* Key Highlights */}
                <div className="grid grid-cols-3 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="glass-strong p-4 rounded-2xl text-center border-2 border-orange-500/20"
                  >
                    <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent mb-1">
                      50%
                    </div>
                    <div className="text-xs font-semibold text-gray-600 uppercase">OFF</div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="glass-strong p-4 rounded-2xl text-center border-2 border-orange-500/20"
                  >
                    <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent mb-1">
                      12
                    </div>
                    <div className="text-xs font-semibold text-gray-600 uppercase">MONTHS</div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="glass-strong p-4 rounded-2xl text-center border-2 border-orange-500/20"
                  >
                    <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent mb-1">
                      15
                    </div>
                    <div className="text-xs font-semibold text-gray-600 uppercase">SEATS</div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Right Column - Pricing Comparison */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass-strong p-8 rounded-3xl border-2 border-orange-500/20 relative overflow-hidden"
              >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5"></div>

                <div className="relative z-10 space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Pricing</h3>

                  {/* Standard Plan */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/60">
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Standard Plan</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg text-gray-400 line-through">$49</span>
                        <span className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
                          $24.50
                        </span>
                        <span className="text-sm text-gray-600">/seat/mo</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
                      <Check className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Pro Plan */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/60">
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Pro Plan</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg text-gray-400 line-through">$79</span>
                        <span className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
                          $39.50
                        </span>
                        <span className="text-sm text-gray-600">/seat/mo</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
                      <Check className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 text-center pt-2">
                    First 12 months • Up to 15 seats
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 2: PROGRAM BENEFITS
      ======================================== */}
      <section className="py-20 bg-gradient-to-r from-orange-500/5 via-transparent to-amber-500/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4 text-gray-900">What You Get</h2>
              <p className="text-lg text-gray-600">
                Full platform access with startup-friendly pricing
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {startupProgram.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="glass-strong p-6 rounded-2xl hover:shadow-lg transition-all duration-300 border border-orange-500/10 hover:border-orange-500/30"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-gray-700 leading-relaxed pt-1">{benefit}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 3: ELIGIBILITY REQUIREMENTS
      ======================================== */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4 text-gray-900">Eligibility Checklist</h2>
              <p className="text-lg text-gray-600">
                Make sure you meet these requirements before applying
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column: Requirements */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Requirements</h3>
                {startupProgram.eligibility.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="glass-strong p-5 rounded-2xl border border-orange-500/10"
                  >
                    <div className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-gray-900 mb-1">{item.requirement}</p>
                        <p className="text-sm text-gray-600">{item.detail}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right Column: Documentation */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="glass-strong p-6 rounded-2xl border border-orange-500/10">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Documentation Needed</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Have these ready when you apply:
                  </p>
                  <ul className="space-y-3">
                    {startupProgram.documentation.map((doc, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0 mt-2"></div>
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-orange-50 border border-orange-200">
                  <h4 className="text-sm font-bold text-orange-900 uppercase tracking-wider mb-3">
                    What Happens Next
                  </h4>
                  <p className="text-sm text-orange-800 leading-relaxed">
                    {startupProgram.afterPeriod}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 4: APPLICATION FORM
      ======================================== */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4 text-gray-900">Apply Now</h2>
              <p className="text-lg text-gray-600">
                Takes 3-5 minutes to complete • We'll review within 2 business days
              </p>
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
