'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const tones = ['Professional', 'Friendly', 'Concise'] as const;
type Tone = typeof tones[number];

const originalText = "Hey, I can't find my order. Where is it?";

const rewrittenTexts: Record<Tone, string> = {
  Professional: "I would like to inquire about the status of my order. Could you please provide an update on its current location?",
  Friendly: "Hi there! I'm having trouble tracking down my order. Could you help me locate it? Thanks!",
  Concise: "Order status? Need tracking information.",
};

const AIRewritingDemo = () => {
  const [activeTone, setActiveTone] = useState<Tone>('Professional');
  const [isRewriting, setIsRewriting] = useState(false);
  const [displayedText, setDisplayedText] = useState(rewrittenTexts[activeTone]);

  useEffect(() => {
    setIsRewriting(true);
    const timer = setTimeout(() => {
      setDisplayedText(rewrittenTexts[activeTone]);
      setIsRewriting(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [activeTone]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-card via-card to-card p-6 shadow-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,hsl(var(--primary)/0.12),transparent_45%),radial-gradient(circle_at_80%_8%,hsl(var(--primary)/0.08),transparent_40%)]" />
      {/* Header */}
      <div className="relative mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Sparkles className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-sm font-bold text-foreground">AI Rewriting</h3>
            <p className="text-[11px] text-muted-foreground">Refine tone with one click</p>
          </div>
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">Live preview</span>
      </div>

      {/* Tone selectors */}
      <div className="relative mb-4 flex gap-2">
        {tones.map((tone) => (
          <button
            key={tone}
            onClick={() => setActiveTone(tone)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              activeTone === tone
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {tone}
          </button>
        ))}
      </div>

      {/* Split view: Original | Rewritten */}
      <div className="grid grid-cols-2 gap-4">
        {/* Original text */}
        <div className="rounded-lg border border-border/50 bg-background/80 p-4">
          <p className="mb-2 text-xs font-semibold text-muted-foreground">Original</p>
          <p className="text-sm text-foreground/80">{originalText}</p>
        </div>

        {/* Rewritten text */}
        <div className="relative rounded-lg border border-primary/30 bg-gradient-to-br from-primary/10 to-accent-teal/10 p-4 shadow-sm">
          <p className="mb-2 text-xs font-semibold text-primary">Rewritten</p>

          <AnimatePresence mode="wait">
            {isRewriting ? (
              <motion.div
                key="shimmer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-2"
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="h-3 w-full rounded"
                    style={{
                      background: 'linear-gradient(90deg, hsl(var(--muted)) 0%, hsl(var(--primary) / 0.3) 50%, hsl(var(--muted)) 100%)',
                      backgroundSize: '200% 100%',
                    }}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.p
                key={displayedText}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-sm text-foreground"
              >
                {displayedText}
              </motion.p>
            )}
          </AnimatePresence>

          {/* AI indicator */}
          {isRewriting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute right-3 top-3"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="h-4 w-4 text-primary" />
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer stats */}
      <div className="mt-4 flex items-center justify-between rounded-lg border border-border/30 bg-muted/30 px-4 py-2 text-xs">
        <span className="text-muted-foreground">Tone: <span className="font-semibold text-foreground">{activeTone}</span></span>
        <span className="text-muted-foreground">Processing: <span className="font-semibold text-primary">0.3s</span></span>
      </div>
    </div>
  );
};

export default AIRewritingDemo;
