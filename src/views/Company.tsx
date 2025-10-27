'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageLiquidBackground from '@/components/PageLiquidBackground';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Timeline from '@/components/company/Timeline';
import ValueCard from '@/components/company/ValueCard';
import TeamMember from '@/components/company/TeamMember';
import FragmentationDiagram from '@/components/company/FragmentationDiagram';
import SaaSSprawlStats from '@/components/company/SaaSSprawlStats';
import PlatformVisionPreview from '@/components/company/PlatformVisionPreview';
import StoryCard from '@/components/company/StoryCard';
import MissionVisionSplit from '@/components/company/MissionVisionSplit';
import ScrollProgress from '@/components/company/ScrollProgress';
import {
  story,
  mission,
  vision,
  timeline,
  values,
  team,
  antler,
  cta,
  whySupportFirst,
} from '@/data/companyData';

const Company = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Parallax effect for hero section
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="min-h-screen">
      <PageLiquidBackground opacity={0.3} />
      <Navigation />

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* HERO SECTION - "The Call to Adventure" */}
          <motion.div
            ref={heroRef}
            style={{ y: heroY, opacity: heroOpacity }}
            className="max-w-5xl mx-auto text-center mb-32 relative"
          >
            {/* Animated background numbers */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute top-0 left-10 text-9xl font-bold text-gray-100"
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                100+
              </motion.div>
              <motion.div
                className="absolute top-20 right-10 text-7xl font-bold text-gray-100"
                animate={{
                  y: [0, 20, 0],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              >
                $3.2M
              </motion.div>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/50 mb-8 shadow-lg"
              >
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  🚀 Backed by Antler | Building in Public
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
              >
                Every Business Uses{' '}
                <span className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                  100+ Disconnected Tools
                </span>
                <br />
                <span className="text-4xl md:text-5xl lg:text-6xl block mt-4">
                  We're Building{' '}
                  <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                    One Unified AI Brain
                  </span>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto"
              >
                Starting with customer support. Building the future of business
                software.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button
                  size="lg"
                  className="animate-glow-pulse-strong text-lg px-8 py-6"
                  asChild
                >
                  <Link href={cta.primaryCTA.link}>
                    {cta.primaryCTA.text}
                    <ArrowRight className="ml-2 h-6 w-6" />
                  </Link>
                </Button>
              </motion.div>

              {/* Scroll indicator */}
              <motion.div
                className="mt-16 flex flex-col items-center gap-2 text-muted-foreground"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-sm">Scroll to begin the journey</span>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </motion.div>
            </div>
          </motion.div>

          {/* STORY SECTION - "The Journey Begins" with 3D Flip Cards */}
          <div className="max-w-7xl mx-auto mb-40">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-200 mb-4">
                <span className="text-sm font-bold text-purple-600 uppercase tracking-wide">
                  Chapter 1: The Journey
                </span>
              </div>
              <h2 className="text-5xl font-bold mb-6">
                Why We're Building Pullse
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                From chaos to clarity - the path to unified AI
              </p>
            </motion.div>

            {/* 3D Flip Story Cards */}
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 mb-20">
              <StoryCard
                type="problem"
                emoji="😰"
                title="The Ordinary World"
                content={story.problem}
                index={0}
              />
              <StoryCard
                type="insight"
                emoji="💡"
                title="The Revelation"
                content={story.insight}
                highlightQuote="AI doesn't get smarter through specialization. It gets smarter through aggregation."
                index={1}
              />
              <StoryCard
                type="solution"
                emoji="✨"
                title="The Quest"
                content={story.solution}
                index={2}
              />
            </div>

            {/* SaaS Sprawl Stats - Data Evidence */}
            <div className="mb-20">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-200 mb-4">
                  <span className="text-sm font-bold text-red-600 uppercase tracking-wide">
                    The Evidence
                  </span>
                </div>
                <h3 className="text-3xl font-bold">
                  The Cost of Fragmentation
                </h3>
              </motion.div>
              <SaaSSprawlStats />
            </div>

            {/* Fragmentation Diagram - Visual Comparison */}
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-200 mb-4">
                  <span className="text-sm font-bold text-blue-600 uppercase tracking-wide">
                    The Transformation
                  </span>
                </div>
                <h3 className="text-3xl font-bold">
                  From Chaos to Unity
                </h3>
              </motion.div>
              <FragmentationDiagram />
            </div>
          </div>

          {/* MISSION & VISION - "The Destination" with Interactive Split */}
          <div className="max-w-7xl mx-auto mb-40">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-200 mb-4">
                <span className="text-sm font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent uppercase tracking-wide">
                  Chapter 2: The Destination
                </span>
              </div>
              <h2 className="text-5xl font-bold mb-6">
                Where We Are & Where We're Going
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our mission today, our vision for tomorrow
              </p>
            </motion.div>

            <MissionVisionSplit mission={mission} vision={vision} />
          </div>

          {/* PLATFORM VISION - "The Ultimate Goal" */}
          <div className="max-w-7xl mx-auto mb-40">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-200 mb-4">
                <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent uppercase tracking-wide">
                  Chapter 3: The Reward
                </span>
              </div>
            </motion.div>
            <PlatformVisionPreview />
          </div>

          {/* WHY SUPPORT FIRST - "Crossing the Threshold" */}
          <div className="max-w-6xl mx-auto mb-40">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-200 mb-4">
                <span className="text-sm font-bold text-purple-600 uppercase tracking-wide">
                  Chapter 4: The Strategy
                </span>
              </div>
              <h2 className="text-4xl font-bold mb-6">
                {whySupportFirst.headline}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every quest needs a starting point. Here's why customer support
                is ours.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {whySupportFirst.reasons.map((reason, index) => {
                const Icon = reason.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-elevated p-8 rounded-3xl hover-tilt group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-3">
                          {reason.title}
                        </h3>
                        <p className="text-base text-muted-foreground leading-relaxed">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* TIMELINE - "The Path" with Scroll Progress */}
          <div className="max-w-7xl mx-auto mb-40">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200 mb-4">
                <span className="text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent uppercase tracking-wide">
                  Chapter 5: The Journey
                </span>
              </div>
              <h2 className="text-5xl font-bold mb-6">Our Path Forward</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Every step brings us closer to the future of unified AI
              </p>
            </motion.div>

            <ScrollProgress>
              <Timeline milestones={timeline} />
            </ScrollProgress>
          </div>

          {/* VALUES - "The Principles" */}
          <div className="max-w-6xl mx-auto mb-40">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-200 mb-4">
                <span className="text-sm font-bold text-teal-600 uppercase tracking-wide">
                  Chapter 6: The Principles
                </span>
              </div>
              <h2 className="text-5xl font-bold mb-6">Our Values</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                The core beliefs that guide every decision we make
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <ValueCard key={index} value={value} index={index} />
              ))}
            </div>
          </div>

          {/* TEAM - "The Heroes" */}
          <div className="max-w-6xl mx-auto mb-40">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-200 mb-4">
                <span className="text-sm font-bold text-orange-600 uppercase tracking-wide">
                  Chapter 7: The Heroes
                </span>
              </div>
              <h2 className="text-5xl font-bold mb-6">Meet the Builders</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                The team on this quest to transform business software
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <TeamMember key={index} member={member} index={index} />
              ))}
            </div>
          </div>

          {/* ANTLER - "The Mentor" */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-40"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-200 mb-8">
              <span className="text-sm font-bold text-indigo-600 uppercase tracking-wide">
                Our Mentor
              </span>
            </div>

            <div className="glass-elevated p-12 rounded-3xl border-glow">
              <div className="mb-6 flex justify-center">
                <div className="text-4xl font-bold text-gray-400">ANTLER</div>
              </div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {antler.description}
              </p>
              <a
                href={antler.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold text-lg group"
              >
                Learn more about Antler
                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* FINAL CTA - "Join the Quest" */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative glass-gradient p-16 rounded-3xl text-center overflow-hidden border-2 border-purple-500/30 shadow-2xl">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 animate-mesh"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-purple-200 mb-6">
                  <span className="text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent uppercase tracking-wide">
                    Final Chapter: Your Turn
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  {cta.headline}
                </h2>
                <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                  {cta.description}
                </p>

                <Button
                  size="lg"
                  className="animate-glow-pulse-strong text-lg px-10 py-7 shadow-2xl"
                  asChild
                >
                  <Link href={cta.primaryCTA.link}>
                    {cta.primaryCTA.text}
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Company;
