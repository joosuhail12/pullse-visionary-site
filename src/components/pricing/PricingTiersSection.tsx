'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  CheckCircle2,
  Sparkles,
  Zap,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Target,
  Shield,
  Clock,
  TrendingUp,
  Check,
  ArrowDown,
} from 'lucide-react';
import { pricingTiers, creditPricing, trialBenefits } from '@/data/pricingData';

const PricingTiersSection = () => {
  const [expandedTier, setExpandedTier] = useState<string | null>(null);

  return (
    <section className="pb-8 md:pb-10 lg:pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 xl:gap-12">
            {pricingTiers.map((tier, index) => {
              const isExpanded = expandedTier === tier.id;
              const isPro = tier.id === 'pro';

              return (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative ${
                    isPro ? 'md:scale-105 z-10' : ''
                  }`}
                >
                  {/* Card */}
                  <div
                    className={`relative h-full p-4 sm:p-5 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl bg-white/80 backdrop-blur-xl border-2 transition-all duration-500 ${
                      isPro
                        ? 'border-primary shadow-2xl shadow-primary/20'
                        : 'border-white/60 shadow-xl hover:shadow-2xl'
                    }`}
                  >
                    {/* Gradient Accent */}
                    {isPro && (
                      <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br from-primary/5 via-purple-500/5 to-transparent pointer-events-none" />
                    )}

                    <div className="relative z-10">
                      {/* Tier Name */}
                      <div className="mb-3 md:mb-4">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1.5 md:mb-2">
                          {tier.name}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-600">
                          {tier.tagline}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="mb-6">
                        {/* Base Platform Price */}
                        <div className="mb-3">
                          <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-4xl md:text-5xl font-bold text-gray-900">
                              ${tier.monthlyPricePerSeat}
                            </span>
                            <span className="text-xl text-gray-600">
                              /seat/month
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            Base platform with all features
                          </p>
                        </div>

                        {/* AI Usage Pricing */}
                        <div className="p-3 rounded-xl bg-gradient-to-r from-primary/5 to-purple-500/5 border border-primary/20">
                          <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                            + AI Usage Credits
                          </p>
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Pay-as-you-go:</span>
                              <span className="font-bold text-gray-900">${tier.creditPricing.payAsYouGo.toFixed(2)}/credit</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-primary font-medium">Pre-committed:</span>
                              <span className="font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">${tier.creditPricing.preCommitted.toFixed(2)}/credit</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Included Credits */}
                      <div className="mb-6 p-3 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="h-5 w-5 text-green-600" />
                          <p className="text-sm font-bold text-green-800 uppercase tracking-wider">
                            Included Monthly Credits
                          </p>
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-green-700">Chatbot credits:</span>
                            <span className="text-lg font-bold text-green-900">{tier.id === 'pro' ? '100' : '50'}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-green-700">Per-seat credits:</span>
                            <span className="text-lg font-bold text-green-900">{tier.id === 'pro' ? '50' : '20'}/seat</span>
                          </div>
                        </div>
                        <div className="mt-2 pt-2 border-t border-green-300">
                          <p className="text-xs text-green-700">
                            Example with 5 seats: <span className="font-bold">{tier.id === 'pro' ? '350' : '150'} credits/month</span>
                          </p>
                        </div>
                      </div>

                      {/* Key Features */}
                      <div className="mb-6">
                        <p className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                          Key Features
                        </p>
                        <ul className="space-y-2 mb-3">
                          {tier.keyFeatures.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-700">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <a
                          href="#feature-comparison"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                        >
                          View full feature comparison
                          <ArrowDown className="h-4 w-4" />
                        </a>
                      </div>

                      {/* CTA Button */}
                      <Button
                        size="lg"
                        className={`w-full text-base py-6 ${
                          isPro
                            ? 'bg-gradient-to-r from-primary via-purple-500 to-purple-600 hover:from-primary/90 hover:via-purple-500/90 hover:to-purple-600/90 shadow-lg'
                            : ''
                        }`}
                        variant={isPro ? 'default' : 'outline'}
                        asChild
                      >
                        <Link href={tier.ctaLink}>
                          {tier.ctaText}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>

                      {/* Footnote */}
                      <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                        {tier.footnote}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingTiersSection;
