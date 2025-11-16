'use client';

import { motion } from 'framer-motion';
import GlassCard from '@/components/company/GlassCard';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface CompanyCtaSectionProps {
  cta: {
    headline: string;
    description: string;
    primaryCTA: { text: string; link: string };
    secondaryCTA: { text: string; link: string };
  };
}

export default function CompanyCtaSection({ cta }: CompanyCtaSectionProps) {
  return (
    <GlassCard
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      intensity="strong"
      gradient
      className="relative p-8 md:p-12 lg:p-16 xl:p-24 text-center overflow-hidden"
    >
      {/* Enhanced Animated Gradient Orbs */}
      <div className="absolute top-0 right-0 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-primary/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-tr from-blue-600/30 to-cyan-600/30 rounded-full blur-3xl animate-pulse"></div>

      <div className="space-y-6 md:space-y-8 lg:space-y-10 relative z-10">
        {/* Larger Icon with Enhanced Shadow */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
          className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl md:rounded-3xl bg-gradient-to-br from-primary to-purple-600 shadow-2xl shadow-primary/50"
        >
          <Sparkles className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white" />
        </motion.div>

        {/* Enhanced Headline */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold tracking-[-0.02em] leading-[1.1]">
          <span className="bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent">
            {cta.headline}
          </span>
        </h2>

        {/* Enhanced Description with Better Typography */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-base md:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium"
        >
          {cta.description}
        </motion.p>

        {/* Enhanced Button Group with Better Spacing */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 md:gap-4 lg:gap-5 items-center justify-center pt-4 md:pt-6"
        >
          <Button
            size="lg"
            className="text-base md:text-lg font-bold px-8 py-5 md:px-10 md:py-6 lg:px-12 lg:py-7 bg-gradient-to-r from-primary via-purple-500 to-purple-600 hover:from-primary/90 hover:via-purple-500/90 hover:to-purple-600/90 shadow-[0_10px_30px_rgba(124,58,237,0.25)] hover:shadow-[0_15px_40px_rgba(124,58,237,0.35)] transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
            asChild
          >
            <Link href={cta.primaryCTA.link}>
              {cta.primaryCTA.text}
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-sm md:text-base font-semibold px-6 py-4 md:px-8 md:py-5 lg:px-10 lg:py-6 bg-white/70 backdrop-blur-md border-2 border-white/50 hover:bg-white/90 hover:border-white/70 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
            asChild
          >
            <Link href={cta.secondaryCTA.link} target="_blank" rel="noopener noreferrer">
              {cta.secondaryCTA.text}
            </Link>
          </Button>
        </motion.div>
      </div>
    </GlassCard>
  );
}
