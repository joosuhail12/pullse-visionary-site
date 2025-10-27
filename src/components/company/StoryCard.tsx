'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface StoryCardProps {
  type: 'problem' | 'insight' | 'solution';
  emoji: string;
  title: string;
  content: string;
  highlightQuote?: string;
  index: number;
}

const StoryCard = ({
  type,
  emoji,
  title,
  content,
  highlightQuote,
  index,
}: StoryCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Color schemes for each card type
  const colorSchemes = {
    problem: {
      gradient: 'from-red-50 to-orange-50',
      darkGradient: 'from-red-600 to-orange-600',
      textColor: 'text-red-600',
      borderColor: 'border-red-200',
      glowColor: 'shadow-red-500/20',
      bgAccent: 'bg-red-500/10',
    },
    insight: {
      gradient: 'from-blue-50 to-indigo-50',
      darkGradient: 'from-blue-600 to-indigo-600',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-200',
      glowColor: 'shadow-blue-500/20',
      bgAccent: 'bg-blue-500/10',
    },
    solution: {
      gradient: 'from-purple-50 to-pink-50',
      darkGradient: 'from-purple-600 to-pink-600',
      textColor: 'text-purple-600',
      borderColor: 'border-purple-200',
      glowColor: 'shadow-purple-500/20',
      bgAccent: 'bg-purple-500/10',
    },
  };

  const colors = colorSchemes[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        delay: index * 0.2,
        duration: 0.6,
        type: "spring",
        stiffness: 100,
      }}
      className="perspective-1000 h-full"
    >
      <div
        className={`flip-card relative w-full h-full cursor-pointer ${
          isFlipped ? 'flipped' : ''
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of card */}
        <motion.div
          className={`flip-card-front absolute inset-0 glass-strong rounded-3xl p-10 flex flex-col items-center justify-center text-center border-2 ${colors.borderColor} ${colors.glowColor} hover:shadow-2xl transition-shadow duration-300`}
          whileHover={{ scale: 1.02 }}
        >
          {/* Emoji Icon with Animation */}
          <motion.div
            className="text-8xl mb-6 drop-shadow-lg"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            {emoji}
          </motion.div>

          {/* Title */}
          <h3 className={`text-3xl font-bold mb-4 ${colors.textColor}`}>
            {title}
          </h3>

          {/* Hint to flip */}
          <motion.div
            className={`mt-auto pt-6 text-sm ${colors.textColor} opacity-70 flex items-center gap-2`}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span>Click to explore</span>
            <svg
              className="w-4 h-4"
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
          </motion.div>
        </motion.div>

        {/* Back of card */}
        <div
          className={`flip-card-back absolute inset-0 bg-gradient-to-br ${colors.gradient} rounded-3xl p-10 flex flex-col justify-center border-2 ${colors.borderColor} shadow-2xl`}
        >
          {/* Small emoji in corner */}
          <div className="absolute top-6 right-6 text-4xl opacity-30">{emoji}</div>

          {/* Title */}
          <h3 className={`text-2xl font-bold mb-6 ${colors.textColor}`}>
            {title}
          </h3>

          {/* Content */}
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            {content}
          </p>

          {/* Highlight Quote if provided */}
          {highlightQuote && (
            <div className={`${colors.bgAccent} rounded-2xl p-6 mt-auto border-l-4 ${colors.borderColor}`}>
              <p className={`text-base font-medium ${colors.textColor} italic`}>
                "{highlightQuote}"
              </p>
            </div>
          )}

          {/* Hint to flip back */}
          <motion.div
            className={`mt-6 text-sm ${colors.textColor} opacity-70 text-center flex items-center justify-center gap-2`}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span>Click to return</span>
            <svg
              className="w-4 h-4 rotate-180"
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
          </motion.div>
        </div>
      </div>

      {/* Connection Line (only show for first two cards) */}
      {index < 2 && (
        <motion.div
          className="hidden lg:block absolute top-1/2 -right-12 w-12 h-1 z-0"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2 + 0.4, duration: 0.6 }}
        >
          <div className={`h-full bg-gradient-to-r ${colors.darkGradient} rounded-full opacity-30`} />
          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gradient-to-r ${colors.darkGradient}"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default StoryCard;
