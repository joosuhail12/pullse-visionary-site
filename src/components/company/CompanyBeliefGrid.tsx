'use client';

import { motion } from 'framer-motion';
import { Eye, Telescope, Rocket, Heart, Zap, Shield } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const iconMap = {
  Eye,
  Telescope,
  Rocket,
  Heart,
  Zap,
  Shield,
} as const;

type IconName = keyof typeof iconMap;

interface Belief {
  title: string;
  description: string;
  icon: IconName;
}

interface CompanyBeliefGridProps {
  title: string;
  subtitle: string;
  beliefs: Belief[];
}

export default function CompanyBeliefGrid({ title, subtitle, beliefs }: CompanyBeliefGridProps) {
  return (
    <>
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10 md:mb-14 lg:mb-16 relative z-10 space-y-4"
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
          From the founder’s vision letter
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-[-0.01em]">
          <span className="bg-gradient-to-r from-gray-900 to-primary bg-clip-text text-transparent">
            {title}
          </span>
        </h2>
        <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-sm md:text-base text-gray-700">
          {[
            { label: '200-300 apps per enterprise', tone: 'primary/70' },
            { label: '~50% shelfware', tone: 'primary/70' },
            { label: 'Only 5% see real AI impact', tone: 'primary/70' },
          ].map((chip) => (
            <span
              key={chip.label}
              className="rounded-full border border-primary/30 bg-primary/5 px-4 py-1 font-semibold text-primary"
            >
              {chip.label}
            </span>
          ))}
        </div>
        <div className="flex justify-center">
          <Button
            asChild
            variant="outline"
            className="mt-3 text-sm md:text-base border-primary/30 hover:border-primary/50"
          >
            <Link href="/blog/the-era-of-tool-sprawl-is-ending-here-s-what-comes-next">
              Read the founder’s letter
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Unified 2x3 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
        {beliefs.map((belief, idx) => (
          <motion.div
            key={belief.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group relative"
          >
            <div className="relative h-full bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-8 hover:bg-white/80 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-500 overflow-hidden">
              {/* Spotlight effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />
              </div>

              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-4 md:mb-5 lg:mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 text-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                    {(() => {
                      const Icon = iconMap[belief.icon];
                      return <Icon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />;
                    })()}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4 text-gray-900 group-hover:text-primary transition-colors duration-300">
                  {belief.title}
                </h3>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  {belief.description}
                </p>

                {/* Gradient accent on hover */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
