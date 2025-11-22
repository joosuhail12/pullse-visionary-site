'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Trophy, TrendingUp, Zap, DollarSign, Clock } from 'lucide-react';
import { competitors } from '@/data/comparisonData';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function WhySwitchSection() {
  const [selectedCompetitor, setSelectedCompetitor] = useState('zendesk');
  const currentCompetitor = competitors.find((c) => c.id === selectedCompetitor);

  // Extract icon based on content
  const getIconForReason = (reason: string): React.ReactNode => {
    const lower = reason.toLowerCase();
    if (lower.includes('pricing') || lower.includes('cost') || lower.includes('save') || lower.includes('$')) {
      return <DollarSign className="h-6 w-6" />;
    }
    if (lower.includes('faster') || lower.includes('days') || lower.includes('setup') || lower.includes('launch')) {
      return <Clock className="h-6 w-6" />;
    }
    if (lower.includes('ai') || lower.includes('execut') || lower.includes('action')) {
      return <Zap className="h-6 w-6" />;
    }
    if (lower.includes('transparent') || lower.includes('no hidden') || lower.includes('all features')) {
      return <Check className="h-6 w-6" />;
    }
    return <TrendingUp className="h-6 w-6" />;
  };

  // Extract savings/metric if mentioned
  const extractMetric = (reason: string): string | null => {
    const savingsMatch = reason.match(/\$\d+[^\s]*/);
    if (savingsMatch) return savingsMatch[0];

    const daysMatch = reason.match(/\d+-?\d*\s*days?/i);
    if (daysMatch) return daysMatch[0];

    const percentMatch = reason.match(/\d+%/);
    if (percentMatch) return percentMatch[0];

    return null;
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            <Trophy className="h-4 w-4" />
            <span>Why Companies Choose Pullse</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Why Switch from{' '}
            <span className="text-primary">{currentCompetitor?.name || 'Competitors'}</span>{' '}
            to Pullse
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here's what sets us apart—specific, measurable advantages that drive real business value.
          </p>
        </div>

        {/* Competitor Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {competitors.map((comp) => (
            <button
              key={comp.id}
              type="button"
              onClick={() => setSelectedCompetitor(comp.id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                selectedCompetitor === comp.id
                  ? 'border-primary bg-primary text-primary-foreground shadow-lg'
                  : 'border-border bg-background hover:border-primary/40 hover:bg-primary/5'
              }`}
            >
              vs {comp.name}
            </button>
          ))}
        </div>

        {/* Advantages Grid */}
        {currentCompetitor && (
          <motion.div
            key={currentCompetitor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-5xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {currentCompetitor.whySwitch.map((reason, index) => {
                const icon = getIconForReason(reason);
                const metric = extractMetric(reason);

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background p-6 shadow-lg hover:shadow-xl hover:border-primary/40 transition-all"
                  >
                    {/* Background Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Content */}
                    <div className="relative space-y-3">
                      {/* Icon + Metric Badge */}
                      <div className="flex items-start justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          {icon}
                        </div>
                        {metric && (
                          <div className="rounded-full bg-green-100 dark:bg-green-900/30 px-3 py-1">
                            <span className="text-sm font-bold text-green-700 dark:text-green-400">
                              {metric}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Reason Text */}
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <p className="text-sm font-medium text-foreground leading-relaxed">
                            {reason}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Card Number */}
                    <div className="absolute bottom-2 right-2 text-6xl font-bold text-primary/5 group-hover:text-primary/10 transition-colors">
                      {index + 1}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Pricing Note */}
            {currentCompetitor.pricingNote && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="rounded-xl border border-blue-200 bg-blue-50/50 dark:bg-blue-950/20 dark:border-blue-900 p-4"
              >
                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-blue-900 dark:text-blue-100 mb-1">
                      Cost Comparison:
                    </p>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      {currentCompetitor.pricingNote}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="shadow-lg">
                <Link href="/contact-sales">
                  Start Your Migration
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#comparison-table">
                  See Detailed Comparison
                </Link>
              </Button>
            </div>

            {/* Trust Badge */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-primary">2-5 day setup</span> with dedicated migration support
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
