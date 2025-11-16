'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, AlertCircle, ChevronDown, ChevronUp, Star, CheckCircle2 } from 'lucide-react';
import { featureComparison, policyFootnotes } from '@/data/pricingData';

const PricingFeatureTableSection = () => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['ai-support']);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const isCategoryExpanded = (categoryId: string) => {
    return expandedCategories.includes(categoryId);
  };

  return (
    <section id="feature-comparison" className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16 lg:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-primary bg-clip-text text-transparent">
                Every feature,
                <br />
                side by side
              </span>
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Transparent pricing with no hidden features. See exactly what you get with each plan.
            </p>
          </motion.div>

          {/* Desktop Table View */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hidden md:block overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-xl"
          >
            {/* Table Header - Sticky */}
            <div className="grid grid-cols-3 gap-8 px-8 py-6 bg-gradient-to-br from-gray-50 to-white border-b border-gray-200 sticky top-0 z-20 backdrop-blur-md bg-white/95">
              <div className="flex items-center">
                <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Features
                </span>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-white border-2 border-gray-200 shadow-sm">
                  <span className="font-bold text-gray-900">Standard</span>
                </div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-purple-600 shadow-md hover:shadow-lg transition-shadow">
                  <Star className="h-4 w-4 fill-white text-white" />
                  <span className="font-bold text-white">Pro</span>
                </div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {featureComparison.map((category, categoryIdx) => {
                const isExpanded = isCategoryExpanded(category.id);

                return (
                  <div key={category.id}>
                    {/* Collapsible Category Header */}
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="w-full px-8 py-6 bg-gradient-to-r from-gray-50/50 to-white hover:from-gray-50 hover:to-white border-b border-gray-100 transition-all duration-300 group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="text-left">
                              <h3 className="font-bold text-gray-900 text-lg mb-1">
                                {category.category}
                              </h3>
                              <p className="text-sm text-gray-600 font-normal">
                                {category.categoryDescription}
                              </p>
                            </div>
                            <div className="flex items-center gap-3 ml-4">
                              <span className="text-xs font-medium text-gray-600 bg-white px-2.5 py-1 rounded-full border border-gray-200">
                                {category.features.length} features
                              </span>
                              {isExpanded ? (
                                <ChevronUp className="h-5 w-5 text-gray-600 transition-transform duration-300" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-gray-600 transition-transform duration-300" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>

                    {/* Category Features (Collapsible) */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          {category.features.map((feature, featureIdx) => (
                            <div
                              key={featureIdx}
                              className={`grid grid-cols-3 gap-8 px-8 py-6 hover:bg-gray-50/70 transition-all duration-200 relative border-b border-gray-100 last:border-b-0 ${
                                feature.proOnly ? 'bg-gradient-to-r from-purple-50/40 via-purple-50/20 to-transparent' : ''
                              }`}
                            >
                              {/* Feature Name & Description */}
                              <div className="relative group">
                                <div className="flex items-start gap-2">
                                  <div className="flex-1">
                                    <div className="font-semibold text-gray-900 mb-1.5 flex items-center gap-2 flex-wrap">
                                      <span>{feature.name}</span>
                                      {feature.tooltip && (
                                        <div className="relative inline-block">
                                          <AlertCircle className="h-4 w-4 text-gray-600 hover:text-primary cursor-help transition-colors" />
                                          {/* Tooltip */}
                                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 p-4 bg-gray-900 text-white text-sm rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 shadow-2xl">
                                            <div className="font-semibold mb-2 text-white">💡 Why this matters:</div>
                                            <p className="text-gray-100 leading-relaxed">{feature.tooltip}</p>
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-2 border-[6px] border-transparent border-t-gray-900"></div>
                                          </div>
                                        </div>
                                      )}
                                      {feature.usesCredits && (
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-800 border border-cyan-300 shadow-sm">
                                          Uses AI Credits
                                        </span>
                                      )}
                                      {feature.comingSoon && (
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border border-yellow-300 shadow-sm">
                                          Coming Soon
                                        </span>
                                      )}
                                      {feature.proOnly && (
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-purple-100 to-fuchsia-100 text-purple-800 border border-purple-300 shadow-sm">
                                          Pro Only
                                        </span>
                                      )}
                                    </div>
                                    {feature.description && (
                                      <div className="text-sm text-gray-600 leading-relaxed">
                                        {feature.description}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Standard Column */}
                              <div className="flex items-center justify-center">
                                {feature.standard === 'coming-soon' ? (
                                  <span className="text-sm font-semibold text-yellow-700 bg-yellow-50 px-3 py-1 rounded-lg">Coming Soon</span>
                                ) : typeof feature.standard === 'boolean' ? (
                                  feature.standard ? (
                                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                                  ) : (
                                    <X className="h-6 w-6 text-gray-300" />
                                  )
                                ) : (
                                  <span className="text-sm font-bold text-gray-900 bg-gray-100 px-3 py-1.5 rounded-lg">
                                    {feature.standard}
                                  </span>
                                )}
                              </div>

                              {/* Pro Column */}
                              <div className="flex items-center justify-center">
                                {feature.pro === 'coming-soon' ? (
                                  <span className="text-sm font-semibold text-yellow-700 bg-yellow-50 px-3 py-1 rounded-lg">Coming Soon</span>
                                ) : typeof feature.pro === 'boolean' ? (
                                  feature.pro ? (
                                    <CheckCircle2 className="h-6 w-6 text-primary" />
                                  ) : (
                                    <X className="h-6 w-6 text-gray-300" />
                                  )
                                ) : (
                                  <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-lg">
                                    {feature.pro}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4 md:space-y-6">
            {featureComparison.map((category, categoryIdx) => {
              const isExpanded = isCategoryExpanded(category.id);

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: categoryIdx * 0.1 }}
                  className="rounded-xl md:rounded-2xl bg-white border border-gray-200 shadow-lg overflow-hidden"
                >
                  {/* Collapsible Category Header */}
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full px-4 py-4 md:px-5 md:py-5 bg-gradient-to-r from-gray-50/50 to-white hover:from-gray-50 hover:to-white border-b border-gray-200 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 text-left">
                        <h3 className="font-bold text-gray-900 text-sm md:text-base mb-1">
                          {category.category}
                        </h3>
                        <p className="text-[10px] md:text-xs text-gray-600">
                          {category.categoryDescription}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 md:gap-2.5 ml-3">
                        <span className="text-[10px] md:text-xs font-medium text-gray-600 bg-white px-1.5 py-0.5 md:px-2 md:py-1 rounded-full border border-gray-200">
                          {category.features.length}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 md:h-5 md:w-5 text-gray-600 flex-shrink-0 transition-transform" />
                        ) : (
                          <ChevronDown className="h-4 w-4 md:h-5 md:w-5 text-gray-600 flex-shrink-0 transition-transform" />
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Features (Collapsible) */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 md:p-5 space-y-4 md:space-y-5 bg-gray-50/30">
                          {category.features.map((feature, featureIdx) => (
                            <div
                              key={featureIdx}
                              className={`space-y-3 p-3 md:p-4 rounded-lg md:rounded-xl bg-white border border-gray-200 ${
                                feature.proOnly ? 'shadow-sm border-purple-200 bg-gradient-to-br from-purple-50/40 to-white' : 'shadow-sm'
                              }`}
                            >
                              <div>
                                <div className="font-semibold text-gray-900 mb-1.5 flex items-start gap-2 flex-wrap">
                                  <span className="flex-1">{feature.name}</span>
                                  {feature.usesCredits && (
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-800 border border-cyan-300 flex-shrink-0 shadow-sm">
                                      Uses AI Credits
                                    </span>
                                  )}
                                  {feature.comingSoon && (
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border border-yellow-300 flex-shrink-0 shadow-sm">
                                      Coming Soon
                                    </span>
                                  )}
                                  {feature.proOnly && (
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-purple-100 to-fuchsia-100 text-purple-800 border border-purple-300 flex-shrink-0 shadow-sm">
                                      Pro Only
                                    </span>
                                  )}
                                </div>
                                {feature.description && (
                                  <div className="text-sm text-gray-600 leading-relaxed">
                                    {feature.description}
                                  </div>
                                )}
                                {feature.tooltip && (
                                  <div className="mt-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                                    <div className="text-xs text-blue-900 leading-relaxed">
                                      <span className="font-bold">💡 Why this matters:</span> {feature.tooltip}
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Plan Comparison */}
                              <div className="grid grid-cols-2 gap-3">
                                {/* Standard */}
                                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                                  <div className="text-xs font-bold text-gray-600 mb-2.5 uppercase tracking-wide text-center">
                                    Standard
                                  </div>
                                  <div className="flex items-center justify-center min-h-[32px]">
                                    {feature.standard === 'coming-soon' ? (
                                      <span className="text-xs font-semibold text-yellow-700 bg-yellow-50 px-2 py-1 rounded">Coming Soon</span>
                                    ) : typeof feature.standard === 'boolean' ? (
                                      feature.standard ? (
                                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                                      ) : (
                                        <X className="h-6 w-6 text-gray-300" />
                                      )
                                    ) : (
                                      <span className="text-sm font-bold text-gray-900 text-center">
                                        {feature.standard}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* Pro */}
                                <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 border-2 border-primary/30 shadow-sm">
                                  <div className="text-xs font-bold text-primary mb-2.5 uppercase tracking-wide flex items-center justify-center gap-1">
                                    <Star className="h-3 w-3 fill-current" />
                                    Pro
                                  </div>
                                  <div className="flex items-center justify-center min-h-[32px]">
                                    {feature.pro === 'coming-soon' ? (
                                      <span className="text-xs font-semibold text-yellow-700 bg-yellow-50 px-2 py-1 rounded">Coming Soon</span>
                                    ) : typeof feature.pro === 'boolean' ? (
                                      feature.pro ? (
                                        <CheckCircle2 className="h-6 w-6 text-primary" />
                                      ) : (
                                        <X className="h-6 w-6 text-gray-300" />
                                      )
                                    ) : (
                                      <span className="text-sm font-bold text-primary text-center">
                                        {feature.pro}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingFeatureTableSection;
