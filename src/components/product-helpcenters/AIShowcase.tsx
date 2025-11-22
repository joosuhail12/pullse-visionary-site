'use client';

import { useState } from 'react';
import { Wand2, Search, MessageCircle, CheckCircle2, Sparkles, BarChart3, Wifi, Bot } from 'lucide-react';

const tabs = [
  {
    icon: Wand2,
    title: 'AI Writing & Optimization',
    content: 'AI co-authors and polishes articles—tone, clarity, SEO, and structure—so every writer ships faster.',
    type: 'writing',
  },
  {
    icon: Search,
    title: 'Content Gap Analysis',
    content: 'Surface unanswered searches and customer questions. Know what to write next, prioritized automatically.',
    type: 'gap',
  },
  {
    icon: MessageCircle,
    title: 'Pullse Chatbot Integration',
    content: 'Chatbot pulls instant answers from Appo. Agents and bots stay in sync—no extra setup.',
    type: 'chatbot',
  },
];

const WritingPreview = () => (
  <div className="space-y-3">
    <div className="rounded-lg border border-border/60 bg-white/90 px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
        <span>Article</span>
        <span className="flex items-center gap-1 text-primary font-semibold">
          <Sparkles className="h-4 w-4" /> AI suggestions on
        </span>
      </div>
      <div className="mt-2 space-y-1 text-sm text-foreground">
        <p className="font-semibold">Getting Started</p>
        <p className="text-muted-foreground text-xs">Intro · Setup · Best practices</p>
      </div>
    </div>
    <div className="rounded-lg border border-primary/30 bg-gradient-to-r from-[#FEE3AC]/40 via-white to-white px-4 py-4 shadow-sm space-y-2 text-sm">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <p className="font-semibold text-foreground">AI rewrite</p>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed">
        “Appo is a hub for all your support docs. It keeps articles on-brand, clear, and easy to find.”
      </p>
      <div className="flex gap-2">
        {['Tone', 'Clarity', 'SEO'].map((pill) => (
          <span key={pill} className="rounded-full bg-primary/10 text-primary px-2 py-1 text-[11px] font-semibold">
            {pill}
          </span>
        ))}
      </div>
    </div>
    <div className="rounded-lg border border-border/60 bg-muted/30 px-3 py-2 text-[12px] text-foreground">
      <div className="flex items-center gap-1 text-muted-foreground mb-1">
        <BarChart3 className="h-3.5 w-3.5" /> Readability snapshot
      </div>
      <div className="flex items-center gap-3 text-[11px]">
        <span className="font-semibold text-foreground">78/100</span>
        <span className="text-muted-foreground">Grade 8 · Scan-friendly</span>
      </div>
    </div>
  </div>
);

const GapPreview = () => (
  <div className="space-y-3">
    <div className="rounded-lg border border-border/60 bg-white/90 px-4 py-3 shadow-sm">
      <p className="text-[11px] font-semibold text-muted-foreground mb-1">Top unanswered searches</p>
      <div className="space-y-1">
        {['Refund status on custom plans', 'How to connect Shopify', 'Export billing statements'].map((q) => (
          <div key={q} className="flex items-center justify-between rounded-md bg-muted/40 px-3 py-2 text-[12px]">
            <span className="text-foreground">{q}</span>
            <span className="text-primary text-[11px] font-semibold">Write</span>
          </div>
        ))}
      </div>
    </div>
    <div className="rounded-lg border border-primary/30 bg-gradient-to-r from-[#FFB633]/20 via-white to-white px-4 py-3 shadow-sm">
      <p className="text-[11px] font-semibold text-muted-foreground mb-1">Impact forecast</p>
      <div className="text-sm text-foreground">+14% deflection expected once articles are published</div>
    </div>
  </div>
);

const ChatbotPreview = () => (
  <div className="space-y-3">
    <div className="rounded-lg border border-border/60 bg-white/90 px-4 py-3 shadow-sm">
      <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
        <Bot className="h-4 w-4 text-primary" />
        In-chat answer (Pullse chatbot)
      </div>
      <div className="mt-2 space-y-2 text-sm">
        <p className="rounded-lg bg-muted/40 px-3 py-2">“How do I reset my password?”</p>
        <div className="rounded-lg border border-primary/30 bg-gradient-to-r from-primary/10 to-white px-3 py-2">
          <p className="text-foreground">“Head to Settings → Security → Reset password. We’ll email you a link.”</p>
          <div className="mt-2 flex flex-wrap gap-1 text-[11px] text-primary">
            <span className="rounded-full bg-primary/10 px-2 py-0.5">Cited: Reset Password</span>
            <span className="rounded-full bg-primary/10 px-2 py-0.5">Updated 2d ago</span>
          </div>
        </div>
      </div>
    </div>
    <div className="rounded-lg border border-border/60 bg-muted/30 px-3 py-2 text-[12px] text-foreground">
      <div className="flex items-center gap-1 text-muted-foreground mb-1">
        <Wifi className="h-3.5 w-3.5" /> Real-time sync
      </div>
      <p>New Appo articles instantly available to the chatbot—no indexing delay.</p>
    </div>
  </div>
);

export default function AIShowcase() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid lg:grid-cols-2 gap-6 md:gap-7 lg:gap-8 items-start">
      <div className="order-2 lg:order-1 space-y-3">
        {tabs.map((tab, idx) => {
          const Icon = tab.icon;
          const isActive = idx === active;
          return (
            <div key={tab.title} className="group">
              <button
                type="button"
                onClick={() => setActive(idx)}
                className={`w-full text-left rounded-xl border transition-all ${
                  isActive
                    ? 'border-[#F28D1B]/50 bg-gradient-to-r from-[#F28D1B]/15 to-[#FFB633]/5 shadow-lg'
                    : 'border-border/40 bg-card/80 hover:border-[#F28D1B]/30 hover:bg-card'
                }`}
              >
                <div className="flex items-center gap-3 p-3.5 md:p-4">
                  <div className={`flex h-9 w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#F28D1B] to-[#FFB633] text-white shadow-lg transition-all ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                    <Icon className="h-4.5 w-4.5 md:h-5 md:w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-sm font-bold transition-colors ${isActive ? 'text-[#F28D1B]' : 'text-foreground group-hover:text-[#F28D1B]'}`}>
                      {tab.title}
                    </h3>
                  </div>
                  <div className={`text-[#F28D1B] transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`}>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>
              {isActive && (
                <div className="mt-2 rounded-xl border border-[#F28D1B]/20 bg-gradient-to-br from-[#FEE3AC]/10 to-transparent backdrop-blur-sm p-4 md:p-5 animate-in fade-in slide-in-from-top-2 duration-300">
                  <p className="text-sm text-muted-foreground leading-relaxed">{tab.content}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="order-1 lg:order-2 fade-in-up">
        <div className="relative max-w-xl mx-auto">
          <div className="absolute -inset-4 bg-gradient-to-br from-[#F28D1B]/18 via-[#FFB633]/10 to-transparent blur-3xl opacity-60" />
          <div className="relative rounded-2xl border border-[#F28D1B]/30 bg-gradient-to-br from-[#FEE3AC]/15 via-card to-card p-4 shadow-xl">
            {active === 0 && <WritingPreview />}
            {active === 1 && <GapPreview />}
            {active === 2 && <ChatbotPreview />}
          </div>
        </div>
      </div>
    </div>
  );
}
