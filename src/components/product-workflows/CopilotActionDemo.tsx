'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ExternalLink, Link2, Play, ShieldCheck } from 'lucide-react';

const steps = [
  { title: 'Connect Stripe', detail: 'OAuth / API key', color: 'hsl(262 83% 58%)', icon: Link2 },
  { title: 'Intent detected', detail: 'Refund request', color: 'hsl(25 95% 58%)', icon: Play },
  { title: 'Action executed', detail: 'Refund $85 to card', color: 'hsl(152 69% 45%)', icon: CheckCircle2 },
];

const log = [
  'POST /stripe/refunds • 200 OK',
  'Webhook verified • signature passed',
  'Ticket tagged: refund, stripe',
  'Customer notified with receipt',
];

export default function CopilotActionDemo() {
  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="absolute -inset-6 bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-transparent blur-3xl opacity-70" />
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/8 via-card to-card shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-amber-700">Copilot action</p>
            <p className="text-lg font-bold text-foreground">Refund issued from chat</p>
          </div>
          <span className="rounded-full bg-amber-500/15 px-3 py-1 text-[11px] font-semibold text-amber-700">
            Live in chat
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.3fr_1fr] p-5 md:p-6">
          <div className="space-y-4">
            <div className="rounded-xl border border-border/50 bg-white/70 shadow-sm p-4 space-y-3">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Customer says</span>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary font-semibold">AI parsing</span>
              </div>
              <div className="rounded-lg border border-border/60 bg-gradient-to-r from-primary/8 to-purple-500/8 px-3 py-3 text-sm text-foreground shadow-[0_10px_20px_rgba(0,0,0,0.05)]">
                “Please refund my last order, it was $85. Can you apply it to the original card?”
              </div>
            </div>

            <div className="rounded-xl border border-border/50 bg-white/80 shadow-sm p-4 space-y-3">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Copilot plan</span>
                <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-amber-700 font-semibold">Preview</span>
              </div>
              <div className="space-y-2">
                {steps.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.title} className="flex items-center gap-3 rounded-lg border border-border/60 bg-white/90 px-3 py-2 shadow-sm">
                      <span
                        className="flex h-9 w-9 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${step.color}1a`, color: step.color }}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-foreground">{step.title}</p>
                        <p className="text-[11px] text-muted-foreground truncate">{step.detail}</p>
                      </div>
                      {idx < steps.length - 1 && (
                        <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground/60 hidden sm:block" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-xl border border border-border/60 bg-white/80 shadow-sm p-4">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-2">
                <span>Guardrails</span>
                <span className="flex items-center gap-1 text-primary">
                  <ShieldCheck className="h-4 w-4" />
                  Policies enforced
                </span>
              </div>
              <ul className="space-y-1 text-[11px] text-foreground">
                <li>• Limit refunds to $100 without supervisor approval</li>
                <li>• Verify webhook signature before executing</li>
                <li>• Post audit trail back to ticket</li>
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-xl border border-border/60 bg-white/80 shadow-sm p-4">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-2">
                <span>Execution log</span>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary font-semibold">Live</span>
              </div>
              <div className="space-y-1.5 text-[12px] text-foreground">
                {log.map((item, idx) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 4 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    className="flex items-center gap-2"
                  >
                    <span className="flex h-2 w-2 rounded-full bg-primary/70" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border/60 bg-white/80 shadow-sm p-4 space-y-3">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Results</span>
                <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-amber-700 font-semibold">Posted to ticket</span>
              </div>
              <div className="space-y-2 text-[12px] text-foreground">
                <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 px-3 py-2">
                  <span className="font-semibold">Refund</span>
                  <span>$85 • Refunded</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 px-3 py-2">
                  <span className="font-semibold">Customer note</span>
                  <span className="text-primary flex items-center gap-1">
                    View record
                    <ExternalLink className="h-3.5 w-3.5" />
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 px-3 py-2">
                  <span className="font-semibold">Status</span>
                  <span className="text-emerald-600 font-semibold">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
