'use client';

import MagicBento from "@/components/MagicBento";
import type { CardData } from "@/components/MagicBento";
import {
  Bot,
  Sparkles,
  MessageSquare,
  FileText,
  Heart,
  Shield,
} from "lucide-react";

export default function AIToolsBentoSection() {
  // AI Tools Bento Cards - 6 cards configured for MagicBento
  const aiToolsCards: CardData[] = [
    {
      color: 'hsl(var(--card))',
      title: 'AI Chatbots',
      description: 'Deploy autonomous agents that answer questions AND take lightweight actions. Process refunds, order lookups, subscription changes—24/7 across every channel. Not just deflection, actual resolution.',
      label: 'Customer-Facing',
      icon: Bot,
    },
    {
      color: 'hsl(var(--card))',
      title: 'AI Copilots',
      description: 'On-demand action execution across your entire stack. Process refunds, update accounts, modify subscriptions—right from the conversation. Eliminate context switching and tool sprawl.',
      label: 'Agent-Facing',
      icon: Sparkles,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Sentiment Analysis',
      description: 'Real-time emotion tracking throughout conversations. Detect escalations early, identify coaching moments.',
      label: 'Measure What Matters',
      icon: Heart,
    },
    {
      color: 'hsl(var(--card))',
      title: 'AI Rewriting',
      description: 'Transform tone instantly—formal to casual, technical to simple. Perfect brand voice compliance, every time.',
      label: 'Tone Perfection',
      icon: FileText,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Summaries',
      description: 'Auto-generated summaries with key points, action items, and sentiment after every conversation.',
      label: 'Context in Seconds',
      icon: MessageSquare,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Auto QA',
      description: 'AI evaluates 100% of conversations on quality parameters. No sampling, complete visibility into support quality.',
      label: '100% Coverage',
      icon: Shield,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto mb-10 md:mb-12 lg:mb-16 ai-suite-bento">
      <MagicBento cardData={aiToolsCards} />
    </div>
  );
}
