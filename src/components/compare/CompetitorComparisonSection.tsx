'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { competitors } from '@/data/comparisonData';
import GlowCard from '@/components/ui/glow-card';

export default function CompetitorComparisonSection() {
  const [selectedCompetitor, setSelectedCompetitor] = useState('zendesk');

  const currentCompetitor = competitors.find((c) => c.id === selectedCompetitor);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-5xl mx-auto mb-12 md:mb-14 lg:mb-16"
    >
      <GlowCard
        className="glass-strong p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl relative overflow-hidden"
        glowColor="132, 0, 255"
        glowIntensity={0.4}
        hoverElevation={true}
        tilt3D={false}
      >
        {/* Animated gradient mesh background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/20" />
          <motion.div
            className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Animated Background Blobs (visible when competitor selected) */}
        {currentCompetitor && (
          <>
            <motion.div
              className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                x: [0, 20, 0],
                y: [0, -10, 0],
              }}
              transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.15, 1],
                x: [0, -20, 0],
                y: [0, 10, 0],
              }}
              transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}

        {/* Competitor Selector - Always at top */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-5 md:mb-6 relative z-10"
        >
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
            Compare Pullse with:
          </h3>
          <motion.div
            className="w-16 md:w-20 h-0.5 mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-3 md:mb-4"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />

          <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
            {competitors.map((competitor, index) => (
              <motion.button
                key={competitor.id}
                type="button"
                onClick={() => setSelectedCompetitor(competitor.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{
                  scale: 1.05,
                  y: -4
                }}
                whileTap={{ scale: 0.95 }}
                className="relative px-4 py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 rounded-lg md:rounded-xl font-semibold text-xs md:text-sm transition-all duration-300 overflow-hidden shadow-md md:shadow-lg"
              >
                {/* Animated Background for Active State */}
                {selectedCompetitor === competitor.id && (
                  <>
                    <motion.div
                      layoutId="activeCompetitorTab"
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600"
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600"
                      animate={{
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        boxShadow: '0 0 30px rgba(132, 0, 255, 0.6), 0 0 60px rgba(236, 72, 153, 0.4)',
                      }}
                    />
                  </>
                )}
                {/* Button Content */}
                <span className={`relative z-10 text-sm md:text-base ${
                  selectedCompetitor === competitor.id
                    ? 'text-white'
                    : 'text-gray-800'
                }`}>
                  {competitor.name}
                </span>
                {/* Hover Background for Inactive State */}
                {selectedCompetitor !== competitor.id && (
                  <motion.div
                    className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-2xl border border-purple-200/50"
                    whileHover={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderColor: 'rgba(168, 85, 247, 0.4)',
                    }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Divider (only shows when competitor selected) */}
        {currentCompetitor && (
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent mb-3 md:mb-4 relative z-10"
          />
        )}

        {/* Detailed Comparison Content */}
        {currentCompetitor && (
          <motion.div
            key={selectedCompetitor}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="relative z-10"
          >
            <div className="text-center mb-3 md:mb-4">
              {/* Title with animated gradient */}
              <motion.h2
                className="text-lg md:text-xl lg:text-2xl font-bold mb-1 md:mb-1.5 relative inline-block"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="relative">
                  Pullse vs {currentCompetitor.name}
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ['-200%', '200%'],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                </span>
              </motion.h2>
              <motion.p
                className="text-xs md:text-sm text-muted-foreground mb-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {currentCompetitor.tagline}
              </motion.p>
              <motion.p
                className="text-[10px] md:text-xs text-purple-600 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Best for: {currentCompetitor.bestFor}
              </motion.p>
            </div>

            {/* VS Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <motion.div
                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-purple-600 flex items-center justify-center shadow-xl md:shadow-2xl border-2 border-white"
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(132, 0, 255, 0.4)',
                    '0 0 0 8px rgba(132, 0, 255, 0)',
                    '0 0 0 0 rgba(132, 0, 255, 0)'
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-base md:text-lg font-black text-white">VS</span>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 gap-0 mb-3 md:mb-4 relative z-10">
              {/* Pullse Column with gradient background */}
              <motion.div
                className="relative p-3 md:p-4 lg:p-5 rounded-l-xl md:rounded-l-2xl overflow-hidden"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, type: 'spring' }}
              >
                {/* Purple gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/15 via-pink-500/10 to-transparent" />
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-purple-400/20 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                <div className="relative space-y-2 md:space-y-2.5 lg:space-y-3">
                  <div className="flex items-center gap-2 md:gap-2.5 mb-3 md:mb-4">
                    <motion.div
                      className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-md md:shadow-lg"
                      animate={{
                        boxShadow: [
                          '0 0 0 0 rgba(132, 0, 255, 0.7)',
                          '0 0 0 10px rgba(132, 0, 255, 0)',
                          '0 0 0 0 rgba(132, 0, 255, 0)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-base md:text-lg font-bold">Why Choose Pullse</h3>
                      <span className="text-[9px] md:text-[10px] bg-purple-100 text-purple-700 px-1.5 md:px-2 py-0.5 rounded-full font-semibold">
                        AI-Native
                      </span>
                    </div>
                  </div>
                  {currentCompetitor.whySwitch.map((reason, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{
                        x: 2,
                      }}
                      className="flex gap-2 md:gap-2.5 lg:gap-3 p-2 md:p-2.5 lg:p-3 rounded-lg md:rounded-xl bg-white/50 backdrop-blur-sm border border-purple-100/50 shadow-sm group cursor-pointer hover:shadow-md hover:border-purple-300 transition-all"
                    >
                      <div className="w-4 h-4 md:w-5 md:h-5 rounded-md md:rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-sm md:shadow-md">
                        <Check className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" />
                      </div>
                      <p className="text-xs md:text-sm font-medium text-gray-700 group-hover:text-purple-700 transition-colors leading-relaxed">{reason}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Vertical Gradient Divider */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-30" />

              {/* Competitor Column with different gradient */}
              <motion.div
                className="relative p-3 md:p-4 lg:p-5 rounded-r-xl md:rounded-r-2xl overflow-hidden"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, type: 'spring' }}
              >
                {/* Gray/Blue gradient background */}
                <div className="absolute inset-0 bg-gradient-to-bl from-gray-200/40 via-blue-100/30 to-transparent" />
                <motion.div
                  className="absolute bottom-0 left-0 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-blue-300/15 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                />

                <div className="relative space-y-2 md:space-y-2.5 lg:space-y-3">
                  <div className="flex items-center gap-2 md:gap-2.5 mb-3 md:mb-4">
                    <motion.div
                      className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-gray-400 to-gray-500 flex items-center justify-center shadow-md md:shadow-lg"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </motion.div>
                    <div>
                      <h3 className="text-base md:text-lg font-bold">{currentCompetitor.name} Strengths</h3>
                      <span className="text-[9px] md:text-[10px] bg-gray-200 text-gray-700 px-1.5 md:px-2 py-0.5 rounded-full font-semibold">
                        Established
                      </span>
                    </div>
                  </div>

                {currentCompetitor.strengths && (
                  <motion.div
                    className="p-2 md:p-2.5 lg:p-3 bg-blue-50 rounded-lg md:rounded-xl border border-blue-200 mb-2 md:mb-2.5 lg:mb-3 relative overflow-hidden"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <p className="text-[9px] md:text-[10px] text-blue-600 font-semibold mb-1 md:mb-1.5 uppercase">Where {currentCompetitor.name} Excels</p>
                    <ul className="space-y-1 md:space-y-1.5">
                      {currentCompetitor.strengths.map((strength, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-blue-900"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + idx * 0.1 }}
                        >
                          <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                          {strength}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                <motion.div
                  className="p-2.5 md:p-3 lg:p-4 bg-gray-50 rounded-lg md:rounded-xl border border-gray-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <p className="text-[10px] md:text-xs text-gray-600 mb-1.5 md:mb-2">
                    <strong>Pricing Reality:</strong>
                  </p>
                  <p className="text-xs md:text-sm text-gray-700 mb-2 md:mb-3">
                    {currentCompetitor.pricingNote}
                  </p>
                  {currentCompetitor.whenToChoose && (
                    <>
                      <p className="text-[10px] md:text-xs text-gray-600 mb-1 md:mb-1.5">
                        <strong>When to Choose {currentCompetitor.name}:</strong>
                      </p>
                      <p className="text-xs md:text-sm text-gray-700">
                        {currentCompetitor.whenToChoose}
                      </p>
                    </>
                  )}
                </motion.div>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="pt-2.5 md:pt-3 border-t border-gray-200 text-center relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="default" asChild className="relative group overflow-hidden h-10 md:h-11 px-4 md:px-5 text-sm md:text-base">
                  <Link href="/contact-sales">
                    <span className="relative z-10">Compare Pricing for Your Team</span>
                    <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                    {/* Pulsing glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-md opacity-0 group-hover:opacity-100 blur-xl"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </GlowCard>
    </motion.div>
  );
}
