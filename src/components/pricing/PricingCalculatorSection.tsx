'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import {
  Users,
  MessageSquare,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Star,
  Building2,
  Bot,
  Sparkles,
  AlertCircle,
  Award,
  BookOpen,
  X,
} from 'lucide-react';
import {
  competitorPricingDetails,
  pullsePricingForComparison,
} from '@/data/pricingData';

const PricingCalculatorSection = () => {
  const [selectedCompetitor, setSelectedCompetitor] = useState('zendesk');
  const [agents, setAgents] = useState(10);
  const [conversations, setConversations] = useState(5000);

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
  );
};

export default PricingCalculatorSection;
