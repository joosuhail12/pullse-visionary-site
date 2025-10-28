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
  image?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
}

export const story = {
  problem:
    "Your support team switches between Zendesk, Slack, Intercom, Jira, your knowledge base, and 6 other tools—just to answer one customer question. They lose hours to context switching. Critical customer data sits trapped in silos. You're paying $2,000/month per team member just to stitch together basic workflows. This isn't productivity. It's chaos.",
  insight:
    "Then we had a realization: imagine if your AI could see everything—every customer interaction, every support ticket, every product update, every team conversation. Each new data point makes it smarter. That's how AI actually works: through aggregation, not specialization. One brain that knows your entire business beats 100 specialized tools that don't talk to each other.",
  solution:
    "We're building AI-native platforms that solve entire business functions end-to-end. Starting with customer support—where one unified system replaces your entire support stack. No more tool chaos. No more data silos. Just intelligent, connected software that actually understands your business.",
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
