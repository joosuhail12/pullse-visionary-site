'use client';

import { motion } from 'framer-motion';
import { ArrowRight, User, Tag } from 'lucide-react';

const routingRules = [
  {
    condition: 'Customer is VIP',
    assignment: 'Sarah Johnson',
    color: 'hsl(330 81% 65%)',
  },
  {
    condition: 'Tag: Billing',
    assignment: 'Mike Chen',
    color: 'hsl(25 95% 58%)',
  },
  {
    condition: 'Tag: Technical',
    assignment: 'Alex Kumar',
    color: 'hsl(190 95% 42%)',
  },
];

export default function SmartRoutingBuilder() {
  return (
    <div className="relative w-full h-full flex flex-col gap-3 p-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

      {/* Header */}
      <div className="relative text-xs font-semibold text-muted-foreground uppercase tracking-wide">
        Routing Rules
      </div>

      {/* Rules list */}
      <div className="relative flex-1 space-y-2">
        {routingRules.map((rule, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.4 }}
            className="glass rounded-lg p-3 flex items-center gap-3 hover:shadow-lg transition-shadow"
            style={{
              borderColor: rule.color,
              borderWidth: '1px',
            }}
          >
            {/* If/When badge */}
            <div
              className="px-2 py-1 rounded text-[10px] font-semibold uppercase tracking-wide flex-shrink-0"
              style={{
                backgroundColor: `${rule.color}15`,
                color: rule.color,
              }}
            >
              If
            </div>

            {/* Condition */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Tag className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
              <span className="text-xs font-medium text-foreground truncate">
                {rule.condition}
              </span>
            </div>

            {/* Arrow */}
            <ArrowRight className="w-4 h-4 flex-shrink-0" style={{ color: rule.color }} />

            {/* Then badge */}
            <div
              className="px-2 py-1 rounded text-[10px] font-semibold uppercase tracking-wide flex-shrink-0"
              style={{
                backgroundColor: `${rule.color}15`,
                color: rule.color,
              }}
            >
              Then
            </div>

            {/* Assignment */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${rule.color}, hsl(262 83% 58%))`,
                }}
              >
                <User className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs font-semibold text-foreground hidden sm:inline">
                {rule.assignment.split(' ')[0]}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add rule button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="relative glass-elevated rounded-lg p-2 flex items-center justify-center gap-2 cursor-pointer hover:bg-primary/5 transition-colors"
      >
        <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="text-primary text-xs font-bold">+</span>
        </div>
        <span className="text-xs font-semibold text-muted-foreground">Add Rule</span>
      </motion.div>
    </div>
  );
}
