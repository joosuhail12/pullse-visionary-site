'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AutoResponseExamples() {
  const [showResponse, setShowResponse] = useState(false);
  const [showTyping, setShowTyping] = useState(false);

  useEffect(() => {
    // Sequence: show question → typing → response
    const typingTimer = setTimeout(() => setShowTyping(true), 800);
    const responseTimer = setTimeout(() => {
      setShowTyping(false);
      setShowResponse(true);
    }, 2000);

    // Reset and loop
    const resetTimer = setTimeout(() => {
      setShowResponse(false);
      setShowTyping(false);
    }, 6000);

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(responseTimer);
      clearTimeout(resetTimer);
    };
  }, [showResponse]);

  return (
    <div className="relative w-full h-full flex flex-col gap-3 p-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

      {/* Header */}
      <div className="relative text-xs font-semibold text-muted-foreground uppercase tracking-wide">
        Auto-Response
      </div>

      {/* Chat interface */}
      <div className="relative flex-1 flex flex-col gap-2 justify-center">
        {/* Customer question */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass rounded-lg p-3 flex items-start gap-2 self-start max-w-[85%]"
          style={{
            borderColor: 'hsl(190 95% 42%)',
            borderWidth: '1px',
          }}
        >
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, hsl(190 95% 42%), hsl(190 95% 55%))',
            }}
          >
            <User className="w-3 h-3 text-white" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-semibold text-foreground mb-1">Customer</div>
            <p className="text-xs text-foreground/90 leading-relaxed">
              Where&apos;s my order #12847?
            </p>
          </div>
        </motion.div>

        {/* Typing indicator */}
        <AnimatePresence>
          {showTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="glass rounded-lg p-3 flex items-center gap-2 self-end max-w-[85%]"
              style={{
                borderColor: 'hsl(262 83% 58%)',
                borderWidth: '1px',
                borderStyle: 'dashed',
              }}
            >
              <Bot className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground italic">AI is typing...</span>
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
                    className="w-1 h-1 rounded-full bg-primary"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Auto-generated response */}
        <AnimatePresence>
          {showResponse && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
              className="glass-elevated rounded-lg p-3 flex items-start gap-2 self-end max-w-[85%]"
              style={{
                borderColor: 'hsl(262 83% 58%)',
                borderWidth: '1px',
                backgroundColor: 'hsl(262 83% 58% / 0.05)',
              }}
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, hsl(262 83% 58%), hsl(280 83% 65%))',
                }}
              >
                <Bot className="w-3 h-3 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-foreground">AI Agent</span>
                  <Sparkles className="w-3 h-3 text-primary" />
                </div>
                <p className="text-xs text-foreground/90 leading-relaxed">
                  Your order #12847 shipped yesterday via FedEx!
                  Tracking: <span className="font-mono text-primary">FDX9876543210</span>
                  <br />
                  Expected delivery: Tomorrow by 8pm.
                </p>
                <div className="mt-2 text-[10px] text-muted-foreground italic">
                  Auto-generated from Shopify data
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
