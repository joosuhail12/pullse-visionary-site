'use client';

import { CheckCircle2, Sparkles, Shield, Bot, RefreshCw, Mail, BarChart3 } from 'lucide-react';

export const AIChatbotsPreview = () => (
  <div className="relative h-full w-full overflow-hidden rounded-xl border border-border/60 bg-white/85 p-4 shadow-sm">
    <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-2">
      <span className="flex items-center gap-1 text-primary font-semibold">
        <Bot className="h-4 w-4" /> Chatbot reply
      </span>
      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary font-semibold">Live</span>
    </div>
    <div className="space-y-2 text-sm">
      <div className="rounded-lg border border-border/60 bg-muted/30 px-3 py-2">“Where is my order #4821?”</div>
      <div className="rounded-lg border border-primary/40 bg-gradient-to-r from-primary/10 to-white px-3 py-2">
        <p className="text-foreground">
          “It shipped yesterday. Expected delivery: Friday. Tracking: <span className="text-primary font-semibold">1Z82…</span>”
        </p>
        <div className="mt-2 flex flex-wrap gap-1 text-[11px] text-primary">
          <span className="rounded-full bg-primary/10 px-2 py-0.5">Action: Send tracking</span>
          <span className="rounded-full bg-primary/10 px-2 py-0.5">Cited: Shipping FAQ</span>
        </div>
      </div>
    </div>
  </div>
);

export const AICopilotPreview = () => (
  <div className="relative h-full w-full overflow-hidden rounded-xl border border-border/60 bg-white/85 p-4 shadow-sm space-y-3">
    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
      <span className="flex items-center gap-1 text-primary font-semibold">
        <RefreshCw className="h-4 w-4" /> Copilot action plan
      </span>
      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary font-semibold">Preview</span>
    </div>
    <div className="space-y-2 text-sm">
      {[
        'Fetch Stripe subscription',
        'Apply 15% goodwill credit',
        'Notify customer in-thread',
      ].map((item) => (
        <div key={item} className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/30 px-3 py-2">
          <CheckCircle2 className="h-4 w-4 text-primary" />
          <span className="text-foreground">{item}</span>
        </div>
      ))}
    </div>
    <div className="rounded-lg border border-border/60 bg-muted/30 px-3 py-2 text-[11px] text-muted-foreground">
      Guardrails: approval required over $100, audit log posted to ticket.
    </div>
  </div>
);

export const SentimentPreview = () => (
  <div className="relative h-full w-full overflow-hidden rounded-xl border border-border/60 bg-white/85 p-4 shadow-sm">
    <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-2">
      <span className="flex items-center gap-1 text-primary font-semibold">
        <BarChart3 className="h-4 w-4" /> Sentiment pulse
      </span>
      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary font-semibold">Live</span>
    </div>
    <div className="grid grid-cols-3 gap-2 text-sm font-semibold text-foreground">
      <div className="rounded-lg bg-muted/30 px-3 py-2 text-center">
        <p>Positive</p>
        <p className="text-primary">64%</p>
      </div>
      <div className="rounded-lg bg-muted/30 px-3 py-2 text-center">
        <p>Neutral</p>
        <p className="text-foreground">22%</p>
      </div>
      <div className="rounded-lg bg-muted/30 px-3 py-2 text-center">
        <p>Negative</p>
        <p className="text-emerald-600">14%</p>
      </div>
    </div>
    <div className="mt-3 h-12 rounded-lg bg-gradient-to-r from-primary/10 via-white to-white flex items-end gap-1 px-2 pb-1">
      {[10, 30, 20, 45, 38, 50, 60].map((h, i) => (
        <span key={i} className="flex-1 rounded-full bg-primary/50" style={{ height: `${h}%` }} />
      ))}
    </div>
  </div>
);

export const AIRewritePreview = () => (
  <div className="relative h-full w-full overflow-hidden rounded-xl border border-border/60 bg-white/85 p-4 shadow-sm space-y-3">
    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
      <span className="flex items-center gap-1 text-primary font-semibold">
        <Sparkles className="h-4 w-4" /> Rewrite
      </span>
      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary font-semibold">Tone: Friendly</span>
    </div>
    <div className="rounded-lg border border-border/60 bg-muted/30 px-3 py-2 text-[12px] text-foreground">
      “We received your request. Give us 48 hours.”</div>
    <div className="rounded-lg border border-primary/40 bg-gradient-to-r from-primary/10 to-white px-3 py-2 text-[12px] text-foreground shadow-[0_8px_16px_rgba(0,0,0,0.04)]">
      “Thanks for reaching out! We’re on it and will update you within 24–48 hours.”
    </div>
    <div className="flex gap-2 text-[11px] text-muted-foreground">
      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary font-semibold">Brand voice</span>
      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary font-semibold">Checked links</span>
    </div>
  </div>
);

export const SummaryPreview = () => (
  <div className="relative h-full w-full overflow-hidden rounded-xl border border-border/60 bg-white/85 p-4 shadow-sm space-y-2">
    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
      <span className="flex items-center gap-1 text-primary font-semibold">
        <Mail className="h-4 w-4" /> Summary
      </span>
      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary font-semibold">Ready</span>
    </div>
    <ul className="space-y-1 text-[12px] text-foreground">
      <li>• Customer asked about delayed shipment.</li>
      <li>• Provided tracking and ETA (Friday).</li>
      <li>• Offered 10% coupon for inconvenience.</li>
    </ul>
    <div className="text-[11px] text-muted-foreground">Tone: On-brand · Links validated</div>
  </div>
);

export const AutoQAPreview = () => (
  <div className="relative h-full w-full overflow-hidden rounded-xl border border-border/60 bg-white/85 p-4 shadow-sm space-y-3">
    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
      <span className="flex items-center gap-1 text-primary font-semibold">
        <Shield className="h-4 w-4" /> Auto QA
      </span>
      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary font-semibold">100% scored</span>
    </div>
    <div className="grid grid-cols-2 gap-2 text-[12px] text-foreground">
      {[
        { label: 'Accuracy', score: '9.4' },
        { label: 'Tone', score: '9.0' },
        { label: 'Policy', score: '9.8' },
        { label: 'Completeness', score: '9.2' },
      ].map((item) => (
        <div key={item.label} className="rounded-lg border border-border/60 bg-muted/30 px-3 py-2 flex items-center justify-between">
          <span>{item.label}</span>
          <span className="font-semibold text-primary">{item.score}</span>
        </div>
      ))}
    </div>
    <div className="text-[11px] text-muted-foreground">
      Auto-coaching ready • Notes posted to ticket
    </div>
  </div>
);
