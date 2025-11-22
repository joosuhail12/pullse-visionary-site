'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';

interface FilterTag {
  id: string;
  label: string;
  value: string;
  color: string;
}

const predefinedFilters: FilterTag[] = [
  { id: '1', label: 'Status', value: 'Open', color: 'hsl(217 91% 60%)' },
  { id: '2', label: 'Priority', value: 'High', color: 'hsl(0 84% 60%)' },
  { id: '3', label: 'Assigned', value: 'Me', color: 'hsl(142 76% 36%)' },
];

const SmartFilterBuilder = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<FilterTag[]>(predefinedFilters);
  const [resultCount, setResultCount] = useState(47);

  const removeFilter = (id: string) => {
    setActiveFilters(activeFilters.filter(f => f.id !== id));
    // Simulate result count update
    setResultCount(prev => prev + 12);
  };

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-card via-card to-card p-6 shadow-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,hsl(var(--primary)/0.12),transparent_45%),radial-gradient(circle_at_80%_8%,hsl(var(--primary)/0.08),transparent_40%)]" />
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <Filter className="h-5 w-5 text-primary" />
        <h3 className="text-sm font-bold text-foreground">Smart Filters</h3>
      </div>

      {/* Search bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-4"
      >
        <div className="relative flex items-center">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full rounded-lg border border-border/60 bg-background/80 py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </motion.div>

      {/* Filter tags */}
      <div className="mb-4">
        <p className="mb-2 text-xs font-semibold text-muted-foreground">Active Filters</p>
        <div className="flex flex-wrap gap-2">
          <AnimatePresence mode="popLayout">
            {activeFilters.map((filter, idx) => (
              <motion.div
                key={filter.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 shadow-sm"
                style={{ borderLeftColor: filter.color, borderLeftWidth: 3 }}
              >
                <span className="text-xs font-medium text-foreground">
                  {filter.label}: <span className="font-semibold">{filter.value}</span>
                </span>
                <button
                  onClick={() => removeFilter(filter.id)}
                  className="flex h-4 w-4 items-center justify-center rounded-full hover:bg-muted transition-colors"
                >
                  <X className="h-3 w-3 text-muted-foreground" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Add filter button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-4 flex items-center gap-2 rounded-lg border border-dashed border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
      >
        <span className="text-lg">+</span>
        Add filter
      </motion.button>

      {/* Results summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-lg border border-primary/30 bg-gradient-to-r from-primary/10 to-accent-teal/10 p-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Matching conversations</p>
            <motion.p
              key={resultCount}
              initial={{ scale: 1.2, color: 'hsl(var(--primary))' }}
              animate={{ scale: 1, color: 'hsl(var(--foreground))' }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-bold"
            >
              {resultCount}
            </motion.p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Filters active</p>
            <p className="text-2xl font-bold text-foreground">{activeFilters.length}</p>
          </div>
        </div>
      </motion.div>

      {/* Animated search indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        className="absolute bottom-2 right-2 flex items-center gap-1 text-xs text-primary"
      >
        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
        <span>Live search</span>
      </motion.div>
    </div>
  );
};

export default SmartFilterBuilder;
