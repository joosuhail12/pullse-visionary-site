'use client';

import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import GlassCard from '@/components/company/GlassCard';
import PageLiquidBackground from '@/components/PageLiquidBackground';

const LiquidEther = lazy(() => import('@/components/LiquidEther'));
import {
  cta,
  whatWeBelieve,
  antler,
} from '@/data/companyData';
import antlerLogo from '@/assets/antler-logo.png';

const Company = () => {
  return (
    <div className="min-h-screen">
      <PageLiquidBackground opacity={0.3} />
      <Navigation />

      {/* ========================================
          SECTION 1: HERO - Founder-Led
      ======================================== */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] lg:min-h-screen flex items-center overflow-hidden pt-16 md:pt-20">
        {/* Gradient Base Layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-background -z-20" />

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] -z-20" />

        {/* Liquid Ether Background */}
        <div className="absolute inset-0 -z-10 opacity-55 hidden md:block">
          <Suspense fallback={<div className="w-full h-full" />}>
            <LiquidEther
              colors={["#FF00C8", "#A805FF", "#D3A9EA"]}
              mouseForce={20}
              cursorSize={110}
              isViscous={false}
              resolution={0.55}
              autoDemo
              autoSpeed={0.35}
              autoIntensity={1.6}
            />
          </Suspense>
        </div>

        <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
          <div className="max-w-5xl mx-auto">
            {/* Text Content */}
            <div className="flex flex-col items-center text-center">
              <div className="space-y-6 md:space-y-8 lg:space-y-10 w-full">
                {/* Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-foreground leading-[1.1] tracking-tight"
                >
                  Building the support platform
                  <span className="block text-primary">we always wished existed</span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
                  className="text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground leading-relaxed"
                >
                  After years managing support teams drowning in 10+ disconnected tools, we're building one AI-native platform that actually works together.
                </motion.p>

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
                  className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center"
                >
                  <Button
                    size="lg"
                    className="text-sm md:text-base px-6 py-5 md:px-8 md:py-7 shadow-xl shadow-primary/20 group"
                    asChild
                  >
                    <Link href={cta.primaryCTA.link}>
                      {cta.primaryCTA.text}
                      <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-sm md:text-base px-6 py-4 md:px-8 md:py-6 bg-white/60 backdrop-blur-sm border-white/40 hover:bg-white/80 transition-all duration-300"
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
          SECTION 2: FOUNDER'S LETTER - Modern Bento Grid
      ======================================== */}
      <section className="relative py-12 md:py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-background via-muted/5 to-background">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-purple-500/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 md:mb-12 lg:mb-16"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-4 md:mb-5 lg:mb-6 tracking-tight">
                <span className="bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent">
                  The Era of Tool Sprawl is Ending
                </span>
              </h2>
            </motion.div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 lg:gap-6 mb-6 md:mb-8">
              {/* Large Stat Card - 275 Apps */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="md:col-span-6 group"
              >
                <div className="relative h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                  <div className="relative h-full bg-white/60 backdrop-blur-2xl border border-white/60 rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-8 hover:bg-white/70 hover:backdrop-blur-3xl hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
                    <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">
                      The Stack Today
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5 }}
                      className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-4"
                    >
                      275
                    </motion.div>
                    <div className="text-base md:text-lg text-gray-700 font-medium leading-snug mb-4">
                      average SaaS apps per company — each with its own logins, data model, and workflows.
                    </div>
                    <div className="text-sm text-gray-600 italic leading-relaxed">
                      Over half of those licenses sit idle, wasting ~$21M per year in unused software.
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Problem Paragraph */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="md:col-span-6"
              >
                <div className="h-full flex flex-col justify-center bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-8 hover:bg-white/50 transition-all duration-500">
                  <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">
                    The Cost of "There's an App for That"
                  </div>
                  <p className="text-base leading-relaxed text-gray-800">
                    For a decade, we glorified tool choice and ended up with fragmentation. Teams now run hundreds of apps, duplicate workflows, and overlapping data. More software hasn't meant more leverage — it's meant more glue work just to keep the stack from falling apart.
                  </p>
                </div>
              </motion.div>

              {/* Small Stat Cards Row */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="md:col-span-4 group"
              >
                <div className="relative h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                  <div className="relative h-full bg-white/60 backdrop-blur-2xl border border-white/60 rounded-2xl md:rounded-3xl p-4 md:p-5 lg:p-6 hover:bg-white/70 hover:backdrop-blur-3xl hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 text-center">
                    <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">
                      Context Switches
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5 }}
                      className="text-5xl md:text-6xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2"
                    >
                      ~1,200
                    </motion.div>
                    <div className="text-sm text-gray-600 font-medium leading-relaxed">
                      average app and tab toggles per digital worker every day. That "toggle tax" adds up fast.
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="md:col-span-4 group"
              >
                <div className="relative h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                  <div className="relative h-full bg-white/60 backdrop-blur-2xl border border-white/60 rounded-2xl md:rounded-3xl p-4 md:p-5 lg:p-6 hover:bg-white/70 hover:backdrop-blur-3xl hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 text-center">
                    <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">
                      Time Lost
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5 }}
                      className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2"
                    >
                      9%
                    </motion.div>
                    <div className="text-sm text-gray-600 font-medium leading-relaxed">
                      of the work week is burned just re-orienting after switching tools — nearly four full workweeks a year, gone to overhead instead of outcomes.
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* AI Context Paragraph */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="md:col-span-4"
              >
                <div className="h-full flex flex-col justify-center bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl md:rounded-3xl p-4 md:p-5 lg:p-6 hover:bg-white/50 transition-all duration-500">
                  <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">
                    AI on Broken Foundations
                  </div>
                  <p className="text-sm leading-relaxed text-gray-800">
                    74% of companies still can't show tangible business value from their AI investments. Only about 5% are seeing real, measurable impact. The reason isn't the models — it's trying to bolt AI onto fragmented stacks where context is scattered and workflows weren't designed for agents at all.
                  </p>
                </div>
              </motion.div>

              {/* Core Belief Box - Full Width */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="md:col-span-12 group"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
                  <div className="relative bg-white/60 backdrop-blur-2xl border-2 border-primary/30 rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-8 md:p-10 hover:bg-white/70 hover:backdrop-blur-3xl hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
                    <div className="text-xs uppercase tracking-widest text-primary font-semibold mb-4">
                      Our Belief
                    </div>
                    <div className="space-y-4">
                      <p className="text-lg md:text-xl leading-relaxed text-gray-900 font-medium">
                        We believe the future belongs to <span className="font-bold text-primary">specialized agentic AI</span> — purpose-built agents and copilots that run entire business functions end-to-end, coordinated by a shared brain across the company. Not bolt-on bots. Not yet another point tool. Fewer, deeper systems where humans and agents share the same environment, see the same context, and can hand work back and forth seamlessly.
                      </p>
                      <p className="text-lg md:text-xl leading-relaxed text-gray-900 font-medium">
                        In that world, AI doesn't sit on the side suggesting text. It plans, executes, and checks work under clear guardrails — and <span className="font-bold">humans always retain parallel control</span> over every action.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Solution Paragraph */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="md:col-span-7"
              >
                <div className="h-full flex items-center bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-8 hover:bg-white/50 transition-all duration-500">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">
                      What We're Building
                    </div>
                    <div className="space-y-4">
                      <p className="text-base leading-relaxed text-gray-800">
                        <span className="font-bold text-primary">Pullse</span> is our first proof of this model: an AI-native platform that covers the entire customer support value chain in one place — inbox, chat, workflows, chatbots, agentic copilots, QA, knowledge, and analytics.
                      </p>
                      <p className="text-base leading-relaxed text-gray-800">
                        Always-on agents handle the repetitive scaffolding: classification, routing, tagging, QA. On-demand agentic copilots act like teammates you can summon to actually <em>do</em> the work across your stack — update the CRM, issue the refund, notify billing, summarize the case — while humans stay firmly in control. Starting with support, we're building the template for domain-native agentic platforms across the rest of the business.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Closing Statement */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="md:col-span-5"
              >
                <div className="h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-purple-500/5 backdrop-blur-xl border border-primary/20 rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-8">
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent leading-tight">
                      Fewer systems.<br />More real work.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* CTA to Full Founder's Letter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex justify-center"
            >
              <Button
                size="lg"
                variant="outline"
                className="text-sm md:text-base px-6 py-4 md:px-8 md:py-5 lg:px-10 lg:py-6 bg-white/60 backdrop-blur-xl border-primary/30 hover:bg-white/80 hover:backdrop-blur-2xl hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 group"
                asChild
              >
                <Link href="/blog/the-era-of-tool-sprawl-is-ending-here-s-what-comes-next">
                  Read the Full Founder's Letter
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 3: WHAT WE BELIEVE
      ======================================== */}
      <section className="relative py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8 md:mb-12 lg:mb-16 relative z-10"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-5 lg:mb-6 tracking-[-0.01em]">
                <span className="bg-gradient-to-r from-gray-900 to-primary bg-clip-text text-transparent">
                  {whatWeBelieve.title}
                </span>
              </h2>
              <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {whatWeBelieve.subtitle}
              </p>
            </motion.div>

            {/* Unified 2x3 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
              {whatWeBelieve.beliefs.map((belief, idx) => (
                <motion.div
                  key={belief.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative"
                >
                  <div className="relative h-full bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-8 hover:bg-white/80 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                    {/* Spotlight effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />
                    </div>

                    <div className="relative z-10">
                      {/* Icon */}
                      <div className="mb-4 md:mb-5 lg:mb-6">
                        <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 text-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                          <belief.icon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4 text-gray-900 group-hover:text-primary transition-colors duration-300">
                        {belief.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                        {belief.description}
                      </p>

                      {/* Gradient accent on hover */}
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 4: BACKED BY ANTLER
      ======================================== */}
      <section className="relative py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              {/* Gradient glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-orange-500/20 rounded-2xl md:rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />

              {/* Main card */}
              <div className="relative bg-white/70 backdrop-blur-xl border-2 border-orange-500/30 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 hover:bg-white/80 hover:border-orange-500/40 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5 pointer-events-none" />

                <div className="relative flex flex-col md:flex-row items-center gap-5 md:gap-8 lg:gap-12">
                  {/* Logo container */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl md:rounded-2xl blur-xl" />
                      <div className="relative bg-white/90 backdrop-blur-md rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-8 shadow-xl border border-white/60">
                        <Image
                          src={antlerLogo}
                          alt="Antler"
                          width={120}
                          height={48}
                          className="w-auto h-10 md:h-12"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
                      <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                        Backed by Antler
                      </span>
                    </h2>
                    <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed mb-4 md:mb-5 lg:mb-6">
                      {antler.description}
                    </p>
                    <Button
                      variant="outline"
                      size="lg"
                      className="text-sm md:text-base px-6 py-4 md:px-8 md:py-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 border-2 border-orange-500/30 hover:border-orange-500/50 hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-red-500/20 transition-all duration-300 group/btn"
                      asChild
                    >
                      <Link href={antler.website} target="_blank" rel="noopener noreferrer">
                        View Portfolio
                        <ExternalLink className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 5: GET STARTED
      ======================================== */}
      <section className="relative py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto relative">
            <GlassCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              intensity="strong"
              gradient
              className="relative p-8 md:p-12 lg:p-16 xl:p-24 text-center overflow-hidden"
            >
              {/* Enhanced Animated Gradient Orbs */}
              <div className="absolute top-0 right-0 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-primary/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-tr from-blue-600/30 to-cyan-600/30 rounded-full blur-3xl animate-pulse"></div>

              <div className="space-y-6 md:space-y-8 lg:space-y-10 relative z-10">
                {/* Larger Icon with Enhanced Shadow */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                  className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl md:rounded-3xl bg-gradient-to-br from-primary to-purple-600 shadow-2xl shadow-primary/50"
                >
                  <Sparkles className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white" />
                </motion.div>

                {/* Enhanced Headline */}
                <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold tracking-[-0.02em] leading-[1.1]">
                  <span className="bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent">
                    {cta.headline}
                  </span>
                </h2>

                {/* Enhanced Description with Better Typography */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="text-base md:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium"
                >
                  {cta.description}
                </motion.p>

                {/* Enhanced Button Group with Better Spacing */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-3 md:gap-4 lg:gap-5 items-center justify-center pt-4 md:pt-6"
                >
                  <Button
                    size="lg"
                    className="text-base md:text-lg font-bold px-8 py-5 md:px-10 md:py-6 lg:px-12 lg:py-7 bg-gradient-to-r from-primary via-purple-500 to-purple-600 hover:from-primary/90 hover:via-purple-500/90 hover:to-purple-600/90 shadow-[0_10px_30px_rgba(124,58,237,0.25)] hover:shadow-[0_15px_40px_rgba(124,58,237,0.35)] transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
                    asChild
                  >
                    <Link href={cta.primaryCTA.link}>
                      {cta.primaryCTA.text}
                      <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-sm md:text-base font-semibold px-6 py-4 md:px-8 md:py-5 lg:px-10 lg:py-6 bg-white/70 backdrop-blur-md border-2 border-white/50 hover:bg-white/90 hover:border-white/70 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                    asChild
                  >
                    <Link href={cta.secondaryCTA.link} target="_blank" rel="noopener noreferrer">
                      {cta.secondaryCTA.text}
                    </Link>
                  </Button>
                </motion.div>
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
