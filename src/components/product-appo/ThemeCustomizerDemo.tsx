'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check } from 'lucide-react';
import { useState } from 'react';

interface ThemeColor {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
}

const themePresets: ThemeColor[] = [
  {
    id: 'appo-orange',
    name: 'Appo Orange',
    primary: '#F28D1B',
    secondary: '#FFB633',
    accent: '#FEE3AC',
  },
  {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    primary: '#0EA5E9',
    secondary: '#38BDF8',
    accent: '#BAE6FD',
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    primary: '#10B981',
    secondary: '#34D399',
    accent: '#A7F3D0',
  },
  {
    id: 'royal-purple',
    name: 'Royal Purple',
    primary: '#8B5CF6',
    secondary: '#A78BFA',
    accent: '#DDD6FE',
  },
  {
    id: 'sunset-red',
    name: 'Sunset Red',
    primary: '#EF4444',
    secondary: '#F87171',
    accent: '#FECACA',
  },
  {
    id: 'midnight-dark',
    name: 'Midnight Dark',
    primary: '#1E293B',
    secondary: '#334155',
    accent: '#64748B',
  },
];

const ThemeCustomizerDemo = () => {
  const [selectedTheme, setSelectedTheme] = useState<ThemeColor>(themePresets[0]);
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-br from-background via-accent-green/5 to-background p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-primary" />
          <h3 className="text-sm font-bold text-foreground">Theme Customizer</h3>
        </div>
        <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          White Label
        </div>
      </div>

      {/* Theme Preview Card */}
      <motion.div
        key={selectedTheme.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="mb-6 overflow-hidden rounded-xl border border-border/50 bg-card shadow-lg"
      >
        {/* Preview Header */}
        <div
          className="flex items-center justify-between px-4 py-3 transition-colors"
          style={{
            backgroundColor: selectedTheme.primary,
          }}
        >
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-white/90" />
            <div className="h-2 w-2 rounded-full bg-white/90" />
            <div className="h-2 w-2 rounded-full bg-white/90" />
          </div>
          <span className="text-xs font-semibold text-white">Live Preview</span>
        </div>

        {/* Preview Content */}
        <div className="space-y-3 p-4">
          {/* Article Title */}
          <div
            className="rounded-lg px-3 py-2 text-xs font-bold transition-colors"
            style={{
              backgroundColor: `${selectedTheme.accent}40`,
              color: selectedTheme.primary,
            }}
          >
            Getting Started Guide
          </div>

          {/* Article Content */}
          <div className="space-y-1.5">
            <div className="h-2 w-full rounded bg-muted/60" />
            <div className="h-2 w-5/6 rounded bg-muted/60" />
            <div className="h-2 w-4/6 rounded bg-muted/60" />
          </div>

          {/* CTA Button */}
          <button
            className="w-full rounded-lg px-4 py-2 text-xs font-semibold text-white shadow-md transition-all hover:shadow-lg"
            style={{
              backgroundColor: selectedTheme.secondary,
            }}
          >
            Read More
          </button>
        </div>
      </motion.div>

      {/* Color Picker Grid */}
      <div>
        <p className="mb-3 text-xs font-medium text-muted-foreground">
          Choose your brand colors
        </p>
        <div className="grid grid-cols-3 gap-2">
          {themePresets.map((theme) => (
            <motion.button
              key={theme.id}
              onClick={() => setSelectedTheme(theme)}
              onHoverStart={() => setHoveredTheme(theme.id)}
              onHoverEnd={() => setHoveredTheme(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden rounded-lg border-2 transition-all"
              style={{
                borderColor:
                  selectedTheme.id === theme.id
                    ? theme.primary
                    : hoveredTheme === theme.id
                    ? theme.secondary
                    : 'transparent',
              }}
            >
              {/* Color Swatch */}
              <div className="flex h-12 items-center justify-center gap-0.5 p-1">
                <div
                  className="h-full flex-1 rounded-sm transition-all"
                  style={{ backgroundColor: theme.primary }}
                />
                <div
                  className="h-full flex-1 rounded-sm transition-all"
                  style={{ backgroundColor: theme.secondary }}
                />
                <div
                  className="h-full flex-1 rounded-sm transition-all"
                  style={{ backgroundColor: theme.accent }}
                />
              </div>

              {/* Theme Name */}
              <div className="bg-card/90 px-2 py-1 text-center backdrop-blur-sm">
                <p className="text-xs font-semibold text-foreground">{theme.name}</p>
              </div>

              {/* Selected Checkmark */}
              <AnimatePresence>
                {selectedTheme.id === theme.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute right-1 top-1 rounded-full p-1 shadow-lg"
                    style={{ backgroundColor: theme.primary }}
                  >
                    <Check className="h-3 w-3 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-4 rounded-lg border border-border/30 bg-muted/20 px-3 py-2 text-center"
      >
        <p className="text-xs text-muted-foreground">
          Instantly preview changes across your entire help center
        </p>
      </motion.div>
    </div>
  );
};

export default ThemeCustomizerDemo;
