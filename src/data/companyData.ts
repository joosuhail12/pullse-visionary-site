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
      "After years managing support teams, I watched talented people burn out—not from helping customers, but from fighting their tools.",
      "Every question meant switching between 10 systems. Zendesk for tickets. Slack for team chat. Intercom for live chat. Jira for bugs. The knowledge base. The CRM. The analytics dashboard. Each tool worked fine alone, but together? Chaos.",
      "The breaking point came when I calculated we were spending $100,000 per year on tools that made our team less effective, not more. Our best agents spent more time context-switching than actually helping customers.",
      "That's when I knew: the problem wasn't the tools. It was the approach."
    ]
  },
  insight: {
    title: "The Realization",
    paragraphs: [
      "Then it hit me: AI doesn't work like humans. We need specialized tools because we can't hold everything in our heads at once. But AI? AI aggregates. The more data it sees, the smarter it gets.",
      "Imagine if your AI could see everything—every customer conversation, every support ticket, every product update, every team discussion. Each new interaction makes it smarter. That's the power of aggregation.",
      "One intelligent brain that understands your entire business beats 100 specialized tools that don't talk to each other. That's not just theory—that's how AI actually works."
    ]
  },
  solution: {
    title: "Building the Future",
    paragraphs: [
      "We're building AI-native platforms that solve entire business functions end-to-end. Not tools with AI features. Platforms designed from scratch around AI aggregation.",
      "Starting with customer support—where the problem is most painful. One unified system replacing your entire support stack. No integrations needed. No data silos. Just intelligent software that actually understands your business.",
      "This is what business software should have been all along. We just needed AI to make it possible."
    ]
  },
};

export const mission =
  "Build AI-native software that solves entire business functions—replacing 10+ disconnected tools with one intelligent platform.";

export const vision =
  "We're starting with customer support, but the vision is bigger: AI-native solutions for every business function—sales, marketing, operations, finance—all connected through one unified platform. The more functions you use, the smarter your entire system becomes. One company brain that understands everything, eliminates data silos, and makes every team dramatically more effective.";

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

export const values: Value[] = [
  {
    icon: Brain,
    title: "AI-Native by Design",
    description:
      "We don't bolt AI features onto legacy software. We architect from scratch for AI aggregation—where every data point makes the whole system smarter. That's why Pullse can replace your entire support stack with one platform.",
  },
  {
    icon: Eye,
    title: "Radically Transparent",
    description:
      "Every feature we build, every decision we make, every dollar we charge—it's all transparent. No hidden fees, no pricing tiers that gatekeep basic features, no locked data. We earn trust by being radically open.",
  },
  {
    icon: Heart,
    title: "End User Obsessed",
    description:
      "We optimize for the people doing the work, not the people buying the software. That means genuinely simple interfaces, no mandatory \"success manager\" upsells, and powerful features available to teams of any size.",
  },
  {
    icon: Zap,
    title: "Speed & Conviction",
    description:
      "We ship fast, learn faster. No 18-month roadmaps or bureaucratic processes. The world needs better business software now—so we build, test, and iterate in public. Speed is a feature.",
  },
];

// Unified "Our Approach" section combining mission, principles, and vision
export const ourApproach = {
  title: "How We're Building the Future",
  subtitle: "Our mission, principles, and commitments",
  mission: mission,
  principles: values,
  vision: vision,
};

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
