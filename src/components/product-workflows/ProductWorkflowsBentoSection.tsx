'use client';

import MagicBento from '@/components/MagicBento';
import type { CardData } from '@/components/MagicBento';
import {
  Target,
  MessageSquare,
  RotateCw,
  GitBranch,
  Database,
  Workflow,
  Package,
} from 'lucide-react';
import SmartRoutingBuilder from './SmartRoutingBuilder';
import AutoResponseExamples from './AutoResponseExamples';
import RecurringAutomationTimeline from './RecurringAutomationTimeline';
import BranchingDecisionTree from './BranchingDecisionTree';
import ContextIntegrationPanel from './ContextIntegrationPanel';
import VisualWorkflowBuilder from './VisualWorkflowBuilder';
import ReusableWorkflowBlocks from './ReusableWorkflowBlocks';

interface ProductWorkflowsBentoSectionProps {}

export default function ProductWorkflowsBentoSection({}: ProductWorkflowsBentoSectionProps) {
  const bentoCards: CardData[] = [
    {
      color: 'hsl(var(--card))',
      title: 'Never Manually Assign Tickets Again',
      description: 'Every ticket gets routed automatically—to the right agent, at the right time, based on workload, expertise, or any criteria you choose. No more playing traffic controller.',
      label: 'Zero Manual Work',
      icon: Target,
      customComponent: <SmartRoutingBuilder />,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Handle Common Requests Without Lifting a Finger',
      description: 'Refund requests, order status, password resets—send interactive messages with buttons and forms. Customers get instant answers, you get time back.',
      label: 'Auto-Responses That Work',
      icon: MessageSquare,
      customComponent: <AutoResponseExamples />,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Set It Once, Forget It Forever',
      description: 'Weekly reports, SLA reminders, follow-up sequences—build it once, runs automatically forever. Stop doing the same thing every Monday morning.',
      label: 'Recurring Automation',
      icon: RotateCw,
      customComponent: <RecurringAutomationTimeline />,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Make Complex Decisions Automatically',
      description: 'VIP customer? Escalate. Refund under $50? Auto-approve. Order not shipped? Different workflow. Your judgment, automated.',
      label: 'Smart Branching',
      icon: GitBranch,
      customComponent: <BranchingDecisionTree />,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Stop Searching for Information',
      description: 'Pull order history from Shopify, payment info from Stripe, subscription data from your billing system—all automatically attached to the ticket.',
      label: 'Context Auto-Loaded',
      icon: Database,
      customComponent: <ContextIntegrationPanel />,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Build Automation Without Writing Code',
      description: 'Drag-and-drop interface makes it easy to create sophisticated workflows. Add triggers, conditions, actions, and delays—no technical skills required.',
      label: 'Visual Builder',
      icon: Workflow,
      customComponent: <VisualWorkflowBuilder />,
    },
    {
      color: 'hsl(var(--card))',
      title: 'Build Once, Deploy Everywhere',
      description: 'Create workflow building blocks you can reuse across every automation. Update one block, it updates everywhere. Like code libraries, but no coding.',
      label: 'Reusable Blocks',
      icon: Package,
      customComponent: <ReusableWorkflowBlocks />,
    },
  ];

  return (
    <>
      {/* Header */}
      <div className="text-center mb-12 md:mb-16 lg:mb-20 space-y-4 md:space-y-5 lg:space-y-6 fade-in-up">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
          Everything you need to automate support
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          From simple routing to complex multi-step workflows—build it all with visual drag-and-drop
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
        />
      </div>
    </>
  );
}
