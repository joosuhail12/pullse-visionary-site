import { type LucideIcon, Shield, Lock, CheckCircle2, Clock, Headphones, Plug, Palette, Server } from 'lucide-react';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface PricingTier {
  id: 'standard' | 'pro';
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
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

// ============================================
// PRICING TIERS
// ============================================

export const pricingTiers: PricingTier[] = [
  {
    id: 'standard',
    name: 'Standard',
    tagline: 'The full help desk for growing teams.',
    monthlyPrice: 59,
    annualPrice: 49,
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
      actionsPerMonth: 10000,
      gracePeriod: '10% grace (to 11,000)',
      agentProfiles: 4,
      copilotProfiles: 4,
      helpCenters: 1,
    },
    includes: [
      '10,000 actions / org / month (throughput ceiling)',
      '4 AI Agent profiles + 4 Copilot profiles',
      '1 Appo Help Center (custom domain/theme)',
      '14-day trial with 1,000 credits included',
    ],
    footnote:
      'Actions are billed via credits. The 10,000/month ceiling is a throughput control, not free usage. All AI work bills at standard credit rates.',
    ctaText: 'Start 14-day trial',
    ctaLink: '/contact-sales',
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'Unlimited scale, multi-brand, and advanced QA.',
    monthlyPrice: 89,
    annualPrice: 79,
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
      creditsIncluded: 10000,
      commitAmount: 10000,
      rollover: '10% monthly rollover',
    },
    includes: [
      'Everything in Standard',
      'No action ceiling',
      '10,000 credits / month commit at $0.08/credit',
      'Unlimited profiles (Agents + Copilots)',
      'Unlimited help centers',
      'Full Auto-QA suite',
      '10% credit rollover month-to-month',
    ],
    footnote:
      'Pro includes a 10,000 credit/month minimum commit billed at $0.08/credit. Overage also bills at $0.08. 10% unused credits roll to next month.',
    ctaText: 'Start 14-day trial',
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
    '1 credit = 1 AI action. Every Copilot task, every AI Agent message turn, and each tool/API call bills exactly 1 credit. No size tiers. No bundling. No token talk.',
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

export const faqs: FAQ[] = [
  {
    question: 'Is there a free trial?',
    answer:
      'Yes—14 days with 1,000 credits included. No credit card required. You can explore all features and test AI capabilities with real conversations before committing.',
  },
  {
    question: 'Is there a free plan?',
    answer:
      "No. We price on value delivered, not shelfware. Every feature is available from day one—we'd rather you pay for software that actually helps your team than maintain a crippled free tier that creates bad experiences.",
  },
  {
    question: 'What happens when Standard hits 10,000 actions?',
    answer:
      'You get a 10% grace period (up to 11,000 actions). After that, new AI actions pause until the monthly reset or you upgrade to Pro. All actions are billed separately via credits—the 10,000 ceiling is a throughput control, not free usage.',
  },
  {
    question: 'Can Copilot execute actions like refunds or plan changes?',
    answer:
      'Yes. Copilot can run tools and actions on demand, with built-in approval workflows and full audit trails. Reps maintain control while AI handles the execution, making complex operations faster and error-free.',
  },
  {
    question: 'Do credits roll over?',
    answer:
      'Prepaid credit packs are valid for 12 months from purchase. Pro plan commits include 10% monthly rollover—unused credits carry to the next month (up to the rollover cap).',
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
  {
    question: 'How many profiles can we create?',
    answer:
      'Standard: 4 AI Agent profiles + 4 Copilot profiles. Pro: Unlimited on both. Profiles are separate AI personas with unique prompts, knowledge bases, and tool access—perfect for different teams, brands, or use cases.',
  },
  {
    question: 'Can we change plans anytime?',
    answer:
      'Yes. Upgrades prorate immediately. Downgrades take effect at the next billing cycle. Pro includes a 10,000 credit/month commit—upgrading adds the commit, downgrading removes it at cycle end.',
  },
];

// ============================================
// POLICY FOOTNOTES
// ============================================

export const policyFootnotes: PolicyFootnote[] = [
  {
    text: 'Action ceilings are throughput controls, not free usage. All AI actions bill via credits at standard rates.',
  },
  {
    text: 'Prepaid credits are consumed before any monthly commit or pay-as-you-go charges.',
  },
  {
    text: "Pro's 10,000-credit monthly commit bills whether used or not. 10% of unused credits roll over to the following month.",
  },
  {
    text: 'No per-resolution caps or conversation limits. Longer conversations consume more actions and bill accordingly.',
  },
  {
    text: 'Taxes, regulatory fees, and currency conversion charges may apply based on your location.',
  },
];

// ============================================
// STARTUP PROGRAM
// ============================================

export const startupProgram: StartupProgram = {
  headline: 'Startup plan — 70% off seats for 12 months',
  subhead: "If you're building, we'll meet you where you are.",
  discount: '70% off',
  duration: '12 months',
  benefits: [
    '70% off Standard or Pro seat price for the first 12 months',
    'Keep all plan entitlements (no feature reductions)',
    'Credits billed at standard rates (never below $0.08)',
    'Optional 35% discount for months 13-24, then standard pricing',
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
      detail: 'Up to 20 seats under discount',
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
    'After 12 months: Optionally step down to 35% off seats for months 13-24, then standard pricing. We want you to succeed, not trap you in discounts.',
  ctaText: 'Apply for startup program',
  ctaLink: '/contact-sales?program=startup',
};

// ============================================
// TRIAL BENEFITS
// ============================================

export const trialBenefits: string[] = [
  '14-day trial',
  'No credit card required',
  'Cancel anytime',
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
    icon: Lock,
    title: "SOC 2 Type II & GDPR",
    description: "Bank-level security with full compliance certifications",
  },
  {
    icon: CheckCircle2,
    title: "No Cancellation Fees",
    description: "Cancel anytime, no questions asked. Keep your data for 90 days",
  },
  {
    icon: Clock,
    title: "Setup in 5 Minutes",
    description: "Connect your email, import help docs, and go live—no IT team needed",
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
