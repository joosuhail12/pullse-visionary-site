'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function CompareHeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background min-h-[60vh] md:min-h-[75vh] lg:min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(168,85,247,0.12),transparent_45%),radial-gradient(circle_at_80%_15%,rgba(236,72,153,0.12),transparent_45%)]" />

      <div className="container mx-auto px-4 py-12 md:py-20 lg:py-24 relative z-10 w-full flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl w-full grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center"
        >
          <div className="space-y-4 md:space-y-6 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight text-foreground">
              See where rivals answer—
              <span className="block bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                while Pullse finishes the work
              </span>
            </h1>
            <div className="grid gap-3 text-sm sm:text-base md:text-lg text-muted-foreground">
              <p className="max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                AI that executes refunds, updates, and lookups across your stack, with humans approving every step.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground/90">
                One platform replaces answer-only bots and tool sprawl. See how Pullse compares side by side.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start w-full sm:w-auto">
              <Button size="lg" asChild className="h-11 sm:h-12 md:h-13 px-5 sm:px-6 md:px-8 text-sm md:text-base font-bold w-full sm:w-auto">
                <Link href="/contact-sales">
                  Compare now
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="h-11 sm:h-12 md:h-13 px-5 sm:px-6 md:px-8 text-sm md:text-base border-2 w-full sm:w-auto">
                <Link href="#comparison-table">
                  View comparison table
                  <ChevronDown className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Link>
              </Button>
            </div>
            <div className="grid sm:grid-cols-3 gap-3 text-xs md:text-sm text-muted-foreground">
              {['Executes across your stack', 'Humans approve every action', 'Launch in days'].map((item) => (
                <div key={item} className="rounded-xl border border-border/50 bg-card/70 px-3 py-2 text-center">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border/50 bg-card/80 shadow-xl p-4 sm:p-5 md:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-foreground">Why teams switch</p>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">Highlights</span>
            </div>
            <div className="grid gap-3 text-sm text-foreground">
              {[
                {
                  title: 'AI that acts',
                  body: 'Process refunds, fetch orders, update CRM records, change subscriptions—from chat or inbox.',
                },
                {
                  title: 'Full suite, one price',
                  body: 'Inbox, workflows, chatbots, copilots, QA, analytics. No per-resolution or per-session gotchas.',
                },
                {
                  title: 'Ship in days',
                  body: 'Templates + native connectors launch automations fast. No months-long migrations.',
                },
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx }}
                  className="rounded-xl border border-border/50 bg-muted/40 px-4 py-3"
                >
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="text-muted-foreground text-sm">{item.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
