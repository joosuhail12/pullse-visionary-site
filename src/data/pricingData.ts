import { type LucideIcon, Shield, Lock, CheckCircle2, Clock, Headphones, Plug, Palette, Server } from 'lucide-react';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface PricingTier {
  id: 'standard' | 'pro';
  name: string;
  tagline: string;
  monthlyPricePerSeat: number; // Base platform fee per seat per month
  creditPricing: {
    payAsYouGo: number; // Cost per credit for AI usage (PAYG)
    preCommitted: number; // Cost per credit for AI usage (pre-committed)
    minimumCommit?: number; // Minimum monthly credit commit (Pro only)
  };
  popular?: boolean;
  features: string[];
  limits: {
    actionsPerMonth?: number;
    gracePeriod?: string;
    agentProfiles: number | 'unlimited';
    copilotProfiles: number | 'unlimited';
    helpCenters: number | 'unlimited';
    creditsIncluded?: number;
    commitAmount?: number;
    rollover?: string;
  };
  includes: string[];
  footnote: string;
  ctaText: string;
  ctaLink: string;
}

export interface CreditPricing {
  payg: number; // Pay-as-you-go rate
  prepaid: number; // Prepaid pack rate
  commit: number; // Monthly commit rate
  description: string;
}

export interface BillableAction {
  category: string;
  icon?: LucideIcon;
  items: {
    name: string;
    cost: string;
    description?: string;
  }[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  category: string;
  icon: string;
  questions: FAQ[];
}

export interface StartupProgram {
  headline: string;
  subhead: string;
  discount: string;
  duration: string;
  benefits: string[];
  eligibility: {
    requirement: string;
    detail: string;
    met?: boolean;
  }[];
  documentation: string[];
  afterPeriod: string;
  ctaText: string;
  ctaLink: string;
}

export interface PolicyFootnote {
  text: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  metrics: {
    label: string;
    value: string;
  }[];
  image?: string;
}

export interface TrustSignal {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  billingPeriod: 'month' | 'seat/month' | 'one-time';
  icon: LucideIcon;
  features: string[];
}

export interface DescriptiveFeature {
  title: string;
  description: string;
  icon?: LucideIcon;
  tierAvailability: 'standard' | 'pro' | 'both';
}

export interface Currency {
  code: 'USD' | 'EUR' | 'GBP';
  symbol: string;
  rate: number; // Conversion rate from USD
}

export interface FeatureComparison {
  id: string;
  category: string;
  icon: string; // Emoji for visual appeal
  categoryDescription: string; // Short description of category value
  defaultExpanded?: boolean; // Category starts expanded
  features: {
    name: string;
    description?: string; // Brief description shown below feature name
    standard: boolean | string | 'coming-soon';
    pro: boolean | string | 'coming-soon';
    comingSoon?: boolean; // Yellow "Coming Soon" badge
    proOnly?: boolean; // Visual emphasis for Pro-exclusive features
    usesCredits?: boolean; // Indicates this feature consumes AI credits
    tooltip?: string; // Optional tooltip text for additional context
  }[];
}

// ============================================
// PRICING TIERS
// ============================================

export const pricingTiers: PricingTier[] = [
  {
    id: 'standard',
    name: 'Standard',
    tagline: 'The full help desk for growing teams.',
    monthlyPricePerSeat: 49,
    creditPricing: {
      payAsYouGo: 0.10,
      preCommitted: 0.08,
    },
    popular: false,
    features: [
      'All features on (nothing crippled)',
      'Unified inbox (email + live chat)',
      'Workflows with visual builder',
      'AI Copilot (draft, summarize, translate, rewrite, extract)',
      'AI Agent (customer-facing with RAG)',
      'Tools/actions with approvals & audit',
      'Analytics & reporting',
      'Multilingual & sentiment detection',
      'SSO and RBAC',
      'Integrations & API access',
    ],
    limits: {
      agentProfiles: 2,
      copilotProfiles: 1,
      helpCenters: 1,
      rollover: 'Credits rollover until consumed (non-refundable)',
    },
    includes: [
      '2 AI chatbots + 1 Copilot profile',
      '1 Appo Help Center (custom domain/theme)',
      '50 chatbot credits/month + 20 credits/seat/month included',
      'Credits rollover until consumed',
    ],
    footnote:
      'Base platform: $49/seat/month. Includes 50 chatbot credits + 20 credits per seat monthly. Additional AI actions billed via credits ($0.10 PAYG, $0.08 pre-committed). Credits rollover until consumed, expire at contract expiry, and are non-refundable.',
    ctaText: 'Contact Sales',
    ctaLink: '/contact-sales',
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'Unlimited scale, multi-brand, and advanced QA.',
    monthlyPricePerSeat: 79,
    creditPricing: {
      payAsYouGo: 0.10,
      preCommitted: 0.08,
    },
    popular: true,
    features: [
      'Everything in Standard',
      'No action ceiling (unlimited throughput)',
      'Unlimited AI Agent profiles',
      'Unlimited Copilot profiles',
      'Unlimited Appo Help Centers (multi-brand/locales)',
      'Auto-QA suite (rep & bot scorecards, custom rubrics)',
      'AI-generated coaching & feedback workflows',
      'Supervisor review, overrides & calibration',
      'QA analytics (trends, topics, coaching impact)',
    ],
    limits: {
      agentProfiles: 'unlimited',
      copilotProfiles: 'unlimited',
      helpCenters: 'unlimited',
      rollover: 'Credits rollover until consumed (non-refundable)',
    },
    includes: [
      'Everything in Standard',
      'No action ceiling',
      '100 chatbot credits/month + 50 credits/seat/month included',
      'Pre-committed credits at $0.08/credit (no minimum)',
      'Unlimited chatbots + Unlimited Copilot profiles',
      'Unlimited help centers',
      'Full Auto-QA suite',
      'Credits rollover until consumed',
    ],
    footnote:
      'Base platform: $79/seat/month. Includes 100 chatbot credits + 50 credits per seat monthly. Additional AI actions billed via credits ($0.10 PAYG, $0.08 pre-committed). Credits rollover until consumed, expire at contract expiry, and are non-refundable.',
    ctaText: 'Contact Sales',
    ctaLink: '/contact-sales',
  },
];

// ============================================
// CREDIT PRICING
// ============================================

export const creditPricing: CreditPricing = {
  payg: 0.1,
  prepaid: 0.08,
  commit: 0.08,
  description:
    '1 credit = 1 AI action (billed separately from base platform). Every Copilot task, every AI Agent message turn, and each tool/API call bills exactly 1 credit. No size tiers. No bundling. No token talk.',
};

// ============================================
// BILLABLE VS NON-BILLABLE ACTIONS
// ============================================

export const billableActions: BillableAction[] = [
  {
    category: 'Copilot Tasks',
    items: [
      { name: 'Draft reply', cost: '1 credit' },
      { name: 'Rewrite message', cost: '1 credit' },
      { name: 'Summarize conversation', cost: '1 credit' },
      { name: 'Translate text', cost: '1 credit' },
      { name: 'Extract data/insights', cost: '1 credit' },
    ],
  },
  {
    category: 'AI Agent',
    items: [
      { name: 'Each bot message turn', cost: '1 credit' },
      {
        name: 'Multi-turn conversations',
        cost: '~8-12 credits avg',
        description: 'Typical customer conversation',
      },
    ],
  },
  {
    category: 'Tools & Actions',
    items: [
      { name: 'Each tool/API call', cost: '1 credit' },
      { name: 'Refund processing', cost: '1 credit' },
      { name: 'Plan changes', cost: '1 credit' },
    ],
  },
  {
    category: 'Auto-QA',
    items: [
      { name: 'Rep QA scoring', cost: '1 credit' },
      { name: 'Bot QA scoring', cost: '1 credit' },
      { name: 'Post-conversation summaries', cost: '1 credit' },
    ],
  },
];

export const nonBillableActions: string[] = [
  'Intent detection',
  'Language detection',
  'Routing decisions',
  'Guardrail checks',
  'PII redaction',
  'Vector search / RAG lookups',
  'Sentiment analysis',
];

// ============================================
// EVERYTHING IN BOTH PLANS
// ============================================

export const sharedFeatures: string[] = [
  'Unified Inbox (email + live chat)',
  'Smart assignments & collision detection',
  'SLAs and automation rules',
  'AI Copilot (draft, summarize, rewrite, translate, extract)',
  'AI Agent (customer-facing) with RAG',
  'Copilot tool/actions & on-demand execution',
  'Visual workflows + "describe-to-build" with AI',
  'Approvals & full audit trails for actions',
  'Analytics & reporting (automation, deflection, AI performance, ROI)',
  'Multilingual support + sentiment detection',
  'SSO, RBAC, and activity logs',
  'Integrations & API access',
];

export const proOnlyFeature: string = 'Auto-QA suite is a Pro-only capability';

// ============================================
// DIFFERENTIATORS
// ============================================

export const autoQAFeatures: string[] = [
  'Rep QA scorecards with custom rubrics',
  'AI bot performance scorecards',
  'Custom scoring rubrics (quality, compliance, tone)',
  'AI-generated coaching & feedback workflows',
  'Supervisor review, overrides & calibration',
  'QA analytics (trends, topic analysis, coaching impact)',
];

export const helpCenterComparison = {
  standard: {
    title: 'Standard: 1 Help Center',
    features: [
      '1 publicly hosted help center',
      'Custom domain & theming',
      'Categories & article management',
      'Connected to AI Agent & Copilot for retrieval',
    ],
  },
  pro: {
    title: 'Pro: Unlimited Help Centers',
    features: [
      'Unlimited help centers',
      'Multi-brand & regional support',
      'Locale-specific content',
      'Shared content across centers',
      'Role-based permissions',
      'Connected to AI Agent & Copilot for retrieval',
    ],
  },
};

// ============================================
// FAQS
// ============================================

export const faqCategories: FAQCategory[] = [
  {
    id: 'getting-started',
    category: 'Getting Started',
    icon: '💡',
    questions: [
      {
        question: 'Is there a free trial?',
        answer:
          'Yes—we offer 14-day trials arranged through our sales team to ensure proper setup and onboarding. This personalized approach helps you get the most value from your trial period. Contact us to get started with a trial tailored to your needs.',
      },
      {
        question: 'Is there a free plan?',
        answer:
          "No. We price on value delivered, not shelfware. Every feature is available from day one—we'd rather you pay for software that actually helps your team than maintain a crippled free tier that creates bad experiences.",
      },
      {
        question: 'Can we change plans anytime?',
        answer:
          'Yes. You can switch between Standard and Pro plans anytime. The main difference is that Pro includes unlimited AI profiles, unlimited help centers, and the full Auto-QA suite for quality assurance and team coaching.',
      },
    ],
  },
  {
    id: 'pricing-credits',
    category: 'Pricing & Credits',
    icon: '💰',
    questions: [
      {
        question: 'What credits are included with each plan?',
        answer:
          'Standard includes 50 chatbot credits + 20 credits per seat monthly. Pro includes 100 chatbot credits + 50 credits per seat monthly. These included credits refresh each month and can be used for any AI actions across the platform.',
      },
      {
        question: 'Do credits roll over?',
        answer:
          'Yes. All credits—whether included, pay-as-you-go, or pre-committed—rollover until consumed. Credits expire only at contract expiry and are non-refundable. Use them at your own pace without worrying about monthly limits.',
      },
      {
        question: 'What counts as an action?',
        answer:
          'Any Copilot task (draft, summarize, translate, etc.), any AI Agent message turn, or any tool/API call = 1 credit. Longer conversations or complex work consume multiple actions—no hidden multipliers, just straightforward billing by actual work performed.',
      },
      {
        question: 'Is there a per-resolution price?',
        answer:
          'No. We bill by actual work (actions), not fuzzy outcomes. A 2-message exchange bills differently than a 15-message conversation with tool calls—you pay for what AI actually does, not arbitrary "resolution" definitions.',
      },
      {
        question: 'Can we cap our AI spend?',
        answer:
          'Yes. Set organization-level budgets with 80% and 100% threshold alerts. Admins choose soft-warn (notify but continue) or hard-stop (pause AI actions). Full control over usage and costs.',
      },
    ],
  },
  {
    id: 'features-limits',
    category: 'Features & Limits',
    icon: '✨',
    questions: [
      {
        question: 'Are there any action limits or throughput ceilings?',
        answer:
          'No. Both Standard and Pro plans have no action ceilings or throughput limits. Use as many AI actions as you need—you only pay for what you use through credits. There are no monthly caps, no throttling, and no hard stops.',
      },
      {
        question: 'Can Copilot execute actions like refunds or plan changes?',
        answer:
          'Yes. Copilot can run tools and actions on demand, with built-in approval workflows and full audit trails. Reps maintain control while AI handles the execution, making complex operations faster and error-free.',
      },
      {
        question: 'How many profiles can we create?',
        answer:
          'Standard: 2 AI chatbots + 1 Copilot profile. Pro: Unlimited chatbots and Copilot profiles. Profiles are separate AI personas with unique prompts, knowledge bases, and tool access—perfect for different teams, brands, or use cases.',
      },
    ],
  },
];

// Maintain backward compatibility - flatten for components still using old structure
export const faqs: FAQ[] = faqCategories.flatMap(category => category.questions);

// ============================================
// POLICY FOOTNOTES
// ============================================

export const policyFootnotes: PolicyFootnote[] = [
  {
    text: 'Base platform pricing: $49/seat/month (Standard) or $79/seat/month (Pro). AI usage billed separately via credits.',
  },
  {
    text: 'Plans include baseline monthly credits. Additional AI usage beyond included credits bills at standard rates ($0.10 PAYG, $0.08 pre-committed).',
  },
  {
    text: 'Pre-committed credits are consumed first, then pay-as-you-go charges apply for additional usage.',
  },
  {
    text: 'All credits rollover until consumed and expire at contract expiry. Included monthly credits refresh each billing cycle.',
  },
  {
    text: 'No per-resolution caps or conversation limits. Longer conversations consume more actions and bill accordingly.',
  },
  {
    text: 'All pricing shown in USD. Additional charges may apply based on your location.',
  },
];

// ============================================
// STARTUP PROGRAM
// ============================================

export const startupProgram: StartupProgram = {
  headline: 'Startup plan — 50% off for 12 months',
  subhead: "If you're building, we'll meet you where you are.",
  discount: '50% off',
  duration: '12 months',
  benefits: [
    '50% off base platform pricing ($24.50 Standard, $39.50 Pro per seat/month) for the first 12 months',
    'Keep all plan entitlements (no feature reductions)',
    'AI usage credits billed at standard rates ($0.10 PAYG, $0.08 pre-committed)',
    '25% off base platform for year 2, then standard pricing',
  ],
  eligibility: [
    {
      requirement: 'Company age',
      detail: 'Less than 3 years old',
    },
    {
      requirement: 'Revenue or funding',
      detail: '≤ $2M ARR or ≤ $5M total raised',
    },
    {
      requirement: 'Seat limit',
      detail: 'Up to 15 seats under discount',
    },
    {
      requirement: 'Customer status',
      detail: 'Not currently a paying customer on non-startup terms',
    },
  ],
  documentation: [
    'Company registration date (screenshot or official document)',
    'Revenue attestation or funding announcement link',
    'LinkedIn company page or official website',
  ],
  afterPeriod:
    'After 12 months: Automatically receive 25% off for year 2, then standard pricing. We want you to succeed, not trap you in discounts.',
  ctaText: 'Apply for startup program',
  ctaLink: '/contact-sales?program=startup',
};

// ============================================
// TRIAL BENEFITS
// ============================================

export const trialBenefits: string[] = [
  'Sales-assisted trials',
  'Personalized setup',
  'Onboarding included',
];

// ============================================
// QUANTIFIED TESTIMONIALS
// ============================================

export const testimonials: Testimonial[] = [
  {
    quote: "Pullse reduced our average response time from 4 hours to 12 minutes. The AI Agent handles 70% of our support tickets automatically, and our CSAT score jumped from 82% to 97%.",
    author: "Sarah Chen",
    role: "Head of Customer Experience",
    company: "TechFlow",
    metrics: [
      { label: "Response Time", value: "4hr → 12min" },
      { label: "Auto-resolution", value: "70%" },
      { label: "CSAT Score", value: "97%" },
    ],
  },
  {
    quote: "We went from 8 support agents to 3, while handling 3x more conversations. Pullse's AI Copilot makes our team incredibly efficient—they can handle complex issues in minutes instead of hours.",
    author: "Marcus Rodriguez",
    role: "VP of Operations",
    company: "Velocity Commerce",
    metrics: [
      { label: "Team Size", value: "8 → 3 agents" },
      { label: "Volume Handled", value: "3x increase" },
      { label: "Resolution Time", value: "60% faster" },
    ],
  },
  {
    quote: "The ROI was clear in week one. We're now resolving 6,000 conversations monthly with AI, saving $42K in support costs. The QA tools caught quality issues we didn't even know existed.",
    author: "Jennifer Park",
    role: "Customer Operations Director",
    company: "BuildRight SaaS",
    metrics: [
      { label: "Conversations Resolved", value: "6,000/month" },
      { label: "Cost Savings", value: "$42K/month" },
      { label: "Time to Value", value: "1 week" },
    ],
  },
];

// ============================================
// TRUST SIGNALS
// ============================================

export const trustSignals: TrustSignal[] = [
  {
    icon: Shield,
    title: "99.9% Uptime SLA",
    description: "Enterprise-grade reliability with guaranteed uptime and automatic failover",
  },
  {
    icon: CheckCircle2,
    title: "No Cancellation Fees",
    description: "Cancel anytime, no questions asked. Keep your data for 90 days",
  },
  {
    icon: Clock,
    title: "Fast Setup, Meaningful Implementation",
    description: "3x faster implementation than legacy platforms—go live in days, not months",
  },
];

// ============================================
// DESCRIPTIVE FEATURES
// ============================================

export const descriptiveFeatures: DescriptiveFeature[] = [
  {
    title: "Unified Inbox",
    description: "Handle email, live chat, and social messages in one place—no more tab-switching chaos. Smart collision detection prevents your team from stepping on each other's toes.",
    tierAvailability: "both",
  },
  {
    title: "AI Copilot",
    description: "Your agents get instant reply drafts, summaries, translations, and data extraction. AI does the grunt work so your team focuses on complex problems that actually need human judgment.",
    tierAvailability: "both",
  },
  {
    title: "Customer-Facing AI Agent",
    description: "Handles 60-70% of common questions automatically using your help docs and past conversations. Learns from every interaction and escalates smoothly when it hits its limits.",
    tierAvailability: "both",
  },
  {
    title: "Visual Workflow Builder",
    description: "Build complex automation with drag-and-drop or just describe what you want in plain English. AI generates the workflow, you refine it. No code, no limits.",
    tierAvailability: "both",
  },
  {
    title: "Tools & Actions with Approvals",
    description: "AI can process refunds, change subscriptions, or trigger webhooks—but only with your approval rules. Full audit trail shows who approved what and when.",
    tierAvailability: "both",
  },
  {
    title: "Analytics & Reporting",
    description: "See deflection rates, AI performance, team efficiency, and ROI in real-time. Know exactly which automations are working and which need tuning.",
    tierAvailability: "both",
  },
  {
    title: "Unlimited AI Profiles",
    description: "Create separate AI personalities for different teams, brands, or use cases. Each gets its own knowledge base, tone, and tool access. Perfect for multi-brand operations.",
    tierAvailability: "pro",
  },
  {
    title: "Auto-QA Suite",
    description: "AI scores every conversation for quality, compliance, and tone—then generates coaching suggestions for your team. Catch issues before customers complain and improve faster than competitors.",
    tierAvailability: "pro",
  },
  {
    title: "Multi-Brand Help Centers",
    description: "Run unlimited help centers with different domains, themes, and content. Share articles across brands or keep them separate. Perfect for agencies and multi-product companies.",
    tierAvailability: "pro",
  },
];

// ============================================
// ADD-ONS
// ============================================

export const addOns: AddOn[] = [
  {
    id: "priority-support",
    name: "Priority Support",
    description: "Dedicated Slack channel with <15 min response time during business hours",
    price: 199,
    billingPeriod: "month",
    icon: Headphones,
    features: [
      "Direct Slack access to engineering",
      "<15 min response time (business hours)",
      "Monthly strategy call",
      "Early access to beta features",
    ],
  },
  {
    id: "custom-integration",
    name: "Custom Integration",
    description: "We'll build a custom integration for your internal tools or CRM",
    price: 2500,
    billingPeriod: "one-time",
    icon: Plug,
    features: [
      "Custom API integration built by our team",
      "Full testing & documentation",
      "Ongoing maintenance included",
      "4-6 week delivery timeline",
    ],
  },
  {
    id: "white-label",
    name: "White-Label",
    description: "Remove all Pullse branding and use your own domain and logos",
    price: 499,
    billingPeriod: "month",
    icon: Palette,
    features: [
      "Remove 'Powered by Pullse'",
      "Custom domain for widget and help center",
      "Your logo throughout interface",
      "Custom color scheme",
    ],
  },
  {
    id: "dedicated-instance",
    name: "Dedicated Instance",
    description: "Your own isolated environment for maximum security and customization",
    price: 1999,
    billingPeriod: "month",
    icon: Server,
    features: [
      "Isolated database and infrastructure",
      "Custom SLA up to 99.99%",
      "Data residency options",
      "Custom retention policies",
    ],
  },
];

// ============================================
// CURRENCIES
// ============================================

export const currencies: Currency[] = [
  { code: "USD", symbol: "$", rate: 1 },
  { code: "EUR", symbol: "€", rate: 0.92 },
  { code: "GBP", symbol: "£", rate: 0.79 },
];

// ============================================
// FEATURE COMPARISON TABLE
// ============================================

export const featureComparison: FeatureComparison[] = [
  // ============================================
  // CATEGORY 1: CHANNELS & COMMUNICATION
  // ============================================
  {
    id: "channels",
    category: "Channels & Communication",
    icon: "📨",
    categoryDescription: "Meet customers where they are with multi-channel support",
    features: [
      {
        name: "Email Support",
        description: "Full email ticketing with automatic threading and rich formatting",
        standard: true,
        pro: true,
      },
      {
        name: "Email Auto-Replies",
        description: "Automated acknowledgment and out-of-office responses",
        standard: true,
        pro: true,
      },
      {
        name: "Live Chat Widget",
        description: "Customizable chat widget for your website or app",
        standard: true,
        pro: true,
      },
      {
        name: "Voice/Phone Support",
        description: "Integrated voice calls with transcription and recording",
        standard: "coming-soon",
        pro: "coming-soon",
        comingSoon: true,
      },
      {
        name: "Social Messaging",
        description: "WhatsApp, Facebook Messenger, Instagram DMs",
        standard: "coming-soon",
        pro: "coming-soon",
        comingSoon: true,
      },
    ],
  },

  // ============================================
  // CATEGORY 2: TICKETING & WORKFLOW
  // ============================================
  {
    id: "ticketing",
    category: "Ticketing & Workflow",
    icon: "🎯",
    categoryDescription: "Powerful automation to eliminate repetitive work",
    features: [
      {
        name: "Unified Inbox",
        description: "Email, chat, and social messages in one unified view",
        standard: true,
        pro: true,
      },
      {
        name: "AI Writing Tools",
        description: "Rewrite, shorten, elaborate, change tone, and improve responses",
        standard: true,
        pro: true,
        usesCredits: true,
      },
      {
        name: "Conversation Summaries",
        description: "AI-generated summaries of entire conversations",
        standard: true,
        pro: true,
        usesCredits: true,
      },
      {
        name: "Smart Assignment Rules",
        description: "Automatically route conversations to the right agent",
        standard: true,
        pro: true,
      },
      {
        name: "Collision Detection",
        description: "Real-time alerts prevent duplicate work",
        standard: true,
        pro: true,
      },
      {
        name: "Macros & Saved Replies",
        description: "Pre-written response templates for common questions",
        standard: true,
        pro: true,
      },
      {
        name: "Visual Workflow Builder",
        description: "Build automations with drag-and-drop or natural language",
        standard: true,
        pro: true,
      },
      {
        name: "Trigger Automations",
        description: "Execute actions automatically based on conditions",
        standard: true,
        pro: true,
      },
      {
        name: "Time-Based Automations",
        description: "Schedule actions and add delays to workflows",
        standard: true,
        pro: true,
      },
      {
        name: "Custom Fields",
        description: "Track business-specific data on conversations",
        standard: true,
        pro: true,
      },
      {
        name: "Custom Objects",
        description: "Create custom data structures and relationships",
        standard: true,
        pro: true,
      },
      {
        name: "Sentiment Detection",
        description: "Automatically detect frustrated or angry customers",
        standard: true,
        pro: true,
        usesCredits: true,
      },
      {
        name: "SLA Management",
        description: "Set and track response time SLAs",
        standard: "coming-soon",
        pro: "coming-soon",
        comingSoon: true,
      },
    ],
  },

  // ============================================
  // CATEGORY 3: AGENTIC CHATBOTS & COPILOTS
  // ============================================
  {
    id: "ai-chatbots-copilots",
    category: "Agentic Chatbots & Copilots",
    icon: "🤖",
    categoryDescription: "AI agents that automate customer support and augment agent capabilities",
    defaultExpanded: true,
    features: [
      {
        name: "Agentic Chatbots",
        description: "Customer-facing AI chatbots with RAG and autonomous reasoning",
        standard: "2 chatbots",
        pro: "Unlimited",
        usesCredits: true,
      },
      {
        name: "Agentic Copilots for Agents",
        description: "AI assistants that execute actions and provide knowledge on-demand",
        standard: true,
        pro: true,
        usesCredits: true,
      },
      {
        name: "Copilot Profiles",
        description: "Multiple AI personas for different teams or use cases",
        standard: "1 profile",
        pro: "Unlimited",
        usesCredits: true,
      },
      {
        name: "Knowledge Management",
        description: "Multi-source knowledge ingestion: snippets, files, websites, and help articles",
        standard: true,
        pro: true,
      },
      {
        name: "Actions",
        description: "Visual builder to convert any API into AI-executable tools",
        standard: true,
        pro: true,
      },
      {
        name: "Multilingual Support",
        description: "Automatic language detection and real-time translation",
        standard: "coming-soon",
        pro: "coming-soon",
        comingSoon: true,
        usesCredits: true,
      },
    ],
  },

  // ============================================
  // CATEGORY 4: QA & COACHING
  // ============================================
  {
    id: "qa-coaching",
    category: "QA & Coaching",
    icon: "📊",
    categoryDescription: "Automated quality assurance and AI-powered team coaching (Pro only)",
    features: [
      {
        name: "Auto QA Scorecards",
        description: "AI automatically scores every conversation for quality and compliance",
        standard: false,
        pro: true,
        proOnly: true,
        usesCredits: true,
      },
      {
        name: "Custom QA Rubrics",
        description: "Define your own scoring criteria and quality standards",
        standard: false,
        pro: true,
        proOnly: true,
      },
      {
        name: "Auto Feedback and Coaching",
        description: "AI generates personalized coaching and improvement suggestions",
        standard: false,
        pro: true,
        proOnly: true,
        usesCredits: true,
      },
      {
        name: "Supervisor Coaching and Scorecard Overrides",
        description: "Human oversight with manual score adjustments and coaching",
        standard: false,
        pro: true,
        proOnly: true,
      },
      {
        name: "Score & Coaching Dispute System",
        description: "Agents can contest scores with supervisor review workflow",
        standard: false,
        pro: true,
        proOnly: true,
      },
      {
        name: "Performance Analytics",
        description: "Track quality trends, coaching impact, and team performance",
        standard: false,
        pro: true,
        proOnly: true,
      },
    ],
  },

  // ============================================
  // CATEGORY 5: TEAM COLLABORATION
  // ============================================
  {
    id: "collaboration",
    category: "Team Collaboration",
    icon: "👥",
    categoryDescription: "Coordinate seamlessly across teams without duplicating work",
    features: [
      {
        name: "Internal Notes & Mentions",
        description: "Private team communication within conversations",
        standard: true,
        pro: true,
      },
      {
        name: "Team Inboxes & Groups",
        description: "Organize agents into teams with dedicated queues",
        standard: true,
        pro: true,
      },
      {
        name: "Shared Drafts",
        description: "Collaborate on complex responses before sending",
        standard: true,
        pro: true,
      },
      {
        name: "Collision Detection",
        description: "Real-time visibility into who's working on what",
        standard: true,
        pro: true,
      },
      {
        name: "Activity Logs",
        description: "Complete audit trail of every action and change",
        standard: true,
        pro: true,
      },
      {
        name: "Role-Based Permissions (RBAC)",
        description: "Granular control over what each team member can access",
        standard: true,
        pro: true,
      },
    ],
  },

  // ============================================
  // CATEGORY 6: APPO - PUBLIC HELP CENTERS
  // ============================================
  {
    id: "knowledge",
    category: "Appo - Public Help Centers",
    icon: "📚",
    categoryDescription: "Build self-service knowledge bases that reduce ticket volume",
    features: [
      {
        name: "Collections",
        description: "Organize articles into hierarchical collections and categories",
        standard: true,
        pro: true,
      },
      {
        name: "Articles",
        description: "Rich text editor for creating help documentation",
        standard: true,
        pro: true,
      },
      {
        name: "Multi Brand Helpcenters",
        description: "Run separate help centers for different brands or products",
        standard: "1 help center",
        pro: "Unlimited",
      },
      {
        name: "Custom Domain & Theming",
        description: "Full branding control with custom domain and styling",
        standard: true,
        pro: true,
      },
      {
        name: "Shared Content Library",
        description: "Reuse articles across multiple help centers",
        standard: false,
        pro: true,
        proOnly: true,
      },
      {
        name: "AI Writing Agents",
        description: "AI assists with writing, expanding, and improving articles",
        standard: true,
        pro: true,
        usesCredits: true,
      },
      {
        name: "AI Powered SEO Optimization",
        description: "Automatic SEO recommendations and meta tag generation",
        standard: true,
        pro: true,
        usesCredits: true,
      },
      {
        name: "Real Time and Live Collaborative Editing",
        description: "Multiple team members edit articles simultaneously",
        standard: true,
        pro: true,
      },
      {
        name: "Content Gap Analysis",
        description: "AI identifies missing articles based on support conversations",
        standard: false,
        pro: true,
        proOnly: true,
        usesCredits: true,
      },
      {
        name: "AI Citations",
        description: "AI chatbots cite specific help center articles in responses",
        standard: true,
        pro: true,
      },
    ],
  },

  // ============================================
  // CATEGORY 7: ANALYTICS & REPORTING
  // ============================================
  {
    id: "analytics",
    category: "Analytics & Reporting",
    icon: "📊",
    categoryDescription: "Make data-driven decisions with real-time support metrics",
    features: [
      {
        name: "Pre-Built Dashboards",
        description: "Ready-to-use reports for key support metrics",
        standard: true,
        pro: true,
      },
      {
        name: "Deflection Rate Tracking",
        description: "Measure conversations resolved by AI vs. escalated to agents",
        standard: true,
        pro: true,
      },
      {
        name: "AI Performance Metrics",
        description: "Track chatbot accuracy, customer satisfaction, and resolution quality",
        standard: true,
        pro: true,
      },
      {
        name: "Team Efficiency Reports",
        description: "Agent productivity, response times, and workload distribution",
        standard: true,
        pro: true,
      },
      {
        name: "ROI Tracking",
        description: "Calculate cost savings from AI automation and efficiency gains",
        standard: true,
        pro: true,
      },
      {
        name: "Data Export (CSV/API)",
        description: "Export raw data to external BI tools or spreadsheets",
        standard: true,
        pro: true,
      },
      {
        name: "Custom Report Builder",
        description: "Build custom dashboards with drag-and-drop report designer",
        standard: "coming-soon",
        pro: "coming-soon",
        comingSoon: true,
      },
      {
        name: "Scheduled Reports",
        description: "Automatically email reports to stakeholders on a schedule",
        standard: "coming-soon",
        pro: "coming-soon",
        comingSoon: true,
      },
    ],
  },

  // ============================================
  // CATEGORY 8: INTEGRATIONS & API
  // ============================================
  {
    id: "integrations",
    category: "Integrations & API",
    icon: "🔌",
    categoryDescription: "Connect Pullse to your existing tech stack",
    features: [
      {
        name: "REST API Access",
        description: "Comprehensive API for building custom integrations",
        standard: true,
        pro: true,
      },
      {
        name: "Webhooks",
        description: "Real-time event notifications pushed to your systems",
        standard: true,
        pro: true,
      },
      {
        name: "Pre-Built Integrations",
        description: "Native connections to popular platforms and tools",
        standard: true,
        pro: true,
      },
    ],
  },

  // ============================================
  // CATEGORY 9: SECURITY & COMPLIANCE
  // ============================================
  {
    id: "security",
    category: "Security & Compliance",
    icon: "🔒",
    categoryDescription: "Enterprise-grade security built into every layer",
    features: [
      {
        name: "Data Encryption (at rest & in transit)",
        description: "AES-256 encryption for stored data and TLS 1.3 for transmission",
        standard: true,
        pro: true,
      },
      {
        name: "SSO Authentication",
        description: "Single Sign-On via SAML 2.0, OAuth 2.0, and OpenID Connect",
        standard: "coming-soon",
        pro: "coming-soon",
        comingSoon: true,
      },
      {
        name: "Role-Based Access Control (RBAC)",
        description: "Fine-grained permissions for users, teams, and resources",
        standard: true,
        pro: true,
      },
      {
        name: "Activity & Audit Logs",
        description: "Immutable audit trail of every user action and system event",
        standard: true,
        pro: true,
      },
      {
        name: "SOC 2 Type II Certification",
        description: "Third-party verified security and availability controls",
        standard: "coming-soon",
        pro: "coming-soon",
        comingSoon: true,
      },
      {
        name: "GDPR Compliance Features",
        description: "Tools for European data privacy regulation compliance",
        standard: "coming-soon",
        pro: "coming-soon",
        comingSoon: true,
      },
      {
        name: "Data Retention",
        description: "Historical data storage for conversations, reports, and analytics",
        standard: "90 days",
        pro: "180 days",
      },
    ],
  },

  // ============================================
  // CATEGORY 10: SUPPORT & CUSTOMER SUCCESS
  // ============================================
  {
    id: "support",
    category: "Support & Customer Success",
    icon: "🤝",
    categoryDescription: "World-class support to ensure your success with Pullse",
    features: [
      {
        name: "Email & Chat Support",
        description: "3-day response time, 7-day resolution time",
        standard: true,
        pro: true,
      },
      {
        name: "Priority Support",
        description: "24-hour response time, 3-day resolution time",
        standard: false,
        pro: true,
        proOnly: true,
      },
      {
        name: "Help Documentation",
        description: "Comprehensive docs, guides, and knowledge base",
        standard: true,
        pro: true,
      },
      {
        name: "Onboarding & Implementation",
        description: "Guided setup and implementation assistance for all customers",
        standard: true,
        pro: true,
      },
      {
        name: "Team Training Sessions",
        description: "Training sessions to get your team up to speed",
        standard: true,
        pro: true,
      },
      {
        name: "Digital Customer Success",
        description: "Scaled CS with resources, webinars, and community access",
        standard: "Under 10 agents",
        pro: "Under 10 agents",
      },
      {
        name: "Dedicated Customer Success Manager",
        description: "Dedicated CSM for teams with 10+ agents",
        standard: "10+ agents",
        pro: "10+ agents",
      },
      {
        name: "Business Reviews",
        description: "Regular account reviews and optimization sessions",
        standard: "Annual (10+ agents)",
        pro: "Quarterly (10+ agents)",
      },
    ],
  },
];

// ========================================
// COMPETITIVE PRICING DATA
// ========================================

export interface CompetitorPricingDetail {
  id: string;
  name: string;
  plan: string;
  baseCostPerSeat: number;
  perResolutionCost?: number; // For Intercom and Zendesk
  perSessionCost?: number; // For Freshdesk - applied to 60% of conversations
  minimumSeats?: number;
  addOns?: {
    name: string;
    costPerSeat: number;
  }[];
  aiAgentPerConversationCost?: number; // For Dixa - applied to 60% of conversations
  autoQAPerConversationCost?: number; // For Dixa - applied to 100% of conversations
  connectorTasksPerConversation?: number; // For Freshdesk - number of tasks per conversation
  connectorTaskCostPer5000?: number; // For Freshdesk - cost per 5,000 connector tasks
  costBreakdown: string;
  features: {
    aiAgent: boolean;
    aiCopilot: boolean;
    autoQA: boolean;
    helpCenter: boolean;
  };
  missingFeatures: string[];
}

export const competitorPricingDetails: CompetitorPricingDetail[] = [
  {
    id: 'zendesk',
    name: 'Zendesk',
    plan: 'Suite Professional + Advanced AI + QA',
    baseCostPerSeat: 190, // $115 base + $75 AI & QA
    perResolutionCost: 1.5,
    costBreakdown: '$115 base + $75 AI & QA + $1.50 per AI resolution',
    features: {
      aiAgent: true,
      aiCopilot: true,
      autoQA: true,
      helpCenter: true,
    },
    missingFeatures: [],
  },
  {
    id: 'intercom',
    name: 'Intercom',
    plan: 'Advanced + Copilot + Fin AI',
    baseCostPerSeat: 132,
    perResolutionCost: 0.99,
    costBreakdown: '$132/seat + $0.99 per AI resolution',
    features: {
      aiAgent: true,
      aiCopilot: true,
      autoQA: false,
      helpCenter: true,
    },
    missingFeatures: ['Auto QA'],
  },
  {
    id: 'freshdesk',
    name: 'Freshdesk',
    plan: 'Omni Enterprise + Freddy Copilot',
    baseCostPerSeat: 104,
    addOns: [
      { name: 'Freddy Copilot', costPerSeat: 29 },
    ],
    perSessionCost: 89, // per 1000 AI agent sessions (applied to 60% of conversations)
    connectorTasksPerConversation: 2,
    connectorTaskCostPer5000: 79,
    costBreakdown: '$104 base + $29 Copilot + $89 per 1,000 AI sessions + $79 per 5,000 connector tasks',
    features: {
      aiAgent: true,
      aiCopilot: true,
      autoQA: false,
      helpCenter: true,
    },
    missingFeatures: ['Auto QA'],
  },
  {
    id: 'dixa',
    name: 'Dixa',
    plan: 'Prime Plan',
    baseCostPerSeat: 179,
    minimumSeats: 7,
    addOns: [
      { name: 'AI Copilot', costPerSeat: 39 },
      { name: 'QA', costPerSeat: 29 },
      { name: 'Advanced Insights', costPerSeat: 29 },
    ],
    aiAgentPerConversationCost: 0.40,
    autoQAPerConversationCost: 0.05,
    costBreakdown: '$179 base + $97 add-ons/seat + $0.40 per AI conversation + $0.05 per conversation (Auto QA)',
    features: {
      aiAgent: true,
      aiCopilot: true,
      autoQA: true,
      helpCenter: false,
    },
    missingFeatures: ['Help Center'],
  },
];

// Pullse pricing for comparison
export const pullsePricingForComparison = {
  plan: 'Pro Plan',
  baseCostPerSeat: 79, // Annual pricing
  creditCost: 0.08, // Per credit
  actionsPerConversation: 1.4, // 80% tickets use 1 action, 20% use 3 actions = (0.8 × 1) + (0.2 × 3) = 1.4
  features: {
    aiAgent: true,
    aiCopilot: true,
    autoQA: true,
    helpCenter: true,
  },
};
