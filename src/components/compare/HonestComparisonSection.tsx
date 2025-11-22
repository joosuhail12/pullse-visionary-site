'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, AlertTriangle, Sparkles, X } from 'lucide-react';
import { competitors, pullseLimitations, choosePullseIf } from '@/data/comparisonData';

export default function HonestComparisonSection() {
  const [selectedCompetitor, setSelectedCompetitor] = useState('zendesk');
  const currentCompetitor = competitors.find((c) => c.id === selectedCompetitor);

  return (
    <section className="py-16 md:py-20 lg:py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            The Honest Comparison
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We believe in helping you choose the right tool for your needs—even if it's not us. Here's when each platform makes sense.
          </p>
        </div>

        {/* Competitor Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {competitors.map((comp) => (
            <button
              key={comp.id}
              type="button"
              onClick={() => setSelectedCompetitor(comp.id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                selectedCompetitor === comp.id
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-background hover:border-primary/40'
              }`}
            >
              vs {comp.name}
            </button>
          ))}
        </div>

        {currentCompetitor && (
          <motion.div
            key={currentCompetitor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
          >
            {/* Column 1: Choose Competitor */}
            <div className="rounded-2xl border border-blue-200 bg-blue-50/50 dark:bg-blue-950/20 dark:border-blue-900 p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <Check className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100">
                    Choose {currentCompetitor.name}
                  </h3>
                  <p className="text-xs text-blue-700 dark:text-blue-300">When this makes sense</p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                  Best if you:
                </p>
                {currentCompetitor.chooseCompetitorIf && currentCompetitor.chooseCompetitorIf.length > 0 ? (
                  <ul className="space-y-2">
                    {currentCompetitor.chooseCompetitorIf.map((scenario, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-blue-800 dark:text-blue-200">
                        <Check className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>{scenario}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-blue-700 dark:text-blue-300 italic">
                    {currentCompetitor.whenToChoose}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-blue-200 dark:border-blue-900">
                <p className="text-xs font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Their strengths:
                </p>
                <div className="flex flex-wrap gap-2">
                  {currentCompetitor.strengths?.map((strength, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 rounded-full bg-blue-100 dark:bg-blue-900 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300"
                    >
                      {strength}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2: The Truth / Where We Fall Short */}
            <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
                  <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Where Pullse Falls Short</h3>
                  <p className="text-xs text-muted-foreground">We're honest about our limitations</p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-foreground">
                  What we don't do (yet):
                </p>
                <ul className="space-y-3">
                  {pullseLimitations.map((limitation, idx) => (
                    <li key={idx} className="space-y-1">
                      <div className="flex items-start gap-2">
                        <X className="h-4 w-4 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{limitation.area}</p>
                          <p className="text-xs text-muted-foreground">{limitation.limitation}</p>
                        </div>
                      </div>
                      {limitation.competitorAdvantage && (
                        <p className="text-xs text-orange-600 dark:text-orange-400 ml-6">
                          → {limitation.competitorAdvantage}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground italic">
                  We're building for teams that want AI-first support automation, not enterprises that need 1000+ integrations.
                </p>
              </div>
            </div>

            {/* Column 3: Choose Pullse */}
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Choose Pullse</h3>
                  <p className="text-xs text-muted-foreground">When this makes sense</p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-foreground">
                  Best if you:
                </p>
                <ul className="space-y-2">
                  {choosePullseIf.map((scenario, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{scenario}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-primary/20">
                <p className="text-xs font-semibold text-foreground mb-2">
                  What makes us different:
                </p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>AI that executes, not just answers</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>All-in-one platform (AI, QA, analytics, workflows)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>Transparent pricing, no per-resolution fees</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>Launch in days, not quarters</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Still unsure which platform is right for you?
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#comparison-table"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
            >
              See detailed feature comparison
            </a>
            <a
              href="/contact-sales"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Talk to our team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
