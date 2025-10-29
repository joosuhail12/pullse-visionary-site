'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Calendar, Layers, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import ManifestoText from '@/components/company/ManifestoText';
import ValuesSection from '@/components/company/ValuesSection';
import WhySupportSection from '@/components/company/WhySupportSection';
import TeamCard from '@/components/company/TeamCard';
import JourneySection from '@/components/company/JourneySection';
import GlassCard from '@/components/company/GlassCard';
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
  founderManifesto,
} from '@/data/companyData';
import antlerLogo from '@/assets/antler-logo.png';

const Company = () => {
  return (
    <div className="min-h-screen bg-white relative">
      <Navigation />

      {/* ========================================
          SECTION 1: HERO - Founder-Led
      ======================================== */}
      <section className="relative overflow-hidden pt-32 pb-20 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Liquid Ether Background */}
        <div className="absolute inset-0 -z-10 opacity-25">
          <Suspense fallback={<div className="w-full h-full" />}>
            <LiquidEther
              colors={["#7C3AED", "#8B5CF6", "#A78BFA"]}
              mouseForce={20}
              cursorSize={100}
              isViscous={false}
              resolution={0.6}
              autoDemo
              autoSpeed={0.3}
              autoIntensity={1.5}
            />
          </Suspense>
        </div>

        {/* Subtle Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/20 to-purple-600/20 blur-[100px] pointer-events-none -z-10"
        />

        {/* Content Container */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Text Content */}
            <div className="flex flex-col items-center text-center">
              <div className="space-y-10 w-full">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 backdrop-blur-sm"
                >
                  <Image src={antlerLogo} alt="Antler" width={50} height={20} className="h-3 w-auto" />
                  <span className="text-xs font-semibold text-primary">Antler-backed</span>
                  <span className="text-xs text-muted-foreground">• Founded 2024</span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
                  className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground leading-[1.1] tracking-tight"
                >
                  Building the support platform
                  <span className="block text-primary">we always wished existed</span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
                  className="text-xl sm:text-2xl text-muted-foreground leading-relaxed"
                >
                  After years managing support teams drowning in 10+ disconnected tools, we're building one AI-native platform that actually works together.
                </motion.p>

                {/* Stat Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
                  className="flex flex-wrap gap-6 justify-center"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">5+ years</div>
                      <div className="text-xs text-muted-foreground">Support experience</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                      <Layers className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">7 in 1</div>
                      <div className="text-xs text-muted-foreground">Products unified</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">Q4 2025</div>
                      <div className="text-xs text-muted-foreground">Launch timeline</div>
                    </div>
                  </div>
                </motion.div>

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
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <Button
                    size="lg"
                    className="text-base px-8 py-7 shadow-xl shadow-primary/20 group"
                    asChild
                  >
                    <Link href={cta.primaryCTA.link}>
                      Join Early Access
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-base px-8 py-6 bg-white/60 backdrop-blur-sm border-white/40 hover:bg-white/80 transition-all duration-300"
                    asChild
                  >
                    <Link href="#story">
                      Read Our Story
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 2: FOUNDER MANIFESTO
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
              className="text-center mb-20 relative z-10"
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
                className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 mb-6"
              >
                <span className="text-sm font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Our Manifesto
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
                <span className="bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent">
                  What We Believe
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
                Our vision for the future of business software
              </motion.p>
            </motion.div>

            {/* Manifesto Content */}
            <div className="relative z-10">
              <ManifestoText data={founderManifesto} />
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
