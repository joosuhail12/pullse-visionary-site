'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ScrollProgressProps {
  children: React.ReactNode;
}

const ScrollProgress = ({ children }: ScrollProgressProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Smooth spring animation for path length
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // SVG path for the winding journey
  // This creates a curve that winds down the page
  const pathD = "M 50 0 Q 80 100 50 200 Q 20 300 50 400 Q 80 500 50 600 Q 20 700 50 800";

  return (
    <div ref={containerRef} className="relative">
      {/* Background path (gray) */}
      <svg
        className="absolute left-0 top-0 w-24 h-full hidden lg:block pointer-events-none"
        viewBox="0 0 100 800"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Gradient for the active path */}
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(168, 85, 247)" stopOpacity="0.8" />
            <stop offset="50%" stopColor="rgb(236, 72, 153)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.8" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Base path */}
        <path
          d={pathD}
          fill="none"
          stroke="rgb(229, 231, 235)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Animated progress path */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="url(#pathGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="1 1"
          style={{
            pathLength,
          }}
          filter="url(#glow)"
        />

        {/* Animated dot at the end of progress */}
        <motion.circle
          r="8"
          fill="rgb(236, 72, 153)"
          style={{
            offsetDistance: useTransform(pathLength, [0, 1], ["0%", "100%"]),
            offsetPath: `path('${pathD}')`,
          }}
          filter="url(#glow)"
        >
          <animate
            attributeName="r"
            values="6;10;6"
            dur="2s"
            repeatCount="indefinite"
          />
        </motion.circle>
      </svg>

      {/* Content */}
      <div className="lg:pl-32">{children}</div>

      {/* Mobile progress bar */}
      <div className="lg:hidden sticky top-20 z-30 mb-8">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600"
            style={{ scaleX: pathLength, transformOrigin: "left" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ScrollProgress;
