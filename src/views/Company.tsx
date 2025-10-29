'use client';

import { useState, useEffect } from 'react';
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
import GlassCard from '@/components/company/GlassCard';
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
  // Mouse tracking for interactive gradient
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-white relative">
      <Navigation />

      {/* ========================================
          SECTION 1: HERO - Visual Manifesto
      ======================================== */}
      <section className="relative overflow-hidden flex items-center justify-center" style={{ minHeight: '85vh' }}>
        {/* Background: Gradient Mesh with Mouse Tracking */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div
            className="absolute w-[600px] h-[600px] rounded-full blur-[100px] opacity-20 transition-all duration-300 ease-out"
            style={{
              background: 'radial-gradient(circle, rgba(124, 58, 237, 0.4) 0%, rgba(147, 51, 234, 0.2) 40%, transparent 70%)',
              left: `${mousePosition.x}px`,
              top: `${mousePosition.y}px`,
              transform: 'translate(-50%, -50%)',
            }}
          />
          <div
            className="absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-15"
            style={{
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(124, 58, 237, 0.2) 50%, transparent 70%)',
              left: `${mousePosition.x * 0.5}px`,
              top: `${mousePosition.y * 0.5}px`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>

        {/* Noise Texture Overlay */}
        <svg className="fixed inset-0 -z-10 w-full h-full opacity-[0.03] pointer-events-none">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>

        {/* Content Container */}
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-5xl mx-auto text-center space-y-12">
            {/* Manifesto Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className="text-7xl md:text-8xl lg:text-9xl font-black leading-[0.95] tracking-[-0.04em] text-gray-900"
            >
              Juggling 10 tools to answer one customer question?
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-[-0.03em]"
            >
              <span className="bg-gradient-to-r from-primary via-purple-600 to-purple-700 bg-clip-text text-transparent">
                That's not a workflow.
              </span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-[-0.03em] text-gray-900"
            >
              That's insanity.
            </motion.p>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.6,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium max-w-3xl mx-auto pt-8"
            >
              We're building AI-native platforms that replace your entire support stack with one intelligent system. No integrations. No data silos. Just software that actually understands your business.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.8,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className="pt-4"
            >
              <Button
                size="lg"
                className="text-lg px-12 py-7 bg-gradient-to-r from-primary via-purple-500 to-purple-600 hover:from-primary/90 hover:via-purple-500/90 hover:to-purple-600/90 shadow-[0_8px_24px_rgba(124,58,237,0.20)] hover:shadow-[0_12px_32px_rgba(124,58,237,0.25)] transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link href={cta.primaryCTA.link}>
                  {cta.primaryCTA.text}
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Link>
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 1.0,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 pt-6"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200/60 shadow-lg">
                <Image src={antlerLogo} alt="Antler" width={60} height={24} className="h-4 w-auto" />
                <span className="text-sm font-semibold text-gray-700">Antler-backed</span>
              </div>
              <div className="px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-purple-600/10 border border-primary/20">
                <span className="text-sm font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Launching Q4 2025</span>
              </div>
              <div className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20">
                <span className="text-sm font-semibold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Limited Early Access</span>
              </div>
            </motion.div>
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
