'use client';

import { motion } from 'framer-motion';
import { Mail, MessageSquare, ArrowRight } from 'lucide-react';

const channels = [
  { id: 'email', name: 'Email', color: 'hsl(217 91% 60%)', icon: Mail, load: 68 },
  { id: 'chat', name: 'Live Chat', color: 'hsl(142 76% 36%)', icon: MessageSquare, load: 52 },
];

const queue = [
  { id: 'IN-248', subject: 'Refund status', source: 'Email', time: '2m', owner: 'Sarah' },
  { id: 'IN-182', subject: 'Checkout help', source: 'Live Chat', time: 'Now', owner: 'Jamal' },
  { id: 'IN-091', subject: 'Order delay', source: 'Email', time: '5m', owner: 'Priya' },
];

const MultiChannelAggregator = () => {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-card via-card to-card p-6 shadow-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,hsl(var(--primary)/0.12),transparent_45%),radial-gradient(circle_at_82%_8%,hsl(var(--primary)/0.08),transparent_50%)]" />

      <div className="relative flex flex-col gap-4 h-full">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Channels</p>
            <p className="text-sm font-semibold text-foreground">Everything flows to one inbox</p>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-primary bg-primary/10 rounded-full px-3 py-1">
            <ArrowRight className="h-4 w-4" />
            Auto-route on
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-[1fr_1.1fr]">
          {/* Channels list */}
          <div className="rounded-2xl border border-border/60 bg-background/80 p-4 shadow-sm space-y-3">
            {channels.map((channel, idx) => {
              const Icon = channel.icon;
              return (
                <motion.div
                  key={channel.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-3 rounded-xl border border-border/60 bg-white/80 px-3 py-2 shadow-[0_10px_20px_rgba(0,0,0,0.04)]"
                  style={{ boxShadow: `0 10px 18px ${channel.color}12` }}
                >
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${channel.color}1a`, color: channel.color }}
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{channel.name}</p>
                    <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted/50">
                      <span
                        className="block h-full rounded-full bg-primary/70"
                        style={{ width: `${channel.load}%`, backgroundColor: channel.color }}
                      />
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-muted-foreground">{channel.load}%</p>
                </motion.div>
              );
            })}
          </div>

          {/* Inbox preview */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl border border-border/60 bg-white/85 shadow-2xl backdrop-blur-sm overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-border/60">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Unified inbox</p>
                <p className="text-sm font-semibold text-foreground">Queue synced in real time</p>
              </div>
              <span className="text-[11px] text-primary font-semibold bg-primary/10 rounded-full px-3 py-1">
                Collision guard
              </span>
            </div>

            <div className="divide-y divide-border/60">
              {queue.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-muted/30"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold">
                    {item.source.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{item.subject}</p>
                    <p className="text-[11px] text-muted-foreground">{item.id} • {item.source}</p>
                  </div>
                  <div className="text-right text-[11px] text-muted-foreground">
                    <p className="font-semibold text-foreground">{item.time}</p>
                    <p className="text-primary font-semibold">{item.owner}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center justify-between px-5 py-3 text-[11px] text-muted-foreground bg-muted/20">
              <span>Round robin • SLA guardrails • AI tags</span>
              <span className="text-primary font-semibold">Always in sync</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MultiChannelAggregator;
