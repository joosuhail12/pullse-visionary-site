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
import RoutingVisualization from './RoutingVisualization';
import CollaborationHub from './CollaborationHub';
import MultiChannelAggregator from './MultiChannelAggregator';
import AIRewritingDemo from './AIRewritingDemo';
import CustomerContextCard from './CustomerContextCard';
import SmartFilterBuilder from './SmartFilterBuilder';
import TemplateLibraryShowcase from './TemplateLibraryShowcase';

export default function ProductInboxBentoGrid() {
  const bentoCards: CardData[] = [
    {
      color: 'hsl(var(--card))',
      title: 'Email + Live Chat Unified',
      description: 'Support customers across both channels from one workspace. No tab switching, no separate tools.',
      label: 'Multi-Channel',
      icon: MessageSquare,
      customComponent: <MultiChannelAggregator />,
    },
    {
      color: 'hsl(var(--card))',
      title: 'AI-Powered Assistance',
      description: 'AI rewriting, summaries, and auto-responses that make every agent superhuman.',
      label: 'AI Features',
      icon: Sparkles,
      customComponent: <AIRewritingDemo />,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Complete Customer Context',
      description: 'Full history, custom fields, and interaction timeline in one glance.',
      label: 'Customer Data',
      icon: Users,
      customComponent: <CustomerContextCard />,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Powerful Search & Filters',
      description: 'Find any conversation instantly with advanced filters and saved views.',
      label: 'Search',
      icon: Search,
      customComponent: <SmartFilterBuilder />,
    },
    {
      color: 'hsl(var(--card))',
      title: '100% Auto-Routing',
      description: 'Every ticket gets auto-assigned. Load balanced, round robin, or manual control.',
      label: 'Smart Routing',
      icon: GitBranch,
      customComponent: <RoutingVisualization />,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Team Collaboration',
      description: 'Internal notes, @mentions, and collision detection for seamless teamwork.',
      label: 'Collaboration',
      icon: AtSign,
      customComponent: <CollaborationHub />,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Canned Responses',
      description: 'Pre-written templates with variables for 5x faster replies.',
      label: 'Productivity',
      icon: MessageSquare,
      customComponent: <TemplateLibraryShowcase />,
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
