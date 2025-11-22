'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, CreditCard, Database, ArrowDownToLine } from 'lucide-react';

const integrations = [
  {
    name: 'Shopify',
    data: 'Order History',
    icon: ShoppingBag,
    color: 'hsl(152 69% 45%)',
    value: '247 orders',
  },
  {
    name: 'Stripe',
    data: 'Payment Info',
    icon: CreditCard,
    color: 'hsl(262 83% 58%)',
    value: '$12,847 LTV',
  },
  {
    name: 'Database',
    data: 'Custom Fields',
    icon: Database,
    color: 'hsl(190 95% 42%)',
    value: 'VIP Tier',
  },
];

export default function ContextIntegrationPanel() {
  return (
    <div className="relative w-full h-full flex flex-col gap-3 p-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

      {/* Header */}
      <div className="relative text-xs font-semibold text-muted-foreground uppercase tracking-wide">
        Auto-Load Context
      </div>

      {/* Integration cards */}
      <div className="relative flex-1 flex flex-col gap-2 justify-center">
        {integrations.map((integration, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.4 }}
            className="relative"
          >
            {/* Integration card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="glass rounded-lg p-3 flex items-center gap-3"
              style={{
                borderColor: integration.color,
                borderWidth: '1px',
              }}
            >
              {/* Icon */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${integration.color}, hsl(262 83% 58%))`,
                }}
              >
                <integration.icon className="w-4 h-4 text-white" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-foreground">
                  {integration.name}
                </div>
                <div className="text-[10px] text-muted-foreground">{integration.data}</div>
              </div>

              {/* Loading indicator/value */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + 0.4, duration: 0.3 }}
                className="px-2 py-1 rounded-md text-[10px] font-semibold"
                style={{
                  backgroundColor: `${integration.color}15`,
                  color: integration.color,
                }}
              >
                {integration.value}
              </motion.div>
            </motion.div>

            {/* Animated download arrow */}
            {index < integrations.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + 0.5, duration: 0.3 }}
                className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2"
              >
                <motion.div
                  animate={{
                    y: [0, 4, 0],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                >
                  <ArrowDownToLine
                    className="w-3 h-3"
                    style={{ color: integration.color }}
                  />
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Status footer */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="relative glass-elevated rounded-lg px-3 py-2 flex items-center justify-center gap-2"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="w-2 h-2 rounded-full bg-primary"
        />
        <span className="text-[10px] font-medium text-muted-foreground">
          Context loaded in 0.3s
        </span>
      </motion.div>
    </div>
  );
}
