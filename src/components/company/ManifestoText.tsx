'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ManifestoTextProps {
  data: {
    paragraphs: string[];
    cta: {
      text: string;
      link: string;
    };
  };
}

const ManifestoText = ({ data }: ManifestoTextProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Manifesto Text */}
      <div className="space-y-8">
        {data.paragraphs.map((paragraph, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="text-xl md:text-2xl leading-relaxed text-gray-800 font-normal"
          >
            {paragraph}
          </motion.p>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: data.paragraphs.length * 0.15 }}
        className="mt-16 flex justify-center"
      >
        <Button
          size="lg"
          className="text-base px-10 py-7 bg-gradient-to-r from-primary via-purple-500 to-purple-600 hover:from-primary/90 hover:via-purple-500/90 hover:to-purple-600/90 shadow-xl shadow-primary/20 hover:shadow-2xl hover:scale-105 transition-all group"
          asChild
        >
          <Link href={data.cta.link}>
            {data.cta.text}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default ManifestoText;
