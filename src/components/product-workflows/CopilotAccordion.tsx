'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RouteButton from '@/components/RouteButton';
import {
  Code,
  Zap,
  Shield,
  CheckCircle2,
  RotateCw,
  Database,
  Play,
  Lock,
  FileText,
  AlertTriangle,
  Sparkles,
  Lightbulb,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';

export default function CopilotAccordion() {
  const [activeTab, setActiveTab] = useState<number | null>(null);

  const tabs = [
    {
      icon: Code,
      title: 'Universal Integration',
      content: {
        headline: '50+ pre-built connectors for popular platforms. Or register any REST/GraphQL API—AI figures out how to use it on the fly.',
        features: [
          { icon: CheckCircle2, text: 'Pre-built connectors for Stripe, Shopify, Salesforce, and more' },
          { icon: Zap, text: 'AI creates custom integrations dynamically for any other API' },
          { icon: Shield, text: 'On-demand actions when agents need them—no business logic required' }
        ],
        badge: { text: '50+ Integrations' },
        example: {
          title: 'Example Use Case',
          description: 'Agent asks "Process refund for order #1234." AI calls your Stripe connector, executes the refund, and confirms back—or figures out your custom API on the fly if no connector exists.'
        }
      },
      colors: {
        gradient: 'from-blue-500 to-cyan-500',
        borderActive: 'border-blue-500/50',
        bgActive: 'from-blue-500/15 via-blue-500/10 to-cyan-500/5',
        shadowActive: 'shadow-blue-500/20',
        textActive: 'text-blue-500',
        bgExpanded: 'from-blue-500/5 via-blue-500/3 to-transparent',
        borderExpanded: 'border-blue-500/20',
        iconGlow: 'shadow-[0_0_20px_rgba(59,130,246,0.5)]'
      }
    },
    {
      icon: Zap,
      title: 'On-Demand Actions',
      content: {
        headline: 'Agents ask AI to take actions across any platform—instantly, without leaving the conversation.',
        features: [
          { icon: RotateCw, text: 'Process refunds, cancel subscriptions, issue credits' },
          { icon: Database, text: 'Update CRM, check inventory, pull order history' },
          { icon: Play, text: 'AI figures out what API calls to make in real-time' }
        ],
        badge: { text: 'On-Demand' },
        example: {
          title: 'Example Use Case',
          description: 'Agent types "Issue $50 credit to this customer." AI calls your billing API, creates the credit, and confirms back—all in seconds.'
        }
      },
      colors: {
        gradient: 'from-amber-500 to-orange-500',
        borderActive: 'border-amber-500/50',
        bgActive: 'from-amber-500/15 via-amber-500/10 to-orange-500/5',
        shadowActive: 'shadow-amber-500/20',
        textActive: 'text-amber-500',
        bgExpanded: 'from-amber-500/5 via-amber-500/3 to-transparent',
        borderExpanded: 'border-amber-500/20',
        iconGlow: 'shadow-[0_0_20px_rgba(245,158,11,0.5)]'
      }
    },
    {
      icon: Shield,
      title: 'Control & Security',
      content: {
        headline: 'AI suggests, agent approves. Multi-level approval workflows for sensitive operations.',
        features: [
          { icon: Lock, text: 'Role-based action permissions' },
          { icon: FileText, text: 'Full audit trail of every action' },
          { icon: AlertTriangle, text: 'Multi-step approval for high-risk actions' }
        ],
        badge: { text: 'Enterprise Security' },
        example: {
          title: 'Example Use Case',
          description: 'Refunds over $500 require manager approval—AI suggests, agent requests, manager approves in Slack.'
        }
      },
      colors: {
        gradient: 'from-purple-500 to-pink-500',
        borderActive: 'border-purple-500/50',
        bgActive: 'from-purple-500/15 via-purple-500/10 to-pink-500/5',
        shadowActive: 'shadow-purple-500/20',
        textActive: 'text-purple-500',
        bgExpanded: 'from-purple-500/5 via-purple-500/3 to-transparent',
        borderExpanded: 'border-purple-500/20',
        iconGlow: 'shadow-[0_0_20px_rgba(168,85,247,0.5)]'
      }
    }
  ];

  return (
    <div className="space-y-2 md:space-y-2.5 lg:space-y-3">
      <div className="space-y-2 md:space-y-2.5 lg:space-y-3">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          const isActive = activeTab === index;

          return (
            <div key={index} className="group">
              <motion.button
                type="button"
                onClick={() => setActiveTab(activeTab === index ? null : index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className={`w-full text-left rounded-xl border transition-all ${
                  isActive
                    ? `${tab.colors.borderActive} bg-gradient-to-r ${tab.colors.bgActive} shadow-lg ${tab.colors.shadowActive}`
                    : 'border-border/40 bg-card/80 hover:border-primary/30 hover:bg-card'
                }`}
              >
                <div className="flex items-center gap-3 md:gap-4 p-3 md:p-3.5 lg:p-4">
                  <motion.div
                    className={`flex h-10 w-10 md:h-11 md:w-11 lg:h-12 lg:w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${tab.colors.gradient} shadow-lg ${isActive ? tab.colors.iconGlow : ''}`}
                    whileHover={{ rotate: 8, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Icon className="h-5 w-5 md:h-5.5 md:w-5.5 lg:h-6 lg:w-6 text-background" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className={`text-sm md:text-base font-bold transition-colors ${isActive ? tab.colors.textActive : 'text-foreground'}`}>
                      {tab.title}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className={isActive ? tab.colors.textActive : 'text-muted-foreground'}
                  >
                    <ChevronDown className="h-4 w-4 md:h-5 md:w-5" />
                  </motion.div>
                </div>
              </motion.button>

              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.div
                    key={`accordion-${index}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className={`mt-2 md:mt-2.5 lg:mt-3 rounded-2xl border backdrop-blur-xl overflow-hidden bg-gradient-to-br ${tab.colors.bgExpanded} ${tab.colors.borderExpanded}`}
                  >
                    <div className="p-4 md:p-5 lg:p-6 space-y-4 md:space-y-5 lg:space-y-6">
                      {/* Headline */}
                      <div className="flex items-start gap-2 md:gap-3">
                        <Sparkles className={`h-4 w-4 md:h-5 md:w-5 mt-0.5 shrink-0 ${tab.colors.textActive}`} />
                        <p className="text-xs md:text-sm text-foreground font-medium leading-relaxed">
                          {tab.content.headline}
                        </p>
                      </div>

                      {/* Key Features */}
                      <div className="space-y-2 md:space-y-2.5 lg:space-y-3">
                        {tab.content.features.map((feature, idx) => {
                          const FeatureIcon = feature.icon;
                          return (
                            <div
                              key={idx}
                              className="flex items-center gap-2 md:gap-3 text-xs md:text-sm group/feature"
                            >
                              <div className={`flex h-6 w-6 md:h-6.5 md:w-6.5 lg:h-7 lg:w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${tab.colors.gradient} shadow-lg group-hover/feature:scale-110 transition-transform duration-200`}>
                                <FeatureIcon className="h-3.5 w-3.5 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4 text-background" />
                              </div>
                              <span className="text-muted-foreground group-hover/feature:text-foreground transition-colors duration-200">
                                {feature.text}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Example Use Case */}
                      <div className={`rounded-xl border p-3 md:p-3.5 lg:p-4 space-y-1.5 md:space-y-2 bg-gradient-to-br ${tab.colors.bgActive} ${tab.colors.borderActive}`}>
                        <div className="flex items-center gap-1.5 md:gap-2">
                          <Lightbulb className={`h-3.5 w-3.5 md:h-4 md:w-4 ${tab.colors.textActive}`} />
                          <span className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ${tab.colors.textActive}`}>
                            {tab.content.example.title}
                          </span>
                        </div>
                        <p className="text-[10px] md:text-xs text-muted-foreground leading-relaxed">
                          {tab.content.example.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Enhanced Bottom CTA */}
      <div className="pt-3 md:pt-4 border-t border-border/30">
        <RouteButton
          variant="ghost"
          size="sm"
          href="/product/ai-suite"
          className={`w-full justify-between group hover:bg-gradient-to-r ${activeTab !== null ? tabs[activeTab].colors.bgActive : 'hover:bg-muted'}`}
        >
          <span className="flex items-center gap-1.5 md:gap-2">
            <Sparkles className="h-3.5 w-3.5 md:h-4 md:w-4" />
            <span className="text-xs md:text-sm">Learn more about AI Copilot</span>
          </span>
          <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4 group-hover:translate-x-1 transition-transform" />
        </RouteButton>
      </div>
    </div>
  );
}
