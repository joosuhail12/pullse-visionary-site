'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface CompanyHeroContentProps {
  cta: {
    primaryCTA: { text: string; link: string };
    secondaryCTA: { text: string; link: string };
  };
}

export default function CompanyHeroContent({ cta }: CompanyHeroContentProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="space-y-6 md:space-y-8 lg:space-y-10 w-full">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-foreground leading-[1.1] tracking-tight"
        >
          Building the support platform
          <span className="block text-primary">we always wished existed</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground leading-relaxed"
        >
          After years managing support teams drowning in 10+ disconnected tools, we're building one AI-native platform that actually works together.
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
          className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
        />

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center"
        >
          <Button
            size="lg"
            className="text-sm md:text-base px-6 py-5 md:px-8 md:py-7 shadow-xl shadow-primary/20 group"
            asChild
          >
            <Link href={cta.primaryCTA.link}>
              {cta.primaryCTA.text}
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-sm md:text-base px-6 py-4 md:px-8 md:py-6 bg-white/60 backdrop-blur-sm border-white/40 hover:bg-white/80 transition-all duration-300"
            asChild
          >
            <Link href="#story">
              Read Our Story
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
