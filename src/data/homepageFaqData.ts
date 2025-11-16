/**
 * Homepage FAQ Data
 *
 * Foundational FAQs targeting discovery queries for Answer Engine Optimization (AEO).
 * These questions are designed to appear in AI search results and answer common
 * "What is Pullse?" queries.
 */

export interface FAQ {
  question: string;
  answer: string;
}

export const homepageFaqs: FAQ[] = [
  {
    question: "What is Pullse?",
    answer:
      "Pullse is an AI-powered customer support platform that unifies all customer conversations across email, chat, voice, SMS, and API events into a single intelligent inbox. It combines human agents with AI automation to deliver exceptional support experiences at scale.",
  },
  {
    question: "What does Pullse do?",
    answer:
      "Pullse automates customer support through AI chatbots, copilots, and autonomous agents while providing a unified inbox for human agents. It handles repetitive tasks, routes conversations intelligently, provides real-time quality assurance, and delivers actionable analytics to improve your support operations.",
  },
  {
    question: "How does Pullse work?",
    answer:
      "Pullse connects to all your communication channels and creates a unified view of every customer conversation. Its AI engine analyzes incoming requests, suggests or provides automated responses, routes conversations to the right team members, and continuously learns from your support patterns to improve over time.",
  },
  {
    question: "Who is Pullse for?",
    answer:
      "Pullse is designed for B2B SaaS companies, ecommerce businesses, and fintech startups that want to scale their customer support without proportionally growing their team. It's ideal for companies handling high ticket volumes who need to balance automation with human touch.",
  },
  {
    question: "What makes Pullse different from other support platforms?",
    answer:
      "Unlike traditional helpdesks, Pullse is built AI-first with autonomous agents that can handle entire conversations end-to-end. It offers transparent usage-based pricing, real-time AI quality assurance, and deep integration capabilities through API events and webhooks. Pullse focuses on automation that augments your team rather than replacing it.",
  },
  {
    question: "How much does Pullse cost?",
    answer:
      "Pullse offers transparent, usage-based pricing starting at $49/seat/month for the Standard plan and $79/seat/month for the Pro plan. You only pay for AI actions you actually use, with no hidden fees or per-resolution charges. We also offer a free startup program for eligible early-stage companies.",
  },
  {
    question: "What features does Pullse include?",
    answer:
      "Pullse includes a unified inbox across all channels, AI chatbots and autonomous agents, intelligent workflows and routing, real-time auto-QA, comprehensive analytics and reporting, API event integration, and seamless integrations with popular tools. All plans include unlimited conversation history and team collaboration features.",
  },
  {
    question: "How do I get started with Pullse?",
    answer:
      "Getting started with Pullse is easy. Contact our sales team to schedule a personalized demo where we'll show you how Pullse can transform your support operations. We'll help you connect your existing channels, set up AI automation, and onboard your team. Most customers are fully operational within a week.",
  },
];
