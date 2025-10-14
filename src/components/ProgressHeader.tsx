'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressHeaderProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
  isVisible?: boolean;
}

export default function ProgressHeader({ currentStep, totalSteps, stepTitles, isVisible = true }: ProgressHeaderProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t border-border/50"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Current step indicator */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono text-muted-foreground">
              Step <span className="text-foreground font-bold">{currentStep + 1}</span> of {totalSteps}
            </span>
            <span className="hidden sm:block text-sm text-muted-foreground font-medium">
              {stepTitles[currentStep]}
            </span>
          </div>

          {/* Progress dots */}
          <div className="flex items-center gap-2">
            {[...Array(totalSteps)].map((_, i) => (
              <motion.div
                key={i}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-500',
                  i <= currentStep ? 'bg-primary w-10' : 'bg-muted w-8'
                )}
                initial={{ scale: 0.8 }}
                animate={{ scale: i === currentStep ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>

        {/* Overall progress bar */}
        <div className="mt-3 h-0.5 bg-muted/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-purple-600"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
