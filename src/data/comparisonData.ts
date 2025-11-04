export interface ComparisonFeature {
  feature: string;
  pullse: boolean | string;
  zendesk?: boolean | string;
  intercom?: boolean | string;
  freshdesk?: boolean | string;
  dixa?: boolean | string;
  category: string;
}

export interface Competitor {
  id: string;
  name: string;
  logo: string;
  tagline: string;
  bestFor: string;
  whySwitch: string[];
  pricingNote: string;
  whenToChoose?: string;
  strengths?: string[];
}

export const competitors: Competitor[] = [
  {
    id: 'zendesk',
    name: 'Zendesk',
    logo: '/competitors/zendesk.svg',
    tagline: 'Enterprise support platform',
    bestFor: 'Large enterprises with complex workflows needing 1000+ integrations',
    whySwitch: [
      "All AI features included in base plan - Zendesk charges $50/agent/month extra for AI add-ons",
      "Faster setup (2-5 days vs 2-8 weeks) - Get your team productive immediately",
      "Transparent pricing - No hidden costs or surprise add-on fees",
      "Modern, intuitive interface built for today's teams"
    ],
    pricingNote: "Zendesk Suite Professional starts at $115/agent/month, plus $50/agent/month for AI add-ons, plus pay-per-resolution fees. Total cost for AI-powered support: $165+/agent/month.",
    whenToChoose: "Choose Zendesk if you need 1000+ integrations, have enterprise-level compliance requirements, or already use their ecosystem extensively.",
    strengths: ['1700+ integrations', 'Mature enterprise features', 'Established brand', 'Advanced reporting']
  },
  {
    id: 'intercom',
    name: 'Intercom',
    logo: '/competitors/intercom.svg',
    tagline: 'Customer messaging platform',
    bestFor: 'SaaS companies focused on proactive messaging and growth',
    whySwitch: [
      "Predictable costs - Intercom's $0.99/resolution can spiral with high volume",
      "Comprehensive omnichannel support beyond just messaging",
      "All features included - No variable pricing surprises",
      "Better for support-first teams (Intercom is sales/marketing-focused)"
    ],
    pricingNote: "Intercom starts at $39/seat/month plus $0.99 per AI resolution. Costs vary significantly with volume, making budgeting difficult.",
    whenToChoose: "Choose Intercom if you're a fast-growing SaaS company prioritizing proactive messaging and product tours over traditional support.",
    strengths: ['Strong proactive messaging', 'Product tours', 'SaaS-focused features', 'Conversational AI']
  },
  {
    id: 'freshdesk',
    name: 'Freshdesk',
    logo: '/competitors/freshdesk.svg',
    tagline: 'Cloud-based helpdesk',
    bestFor: 'Small to medium businesses wanting affordable entry-level support',
    whySwitch: [
      "AI included in base plan - Freshdesk requires Pro plan ($47+) plus expensive AI add-ons",
      "More powerful automation out of the box",
      "Better knowledge base AI and search capabilities",
      "No tier limitations - All features available to all customers"
    ],
    pricingNote: "Freshdesk AI features require Pro plan at $47/agent/month, plus Freddy AI Copilot ($29/agent/month) or Freddy AI Agent ($100/1000 sessions). Real AI cost: $76+/agent/month.",
    whenToChoose: "Choose Freshdesk if you're a very small team (2-5 agents) wanting a free plan, or need basic ticketing without AI.",
    strengths: ['Free plan available', '300+ integrations', 'Lower entry price', 'Good for basic ticketing']
  },
  {
    id: 'dixa',
    name: 'Dixa',
    logo: '/competitors/dixa.svg',
    tagline: 'Conversation platform',
    bestFor: 'Companies with 7+ agents needing voice-first support',
    whySwitch: [
      "No minimum seat requirement - Dixa requires 7 seats minimum ($343-1,183/month)",
      "More comprehensive AI suite (agent, copilot, and Auto-QA)",
      "Faster setup and easier configuration",
      "Better pricing flexibility for growing teams"
    ],
    pricingNote: "Dixa starts at $49/seat/month with a 7-seat minimum ($343/month minimum), ranging up to $169/seat/month ($1,183/month minimum for 7 agents).",
    whenToChoose: "Choose Dixa if you have 7+ agents and voice support is your primary channel with high call volume.",
    strengths: ['Strong voice support', 'Unified agent desktop', 'Conversation routing', '55% automation with Mim AI']
  },
];

export const comparisonFeatures: ComparisonFeature[] = [
  // AI & Automation
  {
    category: 'AI & Automation',
    feature: 'Autonomous AI Agent',
    pullse: true,
    zendesk: 'Add-on $50/mo',
    intercom: '$0.99/resolution',
    freshdesk: 'Add-on required',
    dixa: 'Mim AI included',
  },
  {
    category: 'AI & Automation',
    feature: 'AI Copilot for Agents',
    pullse: true,
    zendesk: 'Add-on $50/mo',
    intercom: 'Limited free',
    freshdesk: 'Add-on $29/mo',
    dixa: 'Included',
  },
  {
    category: 'AI & Automation',
    feature: 'Automatic QA Monitoring',
    pullse: true,
    zendesk: 'Manual/Limited',
    intercom: false,
    freshdesk: false,
    dixa: 'Manual setup',
  },
  {
    category: 'AI & Automation',
    feature: 'AI-Powered Knowledge Base',
    pullse: true,
    zendesk: 'Add-on required',
    intercom: true,
    freshdesk: 'Pro plan+',
    dixa: true,
  },
  {
    category: 'AI & Automation',
    feature: 'Smart Intent Detection',
    pullse: true,
    zendesk: 'Add-on required',
    intercom: true,
    freshdesk: 'Basic',
    dixa: true,
  },

  // Platform & Core Features
  {
    category: 'Platform',
    feature: 'Omnichannel Inbox',
    pullse: true,
    zendesk: true,
    intercom: 'Messaging-focused',
    freshdesk: true,
    dixa: true,
  },
  {
    category: 'Platform',
    feature: 'Visual Workflow Builder',
    pullse: true,
    zendesk: 'Complex setup',
    intercom: 'Limited',
    freshdesk: 'Basic',
    dixa: true,
  },
  {
    category: 'Platform',
    feature: 'Advanced Analytics',
    pullse: true,
    zendesk: 'Add-on for advanced',
    intercom: 'Limited',
    freshdesk: 'Enterprise only',
    dixa: true,
  },
  {
    category: 'Platform',
    feature: 'API & Integrations',
    pullse: '100+',
    zendesk: '1700+',
    intercom: '300+',
    freshdesk: '300+',
    dixa: '100+',
  },
  {
    category: 'Platform',
    feature: 'Mobile App',
    pullse: true,
    zendesk: true,
    intercom: true,
    freshdesk: true,
    dixa: true,
  },

  // Pricing & Setup
  {
    category: 'Pricing',
    feature: 'AI Features Included',
    pullse: true,
    zendesk: false,
    intercom: 'Pay per use',
    freshdesk: false,
    dixa: true,
  },
  {
    category: 'Pricing',
    feature: 'Single Pricing Tier',
    pullse: true,
    zendesk: false,
    intercom: false,
    freshdesk: false,
    dixa: false,
  },
  {
    category: 'Pricing',
    feature: 'No Seat Minimum',
    pullse: true,
    zendesk: true,
    intercom: true,
    freshdesk: true,
    dixa: '7 seat min',
  },
  {
    category: 'Pricing',
    feature: 'Transparent Pricing',
    pullse: true,
    zendesk: 'Complex',
    intercom: 'Variable',
    freshdesk: 'Clear tiers',
    dixa: 'Clear',
  },

  // Implementation & Support
  {
    category: 'Setup & Support',
    feature: 'Setup Time',
    pullse: '2-5 days',
    zendesk: '2-8 weeks',
    intercom: '1-2 weeks',
    freshdesk: '1-2 weeks',
    dixa: '1-2 weeks',
  },
  {
    category: 'Setup & Support',
    feature: 'User-Friendly Interface',
    pullse: true,
    zendesk: 'Complex',
    intercom: true,
    freshdesk: true,
    dixa: true,
  },
  {
    category: 'Setup & Support',
    feature: 'Migration Assistance',
    pullse: 'Included',
    zendesk: 'Paid service',
    intercom: 'Limited',
    freshdesk: 'Limited',
    dixa: 'Limited',
  },
  {
    category: 'Setup & Support',
    feature: 'Dedicated Support',
    pullse: true,
    zendesk: 'Enterprise only',
    intercom: 'Enterprise only',
    freshdesk: 'Pro+',
    dixa: 'All plans',
  },
];

export const faqs = [
  {
    question: 'How long does it actually take to switch from [Competitor] to Pullse?',
    answer: 'Most teams are fully operational within 2-5 business days. We provide dedicated migration assistance, automated data import for tickets and contacts, and hands-on onboarding. The exact timeline depends on your data volume and customization needs, but we aim to minimize disruption with parallel running during transition.',
  },
  {
    question: 'What are the hidden costs I should know about?',
    answer: 'With Pullse, there are no hidden costs. Our pricing is per user/month plus usage-based AI actions. Unlike competitors, we don\'t charge extra for AI features, advanced analytics, or workflows. Implementation assistance and migration support are included. The only variable cost is AI usage, which scales with the value you receive.',
  },
  {
    question: 'How does your pricing actually compare for a team of 10 agents?',
    answer: 'For 10 agents with AI features: Pullse offers transparent pricing (contact sales), Zendesk costs ~$1,650/month ($165/agent with AI add-on), Intercom varies widely ($390+ base plus per-resolution fees), Freshdesk requires ~$760/month ($76/agent with AI add-ons), and Dixa starts at $490/month minimum (7 seats required).',
  },
  {
    question: 'Can I keep my existing integrations?',
    answer: 'Pullse integrates with 100+ popular tools including major CRMs (Salesforce, HubSpot), e-commerce platforms (Shopify, WooCommerce), and communication channels (Slack, email, SMS, social). We provide migration assistance to ensure your critical integrations transfer smoothly. If you have a specific integration requirement, our team can help evaluate compatibility.',
  },
  {
    question: 'What happens to my historical data and conversations?',
    answer: 'We migrate all your historical tickets, customer data, and knowledge base content. During the 2-5 day implementation, we run both systems in parallel so you maintain access to all historical conversations. Your team never loses context, and customers experience no disruption.',
  },
  {
    question: 'Is there really a free trial?',
    answer: 'Yes, we offer a trial period to experience the platform. Contact our sales team to discuss trial options that make sense for your team size and requirements.',
  },
  {
    question: 'What if Pullse is missing a feature I need?',
    answer: 'We\'re honest about our capabilities. While we have all core AI features (autonomous agent, copilot, Auto-QA), we have fewer integrations than Zendesk (100+ vs 1700+). If you need a specific feature, contact us - we prioritize our roadmap based on customer needs and might already have it in development.',
  },
];

export const migrationFeatures = [
  {
    title: 'Automated Data Migration',
    description: 'Import all historical tickets, contacts, and knowledge base articles with our automated tools',
  },
  {
    title: 'Dedicated Migration Specialist',
    description: 'Personal support from our team throughout the 2-5 day transition process',
  },
  {
    title: 'Parallel Running Period',
    description: 'Run both platforms simultaneously during migration to ensure zero data loss or downtime',
  },
  {
    title: 'Team Training Included',
    description: 'Comprehensive onboarding sessions to get your entire team productive quickly',
  },
];

export const stats = [
  { label: 'Typical Setup Time', value: '2-5 Days', highlight: true },
  { label: 'All Features Included', value: 'No Add-ons', highlight: true },
  { label: 'Integrations', value: '100+', highlight: false },
  { label: 'AI Features Standard', value: '3 Core', highlight: true },
];

// Cost comparison data for calculator
export interface PricingComparison {
  platform: string;
  basePrice: number;
  aiAddOn: number;
  perResolutionFee: number;
  minimumSeats: number;
  notes: string;
}

export const pricingComparisons: PricingComparison[] = [
  {
    platform: 'Pullse',
    basePrice: 0, // Contact sales
    aiAddOn: 0,
    perResolutionFee: 0, // Usage-based included
    minimumSeats: 1,
    notes: 'Single tier pricing with usage-based AI actions',
  },
  {
    platform: 'Zendesk',
    basePrice: 115,
    aiAddOn: 50,
    perResolutionFee: 0, // Plus pay-per-resolution
    minimumSeats: 1,
    notes: 'Suite Professional + Advanced AI add-on',
  },
  {
    platform: 'Intercom',
    basePrice: 85, // Advanced plan
    aiAddOn: 0,
    perResolutionFee: 0.99,
    minimumSeats: 1,
    notes: 'Advanced plan + $0.99 per AI resolution',
  },
  {
    platform: 'Freshdesk',
    basePrice: 47,
    aiAddOn: 29,
    perResolutionFee: 0,
    minimumSeats: 1,
    notes: 'Pro plan + Freddy AI Copilot add-on',
  },
  {
    platform: 'Dixa',
    basePrice: 109, // Growth plan
    aiAddOn: 0,
    perResolutionFee: 0,
    minimumSeats: 7,
    notes: 'Growth plan with 7-seat minimum',
  },
];
