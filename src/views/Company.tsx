'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageLiquidBackground from '@/components/PageLiquidBackground';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink, Linkedin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Timeline from '@/components/company/Timeline';
import StoryQuoteBlock from '@/components/company/StoryQuoteBlock';
import ApproachSection from '@/components/company/ApproachSection';
import {
  story,
  timeline,
  team,
  antler,
  cta,
  platformVision,
  ourApproach,
} from '@/data/companyData';
import antlerLogo from '@/assets/antler-logo.png';

const Company = () => {
  return (
    <div className="min-h-screen">
      <PageLiquidBackground opacity={0.25} />
      <Navigation />

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* ========================================
              SECTION 1: HERO - "The Vision"
          ======================================== */}
          <div className="max-w-4xl mx-auto text-center mb-24 relative">
            <div className="relative z-10">
              {/* Antler Badge - Minimal */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-gray-200 bg-gray-100 mb-8"
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="text-7xl font-semibold mb-8 leading-tight text-foreground"
              >
                Building the Operating System
                <br />
                for AI-Native Business
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto"
              >
                One AI brain. Infinite business functions. Starting with customer support.
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <Button
                  size="lg"
                  className="text-lg px-8 py-6"
                  asChild
                >
                  <Link href={cta.primaryCTA.link}>
                    {cta.primaryCTA.text}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>

          {/* ========================================
              SECTION 2: THE STORY - "Why We Exist"
          ======================================== */}
          <div className="max-w-6xl mx-auto mb-32">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-semibold mb-6">
                Why We're Building Pullse
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                The journey from chaos to clarity
              </p>
            </motion.div>

            <div className="space-y-12">
              {/* Problem */}
              <StoryQuoteBlock
                title="The Problem We Saw"
                quote="Companies drowning in 100+ disconnected tools. Data silos everywhere. Fragmentation costing millions."
                content={story.problem}
                index={0}
                accentColor="red"
              />

              {/* Insight */}
              <StoryQuoteBlock
                title="The Insight"
                quote="AI doesn't get smarter through specialization. It gets smarter through aggregation."
                content={story.insight}
                index={1}
                accentColor="blue"
              />

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
              SECTION 3: OUR APPROACH (Mission + Principles + Vision)
          ======================================== */}
          <div className="mb-32">
            <ApproachSection
              title={ourApproach.title}
              subtitle={ourApproach.subtitle}
              mission={ourApproach.mission}
              principles={ourApproach.principles}
              vision={ourApproach.vision}
            />
          </div>

          {/* ========================================
              SECTION 4: THE TEAM & JOURNEY
          ======================================== */}
          <div className="max-w-6xl mx-auto mb-32">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-semibold mb-6">
                Who's Building This
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                The team and journey behind Pullse
              </p>
            </motion.div>

            {/* Team Section - Side by Side Cards */}
            <div className="max-w-6xl mx-auto mb-16">
              <div className="grid md:grid-cols-2 gap-6">
                {team.map((member) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    className="border border-gray-200 bg-white p-8 rounded-2xl transition-colors duration-200 hover:border-gray-400"
                  >
                    <div className="flex flex-col items-center text-center space-y-4">
                      {/* Avatar/Photo */}
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={96}
                          height={96}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
                          <span className="text-2xl font-semibold text-foreground">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      )}

                      {/* Name & Title */}
                      <div>
                        <h3 className="text-xl font-medium mb-1">{member.name}</h3>
                        <p className="text-base text-muted-foreground">{member.title}</p>
                      </div>

                      {/* Condensed Bio */}
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {member.bio}
                      </p>

                      {/* Social Links */}
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          LinkedIn →
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Antler Card - Simplified */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-2xl border border-gray-200 bg-gray-50 mb-16"
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
                  <p className="text-sm text-muted-foreground">
                    {antler.description}
                  </p>
                </div>
                <a
                  href={antler.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Learn more →
                </a>
              </div>
            </motion.div>

            {/* Journey Timeline */}
            <div className="mb-16">
              <h3 className="text-3xl font-medium text-center mb-12">The Journey</h3>
              <Timeline milestones={timeline} />
            </div>

            {/* Platform Vision - Simplified */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <div className="p-8 rounded-2xl border border-gray-200 bg-gray-50">
                <h3 className="text-xl font-medium mb-4">Beyond Customer Support</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {platformVision}
                </p>
              </div>
            </motion.div>
          </div>

          {/* ========================================
              SECTION 5: FINAL CTA
          ======================================== */}
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-gray-200 bg-white p-12 text-center"
            >
              <div className="space-y-8">
                <h2 className="text-5xl font-semibold">
                  {cta.headline}
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  {cta.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                  <Button
                    size="lg"
                    className="text-lg px-10 py-6"
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
                    className="text-lg px-10 py-6"
                    asChild
                  >
                    <Link href={cta.secondaryCTA.link} target="_blank" rel="noopener noreferrer">
                      {cta.secondaryCTA.text}
                    </Link>
                  </Button>
                </div>

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
