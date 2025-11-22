'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Edit3, Code, Check } from 'lucide-react';
import { useState } from 'react';

type ViewMode = 'edit' | 'preview';

const ArticleEditorPreview = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('edit');

  const editorContent = `# Getting Started with Appo

Welcome to our comprehensive guide on getting started with Appo.

## What is Appo?

Appo is a modern help center platform that helps you create beautiful documentation.

### Key Features
- Rich text editing
- Version control
- Multi-language support
- Analytics dashboard`;

  const previewContent = (
    <div className="space-y-4">
      <h1 className="text-lg font-bold text-foreground">Getting Started with Appo</h1>
      <p className="text-xs text-muted-foreground">
        Welcome to our comprehensive guide on getting started with Appo.
      </p>
      <h2 className="text-base font-bold text-foreground">What is Appo?</h2>
      <p className="text-xs text-muted-foreground">
        Appo is a modern help center platform that helps you create beautiful documentation.
      </p>
      <h3 className="text-sm font-semibold text-foreground">Key Features</h3>
      <ul className="list-inside list-disc space-y-1 text-xs text-muted-foreground">
        <li>Rich text editing</li>
        <li>Version control</li>
        <li>Multi-language support</li>
        <li>Analytics dashboard</li>
      </ul>
    </div>
  );

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-br from-background via-accent-green/5 to-background p-6">
      {/* Header with Toggle */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Edit3 className="h-5 w-5 text-primary" />
          <h3 className="text-sm font-bold text-foreground">Article Editor</h3>
        </div>

        {/* View Mode Toggle */}
        <div className="flex gap-1 rounded-lg border border-border/50 bg-card p-1 shadow-sm">
          <button
            onClick={() => setViewMode('edit')}
            className={`relative flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-semibold transition-all ${
              viewMode === 'edit'
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {viewMode === 'edit' && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 rounded bg-primary/10"
                transition={{ type: 'spring', duration: 0.5 }}
              />
            )}
            <Edit3 className="relative h-3 w-3" />
            <span className="relative">Edit</span>
          </button>
          <button
            onClick={() => setViewMode('preview')}
            className={`relative flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-semibold transition-all ${
              viewMode === 'preview'
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {viewMode === 'preview' && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 rounded bg-primary/10"
                transition={{ type: 'spring', duration: 0.5 }}
              />
            )}
            <Eye className="relative h-3 w-3" />
            <span className="relative">Preview</span>
          </button>
        </div>
      </div>

      {/* Editor/Preview Area */}
      <div className="mb-4 overflow-hidden rounded-xl border border-border/50 bg-card shadow-lg">
        {/* Toolbar */}
        <div className="flex items-center gap-2 border-b border-border/50 bg-muted/30 px-3 py-2">
          <div className="flex gap-1">
            {['B', 'I', 'U'].map((letter) => (
              <motion.button
                key={letter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-6 w-6 items-center justify-center rounded border border-border/30 bg-card text-xs font-bold text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              >
                {letter}
              </motion.button>
            ))}
          </div>
          <div className="h-4 w-px bg-border/50" />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-6 items-center gap-1 rounded border border-border/30 bg-card px-2 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
          >
            <Code className="h-3 w-3" />
            Code
          </motion.button>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {viewMode === 'edit' ? (
            <motion.div
              key="edit"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="p-4"
            >
              <div className="h-[240px] overflow-y-auto">
                <pre className="font-mono text-xs leading-relaxed text-foreground whitespace-pre-wrap">
                  {editorContent}
                </pre>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-4"
            >
              <div className="h-[240px] overflow-y-auto">{previewContent}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Status Footer */}
      <div className="flex items-center justify-between rounded-lg border border-border/30 bg-muted/20 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/20">
            <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">Auto-saved</p>
            <p className="text-xs text-muted-foreground">Last saved 2 seconds ago</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs font-semibold text-foreground">248 words</p>
          <p className="text-xs text-muted-foreground">~2 min read</p>
        </div>
      </div>

      {/* Info Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-4 rounded-lg border border-border/30 bg-gradient-to-r from-primary/5 to-primary/10 px-3 py-2 text-center"
      >
        <p className="text-xs text-muted-foreground">
          Real-time preview + auto-save every 3 seconds
        </p>
      </motion.div>
    </div>
  );
};

export default ArticleEditorPreview;
