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
    "Companies are drowning in 100+ disconnected tools. Sales uses Salesforce, support uses Zendesk, marketing uses HubSpot—each team has 10+ specialized apps that don't talk to each other. Data silos everywhere. Endless context switching. Fragmentation costing millions.",
  insight:
    "Then we realized: AI works through aggregation, not specialization. The more context AI has across your business, the smarter it becomes. This changes everything about how business software should work.",
  solution:
    "The future isn't more specialized tools—it's AI-native platforms that solve entire business functions end-to-end. We're starting with customer support. Eventually, every business function, unified by one intelligent core.",
};

export const mission =
  "To build AI-native solutions that solve entire business functions end-to-end, starting with customer support. Making powerful AI accessible to teams of all sizes, with transparent pricing and genuine simplicity.";

export const vision =
  "A future where every business function - from customer support to sales to operations - is powered by specialized AI agents, all unified by a central company brain that understands your entire organization. No more fragmentation, no more data silos, just intelligent, connected business operations.";

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
      "We build from scratch for AI aggregation—not bolting AI onto legacy software. We question assumptions and build the future others don't see yet.",
  },
  {
    icon: Eye,
    title: "Radically Transparent",
    description:
      "Our pricing, roadmap, and journey are completely open. No hidden costs, no surprise fees, no fluff. Trust through transparency.",
  },
  {
    icon: Heart,
    title: "Customer Obsessed",
    description:
      "Every decision starts with: Will this genuinely help teams succeed? We're committed to simplicity—no expensive add-ons, no complexity.",
  },
  {
    icon: Zap,
    title: "Speed & Conviction",
    description:
      "Ship quickly. Learn fast. Iterate constantly. The world needs better business software now, not years from now.",
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
    bio: "Building Pullse to solve the AI-native business software problem from first principles. After years in customer support operations, I saw firsthand how 100+ disconnected tools fragment teams and cost companies millions.",
    background: undefined,
    whyThis: undefined,
    image: undefined, // Will use initials fallback
    linkedin: "https://linkedin.com/in/yourprofile",
  },
  {
    name: "Manminder Tomar",
    role: "Co-founder",
    title: "Co-founder & CTO",
    bio: "Leading Pullse's technical vision and AI-native architecture. Engineering leader with deep experience in scalable systems and AI infrastructure, passionate about creating powerful yet accessible technology.",
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
  headline: "Help Us Build the Future",
  description:
    "We're launching Q4 2025 and looking for early partners to shape the first truly AI-native business platform. Join us.",
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

// Simplified platform vision - single paragraph
export const platformVision =
  "We're starting with customer support, but our vision is bigger: AI-native solutions for every business function—sales, marketing, operations—all unified by one intelligent core. The more functions you use, the smarter the entire system becomes.";
