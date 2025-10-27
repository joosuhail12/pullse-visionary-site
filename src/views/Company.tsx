'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageLiquidBackground from '@/components/PageLiquidBackground';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Timeline from '@/components/company/Timeline';
import ValueCard from '@/components/company/ValueCard';
import TeamMember from '@/components/company/TeamMember';
import {
  story,
  mission,
  vision,
  timeline,
  values,
  team,
  antler,
  cta,
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200/50 mb-6"
            >
              <span className="text-sm font-medium text-purple-600">
                Antler-Backed
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Reimagining Customer Support{' '}
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                with AI
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Built by operators who experienced the pain of complex, expensive
              support tools
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href={cta.primaryCTA.link}>
                  {cta.primaryCTA.text}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              {cta.secondaryCTA && (
                <Button size="lg" variant="outline" asChild>
                  <Link href={cta.secondaryCTA.link}>
                    {cta.secondaryCTA.text}
                  </Link>
                </Button>
              )}
            </div>
          </motion.div>

          {/* The Story Section */}
          <div className="max-w-5xl mx-auto mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4">Why We're Building Pullse</h2>
              <p className="text-lg text-muted-foreground">
                The problem we experienced firsthand
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Problem */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-strong p-8 rounded-3xl"
              >
                <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center mb-6">
                  <span className="text-2xl">❌</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">The Problem</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {story.problem}
                </p>
              </motion.div>

              {/* Solution */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-strong p-8 rounded-3xl ring-2 ring-purple-500/20"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mb-6">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Solution</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {story.why}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {story.solution}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Mission & Vision */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-32"
          >
            <div className="glass-strong p-12 rounded-3xl">
              <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
              <p className="text-xl leading-relaxed mb-12">{mission}</p>

              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-2xl font-bold mb-6">Our Vision</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {vision}
                </p>
              </div>
            </div>
          </motion.div>

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
            <div className="glass-strong p-12 rounded-3xl text-center relative overflow-hidden">
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10"></div>

              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {cta.headline}
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  {cta.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href={cta.primaryCTA.link}>
                      {cta.primaryCTA.text}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  {cta.secondaryCTA && (
                    <Button size="lg" variant="outline" asChild>
                      <Link href={cta.secondaryCTA.link}>
                        {cta.secondaryCTA.text}
                      </Link>
                    </Button>
                  )}
                </div>
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
