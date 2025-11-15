'use client';

import { useState, lazy, Suspense } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageLiquidBackground from '@/components/PageLiquidBackground';

const LiquidEther = lazy(() => import('@/components/LiquidEther'));
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import {
  CheckCircle2,
  Check,
  X,
  Sparkles,
  Zap,
  ArrowRight,
  ArrowDown,
  Target,
  Shield,
  Clock,
  TrendingUp,
  Users,
  Globe,
  BarChart3,
  Award,
  MessageSquare,
  Bot,
  Wrench,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Star,
  Building2,
  BookOpen,
} from 'lucide-react';
import {
  pricingTiers,
  creditPricing,
  billableActions,
  nonBillableActions,
  sharedFeatures,
  proOnlyFeature,
  autoQAFeatures,
  helpCenterComparison,
  faqs,
  faqCategories,
  policyFootnotes,
  startupProgram,
  trialBenefits,
  trustSignals,
  descriptiveFeatures,
  featureComparison,
  competitorPricingDetails,
  pullsePricingForComparison,
} from '@/data/pricingData';

const Pricing = () => {
  // State management
  const [expandedTier, setExpandedTier] = useState<string | null>(null);

  // Feature table states
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['ai-support']); // AI category expanded by default
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  // Competitive pricing calculator states
  const [selectedCompetitor, setSelectedCompetitor] = useState('zendesk');
  const [agents, setAgents] = useState(10);
  const [conversations, setConversations] = useState(5000);

  // Competitive pricing calculation logic
  const calculateCompetitivePricing = () => {
    const competitor = competitorPricingDetails.find(c => c.id === selectedCompetitor);
    if (!competitor) return null;

    // AI automation rate for variable costs (60% of conversations)
    const aiConversations = Math.round(conversations * 0.6);

    // Competitor cost calculation
    let competitorCost = 0;
    const effectiveSeats = competitor.minimumSeats
      ? Math.max(agents, competitor.minimumSeats)
      : agents;

    // Base seat cost
    const baseSeatCost = effectiveSeats * competitor.baseCostPerSeat;
    competitorCost = baseSeatCost;

    // Per-resolution costs (Intercom and Zendesk)
    let perResolutionCostTotal = 0;
    if (competitor.perResolutionCost) {
      perResolutionCostTotal = aiConversations * competitor.perResolutionCost;
      competitorCost += perResolutionCostTotal;
    }

    // Per-session costs (Freshdesk)
    let perSessionCostTotal = 0;
    if (competitor.perSessionCost) {
      const sessions = aiConversations / 1000;
      perSessionCostTotal = sessions * competitor.perSessionCost;
      competitorCost += perSessionCostTotal;
    }

    // Add-on costs (Dixa)
    let addOnCostTotal = 0;
    if (competitor.addOns && competitor.addOns.length > 0) {
      const totalAddOnCostPerSeat = competitor.addOns.reduce(
        (sum, addon) => sum + addon.costPerSeat,
        0
      );
      addOnCostTotal = effectiveSeats * totalAddOnCostPerSeat;
      competitorCost += addOnCostTotal;
    }

    // AI Agent per-conversation costs (Dixa) - applied to 60% of conversations
    let aiAgentConversationCostTotal = 0;
    if (competitor.aiAgentPerConversationCost) {
      aiAgentConversationCostTotal = aiConversations * competitor.aiAgentPerConversationCost;
      competitorCost += aiAgentConversationCostTotal;
    }

    // Auto QA per-conversation costs (Dixa) - applied to 100% of conversations
    let autoQAConversationCostTotal = 0;
    if (competitor.autoQAPerConversationCost) {
      autoQAConversationCostTotal = conversations * competitor.autoQAPerConversationCost;
      competitorCost += autoQAConversationCostTotal;
    }

    // Connector Task costs (Freshdesk) - applied to 60% of conversations
    let connectorTaskCostTotal = 0;
    if (competitor.connectorTasksPerConversation && competitor.connectorTaskCostPer5000) {
      const totalTasks = aiConversations * competitor.connectorTasksPerConversation;
      connectorTaskCostTotal = (totalTasks / 5000) * competitor.connectorTaskCostPer5000;
      competitorCost += connectorTaskCostTotal;
    }

    // Pullse cost calculation
    const pullseSeatCost = agents * pullsePricingForComparison.baseCostPerSeat;
    const pullseCredits = conversations * pullsePricingForComparison.actionsPerConversation;
    const pullseCreditCost = pullseCredits * pullsePricingForComparison.creditCost;
    const pullseTotalCost = pullseSeatCost + pullseCreditCost;

    // Savings
    const monthlySavings = competitorCost - pullseTotalCost;
    const annualSavings = monthlySavings * 12;

    // Check if minimum seats warning applies
    const minimumSeatsWarning = competitor.minimumSeats && agents < competitor.minimumSeats
      ? `${competitor.name} requires minimum ${competitor.minimumSeats} seats`
      : null;

    return {
      competitor,
      effectiveSeats,
      competitorCost,
      baseSeatCost,
      addOnCostTotal,
      perResolutionCostTotal,
      perSessionCostTotal,
      aiAgentConversationCostTotal,
      autoQAConversationCostTotal,
      connectorTaskCostTotal,
      pullseSeatCost,
      pullseCreditCost,
      pullseTotalCost,
      monthlySavings,
      annualSavings,
      minimumSeatsWarning,
      aiConversations,
    };
  };

  const pricingComparison = calculateCompetitivePricing();

  // Helper functions for feature table
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
    <div className="min-h-screen">
      <PageLiquidBackground opacity={0.45} />
      <Navigation />

      {/* ========================================
          SECTION 1: HERO
      ======================================== */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] lg:min-h-screen flex items-center justify-center pt-16 md:pt-20">
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
          <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold"
            >
              <span className="bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent">
                Your entire support stack.
                <br />
                One platform. One price.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
            >
              Most teams pay $100K+ yearly for 10+ disconnected tools that don't talk to each other. Pullse gives you everything—tickets, chat, AI agents, QA, analytics—in one unified platform for a fraction of the cost.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button
                size="lg"
                className="text-base md:text-lg px-6 py-4 md:px-8 md:py-5 lg:px-10 lg:py-6 bg-gradient-to-r from-primary via-purple-500 to-purple-600 hover:from-primary/90 hover:via-purple-500/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl"
                asChild
              >
                <Link href="/contact-sales">
                  Contact Sales
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 2: PRICING TIERS
      ======================================== */}
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

      {/* ========================================
          SECTION 4: FEATURE COMPARISON TABLE
      ======================================== */}
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
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
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
                                <span className="text-xs font-medium text-gray-500 bg-white px-2.5 py-1 rounded-full border border-gray-200">
                                  {category.features.length} features
                                </span>
                                {isExpanded ? (
                                  <ChevronUp className="h-5 w-5 text-gray-500 transition-transform duration-300" />
                                ) : (
                                  <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-300" />
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
                                            <AlertCircle className="h-4 w-4 text-gray-400 hover:text-primary cursor-help transition-colors" />
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
                          <span className="text-[10px] md:text-xs font-medium text-gray-500 bg-white px-1.5 py-0.5 md:px-2 md:py-1 rounded-full border border-gray-200">
                            {category.features.length}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4 md:h-5 md:w-5 text-gray-500 flex-shrink-0 transition-transform" />
                          ) : (
                            <ChevronDown className="h-4 w-4 md:h-5 md:w-5 text-gray-500 flex-shrink-0 transition-transform" />
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

      {/* ========================================
          SECTION 5: COMPETITIVE PRICING CALCULATOR - COMPACT
      ======================================== */}
      <section className="relative hidden lg:block lg:min-h-screen lg:h-screen overflow-hidden items-center">
        {/* Ethereal Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/30 to-white" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-1/4 left-1/4 w-[400px] h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] rounded-full bg-gradient-to-br from-primary/20 to-purple-600/20 blur-[120px]"
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
            className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-[120px]"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10 w-full">
          <div className="max-w-7xl mx-auto">
            {/* Compact Grid Layout */}
            <div className="grid lg:grid-cols-12 gap-4 md:gap-6 items-start">
              {/* Left: Controls Column */}
              <div className="lg:col-span-5 space-y-4 md:space-y-5">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 mb-3 md:mb-4"
                  >
                    <Sparkles className="h-3 w-3 md:h-3.5 md:w-3.5 text-primary" />
                    <span className="text-[10px] md:text-xs font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent uppercase tracking-wider">
                      Pricing Calculator
                    </span>
                  </motion.div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 tracking-tight leading-tight">
                    <span className="bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent">
                      Compare the real cost
                    </span>
                  </h2>
                  <p className="text-xs md:text-sm text-gray-600 font-medium">
                    See how much you save with Pullse's transparent pricing
                  </p>
                </motion.div>

                {/* Competitor Selector - Enhanced */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <label className="text-[10px] md:text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2 md:mb-3 block">
                    Compare with
                  </label>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-xl md:rounded-2xl blur-lg" />
                    <div className="relative bg-white/80 backdrop-blur-xl border-2 border-white/60 rounded-xl md:rounded-2xl p-2 md:p-2.5 shadow-xl">
                      <div className="flex flex-wrap gap-1.5 md:gap-2">
                        {competitorPricingDetails.map((comp) => (
                          <motion.button
                            key={comp.id}
                            onClick={() => setSelectedCompetitor(comp.id)}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className={`relative px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl text-xs md:text-sm font-bold transition-all duration-300 overflow-hidden ${
                              selectedCompetitor === comp.id
                                ? 'text-white shadow-lg'
                                : 'text-gray-700 hover:bg-white/70'
                            }`}
                          >
                            {selectedCompetitor === comp.id && (
                              <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-purple-600"
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                              />
                            )}
                            <span className="relative z-10">{comp.name}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Sliders - Enhanced Design */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-y-3 md:space-y-4"
                >
                  {/* Agents Slider */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl md:rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500" />
                    <div className="relative bg-white/80 backdrop-blur-xl border-2 border-white/60 rounded-xl md:rounded-2xl p-4 md:p-5 hover:bg-white/90 transition-all duration-300 shadow-lg">
                      <div className="flex items-center justify-between mb-3 md:mb-4">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="w-9 h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 rounded-lg md:rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                            <Users className="h-4 w-4 md:h-5 md:w-5 text-white" />
                          </div>
                          <label className="text-[10px] md:text-xs uppercase tracking-wider text-gray-500 font-bold">Support Agents</label>
                        </div>
                        <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{agents}</div>
                      </div>
                      <Slider
                        value={[agents]}
                        onValueChange={(value) => setAgents(value[0])}
                        min={1}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between mt-1.5 md:mt-2">
                        <span className="text-[10px] md:text-xs text-gray-500">1</span>
                        <span className="text-[10px] md:text-xs text-gray-500">100</span>
                      </div>
                    </div>
                  </div>

                  {/* Conversations Slider */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl md:rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500" />
                    <div className="relative bg-white/80 backdrop-blur-xl border-2 border-white/60 rounded-xl md:rounded-2xl p-4 md:p-5 hover:bg-white/90 transition-all duration-300 shadow-lg">
                      <div className="flex items-center justify-between mb-3 md:mb-4">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="w-9 h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 rounded-lg md:rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                            <MessageSquare className="h-4 w-4 md:h-5 md:w-5 text-white" />
                          </div>
                          <label className="text-[10px] md:text-xs uppercase tracking-wider text-gray-500 font-bold">Monthly Conversations</label>
                        </div>
                        <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{conversations.toLocaleString()}</div>
                      </div>
                      <Slider
                        value={[conversations]}
                        onValueChange={(value) => setConversations(value[0])}
                        min={1}
                        max={100000}
                        step={100}
                        className="w-full"
                      />
                      <div className="flex justify-between mt-1.5 md:mt-2">
                        <span className="text-[10px] md:text-xs text-gray-500">1</span>
                        <span className="text-[10px] md:text-xs text-gray-500">100k</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right: Comparison Results Column */}
              {pricingComparison && (
                <div className="lg:col-span-7 flex flex-col justify-center space-y-4 md:space-y-5">
                  {/* Minimum Seats Warning - Compact */}
                  {pricingComparison.minimumSeatsWarning && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-xl md:rounded-2xl blur-lg" />
                      <div className="relative bg-white/80 backdrop-blur-xl border-2 border-orange-500/50 rounded-xl md:rounded-2xl p-3 md:p-4 shadow-lg">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg md:rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg flex-shrink-0">
                            <AlertCircle className="h-4 w-4 md:h-5 md:w-5 text-white" />
                          </div>
                          <p className="text-xs md:text-sm font-bold text-gray-900">
                            {pricingComparison.minimumSeatsWarning}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Side-by-Side Comparison with VS */}
                  <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-stretch md:items-center">
                    {/* Competitor Card - Enhanced */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-300/20 to-gray-400/20 rounded-xl md:rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                      <div className="relative bg-white/80 backdrop-blur-xl border-2 border-gray-200 rounded-xl md:rounded-2xl p-4 md:p-5 hover:bg-white/90 transition-all duration-300 shadow-lg">
                        <div className="flex items-center gap-2 mb-3 md:mb-4">
                          <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gray-100 flex items-center justify-center shadow-sm">
                            <Building2 className="h-3.5 w-3.5 md:h-4 md:w-4 text-gray-600" />
                          </div>
                          <h3 className="text-sm md:text-base font-bold text-gray-900">{pricingComparison.competitor.name}</h3>
                        </div>
                        <div className="mb-3 md:mb-4 pb-3 md:pb-4 border-b border-gray-200">
                          <div className="text-3xl md:text-4xl font-black text-gray-900 mb-1">
                            ${Math.round(pricingComparison.competitorCost).toLocaleString()}
                          </div>
                          <p className="text-[10px] md:text-xs text-gray-600 font-semibold">per month</p>
                        </div>

                        {/* Complete Cost Breakdown */}
                        <div className="space-y-2 text-xs max-h-[160px] md:max-h-[180px] overflow-y-auto pr-1 custom-scrollbar">
                          {/* Base Seats */}
                          <div className="flex justify-between items-start p-1.5 md:p-2 rounded-md md:rounded-lg bg-gray-50">
                            <div className="flex-1">
                              <span className="text-gray-600 font-medium block text-[10px] md:text-xs">Base Seats</span>
                              <span className="text-[9px] md:text-[10px] text-gray-500">{pricingComparison.effectiveSeats} seats × ${pricingComparison.competitor.baseCostPerSeat}/seat</span>
                            </div>
                            <span className="font-bold text-gray-900 ml-2 text-[10px] md:text-xs">${Math.round(pricingComparison.baseSeatCost).toLocaleString()}</span>
                          </div>

                          {/* Add-Ons */}
                          {pricingComparison.competitor.addOns && pricingComparison.competitor.addOns.length > 0 && (
                            <>
                              {pricingComparison.competitor.addOns.map((addon, idx) => (
                                <div key={idx} className="flex justify-between items-start p-1.5 md:p-2 rounded-md md:rounded-lg bg-orange-50 border border-orange-200">
                                  <div className="flex-1">
                                    <span className="text-orange-700 font-medium block text-[10px] md:text-xs">{addon.name}</span>
                                    <span className="text-[9px] md:text-[10px] text-orange-600">{pricingComparison.effectiveSeats} seats × ${addon.costPerSeat}/seat</span>
                                  </div>
                                  <span className="font-bold text-orange-900 ml-2 text-[10px] md:text-xs">${Math.round(pricingComparison.effectiveSeats * addon.costPerSeat).toLocaleString()}</span>
                                </div>
                              ))}
                            </>
                          )}

                          {/* Per-Resolution Costs */}
                          {pricingComparison.competitor.perResolutionCost && (
                            <div className="flex justify-between items-start p-1.5 md:p-2 rounded-md md:rounded-lg bg-blue-50 border border-blue-200">
                              <div className="flex-1">
                                <span className="text-blue-700 font-medium block text-[10px] md:text-xs">AI Resolutions</span>
                                <span className="text-[9px] md:text-[10px] text-blue-600">{pricingComparison.aiConversations.toLocaleString()} resolutions × ${pricingComparison.competitor.perResolutionCost}</span>
                              </div>
                              <span className="font-bold text-blue-900 ml-2">${Math.round(pricingComparison.perResolutionCostTotal).toLocaleString()}</span>
                            </div>
                          )}

                          {/* Per-Session Costs */}
                          {pricingComparison.competitor.perSessionCost && (
                            <div className="flex justify-between items-start p-2 rounded-lg bg-purple-50 border border-purple-200">
                              <div className="flex-1">
                                <span className="text-purple-700 font-medium block">AI Sessions</span>
                                <span className="text-[10px] text-purple-600">{Math.round(pricingComparison.aiConversations / 1000)} sessions × ${pricingComparison.competitor.perSessionCost}</span>
                              </div>
                              <span className="font-bold text-purple-900 ml-2">${Math.round(pricingComparison.perSessionCostTotal).toLocaleString()}</span>
                            </div>
                          )}

                          {/* AI Agent Per-Conversation Costs */}
                          {pricingComparison.competitor.aiAgentPerConversationCost && (
                            <div className="flex justify-between items-start p-2 rounded-lg bg-cyan-50 border border-cyan-200">
                              <div className="flex-1">
                                <span className="text-cyan-700 font-medium block">AI Agent Usage</span>
                                <span className="text-[10px] text-cyan-600">{pricingComparison.aiConversations.toLocaleString()} conversations × ${pricingComparison.competitor.aiAgentPerConversationCost}</span>
                              </div>
                              <span className="font-bold text-cyan-900 ml-2">${Math.round(pricingComparison.aiAgentConversationCostTotal).toLocaleString()}</span>
                            </div>
                          )}

                          {/* Auto QA Costs */}
                          {pricingComparison.competitor.autoQAPerConversationCost && (
                            <div className="flex justify-between items-start p-2 rounded-lg bg-amber-50 border border-amber-200">
                              <div className="flex-1">
                                <span className="text-amber-700 font-medium block">Auto QA</span>
                                <span className="text-[10px] text-amber-600">{conversations.toLocaleString()} conversations × ${pricingComparison.competitor.autoQAPerConversationCost}</span>
                              </div>
                              <span className="font-bold text-amber-900 ml-2">${Math.round(pricingComparison.autoQAConversationCostTotal).toLocaleString()}</span>
                            </div>
                          )}

                          {/* Connector Tasks */}
                          {pricingComparison.competitor.connectorTasksPerConversation && pricingComparison.competitor.connectorTaskCostPer5000 && (
                            <div className="flex justify-between items-start p-2 rounded-lg bg-indigo-50 border border-indigo-200">
                              <div className="flex-1">
                                <span className="text-indigo-700 font-medium block">Connector Tasks</span>
                                <span className="text-[10px] text-indigo-600">{Math.round(pricingComparison.aiConversations * pricingComparison.competitor.connectorTasksPerConversation).toLocaleString()} tasks</span>
                              </div>
                              <span className="font-bold text-indigo-900 ml-2">${Math.round(pricingComparison.connectorTaskCostTotal).toLocaleString()}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>

                    {/* VS Indicator */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 300 }}
                      className="flex items-center justify-center z-10"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-purple-500/30 rounded-full blur-xl" />
                        <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-xl border-2 border-white">
                          <span className="text-lg font-black text-white">VS</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Pullse Card - Enhanced */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                      <div className="relative bg-gradient-to-br from-primary/10 via-purple-500/10 to-white/80 backdrop-blur-xl border-2 border-primary/50 rounded-2xl p-5 hover:from-primary/15 transition-all duration-300 shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg">
                              <Sparkles className="h-4 w-4 text-white" />
                            </div>
                            <h3 className="text-base font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Pullse</h3>
                          </div>
                          <div className="px-2.5 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold shadow-md">
                            -{Math.round((pricingComparison.monthlySavings / pricingComparison.competitorCost) * 100)}%
                          </div>
                        </div>
                        <div className="mb-4 pb-4 border-b border-primary/20">
                          <div className="text-4xl font-black bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-1">
                            ${Math.round(pricingComparison.pullseTotalCost).toLocaleString()}
                          </div>
                          <p className="text-xs text-gray-700 font-semibold">per month</p>
                        </div>

                        {/* Complete Cost Breakdown */}
                        <div className="space-y-2 text-xs max-h-[180px] overflow-y-auto pr-1 custom-scrollbar">
                          {/* Base Seats */}
                          <div className="flex justify-between items-start p-2 rounded-lg bg-primary/5 border border-primary/20">
                            <div className="flex-1">
                              <span className="text-primary font-medium block">Base Seats</span>
                              <span className="text-[10px] text-gray-600">{agents} seats × ${pullsePricingForComparison.baseCostPerSeat}/seat</span>
                            </div>
                            <span className="font-bold text-primary ml-2">${Math.round(agents * pullsePricingForComparison.baseCostPerSeat).toLocaleString()}</span>
                          </div>

                          {/* AI Credits */}
                          <div className="flex justify-between items-start p-2 rounded-lg bg-purple-50 border border-purple-200">
                            <div className="flex-1">
                              <span className="text-purple-700 font-medium block">AI Credits</span>
                              <span className="text-[10px] text-purple-600">{Math.round(conversations * pullsePricingForComparison.actionsPerConversation).toLocaleString()} credits × ${pullsePricingForComparison.creditCost}</span>
                            </div>
                            <span className="font-bold text-purple-900 ml-2">${Math.round(conversations * pullsePricingForComparison.actionsPerConversation * pullsePricingForComparison.creditCost).toLocaleString()}</span>
                          </div>

                          {/* What's Included Banner */}
                          <div className="p-3 rounded-lg bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/30 mt-3">
                            <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-2">✨ Everything Included:</p>
                            <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                              <div className="flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3 text-primary flex-shrink-0" />
                                <span className="text-gray-700">AI Agent</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3 text-primary flex-shrink-0" />
                                <span className="text-gray-700">AI Copilot</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3 text-primary flex-shrink-0" />
                                <span className="text-gray-700">Auto QA</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3 text-primary flex-shrink-0" />
                                <span className="text-gray-700">Help Center</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3 text-primary flex-shrink-0" />
                                <span className="text-gray-700">Integrations</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3 text-primary flex-shrink-0" />
                                <span className="text-gray-700">All Features</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Feature Comparison & Savings - Improved Layout */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Feature Availability */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <div className="relative h-full">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-2xl blur-lg" />
                        <div className="relative h-full bg-white/80 backdrop-blur-xl border-2 border-white/60 rounded-2xl p-5 shadow-lg">
                          <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-4">Feature Comparison</p>
                          <div className="space-y-2">
                            {/* AI Agent */}
                            <div className="flex items-center justify-between p-2.5 rounded-lg bg-gradient-to-r from-gray-50 to-white">
                              <div className="flex items-center gap-2">
                                <Bot className="h-4 w-4 text-blue-500" />
                                <span className="text-xs font-semibold text-gray-700">AI Agent</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {pricingComparison.competitor.features.aiAgent ? (
                                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                                ) : (
                                  <X className="h-4 w-4 text-red-500" />
                                )}
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                              </div>
                            </div>

                            {/* AI Copilot */}
                            <div className="flex items-center justify-between p-2.5 rounded-lg bg-gradient-to-r from-gray-50 to-white">
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-purple-500" />
                                <span className="text-xs font-semibold text-gray-700">AI Copilot</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {pricingComparison.competitor.features.aiCopilot ? (
                                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                                ) : (
                                  <X className="h-4 w-4 text-red-500" />
                                )}
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                              </div>
                            </div>

                            {/* Auto QA */}
                            <div className="flex items-center justify-between p-2.5 rounded-lg bg-gradient-to-r from-gray-50 to-white">
                              <div className="flex items-center gap-2">
                                <Award className="h-4 w-4 text-orange-500" />
                                <span className="text-xs font-semibold text-gray-700">Auto QA</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {pricingComparison.competitor.features.autoQA ? (
                                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                                ) : (
                                  <X className="h-4 w-4 text-red-500" />
                                )}
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                              </div>
                            </div>

                            {/* Help Center */}
                            <div className="flex items-center justify-between p-2.5 rounded-lg bg-gradient-to-r from-gray-50 to-white">
                              <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-green-500" />
                                <span className="text-xs font-semibold text-gray-700">Help Center</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {pricingComparison.competitor.features.helpCenter ? (
                                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                                ) : (
                                  <X className="h-4 w-4 text-red-500" />
                                )}
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Savings Banner - Enhanced */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <div className="relative h-full">
                        <div className={`absolute inset-0 rounded-2xl blur-xl ${
                          pricingComparison.monthlySavings > 0
                            ? 'bg-gradient-to-r from-green-500/30 to-emerald-600/30'
                            : 'bg-gradient-to-r from-gray-500/30 to-gray-600/30'
                        }`} />
                        <div className={`relative h-full rounded-2xl p-5 text-white text-center overflow-hidden shadow-xl flex flex-col justify-center ${
                          pricingComparison.monthlySavings > 0
                            ? 'bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600'
                            : 'bg-gradient-to-br from-gray-500 via-gray-600 to-gray-700'
                        }`}>
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

                          <div className="relative z-10">
                            <p className="text-xs font-bold uppercase tracking-wider opacity-90 mb-3">
                              {pricingComparison.monthlySavings > 0 ? '🎉 Your Savings' : 'Cost Difference'}
                            </p>
                            <p className="text-5xl font-black mb-2">
                              ${Math.abs(Math.round(pricingComparison.monthlySavings)).toLocaleString()}
                            </p>
                            <p className="text-xs font-semibold opacity-90 mb-3">
                              per month
                            </p>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-xl border border-white/30">
                              <TrendingUp className="h-3.5 w-3.5" />
                              <span className="text-xs font-bold">
                                ${Math.abs(Math.round(pricingComparison.annualSavings)).toLocaleString()}/year
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* CTA - Enhanced */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-center"
                  >
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-primary via-purple-500 to-purple-600 hover:from-primary/90 hover:via-purple-500/90 hover:to-purple-600/90 shadow-2xl hover:shadow-3xl transition-all hover:scale-[1.02] group py-6"
                      asChild
                    >
                      <Link href="/contact-sales" className="flex items-center justify-center gap-2">
                        <Sparkles className="h-5 w-5" />
                        <span className="text-base font-bold">Get Your Custom Quote</span>
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                    <p className="text-xs text-gray-600 mt-3 font-semibold">
                      Trials arranged through sales team • Personalized setup included
                    </p>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 6: TRUST SIGNALS
      ======================================== */}
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

      {/* ========================================
          SECTION 8: STARTUP PROGRAM TRIGGER
      ======================================== */}
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

      {/* ========================================
          SECTION 9: FAQ
      ======================================== */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
                <span className="bg-gradient-to-r from-gray-900 to-primary bg-clip-text text-transparent">
                  Frequently asked questions
                </span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Everything you need to know about pricing
              </p>
            </motion.div>

            {/* FAQ Categories */}
            <div className="space-y-8 md:space-y-10 lg:space-y-12">
              {faqCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: categoryIndex * 0.1 }}
                >
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
                </motion.div>
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
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary via-purple-500 to-purple-600 hover:from-primary/90 hover:via-purple-500/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl text-sm md:text-base px-6 py-3 md:px-8 md:py-4"
                  asChild
                >
                  <Link href="/contact-sales">
                    Contact Sales
                    <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 text-sm md:text-base px-6 py-3 md:px-8 md:py-4" asChild>
                  <Link href="/contact-sales">Schedule demo</Link>
                </Button>
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
