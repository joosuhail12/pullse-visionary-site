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
}: StoryQuoteBlockProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto relative"
    >
      {/* Number Badge */}
      <div className="absolute -left-2 top-0 text-sm font-semibold text-muted-foreground">
        0{index + 1}
      </div>

      <div className="border-l-2 border-gray-300 pl-10 pt-2">
        <h3 className="text-3xl font-medium mb-8 text-foreground">
          {title}
        </h3>
        <blockquote className="mb-8 p-10 rounded-2xl bg-gray-50">
          <p className="text-2xl leading-relaxed text-foreground font-medium">
            {quote}
          </p>
        </blockquote>
        <p className="text-base leading-loose text-muted-foreground">{content}</p>
      </div>
    </motion.div>
  );
};

export default StoryQuoteBlock;
