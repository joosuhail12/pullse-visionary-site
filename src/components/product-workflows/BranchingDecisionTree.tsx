'use client';

import { motion } from 'framer-motion';
import { GitBranch, Crown, DollarSign, CheckCircle, XCircle } from 'lucide-react';

export default function BranchingDecisionTree() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

      {/* Tree structure */}
      <div className="relative w-full h-full flex flex-col items-center justify-center gap-4">
        {/* Root node - Incoming ticket */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="glass-elevated rounded-lg px-4 py-2 flex items-center gap-2"
          style={{
            borderColor: 'hsl(262 83% 58%)',
            borderWidth: '1px',
          }}
        >
          <GitBranch className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-foreground">New Ticket</span>
        </motion.div>

        {/* Branches container */}
        <div className="flex items-start justify-center gap-6 w-full">
          {/* VIP branch */}
          <div className="flex flex-col items-center gap-2 flex-1 max-w-[140px]">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="h-8 w-px bg-gradient-to-b from-[hsl(330_81%_65%)] to-transparent"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="glass rounded-lg px-3 py-2 flex items-center gap-2 w-full"
              style={{
                borderColor: 'hsl(330 81% 65%)',
                borderWidth: '1px',
                backgroundColor: 'hsl(330 81% 65% / 0.05)',
              }}
            >
              <Crown className="w-3.5 h-3.5" style={{ color: 'hsl(330 81% 65%)' }} />
              <span className="text-[10px] font-semibold text-foreground">VIP Customer</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="glass-elevated rounded-lg px-2 py-1.5 flex items-center gap-1.5"
              style={{
                borderColor: 'hsl(330 81% 65%)',
                borderWidth: '1px',
              }}
            >
              <CheckCircle className="w-3 h-3" style={{ color: 'hsl(330 81% 65%)' }} />
              <span className="text-[10px] text-foreground font-medium">Escalate</span>
            </motion.div>
          </div>

          {/* Refund amount branch */}
          <div className="flex flex-col items-center gap-2 flex-1 max-w-[140px]">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="h-8 w-px bg-gradient-to-b from-[hsl(25_95%_58%)] to-transparent"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="glass rounded-lg px-3 py-2 flex items-center gap-2 w-full"
              style={{
                borderColor: 'hsl(25 95% 58%)',
                borderWidth: '1px',
                backgroundColor: 'hsl(25 95% 58% / 0.05)',
              }}
            >
              <DollarSign className="w-3.5 h-3.5" style={{ color: 'hsl(25 95% 58%)' }} />
              <span className="text-[10px] font-semibold text-foreground">Refund &lt; $50</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, duration: 0.4 }}
              className="glass-elevated rounded-lg px-2 py-1.5 flex items-center gap-1.5"
              style={{
                borderColor: 'hsl(25 95% 58%)',
                borderWidth: '1px',
              }}
            >
              <CheckCircle className="w-3 h-3" style={{ color: 'hsl(25 95% 58%)' }} />
              <span className="text-[10px] text-foreground font-medium">Approve</span>
            </motion.div>
          </div>

          {/* Default branch */}
          <div className="flex flex-col items-center gap-2 flex-1 max-w-[140px]">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="h-8 w-px bg-gradient-to-b from-[hsl(220_13%_60%)] to-transparent"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="glass rounded-lg px-3 py-2 flex items-center gap-2 w-full"
              style={{
                borderColor: 'hsl(220 13% 60%)',
                borderWidth: '1px',
                backgroundColor: 'hsl(220 13% 60% / 0.05)',
              }}
            >
              <span className="text-[10px] font-semibold text-foreground">Other Cases</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="glass-elevated rounded-lg px-2 py-1.5 flex items-center gap-1.5"
              style={{
                borderColor: 'hsl(220 13% 60%)',
                borderWidth: '1px',
              }}
            >
              <XCircle className="w-3 h-3 text-muted-foreground" />
              <span className="text-[10px] text-foreground font-medium">Review</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
