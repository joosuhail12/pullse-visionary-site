'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, ArrowRight, Scale, Shield, Cookie, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

interface LegalDocumentCardProps {
  doc: {
    slug: string;
    title: string;
    description: string;
    lastUpdated: string;
  };
  iconKey: 'scale' | 'shield' | 'cookie' | 'check-circle';
  index: number;
}

const iconMap = {
  scale: Scale,
  shield: Shield,
  cookie: Cookie,
  'check-circle': CheckCircle,
} as const;

export default function LegalDocumentCard({ doc, iconKey, index }: LegalDocumentCardProps) {
  const lastUpdated = format(new Date(doc.lastUpdated), 'MMM d, yyyy');
  const Icon = iconMap[iconKey];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/legal/${doc.slug}`}>
        <div className="group relative h-full glass-elevated rounded-3xl p-8 border-2 border-gray-200 hover:border-primary/40 transition-all duration-300 hover:shadow-xl">
          {/* Gradient background on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
              <Icon className="h-7 w-7" />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
              {doc.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 mb-4 leading-relaxed">
              {doc.description}
            </p>

            {/* Last Updated Badge */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Calendar className="h-4 w-4" />
              <span>Updated {lastUpdated}</span>
            </div>

            {/* Read More Link */}
            <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
              Read document
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
