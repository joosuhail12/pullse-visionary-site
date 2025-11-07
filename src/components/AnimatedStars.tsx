'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';

interface AnimatedStarsProps {
  rating: number; // 0-5, supports decimals (e.g., 4.8)
  maxStars?: number;
  size?: number; // Icon size in pixels
  color?: string; // Tailwind gradient class
  animated?: boolean;
  trigger?: boolean;
  showRating?: boolean;
}

const AnimatedStars = ({
  rating,
  maxStars = 5,
  size = 20,
  color = 'from-amber-400 to-orange-500',
  animated = true,
  trigger = true,
  showRating = false,
}: AnimatedStarsProps) => {
  const [displayRating, setDisplayRating] = useState(animated ? 0 : rating);

  useEffect(() => {
    if (animated && trigger) {
      const timer = setTimeout(() => {
        setDisplayRating(rating);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [animated, trigger, rating]);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {Array.from({ length: maxStars }).map((_, index) => {
          const starValue = index + 1;
          const fillPercentage = Math.min(Math.max((displayRating - index) * 100, 0), 100);

          return (
            <motion.div
              key={index}
              className="relative"
              initial={animated ? { opacity: 0, scale: 0, rotate: -180 } : {}}
              animate={trigger ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: 'backOut',
              }}
            >
              {/* Background star (empty) */}
              <Star
                size={size}
                className="text-muted-foreground/20"
                fill="currentColor"
              />

              {/* Filled star (gradient) */}
              <motion.div
                className="absolute inset-0 overflow-hidden"
                initial={{ width: '0%' }}
                animate={{ width: `${fillPercentage}%` }}
                transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
              >
                <Star
                  size={size}
                  className={`bg-gradient-to-r ${color} bg-clip-text text-transparent`}
                  fill="currentColor"
                  style={{ filter: 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.3))' }}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {showRating && (
        <motion.span
          className={`text-sm font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}
          initial={animated ? { opacity: 0 } : {}}
          animate={trigger ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {rating.toFixed(1)}
        </motion.span>
      )}
    </div>
  );
};

export default AnimatedStars;
