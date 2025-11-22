'use client';

import MagicBento from '@/components/MagicBento';
import type { CardData } from '@/components/MagicBento';
import {
  Palette,
  Languages,
  BarChart3,
  Search,
  Edit3,
  Link2,
} from 'lucide-react';
import ThemeCustomizerDemo from './ThemeCustomizerDemo';
import LanguageSwitcherDemo from './LanguageSwitcherDemo';
import ContentMetricsCard from './ContentMetricsCard';
import SearchAnalyticsDashboard from './SearchAnalyticsDashboard';
import ArticleEditorPreview from './ArticleEditorPreview';
import DomainConnectionWizard from './DomainConnectionWizard';

export default function AppoFeaturesBentoGrid() {
  const bentoCards: CardData[] = [
    {
      color: 'hsl(var(--card))',
      title: 'White Label Your Brand',
      description: 'Customize colors, logos, and styling to match your brand perfectly. No coding required.',
      label: 'Customization',
      icon: Palette,
      customComponent: <ThemeCustomizerDemo />,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Multi-Language Support',
      description: 'Reach global audiences with seamless language switching and auto-detection.',
      label: 'Localization',
      icon: Languages,
      customComponent: <LanguageSwitcherDemo />,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Content Analytics',
      description: 'Track views, helpfulness, and ticket deflection with real-time insights.',
      label: 'Analytics',
      icon: BarChart3,
      customComponent: <ContentMetricsCard />,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Search Insights',
      description: 'Discover content gaps and optimize your help center with search analytics.',
      label: 'Search Analytics',
      icon: Search,
      customComponent: <SearchAnalyticsDashboard />,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Rich Text Editor',
      description: 'Write and preview articles in real-time with auto-save and markdown support.',
      label: 'Editor',
      icon: Edit3,
      customComponent: <ArticleEditorPreview />,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Custom Domain',
      description: 'Connect your own domain with guided DNS setup and automatic SSL.',
      label: 'Domain Setup',
      icon: Link2,
      customComponent: <DomainConnectionWizard />,
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
