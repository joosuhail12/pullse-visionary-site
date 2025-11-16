'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

const PricingStartupProgramSection = () => {
  return (
    <section className="py-10 md:py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="relative group"
          >
            <Link href="/apply/startup" className="block">
              <div className="relative p-5 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl border-2 border-orange-500/30 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                {/* Background gradient accent */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-5 lg:gap-6">
                  {/* Left: Badge + Content */}
                  <div className="flex items-center gap-3 md:gap-4 flex-1">
                    <div className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Sparkles className="w-5 h-5 md:w-5.5 md:h-5.5 lg:w-6 lg:h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="inline-flex items-center gap-1.5 md:gap-2 px-2.5 py-0.5 md:px-3 md:py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-1.5 md:mb-2">
                        <span className="text-[10px] md:text-xs font-bold text-orange-600 uppercase tracking-wider">
                          FOR STARTUPS
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-0.5 md:mb-1">
                        50% off for 12 months
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600">
                        Early-stage companies ≤$2M ARR • Up to 15 seats
                      </p>
                    </div>
                  </div>

                  {/* Right: CTA */}
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center gap-1.5 md:gap-2 px-4 py-2.5 md:px-5 md:py-3 lg:px-6 lg:py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold shadow-lg group-hover:shadow-xl transition-all text-sm md:text-base">
                      <span>Learn More & Apply</span>
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingStartupProgramSection;
