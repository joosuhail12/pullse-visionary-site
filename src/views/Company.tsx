'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Calendar, Layers, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import TeamCard from '@/components/company/TeamCard';
import JourneySection from '@/components/company/JourneySection';
import GlassCard from '@/components/company/GlassCard';
import PageLiquidBackground from '@/components/PageLiquidBackground';
import {
  antler,
  cta,
  ourApproach,
  team,
  timeline,
} from '@/data/companyData';
import antlerLogo from '@/assets/antler-logo.png';

const Company = () => {
  return (
    <div className="min-h-screen bg-white relative">
      <PageLiquidBackground opacity={0.25} />
      <Navigation />

      {/* ========================================
          SECTION 1: HERO - Founder-Led
      ======================================== */}
      <section className="relative overflow-hidden pt-32 pb-20 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Layered Gradient Orbs with Different Animations */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.3, 0.15],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/25 to-purple-600/25 blur-[120px] pointer-events-none -z-10"
        />

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.25, 0.1],
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
          className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-purple-500/20 to-primary/20 blur-[100px] pointer-events-none -z-10"
        />

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.08, 0.2, 0.08],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-r from-primary/15 via-purple-600/15 to-primary/15 blur-[140px] pointer-events-none -z-10"
        />

        {/* Content Container */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Text Content */}
            <div className="flex flex-col items-center text-center">
              <div className="space-y-10 w-full">
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
          SECTION 2: FOUNDER MANIFESTO - Modern Bento Grid
      ======================================== */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-white via-gray-50/30 to-white">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 mb-6"
              >
                <span className="text-sm font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Our Manifesto
                </span>
              </motion.div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
                <span className="bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent">
                  The Era of Tool Sprawl is Ending
                </span>
              </h2>
            </motion.div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
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
                  <div className="relative h-full bg-white/60 backdrop-blur-2xl border border-white/60 rounded-3xl p-8 hover:bg-white/70 hover:backdrop-blur-3xl hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
                    <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">
                      The Problem
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5 }}
                      className="text-7xl md:text-8xl font-black bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-4"
                    >
                      275
                    </motion.div>
                    <div className="text-lg text-gray-700 font-medium leading-snug">
                      average SaaS applications per enterprise
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
                <div className="h-full flex items-center bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl p-8 hover:bg-white/50 transition-all duration-500">
                  <p className="text-base leading-relaxed text-gray-800">
                    For a decade, we glorified <span className="font-semibold text-gray-900">"there's an app for that"</span>—and got exactly what we asked for: <span className="font-semibold text-primary">fragmentation</span>. Employees toggle between apps{' '}
                    <span className="font-bold text-primary">~1,200 times per day</span>, burning nearly{' '}
                    <span className="font-bold text-primary">9% of every week</span> just switching between tools. The financial waste runs into millions annually.
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
                  <div className="relative h-full bg-white/60 backdrop-blur-2xl border border-white/60 rounded-3xl p-6 hover:bg-white/70 hover:backdrop-blur-3xl hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 text-center">
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
                    <div className="text-sm text-gray-600 font-medium">
                      per employee per day
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
                  <div className="relative h-full bg-white/60 backdrop-blur-2xl border border-white/60 rounded-3xl p-6 hover:bg-white/70 hover:backdrop-blur-3xl hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 text-center">
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
                    <div className="text-sm text-gray-600 font-medium">
                      of work week wasted
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
                <div className="h-full flex items-center bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl p-6 hover:bg-white/50 transition-all duration-500">
                  <p className="text-sm leading-relaxed text-gray-800">
                    AI changes the calculus, but only if we change the architecture. Models thrive on <span className="font-semibold text-gray-900">aggregation and continuity</span>; they fail when context is shattered across disconnected tools.
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
                  <div className="relative bg-white/60 backdrop-blur-2xl border-2 border-primary/30 rounded-3xl p-8 md:p-10 hover:bg-white/70 hover:backdrop-blur-3xl hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
                    <div className="text-xs uppercase tracking-widest text-primary font-semibold mb-4">
                      Our Vision
                    </div>
                    <p className="text-lg md:text-xl leading-relaxed text-gray-900 font-medium">
                      We believe the future belongs to <span className="font-bold text-primary">specialized agentic AI</span>—purpose-built agents that run entire business functions end-to-end, coordinated by a central brain that shares context and enables seamless handoffs. Not bolt-on bots. Not more point solutions. Intelligent systems that read, decide, and act safely under guardrails—then involve humans when judgment is truly required. <span className="font-bold">Crucially, humans always retain parallel control</span>: every action AI can take, humans can take manually.
                    </p>
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
                <div className="h-full flex items-center bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl p-8 hover:bg-white/50 transition-all duration-500">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">
                      What We're Building
                    </div>
                    <p className="text-base leading-relaxed text-gray-800">
                      That's <span className="font-bold text-primary">Pullse</span>: enterprise-grade AI for SMBs and mid-market companies with interfaces that stay simple as capabilities scale. A{' '}
                      <span className="font-bold text-primary">50-person company improving efficiency by 40%</span> transforms their entire operation. Starting with customer support, we're making AI-native enterprise capabilities accessible.
                    </p>
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
                <div className="h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-purple-500/5 backdrop-blur-xl border border-primary/20 rounded-3xl p-8">
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent leading-tight">
                      Fewer systems.<br />More outcomes.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* CTA to Full Manifesto */}
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
                className="text-base px-10 py-6 bg-white/60 backdrop-blur-xl border-primary/30 hover:bg-white/80 hover:backdrop-blur-2xl hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 group"
                asChild
              >
                <Link href="/blog/the-era-of-tool-sprawl-is-ending-here-s-what-comes-next">
                  Read the Complete Manifesto
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 3: OUR APPROACH (Merged Values + Why Support)
      ======================================== */}
      <section className="relative py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-20 relative z-10"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, type: 'spring' }}
                className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 mb-6"
              >
                <span className="text-sm font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Our Approach
                </span>
              </motion.div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-[-0.01em]">
                <span className="bg-gradient-to-r from-gray-900 to-primary bg-clip-text text-transparent">
                  {ourApproach.title}
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {ourApproach.subtitle}
              </p>
            </motion.div>

            {/* Symmetric 3x2 Grid with Narrative Flow */}
            <div className="space-y-8">
              {/* Foundation Row Label */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3"
              >
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-primary/30" />
                <span className="text-sm font-bold uppercase tracking-wider text-primary/70">Foundation</span>
                <div className="h-px w-12 bg-gradient-to-r from-primary/30 to-transparent" />
              </motion.div>

              {/* Foundation Row (First 3 principles) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {ourApproach.principles.slice(0, 3).map((principle, idx) => (
                  <motion.div
                    key={principle.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="group relative"
                  >
                    <div className="relative h-full bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl p-8 hover:bg-white/80 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                      {/* Spotlight effect on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />
                      </div>

                      <div className="relative z-10">
                        {/* Icon with enhanced hover effect */}
                        <div className="mb-6">
                          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 text-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                            <principle.icon className="w-8 h-8" />
                          </div>
                        </div>

                        {/* Content */}
                        <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-900 group-hover:text-primary transition-colors duration-300">
                          {principle.title}
                        </h3>
                        <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-5">
                          {principle.description}
                        </p>

                        {/* In Practice Section */}
                        <div className="pt-4 border-t border-gray-200/60">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-1 h-1 rounded-full bg-primary" />
                            <span className="text-xs font-bold uppercase tracking-wider text-primary/70">In Practice</span>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed italic">
                            {principle.inPractice}
                          </p>
                        </div>

                        {/* Enhanced gradient accent on hover */}
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Visual Connector with Arrow */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="flex items-center justify-center py-4"
              >
                <div className="flex items-center gap-2">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/30" />
                  <div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse" />
                  <div className="h-px w-4 bg-primary/30" />
                  <svg className="w-4 h-4 text-primary/50" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v10.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  <div className="h-px w-4 bg-primary/30" />
                  <div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/30" />
                </div>
              </motion.div>

              {/* Execution Row Label */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="flex items-center gap-3"
              >
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/30 to-purple-500/30" />
                <span className="text-sm font-bold uppercase tracking-wider text-purple-600/70">Execution</span>
                <div className="h-px w-12 bg-gradient-to-r from-purple-500/30 to-transparent" />
              </motion.div>

              {/* Execution Row (Last 3 principles) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {ourApproach.principles.slice(3, 6).map((principle, idx) => (
                  <motion.div
                    key={principle.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (idx + 3) * 0.1 }}
                    className="group relative"
                  >
                    <div className="relative h-full bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl p-8 hover:bg-white/80 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                      {/* Spotlight effect on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-primary/5" />
                      </div>

                      <div className="relative z-10">
                        {/* Icon with enhanced hover effect */}
                        <div className="mb-6">
                          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-primary/20 text-purple-600 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                            <principle.icon className="w-8 h-8" />
                          </div>
                        </div>

                        {/* Content */}
                        <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                          {principle.title}
                        </h3>
                        <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-5">
                          {principle.description}
                        </p>

                        {/* In Practice Section */}
                        <div className="pt-4 border-t border-gray-200/60">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-1 h-1 rounded-full bg-purple-600" />
                            <span className="text-xs font-bold uppercase tracking-wider text-purple-600/70">In Practice</span>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed italic">
                            {principle.inPractice}
                          </p>
                        </div>

                        {/* Enhanced gradient accent on hover */}
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/60 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 4: THE JOURNEY
      ======================================== */}
      <section className="relative py-32">
        <div className="container mx-auto px-4">
          <JourneySection milestones={timeline} antler={antler} />
        </div>
      </section>

      {/* ========================================
          SECTION 5: WHO'S BUILDING THIS
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
              <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-[-0.01em]">
                <span className="bg-gradient-to-r from-gray-900 to-orange-600 bg-clip-text text-transparent">
                  Who's Building This
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Meet the founders who lived the problem
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
          SECTION 6: JOIN EARLY ACCESS
      ======================================== */}
      <section className="relative py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto relative">
            <GlassCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              intensity="strong"
              gradient
              className="relative p-12 md:p-20 lg:p-24 text-center overflow-hidden"
            >
              {/* Enhanced Animated Gradient Orbs */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-600/30 to-cyan-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

              <div className="space-y-10 relative z-10">
                {/* Larger Icon with Enhanced Shadow */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                  className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-purple-600 shadow-2xl shadow-primary/50"
                >
                  <Sparkles className="w-12 h-12 text-white" />
                </motion.div>

                {/* Enhanced Headline */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] leading-[1.1]">
                  <span className="bg-gradient-to-r from-gray-900 via-primary to-purple-600 bg-clip-text text-transparent">
                    {cta.headline}
                  </span>
                </h2>

                {/* Enhanced Trust Indicators with Better Visual Hierarchy */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex flex-wrap items-center justify-center gap-4"
                >
                  <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-white/60 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                    <Image src={antlerLogo} alt="Antler" width={70} height={28} className="h-5 w-auto" />
                    <span className="text-sm font-bold text-gray-800">Antler-backed</span>
                  </div>
                  <div className="px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/15 to-purple-600/15 border-2 border-primary/30 hover:border-primary/50 hover:scale-105 transition-all duration-300 shadow-lg">
                    <span className="text-sm font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Launching Q4 2025</span>
                  </div>
                  <div className="px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500/15 to-red-500/15 border-2 border-orange-500/30 hover:border-orange-500/50 hover:scale-105 transition-all duration-300 shadow-lg">
                    <span className="text-sm font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Limited Early Access</span>
                  </div>
                </motion.div>

                {/* Enhanced Description with Better Typography */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium"
                >
                  {cta.description}
                </motion.p>

                {/* Enhanced Button Group with Better Spacing */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-5 items-center justify-center pt-6"
                >
                  <Button
                    size="lg"
                    className="text-lg font-bold px-12 py-7 bg-gradient-to-r from-primary via-purple-500 to-purple-600 hover:from-primary/90 hover:via-purple-500/90 hover:to-purple-600/90 shadow-[0_10px_30px_rgba(124,58,237,0.25)] hover:shadow-[0_15px_40px_rgba(124,58,237,0.35)] transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
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
                    className="text-base font-semibold px-10 py-6 bg-white/70 backdrop-blur-md border-2 border-white/50 hover:bg-white/90 hover:border-white/70 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
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
