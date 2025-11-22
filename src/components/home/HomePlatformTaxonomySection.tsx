'use client';

import { lazy, Suspense } from "react";
import {
  MessageSquare,
  Zap,
  Bot,
  Sparkles,
  Users,
  CheckCircle2,
  BarChart3,
} from "lucide-react";
import type { CardData } from "@/components/MagicBento";
import inboxScreenshot from "@/assets/Platform-inbox-view.webp";
import workflowScreenshot from "@/assets/workflow-automation-screenshot.webp";
import aiCopilotScreenshot from "@/assets/ai-copilot-screenshot.webp";
import analyticsScreenshot from "@/assets/analytics-screenshot.webp";
import AIChatbotPreview from "@/components/AIChatbotPreview";
import AIToolsPreview from "@/components/AIToolsPreview";
import AutoQAPreview from "@/components/AutoQAPreview";

const MagicBento = lazy(() => import("@/components/MagicBento"));

const taxonomy: CardData[] = [
  {
    title: "Unified Inbox",
    description: "One place for email & chat with SLAs, assignments, and full context.",
    label: "Communication",
    color: "hsl(var(--background))",
    icon: MessageSquare,
    image: inboxScreenshot.src,
  },
  {
    title: "Workflow Automation",
    description: "Visual routing, tagging, SLAs, escalations.",
    label: "Automation",
    color: "hsl(var(--background))",
    icon: Zap,
    image: workflowScreenshot.src,
  },
  {
    title: "AI Chatbots",
    description: "Answer questions AND take lightweight actions—refunds, lookups, updates—autonomously.",
    label: "AI Agent",
    color: "hsl(var(--background))",
    icon: Bot,
    customComponent: <AIChatbotPreview />,
  },
  {
    title: "AI Copilots",
    description: "Execute actions across your stack—refunds, updates, changes—right from the conversation.",
    label: "Action Engine",
    color: "hsl(var(--background))",
    icon: Sparkles,
    image: aiCopilotScreenshot.src,
  },
  {
    title: "AI Tools",
    description: "Refunds, plan changes, order status—with guardrails & audit trails.",
    label: "Actions",
    color: "hsl(var(--background))",
    icon: Users,
    customComponent: <AIToolsPreview />,
  },
  {
    title: "Auto-QA",
    description: "Score 100% of conversations for accuracy, empathy, policy.",
    label: "Quality",
    color: "hsl(var(--background))",
    icon: CheckCircle2,
    customComponent: <AutoQAPreview />,
  },
  {
    title: "Analytics",
    description: "Coverage by intent, actioned vs. deflected, FCR, AHT in one view.",
    label: "Insights",
    color: "hsl(var(--background))",
    icon: BarChart3,
    image: analyticsScreenshot.src,
  },
];

const HomePlatformTaxonomySection = () => {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-primary/10 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.06),transparent_60%)]" />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto mb-12 sm:mb-16 md:mb-20 max-w-4xl text-center space-y-4 sm:space-y-6">
          {/* Stronger headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight px-4">
            One platform, many superpowers
          </h2>

          {/* Better value prop */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            Inbox, workflows, bots, copilots, QA, and analytics share one brain. Actions fire with guardrails, and humans stay in control.
          </p>

          {/* Value chip */}
          <div className="inline-flex items-center gap-2 sm:gap-3 rounded-full border border-primary/25 bg-white/80 px-4 sm:px-6 md:px-8 py-3 sm:py-4 shadow-lg text-sm sm:text-base font-semibold text-primary">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
              •
            </span>
            <span className="text-foreground">
              Unified brain across channels — approvals, audit trails, and launch in days.
            </span>
          </div>
        </div>

        <Suspense fallback={
          <div className="min-h-[400px] bg-gradient-to-b from-background via-primary/3 to-background rounded-2xl border border-border/50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 p-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-32 rounded-xl bg-gradient-to-br from-muted/50 to-muted/30 animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        }>
          <MagicBento cardData={taxonomy} />
        </Suspense>
      </div>
    </section>
  );
};

export default HomePlatformTaxonomySection;
