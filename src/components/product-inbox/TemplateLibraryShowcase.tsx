'use client';

import { motion } from 'framer-motion';
import { FileText, TrendingUp } from 'lucide-react';

interface Template {
  id: string;
  title: string;
  category: string;
  preview: string;
  usageCount: number;
  color: string;
}

const templates: Template[] = [
  {
    id: '1',
    title: 'Warm Greeting',
    category: 'Greeting',
    preview: 'Hi {{customer_name}}! Thanks for reaching out to us. How can I help you today?',
    usageCount: 342,
    color: 'hsl(142 76% 36%)', // Green
  },
  {
    id: '2',
    title: 'Shipping Update',
    category: 'Shipping',
    preview: 'Your order {{order_id}} is on its way! Expected delivery: {{delivery_date}}.',
    usageCount: 287,
    color: 'hsl(217 91% 60%)', // Blue
  },
  {
    id: '3',
    title: 'Refund Confirmation',
    category: 'Refund',
    preview: 'Your refund of {{amount}} has been processed. You should see it in 3-5 business days.',
    usageCount: 156,
    color: 'hsl(0 84% 60%)', // Red
  },
  {
    id: '4',
    title: 'Account Help',
    category: 'Account',
    preview: 'I can help you with your account. To reset your password, click this link: {{reset_link}}',
    usageCount: 203,
    color: 'hsl(280 83% 58%)', // Purple
  },
  {
    id: '5',
    title: 'Product Question',
    category: 'Product',
    preview: 'Great question about {{product_name}}! Here are the details you were looking for...',
    usageCount: 189,
    color: 'hsl(24 95% 53%)', // Orange
  },
  {
    id: '6',
    title: 'Follow-up',
    category: 'Follow-up',
    preview: 'Just checking in to see if you need any additional help with {{issue_topic}}.',
    usageCount: 94,
    color: 'hsl(173 80% 40%)', // Teal
  },
];

const TemplateLibraryShowcase = () => {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-card via-card to-card p-6 shadow-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,hsl(var(--primary)/0.12),transparent_50%),radial-gradient(circle_at_82%_12%,hsl(var(--primary)/0.08),transparent_50%)]" />
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="text-sm font-bold text-foreground">Template Library</h3>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <TrendingUp className="h-3 w-3" />
          <span>Most used</span>
        </div>
      </div>

      {/* Templates grid */}
      <div className="grid grid-cols-2 gap-3">
        {templates.map((template, idx) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="group relative cursor-pointer overflow-hidden rounded-lg border border-border/60 bg-background/80 p-3 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
          >
            {/* Category badge */}
            <div
              className="mb-2 inline-block rounded-full px-2 py-0.5 text-xs font-semibold"
              style={{
                backgroundColor: `${template.color}20`,
                color: template.color,
              }}
            >
              {template.category}
            </div>

            {/* Template title */}
            <h4 className="mb-2 text-sm font-bold text-foreground">{template.title}</h4>

            {/* Preview text with variable highlighting */}
            <p className="mb-3 text-xs leading-relaxed text-muted-foreground line-clamp-2">
              {template.preview.split(/(\{\{[^}]+\}\})/).map((part, i) => {
                if (part.startsWith('{{') && part.endsWith('}}')) {
                  return (
                    <span
                      key={i}
                      className="rounded px-1 font-semibold"
                      style={{
                        backgroundColor: `${template.color}15`,
                        color: template.color,
                      }}
                    >
                      {part}
                    </span>
                  );
                }
                return <span key={i}>{part}</span>;
              })}
            </p>

            {/* Usage count */}
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: template.color }} />
              <span>Used {template.usageCount} times</span>
            </div>

            {/* Hover overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"
            />
          </motion.div>
        ))}
      </div>

      {/* Footer stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-4 flex items-center justify-between rounded-lg border border-border/30 bg-muted/30 px-4 py-2 text-xs"
      >
        <span className="text-muted-foreground">
          Total templates: <span className="font-semibold text-foreground">24</span>
        </span>
        <span className="text-muted-foreground">
          Avg. response time: <span className="font-semibold text-primary">45s</span>
        </span>
      </motion.div>
    </div>
  );
};

export default TemplateLibraryShowcase;
