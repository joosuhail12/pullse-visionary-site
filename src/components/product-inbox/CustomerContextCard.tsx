'use client';

import { motion } from 'framer-motion';
import { User, Building2, ShoppingBag, Clock, DollarSign } from 'lucide-react';

const timelineEvents = [
  { id: 1, type: 'order', label: 'Order #3847', time: '2 hours ago' },
  { id: 2, type: 'support', label: 'Support ticket', time: '1 day ago' },
  { id: 3, type: 'order', label: 'Order #3621', time: '3 days ago' },
  { id: 4, type: 'contact', label: 'First contact', time: '2 weeks ago' },
];

const orders = [
  { id: '3847', status: 'Delivered', amount: '$234' },
  { id: '3621', status: 'In Transit', amount: '$189' },
];

const CustomerContextCard = () => {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-card via-card to-card p-6 shadow-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,hsl(var(--primary)/0.12),transparent_50%),radial-gradient(circle_at_82%_12%,hsl(var(--primary)/0.08),transparent_50%)]" />
      {/* Customer profile header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex items-start gap-4"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent-teal text-white shadow-lg">
          <User className="h-7 w-7" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-bold text-foreground">Sarah Johnson</h3>
          <p className="text-sm text-muted-foreground">sarah.j@techcorp.com</p>
          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
            <Building2 className="h-3 w-3" />
            <span>TechCorp Industries</span>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-full border border-accent-green bg-accent-green/20 px-3 py-1 text-xs font-semibold text-accent-green"
        >
          VIP
        </motion.div>
      </motion.div>

      {/* Quick stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-6 grid grid-cols-2 gap-3"
      >
        <div className="rounded-lg border border-border/50 bg-background/80 p-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <DollarSign className="h-3 w-3" />
            <span>Lifetime Value</span>
          </div>
          <p className="mt-1 text-lg font-bold text-foreground">$12,450</p>
        </div>
        <div className="rounded-lg border border-border/50 bg-background/80 p-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShoppingBag className="h-3 w-3" />
            <span>Total Orders</span>
          </div>
          <p className="mt-1 text-lg font-bold text-foreground">24</p>
        </div>
      </motion.div>

      {/* Recent timeline */}
      <div className="mb-6">
        <p className="mb-3 text-xs font-semibold text-foreground">Recent Activity</p>
        <div className="space-y-2">
          {timelineEvents.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className="flex items-center gap-3 rounded-lg border border-border/30 bg-muted/30 p-2"
            >
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full ${
                  event.type === 'order'
                    ? 'bg-primary/20 text-primary'
                    : event.type === 'support'
                    ? 'bg-accent-orange/20 text-accent-orange'
                    : 'bg-accent-teal/20 text-accent-teal'
                }`}
              >
                <Clock className="h-3 w-3" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-xs font-medium text-foreground">{event.label}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{event.time}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent orders */}
      <div>
        <p className="mb-3 text-xs font-semibold text-foreground">Recent Orders</p>
        <div className="space-y-2">
          {orders.map((order, idx) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + idx * 0.1 }}
              className="flex items-center justify-between rounded-lg border border-border/50 bg-card p-3"
            >
              <div>
                <p className="text-xs font-semibold text-foreground">Order #{order.id}</p>
                <p className="text-xs text-muted-foreground">{order.status}</p>
              </div>
              <p className="text-sm font-bold text-foreground">{order.amount}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerContextCard;
