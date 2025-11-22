'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { History, Eye, RotateCcw, User, Check } from 'lucide-react';
import { useState } from 'react';

interface Version {
  id: string;
  version: string;
  title: string;
  author: string;
  timestamp: string;
  changes: {
    added: number;
    removed: number;
  };
  badge: string;
}

const VersionHistoryTimeline = () => {
  const [hoveredVersion, setHoveredVersion] = useState<string | null>(null);
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);

  const versions: Version[] = [
    {
      id: '3',
      version: 'v3',
      title: 'Getting Started',
      author: 'Suhail Joo',
      timestamp: 'about 2 months ago',
      changes: { added: 45, removed: 12 },
      badge: 'Latest',
    },
    {
      id: '2',
      version: 'v2',
      title: 'Getting Started',
      author: 'Suhail Joo',
      timestamp: 'about 2 months ago',
      changes: { added: 23, removed: 8 },
      badge: '',
    },
    {
      id: '1',
      version: 'v1',
      title: 'Getting Started',
      author: 'Suhail Joo',
      timestamp: 'about 2 months ago',
      changes: { added: 187, removed: 0 },
      badge: 'Initial',
    },
  ];

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-br from-background via-accent-green/5 to-background p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="h-5 w-5 text-primary" />
          <h3 className="text-sm font-bold text-foreground">Version History</h3>
        </div>
        <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {versions.length} Versions
        </div>
      </div>

      {/* Timeline */}
      <div className="relative space-y-3">
        {/* Vertical Line */}
        <div className="absolute left-4 top-6 bottom-6 w-0.5 bg-border" />

        {versions.map((version, index) => (
          <motion.div
            key={version.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onMouseEnter={() => setHoveredVersion(version.id)}
            onMouseLeave={() => setHoveredVersion(null)}
            onClick={() => setSelectedVersion(version.id === selectedVersion ? null : version.id)}
            className="relative cursor-pointer"
          >
            {/* Version Card */}
            <div
              className={`ml-8 rounded-lg border transition-all ${
                hoveredVersion === version.id || selectedVersion === version.id
                  ? 'border-primary/50 bg-primary/5 shadow-md'
                  : 'border-border/50 bg-card'
              }`}
            >
              <div className="p-3">
                <div className="flex items-start justify-between gap-2">
                  {/* Left: Version Info */}
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span
                        className="inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-bold"
                        style={{
                          backgroundColor: version.badge === 'Latest' ? '#F28D1B' : '#94A3B8',
                          color: 'white',
                        }}
                      >
                        {version.version}
                      </span>
                      {version.badge && (
                        <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-semibold text-green-600 dark:text-green-400">
                          {version.badge}
                        </span>
                      )}
                    </div>
                    <p className="mb-1 text-sm font-semibold text-foreground">{version.title}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{version.author}</span>
                      </div>
                      <span>{version.timestamp}</span>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex gap-1">
                    <button
                      className="flex h-7 w-7 items-center justify-center rounded hover:bg-muted"
                      title="Preview"
                    >
                      <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                    {version.badge !== 'Latest' && (
                      <button
                        className="flex h-7 items-center gap-1 rounded bg-primary/10 px-2 text-xs font-semibold text-primary hover:bg-primary/20"
                        title="Restore"
                      >
                        <RotateCcw className="h-3 w-3" />
                        <span className="hidden sm:inline">Restore</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Change Stats */}
                <div className="mt-2 flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      +{version.changes.added}
                    </span>
                    <span className="text-muted-foreground">added</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-red-600 dark:text-red-400">
                      -{version.changes.removed}
                    </span>
                    <span className="text-muted-foreground">removed</span>
                  </div>
                </div>
              </div>

              {/* Diff Preview - Shows on Select */}
              <AnimatePresence>
                {selectedVersion === version.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t border-border/50"
                  >
                    <div className="space-y-1 bg-muted/20 p-3 text-xs font-mono">
                      <div className="text-green-600 dark:text-green-400">
                        + Added troubleshooting section
                      </div>
                      <div className="text-green-600 dark:text-green-400">
                        + Updated screenshots to v2.0
                      </div>
                      <div className="text-red-600 dark:text-red-400">
                        - Removed outdated API examples
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Timeline Dot */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="absolute left-0 top-3 flex h-8 w-8 items-center justify-center"
            >
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                  version.badge === 'Latest'
                    ? 'border-primary bg-primary'
                    : 'border-border bg-card'
                }`}
              >
                {version.badge === 'Latest' && <Check className="h-3 w-3 text-white" />}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-4 rounded-lg border border-border/30 bg-muted/20 px-3 py-2 text-center"
      >
        <p className="text-xs text-muted-foreground">
          Click version • View diff • Restore any version
        </p>
      </motion.div>
    </div>
  );
};

export default VersionHistoryTimeline;
