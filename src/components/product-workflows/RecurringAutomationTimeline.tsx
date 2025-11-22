'use client';

import { motion } from 'framer-motion';
import { Clock, Mail, FileText, MessageCircle, Calendar } from 'lucide-react';

const tasks = [
  {
    time: 'Monday 9am',
    title: 'Weekly Team Report',
    icon: FileText,
    color: 'hsl(330 81% 65%)',
  },
  {
    time: 'Every 2 hours',
    title: 'SLA Check & Alerts',
    icon: Clock,
    color: 'hsl(25 95% 58%)',
  },
  {
    time: 'After 3 days',
    title: 'Follow-up Email',
    icon: Mail,
    color: 'hsl(190 95% 42%)',
  },
  {
    time: 'Daily 6pm',
    title: 'Satisfaction Survey',
    icon: MessageCircle,
    color: 'hsl(152 69% 45%)',
  },
];

export default function RecurringAutomationTimeline() {
  return (
    <div className="relative w-full h-full flex flex-col gap-3 p-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

      {/* Header */}
      <div className="relative flex items-center gap-2 mb-1">
        <Calendar className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Scheduled Tasks
        </span>
      </div>

      {/* Timeline */}
      <div className="relative flex-1 space-y-3">
        {tasks.map((task, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12, duration: 0.4 }}
            className="relative pl-6 flex items-start gap-3"
          >
            {/* Timeline line and dot */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 + 0.2, duration: 0.3 }}
                className="absolute top-2 left-0 w-2 h-2 rounded-full -translate-x-[3.5px]"
                style={{ backgroundColor: task.color }}
              />
            </div>

            {/* Task card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="glass rounded-lg p-2.5 flex items-center gap-2 flex-1 cursor-pointer"
              style={{
                borderColor: task.color,
                borderWidth: '1px',
              }}
            >
              {/* Icon */}
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: `${task.color}15`,
                }}
              >
                <task.icon className="w-3.5 h-3.5" style={{ color: task.color }} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-foreground truncate">
                  {task.title}
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <Clock className="w-2.5 h-2.5 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground">{task.time}</span>
                </div>
              </div>

              {/* Status indicator */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: task.color }}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
