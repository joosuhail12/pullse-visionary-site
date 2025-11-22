'use client';

import { motion } from 'framer-motion';
import { Code, Image as ImageIcon, Video, Table as TableIcon, Box } from 'lucide-react';
import { useState } from 'react';

type BlockType = 'code' | 'image' | 'video' | 'table' | 'embed';

interface Tab {
  id: BlockType;
  label: string;
  icon: typeof Code;
}

const RichContentBlocksShowcase = () => {
  const [activeTab, setActiveTab] = useState<BlockType>('code');

  const tabs: Tab[] = [
    { id: 'code', label: 'Code', icon: Code },
    { id: 'image', label: 'Image', icon: ImageIcon },
    { id: 'video', label: 'Video', icon: Video },
    { id: 'table', label: 'Table', icon: TableIcon },
    { id: 'embed', label: 'Embed', icon: Box },
  ];

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-br from-background via-accent-green/5 to-background p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Box className="h-5 w-5 text-primary" />
          <h3 className="text-sm font-bold text-foreground">Rich Content Blocks</h3>
        </div>
        <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {tabs.length} Types
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-4 flex gap-1 rounded-lg border border-border/50 bg-card p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex-1 rounded px-3 py-2 text-xs font-semibold transition-all ${
                activeTab === tab.id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabBg"
                  className="absolute inset-0 rounded bg-primary/10"
                  transition={{ type: 'spring', duration: 0.5 }}
                />
              )}
              <div className="relative flex items-center justify-center gap-1.5">
                <Icon className="h-3 w-3" />
                <span className="hidden sm:inline">{tab.label}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="overflow-hidden rounded-xl border border-border/50 bg-card shadow-lg">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4"
        >
          {activeTab === 'code' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-t-lg bg-muted px-3 py-2">
                <span className="text-xs font-semibold text-foreground">JavaScript</span>
                <span className="text-xs text-muted-foreground">Syntax highlighted</span>
              </div>
              <div className="rounded-b-lg bg-muted/30 p-3 font-mono text-xs">
                <div className="space-y-1">
                  <div>
                    <span className="text-purple-500">const</span> <span className="text-foreground">appo</span> <span className="text-muted-foreground">=</span> <span className="text-blue-500">new</span> <span className="text-yellow-500">AppoSDK</span><span className="text-muted-foreground">()</span>
                  </div>
                  <div className="ml-4">
                    <span className="text-muted-foreground">.</span><span className="text-green-500">createArticle</span><span className="text-muted-foreground">({`{`}</span>
                  </div>
                  <div className="ml-8">
                    <span className="text-blue-400">title</span><span className="text-muted-foreground">:</span> <span className="text-orange-400">"Getting Started"</span>
                  </div>
                  <div className="ml-4">
                    <span className="text-muted-foreground">{`}`})</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'image' && (
            <div className="space-y-3">
              <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <ImageIcon className="h-12 w-12 text-primary/40" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">Product Screenshot</p>
                <p className="text-xs text-muted-foreground">Click to expand • 1920x1080 • 245 KB</p>
              </div>
            </div>
          )}

          {activeTab === 'video' && (
            <div className="space-y-3">
              <div className="relative aspect-video rounded-lg bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-lg"
                  >
                    <Video className="ml-1 h-8 w-8 text-white" />
                  </motion.button>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground">Tutorial: Creating Your First Article</p>
                <p className="text-xs text-muted-foreground">Duration: 2:45 • HD quality</p>
              </div>
            </div>
          )}

          {activeTab === 'table' && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-2 text-left font-semibold text-foreground">Feature</th>
                    <th className="pb-2 text-left font-semibold text-foreground">Starter</th>
                    <th className="pb-2 text-left font-semibold text-foreground">Pro</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-2 text-muted-foreground">Articles</td>
                    <td className="py-2 text-foreground">50</td>
                    <td className="py-2 text-primary font-semibold">Unlimited</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 text-muted-foreground">AI Assistance</td>
                    <td className="py-2 text-foreground">Basic</td>
                    <td className="py-2 text-primary font-semibold">Advanced</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-muted-foreground">Custom Domain</td>
                    <td className="py-2 text-muted-foreground">—</td>
                    <td className="py-2 text-primary font-semibold">✓</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'embed' && (
            <div className="space-y-3">
              <div className="rounded-lg border border-border/50 bg-muted/20 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Box className="h-4 w-4 text-primary" />
                  <span className="text-xs font-semibold text-foreground">CodePen Embed</span>
                </div>
                <div className="aspect-video rounded bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                  <p className="text-xs text-muted-foreground">Interactive demo preview</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Embed content from CodePen, Figma, Loom & more
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-4 rounded-lg border border-border/30 bg-muted/20 px-3 py-2 text-center"
      >
        <p className="text-xs text-muted-foreground">
          Drag & drop any media type • Auto-optimization
        </p>
      </motion.div>
    </div>
  );
};

export default RichContentBlocksShowcase;
