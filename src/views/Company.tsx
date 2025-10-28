'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageLiquidBackground from '@/components/PageLiquidBackground';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
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
          <div className="max-w-5xl mx-auto text-center mb-40 relative pt-8">
            {/* Antler Badge - Top Right */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="absolute top-0 right-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-white"
            >
              <Image
                src={antlerLogo}
                alt="Antler"
                width={50}
                height={20}
                className="h-4 w-auto"
              />
              <span className="text-xs font-medium text-muted-foreground">
                Backed by Antler
              </span>
            </motion.div>

            <div className="relative z-10">
              {/* Accent Line Element */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.3 }}
                className="flex items-center justify-center gap-2 mb-8"
              >
                <div className="w-12 h-px bg-gray-300"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                <div className="w-12 h-px bg-gray-300"></div>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="text-6xl md:text-8xl font-semibold mb-10 leading-[0.95] tracking-tight text-foreground"
              >
                Building the Operating System
                <br />
                for AI-Native Business
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="text-xl md:text-2xl text-muted-foreground mb-14 max-w-3xl mx-auto leading-relaxed"
              >
                One AI brain. Infinite business functions. Starting with customer support.
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.3 }}
              >
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
              </motion.div>
            </div>
          </div>

          {/* ========================================
              SECTION 2: THE STORY - "Why We Exist"
          ======================================== */}
          <div className="max-w-5xl mx-auto mb-40">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl font-semibold mb-6 tracking-tight">
                Why We're Building Pullse
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
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
          <div className="mb-40">
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
          <div className="max-w-6xl mx-auto mb-40">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl font-semibold mb-6 tracking-tight">
                Who's Building This
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                The team and journey behind Pullse
              </p>
            </motion.div>

            {/* Team Section - Side by Side Cards */}
            <div className="max-w-6xl mx-auto mb-20">
              <div className="grid md:grid-cols-2 gap-8">
                {team.map((member) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    className="border border-gray-200 bg-white p-10 rounded-2xl transition-all duration-200 hover:border-gray-400 hover:-translate-y-1"
                  >
                    <div className="flex flex-col items-center text-center space-y-5">
                      {/* Avatar/Photo - Larger */}
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={128}
                          height={128}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200">
                          <span className="text-3xl font-semibold text-foreground">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      )}

                      {/* Name & Title */}
                      <div>
                        <h3 className="text-xl font-medium mb-2">{member.name}</h3>
                        <p className="text-base text-primary font-medium">{member.title}</p>
                      </div>

                      {/* Condensed Bio */}
                      <p className="text-base leading-loose text-muted-foreground">
                        {member.bio}
                      </p>

                      {/* Social Links */}
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
                        >
                          LinkedIn →
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Antler Card - Special Featured Treatment */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="p-10 rounded-2xl border border-gray-200 bg-white border-l-4 border-l-primary mb-20 hover:border-gray-400 transition-all duration-200"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="p-6 rounded-xl bg-gray-50">
                    <Image
                      src={antlerLogo}
                      alt="Antler"
                      width={120}
                      height={48}
                      className="h-10 w-auto"
                    />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-base font-semibold mb-2 text-foreground">Backed by Antler</h4>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {antler.description}
                  </p>
                </div>
                <a
                  href={antler.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  Learn more →
                </a>
              </div>
            </motion.div>

            {/* Journey Timeline */}
            <div className="mb-20">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center gap-3 mb-16"
              >
                <div className="w-8 h-px bg-gray-300"></div>
                <h3 className="text-3xl font-medium">The Journey</h3>
                <div className="w-8 h-px bg-gray-300"></div>
              </motion.div>
              <Timeline milestones={timeline} />
            </div>

            {/* Platform Vision - Enhanced Treatment */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <div className="p-10 rounded-2xl border border-gray-200 bg-white border-t-4 border-t-primary">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-primary rounded-full"></div>
                  <h3 className="text-2xl font-medium text-foreground">Beyond Customer Support</h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
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
              className="rounded-2xl border border-gray-200 bg-white p-16 text-center relative overflow-hidden"
            >
              {/* Accent Corner Element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-tr-full"></div>

              <div className="space-y-10 relative z-10">
                {/* Decorative Element */}
                <div className="flex items-center justify-center gap-2">
                  <div className="w-12 h-px bg-gray-300"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <div className="w-12 h-px bg-gray-300"></div>
                </div>

                <h2 className="text-5xl font-semibold tracking-tight leading-tight">
                  {cta.headline}
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  {cta.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-5 items-center justify-center pt-4">
                  <Button
                    size="lg"
                    className="text-lg px-12 py-7 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
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
                    className="text-lg px-12 py-7 hover:bg-gray-50 transition-all"
                    asChild
                  >
                    <Link href={cta.secondaryCTA.link} target="_blank" rel="noopener noreferrer">
                      {cta.secondaryCTA.text}
                    </Link>
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 pt-10 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <Image src={antlerLogo} alt="Antler" width={60} height={24} className="h-4 w-auto opacity-60" />
                    <span className="text-sm font-medium text-muted-foreground">Antler-backed</span>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Launching Q4 2025</span>
                  <span className="text-sm font-medium text-muted-foreground">Limited early access</span>
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
