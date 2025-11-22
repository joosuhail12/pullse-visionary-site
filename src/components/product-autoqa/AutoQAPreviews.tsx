'use client';

import { CheckCircle2, Clock, Mail, Shield, Sparkles, TrendingUp, User, Zap } from 'lucide-react';

export const CoveragePreview = () => (
  <div className="relative h-full w-full overflow-hidden rounded-xl border border-border/60 bg-white/85 p-4 shadow-sm space-y-3">
    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
      <span className="flex items-center gap-1 text-primary font-semibold">
        <Shield className="h-4 w-4" />
        100% scored
      </span>
      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary font-semibold">Live</span>
    </div>
    <div className="grid grid-cols-3 gap-2 text-sm font-semibold text-foreground">
      <div className="rounded-lg bg-muted/30 px-3 py-2 text-center">
        <p>Today</p>
        <p className="text-primary">482</p>
      </div>
      <div className="rounded-lg bg-muted/30 px-3 py-2 text-center">
        <p>This week</p>
        <p className="text-primary">2,941</p>
      </div>
      <div className="rounded-lg bg-muted/30 px-3 py-2 text-center">
        <p>Coverage</p>
        <p className="text-emerald-600">100%</p>
      </div>
    </div>
    <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 px-3 py-2 text-[11px] text-muted-foreground">
      <span>Manual QA sampled: 8%</span>
      <span className="text-primary font-semibold">Auto-QA: 100%</span>
    </div>
  </div>
);

export const FeedbackPreview = () => (
  <div className="relative h-full w-full overflow-hidden rounded-xl border border-border/60 bg-white/85 p-4 shadow-sm space-y-3">
    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
      <span className="flex items-center gap-1 text-primary font-semibold">
        <Mail className="h-4 w-4" />
        Scorecard
      </span>
      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary font-semibold">Sent</span>
    </div>
    <div className="rounded-lg border border-border/60 bg-muted/30 px-3 py-2 text-[12px] text-foreground">
      <p className="font-semibold text-foreground">Feedback</p>
      <p className="text-muted-foreground">Great empathy. Next time: offer refund option sooner.</p>
    </div>
    <div className="grid grid-cols-3 gap-2 text-[12px] text-foreground">
      <div className="rounded-lg border border-border/60 bg-white/90 px-3 py-2">
        <p className="text-muted-foreground text-[11px]">Tone</p>
        <p className="font-bold text-primary">9.2</p>
      </div>
      <div className="rounded-lg border border-border/60 bg-white/90 px-3 py-2">
        <p className="text-muted-foreground text-[11px]">Accuracy</p>
        <p className="font-bold text-primary">9.5</p>
      </div>
      <div className="rounded-lg border border-border/60 bg-white/90 px-3 py-2">
        <p className="text-muted-foreground text-[11px]">Policy</p>
        <p className="font-bold text-primary">9.8</p>
      </div>
    </div>
  </div>
);

export const TrendsPreview = () => (
  <div className="relative h-full w-full overflow-hidden rounded-xl border border-border/60 bg-white/85 p-4 shadow-sm">
    <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-2">
      <span className="flex items-center gap-1 text-primary font-semibold">
        <TrendingUp className="h-4 w-4" /> Trends
      </span>
      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary font-semibold">30d</span>
    </div>
    <div className="h-24 rounded-lg bg-gradient-to-r from-primary/10 via-white to-white flex items-end gap-1 px-2 pb-1">
      {[12, 42, 30, 55, 65, 70, 78, 82, 88, 90].map((h, i) => (
        <span key={i} className="flex-1 rounded-full bg-primary/60" style={{ height: `${h}%` }} />
      ))}
    </div>
    <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-foreground">
      <div className="rounded-lg border border-border/60 bg-muted/30 px-3 py-2">
        <p className="text-muted-foreground">QA score</p>
        <p className="font-bold text-primary">+6.2%</p>
      </div>
      <div className="rounded-lg border border-border/60 bg-muted/30 px-3 py-2">
        <p className="text-muted-foreground">Handle time</p>
        <p className="font-bold text-emerald-600">-12%</p>
      </div>
    </div>
  </div>
);

export const FairnessPreview = () => (
  <div className="relative h-full w-full overflow-hidden rounded-xl border border-border/60 bg-white/85 p-4 shadow-sm space-y-3">
    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
      <span className="flex items-center gap-1 text-primary font-semibold">
        <User className="h-4 w-4" /> Dispute in progress
      </span>
      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary font-semibold">Reply needed</span>
    </div>
    <div className="rounded-lg border border-border/60 bg-muted/30 px-3 py-2 text-[12px] text-foreground">
      “I followed policy; customer was already refunded.” — Alex
    </div>
    <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-white/90 px-3 py-2 text-[12px]">
      <Shield className="h-4 w-4 text-primary" />
      Supervisor review scheduled
    </div>
  </div>
);

export const EfficiencyPreview = () => (
  <div className="relative h-full w-full overflow-hidden rounded-xl border border-border/60 bg-white/85 p-4 shadow-sm space-y-3">
    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
      <span className="flex items-center gap-1 text-primary font-semibold">
        <Clock className="h-4 w-4" /> Time saved
      </span>
      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary font-semibold">30d</span>
    </div>
    <div className="grid grid-cols-2 gap-2 text-[12px] text-foreground">
      <div className="rounded-lg border border-border/60 bg-muted/30 px-3 py-2">
        <p className="text-muted-foreground">Manual QA hours</p>
        <p className="font-bold text-primary">-184h</p>
      </div>
      <div className="rounded-lg border border-border/60 bg-muted/30 px-3 py-2">
        <p className="text-muted-foreground">QA team size</p>
        <p className="font-bold text-primary">Same team</p>
      </div>
    </div>
    <div className="rounded-lg border border-primary/30 bg-gradient-to-r from-primary/10 to-white px-3 py-2 text-[11px] text-muted-foreground">
      Auto-QA runs continuously with no new headcount.
    </div>
  </div>
);

export const PrecisionPreview = () => (
  <div className="relative h-full w-full overflow-hidden rounded-xl border border-border/60 bg-white/85 p-4 shadow-sm space-y-3">
    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
      <span className="flex items-center gap-1 text-primary font-semibold">
        <Sparkles className="h-4 w-4" /> Pinpoint moment
      </span>
      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary font-semibold">Suggest</span>
    </div>
    <div className="rounded-lg border border-border/60 bg-muted/30 px-3 py-2 text-[12px] text-foreground">
      Message flagged: “We can’t help with that.”
    </div>
    <div className="rounded-lg border border-primary/40 bg-gradient-to-r from-primary/10 to-white px-3 py-2 text-[12px] text-foreground shadow-[0_8px_16px_rgba(0,0,0,0.04)]">
      Suggested rewrite: “I can help with this. Here’s what we can do…”
    </div>
  </div>
);

export const RubricsPreview = () => (
  <div className="relative h-full w-full overflow-hidden rounded-xl border border-border/60 bg-white/85 p-4 shadow-sm space-y-3">
    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
      <span className="flex items-center gap-1 text-primary font-semibold">
        <Zap className="h-4 w-4" /> Custom rubrics
      </span>
      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary font-semibold">Coming soon</span>
    </div>
    <div className="space-y-2 text-[12px] text-foreground">
      {['Empathy', 'Accuracy', 'Policy', 'Brand Voice'].map((item) => (
        <div key={item} className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 px-3 py-2">
          <span>{item}</span>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary font-semibold">Weighted</span>
        </div>
      ))}
    </div>
  </div>
);
