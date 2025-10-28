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
}: StoryQuoteBlockProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto"
    >
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-3xl font-medium mb-6 text-foreground">
          {title}
        </h3>
        <blockquote className="mb-6 p-8 rounded-2xl bg-gray-50">
          <p className="text-xl leading-relaxed text-foreground font-medium">
            {quote}
          </p>
        </blockquote>
        <p className="text-base leading-relaxed text-muted-foreground">{content}</p>
      </div>
    </motion.div>
  );
};

export default StoryQuoteBlock;
