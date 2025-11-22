'use client';

import { motion } from 'framer-motion';
import MagicBento, { type CardData } from '@/components/MagicBento';
import { Clock, MessageSquare, Sparkles, Target, TrendingUp, Users, Calendar } from 'lucide-react';
import {
  VolumeTrendsCard,
  ResolutionBreakdownCard,
  AgentPerformanceCard,
  CustomerSatisfactionCard,
  AIPerformanceCard,
  ResponseTimeCard,
  ScheduledReportsCard,
} from './AnalyticsBentoCards';

export default function ProductAnalyticsBentoSection() {
  const bentoCards: CardData[] = [
    {
      color: 'hsl(var(--card))',
      title: 'Volume & Trends',
      description: 'Ticket volumes with forecasts, deflection, and peak patterns.',
      label: 'Forecasting',
      icon: TrendingUp,
      customComponent: <VolumeTrendsCard />,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Resolution Breakdown',
      description: 'Top intents with change deltas and depth indicators.',
      label: 'Deep Dive',
      icon: Target,
      customComponent: <ResolutionBreakdownCard />,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Agent Performance',
      description: 'Scorecards with FCR, CSAT, and handle times.',
      label: 'Team Metrics',
      icon: Users,
      customComponent: <AgentPerformanceCard />,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Customer Satisfaction',
      description: 'CSAT, NPS, and what drives them up or down.',
      label: 'CSAT & NPS',
      icon: MessageSquare,
      customComponent: <CustomerSatisfactionCard />,
    },
    {
      color: 'hsl(var(--card))',
      title: 'AI Performance',
      description: 'Deflection, action success, and hallucination guardrails.',
      label: 'AI Metrics',
      icon: Sparkles,
      customComponent: <AIPerformanceCard />,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Response Time Analysis',
      description: 'FRT, resolution time, SLA compliance, and QA coverage.',
      label: 'Speed Metrics',
      icon: Clock,
      customComponent: <ResponseTimeCard />,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Custom & Scheduled Reports',
      description: 'Automated delivery for exec summaries and channel reports.',
      label: 'Delivery',
      icon: Calendar,
      customComponent: <ScheduledReportsCard />,
    },
  ];

  return (
    <>
      {/* Header */}
      <div className="text-center mb-12 md:mb-16 lg:mb-20">
        <motion.h2
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-6 md:mb-8 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Every report{" "}
          <span className="bg-gradient-to-r from-primary via-primary to-primary bg-clip-text text-transparent">
            every stakeholder needs
          </span>
        </motion.h2>

        <motion.p
          className="text-base sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Pre-built analytics for volume trends, resolution rates, team performance, customer satisfaction, AI metrics, response times, and ROI tracking.
        </motion.p>
      </div>

      {/* Bento Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <MagicBento
          cardData={bentoCards}
          enableSpotlight={true}
          enableStars={true}
          enableBorderGlow={true}
          enableTilt={false}
          enableMagnetism={true}
          clickEffect={true}
          glowColor="80, 112, 255"
          textAutoHide={false}
          gridClassName="analytics-bento"
        />
      </motion.div>
    </>
  );
}
