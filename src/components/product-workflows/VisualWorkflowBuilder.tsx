'use client';

import { motion } from 'framer-motion';
import { Zap, GitBranch, Mail, Clock, CheckCircle } from 'lucide-react';

const steps = [
  { title: 'Trigger', detail: 'New ticket', icon: Zap },
  { title: 'Branch', detail: 'VIP? route to L2', icon: GitBranch },
  { title: 'Action', detail: 'Send refund email', icon: Mail },
  { title: 'Delay', detail: 'Wait 2 hours', icon: Clock },
  { title: 'Complete', detail: 'Close + tag', icon: CheckCircle },
];

const meta = [
  { label: 'Version', value: 'v3 · Published' },
  { label: 'Scope', value: 'Inbox + Chatbot' },
  { label: 'Rollback', value: '1-click restore' },
];

export default function VisualWorkflowBuilder() {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xl p-5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,hsl(var(--primary)/0.12),transparent_45%),radial-gradient(circle_at_82%_12%,hsl(var(--primary)/0.08),transparent_50%)]" />

      <div className="relative flex flex-col gap-4 h-full">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Visual builder</p>
            <p className="text-sm font-semibold text-foreground">Drag, drop, publish</p>
          </div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
            Auto-save on
          </span>
        </div>

        <div className="relative rounded-2xl border border-border/50 bg-background/90 p-4 shadow-sm">
          <div className="text-xs font-semibold text-muted-foreground mb-3">Flow preview</div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="flex items-center gap-2">
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05, duration: 0.25 }}
                    className="flex items-center gap-3 rounded-xl border border-border/60 bg-white/90 px-3 py-2 shadow-sm"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-foreground">{step.title}</p>
                      <p className="text-[11px] text-muted-foreground truncate">{step.detail}</p>
                    </div>
                  </motion.div>
                  {idx < steps.length - 1 && <span className="h-0.5 w-6 rounded-full bg-primary/30" />}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-[11px] font-semibold text-muted-foreground">
          {meta.map((item) => (
            <div key={item.label} className="rounded-xl border border-border/60 bg-background/85 px-3 py-2 shadow-sm">
              <p>{item.label}</p>
              <p className="text-sm font-bold text-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
