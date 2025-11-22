'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { GripVertical, Heading1, Type, List, Code, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface EditorBlock {
  id: string;
  type: 'heading' | 'paragraph' | 'list' | 'code';
  content: string;
  icon: typeof Heading1;
}

const NotionStyleEditorDemo = () => {
  const [hoveredBlock, setHoveredBlock] = useState<string | null>(null);
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [typingText, setTypingText] = useState('');

  const blocks: EditorBlock[] = [
    { id: '1', type: 'heading', content: 'Getting Started with Appo', icon: Heading1 },
    { id: '2', type: 'paragraph', content: 'This guide will help you understand...', icon: Type },
    { id: '3', type: 'list', content: 'Create your first collection', icon: List },
    { id: '4', type: 'code', content: 'const appo = new AppoSDK()', icon: Code },
  ];

  const slashCommands = [
    { icon: Heading1, label: 'Heading', description: 'Large section heading' },
    { icon: Type, label: 'Text', description: 'Plain text paragraph' },
    { icon: List, label: 'Bulleted List', description: 'Create a simple list' },
    { icon: Code, label: 'Code Block', description: 'Syntax highlighted code' },
    { icon: ImageIcon, label: 'Image', description: 'Upload or embed image' },
  ];

  // Simulated typing effect
  useState(() => {
    const text = 'Type / for commands...';
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setTypingText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowSlashMenu(true), 500);
      }
    }, 80);
    return () => clearInterval(timer);
  });

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-br from-background via-accent-green/5 to-background p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GripVertical className="h-5 w-5 text-primary" />
          <h3 className="text-sm font-bold text-foreground">Block-Based Editor</h3>
        </div>
        <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          Notion-Style
        </div>
      </div>

      {/* Editor Canvas */}
      <div className="mb-4 overflow-hidden rounded-xl border border-border/50 bg-card shadow-lg">
        {/* Toolbar */}
        <div className="flex items-center gap-2 border-b border-border/50 bg-muted/30 px-3 py-2">
          <Heading1 className="h-4 w-4 text-muted-foreground" />
          <Type className="h-4 w-4 text-muted-foreground" />
          <List className="h-4 w-4 text-muted-foreground" />
          <Code className="h-4 w-4 text-muted-foreground" />
          <div className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
            <span>4 blocks</span>
          </div>
        </div>

        {/* Editor Content */}
        <div className="space-y-1 p-4">
          {blocks.map((block, index) => {
            const Icon = block.icon;
            return (
              <motion.div
                key={block.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredBlock(block.id)}
                onMouseLeave={() => setHoveredBlock(null)}
                className="group relative flex items-start gap-2 rounded-lg p-2 transition-all hover:bg-muted/20"
              >
                {/* Drag Handle - Shows on Hover */}
                <div
                  className={`flex-shrink-0 transition-opacity ${
                    hoveredBlock === block.id ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <GripVertical className="h-4 w-4 cursor-grab text-muted-foreground" />
                </div>

                {/* Block Icon */}
                <div
                  className="mt-0.5 flex-shrink-0"
                  style={{ color: block.type === 'heading' ? '#F28D1B' : undefined }}
                >
                  <Icon className="h-4 w-4" />
                </div>

                {/* Block Content */}
                <div className="flex-1">
                  <p
                    className={`${
                      block.type === 'heading'
                        ? 'text-base font-bold text-foreground'
                        : block.type === 'code'
                        ? 'font-mono text-xs text-primary'
                        : 'text-sm text-foreground'
                    }`}
                  >
                    {block.content}
                  </p>
                </div>

                {/* Actions - Show on Hover */}
                <AnimatePresence>
                  {hoveredBlock === block.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex gap-1"
                    >
                      <button className="flex h-6 w-6 items-center justify-center rounded hover:bg-muted">
                        <Plus className="h-3 w-3 text-muted-foreground" />
                      </button>
                      <button className="flex h-6 w-6 items-center justify-center rounded hover:bg-muted">
                        <Trash2 className="h-3 w-3 text-red-500" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {/* New Block Input with Typing Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative flex items-start gap-2 rounded-lg p-2"
          >
            <div className="mt-0.5 flex-shrink-0">
              <Plus className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">
                {typingText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="ml-0.5 inline-block h-4 w-0.5 bg-primary"
                />
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slash Command Menu */}
      <AnimatePresence>
        {showSlashMenu && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="overflow-hidden rounded-lg border border-border/50 bg-card shadow-xl"
          >
            <div className="max-h-48 overflow-y-auto p-2">
              {slashCommands.map((command, index) => {
                const Icon = command.icon;
                return (
                  <motion.button
                    key={command.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ backgroundColor: 'hsl(var(--primary) / 0.05)' }}
                    className="flex w-full items-start gap-3 rounded-lg p-2 text-left transition-colors"
                  >
                    <div
                      className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: '#F28D1B20' }}
                    >
                      <Icon className="h-4 w-4" style={{ color: '#F28D1B' }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{command.label}</p>
                      <p className="text-xs text-muted-foreground">{command.description}</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Tip */}
      {!showSlashMenu && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-4 rounded-lg border border-border/30 bg-muted/20 px-3 py-2 text-center"
        >
          <p className="text-xs text-muted-foreground">
            Drag to reorder • Type <span className="font-semibold text-primary">/</span> for commands
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default NotionStyleEditorDemo;
