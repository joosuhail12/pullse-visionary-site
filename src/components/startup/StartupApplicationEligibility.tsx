'use client';

import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, Users } from 'lucide-react';

const StartupApplicationEligibility = () => {
  return (
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
  );
};

export default StartupApplicationEligibility;
