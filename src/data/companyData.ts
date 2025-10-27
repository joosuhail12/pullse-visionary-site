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
    "After years of working with business software, we kept seeing the same pattern everywhere: companies drowning in 100+ disconnected SaaS tools. Sales uses Salesforce, support uses Zendesk, marketing uses HubSpot - each team has 10+ specialized tools that don't talk to each other. Data silos everywhere. Endless context switching. Fragmentation that costs companies millions in inefficiency.",
  insight:
    "Then we realized something fundamental: AI works on the principle of aggregation. Unlike traditional software that benefits from specialization, AI gets smarter by connecting disparate data. The more context AI has across your entire business, the more intelligent and autonomous it becomes. This meant the future of business software had to be completely different.",
  solution:
    "The future isn't more specialized point solutions - it's AI-native platforms that solve entire business functions end-to-end, unified by a central AI brain that understands your whole company. We're starting with customer support, building the first truly end-to-end AI-native solution. Eventually, we'll build specialized solutions for every business function, all connected by one intelligent core.",
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
      "We don't bolt AI onto legacy software. Every solution is built from the ground up for AI aggregation—because AI gets smarter by connecting data, not fragmenting it. We question assumptions, understand first principles, and build the future others don't see yet.",
  },
  {
    icon: Eye,
    title: "Radically Transparent",
    description:
      "We build in public. Our pricing, roadmap, and journey are completely open. No hidden costs, no surprise fees, no marketing fluff. Real pricing comparisons. Honest about what we're building and where we're headed. Trust through transparency.",
  },
  {
    icon: Heart,
    title: "Customer Obsessed",
    description:
      "Even before our first customer, every decision starts with one question: Will this genuinely help teams succeed? We're ruthlessly committed to simplicity—one platform per function, no expensive add-ons, no complexity. Real people. Real problems. Real solutions.",
  },
  {
    icon: Zap,
    title: "Speed & Conviction",
    description:
      "Ship quickly. Learn from feedback. Iterate constantly. The faster we ship, the faster we learn what actually helps teams succeed. We move with conviction because the world needs better business software now, not years from now.",
  },
];

export const team: TeamMember[] = [
  {
    name: "Suhail Joo",
    role: "Founder",
    title: "Founder & CEO",
    bio: "Building Pullse to solve the AI-native business software problem from first principles.",
    background: "Previously worked in customer support operations, experiencing firsthand the pain of fragmented tools and disconnected systems. Saw the opportunity to rebuild business software for the AI era.",
    whyThis: "After years of watching teams struggle with 100+ disconnected tools, I realized AI changes everything. The future isn't more specialized point solutions—it's unified platforms where AI gets smarter through aggregation, not fragmentation.",
    image: undefined, // Will use initials fallback
    linkedin: "https://linkedin.com/in/yourprofile",
  },
  {
    name: "Manminder Tomar",
    role: "Co-founder",
    title: "Co-founder & CTO",
    bio: "Leading the technical vision and architecture for Pullse's AI-native platform.",
    background: "Engineering leader with deep experience in building scalable systems and AI infrastructure. Passionate about creating technology that's both powerful and accessible.",
    whyThis: "The best products come from understanding both the problem deeply and the technology intimately. AI-native platforms require rethinking architecture from the ground up—that's the challenge that excites me.",
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
  headline: "Be Among the First",
  description:
    "We're preparing to launch our first AI-native solution and looking for early partners to help shape the future of business software. Join our waitlist to get exclusive early access.",
  primaryCTA: {
    text: "Request Early Access",
    link: "/contact-sales", // Or dedicated early access form
  },
  secondaryCTA: {
    text: "Follow Our Journey",
    link: "https://twitter.com/pullse", // Or newsletter signup
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

export const platformVision = {
  headline: "Beyond Customer Support",
  description:
    "We're starting with customer support, but the vision is bigger: AI-native solutions for every business function, all unified by a central intelligence that understands your entire company.",
  currentFocus: {
    name: "Customer Support",
    status: "Building Now",
    tagline: "Launching Q4 2025",
    icon: Users,
  },
  futureVision: {
    title: "The Unified Future",
    description:
      "Imagine AI-native solutions for sales, marketing, operations—all connected. The more functions you use, the smarter the entire system becomes. One company brain, infinite possibilities.",
    examples: ["Sales & CRM", "Marketing", "Operations"],
  },
};
