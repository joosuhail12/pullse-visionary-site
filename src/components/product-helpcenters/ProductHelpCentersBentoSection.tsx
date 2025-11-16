'use client';

import MagicBento from '@/components/MagicBento';
import type { CardData } from '@/components/MagicBento';
import {
  MessageCircle,
  Wand2,
  Code,
  Users,
  Sparkles,
  GitBranch,
  Link2,
} from 'lucide-react';

export default function ProductHelpCentersBentoSection() {
  const bentoCards: CardData[] = [
    {
      color: 'hsl(var(--card))',
      title: 'Notion-Style Editor',
      description: 'Real-time collaborative editing with slash commands, drag-and-drop blocks, and inline comments. Multiple authors, one document.',
      label: 'Collaborative',
      icon: MessageCircle,
    },
    {
      color: 'hsl(var(--card))',
      title: 'AI Writing Agents',
      description: 'AI co-writes articles with you. Suggests better phrasing, improves clarity, optimizes for SEO and readability.',
      label: 'AI-Powered',
      icon: Wand2,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Rich Content Blocks',
      description: 'Text, images, videos, code snippets, embeds, tables—all supported. Build engaging help articles with any media.',
      label: 'Rich Media',
      icon: Code,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Real-Time Collaboration',
      description: "See teammates' cursors, edit simultaneously, leave inline comments, track changes. True multi-author experience.",
      label: 'Team Editing',
      icon: Users,
    },
    {
      color: 'hsl(var(--card))',
      title: 'AI Optimization',
      description: 'AI analyzes articles for readability, suggests better headlines, identifies content gaps, and improves structure.',
      label: 'Smart',
      icon: Sparkles,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Version History',
      description: 'Full revision tracking. Rollback to any version, see who changed what and when. Never lose work.',
      label: 'Version Control',
      icon: GitBranch,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Custom Domains',
      description: 'Connect your own domain—help.yourcompany.com—with one click. SSL, DNS, and CDN handled automatically.',
      label: 'Professional',
      icon: Link2,
    },
  ];

  return (
    <>
      {/* Header */}
      <div className="text-center mb-12 md:mb-16 lg:mb-20 space-y-4 md:space-y-5 lg:space-y-6 fade-in-up">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
          Build content that helps
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          Powerful editor, AI writing assistance, and collaboration tools—everything you need to create great help articles
        </p>
      </div>

      {/* MagicBento Grid */}
      <div className="fade-in-up">
        <MagicBento
          cardData={bentoCards}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableStars={true}
          enableTilt={false}
          enableMagnetism={true}
          clickEffect={true}
          glowColor="242, 141, 27"
        />
      </div>
    </>
  );
}
