'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CompanyBentoGrid() {
  return (
    <>
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
    </>
  );
}
