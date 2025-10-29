'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import StoryAlternatingBlock from '@/components/company/StoryAlternatingBlock';
import ValuesSection from '@/components/company/ValuesSection';
import WhySupportSection from '@/components/company/WhySupportSection';
import TeamCard from '@/components/company/TeamCard';
import JourneySection from '@/components/company/JourneySection';
import { MessageSquare, Lightbulb, Rocket, Mail, Phone, Headphones, Search, FileText, BarChart3 } from 'lucide-react';
import GradientMesh from '@/components/company/GradientMesh';
import FloatingShapes from '@/components/company/FloatingShapes';
import GlassCard from '@/components/company/GlassCard';
import PageLiquidBackground from '@/components/PageLiquidBackground';
import LiquidEther from '@/components/LiquidEther';
import {
  story,
  timeline,
  team,
  antler,
  cta,
  mission,
  vision,
  values,
  whySupportFirst,
} from '@/data/companyData';
import antlerLogo from '@/assets/antler-logo.png';

const Company = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 relative">
      {/* Liquid Ether Background Layer */}
      <PageLiquidBackground opacity={0.22} />

      {/* Continuous Gradient Mesh Layer */}
      <div className="fixed inset-0 -z-40 pointer-events-none">
        <GradientMesh variant="multi" opacity={0.18} />
      </div>

      <Navigation />

      {/* ========================================
          SECTION 1: HERO - "The Vision"
      ======================================== */}
      <section className="relative overflow-hidden pt-32 pb-20 min-h-screen">
        {/* Hero-specific Liquid Ether - Full Width */}
        <div className="absolute inset-0 -z-10 opacity-28">
              <Suspense fallback={<div className="w-full h-full" />}>
                <LiquidEther
                  colors={["#FF00C8", "#A805FF", "#D3A9EA"]}
                  mouseForce={25}
                  cursorSize={120}
                  isViscous={false}
                  resolution={0.55}
                  autoDemo
                  autoSpeed={0.4}
                  autoIntensity={1.8}
                />
              </Suspense>
        </div>

        {/* Full-width Grid Overlay */}
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none"></div>

        {/* Contained Content */}
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Floating Shapes */}
            <FloatingShapes variant="minimal" />

            {/* Split Layout Container */}
            <div className="relative z-10 grid md:grid-cols-[60%_40%] gap-10 items-center">
              {/* LEFT SIDE - Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  damping: 20
                }}
                className="space-y-10 md:space-y-12"
              >
                {/* Antler Badge - Top Left */}
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 0.15,
                    type: 'spring',
                    stiffness: 100,
                    damping: 20
                  }}
                  whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(124, 58, 237, 0.2)' }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-lg border border-gray-200/60 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 cursor-pointer"
                >
                  <Image
                    src={antlerLogo}
                    alt="Antler"
                    width={50}
                    height={20}
                    className="h-4 w-auto"
                  />
                  <span className="text-xs font-semibold text-gray-700">
                    Backed by Antler
                  </span>
                </motion.div>

                {/* Main Headline - Clear, Benefit-Focused */}
                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.3,
                    duration: 0.5,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-[-0.02em]"
                >
                  <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-primary bg-clip-text text-transparent">
                    One Platform. Entire Support Stack.
                  </span>
                </motion.h1>

                {/* Subheadline - Removed blur filter */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.45,
                    duration: 0.5,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  className="text-xl md:text-2xl text-gray-700 leading-[1.6] font-medium max-w-2xl"
                >
                  AI-native software that solves entire business functions—starting with customer support.{' '}
                  <span className="text-primary font-semibold">No more tool chaos. No more data silos.</span>
                </motion.p>

                {/* CTA Buttons - Horizontal on Desktop */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.6,
                    type: 'spring',
                    stiffness: 100,
                    damping: 20
                  }}
                  className="flex flex-col sm:flex-row gap-4 items-center"
                >
                  <Button
                    size="lg"
                    className="text-lg px-10 py-6 bg-gradient-to-r from-primary via-purple-500 to-purple-600 hover:from-primary/90 hover:via-purple-500/90 hover:to-purple-600/90 shadow-[0_8px_24px_rgba(124,58,237,0.20)] hover:shadow-[0_12px_32px_rgba(124,58,237,0.25)] transition-all duration-300 hover:scale-[1.02] w-full sm:w-auto"
                    asChild
                  >
                    <Link href={cta.primaryCTA.link}>
                      {cta.primaryCTA.text}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base px-8 py-5 bg-white/60 backdrop-blur-sm border-white/40 hover:bg-white/80 transition-all duration-300 hover:scale-[1.02] w-full sm:w-auto"
                    asChild
                  >
                    <Link href="/product">
                      Explore Platform
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>

              {/* RIGHT SIDE - Icon Arrangement Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.45,
                  type: 'spring',
                  stiffness: 100,
                  damping: 20
                }}
                className="relative h-[600px]"
              >
                {/* Background Gradient Orb */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 360],
                    }}
                    transition={{
                      scale: {
                        duration: 12,
                        repeat: Infinity,
                        ease: [0.25, 0.1, 0.25, 1],
                      },
                      rotate: {
                        duration: 24,
                        repeat: Infinity,
                        ease: 'linear',
                      }
                    }}
                    className="w-96 h-96 rounded-full bg-gradient-to-br from-primary/20 via-purple-600/15 to-transparent blur-2xl"
                  ></motion.div>
                </div>

                {/* Center: Unified Platform Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.6,
                      type: 'spring',
                      stiffness: 100,
                      damping: 20
                    }}
                    className="relative"
                  >
                    <motion.div
                      animate={{
                        y: [-8, 8, -8],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      className="relative z-20"
                    >
                      <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-primary to-purple-600 shadow-2xl shadow-primary/40 flex items-center justify-center backdrop-blur-sm border-4 border-white/20">
                        <Sparkles className="w-16 h-16 text-white" />
                      </div>
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary to-purple-600 blur-xl opacity-50 -z-10"></div>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Orbiting Tool Icons - Representing Unified Stack */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                  className="absolute inset-0"
                >
                  {[
                    { Icon: Sparkles, color: 'from-blue-500 to-cyan-500', delay: 0.7 },
                    { Icon: ArrowRight, color: 'from-purple-500 to-pink-500', delay: 0.8 },
                    { Icon: Sparkles, color: 'from-orange-500 to-red-500', delay: 0.9 },
                    { Icon: ArrowRight, color: 'from-green-500 to-emerald-500', delay: 1.0 },
                    { Icon: Sparkles, color: 'from-indigo-500 to-purple-500', delay: 1.1 },
                    { Icon: ArrowRight, color: 'from-pink-500 to-rose-500', delay: 1.2 },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: [0.6, 1, 0.6],
                        scale: [0.95, 1.05, 0.95],
                      }}
                      transition={{
                        delay: item.delay,
                        duration: 4,
                        repeat: Infinity,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      className="absolute"
                      style={{
                        top: `${50 + 40 * Math.sin((i * Math.PI * 2) / 6)}%`,
                        left: `${50 + 40 * Math.cos((i * Math.PI * 2) / 6)}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} shadow-lg flex items-center justify-center backdrop-blur-sm border-2 border-white/30`}>
                        <item.Icon className="w-8 h-8 text-white" />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Connecting Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgb(124, 58, 237)" />
                      <stop offset="100%" stopColor="rgb(147, 51, 234)" />
                    </linearGradient>
                  </defs>
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <motion.line
                      key={i}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.3 }}
                      transition={{
                        delay: 1.2 + i * 0.1,
                        duration: 1,
                        ease: [0.25, 0.1, 0.25, 1]
                      }}
                      x1="50%"
                      y1="50%"
                      x2={`${50 + 40 * Math.cos((i * Math.PI * 2) / 6)}%`}
                      y2={`${50 + 40 * Math.sin((i * Math.PI * 2) / 6)}%`}
                      stroke="url(#lineGradient)"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                  ))}
                </svg>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 2: THE STORY - "Why We Exist"
      ======================================== */}
      <section className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className="text-center mb-16 relative z-10"
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  damping: 20
                }}
                className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 mb-6"
              >
                <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Our Story
                </span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="text-5xl md:text-6xl font-bold mb-6 tracking-[-0.01em]"
              >
                <span className="bg-gradient-to-r from-gray-900 via-purple-700 to-purple-600 bg-clip-text text-transparent">
                  Why We're Building Pullse
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium"
              >
                The journey from chaos to clarity
              </motion.p>
            </motion.div>

            {/* Alternating Story Blocks */}
            <div className="relative z-10 space-y-24 md:space-y-32">
              {/* Problem */}
              <StoryAlternatingBlock
                title={story.problem.title}
                paragraphs={story.problem.paragraphs}
                icon={MessageSquare}
                supportingIcons={[Mail, Phone, Headphones, Search, FileText, BarChart3]}
                accentColor="purple"
                imagePosition="left"
                index={0}
              />

              {/* Insight */}
              <StoryAlternatingBlock
                title={story.insight.title}
                paragraphs={story.insight.paragraphs}
                icon={Lightbulb}
                supportingIcons={[Sparkles, Sparkles, Sparkles]}
                accentColor="blue"
                imagePosition="right"
                index={1}
              />

              {/* Solution */}
              <StoryAlternatingBlock
                title={story.solution.title}
                paragraphs={story.solution.paragraphs}
                icon={Rocket}
                supportingIcons={[MessageSquare, Mail, Search, BarChart3]}
                accentColor="orange"
                imagePosition="left"
                index={2}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 3: OUR VALUES
      ======================================== */}
      <section className="relative py-32">
        <div className="container mx-auto px-4">
          <ValuesSection values={values} />
        </div>
      </section>

      {/* ========================================
          SECTION 4: WHY SUPPORT FIRST
      ======================================== */}
      <section className="relative py-32">
        <div className="container mx-auto px-4">
          <WhySupportSection
            headline={whySupportFirst.headline}
            reasons={whySupportFirst.reasons}
          />
        </div>
      </section>

      {/* ========================================
          SECTION 5: THE TEAM
      ======================================== */}
      <section className="relative py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-24 relative z-10"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, type: 'spring' }}
                className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/20 mb-6"
              >
                <span className="text-sm font-semibold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  The Team
                </span>
              </motion.div>
              <h2 className="text-6xl font-bold mb-6 tracking-[-0.01em]">
                <span className="bg-gradient-to-r from-gray-900 to-orange-600 bg-clip-text text-transparent">
                  Who's Building This
                </span>
              </h2>
              <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
                Meet the founders behind Pullse
              </p>
            </motion.div>

            {/* Team Cards */}
            <div className="grid md:grid-cols-2 gap-10 xl:gap-12">
              {team.map((member, idx) => (
                <TeamCard key={member.name} member={member} index={idx} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 6: THE JOURNEY
      ======================================== */}
      <section className="relative py-32">
        <div className="container mx-auto px-4">
          <JourneySection milestones={timeline} antler={antler} />
        </div>
      </section>

      {/* ========================================
          SECTION 7: FINAL CTA
      ======================================== */}
      <section className="relative py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto relative">
            <GlassCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              intensity="strong"
              gradient
              className="relative p-16 md:p-20 text-center overflow-hidden"
            >
              {/* Animated Gradient Orbs */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-600/30 to-cyan-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

              <div className="space-y-12 relative z-10">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, type: 'spring' }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-purple-600 shadow-2xl shadow-primary/40"
                >
                  <Sparkles className="w-10 h-10 text-white" />
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.01em] leading-tight">
                  <span className="bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent">
                    {cta.headline}
                  </span>
                </h2>

                {/* Trust Indicators - Moved Up */}
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-white/40 shadow-lg">
                    <Image src={antlerLogo} alt="Antler" width={60} height={24} className="h-4 w-auto" />
                    <span className="text-sm font-semibold text-gray-700">Antler-backed</span>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-purple-600/10 border border-primary/20">
                    <span className="text-sm font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Launching Q4 2025</span>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20">
                    <span className="text-sm font-semibold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Limited Early Access</span>
                  </div>
                </div>

                <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
                  {cta.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
                  <Button
                    size="lg"
                    className="text-lg px-12 py-7 bg-gradient-to-r from-primary via-purple-500 to-purple-600 hover:from-primary/90 hover:via-purple-500/90 hover:to-purple-600/90 shadow-[0_8px_24px_rgba(124,58,237,0.20)] hover:shadow-[0_12px_32px_rgba(124,58,237,0.25)] transition-all hover:scale-105"
                    asChild
                  >
                    <Link href={cta.primaryCTA.link}>
                      {cta.primaryCTA.text}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base px-8 py-6 bg-white/60 backdrop-blur-sm border-white/40 hover:bg-white/80 transition-all hover:scale-105"
                    asChild
                  >
                    <Link href={cta.secondaryCTA.link} target="_blank" rel="noopener noreferrer">
                      {cta.secondaryCTA.text}
                    </Link>
                  </Button>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Company;
