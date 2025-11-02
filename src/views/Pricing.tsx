'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageLiquidBackground from '@/components/PageLiquidBackground';
import { Switch } from '@/components/ui/switch';
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
  Quote,
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
  policyFootnotes,
  startupProgram,
  trialBenefits,
  testimonials,
  trustSignals,
  descriptiveFeatures,
  currencies,
  featureComparison,
} from '@/data/pricingData';

const Pricing = () => {
  // State management
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD');
  const [expandedTier, setExpandedTier] = useState<string | null>(null);

  // Feature table states
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['ai-support']); // AI category expanded by default
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  // Unified calculator states
  const [monthlyConversations, setMonthlyConversations] = useState(2000);
  const [currentTeamSize, setCurrentTeamSize] = useState(8);
  const [costPerAgent, setCostPerAgent] = useState(4000);

  // Get currency info
  const selectedCurrency = currencies.find(c => c.code === currency) || currencies[0];

  // Convert price to selected currency
  const convertPrice = (usdPrice: number) => {
    return Math.round(usdPrice * selectedCurrency.rate);
  };

  // Unified calculator logic
  const calculateInvestment = () => {
    // AI handles 65% of conversations automatically
    const aiAutomationRate = 0.65;
    const conversationsHandledByAI = Math.round(monthlyConversations * aiAutomationRate);
    const conversationsForAgents = monthlyConversations - conversationsHandledByAI;

    // Calculate new team size needed (500 conversations per agent capacity)
    const agentsNeeded = Math.max(1, Math.ceil(conversationsForAgents / 500));
    const agentsReduced = Math.max(0, currentTeamSize - agentsNeeded);

    // Calculate costs
    const currentMonthlyCost = currentTeamSize * costPerAgent;

    // Pullse cost: seat pricing + credit usage
    const seatCost = agentsNeeded * (billingCycle === 'annual' ? pricingTiers[1].annualPrice : pricingTiers[1].monthlyPrice);
    const estimatedCredits = monthlyConversations * 10; // ~10 actions per conversation
    const creditCost = estimatedCredits * creditPricing.commit;
    const pullseMonthlyCost = seatCost + creditCost;

    // Savings
    const monthlySavings = Math.max(0, currentMonthlyCost - pullseMonthlyCost);
    const annualSavings = monthlySavings * 12;

    // Time metrics
    const currentAvgResponseTime = 120; // 2 hours typical
    const pullseAvgResponseTime = 12; // 12 minutes with AI
    const responseTimeImprovement = Math.round(((currentAvgResponseTime - pullseAvgResponseTime) / currentAvgResponseTime) * 100);

    // Hours saved calculation
    const conversationsPerAgent = currentTeamSize > 0 ? monthlyConversations / currentTeamSize : 0;
    const currentTimeSpent = conversationsPerAgent * currentAvgResponseTime; // minutes per agent
    const newTimeSpent = (conversationsForAgents / agentsNeeded) * pullseAvgResponseTime;
    const hoursSavedPerMonth = Math.round(((currentTimeSpent * currentTeamSize) - (newTimeSpent * agentsNeeded)) / 60);

    // Traditional helpdesk comparison (per-seat model)
    const traditionalHelpdeskCostPerSeat = 89; // Average competitor pricing
    const traditionalHelpdeskMonthlyCost = currentTeamSize * traditionalHelpdeskCostPerSeat;
    const savingsVsTraditional = Math.max(0, traditionalHelpdeskMonthlyCost - pullseMonthlyCost);

    return {
      // AI Impact
      aiAutomationRate: Math.round(aiAutomationRate * 100),
      conversationsHandledByAI,

      // Team metrics
      agentsNeeded,
      agentsReduced,
      currentTeamSize,

      // Cost breakdown
      seatCost,
      creditCost,
      pullseMonthlyCost,
      currentMonthlyCost,
      monthlySavings,
      annualSavings,
      savingsVsTraditional,

      // Time metrics
      responseTimeImprovement,
      pullseAvgResponseTime,
      currentAvgResponseTime,
      hoursSavedPerMonth,
    };
  };

  const investment = calculateInvestment();

  // Calculate savings percentages for billing toggle
  const standardSavings = Math.round(
    ((pricingTiers[0].monthlyPrice - pricingTiers[0].annualPrice) /
      pricingTiers[0].monthlyPrice) *
      100
  );
  const proSavings = Math.round(
    ((pricingTiers[1].monthlyPrice - pricingTiers[1].annualPrice) /
      pricingTiers[1].monthlyPrice) *
      100
  );

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
      <PageLiquidBackground opacity={0.3} />
      <Navigation />

      {/* ========================================
          SECTION 1: HERO
      ======================================== */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">
                Simple, transparent pricing
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent">
                The full helpdesk,
                <br />
                pay only for AI usage
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto">
              All features unlocked from day one. No per-seat limits on features.{' '}
              <span className="font-semibold text-primary">14-day free trial</span> with 1,000 credits included.
            </p>

            {/* Trust signals inline */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
              {trialBenefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-2 text-sm text-gray-700"
                >
                  <Check className="h-4 w-4 text-primary" />
                  <span className="font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-10 py-6 bg-gradient-to-r from-primary via-purple-500 to-purple-600 hover:from-primary/90 hover:via-purple-500/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl"
                asChild
              >
                <Link href="/contact-sales">
                  Start free trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-10 py-6 border-2"
                asChild
              >
                <Link href="/contact-sales">Schedule demo</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================
          SECTION 2: CURRENCY & BILLING TOGGLE
      ======================================== */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              {/* Currency Selector */}
              <div className="flex items-center gap-3 p-2 rounded-full bg-white/70 backdrop-blur-xl border border-white/60 shadow-sm">
                <span className="text-sm font-medium text-gray-600 pl-2">Currency:</span>
                {currencies.map((curr) => (
                  <button
                    key={curr.code}
                    onClick={() => setCurrency(curr.code)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      currency === curr.code
                        ? 'bg-primary text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {curr.symbol} {curr.code}
                  </button>
                ))}
              </div>

              {/* Billing Toggle */}
              <div className="flex items-center gap-4 p-3 rounded-full bg-white/70 backdrop-blur-xl border border-white/60 shadow-lg">
                <span
                  className={`text-sm font-semibold transition-colors ${
                    billingCycle === 'monthly'
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  Monthly
                </span>
                <Switch
                  checked={billingCycle === 'annual'}
                  onCheckedChange={(checked) =>
                    setBillingCycle(checked ? 'annual' : 'monthly')
                  }
                  className="data-[state=checked]:bg-primary"
                />
                <span
                  className={`text-sm font-semibold transition-colors ${
                    billingCycle === 'annual'
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  Annual
                </span>
              </div>
            </div>

            {/* Savings Display */}
            {billingCycle === 'annual' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-3 mt-4"
              >
                <span className="text-sm font-semibold text-green-600 bg-green-50 px-4 py-2 rounded-full border border-green-200">
                  💰 Save ~{standardSavings}% on Standard
                </span>
                <span className="text-sm font-semibold text-green-600 bg-green-50 px-4 py-2 rounded-full border border-green-200">
                  💰 Save ~{proSavings}% on Pro
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 3: PRICING TIERS
      ======================================== */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {pricingTiers.map((tier, index) => {
                const price =
                  billingCycle === 'monthly'
                    ? tier.monthlyPrice
                    : tier.annualPrice;
                const convertedPrice = convertPrice(price);
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
                    {/* Popular Badge */}
                    {tier.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white text-sm font-bold shadow-lg">
                          <Star className="h-4 w-4 fill-current" />
                          Most Popular
                        </div>
                      </div>
                    )}

                    {/* Card */}
                    <div
                      className={`relative h-full p-8 md:p-10 rounded-3xl bg-white/80 backdrop-blur-xl border-2 transition-all duration-500 ${
                        isPro
                          ? 'border-primary shadow-2xl shadow-primary/20'
                          : 'border-white/60 shadow-xl hover:shadow-2xl'
                      }`}
                    >
                      {/* Gradient Accent */}
                      {isPro && (
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 via-purple-500/5 to-transparent pointer-events-none" />
                      )}

                      <div className="relative z-10">
                        {/* Tier Name */}
                        <div className="mb-6">
                          <h3 className="text-3xl font-bold text-gray-900 mb-2">
                            {tier.name}
                          </h3>
                          <p className="text-base text-gray-600">
                            {tier.tagline}
                          </p>
                        </div>

                        {/* Price */}
                        <div className="mb-8">
                          <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-5xl md:text-6xl font-bold text-gray-900">
                              {selectedCurrency.symbol}{convertedPrice}
                            </span>
                            <span className="text-xl text-gray-600">
                              /seat/month
                            </span>
                          </div>
                          {billingCycle === 'annual' && (
                            <p className="text-sm text-gray-600">
                              Billed annually (
                              {selectedCurrency.symbol}
                              {convertPrice(price * 12)} per seat/year)
                            </p>
                          )}
                        </div>

                        {/* Key Features */}
                        <div className="mb-8">
                          <p className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
                            Key Features
                          </p>
                          <ul className="space-y-3">
                            {tier.features.slice(0, 5).map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-gray-700">
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>

                          {/* Expandable Features */}
                          {tier.features.length > 5 && (
                            <>
                              <AnimatePresence>
                                {isExpanded && (
                                  <motion.ul
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-3 mt-3 overflow-hidden"
                                  >
                                    {tier.features.slice(5).map((feature, idx) => (
                                      <li key={idx} className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-gray-700">
                                          {feature}
                                        </span>
                                      </li>
                                    ))}
                                  </motion.ul>
                                )}
                              </AnimatePresence>

                              <button
                                onClick={() =>
                                  setExpandedTier(isExpanded ? null : tier.id)
                                }
                                className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors mt-4"
                              >
                                {isExpanded ? (
                                  <>
                                    Show less
                                    <ChevronUp className="h-4 w-4" />
                                  </>
                                ) : (
                                  <>
                                    Show all features ({tier.features.length})
                                    <ChevronDown className="h-4 w-4" />
                                  </>
                                )}
                              </button>
                            </>
                          )}
                        </div>

                        {/* Trial Notice */}
                        <div className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 mb-6">
                          <p className="text-sm text-green-800 text-center">
                            <strong>14-day free trial</strong> with 1,000
                            credits included
                          </p>
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
                        <p className="text-xs text-gray-500 mt-4 leading-relaxed">
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
      <section className="py-32 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                  Feature Comparison
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-primary bg-clip-text text-transparent">
                  Every feature,
                  <br />
                  side by side
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
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
                        className="w-full px-8 py-5 bg-gradient-to-r from-gray-50/80 to-white hover:from-gray-100/80 hover:to-gray-50/50 transition-all duration-300 group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-200 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                              {category.icon}
                            </div>
                            <div className="text-left">
                              <h3 className="font-bold text-gray-900 text-base mb-1">
                                {category.category}
                              </h3>
                              <p className="text-sm text-gray-600 font-normal">
                                {category.categoryDescription}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                              {category.features.length}
                            </span>
                            {isExpanded ? (
                              <ChevronUp className="h-5 w-5 text-gray-600 transition-transform duration-300" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-600 transition-transform duration-300" />
                            )}
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
            <div className="md:hidden space-y-6">
              {featureComparison.map((category, categoryIdx) => {
                const isExpanded = isCategoryExpanded(category.id);

                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIdx * 0.1 }}
                    className="rounded-2xl bg-white border border-gray-200 shadow-lg overflow-hidden"
                  >
                    {/* Collapsible Category Header */}
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="w-full px-6 py-5 bg-gradient-to-r from-gray-50/80 to-white border-b border-gray-200 group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-white shadow-sm border border-gray-200 flex items-center justify-center text-xl group-active:scale-95 transition-transform">
                            {category.icon}
                          </div>
                          <div className="text-left">
                            <h3 className="font-bold text-gray-900 text-sm mb-0.5">
                              {category.category}
                            </h3>
                            <p className="text-xs text-gray-500">
                              {category.features.length} features
                            </p>
                          </div>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-gray-600 flex-shrink-0 transition-transform" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-600 flex-shrink-0 transition-transform" />
                        )}
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
                          <div className="p-5 space-y-5 bg-gray-50/30">
                            {category.features.map((feature, featureIdx) => (
                              <div
                                key={featureIdx}
                                className={`space-y-3 p-4 rounded-xl bg-white border border-gray-200 ${
                                  feature.proOnly ? 'shadow-sm border-purple-200 bg-gradient-to-br from-purple-50/40 to-white' : 'shadow-sm'
                                }`}
                              >
                                <div>
                                  <div className="font-semibold text-gray-900 mb-1.5 flex items-start gap-2 flex-wrap">
                                    <span className="flex-1">{feature.name}</span>
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
          SECTION 5: PULLSE INVESTMENT CALCULATOR
      ======================================== */}
      <section className="py-24 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <BarChart3 className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                  Investment Calculator
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-gray-900 to-primary bg-clip-text text-transparent">
                  Calculate your Pullse investment
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                See your total cost and the complete value story in one place
              </p>
            </motion.div>

            {/* Calculator Inputs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 p-8 rounded-3xl bg-white/80 backdrop-blur-xl border-2 border-gray-200 shadow-xl"
            >
              <div className="grid md:grid-cols-3 gap-8">
                {/* Monthly Conversations */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-gray-700">
                      Monthly Conversations
                    </label>
                    <span className="text-2xl font-bold text-primary">
                      {monthlyConversations.toLocaleString()}
                    </span>
                  </div>
                  <Slider
                    value={[monthlyConversations]}
                    onValueChange={(value) => setMonthlyConversations(value[0])}
                    min={100}
                    max={10000}
                    step={100}
                    className="w-full"
                  />
                </div>

                {/* Current Team Size */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-gray-700">
                      Current Team Size
                    </label>
                    <span className="text-2xl font-bold text-primary">
                      {currentTeamSize}
                    </span>
                  </div>
                  <Slider
                    value={[currentTeamSize]}
                    onValueChange={(value) => setCurrentTeamSize(value[0])}
                    min={1}
                    max={50}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Cost Per Agent */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-gray-700">
                      Cost Per Agent
                    </label>
                    <span className="text-2xl font-bold text-primary">
                      ${costPerAgent.toLocaleString()}
                    </span>
                  </div>
                  <Slider
                    value={[costPerAgent]}
                    onValueChange={(value) => setCostPerAgent(value[0])}
                    min={2000}
                    max={8000}
                    step={500}
                    className="w-full"
                  />
                </div>
              </div>
            </motion.div>

            {/* Hero Result: Monthly Investment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-8 p-10 rounded-3xl bg-gradient-to-br from-primary via-purple-500 to-purple-600 shadow-2xl text-white text-center"
            >
              <p className="text-lg font-semibold mb-2 opacity-90">Your Monthly Pullse Investment</p>
              <p className="text-6xl md:text-7xl font-bold mb-4">
                ${Math.round(investment.pullseMonthlyCost).toLocaleString()}
              </p>
              <p className="text-lg opacity-90">
                ${Math.round(investment.seatCost).toLocaleString()} for {investment.agentsNeeded} {investment.agentsNeeded === 1 ? 'seat' : 'seats'} + ${Math.round(investment.creditCost).toLocaleString()} for credits
              </p>
            </motion.div>

            {/* The AI Impact - 4 Metrics Grid */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">The AI Impact</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* AI Automation */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="p-6 rounded-2xl bg-white border-2 border-blue-200 shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-blue-100">
                      <Bot className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">AI Automation</p>
                  </div>
                  <p className="text-4xl font-bold text-blue-600 mb-2">{investment.aiAutomationRate}%</p>
                  <p className="text-sm text-gray-600">
                    {investment.conversationsHandledByAI.toLocaleString()} conversations handled automatically
                  </p>
                </motion.div>

                {/* Team Efficiency */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="p-6 rounded-2xl bg-white border-2 border-green-200 shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-green-100">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Team Efficiency</p>
                  </div>
                  <p className="text-4xl font-bold text-green-600 mb-2">{investment.agentsNeeded}</p>
                  <p className="text-sm text-gray-600">
                    agents needed ({investment.agentsReduced} fewer than current)
                  </p>
                </motion.div>

                {/* Cost Savings */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="p-6 rounded-2xl bg-white border-2 border-purple-200 shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-purple-100">
                      <TrendingUp className="h-6 w-6 text-purple-600" />
                    </div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Cost Savings</p>
                  </div>
                  <p className="text-4xl font-bold text-purple-600 mb-2">
                    ${Math.round(investment.savingsVsTraditional).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    per month vs traditional helpdesk
                  </p>
                </motion.div>

                {/* Speed Boost */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="p-6 rounded-2xl bg-white border-2 border-orange-200 shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-orange-100">
                      <Zap className="h-6 w-6 text-orange-600" />
                    </div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Speed Boost</p>
                  </div>
                  <p className="text-4xl font-bold text-orange-600 mb-2">{investment.pullseAvgResponseTime}min</p>
                  <p className="text-sm text-gray-600">
                    average response time ({investment.responseTimeImprovement}% faster)
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Before/After Comparison */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mb-8 p-8 rounded-3xl bg-white border-2 border-gray-200 shadow-xl"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Before vs After Pullse</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Before */}
                <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">Before Pullse</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Team Size</span>
                      <span className="text-xl font-bold text-gray-900">{investment.currentTeamSize} agents</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Monthly Cost</span>
                      <span className="text-xl font-bold text-gray-900">${investment.currentMonthlyCost.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Response Time</span>
                      <span className="text-xl font-bold text-gray-900">{investment.currentAvgResponseTime}min</span>
                    </div>
                  </div>
                </div>

                {/* After */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 border-2 border-primary/30">
                  <p className="text-sm font-bold text-primary uppercase tracking-wide mb-4">With Pullse</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Team Size</span>
                      <span className="text-xl font-bold text-primary">{investment.agentsNeeded} agents + AI</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Monthly Cost</span>
                      <span className="text-xl font-bold text-primary">${Math.round(investment.pullseMonthlyCost).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Response Time</span>
                      <span className="text-xl font-bold text-primary">{investment.pullseAvgResponseTime}min</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Annual Impact Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="p-10 rounded-3xl bg-gradient-to-r from-green-500 to-emerald-600 shadow-2xl text-white text-center"
            >
              <p className="text-lg font-semibold mb-3 opacity-90">Annual Impact</p>
              <p className="text-5xl md:text-6xl font-bold mb-4">
                ${investment.annualSavings.toLocaleString()} saved
              </p>
              <p className="text-xl opacity-90">
                {(investment.hoursSavedPerMonth * 12).toLocaleString()} hours saved per year
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary via-purple-500 to-purple-600 hover:from-primary/90 hover:via-purple-500/90 hover:to-purple-600/90 shadow-lg text-lg px-12 py-6"
                asChild
              >
                <Link href="/contact-sales">
                  Start your free trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <p className="text-sm text-gray-600 mt-4">14-day free trial • No credit card required</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 6: TESTIMONIALS WITH METRICS
      ======================================== */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-gray-900 to-primary bg-clip-text text-transparent">
                  Real results from real customers
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See the quantified impact Pullse delivers
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500"
                >
                  {/* Quote Icon */}
                  <Quote className="h-10 w-10 text-primary/20 mb-4" />

                  {/* Quote */}
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6 italic">
                    "{testimonial.quote}"
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-2 mb-6 pt-6 border-t border-gray-200">
                    {testimonial.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center">
                        <p className="text-xl md:text-2xl font-bold text-primary mb-1">
                          {metric.value}
                        </p>
                        <p className="text-xs text-gray-600">{metric.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Author */}
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-sm font-medium text-primary">
                      {testimonial.company}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 7: TRUST SIGNALS
      ======================================== */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {trustSignals.map((signal, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 mb-4">
                    <signal.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {signal.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {signal.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 8: STARTUP PROGRAM
      ======================================== */}
      <section className="py-24 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative p-10 md:p-12 rounded-3xl bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl border-2 border-orange-500/30 shadow-2xl"
            >
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4">
                  <Sparkles className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-bold text-orange-600">
                    FOR STARTUPS
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  {startupProgram.headline}
                </h2>
                <p className="text-xl text-gray-600">
                  {startupProgram.subhead}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Benefits */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    What You Get
                  </h3>
                  <ul className="space-y-3">
                    {startupProgram.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Eligibility */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Eligibility
                  </h3>
                  <ul className="space-y-3">
                    {startupProgram.eligibility.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {item.requirement}
                          </p>
                          <p className="text-sm text-gray-600">{item.detail}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* After Period */}
              <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 mb-6">
                <p className="text-sm text-orange-900">{startupProgram.afterPeriod}</p>
              </div>

              {/* CTA */}
              <div className="text-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 shadow-lg"
                  asChild
                >
                  <Link href={startupProgram.ctaLink}>
                    {startupProgram.ctaText}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 9: FAQ
      ======================================== */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-gray-900 to-primary bg-clip-text text-transparent">
                  Frequently asked questions
                </span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to know about pricing
              </p>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white/60 backdrop-blur-sm border border-white/60 rounded-2xl px-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <span className="font-semibold text-lg text-gray-900">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Policy Footnotes */}
            <div className="mt-12 p-6 rounded-2xl bg-gray-50 border border-gray-200">
              <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-4">
                Important Notes
              </p>
              <ul className="space-y-2">
                {policyFootnotes.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-gray-500 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-gray-600">{note.text}</span>
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
      <section className="py-16 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Left: Reassurance */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                {trialBenefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-white/60 shadow-sm"
                  >
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-gray-700">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              {/* Right: CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary via-purple-500 to-purple-600 hover:from-primary/90 hover:via-purple-500/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl"
                  asChild
                >
                  <Link href="/contact-sales">
                    Start 14-day trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2" asChild>
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
