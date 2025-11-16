'use client';

import MagicBento from '@/components/MagicBento';
import type { CardData } from '@/components/MagicBento';
import {
  MessageSquare,
  Sparkles,
  Users,
  Search,
  GitBranch,
  AtSign,
} from 'lucide-react';

interface ProductInboxBentoGridProps {
  screenshots: {
    multiChannel: string;
    aiRewriting: string;
    customerContext: string;
    searchFilter: string;
    routingConfig: string;
    internalCollab: string;
    cannedResponses: string;
  };
}

export default function ProductInboxBentoGrid({ screenshots }: ProductInboxBentoGridProps) {
  const bentoCards: CardData[] = [
    {
      color: 'hsl(var(--card))',
      title: 'Email + Live Chat Unified',
      description: 'Support customers across both channels from one workspace. No tab switching, no separate tools.',
      label: 'Multi-Channel',
      icon: MessageSquare,
      image: screenshots.multiChannel,
    },
    {
      color: 'hsl(var(--card))',
      title: 'AI-Powered Assistance',
      description: 'AI rewriting, summaries, and auto-responses that make every agent superhuman.',
      label: 'AI Features',
      icon: Sparkles,
      image: screenshots.aiRewriting,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Complete Customer Context',
      description: 'Full history, custom fields, and interaction timeline in one glance.',
      label: 'Customer Data',
      icon: Users,
      image: screenshots.customerContext,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Powerful Search & Filters',
      description: 'Find any conversation instantly with advanced filters and saved views.',
      label: 'Search',
      icon: Search,
      image: screenshots.searchFilter,
    },
    {
      color: 'hsl(var(--card))',
      title: '100% Auto-Routing',
      description: 'Every ticket gets auto-assigned. Load balanced, round robin, or manual control.',
      label: 'Smart Routing',
      icon: GitBranch,
      image: screenshots.routingConfig,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Team Collaboration',
      description: 'Internal notes, @mentions, and collision detection for seamless teamwork.',
      label: 'Collaboration',
      icon: AtSign,
      image: screenshots.internalCollab,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Canned Responses',
      description: 'Pre-written templates with variables for 5x faster replies.',
      label: 'Productivity',
      icon: MessageSquare,
      image: screenshots.cannedResponses,
    },
  ];

  return (
    <MagicBento
      cardData={bentoCards}
      enableSpotlight={true}
      enableBorderGlow={true}
      enableStars={true}
      enableTilt={false}
      enableMagnetism={true}
      clickEffect={true}
    />
  );
}
