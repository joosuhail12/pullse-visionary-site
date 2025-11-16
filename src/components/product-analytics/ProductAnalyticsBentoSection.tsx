'use client';

import { motion } from 'framer-motion';
import MagicBento from '@/components/MagicBento';
import type { CardData } from '@/components/MagicBento';
import {
  TrendingUp,
  Target,
  Activity,
  Users,
  Clock,
  MessageSquare,
  Calendar,
} from 'lucide-react';

export default function ProductAnalyticsBentoSection() {
  const bentoCards: CardData[] = [
    {
      color: 'hsl(var(--card))',
      title: 'Volume & Trends',
      description: 'Track ticket volumes over time with trend analysis. Identify patterns, forecast demand, and optimize staffing.',
      label: 'Forecasting',
      icon: TrendingUp,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Resolution Breakdown',
      description: 'Analyze resolution rates by intent, channel, agent, and time period. Understand what works and what does not.',
      label: 'Deep Dive',
      icon: Target,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Agent Performance',
      description: 'Individual scorecards with FCR, handle time, CSAT, and quality scores. Fair, transparent, data-driven coaching.',
      label: 'Team Metrics',
      icon: Users,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Customer Satisfaction',
      description: 'Track CSAT, NPS, and sentiment analysis across all interactions. See what drives customer happiness.',
      label: 'CSAT & NPS',
      icon: MessageSquare,
    },
    {
      color: 'hsl(var(--card))',
      title: 'AI Performance',
      description: 'Bot accuracy, deflection rates, action success rates, and hallucination detection. Prove AI is working.',
      label: 'AI Metrics',
      icon: Activity,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Response Time Analysis',
      description: 'First response time, resolution time, SLA compliance. Track speed metrics that matter to customers.',
      label: 'Speed Metrics',
      icon: Clock,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Custom & Scheduled Reports',
      description: 'Build custom analytics dashboards and schedule automated report delivery to stakeholders. Export data your way.',
      label: 'Coming Soon',
      icon: Calendar,
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
        <MagicBento cardData={bentoCards} />
      </motion.div>
    </>
  );
}
