import {
  Rocket,
  Building,
  Code,
  Zap,
  Target,
  Sparkles,
  Users,
  Eye,
  Lightbulb,
  Heart,
  TrendingUp,
  Shield,
  Brain,
  Network,
  Layers,
  Workflow,
  Search,
  Telescope,
  type LucideIcon,
} from 'lucide-react';

export interface Milestone {
  date: string;
  title: string;
  description: string;
  icon: LucideIcon;
  highlight?: boolean;
}

export interface Value {
  icon: LucideIcon;
  title: string;
  description: string;
  inPractice: string; // Concrete example of principle in action
  size?: 'small' | 'large'; // For asymmetric grid layouts (deprecated, keeping for backwards compatibility)
}

export interface TeamMember {
  name: string;
  role: string;
  title: string; // e.g., "Co-founder & CEO"
  bio: string; // Extended bio
  background?: string; // Previous experience highlight
  whyThis?: string; // Why this mission matters
  credentials?: string[]; // Specific achievements/metrics
  personalWhy?: string; // Personal motivation story
  companies?: string; // Previous companies (optional)
  metrics?: string; // Specific achievements
  image?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
}

export const story = {
  problem: {
    title: "The Breaking Point",
    paragraphs: [
      "After years managing support teams, I watched talented people burn out—not from helping customers, but from fighting their tools. Every question meant switching between 10 systems: Zendesk, Slack, Intercom, Jira, knowledge base, CRM, analytics. Each tool worked alone, but together? Pure chaos.",
      "The breaking point: we were spending $100,000 per year on tools that made our team less effective, not more. Our best agents spent more time context-switching than actually helping customers. That's when I knew—the problem wasn't the tools. It was the approach."
    ]
  },
  insight: {
    title: "The Realization",
    paragraphs: [
      "Then it hit me: AI doesn't work like humans. We need specialized tools because we can't hold everything in our heads at once. But AI aggregates—the more data it sees, the smarter it gets. What if your AI could see everything: every conversation, ticket, product update, team discussion? Each interaction makes it smarter.",
      "One intelligent brain that understands your entire business beats 100 specialized tools that don't talk to each other. That's not just theory—that's how AI actually works."
    ]
  },
  solution: {
    title: "Building the Future",
    paragraphs: [
      "We're building AI-native platforms that solve entire business functions end-to-end. Not tools with AI features—platforms designed from scratch around AI aggregation. Starting with customer support, where the problem is most painful.",
      "One unified system replacing your entire support stack. No integrations needed. No data silos. Just intelligent software that actually understands your business. This is what business software should have been all along. We just needed AI to make it possible."
    ]
  },
};

export const mission =
  "Build AI-native software that solves entire business functions—replacing 10+ disconnected tools with one intelligent platform.";

export const vision =
  "We're starting with customer support, but the vision is bigger: AI-native solutions for every business function—sales, marketing, operations, finance—all connected through one unified platform. The more functions you use, the smarter your entire system becomes. One company brain that understands everything, eliminates data silos, and makes every team dramatically more effective.";

export const visionManifesto = {
  vision: {
    headline: "The Future of Business Software",
    statement: "Software that thinks, learns, and grows with your business. Where data flows freely across every function, insights emerge automatically, and each new capability makes your entire system smarter. This is the future we're building—one where AI doesn't just assist, it amplifies everything your team does.",
    icon: Telescope,
  },
  beliefs: [
    {
      title: "Intelligence Through Aggregation",
      description: "AI gets smarter when it sees everything. Fragmented tools create fragmented intelligence. One unified platform creates exponential learning—where every interaction across every function makes your entire system more intelligent.",
      icon: Brain,
      color: "purple" as const,
    },
    {
      title: "Connected, Not Siloed",
      description: "Every business function should inform every other. Sales learns from support. Marketing learns from operations. True intelligence requires connection. We're building platforms where knowledge flows freely, not gets trapped in isolated tools.",
      icon: Network,
      color: "blue" as const,
    },
    {
      title: "Built for Users, Not Buyers",
      description: "The best software optimizes for the people doing the work, not the people signing contracts. That means genuinely simple interfaces, no mandatory upsells, and powerful features available to teams of any size. Users first, always.",
      icon: Heart,
      color: "pink" as const,
    },
    {
      title: "Radically Transparent",
      description: "No hidden fees. No data lock-in. No gatekeeping features behind enterprise tiers. We earn trust through openness, not contracts. Every decision we make, every dollar we charge—it's transparent. That's how software should be.",
      icon: Eye,
      color: "orange" as const,
    },
    {
      title: "Speed Over Perfection",
      description: "The world needs better software now, not in 18 months. We ship fast, learn faster, and iterate in public. Speed isn't reckless—it's respectful of the teams suffering with broken tools today. Action over endless planning.",
      icon: Zap,
      color: "red" as const,
    },
    {
      title: "AI-Native From Day One",
      description: "We don't bolt AI features onto legacy architecture. We design from scratch for AI aggregation—where every data point strengthens the whole system. That's the difference between AI features and AI-native platforms.",
      icon: Sparkles,
      color: "green" as const,
    },
  ],
  rally: {
    headline: "Build the Future With Us",
    message: "We're just getting started. Join us as an early partner and help shape the future of AI-native business software. Be part of the movement to replace fragmented tools with intelligent, unified platforms.",
    cta: {
      text: "Join Early Access",
      link: "/contact-sales",
    },
  },
};

export const founderManifesto = {
  paragraphs: [
    "For a decade, we glorified \"there's an app for that\"—and got exactly what we asked for: fragmentation. Today's enterprises manage an average of 275 SaaS applications, burning nearly 9% of every employee's week just switching between tools. Employees toggle between apps ~1,200 times per day. The financial waste runs into millions annually in unused licenses alone.",
    "AI changes the calculus, but only if we change the architecture. Models thrive on aggregation and continuity; they fail when context is shattered across dozens of disconnected tools. While 71% of companies now use generative AI, most implementations stall inside fragmented stacks that starve models of the complete picture.",
    "We believe the future belongs to specialized agentic AI—purpose-built agents that run entire business functions end-to-end, coordinated by a central brain that shares context and enables seamless handoffs. Not bolt-on bots. Not more point solutions. Intelligent systems that read, decide, and act safely under guardrails—then involve humans when judgment is truly required. Crucially, humans always retain parallel control: every action AI can take, humans can take manually. No forced automation. No all-or-nothing adoption.",
    "That's Pullse: we're building enterprise-grade AI for SMBs and mid-market companies with interfaces that stay simple as capabilities scale. Why? Because a 50-person company improving support efficiency by 40% transforms their entire operation—the percentage value unlocked in growing businesses dwarfs what's available in mature enterprises. Starting with customer support, we're making AI-native enterprise capabilities accessible to companies who've been priced out or overwhelmed by traditional solutions.",
    "Fewer systems. More outcomes. Software that finally gets out of your way.",
  ],
  cta: {
    text: "Read the Complete Manifesto",
    link: "/blog/the-era-of-tool-sprawl-is-ending-here-s-what-comes-next",
  },
};

export const timeline: Milestone[] = [
  {
    date: "October 2024",
    title: "Joined Antler",
    description:
      "Selected for Antler's accelerator program to build the future of AI-native business software",
    icon: Rocket,
  },
  {
    date: "November 2024",
    title: "Pullse Incorporated",
    description:
      "Officially founded with a vision: unified AI-native solutions for every business function",
    icon: Building,
  },
  {
    date: "Q4 2024",
    title: "Platform Architecture",
    description:
      "Researched AI aggregation principles and designed modular architecture for our first function: customer support",
    icon: Search,
  },
  {
    date: "Q1 2025",
    title: "Building Customer Support",
    description:
      "Developed autonomous AI agent, copilot, Auto-QA, unified inbox, and workflow automation from the ground up",
    icon: Code,
  },
  {
    date: "Q2-Q3 2025",
    title: "Refinement & Testing",
    description:
      "Extensive internal testing, UI/UX polish, and platform optimization for our first end-to-end solution",
    icon: Target,
  },
  {
    date: "Q4 2025",
    title: "Launching Soon",
    description:
      "Preparing for public launch of Pullse Customer Support. Be among the first to experience truly AI-native business software.",
    icon: Sparkles,
    highlight: true,
  },
];

// Merged approach: combining values + why support first into unified principles
// Story structure: Foundation (Row 1) → Execution (Row 2)
export const ourApproach = {
  title: "How We Build Different",
  subtitle: "The foundation and execution that drives everything we do",
  principles: [
    // ============ FOUNDATION ROW ============
    {
      icon: Brain,
      title: "AI-Native by Design",
      description:
        "Legacy tools add AI features. We designed from scratch so AI understands your entire business—every conversation, ticket, and customer interaction feeds one intelligent brain that gets smarter with each data point.",
      inPractice: "Your support AI learns from sales conversations, product updates, and team discussions. When a customer asks about a feature, the AI already knows what sales promised and what product shipped. Context never gets lost.",
      size: "large" as const, // Deprecated but kept for backwards compatibility
    },
    {
      icon: Eye,
      title: "Radically Transparent",
      description:
        "We publish our pricing, roadmap, and decision-making in the open. No hidden fees, no enterprise-only features that should be standard, no data lock-in. You own your data, you see our plans, you know exactly what you're paying for.",
      inPractice: "Our pricing page shows every feature at every tier. Our public roadmap shows what we're building next. Export your data anytime with one click—no hoops, no retention policies, no questions asked.",
      size: "large" as const,
    },
    {
      icon: Heart,
      title: "End User Obsessed",
      description:
        "Support agents don't have time for complicated interfaces or mandatory training sessions. We design for the person answering tickets at 11pm, not the executive signing the contract. If it's not genuinely simple, we don't ship it.",
      inPractice: "New agents go live in under 10 minutes. No week-long onboarding, no certification courses, no admin setup maze. The AI guides them through their first tickets, and advanced features appear only when they're ready.",
      size: "small" as const,
    },
    // ============ EXECUTION ROW ============
    {
      icon: Zap,
      title: "Ship Fast, Learn Faster",
      description:
        "We built our first working prototype in 3 months. We launch features weekly, not quarterly. Every Friday, something new ships. The teams using broken tools today can't wait 18 months for our perfect vision—they need better software now.",
      inPractice: "Weekly releases every Friday at 2pm PST. Public changelog shows exactly what shipped. Beta features available immediately for teams who want to test early. If something breaks, we fix it that day, not next sprint.",
      size: "small" as const,
    },
    {
      icon: Target,
      title: "Start Where AI Delivers Most",
      description:
        "Support has clear inputs (customer questions), measurable outputs (resolution time, CSAT), and structured workflows. This makes it perfect for AI to deliver immediate, quantifiable value. We prove the platform here, then expand to other functions.",
      inPractice: "Day one: Your AI handles password resets, shipping questions, basic troubleshooting—the repetitive 40% of tickets. Week two: It's learning your product specifics. Month one: It's resolving 60% of tickets autonomously while your team focuses on complex cases.",
      size: "small" as const,
    },
    {
      icon: Users,
      title: "Built for Growing Teams",
      description:
        "A 5-person startup and a 500-person company both need great support, but they can't both afford enterprise software. We price for small teams and scale without forcing upgrades. The same powerful features, the same intelligent platform, regardless of size.",
      inPractice: "Start at $29/agent/month with full AI capabilities—not a limited 'starter' version. Add agents anytime without contracts or tier changes. Scale from 3 agents to 30 without losing features or migrating plans. Pay for what you use, nothing more.",
      size: "small" as const,
    },
  ],
};

// Legacy export for backwards compatibility (if needed elsewhere)
export const values: Value[] = [
  {
    icon: Brain,
    title: "AI-Native by Design",
    description:
      "We don't bolt AI features onto legacy software. We architect from scratch for AI aggregation—where every data point makes the whole system smarter.",
    inPractice: "Context flows across all systems automatically.",
  },
  {
    icon: Eye,
    title: "Radically Transparent",
    description:
      "Every feature we build, every decision we make, every dollar we charge—it's all transparent. No hidden fees, no gatekeep features, no locked data.",
    inPractice: "Public pricing, roadmap, and data export anytime.",
  },
  {
    icon: Heart,
    title: "End User Obsessed",
    description:
      "We optimize for the people doing the work, not the people buying the software. That means genuinely simple interfaces and powerful features for all.",
    inPractice: "Simple by default, powerful when needed.",
  },
  {
    icon: Zap,
    title: "Speed & Conviction",
    description:
      "We ship fast, learn faster. No 18-month roadmaps. The world needs better business software now—so we build, test, and iterate in public.",
    inPractice: "Weekly releases every Friday.",
  },
];

export const team: TeamMember[] = [
  {
    name: "Suhail Joo",
    role: "Founder",
    title: "Founder & CEO",
    bio: "Previously built and scaled customer support operations for high-growth startups, managing teams serving millions of users. Spent 5+ years inside the broken world of support tools—watching teams juggle 10+ disconnected systems, lose critical context, and burn out from tool chaos. Started Pullse to build the AI-native support platform he wished existed: one intelligent system that actually understands your business and replaces your entire support stack.",
    credentials: [
      "5+ years in customer support operations",
      "Managed teams serving 5M+ users",
      "Built support from 0 to scale"
    ],
    personalWhy: "I've lived the pain. After years of managing support teams, I watched talented people burn out—not from helping customers, but from fighting their tools. Switching between 10 systems to answer one question. Losing critical context because data lived in silos. Spending hours on manual workflows instead of solving real problems. The breaking point came when I realized we were spending $100k/year on tools that made our team less effective, not more. That's when I knew: the solution isn't better integrations or another point solution. It's AI-native software built from the ground up to understand your entire business, not just one workflow. That's why I started Pullse.",
    background: undefined,
    whyThis: undefined,
    image: undefined, // Will use initials fallback
    linkedin: "https://linkedin.com/in/yourprofile",
  },
  {
    name: "Manminder Tomar",
    role: "Co-founder",
    title: "Co-founder & CTO",
    bio: "Engineering leader with 8+ years building scalable systems and AI infrastructure. Previously architected distributed systems serving millions of requests per day. Deep expertise in LLMs, vector databases, and real-time data pipelines. At Pullse, architecting the AI aggregation engine that makes every data point strengthen the entire platform—the technical foundation that lets one system replace 10+ specialized tools.",
    credentials: [
      "8+ years building distributed systems",
      "Architected systems serving 100M+ requests/day",
      "Deep expertise in LLMs & vector databases"
    ],
    personalWhy: "As an engineer, I've always been frustrated by fragmented software architecture. Why do businesses need 10 different tools for one function? The answer isn't technical—it's historical. Legacy software wasn't designed for AI. But here's what excites me: AI fundamentally changes the equation. When your system can understand natural language, learn from every interaction, and connect data across contexts, you don't need specialized tools anymore. You need one intelligent platform that gets smarter with every data point. That's the technical challenge that drives me—building the AI aggregation architecture that makes this possible. Not bolting AI features onto legacy tools, but reimagining business software from first principles.",
    background: undefined,
    whyThis: undefined,
    image: undefined, // Will use initials fallback
    linkedin: "https://linkedin.com/in/manminder-tomar",
  },
];

export const antler = {
  logo: "/antler-logo.svg", // You'll need to add Antler's logo
  description:
    "Proud to be part of Antler's global ecosystem of founders building category-defining companies.",
  website: "https://www.antler.co",
};

export const cta = {
  headline: "Replace Your Support Stack with One Intelligent Platform",
  description:
    "Launching Q4 2025. We're accepting a limited number of early access partners who want to be first to experience truly AI-native support software. No more tool chaos. No more data silos. Just intelligent, connected support that actually understands your business.",
  primaryCTA: {
    text: "Request Early Access",
    link: "/contact-sales",
  },
  secondaryCTA: {
    text: "Follow Our Journey",
    link: "https://twitter.com/pullse",
  },
};

export const whySupportFirst = {
  headline: "Why Start with Customer Support?",
  reasons: [
    {
      title: "Highest Impact",
      description:
        "Customer support is the front line of your business. Every conversation is an opportunity to delight customers, gather feedback, and build loyalty. Getting this right compounds across your entire company.",
      icon: Target,
    },
    {
      title: "Most Fragmented",
      description:
        "Support teams juggle 10+ tools: ticketing, live chat, email, phone, knowledge base, analytics, QA, and more. It's the perfect example of the fragmentation problem we're solving.",
      icon: Network,
    },
    {
      title: "AI-Ready Function",
      description:
        "Support has clear inputs (customer questions), outputs (resolutions), and success metrics (CSAT, response time). This makes it ideal for autonomous AI agents to deliver immediate, measurable value.",
      icon: Brain,
    },
    {
      title: "Universal Need",
      description:
        "Every business needs customer support, from startups to enterprises. By starting here, we can help the most companies while learning what works for our unified platform architecture.",
      icon: Users,
    },
  ],
};

// Platform vision is now integrated into the main vision statement above
