'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';

interface CompanyAntlerCardProps {
  antler: {
    description: string;
    website: string;
  };
  antlerLogo: StaticImageData;
}

export default function CompanyAntlerCard({ antler, antlerLogo }: CompanyAntlerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative group"
    >
      {/* Gradient glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-orange-500/20 rounded-2xl md:rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />

      {/* Main card */}
      <div className="relative bg-white/70 backdrop-blur-xl border-2 border-orange-500/30 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 hover:bg-white/80 hover:border-orange-500/40 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 transition-all duration-500 overflow-hidden">
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5 pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-center gap-5 md:gap-8 lg:gap-12">
          {/* Logo container */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl md:rounded-2xl blur-xl" />
              <div className="relative bg-white/90 backdrop-blur-md rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-8 shadow-xl border border-white/60">
                <Image
                  src={antlerLogo}
                  alt="Antler"
                  width={120}
                  height={48}
                  className="w-auto h-10 md:h-12"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Backed by Antler
              </span>
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed mb-4 md:mb-5 lg:mb-6">
              {antler.description}
            </p>
            <Button
              variant="outline"
              size="lg"
              className="text-sm md:text-base px-6 py-4 md:px-8 md:py-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 border-2 border-orange-500/30 hover:border-orange-500/50 hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-red-500/20 transition-all duration-300 group/btn"
              asChild
            >
              <Link href={antler.website} target="_blank" rel="noopener noreferrer">
                View Portfolio
                <ExternalLink className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
