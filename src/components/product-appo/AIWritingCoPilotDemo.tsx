'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, TrendingUp, Check } from 'lucide-react';
import { useState, useEffect } from 'react';

type RewriteState = 'before' | 'rewriting' | 'after';

const AIWritingCoPilotDemo = () => {
  const [rewriteState, setRewriteState] = useState<RewriteState>('before');
  const [selectedTone, setSelectedTone] = useState<string>('professional');

  const beforeText = 'Our help center lets you make knowledge bases for your customers and team members to use.';
  const afterText = 'Empower your customers and team with comprehensive, searchable knowledge bases that streamline support and drive self-service success.';

  const tones = [
    { id: 'professional', label: 'Professional', color: '#F28D1B' },
    { id: 'casual', label: 'Casual', color: '#10B981' },
    { id: 'technical', label: 'Technical', color: '#3B82F6' },
  ];

  const actions = [
    { id: 'clarity', label: 'Improve clarity', icon: Sparkles },
    { id: 'seo', label: 'Optimize SEO', icon: TrendingUp },
    { id: 'shorten', label: 'Make concise', icon: Zap },
  ];

  // Auto-cycle through states
  useEffect(() => {
    const timer = setTimeout(() => {
      if (rewriteState === 'before') {
        setRewriteState('rewriting');
        setTimeout(() => setRewriteState('after'), 1500);
      } else if (rewriteState === 'after') {
        setTimeout(() => setRewriteState('before'), 3000);
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, [rewriteState]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-br from-background via-accent-green/5 to-background p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="text-sm font-bold text-foreground">AI Writing Co-Pilot</h3>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Zap className="h-3 w-3" />
          <span>Real-time</span>
        </div>
      </div>

      {/* Tone Selector */}
      <div className="mb-4 flex gap-2">
        {tones.map((tone) => (
          <button
            key={tone.id}
            onClick={() => setSelectedTone(tone.id)}
            className={`flex-1 rounded-lg border px-3 py-2 text-xs font-semibold transition-all ${
              selectedTone === tone.id
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border/50 bg-card text-muted-foreground hover:border-primary/30'
            }`}
          >
            {tone.label}
          </button>
        ))}
      </div>

      {/* Text Comparison */}
      <div className="mb-4 overflow-hidden rounded-xl border border-border/50 bg-card shadow-lg">
        <div className="grid grid-cols-2 divide-x divide-border/50">
          {/* Before */}
          <div className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground">Original</span>
              <div className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                6.2/10
              </div>
            </div>
            <p className="text-sm leading-relaxed text-foreground">{beforeText}</p>
          </div>

          {/* After */}
          <div className="relative p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold text-primary">AI Enhanced</span>
              <div className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                <TrendingUp className="h-3 w-3" />
                8.7/10
              </div>
            </div>

            <AnimatePresence mode="wait">
              {rewriteState === 'rewriting' ? (
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
                        backgroundPosition: ['200% 0', '-200% 0'],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: i * 0.1,
                      }}
                      className="h-3 rounded"
                      style={{
                        background:
                          'linear-gradient(90deg, hsl(var(--muted)) 0%, hsl(var(--primary) / 0.2) 50%, hsl(var(--muted)) 100%)',
                        backgroundSize: '200% 100%',
                      }}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.p
                  key="text"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-sm leading-relaxed text-foreground"
                >
                  {rewriteState === 'after' ? afterText : beforeText}
                </motion.p>
              )}
            </AnimatePresence>

            {/* AI Tooltip */}
            <AnimatePresence>
              {rewriteState === 'after' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-primary px-2 py-1 text-xs font-semibold text-white shadow-lg"
                >
                  <Check className="h-3 w-3" />
                  Enhanced
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-2">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden rounded-lg border border-border/50 bg-card p-3 transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div
                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
              />
              <div className="relative flex items-center gap-2">
                <Icon className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold text-foreground">{action.label}</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Footer Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-4 rounded-lg border border-border/30 bg-muted/20 px-3 py-2 text-center"
      >
        <p className="text-xs text-muted-foreground">
          +40% readability improvement • +3 keywords added
        </p>
      </motion.div>
    </div>
  );
};

export default AIWritingCoPilotDemo;
