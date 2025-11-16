'use client';

import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, Zap, Shield } from 'lucide-react';

const StartupApplicationBenefits = () => {
  return (
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
  );
};

export default StartupApplicationBenefits;
