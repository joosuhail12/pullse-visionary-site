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
    "After years of using customer support platforms, we experienced the same frustrations repeatedly: weeks-long implementations, expensive add-ons for basic AI features, complex pricing that spiraled with usage, and tools built for enterprises that small teams couldn't afford or didn't need.",
  why: "We knew there had to be a better way. Customer support shouldn't require a PhD to configure or a CFO to budget for. AI should make support simpler, not add another expensive tier to your subscription.",
  solution:
    "So we're building Pullse: an AI-first platform with transparent pricing, 2-5 day setup, and all features included. No hidden costs. No complex configurations. Just powerful, accessible customer support for teams of all sizes.",
};

export const mission =
  "To make AI-powered customer support accessible to every business, regardless of size or budget.";

export const vision =
  "A world where every team can deliver instant, personalized support without the complexity and cost of traditional platforms.";

export const timeline: Milestone[] = [
  {
    date: "October 2024",
    title: "Joined Antler",
    description:
      "Selected for Antler's accelerator program to build the future of customer support",
    icon: Rocket,
  },
  {
    date: "November 2024",
    title: "Pullse Incorporated",
    description:
      "Officially founded Pullse with a mission to simplify AI-powered support",
    icon: Building,
  },
  {
    date: "Q4 2024",
    title: "Building Core Platform",
    description:
      "Developed autonomous AI agent, AI copilot, and Auto-QA features from the ground up",
    icon: Code,
  },
  {
    date: "Q1 2025",
    title: "Platform Development",
    description:
      "Built unified omnichannel inbox, visual workflow automation, and advanced analytics",
    icon: Zap,
  },
  {
    date: "Q2-Q3 2025",
    title: "Refinement & Testing",
    description:
      "Extensive internal testing, UI/UX refinement, and platform optimization",
    icon: Target,
  },
  {
    date: "Q4 2025",
    title: "Launching Soon",
    description:
      "Preparing for public launch and early access program. Be among the first to experience Pullse.",
    icon: Sparkles,
    highlight: true,
  },
];

export const values: Value[] = [
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
    title: "AI-Native",
    description:
      "Not AI bolted onto a legacy platform - built for AI from day one. Every feature designed to leverage modern AI capabilities to their fullest potential.",
  },
  {
    icon: Heart,
    title: "Keep It Simple",
    description:
      "One platform. One pricing tier. No expensive add-ons. Complexity is the enemy of usability, and we're ruthlessly committed to simplicity.",
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
    "We're preparing to launch and looking for early partners to help shape the future of Pullse. Join our waitlist to get exclusive early access.",
  primaryCTA: {
    text: "Request Early Access",
    link: "/contact-sales", // Or dedicated early access form
  },
  secondaryCTA: {
    text: "Follow Our Journey",
    link: "https://twitter.com/pullse", // Or newsletter signup
  },
};
