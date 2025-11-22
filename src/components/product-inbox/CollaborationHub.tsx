'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AtSign, User, Clock, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Message {
  id: number;
  sender: string;
  message: string;
  timestamp: string;
  color: string;
  hasMention?: boolean;
}

const messages: Message[] = [
  {
    id: 1,
    sender: 'Sarah',
    message: '@Mike can you check the refund policy for this customer?',
    timestamp: '2m ago',
    color: 'hsl(330 81% 65%)',
    hasMention: true,
  },
  {
    id: 2,
    sender: 'Mike',
    message: 'Sure! Policy allows refunds within 30 days. This qualifies.',
    timestamp: '1m ago',
    color: 'hsl(25 95% 58%)',
  },
  {
    id: 3,
    sender: 'Alex',
    message: '@Sarah I\'ve added customer context notes for next time',
    timestamp: 'Just now',
    color: 'hsl(190 95% 42%)',
    hasMention: true,
  },
];

const activities = [
  { action: 'Assigned to Sarah', time: '5m ago', color: 'hsl(330 81% 65%)' },
  { action: 'Priority updated', time: '3m ago', color: 'hsl(25 95% 58%)' },
  { action: 'Tags added', time: '1m ago', color: 'hsl(190 95% 42%)' },
];

export default function CollaborationHub() {
  const [showTyping, setShowTyping] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);

  useEffect(() => {
    // Animate messages appearing one by one
    messages.forEach((_, index) => {
      setTimeout(() => {
        setVisibleMessages((prev) => [...prev, index]);
      }, index * 800);
    });

    // Show typing indicator periodically
    const typingInterval = setInterval(() => {
      setShowTyping(true);
      setTimeout(() => setShowTyping(false), 2000);
    }, 6000);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="relative w-full h-full flex gap-3 p-4 overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-card via-card to-card shadow-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,hsl(var(--primary)/0.12),transparent_45%),radial-gradient(circle_at_80%_8%,hsl(var(--primary)/0.08),transparent_40%)]" />

      {/* Main collaboration panel */}
      <div className="relative flex-1 flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Internal Notes
          </div>
          <div className="text-[10px] text-muted-foreground">{messages.length} messages</div>
        </div>

        {/* Messages thread */}
        <div className="flex-1 space-y-2 overflow-hidden">
          <AnimatePresence>
            {messages.map((msg, index) => (
              visibleMessages.includes(index) && (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
                  className="glass rounded-lg p-3"
                  style={{
                    borderColor: msg.hasMention ? msg.color : 'hsl(220 13% 91%)',
                    borderWidth: '1px',
                  }}
                >
                  <div className="flex items-start gap-2">
                    {/* Avatar */}
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${msg.color}, hsl(262 83% 58%))`,
                      }}
                    >
                      <User className="w-3 h-3 text-white" />
                    </div>

                    {/* Message content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-foreground">
                          {msg.sender}
                        </span>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          {msg.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-foreground/90 leading-relaxed break-words">
                        {msg.message.split('@').map((part, i) => {
                          if (i === 0) return part;
                          const mentionEnd = part.indexOf(' ');
                          const mention = part.substring(0, mentionEnd);
                          const rest = part.substring(mentionEnd);
                          return (
                            <span key={i}>
                              <span className="text-primary font-semibold">@{mention}</span>
                              {rest}
                            </span>
                          );
                        })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          <AnimatePresence>
            {showTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="glass rounded-lg p-3 border border-dashed"
                style={{ borderColor: 'hsl(152 69% 45%)' }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, hsl(152 69% 45%), hsl(262 83% 58%))',
                    }}
                  >
                    <User className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-xs text-muted-foreground italic">
                    Jordan is typing...
                  </span>
                  <div className="flex gap-1 ml-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{
                          y: [0, -4, 0],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.15,
                        }}
                        className="w-1 h-1 rounded-full bg-muted-foreground"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Collision detection alert */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.4 }}
          className="glass-elevated rounded-lg p-2.5 flex items-center gap-2"
          style={{
            borderColor: 'hsl(25 95% 58%)',
            borderWidth: '1px',
            backgroundColor: 'hsl(25 95% 58% / 0.05)',
          }}
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0" style={{ color: 'hsl(25 95% 58%)' }} />
          <span className="text-xs font-medium text-foreground">
            Sarah is also viewing this ticket
          </span>
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2 h-2 rounded-full ml-auto"
            style={{ backgroundColor: 'hsl(25 95% 58%)' }}
          />
        </motion.div>
      </div>

      {/* Activity timeline sidebar */}
      <div className="w-[100px] flex flex-col gap-2">
        <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">
          Activity
        </div>
        <div className="flex-1 space-y-2">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + index * 0.2, duration: 0.3 }}
              className="relative pl-3 border-l-2"
              style={{ borderColor: activity.color }}
            >
              <div
                className="absolute left-0 top-0 w-1.5 h-1.5 rounded-full -translate-x-[5px]"
                style={{ backgroundColor: activity.color }}
              />
              <div className="text-[10px] text-foreground font-medium leading-tight mb-0.5">
                {activity.action}
              </div>
              <div className="text-[9px] text-muted-foreground">{activity.time}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
