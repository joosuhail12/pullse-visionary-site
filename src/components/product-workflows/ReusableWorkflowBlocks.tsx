'use client';

import { motion } from 'framer-motion';
import { Mail, Clock, Filter, Webhook, Database, MessageSquare } from 'lucide-react';

const blocks = [
  {
    name: 'Send Email',
    icon: Mail,
    color: 'hsl(330 81% 65%)',
    uses: 24,
  },
  {
    name: 'Wait Time',
    icon: Clock,
    color: 'hsl(25 95% 58%)',
    uses: 18,
  },
  {
    name: 'Check Condition',
    icon: Filter,
    color: 'hsl(190 95% 42%)',
    uses: 31,
  },
  {
    name: 'API Call',
    icon: Webhook,
    color: 'hsl(152 69% 45%)',
    uses: 12,
  },
  {
    name: 'Update Field',
    icon: Database,
    color: 'hsl(280 83% 65%)',
    uses: 27,
  },
  {
    name: 'Send Message',
    icon: MessageSquare,
    color: 'hsl(210 95% 58%)',
    uses: 19,
  },
];

export default function ReusableWorkflowBlocks() {
  return (
    <div className="relative w-full h-full flex flex-col gap-3 p-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

      {/* Header */}
      <div className="relative flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Block Library
        </span>
        <span className="text-[10px] text-muted-foreground">{blocks.length} blocks</span>
      </div>

      {/* Blocks grid */}
      <div className="relative flex-1 grid grid-cols-2 gap-2 content-start">
        {blocks.map((block, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.3 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="glass rounded-lg p-2.5 flex flex-col items-center gap-2 cursor-grab active:cursor-grabbing h-full"
              style={{
                borderColor: block.color,
                borderWidth: '1px',
              }}
            >
              {/* Icon */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${block.color}, hsl(262 83% 58%))`,
                }}
              >
                <block.icon className="w-4 h-4 text-white" />
              </div>

              {/* Name */}
              <div className="text-[10px] font-semibold text-foreground text-center leading-tight">
                {block.name}
              </div>

              {/* Usage count */}
              <div className="flex items-center gap-1 mt-auto">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: block.color }}
                />
                <span className="text-[9px] text-muted-foreground">
                  {block.uses} workflows
                </span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Drag hint */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="relative glass-elevated rounded-lg px-3 py-1.5 flex items-center justify-center gap-2"
      >
        <div className="flex gap-0.5">
          <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
          <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
          <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
        </div>
        <span className="text-[10px] font-medium text-muted-foreground">
          Drag & drop to use
        </span>
      </motion.div>
    </div>
  );
}
