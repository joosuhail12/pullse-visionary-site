'use client';

import { motion } from 'framer-motion';

interface StoryQuoteBlockProps {
  title: string;
  quote: string;
  content: string;
  index: number;
  accentColor?: 'red' | 'blue' | 'purple';
}

const StoryQuoteBlock = ({
  title,
  quote,
  content,
  index,
  accentColor = 'purple',
}: StoryQuoteBlockProps) => {
  const colorClasses = {
    red: {
      border: 'border-l-red-600',
      titleGradient: 'from-red-600 to-orange-600',
      quoteGradient: 'from-red-600/10 to-orange-600/5',
    },
    blue: {
      border: 'border-l-blue-600',
      titleGradient: 'from-blue-600 to-indigo-600',
      quoteGradient: 'from-blue-600/10 to-indigo-600/5',
    },
    purple: {
      border: 'border-l-purple-600',
      titleGradient: 'from-purple-600 to-pink-600',
      quoteGradient: 'from-purple-600/10 to-pink-600/5',
    },
  };

  const colors = colorClasses[accentColor];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      <div className={`border-l-4 ${colors.border} pl-8 md:pl-12`}>
        {/* Title */}
        <h3
          className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${colors.titleGradient} bg-clip-text text-transparent mb-6`}
        >
          {title}
        </h3>

        {/* Quote */}
        <blockquote
          className={`relative mb-8 p-8 rounded-2xl bg-gradient-to-br ${colors.quoteGradient} border border-gray-200`}
        >
          <svg
            className="absolute top-4 left-4 w-8 h-8 text-gray-300"
            fill="currentColor"
            viewBox="0 0 32 32"
          >
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>

          <p className="relative z-10 text-xl md:text-2xl leading-relaxed text-foreground font-medium italic">
            {quote}
          </p>
        </blockquote>

        {/* Content */}
        <p className="text-lg leading-relaxed text-muted-foreground">
          {content}
        </p>
      </div>
    </motion.div>
  );
};

export default StoryQuoteBlock;
