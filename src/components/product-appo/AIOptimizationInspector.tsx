'use client';

import { motion } from 'framer-motion';
import { Gauge, TrendingUp, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Suggestion {
  id: string;
  type: 'warning' | 'success' | 'info';
  category: string;
  text: string;
  icon: typeof AlertTriangle;
}

const AIOptimizationInspector = () => {
  const [readabilityScore, setReadabilityScore] = useState(0);
  const [seoScore, setSeoScore] = useState(0);

  const targetReadability = 65;
  const targetSeo = 78;

  const suggestions: Suggestion[] = [
    {
      id: '1',
      type: 'warning',
      category: 'Structure',
      text: 'Add 2 more H2 headings for better organization',
      icon: AlertTriangle,
    },
    {
      id: '2',
      type: 'success',
      category: 'SEO',
      text: 'Keyword density is optimal (2.3%)',
      icon: CheckCircle2,
    },
    {
      id: '3',
      type: 'info',
      category: 'Clarity',
      text: 'Consider breaking up long paragraphs',
      icon: Lightbulb,
    },
    {
      id: '4',
      type: 'warning',
      category: 'Content Gap',
      text: 'Missing troubleshooting section',
      icon: AlertTriangle,
    },
  ];

  const metrics = [
    { label: 'Word Count', value: '1,247', trend: '+145' },
    { label: 'Reading Time', value: '4 min', trend: '—' },
    { label: 'Links', value: '8', trend: '+2' },
  ];

  // Animate scores
  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOutQuad = 1 - Math.pow(1 - progress, 3);

      setReadabilityScore(Math.floor(targetReadability * easeOutQuad));
      setSeoScore(Math.floor(targetSeo * easeOutQuad));

      if (currentStep >= steps) {
        clearInterval(timer);
        setReadabilityScore(targetReadability);
        setSeoScore(targetSeo);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 70) return { color: '#10B981', label: 'Good' };
    if (score >= 50) return { color: '#F59E0B', label: 'Fair' };
    return { color: '#EF4444', label: 'Poor' };
  };

  const readabilityColor = getScoreColor(readabilityScore);
  const seoColor = getScoreColor(seoScore);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-br from-background via-accent-green/5 to-background p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gauge className="h-5 w-5 text-primary" />
          <h3 className="text-sm font-bold text-foreground">AI Content Inspector</h3>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <TrendingUp className="h-3 w-3" />
          <span>Analyzing</span>
        </div>
      </div>

      {/* Score Gauges */}
      <div className="mb-4 grid grid-cols-2 gap-3">
        {/* Readability Score */}
        <div className="relative overflow-hidden rounded-xl border border-border/50 bg-card p-4 shadow-sm">
          <div className="mb-2 text-xs font-medium text-muted-foreground">Readability</div>
          <div className="relative mb-2">
            <svg className="h-20 w-20" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="8"
              />
              {/* Progress circle */}
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={readabilityColor.color}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - readabilityScore / 100)}`}
                transform="rotate(-90 50 50)"
                initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - readabilityScore / 100) }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                key={readabilityScore}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-2xl font-bold"
                style={{ color: readabilityColor.color }}
              >
                {readabilityScore}
              </motion.span>
              <span className="text-xs text-muted-foreground">/100</span>
            </div>
          </div>
          <div
            className="inline-flex rounded-full px-2 py-0.5 text-xs font-semibold"
            style={{ backgroundColor: `${readabilityColor.color}20`, color: readabilityColor.color }}
          >
            {readabilityColor.label}
          </div>
        </div>

        {/* SEO Score */}
        <div className="relative overflow-hidden rounded-xl border border-border/50 bg-card p-4 shadow-sm">
          <div className="mb-2 text-xs font-medium text-muted-foreground">SEO Score</div>
          <div className="relative mb-2">
            <svg className="h-20 w-20" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="8"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={seoColor.color}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - seoScore / 100)}`}
                transform="rotate(-90 50 50)"
                initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - seoScore / 100) }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                key={seoScore}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-2xl font-bold"
                style={{ color: seoColor.color }}
              >
                {seoScore}
              </motion.span>
              <span className="text-xs text-muted-foreground">/100</span>
            </div>
          </div>
          <div
            className="inline-flex rounded-full px-2 py-0.5 text-xs font-semibold"
            style={{ backgroundColor: `${seoColor.color}20`, color: seoColor.color }}
          >
            {seoColor.label}
          </div>
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="mb-4 grid grid-cols-3 gap-2">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-lg border border-border/30 bg-muted/20 p-2 text-center"
          >
            <p className="text-lg font-bold text-foreground">{metric.value}</p>
            <p className="text-xs text-muted-foreground">{metric.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Suggestions List */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-foreground">Suggestions</p>
        <div className="max-h-32 space-y-2 overflow-y-auto">
          {suggestions.map((suggestion, index) => {
            const Icon = suggestion.icon;
            const typeStyles = {
              warning: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-600 dark:text-orange-400', icon: 'text-orange-500' },
              success: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-600 dark:text-green-400', icon: 'text-green-500' },
              info: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-600 dark:text-blue-400', icon: 'text-blue-500' },
            };
            const style = typeStyles[suggestion.type];

            return (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-start gap-2 rounded-lg border p-2 ${style.bg} ${style.border}`}
              >
                <Icon className={`mt-0.5 h-3 w-3 flex-shrink-0 ${style.icon}`} />
                <div className="flex-1">
                  <p className={`text-xs font-semibold ${style.text}`}>{suggestion.category}</p>
                  <p className="text-xs text-muted-foreground">{suggestion.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AIOptimizationInspector;
