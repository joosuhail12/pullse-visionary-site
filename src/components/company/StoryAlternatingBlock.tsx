'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface StoryAlternatingBlockProps {
  title: string;
  paragraphs: string[];
  icon: LucideIcon;
  supportingIcons?: LucideIcon[];
  accentColor: 'purple' | 'blue' | 'orange';
  imagePosition: 'left' | 'right';
  index: number;
}

const colorConfig = {
  purple: {
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-500/10 via-pink-500/5 to-transparent',
    border: 'border-purple-500/20',
  },
  blue: {
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-500/10 via-cyan-500/5 to-transparent',
    border: 'border-blue-500/20',
  },
  orange: {
    gradient: 'from-orange-500 to-red-500',
    bgGradient: 'from-orange-500/10 via-red-500/5 to-transparent',
    border: 'border-orange-500/20',
  },
};

const StoryAlternatingBlock = ({
  title,
  paragraphs,
  icon: MainIcon,
  supportingIcons = [],
  accentColor,
  imagePosition,
  index,
}: StoryAlternatingBlockProps) => {
  const config = colorConfig[accentColor];
  const isLeftImage = imagePosition === 'left';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative"
    >
      <div className={`grid md:grid-cols-2 gap-12 lg:gap-16 items-center ${isLeftImage ? '' : 'md:flex-row-reverse'}`}>
        {/* Visual Side - Icon Arrangement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.1 }}
          className={`relative h-[400px] rounded-3xl bg-gradient-to-br ${config.bgGradient} border ${config.border} backdrop-blur-sm overflow-hidden ${isLeftImage ? 'md:order-1' : 'md:order-2'}`}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

          {/* Center Main Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                y: [-8, 8, -8],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="relative"
            >
              <div className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${config.gradient} shadow-2xl flex items-center justify-center`}>
                <MainIcon className="w-16 h-16 text-white" />
              </div>
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${config.gradient} blur-2xl opacity-50 -z-10`}></div>
            </motion.div>
          </div>

          {/* Supporting Icons (if provided) */}
          {supportingIcons.length > 0 && (
            <div className="absolute inset-0">
              {supportingIcons.map((Icon, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0.4, 0.7, 0.4],
                    scale: [0.9, 1.1, 0.9],
                  }}
                  transition={{
                    delay: index * 0.2 + 0.3 + i * 0.15,
                    duration: 4,
                    repeat: Infinity,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="absolute"
                  style={{
                    top: `${30 + 40 * Math.sin((i * Math.PI * 2) / supportingIcons.length)}%`,
                    left: `${30 + 40 * Math.cos((i * Math.PI * 2) / supportingIcons.length)}%`,
                  }}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${config.gradient} shadow-lg flex items-center justify-center opacity-60`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Content Side */}
        <motion.div
          initial={{ opacity: 0, x: isLeftImage ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
          className={`space-y-6 ${isLeftImage ? 'md:order-2' : 'md:order-1'}`}
        >
          {/* Title */}
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-[-0.01em]">
            <span className={`bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}>
              {title}
            </span>
          </h3>

          {/* Paragraphs */}
          <div className="space-y-4">
            {paragraphs.map((paragraph, idx) => (
              <p key={idx} className="text-lg md:text-xl leading-relaxed text-gray-700 font-medium">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StoryAlternatingBlock;
