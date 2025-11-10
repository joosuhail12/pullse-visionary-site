'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageLiquidBackground from '@/components/PageLiquidBackground';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Check,
  X,
  Sparkles,
  Zap,
  TrendingDown,
  Users,
  ChevronDown,
  MessageSquare,
  Building2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';
import { competitors, comparisonFeatures, faqCategories, migrationFeatures, stats } from '@/data/comparisonData';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { competitorPricingDetails, pullsePricingForComparison } from '@/data/pricingData';
import ComparisonTable from '@/components/compare/ComparisonTable';
import { Slider } from '@/components/ui/slider';

const Compare = () => {
  const [selectedCompetitor, setSelectedCompetitor] = useState('zendesk');
  const [agents, setAgents] = useState(10);
  const [conversations, setConversations] = useState(5000);

  const currentCompetitor = competitors.find((c) => c.id === selectedCompetitor);

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

  return (
    <div className="min-h-screen">
      <PageLiquidBackground opacity={0.3} />
      <Navigation />

      {/* Hero Section */}
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200/50 mb-6"
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-600">
                Platform Comparison
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Choose the Right Platform{' '}
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                for Your Team
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Pullse doesn't just answer questions—our AI <strong className="text-purple-600">takes action</strong>.
              Process refunds, look up orders, update accounts. Compare platforms that do vs those that just talk.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className={`glass-strong p-6 rounded-2xl ${
                    stat.highlight
                      ? 'ring-2 ring-purple-500/50'
                      : ''
                  }`}
                >
                  <div
                    className={`text-3xl md:text-4xl font-bold mb-2 ${
                      stat.highlight
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'
                        : ''
                    }`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact-sales">
                  Book a Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#comparison-table">
                  See Full Comparison
                  <ChevronDown className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Competitor Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto mb-20"
          >
            <div className="glass-strong p-8 rounded-3xl">
              <h3 className="text-lg font-semibold mb-4 text-center">
                Compare Pullse with:
              </h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {competitors.map((competitor) => (
                  <button
                    key={competitor.id}
                    onClick={() => setSelectedCompetitor(competitor.id)}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      selectedCompetitor === competitor.id
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                        : 'bg-white/50 hover:bg-white/80 text-gray-700'
                    }`}
                  >
                    {competitor.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Detailed Competitor Comparison Card */}
          {currentCompetitor && (
            <motion.div
              key={selectedCompetitor}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-5xl mx-auto mb-20"
            >
              <div className="glass-strong p-10 rounded-3xl">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold mb-3">
                    Pullse vs {currentCompetitor.name}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-2">
                    {currentCompetitor.tagline}
                  </p>
                  <p className="text-sm text-purple-600 font-medium">
                    Best for: {currentCompetitor.bestFor}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {/* Pullse Column */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600"></div>
                      <h3 className="text-xl font-bold">Why Choose Pullse</h3>
                    </div>
                    {currentCompetitor.whySwitch.map((reason, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-3"
                      >
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm">{reason}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Competitor Column */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                      <h3 className="text-xl font-bold">{currentCompetitor.name} Strengths</h3>
                    </div>

                    {currentCompetitor.strengths && (
                      <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 mb-4">
                        <p className="text-xs text-blue-600 font-semibold mb-2 uppercase">Where {currentCompetitor.name} Excels</p>
                        <ul className="space-y-2">
                          {currentCompetitor.strengths.map((strength, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-blue-900">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                      <p className="text-sm text-gray-600 mb-4">
                        <strong>Pricing Reality:</strong>
                      </p>
                      <p className="text-sm text-gray-700 mb-4">
                        {currentCompetitor.pricingNote}
                      </p>
                      {currentCompetitor.whenToChoose && (
                        <>
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>When to Choose {currentCompetitor.name}:</strong>
                          </p>
                          <p className="text-sm text-gray-700">
                            {currentCompetitor.whenToChoose}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200 text-center">
                  <Button size="lg" asChild>
                    <Link href="/contact-sales">
                      Compare Pricing for Your Team
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* AI That Executes Section */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-200/50 mb-6"
              >
                <Zap className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">
                  Action-Taking AI
                </span>
              </motion.div>

              <h2 className="text-4xl font-bold mb-4">
                AI That <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Executes</span>, Not Just Answers
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Most support AI just deflects questions or suggests responses.
                Pullse's agentic AI actually completes tasks across your entire stack.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Pullse: Action-Taking */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-strong p-8 rounded-2xl border-2 border-green-500/30"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-green-600">Pullse AI</h3>
                    <p className="text-sm text-muted-foreground">Executes actions autonomously</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3 items-start">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Process refunds across Stripe/PayPal</p>
                      <p className="text-sm text-muted-foreground">AI executes the refund, not just tells you how</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Look up orders in Shopify/WooCommerce</p>
                      <p className="text-sm text-muted-foreground">Real-time data pulled and displayed automatically</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Update customer records in Salesforce/HubSpot</p>
                      <p className="text-sm text-muted-foreground">Copilot executes CRM updates with one click</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Cancel/modify subscriptions</p>
                      <p className="text-sm text-muted-foreground">Direct integration with billing systems</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Custom actions with approval workflows</p>
                      <p className="text-sm text-muted-foreground">Build any action, control with smart approvals</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Competitors: Answer-Only */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-strong p-8 rounded-2xl border-2 border-gray-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gray-400 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-700">Most Competitors</h3>
                    <p className="text-sm text-muted-foreground">Answer or suggest only</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3 items-start">
                    <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-700">Chatbot deflects to help articles</p>
                      <p className="text-sm text-muted-foreground">Customer still needs agent for actual help</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-700">Copilot suggests reply text</p>
                      <p className="text-sm text-muted-foreground">Agent must manually execute actions in other systems</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-700">Limited to answering questions</p>
                      <p className="text-sm text-muted-foreground">Can't process refunds, look up orders, or modify accounts</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-700">No cross-system execution</p>
                      <p className="text-sm text-muted-foreground">Agent switches between 5+ tools manually</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-700">Basic workflows only</p>
                      <p className="text-sm text-muted-foreground">Can't build custom automated actions</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Comparison Table */}
          <div id="comparison-table" className="max-w-7xl mx-auto mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Feature Comparison</h2>
              <p className="text-lg text-muted-foreground">
                See how Pullse stacks up across all key features
              </p>
            </div>
            <div className="glass-strong p-8 rounded-3xl">
              <ComparisonTable />
            </div>
          </div>

          {/* Category Deep Dives - Will add sections */}

          {/* Migration Support Section */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Migration in 2-5 Days
              </h2>
              <p className="text-lg text-muted-foreground">
                Dedicated support, automated data import, and parallel running for zero disruption
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {migrationFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-strong p-6 rounded-2xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pricing Calculator Section */}
          <div className="max-w-7xl mx-auto mb-20">
            <div className="glass-strong p-10 rounded-3xl">
              <div className="grid lg:grid-cols-12 gap-6 items-start">
                {/* Left: Controls Column */}
                <div className="lg:col-span-5 space-y-5">
                  {/* Header */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 mb-4"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-primary" />
                      <span className="text-xs font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent uppercase tracking-wider">
                        Pricing Calculator
                      </span>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight leading-tight">
                      <span className="bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent">
                        Compare the real cost
                      </span>
                    </h2>
                    <p className="text-sm text-gray-600 font-medium">
                      See how much you save with Pullse's transparent pricing
                    </p>
                  </motion.div>

                  {/* Competitor Selector */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3 block">
                      Compare with
                    </label>
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl blur-lg" />
                      <div className="relative bg-white/80 backdrop-blur-xl border-2 border-white/60 rounded-2xl p-2.5 shadow-xl">
                        <div className="flex flex-wrap gap-2">
                          {competitorPricingDetails.map((comp) => (
                            <motion.button
                              key={comp.id}
                              onClick={() => setSelectedCompetitor(comp.id)}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              className={`relative px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 overflow-hidden ${
                                selectedCompetitor === comp.id
                                  ? 'text-white shadow-lg'
                                  : 'text-gray-700 hover:bg-white/70'
                              }`}
                            >
                              {selectedCompetitor === comp.id && (
                                <motion.div
                                  layoutId="activeCalculatorTab"
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

                  {/* Sliders */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-4"
                  >
                    {/* Agents Slider */}
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500" />
                      <div className="relative bg-white/80 backdrop-blur-xl border-2 border-white/60 rounded-2xl p-5 hover:bg-white/90 transition-all duration-300 shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                              <Users className="h-5 w-5 text-white" />
                            </div>
                            <label className="text-xs uppercase tracking-wider text-gray-500 font-bold">Support Agents</label>
                          </div>
                          <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{agents}</div>
                        </div>
                        <Slider
                          value={[agents]}
                          onValueChange={(value) => setAgents(value[0])}
                          min={1}
                          max={100}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between mt-2">
                          <span className="text-xs text-gray-500">1</span>
                          <span className="text-xs text-gray-500">100</span>
                        </div>
                      </div>
                    </div>

                    {/* Conversations Slider */}
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500" />
                      <div className="relative bg-white/80 backdrop-blur-xl border-2 border-white/60 rounded-2xl p-5 hover:bg-white/90 transition-all duration-300 shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                              <MessageSquare className="h-5 w-5 text-white" />
                            </div>
                            <label className="text-xs uppercase tracking-wider text-gray-500 font-bold">Monthly Conversations</label>
                          </div>
                          <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{conversations.toLocaleString()}</div>
                        </div>
                        <Slider
                          value={[conversations]}
                          onValueChange={(value) => setConversations(value[0])}
                          min={1}
                          max={100000}
                          step={100}
                          className="w-full"
                        />
                        <div className="flex justify-between mt-2">
                          <span className="text-xs text-gray-500">1</span>
                          <span className="text-xs text-gray-500">100k</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Right: Comparison Results Column */}
                {pricingComparison && (
                  <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
                    {/* Minimum Seats Warning */}
                    {pricingComparison.minimumSeatsWarning && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-2xl blur-lg" />
                        <div className="relative bg-white/80 backdrop-blur-xl border-2 border-orange-500/50 rounded-2xl p-4 shadow-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg flex-shrink-0">
                              <AlertCircle className="h-5 w-5 text-white" />
                            </div>
                            <p className="text-sm font-bold text-gray-900">
                              {pricingComparison.minimumSeatsWarning}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Side-by-Side Comparison with VS */}
                    <div className="relative grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
                      {/* Competitor Card */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="relative group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-300/20 to-gray-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                        <div className="relative bg-white/80 backdrop-blur-xl border-2 border-gray-200 rounded-2xl p-5 hover:bg-white/90 transition-all duration-300 shadow-lg">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shadow-sm">
                              <Building2 className="h-4 w-4 text-gray-600" />
                            </div>
                            <h3 className="text-base font-bold text-gray-900">{pricingComparison.competitor.name}</h3>
                          </div>
                          <div className="mb-4 pb-4 border-b border-gray-200">
                            <div className="text-4xl font-black text-gray-900 mb-1">
                              ${Math.round(pricingComparison.competitorCost).toLocaleString()}
                            </div>
                            <p className="text-xs text-gray-600 font-semibold">per month</p>
                          </div>

                          {/* Cost Breakdown */}
                          <div className="space-y-2 text-xs max-h-[180px] overflow-y-auto pr-1">
                            {/* Base Seats */}
                            <div className="flex justify-between items-start p-2 rounded-lg bg-gray-50">
                              <div className="flex-1">
                                <span className="text-gray-600 font-medium block">Base Seats</span>
                                <span className="text-[10px] text-gray-500">{pricingComparison.effectiveSeats} seats × ${pricingComparison.competitor.baseCostPerSeat}/seat</span>
                              </div>
                              <span className="font-bold text-gray-900 ml-2">${Math.round(pricingComparison.baseSeatCost).toLocaleString()}</span>
                            </div>

                            {/* Add-Ons */}
                            {pricingComparison.competitor.addOns && pricingComparison.competitor.addOns.length > 0 && (
                              <>
                                {pricingComparison.competitor.addOns.map((addon, idx) => (
                                  <div key={idx} className="flex justify-between items-start p-2 rounded-lg bg-orange-50 border border-orange-200">
                                    <div className="flex-1">
                                      <span className="text-orange-700 font-medium block">{addon.name}</span>
                                      <span className="text-[10px] text-orange-600">{pricingComparison.effectiveSeats} seats × ${addon.costPerSeat}/seat</span>
                                    </div>
                                    <span className="font-bold text-orange-900 ml-2">${Math.round(pricingComparison.effectiveSeats * addon.costPerSeat).toLocaleString()}</span>
                                  </div>
                                ))}
                              </>
                            )}

                            {/* Per-Resolution Costs */}
                            {pricingComparison.competitor.perResolutionCost && (
                              <div className="flex justify-between items-start p-2 rounded-lg bg-blue-50 border border-blue-200">
                                <div className="flex-1">
                                  <span className="text-blue-700 font-medium block">AI Resolutions</span>
                                  <span className="text-[10px] text-blue-600">{pricingComparison.aiConversations.toLocaleString()} × ${pricingComparison.competitor.perResolutionCost}</span>
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

                            {/* AI Agent Costs */}
                            {pricingComparison.competitor.aiAgentPerConversationCost && (
                              <div className="flex justify-between items-start p-2 rounded-lg bg-cyan-50 border border-cyan-200">
                                <div className="flex-1">
                                  <span className="text-cyan-700 font-medium block">AI Agent Usage</span>
                                  <span className="text-[10px] text-cyan-600">{pricingComparison.aiConversations.toLocaleString()} × ${pricingComparison.competitor.aiAgentPerConversationCost}</span>
                                </div>
                                <span className="font-bold text-cyan-900 ml-2">${Math.round(pricingComparison.aiAgentConversationCostTotal).toLocaleString()}</span>
                              </div>
                            )}

                            {/* Auto QA Costs */}
                            {pricingComparison.competitor.autoQAPerConversationCost && (
                              <div className="flex justify-between items-start p-2 rounded-lg bg-amber-50 border border-amber-200">
                                <div className="flex-1">
                                  <span className="text-amber-700 font-medium block">Auto QA</span>
                                  <span className="text-[10px] text-amber-600">{conversations.toLocaleString()} × ${pricingComparison.competitor.autoQAPerConversationCost}</span>
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
                        animate={{ opacity: 1, scale: 1 }}
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

                      {/* Pullse Card */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
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

                          {/* Cost Breakdown */}
                          <div className="space-y-2 text-xs max-h-[180px] overflow-y-auto pr-1">
                            {/* Base Seats */}
                            <div className="flex justify-between items-start p-2 rounded-lg bg-primary/5 border border-primary/20">
                              <div className="flex-1">
                                <span className="text-primary font-medium block">Base Seats</span>
                                <span className="text-[10px] text-gray-600">{agents} seats × ${pullsePricingForComparison.baseCostPerSeat}/seat</span>
                              </div>
                              <span className="font-bold text-primary ml-2">${Math.round(pricingComparison.pullseSeatCost).toLocaleString()}</span>
                            </div>

                            {/* AI Credits */}
                            <div className="flex justify-between items-start p-2 rounded-lg bg-purple-50 border border-purple-200">
                              <div className="flex-1">
                                <span className="text-purple-700 font-medium block">AI Credits</span>
                                <span className="text-[10px] text-purple-600">{Math.round(conversations * pullsePricingForComparison.actionsPerConversation).toLocaleString()} credits × ${pullsePricingForComparison.creditCost}</span>
                              </div>
                              <span className="font-bold text-purple-900 ml-2">${Math.round(pricingComparison.pullseCreditCost).toLocaleString()}</span>
                            </div>

                            {/* What's Included */}
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

                    {/* Savings Display */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="relative"
                    >
                      <div className={`absolute inset-0 rounded-2xl blur-xl ${
                        pricingComparison.monthlySavings > 0
                          ? 'bg-gradient-to-r from-green-500/30 to-emerald-600/30'
                          : 'bg-gradient-to-r from-gray-500/30 to-gray-600/30'
                      }`} />
                      <div className={`relative rounded-2xl p-6 text-white text-center overflow-hidden shadow-xl ${
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
                          <p className="text-xs font-semibold opacity-90 mb-1">per month</p>
                          <p className="text-2xl font-black opacity-90">
                            ${Math.abs(Math.round(pricingComparison.annualSavings)).toLocaleString()}/year
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-6xl mx-auto mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to know about switching to Pullse
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {faqCategories.map((categoryGroup, catIndex) => (
                <motion.div
                  key={categoryGroup.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: catIndex * 0.1 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <span>{categoryGroup.icon}</span>
                    {categoryGroup.category}
                  </h3>

                  {categoryGroup.questions.map((faq, index) => (
                    <Accordion key={index} type="single" collapsible>
                      <AccordionItem
                        value={`item-${index}`}
                        className="bg-white/60 backdrop-blur-sm border border-white/60 rounded-2xl px-6 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <AccordionTrigger className="text-left hover:no-underline py-5">
                          <span className="text-base font-semibold text-gray-900 pr-4">
                            {faq.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-700 text-sm leading-relaxed pb-5">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ))}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="glass-strong p-12 rounded-3xl text-center relative overflow-hidden">
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10"></div>

              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to See Pullse in Action?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Built for teams ready to make the switch
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href="/contact-sales">
                      Book a Demo
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/pricing">View Pricing</Link>
                  </Button>
                </div>

                {/* Trust badges */}
                <div className="mt-8 flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>14-day free trial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Compare;
