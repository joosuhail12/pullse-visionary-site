'use client';

import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import Timeline from './Timeline';
import type { Milestone } from '@/data/companyData';

interface Antler {
  logo: StaticImageData | string;
  description: string;
  website: string;
}

interface JourneySectionProps {
  milestones: Milestone[];
  antler: Antler;
}

const JourneySection = ({ milestones, antler }: JourneySectionProps) => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-24"
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, type: 'spring' }}
          className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-primary/10 to-blue-500/10 border border-primary/20 mb-6"
        >
          <span className="text-sm font-semibold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Our Journey
          </span>
        </motion.div>
        <h2 className="text-6xl font-bold mb-6 tracking-[-0.01em]">
          <span className="bg-gradient-to-r from-gray-900 to-primary bg-clip-text text-transparent">
            From Idea to Reality
          </span>
        </h2>
        <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
          The milestones that brought us here
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="mb-24">
        <Timeline milestones={milestones} />
      </div>

      {/* Antler Card - Glassmorphic Treatment */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative group"
      >
        <div className="relative p-10 rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-red-500/10 border border-orange-500/30 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg">
                <Image
                  src={antler.logo}
                  alt="Antler"
                  width={140}
                  height={56}
                  className="h-12 w-auto"
                />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h4 className="text-xl font-bold mb-3 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Backed by Antler</h4>
              <p className="text-base text-gray-700 leading-relaxed font-medium">
                {antler.description}
              </p>
            </div>
            <a
              href={antler.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Learn more →
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default JourneySection;
