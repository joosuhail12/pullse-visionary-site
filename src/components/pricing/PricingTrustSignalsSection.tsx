'use client';

import { motion } from 'framer-motion';
import { trustSignals } from '@/data/pricingData';

const PricingTrustSignalsSection = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-transparent">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {trustSignals.map((signal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 mb-3 md:mb-4">
                  <signal.icon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-primary" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1.5 md:mb-2">
                  {signal.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  {signal.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingTrustSignalsSection;
