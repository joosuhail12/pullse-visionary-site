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
  Database,
  UserCircle,
  RefreshCw,
  GraduationCap,
  Smile,
  Settings,
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
import AnimatedCounter from '@/components/AnimatedCounter';
import GlowCard from '@/components/ui/glow-card';

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
    <div className="min-h-screen scroll-smooth">
      <PageLiquidBackground opacity={0.3} />
      <Navigation />

      {/* Hero Section */}
      <div className="min-h-screen relative flex items-center justify-center pt-20 pb-32">
        {/* Animated Gradient Blobs */}
        <motion.div
          className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/2 w-[400px] h-[400px] bg-gradient-to-br from-pink-500/15 to-purple-500/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.25, 1],
            x: [0, -60, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center space-y-12"
          >
            {/* Simplified Headline with Statement + Subtext */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight text-black dark:text-white">
                The First AI-Native Customer Support Platform
              </h1>

              <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 font-medium">
                Built for 2024, not retrofitted from 2010
              </p>
            </motion.div>

            {/* Concise Subheadline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              Pullse executes actions, not just answers. Built AI-native from day one.
            </motion.p>

            {/* Enhanced CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" asChild className="relative group h-14 px-8 text-base">
                  <Link href="/contact-sales">
                    <span className="relative z-10 font-bold">Experience AI-Native Support</span>
                    <ArrowRight className="ml-2 h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-lg opacity-0 group-hover:opacity-100 blur-xl"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="outline" asChild className="h-14 px-8 text-base border-2">
                  <Link href="#comparison-table">
                    <span className="font-bold">See the Difference</span>
                    <ChevronDown className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust Indicators - Innovation Focused */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
            >
              {[
                { icon: '⚡', text: 'Live in 10 minutes' },
                { icon: '🧠', text: 'Learns from day one' },
                { icon: '🔄', text: 'No migration headaches' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2"
                >
                  <span className="text-lg">
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Gradient Fade Transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background pointer-events-none" />
      </div>

      {/* Page Content */}
      <div className="container mx-auto px-4 relative z-10 pt-20">
        {/* Unified Comparison Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-5xl mx-auto mb-16"
        >
          <GlowCard
            className="glass-strong p-6 md:p-8 rounded-3xl relative overflow-hidden"
            glowColor="132, 0, 255"
            glowIntensity={0.4}
            hoverElevation={true}
            tilt3D={false}
          >
            {/* Animated gradient mesh background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/20" />
              <motion.div
                className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl"
                animate={{
                  x: [0, 30, 0],
                  y: [0, -15, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* Animated Background Blobs (visible when competitor selected) */}
            {currentCompetitor && (
              <>
                <motion.div
                  className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    x: [0, 20, 0],
                    y: [0, -10, 0],
                  }}
                  transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.15, 1],
                    x: [0, -20, 0],
                    y: [0, 10, 0],
                  }}
                  transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
                />
              </>
            )}

            {/* Competitor Selector - Always at top */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-6 relative z-10"
            >
              <h3 className="text-xl md:text-2xl font-bold mb-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                Compare Pullse with:
              </h3>
              <motion.div
                className="w-20 h-0.5 mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-4"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              />

              <div className="flex flex-wrap gap-3 justify-center">
                {competitors.map((competitor, index) => (
                  <motion.button
                    key={competitor.id}
                    type="button"
                    onClick={() => setSelectedCompetitor(competitor.id)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{
                      scale: 1.05,
                      y: -4
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="relative px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 overflow-hidden shadow-lg"
                  >
                    {/* Animated Background for Active State */}
                    {selectedCompetitor === competitor.id && (
                      <>
                        <motion.div
                          layoutId="activeCompetitorTab"
                          className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600"
                          transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 30
                          }}
                        />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600"
                          animate={{
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.div
                          className="absolute inset-0"
                          style={{
                            boxShadow: '0 0 30px rgba(132, 0, 255, 0.6), 0 0 60px rgba(236, 72, 153, 0.4)',
                          }}
                        />
                      </>
                    )}
                    {/* Button Content */}
                    <span className={`relative z-10 text-base ${
                      selectedCompetitor === competitor.id
                        ? 'text-white'
                        : 'text-gray-800'
                    }`}>
                      {competitor.name}
                    </span>
                    {/* Hover Background for Inactive State */}
                    {selectedCompetitor !== competitor.id && (
                      <motion.div
                        className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-2xl border border-purple-200/50"
                        whileHover={{
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          borderColor: 'rgba(168, 85, 247, 0.4)',
                        }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Divider (only shows when competitor selected) */}
            {currentCompetitor && (
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent mb-4 relative z-10"
              />
            )}

            {/* Detailed Comparison Content */}
            {currentCompetitor && (
              <motion.div
                key={selectedCompetitor}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="relative z-10"
              >
                <div className="text-center mb-4">
                  {/* Title with animated gradient */}
                  <motion.h2
                    className="text-xl md:text-2xl font-bold mb-1.5 relative inline-block"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="relative">
                      Pullse vs {currentCompetitor.name}
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{
                          x: ['-200%', '200%'],
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      />
                    </span>
                  </motion.h2>
                  <motion.p
                    className="text-sm text-muted-foreground mb-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {currentCompetitor.tagline}
                  </motion.p>
                  <motion.p
                    className="text-xs text-purple-600 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Best for: {currentCompetitor.bestFor}
                  </motion.p>
                </div>

                {/* VS Badge */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <motion.div
                    className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-purple-600 flex items-center justify-center shadow-2xl border-2 border-white"
                    animate={{
                      boxShadow: [
                        '0 0 0 0 rgba(132, 0, 255, 0.4)',
                        '0 0 0 8px rgba(132, 0, 255, 0)',
                        '0 0 0 0 rgba(132, 0, 255, 0)'
                      ],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <span className="text-lg font-black text-white">VS</span>
                  </motion.div>
                </div>

                <div className="grid md:grid-cols-2 gap-0 mb-4 relative z-10">
                  {/* Pullse Column with gradient background */}
                  <motion.div
                    className="relative p-4 md:p-5 rounded-l-2xl overflow-hidden"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                  >
                    {/* Purple gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/15 via-pink-500/10 to-transparent" />
                    <motion.div
                      className="absolute top-0 right-0 w-48 h-48 bg-purple-400/20 rounded-full blur-3xl"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />

                    <div className="relative space-y-3">
                      <div className="flex items-center gap-2.5 mb-4">
                        <motion.div
                          className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-lg"
                          animate={{
                            boxShadow: [
                              '0 0 0 0 rgba(132, 0, 255, 0.7)',
                              '0 0 0 10px rgba(132, 0, 255, 0)',
                              '0 0 0 0 rgba(132, 0, 255, 0)'
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Check className="w-4 h-4 text-white" />
                        </motion.div>
                        <div>
                          <h3 className="text-lg font-bold">Why Choose Pullse</h3>
                          <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-semibold">
                            AI-Native
                          </span>
                        </div>
                      </div>
                      {currentCompetitor.whySwitch.map((reason, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          whileHover={{
                            x: 2,
                          }}
                          className="flex gap-3 p-3 rounded-xl bg-white/50 backdrop-blur-sm border border-purple-100/50 shadow-sm group cursor-pointer hover:shadow-md hover:border-purple-300 transition-all"
                        >
                          <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-md">
                            <Check className="w-3.5 h-3.5 text-white" />
                          </div>
                          <p className="text-sm font-medium text-gray-700 group-hover:text-purple-700 transition-colors leading-relaxed">{reason}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Vertical Gradient Divider */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-30" />

                  {/* Competitor Column with different gradient */}
                  <motion.div
                    className="relative p-4 md:p-5 rounded-r-2xl overflow-hidden"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                  >
                    {/* Gray/Blue gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-bl from-gray-200/40 via-blue-100/30 to-transparent" />
                    <motion.div
                      className="absolute bottom-0 left-0 w-48 h-48 bg-blue-300/15 rounded-full blur-3xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.4, 0.2],
                      }}
                      transition={{ duration: 5, repeat: Infinity }}
                    />

                    <div className="relative space-y-3">
                      <div className="flex items-center gap-2.5 mb-4">
                        <motion.div
                          className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-400 to-gray-500 flex items-center justify-center shadow-lg"
                          animate={{
                            scale: [1, 1.1, 1],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </motion.div>
                        <div>
                          <h3 className="text-lg font-bold">{currentCompetitor.name} Strengths</h3>
                          <span className="text-[10px] bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full font-semibold">
                            Established
                          </span>
                        </div>
                      </div>

                    {currentCompetitor.strengths && (
                      <motion.div
                        className="p-3 bg-blue-50 rounded-xl border border-blue-200 mb-3 relative overflow-hidden"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <p className="text-[10px] text-blue-600 font-semibold mb-1.5 uppercase">Where {currentCompetitor.name} Excels</p>
                        <ul className="space-y-1.5">
                          {currentCompetitor.strengths.map((strength, idx) => (
                            <motion.li
                              key={idx}
                              className="flex items-center gap-2 text-sm text-blue-900"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.8 + idx * 0.1 }}
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                              {strength}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}

                    <motion.div
                      className="p-4 bg-gray-50 rounded-xl border border-gray-200"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                    >
                      <p className="text-xs text-gray-600 mb-2">
                        <strong>Pricing Reality:</strong>
                      </p>
                      <p className="text-sm text-gray-700 mb-3">
                        {currentCompetitor.pricingNote}
                      </p>
                      {currentCompetitor.whenToChoose && (
                        <>
                          <p className="text-xs text-gray-600 mb-1.5">
                            <strong>When to Choose {currentCompetitor.name}:</strong>
                          </p>
                          <p className="text-sm text-gray-700">
                            {currentCompetitor.whenToChoose}
                          </p>
                        </>
                      )}
                    </motion.div>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  className="pt-3 border-t border-gray-200 text-center relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="default" asChild className="relative group overflow-hidden">
                      <Link href="/contact-sales">
                        <span className="relative z-10">Compare Pricing for Your Team</span>
                        <ArrowRight className="ml-2 h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                        {/* Pulsing glow effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-md opacity-0 group-hover:opacity-100 blur-xl"
                          animate={{
                            scale: [1, 1.1, 1],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </GlowCard>
        </motion.div>

        {/* AI That Executes Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-5xl mx-auto mb-20"
          >
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl font-bold mb-4"
              >
                AI That <motion.span
                  className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent inline-block"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  style={{
                    backgroundSize: '200% 200%',
                  }}
                >Executes</motion.span>, Not Just Answers
              </motion.h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Most support AI just deflects questions or suggests responses.
                Pullse's agentic AI actually completes tasks across your entire stack.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 relative">
              {/* VS Indicator */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center"
              >
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-500/30 to-gray-400/30 rounded-full blur-xl"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-green-600 to-gray-600 flex items-center justify-center shadow-xl border-2 border-white">
                    <span className="text-lg font-black text-white">VS</span>
                  </div>
                </div>
              </motion.div>

              {/* Pullse: Action-Taking */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, type: 'spring' }}
              >
                <GlowCard
                  className="glass-strong p-8 rounded-2xl border-2 border-green-500/30 relative overflow-hidden h-full"
                  glowColor="34, 197, 94"
                  glowIntensity={0.6}
                  hoverElevation={true}
                >
                  {/* Animated Background Gradient */}
                  <motion.div
                    className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl"
                    animate={{
                      scale: [1, 1.3, 1],
                      x: [0, 20, 0],
                      y: [0, -10, 0],
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                  />

                  {/* Floating Badge */}
                  <motion.div
                    className="absolute top-4 right-4 px-3 py-1 rounded-full bg-green-600 text-white text-xs font-bold shadow-lg"
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ✓ Executes
                  </motion.div>

                  <div className="flex items-center gap-3 mb-6 relative z-10">
                    <motion.div
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Check className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-green-600">Pullse AI</h3>
                      <p className="text-sm text-muted-foreground">Executes actions autonomously</p>
                    </div>
                  </div>

                  <div className="space-y-4 relative z-10">
                    {[
                      { title: 'Process refunds across Stripe/PayPal', desc: 'AI executes the refund, not just tells you how' },
                      { title: 'Look up orders in Shopify/WooCommerce', desc: 'Real-time data pulled and displayed automatically' },
                      { title: 'Update customer records in Salesforce/HubSpot', desc: 'Copilot executes CRM updates with one click' },
                      { title: 'Cancel/modify subscriptions', desc: 'Direct integration with billing systems' },
                      { title: 'Custom actions with approval workflows', desc: 'Build any action, control with smart approvals' },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 5 }}
                        className="flex gap-3 items-start p-3 rounded-lg hover:bg-green-50/50 transition-colors group"
                      >
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.2
                          }}
                        >
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        </motion.div>
                        <div>
                          <p className="font-medium text-gray-900 group-hover:text-green-600 transition-colors">{item.title}</p>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </GlowCard>
              </motion.div>

              {/* Competitors: Answer-Only */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, type: 'spring' }}
              >
                <GlowCard
                  className="glass-strong p-8 rounded-2xl border-2 border-gray-300 relative overflow-hidden h-full"
                  glowColor="156, 163, 175"
                  glowIntensity={0.3}
                  hoverElevation={true}
                >
                  {/* Floating Badge */}
                  <motion.div
                    className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gray-400 text-white text-xs font-bold shadow-lg"
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ✗ Answer Only
                  </motion.div>

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
                    {[
                      { title: 'Chatbot deflects to help articles', desc: 'Customer still needs agent for actual help' },
                      { title: 'Copilot suggests reply text', desc: 'Agent must manually execute actions in other systems' },
                      { title: 'Limited to answering questions', desc: "Can't process refunds, look up orders, or modify accounts" },
                      { title: 'No cross-system execution', desc: 'Agent switches between 5+ tools manually' },
                      { title: 'Basic workflows only', desc: "Can't build custom automated actions" },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-3 items-start p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-700">{item.title}</p>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </GlowCard>
              </motion.div>
            </div>
          </motion.div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            id="comparison-table"
            className="max-w-7xl mx-auto mb-20"
          >
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-bold mb-4"
              >
                Feature Comparison
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-muted-foreground"
              >
                See how Pullse stacks up across all key features
              </motion.p>
            </div>
            <div className="glass-strong p-8 rounded-3xl">
              <ComparisonTable />
            </div>
          </motion.div>

          {/* Category Deep Dives - Will add sections */}

          {/* Ease of Use Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-5xl mx-auto mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Simple Setup, Powerful Results
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                Get started in minutes with an intuitive platform anyone can use
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {migrationFeatures.map((feature, index) => {
                const iconMap = {
                  zap: Zap,
                  smile: Smile,
                  users: Users,
                  settings: Settings,
                };
                const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Zap;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="glass-strong p-5 rounded-2xl relative overflow-hidden group cursor-default"
                  >
                    {/* Gradient hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="flex items-start gap-4 relative z-10">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-lg"
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-base font-bold mb-1.5 group-hover:text-green-600 transition-colors">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Pricing Calculator Section */}
          <div className="max-w-7xl mx-auto mb-20">
            <GlowCard
              className="glass-strong p-10 rounded-3xl"
              glowColor="132, 0, 255"
              glowIntensity={0.5}
              hoverElevation={true}
            >
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
                            {pricingComparison.monthlySavings > 0 ? '🎉 Your Savings' : 'Cost Difference'}
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
            <GlowCard
              className="glass-strong p-12 rounded-3xl text-center relative overflow-hidden"
              glowColor="132, 0, 255"
              glowIntensity={0.7}
              hoverElevation={true}
            >
              {/* Animated Mesh Gradient Background */}
              <motion.div
                className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  x: [0, 30, 0],
                  y: [0, -20, 0],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.3, 1],
                  x: [0, -30, 0],
                  y: [0, 30, 0],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              <div className="relative z-10">
                <motion.h2
                  className="text-3xl md:text-4xl font-bold mb-4"
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  Ready to See Pullse in Action?
                </motion.h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Built for teams ready to make the switch
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" asChild className="relative group">
                      <Link href="/contact-sales">
                        <span className="relative z-10">Book a Demo</span>
                        <ArrowRight className="ml-2 h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-md opacity-0 group-hover:opacity-100 blur-lg transition-opacity"
                          animate={{
                            scale: [1, 1.05, 1],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" variant="outline" asChild>
                      <Link href="/pricing">View Pricing</Link>
                    </Button>
                  </motion.div>
                </div>

                {/* Enhanced Trust badges with Sequential Animation */}
                <div className="mt-8 flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
                  {['14-day free trial', 'No credit card required', 'Cancel anytime'].map((text, index) => (
                    <motion.div
                      key={text}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3
                        }}
                      >
                        <Check className="w-4 h-4 text-green-500" />
                      </motion.div>
                      <span>{text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </GlowCard>
          </motion.div>
        </div>

      <Footer />
    </div>
  );
};

export default Compare;
