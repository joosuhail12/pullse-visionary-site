'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageLiquidBackground from '@/components/PageLiquidBackground';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink, Target, Telescope } from 'lucide-react';
import Link from 'next/link';
import Timeline from '@/components/company/Timeline';
import ValueCard from '@/components/company/ValueCard';
import TeamMember from '@/components/company/TeamMember';
import FragmentationDiagram from '@/components/company/FragmentationDiagram';
import SaaSSprawlStats from '@/components/company/SaaSSprawlStats';
import PlatformVisionPreview from '@/components/company/PlatformVisionPreview';
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
  return (
    <div className="min-h-screen">
      <PageLiquidBackground opacity={0.3} />
      <Navigation />

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/50 mb-6"
            >
              <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Building the AI-Native Business Platform
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              The Future is{' '}
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Unified AI
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-4">
              Starting with customer support, building toward a unified AI
              platform for all business functions
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button size="lg" asChild>
                <Link href={cta.primaryCTA.link}>
                  {cta.primaryCTA.text}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* The Story Section - 3 Part Journey */}
          <div className="max-w-7xl mx-auto mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4">
                Why We're Building Pullse
              </h2>
              <p className="text-lg text-muted-foreground">
                From fragmentation to aggregation to the future of business
                software
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              {/* Part 1: The Problem */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-outlined p-8 rounded-3xl border-2"
              >
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6">
                  <span className="text-2xl">🔴</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-red-600">
                  The Problem
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {story.problem}
                </p>
              </motion.div>

              {/* Part 2: The Insight */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="card-vision p-8 rounded-3xl border-2 border-blue-500/30"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mb-6">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-blue-600">
                  The Insight
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {story.insight}
                </p>
              </motion.div>

              {/* Part 3: The Solution */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="card-current p-8 rounded-3xl ring-2 ring-purple-500/30"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mb-6">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  The Solution
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {story.solution}
                </p>
              </motion.div>
            </div>

            {/* SaaS Sprawl Stats */}
            <div className="mb-16">
              <SaaSSprawlStats />
            </div>

            {/* Fragmentation Diagram */}
            <div>
              <FragmentationDiagram />
            </div>
          </div>

          {/* Mission & Vision - Side by Side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto mb-32"
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Mission */}
              <div className="glass-elevated p-10 rounded-3xl">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">Our Mission</h2>
                  </div>
                </div>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {mission}
                </p>
              </div>

              {/* Vision */}
              <div className="glass-elevated p-10 rounded-3xl">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
                    <Telescope className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">Our Vision</h2>
                  </div>
                </div>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {vision}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Platform Vision Section */}
          <div className="max-w-7xl mx-auto mb-32">
            <PlatformVisionPreview />
          </div>

          {/* Why Customer Support First */}
          <div className="max-w-6xl mx-auto mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4">
                {whySupportFirst.headline}
              </h2>
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
                    className="glass-strong p-6 rounded-2xl hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-2">
                          {reason.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Timeline Section */}
          <div className="max-w-7xl mx-auto mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Our Journey</h2>
              <p className="text-lg text-muted-foreground">
                From idea to reality - building in public
              </p>
            </motion.div>

            <Timeline milestones={timeline} />
          </div>

          {/* Values Section */}
          <div className="max-w-6xl mx-auto mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-lg text-muted-foreground">
                The principles that guide everything we build
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <ValueCard key={index} value={value} index={index} />
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="max-w-6xl mx-auto mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Meet the Builders</h2>
              <p className="text-lg text-muted-foreground">
                The team bringing Pullse to life
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <TeamMember key={index} member={member} index={index} />
              ))}
            </div>
          </div>

          {/* Antler Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-32"
          >
            <div className="glass-strong p-12 rounded-3xl">
              <div className="mb-6 flex justify-center">
                {/* Antler logo placeholder - replace with actual logo */}
                <div className="text-4xl font-bold text-gray-400">ANTLER</div>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                {antler.description}
              </p>
              <a
                href={antler.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
              >
                Learn more about Antler
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="glass-gradient p-12 rounded-3xl text-center relative overflow-hidden border-2 border-purple-500/20">
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10"></div>

              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {cta.headline}
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  {cta.description}
                </p>

                <Button size="lg" asChild>
                  <Link href={cta.primaryCTA.link}>
                    {cta.primaryCTA.text}
                    <ArrowRight className="ml-2 h-5 w-5" />
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
