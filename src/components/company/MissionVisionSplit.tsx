'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Target, Telescope } from 'lucide-react';
import { useState } from 'react';

interface MissionVisionSplitProps {
  mission: string;
  vision: string;
}

const MissionVisionSplit = ({ mission, vision }: MissionVisionSplitProps) => {
  const [hoveredSide, setHoveredSide] = useState<'mission' | 'vision' | null>(null);

  // Spring animations for smooth width transitions
  const missionWidth = useSpring(50, { stiffness: 300, damping: 30 });
  const visionWidth = useSpring(50, { stiffness: 300, damping: 30 });

  const handleMouseEnter = (side: 'mission' | 'vision') => {
    setHoveredSide(side);
    if (side === 'mission') {
      missionWidth.set(60);
      visionWidth.set(40);
    } else {
      missionWidth.set(40);
      visionWidth.set(60);
    }
  };

  const handleMouseLeave = () => {
    setHoveredSide(null);
    missionWidth.set(50);
    visionWidth.set(50);
  };

  // Parallax effect for text
  const missionY = useMotionValue(0);
  const visionY = useMotionValue(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative w-full overflow-hidden rounded-3xl glass-strong border-2 border-gray-200"
      style={{ minHeight: '500px' }}
    >
      {/* Desktop: Side by Side */}
      <div className="hidden md:flex h-full relative">
        {/* Mission Side */}
        <motion.div
          className="relative overflow-hidden border-r-2 border-gray-200"
          style={{ width: useTransform(missionWidth, (w) => `${w}%`) }}
          onMouseEnter={() => handleMouseEnter('mission')}
          onMouseLeave={handleMouseLeave}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-transparent" />

          {/* Animated icon */}
          <motion.div
            className="absolute top-8 right-8 opacity-10"
            animate={{
              rotate: hoveredSide === 'mission' ? 360 : 0,
              scale: hoveredSide === 'mission' ? 1.2 : 1,
            }}
            transition={{ duration: 0.6 }}
          >
            <Target className="w-32 h-32 text-purple-600" />
          </motion.div>

          {/* Content */}
          <div className="relative z-10 p-12 flex flex-col h-full justify-center">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/50">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-200 mb-2">
                  <span className="text-xs font-bold text-purple-600 uppercase tracking-wide">
                    Now
                  </span>
                </div>
                <h2 className="text-4xl font-bold">Our Mission</h2>
              </div>
            </div>

            {/* Mission text */}
            <motion.p
              className="text-xl leading-relaxed text-gray-700"
              style={{ y: missionY }}
            >
              {mission}
            </motion.p>

            {/* Key highlight */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredSide === 'mission' ? 1 : 0 }}
              className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-l-4 border-purple-600"
            >
              <p className="text-sm font-semibold text-purple-600">
                🎯 Focus: Building end-to-end AI-native customer support
              </p>
            </motion.div>
          </div>

          {/* Hover indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm text-gray-500"
            animate={{ opacity: hoveredSide === 'mission' ? 0 : 1 }}
          >
            Hover to expand →
          </motion.div>
        </motion.div>

        {/* Vision Side */}
        <motion.div
          className="relative overflow-hidden"
          style={{ width: useTransform(visionWidth, (w) => `${w}%`) }}
          onMouseEnter={() => handleMouseEnter('vision')}
          onMouseLeave={handleMouseLeave}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-transparent" />

          {/* Animated icon */}
          <motion.div
            className="absolute top-8 left-8 opacity-10"
            animate={{
              scale: hoveredSide === 'vision' ? [1, 1.1, 1] : 1,
              rotate: hoveredSide === 'vision' ? [0, 10, -10, 0] : 0,
            }}
            transition={{ duration: 2, repeat: hoveredSide === 'vision' ? Infinity : 0 }}
          >
            <Telescope className="w-32 h-32 text-blue-600" />
          </motion.div>

          {/* Content */}
          <div className="relative z-10 p-12 flex flex-col h-full justify-center">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/50">
                <Telescope className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-200 mb-2">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">
                    2026+
                  </span>
                </div>
                <h2 className="text-4xl font-bold">Our Vision</h2>
              </div>
            </div>

            {/* Vision text */}
            <motion.p
              className="text-xl leading-relaxed text-gray-700"
              style={{ y: visionY }}
            >
              {vision}
            </motion.p>

            {/* Key highlight */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredSide === 'vision' ? 1 : 0 }}
              className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-l-4 border-blue-600"
            >
              <p className="text-sm font-semibold text-blue-600">
                🚀 Goal: Unified AI for all business functions
              </p>
            </motion.div>
          </div>

          {/* Hover indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm text-gray-500"
            animate={{ opacity: hoveredSide === 'vision' ? 0 : 1 }}
          >
            ← Hover to expand
          </motion.div>
        </motion.div>

        {/* Center divider with animated connector */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <motion.div
            className="relative"
            animate={{
              scale: hoveredSide ? 1.2 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-16 h-16 rounded-full bg-white border-4 border-gray-200 flex items-center justify-center shadow-xl">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                  animate={{
                    pathLength: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile: Stacked */}
      <div className="md:hidden flex flex-col">
        {/* Mission */}
        <div className="relative p-8 border-b-2 border-gray-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
              <Target className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-200 mb-1">
                <span className="text-xs font-bold text-purple-600 uppercase">
                  Now
                </span>
              </div>
              <h2 className="text-2xl font-bold">Our Mission</h2>
            </div>
          </div>
          <p className="text-base leading-relaxed text-gray-700">{mission}</p>
        </div>

        {/* Arrow */}
        <div className="flex justify-center py-4">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {/* Vision */}
        <div className="relative p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
              <Telescope className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-200 mb-1">
                <span className="text-xs font-bold text-blue-600 uppercase">
                  2026+
                </span>
              </div>
              <h2 className="text-2xl font-bold">Our Vision</h2>
            </div>
          </div>
          <p className="text-base leading-relaxed text-gray-700">{vision}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default MissionVisionSplit;
