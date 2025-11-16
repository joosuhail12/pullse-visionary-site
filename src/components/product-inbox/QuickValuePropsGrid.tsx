'use client';

import { motion } from 'framer-motion';
import { Mail, Sparkles, Zap, Clock } from 'lucide-react';

const quickProps = [
  { icon: Mail, title: 'Email & Live Chat', description: 'Two channels, one inbox' },
  { icon: Sparkles, title: 'AI writes replies', description: '5x faster responses' },
  { icon: Zap, title: '100% auto-routing', description: 'Zero manual assignment' },
  { icon: Clock, title: '2-week setup', description: 'Not 6 months' },
];

export default function QuickValuePropsGrid() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {quickProps.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-all hover:border-primary/40 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 transition-all group-hover:scale-110">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
