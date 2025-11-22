'use client';

import { motion } from 'framer-motion';
import { Search, TrendingUp, AlertCircle, Plus } from 'lucide-react';

interface SearchQuery {
  query: string;
  count: number;
  hasArticle: boolean;
  trend: 'up' | 'down' | 'stable';
}

const searchQueries: SearchQuery[] = [
  { query: 'reset password', count: 487, hasArticle: true, trend: 'up' },
  { query: 'billing issues', count: 342, hasArticle: true, trend: 'stable' },
  { query: 'api integration', count: 289, hasArticle: false, trend: 'up' },
  { query: 'cancel subscription', count: 234, hasArticle: true, trend: 'down' },
  { query: 'webhook setup', count: 198, hasArticle: false, trend: 'up' },
  { query: 'export data', count: 156, hasArticle: false, trend: 'stable' },
  { query: 'team management', count: 143, hasArticle: true, trend: 'stable' },
  { query: 'sso configuration', count: 127, hasArticle: false, trend: 'up' },
];

const SearchAnalyticsDashboard = () => {
  const missingArticles = searchQueries.filter((q) => !q.hasArticle).length;
  const totalSearches = searchQueries.reduce((sum, q) => sum + q.count, 0);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-br from-background via-accent-green/5 to-background p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-5 w-5 text-primary" />
          <h3 className="text-sm font-bold text-foreground">Search Analytics</h3>
        </div>
        <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          Content Gaps
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-border/30 bg-card p-3 shadow-sm">
          <p className="mb-1 text-xs text-muted-foreground">Total Searches</p>
          <p className="text-xl font-bold text-foreground">{totalSearches.toLocaleString()}</p>
        </div>
        <div className="rounded-lg border border-border/30 bg-card p-3 shadow-sm">
          <div className="mb-1 flex items-center gap-1">
            <AlertCircle className="h-3 w-3 text-orange-500" />
            <p className="text-xs text-muted-foreground">Missing Articles</p>
          </div>
          <p className="text-xl font-bold text-orange-500">{missingArticles}</p>
        </div>
      </div>

      {/* Search Queries List */}
      <div className="space-y-2">
        <p className="mb-2 text-xs font-medium text-muted-foreground">Top Queries</p>
        <div className="max-h-[280px] space-y-2 overflow-y-auto pr-1">
          {searchQueries.map((item, index) => (
            <motion.div
              key={item.query}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`group relative overflow-hidden rounded-lg border p-3 transition-all hover:shadow-md ${
                item.hasArticle
                  ? 'border-border/50 bg-card hover:border-primary/30'
                  : 'border-orange-500/30 bg-orange-500/5 hover:border-orange-500/50'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                {/* Left: Query Info */}
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-xs font-semibold text-foreground">
                      "{item.query}"
                    </span>
                    {item.trend === 'up' && (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {item.count} searches this week
                  </p>
                </div>

                {/* Right: Status Badge */}
                {item.hasArticle ? (
                  <div className="flex h-6 items-center rounded-full bg-green-500/10 px-2 text-xs font-semibold text-green-600 dark:text-green-400">
                    Covered
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-6 items-center gap-1 rounded-full bg-orange-500/20 px-2 text-xs font-semibold text-orange-600 transition-colors hover:bg-orange-500/30 dark:text-orange-400"
                  >
                    <Plus className="h-3 w-3" />
                    Create
                  </motion.button>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted/30">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.count / 487) * 100}%` }}
                  transition={{ duration: 1, delay: index * 0.05 }}
                  className={`h-full rounded-full ${
                    item.hasArticle ? 'bg-primary' : 'bg-orange-500'
                  }`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-4 rounded-lg border border-border/30 bg-gradient-to-r from-orange-500/5 to-orange-500/10 px-4 py-3"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-foreground">Content Opportunity</p>
            <p className="text-xs text-muted-foreground">
              Create {missingArticles} articles to cover all queries
            </p>
          </div>
          <AlertCircle className="h-5 w-5 text-orange-500" />
        </div>
      </motion.div>
    </div>
  );
};

export default SearchAnalyticsDashboard;
