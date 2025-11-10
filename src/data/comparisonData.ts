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
      "AI that executes actions (refunds, order lookups) - not just deflects with answers",
      "All AI features included in base plan - Zendesk charges $75/agent/month extra for Advanced AI & QA add-ons",
      "Faster setup (2-5 days vs 2-8 weeks) - Get your team productive immediately",
      "Transparent pricing - No hidden costs or surprise add-on fees"
    ],
    pricingNote: "Zendesk Suite Professional starts at $115/agent/month, plus $75/agent/month for Advanced AI & QA add-ons, plus $1.50 per AI resolution. Base platform with AI: $190/agent/month + variable resolution fees.",
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
      "True agentic chatbots that complete tasks across your entire stack, not just messaging-focused deflection",
      "Comprehensive omnichannel support beyond just messaging",
      "All features included - No variable pricing surprises"
    ],
    pricingNote: "Intercom Advanced plan (with Copilot + Fin AI) starts at $132/seat/month plus $0.99 per AI resolution. Costs vary significantly with volume, making budgeting difficult.",
    whenToChoose: "Choose Intercom if you're a fast-growing SaaS company prioritizing proactive messaging over traditional support.",
    strengths: ['Strong proactive messaging', 'SaaS-focused features', 'Conversational AI']
  },
  {
    id: 'freshdesk',
    name: 'Freshdesk',
    logo: '/competitors/freshdesk.svg',
    tagline: 'Cloud-based helpdesk',
    bestFor: 'Small to medium businesses wanting affordable entry-level support',
    whySwitch: [
      "AI copilot that executes actions across systems - not just suggestions agents must complete manually",
      "AI included in base plan - Freshdesk requires Omni Enterprise plus expensive AI add-ons",
      "More powerful automation out of the box",
      "Better knowledge base AI and search capabilities"
    ],
    pricingNote: "Freshdesk AI features require Omni Enterprise plan at $104/agent/month, plus Freddy AI Copilot ($29/agent/month), Freddy AI Agent ($89/1000 sessions), and Connector Tasks ($79/5000 tasks). Real AI cost: $133+/agent/month + variable session and task costs.",
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
      "No minimum seat requirement - Dixa requires 7 seats minimum ($1,932/month)",
      "AI agents that take action beyond answering - process refunds, update orders, look up data across integrated systems",
      "More comprehensive AI suite (agent, copilot, and Auto-QA)",
      "Faster setup and easier configuration"
    ],
    pricingNote: "Dixa Prime Plan starts at $179/seat/month base, plus $97/seat/month in required add-ons (AI Copilot $39, QA $29, Advanced Insights $29), with a 7-seat minimum. Total: $276/seat/month ($1,932/month minimum for 7 agents) + $0.40 per AI conversation + $0.05 per conversation for Auto QA.",
    whenToChoose: "Choose Dixa if you have 7+ agents and voice support is your primary channel with high call volume.",
    strengths: ['Strong voice support', 'Unified agent desktop', 'Conversation routing', '55% automation with Mim AI']
  },
];

export const comparisonFeatures: ComparisonFeature[] = [
  // AI & Automation
  {
    category: 'AI & Automation',
    feature: 'Agentic AI Chatbots (Execute Actions)',
    pullse: 'Full execution',
    zendesk: 'Answer-only',
    intercom: 'Deflection-focused',
    freshdesk: 'Basic responses',
    dixa: 'Limited actions',
  },
  {
    category: 'AI & Automation',
    feature: 'AI Copilot for Agents (One-Click Execution)',
    pullse: 'Full execution',
    zendesk: 'Suggestions only',
    intercom: 'Reply drafting',
    freshdesk: 'Reply assistance',
    dixa: 'Reply drafting',
  },
  {
    category: 'AI & Automation',
    feature: 'Auto-QA Suite',
    pullse: 'Pro plan',
    zendesk: 'Manual/Limited',
    intercom: false,
    freshdesk: false,
    dixa: 'Manual setup',
  },
  {
    category: 'AI & Automation',
    feature: 'Help Center (Appo)',
    pullse: true,
    zendesk: 'Included',
    intercom: true,
    freshdesk: 'Included',
    dixa: true,
  },
  {
    category: 'AI & Automation',
    feature: 'Actions/Tools with Approvals',
    pullse: 'Unlimited + custom',
    zendesk: 'Limited pre-built',
    intercom: 'Basic webhooks',
    freshdesk: 'Basic workflows',
    dixa: 'Limited triggers',
  },
  {
    category: 'AI & Automation',
    feature: 'Cross-System Action Execution',
    pullse: 'Full stack',
    zendesk: 'Single system',
    intercom: false,
    freshdesk: 'Basic',
    dixa: 'Limited',
  },

  // Platform & Core Features
  {
    category: 'Platform',
    feature: 'Email + Live Chat',
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
    feature: 'Analytics & Reporting',
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
    feature: 'Voice/Phone Support',
    pullse: 'Coming soon',
    zendesk: true,
    intercom: false,
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
    answer: 'For 10 agents with AI features: Zendesk costs ~$1,900/month base ($190/agent) plus $1.50 per AI resolution, Intercom costs $1,320/month ($132/agent) plus $0.99 per resolution, Freshdesk costs ~$1,330/month ($133/agent) plus variable session and task costs, and Dixa requires 7-seat minimum at $276/seat ($1,932/month) plus per-conversation fees. Pullse offers transparent Pro pricing at $79/seat + usage-based credits.',
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
    answer: 'We\'re honest about our capabilities. Currently, we support email + live chat (with voice/phone and social messaging coming soon). We have all core AI features (agentic chatbots, copilot, Auto-QA suite), but we have fewer integrations than Zendesk (100+ vs 1700+). If you need a specific feature, contact us - we prioritize our roadmap based on customer needs and might already have it in development.',
  },
  {
    question: 'What makes Pullse\'s AI "agentic" compared to other chatbots?',
    answer: 'Most AI chatbots just answer questions or deflect to help articles. Pullse\'s agentic AI actually executes actions across your integrated systems - process Stripe refunds, look up Shopify orders, update Salesforce records, modify subscriptions. Our AI Copilot doesn\'t just suggest what to do; it does it for your agents with one-click execution and smart approval workflows for safety.',
  },
  {
    question: 'Can your AI really process refunds and modify orders, or just answer questions?',
    answer: 'Yes, Pullse AI actually executes actions. When a customer asks for a refund, our AI can process it through Stripe/PayPal directly (with approval workflows if needed). When they ask about an order, it looks it up in real-time from Shopify/WooCommerce and can modify it. This is different from competitors whose AI just answers questions or deflects to help articles while agents still do the actual work manually.',
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
  { label: 'Pricing Model', value: 'All-Inclusive', highlight: true },
  { label: 'Integrations', value: '100+', highlight: false },
  { label: 'AI Features', value: 'Chatbot+Copilot+QA', highlight: true },
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
    notes: 'Pro plan at $79/seat with usage-based AI credits',
  },
  {
    platform: 'Zendesk',
    basePrice: 190, // $115 base + $75 AI & QA
    aiAddOn: 0,
    perResolutionFee: 1.50,
    minimumSeats: 1,
    notes: 'Suite Professional + Advanced AI & QA add-on + $1.50 per resolution',
  },
  {
    platform: 'Intercom',
    basePrice: 132, // Advanced plan with Copilot + Fin AI
    aiAddOn: 0,
    perResolutionFee: 0.99,
    minimumSeats: 1,
    notes: 'Advanced plan with Copilot + Fin AI + $0.99 per AI resolution',
  },
  {
    platform: 'Freshdesk',
    basePrice: 104, // Omni Enterprise
    aiAddOn: 29,
    perResolutionFee: 0,
    minimumSeats: 1,
    notes: 'Omni Enterprise + Freddy AI Copilot + variable session/task costs',
  },
  {
    platform: 'Dixa',
    basePrice: 276, // $179 base + $97 add-ons (AI Copilot $39, QA $29, Advanced Insights $29)
    aiAddOn: 0,
    perResolutionFee: 0,
    minimumSeats: 7,
    notes: 'Prime plan with required add-ons, 7-seat minimum + per-conversation fees',
  },
];
