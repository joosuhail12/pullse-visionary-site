'use client';

import { motion } from 'framer-motion';
import { Sparkles, MessageCircle, Bot, CheckCircle2 } from 'lucide-react';

const aiFeatures = [
  {
    icon: Sparkles,
    title: 'AI Rewriting',
    description: 'Transform any message with one click',
    benefit: '5x faster replies',
    details: [
      'Adjust tone: Formal, casual, friendly, empathetic',
      'Fix grammar and spelling automatically',
      'Expand or condense messages',
      'Maintain brand voice consistency',
    ],
    stat: '73% faster',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: MessageCircle,
    title: 'AI Summaries',
    description: 'Instant conversation context',
    benefit: 'Instant context',
    details: [
      'Auto-summarize long ticket threads',
      'Extract key points and action items',
      'Sentiment analysis',
      'Intent detection for smart routing',
    ],
    stat: '80% time saved',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Bot,
    title: 'AI Auto-Response',
    description: 'Resolve common issues automatically',
    benefit: '80% automated',
    details: [
      'Knowledge base powered answers',
      'Handle FAQs without human touch',
      'Escalate complex issues gracefully',
      'Learn from agent responses',
    ],
    stat: '80% automated',
    color: 'from-green-500 to-emerald-500',
  },
];

export default function AIFeaturesSection() {
  return (
    <>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20 space-y-6"
      >
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground max-w-3xl mx-auto leading-tight">
          AI that actually helps agents
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          Built-in AI features that make every agent as effective as your best agent
        </p>
      </motion.div>

      {/* AI Features Grid */}
      <div className="grid lg:grid-cols-3 gap-8 mb-16">
        {aiFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card transition-all hover:border-primary/40 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 transition-opacity group-hover:opacity-5`} />

              <div className="relative p-8 space-y-6">
                {/* Icon & Stat */}
                <div className="flex items-start justify-between">
                  <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg transition-all group-hover:scale-110`}>
                    <Icon className="h-8 w-8 text-background" />
                  </div>
                  <div className="rounded-xl bg-primary/10 px-4 py-2 border border-primary/20">
                    <div className="text-sm font-bold text-primary">{feature.stat}</div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-foreground">{feature.title}</h3>
                  <p className="text-base text-muted-foreground">{feature.description}</p>
                </div>

                {/* Details */}
                <div className="space-y-3 pt-4 border-t border-border/40">
                  {feature.details.map((detail, dIndex) => (
                    <div key={dIndex} className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        {detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
