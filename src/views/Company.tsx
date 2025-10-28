'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageLiquidBackground from '@/components/PageLiquidBackground';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink, Linkedin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Timeline from '@/components/company/Timeline';
import MissionVisionSplit from '@/components/company/MissionVisionSplit';
import StoryQuoteBlock from '@/components/company/StoryQuoteBlock';
import PrincipleCard from '@/components/company/PrincipleCard';
import {
  story,
  mission,
  vision,
  timeline,
  values,
  team,
  antler,
  cta,
  platformVision,
} from '@/data/companyData';
import antlerLogo from '@/assets/antler-logo.png';

const Company = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Subtle parallax for hero (less dramatic, more professional)
  const heroY = useTransform(scrollY, [0, 400], [0, 80]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  return (
    <div className="min-h-screen">
      <PageLiquidBackground opacity={0.25} />
      <Navigation />

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* ========================================
              SECTION 1: HERO - "The Vision"
          ======================================== */}
          <motion.div
            ref={heroRef}
            style={{ y: heroY, opacity: heroOpacity }}
            className="max-w-5xl mx-auto text-center mb-32 relative"
          >
            <div className="relative z-10">
              {/* Antler Badge - Subtle */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-gray-200 bg-white/90 backdrop-blur-sm mb-8 shadow-sm"
              >
                <Image
                  src={antlerLogo}
                  alt="Antler"
                  width={60}
                  height={24}
                  className="h-5 w-auto"
                />
                <span className="text-sm font-medium text-muted-foreground">
                  Backed by Antler
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
              >
                Building the Operating System
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  for AI-Native Business
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto"
              >
                Starting with customer support. Scaling to every business function.
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 shadow-xl shadow-primary/20"
                  asChild
                >
                  <Link href={cta.primaryCTA.link}>
                    {cta.primaryCTA.text}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* ========================================
              SECTION 2: THE STORY - "Why We Exist"
          ======================================== */}
          <div className="max-w-7xl mx-auto mb-40">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Why We're Building Pullse
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                The journey from chaos to clarity
              </p>
            </motion.div>

            <div className="space-y-16">
              {/* Problem */}
              <StoryQuoteBlock
                title="The Problem We Saw"
                quote="Companies drowning in 100+ disconnected tools. Data silos everywhere. Fragmentation costing millions."
                content={story.problem}
                index={0}
                accentColor="red"
              />

              {/* Visual Connector */}
              <div className="flex justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="w-px h-12 bg-gradient-to-b from-red-600/50 to-blue-600/50" />
                  <div className="w-3 h-3 rounded-full bg-blue-600" />
                </motion.div>
              </div>

              {/* Insight */}
              <StoryQuoteBlock
                title="The Insight"
                quote="AI doesn't get smarter through specialization. It gets smarter through aggregation."
                content={story.insight}
                index={1}
                accentColor="blue"
              />

              {/* Visual Connector */}
              <div className="flex justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="w-px h-12 bg-gradient-to-b from-blue-600/50 to-purple-600/50" />
                  <div className="w-3 h-3 rounded-full bg-purple-600" />
                </motion.div>
              </div>

              {/* Solution */}
              <StoryQuoteBlock
                title="What We're Building"
                quote="The future isn't more specialized tools—it's unified AI-native platforms."
                content={story.solution}
                index={2}
                accentColor="purple"
              />
            </div>
          </div>

          {/* ========================================
              SECTION 3: MISSION & VISION
          ======================================== */}
          <div className="max-w-7xl mx-auto mb-40">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Our Mission & Vision
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Where we're going and how we'll get there
              </p>
            </motion.div>

            <MissionVisionSplit mission={mission} vision={vision} />
          </div>

          {/* ========================================
              SECTION 4: WHAT WE STAND FOR
          ======================================== */}
          <div className="max-w-7xl mx-auto mb-40">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Principles That Guide Us
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                The core beliefs that shape everything we build
              </p>
            </motion.div>

            {/* 4 Core Principles - 2x2 Grid */}
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {values.map((value, index) => (
                <PrincipleCard
                  key={value.title}
                  icon={value.icon}
                  title={value.title}
                  description={value.description}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* ========================================
              SECTION 5: THE TEAM & JOURNEY
          ======================================== */}
          <div className="max-w-7xl mx-auto mb-40">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Who's Building This
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                The team and journey behind Pullse
              </p>
            </motion.div>

            {/* Team Section - Side by Side Cards */}
            <div className="max-w-6xl mx-auto mb-20">
              <div className="grid md:grid-cols-2 gap-8">
                {team.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="group relative overflow-hidden rounded-3xl border-2 border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-primary/30"
                  >
                    {/* Subtle gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                      {/* Avatar/Photo */}
                      <div className="relative">
                        {member.image ? (
                          <Image
                            src={member.image}
                            alt={member.name}
                            width={120}
                            height={120}
                            className="rounded-2xl"
                          />
                        ) : (
                          <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border-2 border-primary/20 shadow-lg">
                            <span className="text-4xl font-bold text-primary">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Name & Title */}
                      <div>
                        <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                        <p className="text-base text-primary font-semibold">{member.title}</p>
                      </div>

                      {/* Consolidated Bio */}
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {member.bio}
                        {member.background && ` ${member.background}`}
                      </p>

                      {/* Personal Quote/Why This (if exists) */}
                      {member.whyThis && (
                        <div className="pt-4 border-t border-gray-200">
                          <p className="text-xs italic text-foreground leading-relaxed">
                            "{member.whyThis}"
                          </p>
                        </div>
                      )}

                      {/* Social Links */}
                      <div className="flex gap-3 pt-2">
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-primary hover:text-white text-sm font-medium transition-all duration-300"
                          >
                            <Linkedin className="h-4 w-4" />
                            <span>LinkedIn</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

              {/* Antler Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-8 p-8 rounded-2xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50/30"
              >
                <div className="flex items-center gap-6">
                  <Image
                    src={antlerLogo}
                    alt="Antler"
                    width={80}
                    height={32}
                    className="h-8 w-auto"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {antler.description}
                    </p>
                  </div>
                  <a
                    href={antler.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0"
                  >
                    <Button variant="outline" size="sm">
                      Learn more
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </motion.div>

            {/* Journey Timeline */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold text-center mb-12">The Journey</h3>
              <Timeline milestones={timeline} />
            </div>

            {/* Platform Vision - Simplified */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center space-y-12"
            >
              <div>
                <h3 className="text-3xl font-bold mb-6">{platformVision.headline}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {platformVision.description}
                </p>
              </div>

              {/* Current Focus */}
              <div className="p-10 rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 shadow-xl">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <platformVision.currentFocus.icon className="h-8 w-8 text-primary" />
                  <h4 className="text-2xl font-bold">{platformVision.currentFocus.name}</h4>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-3">
                  <span className="text-sm font-bold text-primary">
                    {platformVision.currentFocus.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {platformVision.currentFocus.tagline}
                </p>
              </div>

              {/* Future Vision */}
              <div className="p-10 rounded-3xl border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-white">
                <h4 className="text-2xl font-bold mb-6">{platformVision.futureVision.title}</h4>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {platformVision.futureVision.description}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {platformVision.futureVision.examples.map((example) => (
                    <div
                      key={example}
                      className="px-5 py-2.5 rounded-full bg-gray-100 border border-gray-200 text-sm font-medium text-muted-foreground"
                    >
                      {example}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ========================================
              SECTION 6: FINAL CTA
          ======================================== */}
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl border-2 border-gray-200 bg-gradient-to-br from-white via-white to-gray-50/50 shadow-2xl p-12 md:p-16 text-center"
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

              <div className="relative z-10 space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold">
                  {cta.headline}
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  {cta.description}
                </p>

                <Button
                  size="lg"
                  className="text-lg px-10 py-7 shadow-xl shadow-primary/20"
                  asChild
                >
                  <Link href={cta.primaryCTA.link}>
                    {cta.primaryCTA.text}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <Image src={antlerLogo} alt="Antler" width={60} height={24} className="h-4 w-auto opacity-60" />
                    <span className="text-sm text-muted-foreground">Antler-backed</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Launching Q4 2025</span>
                  <span className="text-sm text-muted-foreground">Limited early access</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Company;
