'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Users,
  MessageSquare,
  Building2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import AnimatedCounter from '@/components/AnimatedCounter';
import GlowCard from '@/components/ui/glow-card';
import { competitorPricingDetails, pullsePricingForComparison } from '@/data/pricingData';

export default function PricingComparisonSection() {
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
    <div className="max-w-7xl mx-auto mb-14 md:mb-16 lg:mb-20">
      <GlowCard
        className="glass-strong p-5 md:p-7 lg:p-10 rounded-2xl md:rounded-3xl"
        glowColor="132, 0, 255"
        glowIntensity={0.5}
        hoverElevation={true}
      >
        <div className="grid lg:grid-cols-12 gap-5 md:gap-6 items-start">
          {/* Left: Controls Column */}
          <div className="lg:col-span-5 space-y-4 md:space-y-5">
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
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 tracking-tight leading-tight">
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
                      <motion.div
                        className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Users className="h-5 w-5 text-white" />
                      </motion.div>
                      <label className="text-xs uppercase tracking-wider text-gray-500 font-bold">Support Agents</label>
                    </div>
                    <motion.div
                      key={agents}
                      initial={{ scale: 1.3, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      className="text-3xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"
                    >
                      <AnimatedCounter value={agents} duration={0.8} />
                    </motion.div>
                  </div>

                  {/* Preset Buttons */}
                  <div className="flex gap-2 mb-4">
                    {[5, 10, 25, 50, 100].map((preset) => (
                      <motion.button
                        key={preset}
                        type="button"
                        onClick={() => setAgents(preset)}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          agents === preset
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md'
                            : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                        }`}
                      >
                        {preset}
                      </motion.button>
                    ))}
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
                      <motion.div
                        className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <MessageSquare className="h-5 w-5 text-white" />
                      </motion.div>
                      <label className="text-xs uppercase tracking-wider text-gray-500 font-bold">Monthly Conversations</label>
                    </div>
                    <motion.div
                      key={conversations}
                      initial={{ scale: 1.3, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                    >
                      <AnimatedCounter value={conversations} duration={0.8} />
                    </motion.div>
                  </div>

                  {/* Preset Buttons */}
                  <div className="grid grid-cols-5 gap-2 mb-4">
                    {[1000, 5000, 10000, 25000, 50000].map((preset) => (
                      <motion.button
                        key={preset}
                        type="button"
                        onClick={() => setConversations(preset)}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-2 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          conversations === preset
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                            : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                        }`}
                      >
                        {preset >= 1000 ? `${preset / 1000}k` : preset}
                      </motion.button>
                    ))}
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
                        <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-2">Everything Included:</p>
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
                <motion.div
                  className={`absolute inset-0 rounded-2xl blur-xl ${
                    pricingComparison.monthlySavings > 0
                      ? 'bg-gradient-to-r from-green-500/30 to-emerald-600/30'
                      : 'bg-gradient-to-r from-gray-500/30 to-gray-600/30'
                  }`}
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className={`relative rounded-2xl p-6 text-white text-center overflow-hidden shadow-xl ${
                    pricingComparison.monthlySavings > 0
                      ? 'bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600'
                      : 'bg-gradient-to-br from-gray-500 via-gray-600 to-gray-700'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Animated Background Blobs */}
                  <motion.div
                    className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"
                    animate={{
                      x: [0, 20, 0],
                      y: [0, -10, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 6, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"
                    animate={{
                      x: [0, -20, 0],
                      y: [0, 10, 0],
                      scale: [1, 1.3, 1],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                  />

                  <div className="relative z-10">
                    <motion.p
                      className="text-xs font-bold uppercase tracking-wider opacity-90 mb-3"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {pricingComparison.monthlySavings > 0 ? 'Your Savings' : 'Cost Difference'}
                    </motion.p>
                    <motion.div
                      key={pricingComparison.monthlySavings}
                      initial={{ scale: 1.3, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      className="text-5xl font-black mb-2"
                    >
                      $<AnimatedCounter value={Math.abs(Math.round(pricingComparison.monthlySavings))} duration={1} />
                    </motion.div>
                    <p className="text-xs font-semibold opacity-90 mb-1">per month</p>
                    <motion.div
                      key={pricingComparison.annualSavings}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                      className="text-2xl font-black opacity-90"
                    >
                      $<AnimatedCounter value={Math.abs(Math.round(pricingComparison.annualSavings))} duration={1.2} />/year
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          )}
        </div>
      </GlowCard>
    </div>
  );
}
