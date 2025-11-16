'use client';

import MagicBento from '@/components/MagicBento';
import type { CardData } from '@/components/MagicBento';
import {
  Shield,
  MessageSquare,
  TrendingUp,
  Users,
  Clock,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

export default function ProductAutoQABentoSection() {
  const bentoCards: CardData[] = [
    {
      color: 'hsl(var(--card))',
      title: 'Full Coverage QA',
      description: 'AI analyzes every ticket—not just 5%. Identify patterns, coaching opportunities, and blind spots across 100% of interactions.',
      label: '100% Coverage',
      icon: Shield,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Instant Feedback',
      description: 'Scorecards generated the moment a ticket closes. Reps see where they excel and where to improve—before memory fades.',
      label: 'Real-Time',
      icon: MessageSquare,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Trend Tracking',
      description: 'Every metric tracked over time. See if empathy is improving, handle time dropping, or resolution rates climbing.',
      label: 'Analytics',
      icon: TrendingUp,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Fair & Transparent',
      description: 'Built-in dispute workflow. Reps can challenge any score, supervisors review and provide context. No black-box judgments.',
      label: 'Accountability',
      icon: Users,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Zero Extra Headcount',
      description: 'Traditional QA teams sample 5-10%. Auto-QA evaluates 100%—with no extra staff, no manual reviews, no bottlenecks.',
      label: 'Efficiency',
      icon: Clock,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Surgical Precision',
      description: 'AI identifies the exact message where a rep could improve—with suggested rewrites. Not vague feedback. Actionable coaching.',
      label: 'Coaching',
      icon: AlertCircle,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Custom Rubrics',
      description: 'Define your own quality standards. Empathy, clarity, policy adherence, brand voice—whatever matters to your team.',
      label: 'Coming Soon',
      icon: CheckCircle2,
    },
  ];

  return (
    <>
      <div className="text-center mb-8 md:mb-12 lg:mb-16 space-y-3 md:space-y-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
          Beyond Traditional QA
        </h2>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
          Manual QA teams sample 5-10% of conversations. Auto-QA analyzes 100%—evaluating every ticket against your quality standards the moment it closes, with zero extra headcount.
        </p>
      </div>

      <MagicBento
        cardData={bentoCards}
        enableSpotlight={true}
        enableBorderGlow={true}
        enableStars={true}
        enableTilt={false}
        enableMagnetism={true}
        clickEffect={true}
      />
    </>
  );
}
