'use client';

import MagicBento from '@/components/MagicBento';
import type { CardData } from '@/components/MagicBento';
import {
  Edit3,
  Sparkles,
  Box,
  Users,
  Gauge,
  History,
  LayoutDashboard,
} from 'lucide-react';
import AppoArticleEditor from './AppoArticleEditor';
import AppoAIAssistant from './AppoAIAssistant';
import AppoContentBlocks from './AppoContentBlocks';
import AppoCollaboration from './AppoCollaboration';
import AppoContentMetrics from './AppoContentMetrics';
import AppoVersionHistory from './AppoVersionHistory';
import AppoWorkspaceSnapshot from './AppoWorkspaceSnapshot';

export default function ContentCreationBentoGrid() {
  const bentoCards: CardData[] = [
    {
      color: 'hsl(var(--card))',
      title: 'Workspace Dashboard',
      description: 'Track adoption, active docs, and launch steps in one place.',
      label: 'Overview',
      icon: LayoutDashboard,
      customComponent: <AppoWorkspaceSnapshot />,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Article Editor',
      description: 'Clean, distraction-free editor for writing comprehensive support articles.',
      label: 'Editor',
      icon: Edit3,
      customComponent: <AppoArticleEditor />,
    },
    {
      color: 'hsl(var(--card))',
      title: 'AI Writing Assistant',
      description: 'Get intelligent suggestions to improve clarity, SEO, and grammar in real-time.',
      label: 'AI Writing',
      icon: Sparkles,
      customComponent: <AppoAIAssistant />,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Rich Content Blocks',
      description: 'Embed code snippets, images, videos, tables, and external content seamlessly.',
      label: 'Content Types',
      icon: Box,
      customComponent: <AppoContentBlocks />,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Team Collaboration',
      description: 'Work together with live presence indicators, inline comments, and activity tracking.',
      label: 'Collaboration',
      icon: Users,
      customComponent: <AppoCollaboration />,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Content Metrics',
      description: 'Real-time analysis showing word count, reading time, SEO score, and readability metrics.',
      label: 'Metrics',
      icon: Gauge,
      customComponent: <AppoContentMetrics />,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Version History',
      description: 'Track, compare, and restore previous versions with a clean timeline interface.',
      label: 'Versioning',
      icon: History,
      customComponent: <AppoVersionHistory />,
    },
  ];

  return (
    <MagicBento
      cardData={bentoCards}
      glowColor="255, 109, 51"
      enableSpotlight={false}
      enableBorderGlow={false}
      enableStars={false}
      enableTilt={false}
      enableMagnetism={false}
      clickEffect={true}
      gridClassName="appo-creation-bento"
    />
  );
}
