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
  bio: string;
  image?: string;
  linkedin?: string;
  twitter?: string;
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
    icon: Layers,
    title: "First Principles Thinking",
    description:
      "We don't accept 'how things are done.' We question fundamental assumptions, understand core principles (like AI + aggregation), and build from the ground up. That's how we saw the future others missed.",
  },
  {
    icon: Users,
    title: "Customer First",
    description:
      "Even before our first customer, every decision starts with one question: Will this genuinely help teams succeed? We build for real people solving real problems.",
  },
  {
    icon: Eye,
    title: "Build in Public",
    description:
      "Transparent about our journey, our pricing, and our roadmap. No hidden costs, no surprise fees, no marketing fluff. What you see is what you get.",
  },
  {
    icon: Lightbulb,
    title: "AI-Native Philosophy",
    description:
      "Not AI bolted onto legacy software - every solution built for AI from day one. We design for aggregation, not fragmentation, because that's how AI gets smarter.",
  },
  {
    icon: Heart,
    title: "Keep It Simple",
    description:
      "One platform per function. Transparent pricing. No expensive add-ons. Complexity is the enemy of usability, and we're ruthlessly committed to simplicity.",
  },
  {
    icon: TrendingUp,
    title: "Move Fast",
    description:
      "Ship quickly, learn from feedback, iterate constantly. The faster we ship, the faster we learn what actually helps teams succeed.",
  },
  {
    icon: Shield,
    title: "Honest & Transparent",
    description:
      "Real pricing comparisons. Acknowledging competitor strengths. Clear about what we're building and where we're headed. Trust through transparency.",
  },
];

export const team: TeamMember[] = [
  {
    name: "Your Name",
    role: "Co-founder & CEO",
    bio: "Previously led customer support operations at [Company]. After years of struggling with complex, expensive platforms, decided to build the tool teams actually want to use. Joined Antler in October 2024 to make it happen.",
    image: "/team/founder-1.jpg", // Placeholder
    linkedin: "https://linkedin.com/in/yourprofile",
  },
  // Add more team members as needed
  // {
  //   name: "Co-founder Name",
  //   role: "Co-founder & CTO",
  //   bio: "Engineering leader with experience building scalable AI systems. Passionate about making powerful technology accessible.",
  //   image: "/team/founder-2.jpg",
  //   linkedin: "https://linkedin.com/in/cofounder",
  // },
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
  headline: "The Future: Unified AI Business Operations",
  description:
    "Customer support is just the beginning. We're building toward a future where every business function has its own specialized, end-to-end AI-native solution - all connected by a central company brain.",
  functions: [
    {
      name: "Customer Support",
      status: "building",
      description: "End-to-end AI-native support platform (launching Q4 2025)",
      icon: Users,
    },
    {
      name: "Sales & CRM",
      status: "future",
      description: "AI-powered sales automation and relationship management",
      icon: TrendingUp,
    },
    {
      name: "Marketing",
      status: "future",
      description: "Autonomous campaign management and content creation",
      icon: Sparkles,
    },
    {
      name: "Operations",
      status: "future",
      description: "Workflow automation and process optimization",
      icon: Workflow,
    },
  ],
  companyBrain: {
    title: "The Company Brain",
    description:
      "All functions connected by a central AI that understands your entire business - your customers, your team, your goals. The more functions you use, the smarter the whole system becomes.",
  },
};
