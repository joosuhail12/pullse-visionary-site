'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Users, MessageCircle, AlertCircle, User } from 'lucide-react';
import { useState, useEffect } from 'react';

interface CollaboratorCursor {
  id: string;
  name: string;
  color: string;
  x: number;
  y: number;
}

interface Comment {
  id: string;
  author: string;
  text: string;
  color: string;
}

const RealTimeCollaborationVisualizer = () => {
  const [collaborators, setCollaborators] = useState<CollaboratorCursor[]>([
    { id: '1', name: 'Sarah', color: '#10B981', x: 30, y: 25 },
    { id: '2', name: 'John', color: '#3B82F6', x: 60, y: 45 },
    { id: '3', name: 'Alex', color: '#F59E0B', x: 45, y: 70 },
  ]);

  const [showTyping, setShowTyping] = useState(false);
  const [showCollision, setShowCollision] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  // Animate cursors
  useEffect(() => {
    const interval = setInterval(() => {
      setCollaborators((prev) =>
        prev.map((c) => ({
          ...c,
          x: Math.max(10, Math.min(90, c.x + (Math.random() - 0.5) * 20)),
          y: Math.max(10, Math.min(90, c.y + (Math.random() - 0.5) * 20)),
        }))
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Show typing indicator
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTyping(true);
      setTimeout(() => setShowTyping(false), 3000);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Show collision alert
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCollision(true);
      setTimeout(() => setShowCollision(false), 3000);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Add comment
  useEffect(() => {
    const timer = setTimeout(() => {
      setComments([
        {
          id: '1',
          author: 'Sarah',
          text: 'Should we add more examples here?',
          color: '#10B981',
        },
      ]);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-br from-background via-accent-green/5 to-background p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h3 className="text-sm font-bold text-foreground">Real-Time Collaboration</h3>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-600 dark:text-green-400">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span>3 Online</span>
        </div>
      </div>

      {/* Collaboration Canvas */}
      <div className="relative mb-4 h-48 overflow-hidden rounded-xl border border-border/50 bg-card shadow-lg">
        {/* Document Content Mockup */}
        <div className="p-4 space-y-2">
          <div className="h-3 w-3/4 rounded bg-muted/60" />
          <div className="h-3 w-full rounded bg-muted/60" />
          <div className="h-3 w-5/6 rounded bg-muted/60" />
          <div className="h-3 w-full rounded bg-muted/60" />
          <div className="h-3 w-2/3 rounded bg-muted/60" />
        </div>

        {/* Animated Cursors */}
        {collaborators.map((collab) => (
          <motion.div
            key={collab.id}
            animate={{
              left: `${collab.x}%`,
              top: `${collab.y}%`,
            }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            className="absolute pointer-events-none"
          >
            {/* Cursor Icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={collab.color}
              className="drop-shadow-lg"
            >
              <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" />
            </svg>

            {/* Name Label */}
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="ml-5 -mt-4 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-semibold text-white shadow-lg"
              style={{ backgroundColor: collab.color }}
            >
              {collab.name}
            </motion.div>
          </motion.div>
        ))}

        {/* Inline Comments */}
        <AnimatePresence>
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, scale: 0.9, x: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute left-4 top-1/2 flex items-start gap-2 rounded-lg border bg-card p-2 shadow-xl"
              style={{ borderColor: comment.color }}
            >
              <MessageCircle className="mt-0.5 h-3 w-3 flex-shrink-0" style={{ color: comment.color }} />
              <div className="text-xs">
                <p className="font-semibold" style={{ color: comment.color }}>
                  {comment.author}
                </p>
                <p className="text-muted-foreground">{comment.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Collision Detection Alert */}
        <AnimatePresence>
          {showCollision && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-4 top-4 flex items-center gap-2 rounded-lg border border-orange-500/30 bg-orange-500/10 px-3 py-2 shadow-lg"
            >
              <AlertCircle className="h-4 w-4 text-orange-500" />
              <p className="text-xs font-semibold text-orange-600 dark:text-orange-400">
                John is also editing this section
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Presence Indicators */}
      <div className="mb-4 flex items-center gap-2">
        {collaborators.map((collab) => (
          <motion.div
            key={collab.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-1.5 rounded-full border border-border/50 bg-card px-2 py-1 shadow-sm"
          >
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: collab.color }}
            />
            <span className="text-xs font-semibold text-foreground">{collab.name}</span>
          </motion.div>
        ))}
      </div>

      {/* Typing Indicator */}
      <AnimatePresence>
        {showTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-center gap-2 rounded-lg border border-border/30 bg-muted/20 px-3 py-2"
          >
            <User className="h-4 w-4 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold" style={{ color: '#10B981' }}>
                Sarah
              </span>{' '}
              is typing...
            </p>
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="ml-auto flex gap-1"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
              <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
              <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      {!showTyping && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-lg border border-border/30 bg-muted/20 px-3 py-2 text-center"
        >
          <p className="text-xs text-muted-foreground">
            Live cursors • Inline comments • Conflict detection
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default RealTimeCollaborationVisualizer;
