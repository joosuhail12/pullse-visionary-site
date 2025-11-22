'use client';

import { motion } from 'framer-motion';
import { ArrowRight, User, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Ticket {
  id: number;
  type: string;
  color: string;
}

interface TeamMember {
  name: string;
  color: string;
  specialty: string;
}

const tickets: Ticket[] = [
  { id: 1, type: 'VIP Request', color: 'hsl(330 81% 65%)' },
  { id: 2, type: 'Billing Issue', color: 'hsl(25 95% 58%)' },
  { id: 3, type: 'Tech Support', color: 'hsl(190 95% 42%)' },
  { id: 4, type: 'General Inquiry', color: 'hsl(152 69% 45%)' },
];

const teamMembers: TeamMember[] = [
  { name: 'Sarah', color: 'hsl(330 81% 65%)', specialty: 'VIP' },
  { name: 'Mike', color: 'hsl(25 95% 58%)', specialty: 'Billing' },
  { name: 'Alex', color: 'hsl(190 95% 42%)', specialty: 'Tech' },
  { name: 'Jordan', color: 'hsl(152 69% 45%)', specialty: 'General' },
];

export default function RoutingVisualization() {
  const [activeTicket, setActiveTicket] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTicket((prev) => (prev + 1) % tickets.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-card via-card to-card shadow-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,hsl(var(--primary)/0.12),transparent_45%),radial-gradient(circle_at_80%_8%,hsl(var(--primary)/0.08),transparent_40%)]" />

      {/* Main content container */}
      <div className="relative w-full h-full flex items-center justify-between gap-8">
        {/* Inbox side - Ticket queue */}
        <div className="flex-shrink-0 flex flex-col gap-3">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Inbox
          </div>
          {tickets.map((ticket, index) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: index === activeTicket ? 1 : 0.3,
                x: 0,
                scale: index === activeTicket ? 1.05 : 1,
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-lg p-3 min-w-[120px]"
              style={{
                borderColor: index === activeTicket ? ticket.color : 'hsl(220 13% 91%)',
                borderWidth: index === activeTicket ? '2px' : '1px',
              }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: ticket.color }}
                />
                <span className="text-xs font-medium text-foreground truncate">
                  {ticket.type}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Animated connection lines */}
        <div className="flex-1 relative flex items-center justify-center">
          <motion.div
            key={activeTicket}
            className="flex items-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Routing rule badge */}
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="glass-elevated rounded-full px-4 py-2 flex items-center gap-2"
              style={{
                borderColor: tickets[activeTicket].color,
                borderWidth: '1px',
              }}
            >
              <Zap className="w-4 h-4" style={{ color: tickets[activeTicket].color }} />
              <span className="text-xs font-semibold text-foreground whitespace-nowrap">
                Auto-Route
              </span>
            </motion.div>

            {/* Animated arrow */}
            <motion.div
              animate={{
                x: [0, 10, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <ArrowRight
                className="w-6 h-6"
                style={{ color: tickets[activeTicket].color }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Team members side */}
        <div className="flex-shrink-0 flex flex-col gap-3">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Team
          </div>
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{
                opacity: index === activeTicket ? 1 : 0.3,
                x: 0,
                scale: index === activeTicket ? 1.05 : 1,
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-lg p-3 flex items-center gap-3 min-w-[120px]"
              style={{
                borderColor: index === activeTicket ? member.color : 'hsl(220 13% 91%)',
                borderWidth: index === activeTicket ? '2px' : '1px',
              }}
            >
              {/* Avatar */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${member.color}, hsl(262 83% 58%))`,
                }}
              >
                <User className="w-4 h-4 text-white" />
              </div>

              {/* Name and specialty */}
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-foreground">{member.name}</div>
                <div className="text-[10px] text-muted-foreground">{member.specialty}</div>
              </div>

              {/* Active indicator */}
              {index === activeTicket && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: member.color }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
