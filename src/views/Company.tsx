'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Timeline from '@/components/company/Timeline';
import StoryQuoteBlock from '@/components/company/StoryQuoteBlock';
import ApproachSection from '@/components/company/ApproachSection';
import GradientMesh from '@/components/company/GradientMesh';
import FloatingShapes from '@/components/company/FloatingShapes';
import GlassCard from '@/components/company/GlassCard';
import {
  story,
  timeline,
  team,
  antler,
  cta,
  ourApproach,
} from '@/data/companyData';
import antlerLogo from '@/assets/antler-logo.png';

const Company = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Navigation />

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* ========================================
              SECTION 1: HERO - "The Vision"
          ======================================== */}
          <div className="max-w-7xl mx-auto mb-32 relative min-h-[600px] md:min-h-[700px]">
            {/* Gradient Mesh Background */}
            <GradientMesh variant="multi" opacity={0.4} />

            {/* Floating Shapes - Reduced */}
            <FloatingShapes variant="minimal" />

            {/* Subtle Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none"></div>

            {/* Split Layout Container */}
            <div className="relative z-10 grid md:grid-cols-[60%_40%] gap-10 items-center">
              {/* LEFT SIDE - Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  damping: 20,
                  duration: 0.5
                }}
                className="space-y-10 md:space-y-12"
              >
                {/* Antler Badge - Top Left */}
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 0.1,
                    type: 'spring',
                    stiffness: 120,
                    damping: 15
                  }}
                  whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(124, 58, 237, 0.2)' }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-white/40 shadow-lg transition-all duration-300 cursor-pointer"
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
                    delay: 0.15,
                    duration: 0.5,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
                >
                  <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-primary bg-clip-text text-transparent">
                    Replace Your Entire Support Stack with One Intelligent Platform
                  </span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                  initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    delay: 0.2,
                    duration: 0.5,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium max-w-2xl"
                >
                  AI-native software that solves entire business functions—starting with customer support.{' '}
                  <span className="text-primary font-semibold">No more tool chaos. No more data silos.</span>
                </motion.p>

                {/* CTA Buttons - Stacked Vertically */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.25,
                    type: 'spring',
                    stiffness: 100,
                    damping: 20
                  }}
                  className="flex flex-col gap-4 max-w-md"
                >
                  <Button
                    size="lg"
                    className="text-lg px-12 py-7 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 hover:scale-[1.02] w-full"
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
                    className="text-lg px-12 py-7 bg-white/60 backdrop-blur-sm border-white/40 hover:bg-white/80 transition-all duration-300 hover:scale-[1.02] w-full"
                    asChild
                  >
                    <Link href="/product">
                      Explore Platform
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>

              {/* RIGHT SIDE - Animated Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.3,
                  type: 'spring',
                  stiffness: 80,
                  damping: 20
                }}
                className="hidden md:block relative h-[600px]"
              >
                {/* Large Gradient Orb with Hue Rotation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.08, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      scale: {
                        duration: 8,
                        repeat: Infinity,
                        ease: [0.45, 0.05, 0.55, 0.95],
                      },
                      rotate: {
                        duration: 25,
                        repeat: Infinity,
                        ease: 'linear',
                      }
                    }}
                    style={{
                      filter: 'hue-rotate(0deg)',
                    }}
                    className="w-96 h-96 rounded-full bg-gradient-to-br from-primary/30 via-purple-600/30 to-pink-600/30 blur-3xl animate-hue-shift"
                  ></motion.div>
                </div>

                {/* Floating Data Points with Smoother Animation */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 50,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                  className="absolute inset-0"
                >
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: [0.4, 0.8, 0.4],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        delay: 0.4 + i * 0.15,
                        duration: 3.5,
                        repeat: Infinity,
                        ease: [0.45, 0.05, 0.55, 0.95],
                      }}
                      className="absolute w-3 h-3 rounded-full bg-gradient-to-br from-primary to-purple-600 shadow-lg shadow-primary/50"
                      style={{
                        top: `${50 + 40 * Math.sin((i * Math.PI * 2) / 8)}%`,
                        left: `${50 + 40 * Math.cos((i * Math.PI * 2) / 8)}%`,
                      }}
                    />
                  ))}
                </motion.div>

                {/* Center Glass Card with Float Animation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    transition={{
                      delay: 0.5,
                      type: 'spring',
                      stiffness: 80,
                      damping: 15
                    }}
                  >
                    <motion.div
                      animate={{
                        y: [-8, 8, -8],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: [0.45, 0.05, 0.55, 0.95],
                      }}
                    >
                      <GlassCard
                        intensity="strong"
                        className="p-8 max-w-sm text-center hover:scale-[1.02] transition-transform duration-300"
                      >
                        <motion.div
                          animate={{
                            rotate: [0, 5, -5, 0],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: [0.45, 0.05, 0.55, 0.95],
                          }}
                        >
                          <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary" />
                        </motion.div>
                        <h3 className="text-2xl font-bold mb-2 text-gray-900">AI-Powered</h3>
                        <p className="text-sm text-gray-600">Unified platform connecting all your business functions</p>
                      </GlassCard>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ========================================
              SECTION 2: THE STORY - "Why We Exist"
          ======================================== */}
          <div className="max-w-full mx-auto mb-32 relative overflow-hidden">
            {/* Gradient Mesh for Story Section */}
            <GradientMesh variant="purple" opacity={0.25} className="-top-40" />

            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className="text-center mb-16 relative z-10 container mx-auto px-4"
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.1,
                  type: 'spring',
                  stiffness: 120,
                  damping: 15
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
                viewport={{ once: true }}
                transition={{
                  delay: 0.15,
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="text-5xl md:text-6xl font-bold mb-6 tracking-tight"
              >
                <span className="bg-gradient-to-r from-gray-900 via-purple-700 to-purple-600 bg-clip-text text-transparent">
                  Why We're Building Pullse
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.2,
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium"
              >
                The journey from chaos to clarity
              </motion.p>
            </motion.div>

            {/* 3-Column Grid Layout (Mobile: Stacked) */}
            <div className="relative z-10 max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Problem Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.95, filter: 'blur(4px)' }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    delay: 0.1,
                    duration: 0.5,
                    type: 'spring',
                    stiffness: 100,
                    damping: 20
                  }}
                >
                  <StoryQuoteBlock
                    title="The Problem"
                    quote="Your team is drowning in disconnected tools"
                    content={story.problem}
                    index={0}
                    accentColor="red"
                  />
                </motion.div>

                {/* Insight Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.95, filter: 'blur(4px)' }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    delay: 0.2,
                    duration: 0.5,
                    type: 'spring',
                    stiffness: 100,
                    damping: 20
                  }}
                >
                  <StoryQuoteBlock
                    title="The Insight"
                    quote="One brain beats 100 specialized tools"
                    content={story.insight}
                    index={1}
                    accentColor="blue"
                  />
                </motion.div>

                {/* Solution Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.95, filter: 'blur(4px)' }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    delay: 0.3,
                    duration: 0.5,
                    type: 'spring',
                    stiffness: 100,
                    damping: 20
                  }}
                >
                  <StoryQuoteBlock
                    title="The Solution"
                    quote="AI-native platforms that replace your entire stack"
                    content={story.solution}
                    index={2}
                    accentColor="purple"
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* ========================================
              SECTION 3: OUR APPROACH (Mission + Principles + Vision)
          ======================================== */}
          <div className="mb-32 relative">
            {/* Gradient Mesh for Approach Section */}
            <GradientMesh variant="blue" opacity={0.35} className="-top-40" />

            <div className="relative z-10">
              <ApproachSection
                title={ourApproach.title}
                subtitle={ourApproach.subtitle}
                mission={ourApproach.mission}
                principles={ourApproach.principles}
                vision={ourApproach.vision}
              />
            </div>
          </div>

          {/* ========================================
              SECTION 4: THE TEAM & JOURNEY
          ======================================== */}
          <div className="max-w-6xl mx-auto mb-32 relative">
            {/* Gradient Mesh for Team Section */}
            <GradientMesh variant="orange" opacity={0.3} className="-top-40" />

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
              <h2 className="text-6xl font-bold mb-6 tracking-tight">
                <span className="bg-gradient-to-r from-gray-900 to-orange-600 bg-clip-text text-transparent">
                  Who's Building This
                </span>
              </h2>
              <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
                The team and journey behind Pullse
              </p>
            </motion.div>

            {/* Team Section - Glassmorphic Cards */}
            <div className="max-w-6xl mx-auto mb-24 relative z-10">
              <div className="grid md:grid-cols-2 gap-10">
                {team.map((member, idx) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="relative group"
                  >
                    <div className="relative p-10 rounded-3xl bg-white/70 backdrop-blur-md border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                      {/* Gradient Corner Accent */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-bl-full blur-2xl"></div>

                      <div className="flex flex-col items-center text-center space-y-6 relative z-10">
                        {/* Avatar with Gradient Ring */}
                        {member.image ? (
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-600 rounded-full blur-lg opacity-40"></div>
                            <Image
                              src={member.image}
                              alt={member.name}
                              width={140}
                              height={140}
                              className="rounded-full relative z-10"
                            />
                          </div>
                        ) : (
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-600 rounded-full blur-lg opacity-40"></div>
                            <div className="relative z-10 w-36 h-36 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-xl">
                              <span className="text-4xl font-bold text-white">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Name & Title */}
                        <div>
                          <h3 className="text-2xl font-bold mb-2 text-gray-900">{member.name}</h3>
                          <p className="text-base font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">{member.title}</p>
                        </div>

                        {/* Bio */}
                        <p className="text-base leading-relaxed text-gray-700 font-medium">
                          {member.bio}
                        </p>

                        {/* Social Links */}
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105"
                          >
                            Connect on LinkedIn →
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Antler Card - Glassmorphic Treatment */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative mb-24 group"
            >
              <div className="relative p-10 rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-red-500/10 border border-orange-500/30 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg">
                      <Image
                        src={antlerLogo}
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

            {/* Journey Timeline */}
            <div className="mb-24 relative z-10">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
              >
                <h3 className="text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                    The Journey
                  </span>
                </h3>
                <p className="text-lg text-gray-600">Our path from idea to reality</p>
              </motion.div>
              <Timeline milestones={timeline} />
            </div>

          </div>

          {/* ========================================
              SECTION 5: FINAL CTA
          ======================================== */}
          <div className="max-w-5xl mx-auto relative">
            {/* Gradient Mesh for CTA */}
            <GradientMesh variant="multi" opacity={0.4} />

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

                <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
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
                    className="text-lg px-12 py-7 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-2xl shadow-primary/40 hover:shadow-3xl hover:shadow-primary/50 transition-all hover:scale-105"
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
      </div>

      <Footer />
    </div>
  );
};

export default Company;
