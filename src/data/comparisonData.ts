export interface ComparisonFeature {
  feature: string;
  pullse: boolean | string;
  zendesk?: boolean | string;
  intercom?: boolean | string;
  freshdesk?: boolean | string;
  dixa?: boolean | string;
  gladly?: boolean | string;
  category: string;
}

export interface Competitor {
  id: string;
  name: string;
  logo: string;
  tagline: string;
  whySwitch: string[];
  pricingNote: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
}

export const competitors: Competitor[] = [
  {
    id: 'zendesk',
    name: 'Zendesk',
    logo: '/competitors/zendesk.svg',
    tagline: 'Enterprise support platform',
    whySwitch: [
      "Pullse AI handles 70% more tickets autonomously compared to Zendesk's basic automation",
      'All features included - no expensive add-ons for AI, analytics, or advanced workflows',
      "Setup in days, not months - Zendesk's complex configuration slows teams down",
      'Modern, intuitive UI that teams actually enjoy using'
    ],
    pricingNote: 'Zendesk can cost 3-4x more when you factor in required add-ons for AI, advanced analytics, and workflows.',
  },
  {
    id: 'intercom',
    name: 'Intercom',
    logo: '/competitors/intercom.svg',
    tagline: 'Customer messaging platform',
    whySwitch: [
      'True omnichannel support - not just messaging-focused',
      'Advanced AI that goes beyond chatbots with autonomous resolution',
      'Built-in ticketing and workflow management included',
      'Better analytics and reporting capabilities out of the box'
    ],
    pricingNote: 'Intercom charges per seat AND per conversation, costs can spiral quickly with volume.',
  },
  {
    id: 'freshdesk',
    name: 'Freshdesk',
    logo: '/competitors/freshdesk.svg',
    tagline: 'Cloud-based helpdesk',
    whySwitch: [
      "Superior AI capabilities - Freshdesk's AI is limited to basic automation",
      'More powerful workflow designer with visual builder',
      'Better integration ecosystem and API capabilities',
      'Advanced analytics included, not locked behind enterprise tier'
    ],
    pricingNote: "Freshdesk's AI features require expensive Pro or Enterprise plans.",
  },
  {
    id: 'dixa',
    name: 'Dixa',
    logo: '/competitors/dixa.svg',
    tagline: 'Customer service platform',
    whySwitch: [
      'More comprehensive AI suite with autonomous agents and copilot',
      'Automatic QA with customizable rubrics - no manual setup needed',
      'Better knowledge base integration with AI-powered search',
      'More flexible workflow automation capabilities'
    ],
    pricingNote: 'Dixa charges premium prices for AI features that are standard in Pullse.',
  },
  {
    id: 'gladly',
    name: 'Gladly',
    logo: '/competitors/gladly.svg',
    tagline: 'Radically personal customer service',
    whySwitch: [
      'AI-first approach - automation that actually works at scale',
      'Faster setup and onboarding process',
      'More competitive pricing with all features included',
      'Better suited for both B2B and B2C use cases'
    ],
    pricingNote: 'Gladly focuses on high-touch support; Pullse balances automation with personalization.',
  },
];

export const comparisonFeatures: ComparisonFeature[] = [
  // AI & Automation
  {
    category: 'AI & Automation',
    feature: 'AI Autonomous Agent',
    pullse: true,
    zendesk: 'Basic bots',
    intercom: 'Limited',
    freshdesk: 'Add-on',
    dixa: 'Limited',
    gladly: false,
  },
  {
    category: 'AI & Automation',
    feature: 'AI Copilot for Agents',
    pullse: true,
    zendesk: false,
    intercom: 'Limited',
    freshdesk: false,
    dixa: 'Limited',
    gladly: false,
  },
  {
    category: 'AI & Automation',
    feature: 'Automatic QA with Custom Rubrics',
    pullse: true,
    zendesk: false,
    intercom: false,
    freshdesk: false,
    dixa: 'Manual setup',
    gladly: false,
  },
  {
    category: 'AI & Automation',
    feature: 'AI-Powered Knowledge Base',
    pullse: true,
    zendesk: 'Add-on',
    intercom: true,
    freshdesk: 'Limited',
    dixa: true,
    gladly: 'Limited',
  },
  {
    category: 'AI & Automation',
    feature: 'Intent Detection & Routing',
    pullse: true,
    zendesk: 'Basic',
    intercom: true,
    freshdesk: 'Basic',
    dixa: true,
    gladly: true,
  },

  // Platform Features
  {
    category: 'Platform',
    feature: 'Unified Omnichannel Inbox',
    pullse: true,
    zendesk: true,
    intercom: 'Messaging-focused',
    freshdesk: true,
    dixa: true,
    gladly: true,
  },
  {
    category: 'Platform',
    feature: 'Visual Workflow Builder',
    pullse: true,
    zendesk: 'Complex',
    intercom: 'Limited',
    freshdesk: 'Basic',
    dixa: true,
    gladly: 'Basic',
  },
  {
    category: 'Platform',
    feature: 'Advanced Analytics & Reporting',
    pullse: true,
    zendesk: 'Add-on',
    intercom: 'Limited',
    freshdesk: 'Enterprise only',
    dixa: true,
    gladly: true,
  },
  {
    category: 'Platform',
    feature: 'Custom Integrations & API',
    pullse: true,
    zendesk: true,
    intercom: true,
    freshdesk: true,
    dixa: true,
    gladly: true,
  },
  {
    category: 'Platform',
    feature: 'Mobile App for Agents',
    pullse: true,
    zendesk: true,
    intercom: true,
    freshdesk: true,
    dixa: true,
    gladly: true,
  },

  // Pricing & Setup
  {
    category: 'Ease of Use',
    feature: 'Setup Time',
    pullse: 'Days',
    zendesk: 'Weeks-Months',
    intercom: 'Weeks',
    freshdesk: '1-2 Weeks',
    dixa: '1-2 Weeks',
    gladly: 'Weeks',
  },
  {
    category: 'Ease of Use',
    feature: 'User-Friendly Interface',
    pullse: true,
    zendesk: 'Complex',
    intercom: true,
    freshdesk: true,
    dixa: true,
    gladly: true,
  },
  {
    category: 'Ease of Use',
    feature: 'No-Code Customization',
    pullse: true,
    zendesk: 'Limited',
    intercom: 'Limited',
    freshdesk: 'Limited',
    dixa: true,
    gladly: 'Limited',
  },

  // Pricing
  {
    category: 'Pricing',
    feature: 'AI Features Included',
    pullse: true,
    zendesk: false,
    intercom: 'Partial',
    freshdesk: false,
    dixa: 'Partial',
    gladly: false,
  },
  {
    category: 'Pricing',
    feature: 'All Features in Base Plan',
    pullse: true,
    zendesk: false,
    intercom: false,
    freshdesk: false,
    dixa: false,
    gladly: false,
  },
  {
    category: 'Pricing',
    feature: 'Transparent Pricing',
    pullse: true,
    zendesk: 'Complex',
    intercom: 'Variable',
    freshdesk: true,
    dixa: true,
    gladly: 'Contact sales',
  },

  // Support
  {
    category: 'Support',
    feature: 'Priority Support',
    pullse: true,
    zendesk: 'Enterprise only',
    intercom: 'Enterprise only',
    freshdesk: 'Pro+',
    dixa: true,
    gladly: true,
  },
  {
    category: 'Support',
    feature: 'Dedicated Account Manager',
    pullse: true,
    zendesk: 'Enterprise only',
    intercom: 'Enterprise only',
    freshdesk: 'Enterprise only',
    dixa: 'Enterprise only',
    gladly: true,
  },
  {
    category: 'Support',
    feature: 'Migration Assistance',
    pullse: true,
    zendesk: 'Paid service',
    intercom: 'Limited',
    freshdesk: 'Limited',
    dixa: 'Limited',
    gladly: 'Limited',
  },
];

export const faqs = [
  {
    question: 'How long does it take to switch from [Competitor] to Pullse?',
    answer: 'Most teams are fully migrated and operational within 5-7 days. We provide dedicated migration assistance, automated data import, and hands-on onboarding to ensure a smooth transition with zero downtime.',
  },
  {
    question: 'Can I keep my existing integrations?',
    answer: 'Yes! Pullse integrates with 100+ tools including all major CRMs, e-commerce platforms, and communication channels. Most integrations can be set up in minutes.',
  },
  {
    question: 'What happens to my historical data?',
    answer: 'We migrate all your ticket history, customer data, and knowledge base content. Our team handles the technical migration while you maintain full access to historical conversations.',
  },
  {
    question: 'Is there a learning curve for my team?',
    answer: 'Pullse is designed to be intuitive from day one. Most teams are productive within hours, and we provide comprehensive training and documentation to get everyone up to speed quickly.',
  },
  {
    question: 'How does Pullse pricing compare?',
    answer: 'Pullse includes all features in one transparent price - no hidden costs for AI, analytics, or workflows. Teams typically save 30-50% compared to competitor platforms when you factor in add-ons and per-conversation fees.',
  },
  {
    question: 'Do you offer a trial period?',
    answer: 'Yes, we offer a 14-day free trial with full access to all features. No credit card required.',
  },
];

export const migrationFeatures = [
  {
    title: 'Automated Data Import',
    description: 'Seamlessly migrate tickets, contacts, and knowledge base articles automatically',
  },
  {
    title: 'Dedicated Migration Team',
    description: 'Personal support from our migration specialists throughout the process',
  },
  {
    title: 'Zero Downtime',
    description: 'Run both platforms in parallel during transition for business continuity',
  },
  {
    title: 'Team Training',
    description: 'Comprehensive onboarding and training for your entire team',
  },
];

export const stats = [
  { label: 'Average Setup Time', value: '5 Days', highlight: true },
  { label: 'Customer Satisfaction', value: '98%', highlight: true },
  { label: 'Average Cost Savings', value: '40%', highlight: true },
  { label: 'Integrations', value: '100+', highlight: false },
];
