'use client';

import React from 'react';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  Check,
  Clock3,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { competitors } from '@/data/comparisonData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import ZendeskLogo from '@/assets/Zendesk®_Symbol_0.svg';
import IntercomLogo from '@/assets/Intercom_idJtqMxXFx_0.svg';
import FreshworksLogo from '@/assets/Freshworks Inc_idGK6bEIM__0.svg';
import DixaLogo from '@/assets/Dixa_iddtkz6UXa_0.svg';

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const pullseProofPoints = [
  {
    title: 'Executes your workflows',
    body: 'Refunds, order updates, and CRM syncs complete inside chat/inbox.',
  },
  {
    title: 'Suite is included',
    body: 'Bots, copilots, QA, analytics, and workflows without add-on creep.',
  },
  {
    title: 'Live in ~3 days',
    body: 'Guided rollout, native connectors, migration help by default.',
  },
];

const pullseMicroBadges = [
  { label: 'AI-native platform', icon: Sparkles },
  { label: 'Transparent pricing', icon: ShieldCheck },
  { label: '2-5 day launch', icon: Clock3 },
];

const getIconForReason = (reason: string): IconComponent => {
  const lower = reason.toLowerCase();
  if (lower.includes('ai') || lower.includes('execute') || lower.includes('action')) return Zap;
  if (lower.includes('pricing') || lower.includes('cost') || lower.includes('$')) return BarChart3;
  if (lower.includes('faster') || lower.includes('days') || lower.includes('setup')) return Clock3;
  return TrendingUp;
};

const extractMetric = (reason: string): string | null => {
  const savingsMatch = reason.match(/\$\d+[^\s]*/);
  if (savingsMatch) return savingsMatch[0];

  const daysMatch = reason.match(/\d+-?\d*\s*days?/i);
  if (daysMatch) return daysMatch[0];

  const percentMatch = reason.match(/\d+%/);
  if (percentMatch) return percentMatch[0];

  return null;
};

export default function CompetitorComparisonSection() {
  const [selectedCompetitor, setSelectedCompetitor] = useState('zendesk');
  const currentCompetitor = competitors.find((c) => c.id === selectedCompetitor);
  const previewReasons = currentCompetitor?.chooseCompetitorIf?.slice(0, 3) ?? [];
  const competitorLogos: Record<string, StaticImageData> = {
    zendesk: ZendeskLogo,
    intercom: IntercomLogo,
    freshdesk: FreshworksLogo,
    dixa: DixaLogo,
  };
  const switchReasons = currentCompetitor?.whySwitch.slice(0, 2) ?? [];

  return (
    <section className="relative py-10 sm:py-12 md:py-14 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute -z-10 left-[-8%] top-10 h-64 w-64 rounded-full bg-primary/15 blur-3xl opacity-70" />
      <div className="absolute -z-10 right-[-6%] bottom-10 h-72 w-72 rounded-full bg-fuchsia-400/10 blur-3xl opacity-70" />

      <div className="container mx-auto px-4 max-w-6xl relative space-y-6">
        <div className="text-center space-y-2">
          <Badge className="bg-primary/10 text-primary border-primary/40">Actionable AI vs legacy bots</Badge>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
            Pullse executes. {currentCompetitor?.name || 'Competitors'} answer.
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            One-screen snapshot: Pullse completes actions in-chat; others mostly provide answers.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {competitors.map((comp) => (
            <button
              key={comp.id}
              type="button"
              onClick={() => setSelectedCompetitor(comp.id)}
              className={cn(
                'px-4 py-2 rounded-2xl text-sm font-semibold border backdrop-blur transition-all shadow-sm',
                selectedCompetitor === comp.id
                  ? 'bg-foreground text-background border-foreground shadow-lg shadow-primary/15'
                  : 'bg-card/70 text-foreground border-border/60 hover:border-primary/50 hover:shadow-md',
              )}
            >
              vs {comp.name}
            </button>
          ))}
        </div>

        {currentCompetitor && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24 }}
            className="rounded-3xl border border-border/60 bg-card/95 shadow-2xl p-4 sm:p-5 md:p-6 space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  Pullse vs {currentCompetitor.name}
                </p>
                <h3 className="text-lg md:text-xl font-bold text-foreground leading-tight">
                  Action over answers—fast.
                </h3>
                <p className="text-sm text-muted-foreground">
                  Decision-ready view with the essentials only.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-primary/10 text-primary border-primary/40">AI-native</Badge>
                <Badge variant="outline" className="border-border/60 text-muted-foreground">Balanced view</Badge>
              </div>
            </div>

            <div className="grid gap-3 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 via-background to-background shadow-inner p-4 sm:p-5 md:p-6 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Pullse</p>
                    <h4 className="text-base md:text-lg font-bold text-foreground">Gets work done in the conversation</h4>
                    <p className="text-sm text-muted-foreground">Actions, QA, analytics, and workflows included by default.</p>
                  </div>
                  <span className="rounded-full bg-primary text-primary-foreground px-3 py-1 text-[11px] font-semibold shadow-sm">
                    End-to-end
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {pullseMicroBadges.map(({ label, icon: Icon }) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary"
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </span>
                  ))}
                </div>

                <div className="grid gap-2">
                  {pullseProofPoints.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-border/60 bg-card/85 px-3 py-2.5 shadow-sm"
                    >
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5 rounded-md bg-primary/10 p-1.5 text-primary">
                          <Check className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{item.title}</p>
                          <p className="text-sm text-muted-foreground">{item.body}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card/90 p-4 sm:p-5 md:p-6 space-y-3">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="space-y-1.5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {currentCompetitor.name}
                    </p>
                    <div className="flex items-center gap-2">
                      {(competitorLogos[currentCompetitor.id] || currentCompetitor.logo) && (
                        <div className="relative h-6 w-20">
                          <Image
                            src={competitorLogos[currentCompetitor.id] || currentCompetitor.logo}
                            alt={`${currentCompetitor.name} logo`}
                            fill
                            sizes="80px"
                            className="object-contain"
                          />
                        </div>
                      )}
                      <p className="text-sm font-bold text-foreground">{currentCompetitor.tagline}</p>
                    </div>
                    <p className="text-sm text-muted-foreground max-w-[440px]">{currentCompetitor.bestFor}</p>
                  </div>
                  <Badge variant="outline" className="bg-muted text-foreground border-border/70">
                    Answers-first
                  </Badge>
                </div>

                {currentCompetitor.strengths && currentCompetitor.strengths.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Best known for
                    </p>
                    <div className="grid gap-2">
                      {currentCompetitor.strengths.slice(0, 2).map((strength) => (
                        <div key={strength} className="flex items-start gap-2 text-sm text-foreground">
                          <Check className="h-4 w-4 text-green-600 mt-0.5" />
                          <span className="text-muted-foreground">{strength}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {previewReasons.length > 0 && (
                  <div className="rounded-2xl border border-border/70 bg-background/60 p-3">
                    <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground font-semibold mb-1.5">
                      Choose {currentCompetitor.name} if...
                    </p>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      {previewReasons.slice(0, 2).map((reason) => (
                        <li key={reason} className="flex items-start gap-2">
                          <ShieldCheck className="h-4 w-4 text-primary mt-0.5" />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {currentCompetitor.whenToChoose && (
                  <div className="rounded-xl border border-blue-200 bg-blue-50/70 dark:bg-blue-950/30 dark:border-blue-900 p-3 space-y-1">
                    <p className="text-[11px] font-semibold text-blue-900 dark:text-blue-100 uppercase tracking-wide">
                      Quick take
                    </p>
                    <p className="text-sm text-blue-800 dark:text-blue-200">{currentCompetitor.whenToChoose}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-[1.05fr_0.95fr] gap-3">
              <div className="rounded-2xl border border-border/60 bg-card/80 p-3 md:p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Why teams switch
                  </p>
                  <Badge className="bg-primary text-primary-foreground px-3 py-1 rounded-2xl text-[11px]">
                    vs {currentCompetitor.name}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {switchReasons.map((reason, index) => {
                    const metric = extractMetric(reason);
                    const Icon = getIconForReason(reason);
                    return (
                      <div
                        key={reason}
                        className="flex items-start gap-2 rounded-xl border border-border/60 bg-background/80 px-3 py-2"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="space-y-1">
                          {metric && (
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-[11px] font-semibold text-green-700 shadow-sm">
                              {metric}
                            </span>
                          )}
                          <p className="text-sm font-semibold text-foreground leading-snug">
                            {reason}
                          </p>
                        </div>
                        <div className="ml-auto text-[10px] font-bold text-primary/40">{index + 1}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {currentCompetitor.pricingNote && (
                <div className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 via-white to-blue-50 p-3 text-xs md:text-sm text-blue-900 shadow-inner flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-800">Cost lens</p>
                    <Badge variant="outline" className="border-blue-200 text-blue-800 bg-white/70">Reality</Badge>
                  </div>
                  <p>{currentCompetitor.pricingNote}</p>
                  <div className="flex gap-2 flex-wrap">
                    <Button asChild size="sm" className="shadow-sm">
                      <Link href="/contact-sales">
                        Start migration <ArrowRight className="ml-1.5 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <Link href="#comparison-table">See details</Link>
                    </Button>
                  </div>
                  <p className="text-[11px] text-blue-800">
                    Most teams launch in 2-5 days with support.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
