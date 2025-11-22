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
        {/* Large Stat Card - Stack load */}
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
              <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">The stack today</div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
                className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-4"
              >
                200-300
              </motion.div>
              <div className="text-base md:text-lg text-gray-700 font-medium leading-snug mb-4">
                SaaS apps per enterprise — each with its own logins, data model, and workflows.
              </div>
              <div className="text-sm text-gray-600 italic leading-relaxed">
                Half sit idle. Context scatters; humans become the glue.
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
            <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">Fragmentation tax</div>
            <p className="text-base leading-relaxed text-gray-800">
              A decade of “there’s an app for that” produced stacks stitched together by people: duplicate workflows, overlapping data, brittle handoffs. More software hasn’t meant more leverage—it’s meant more glue work just to keep the stack from cracking.
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
              <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">Adoption wasted</div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
                className="text-5xl md:text-6xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2"
              >
                ~50%
              </motion.div>
              <div className="text-sm text-gray-600 font-medium leading-relaxed">
                of purchased tools never see monthly use. Tool sprawl turns into shelfware.
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
              <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">AI impact gap</div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
                className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2"
              >
                5%
              </motion.div>
              <div className="text-sm text-gray-600 font-medium leading-relaxed">
                of teams report measurable GenAI impact; 74% can’t show business value when AI is bolted onto fragmented stacks.
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
            <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">AI on broken foundations</div>
            <p className="text-sm leading-relaxed text-gray-800">
              Models aren’t the blocker—the architecture is. When context is shattered across dozens of tools, agents can’t execute and humans stay trapped in swivel-chair workflows. AI stays shallow until the stack becomes coherent.
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
              <div className="text-xs uppercase tracking-widest text-primary font-semibold mb-4">Our belief</div>
              <div className="space-y-4">
                <p className="text-lg md:text-xl leading-relaxed text-gray-900 font-medium">
                  The future belongs to <span className="font-bold text-primary">specialized agentic platforms</span>—purpose-built systems where agents run entire functions end-to-end, coordinated by a central brain that shares context. Not bolt-on bots. Not more point tools. Intelligent systems that read, decide, and act under guardrails, escalating to humans when judgment is needed.
                </p>
                <p className="text-lg md:text-xl leading-relaxed text-gray-900 font-medium">
                  Crucially, <span className="font-bold">humans keep parallel control</span>: every action AI can take, people can take manually. No forced automation. Fewer, deeper systems where humans and agents share one environment, the same context, and hand work back and forth seamlessly.
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
              <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">What we're building</div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed text-gray-800">
                  <span className="font-bold text-primary">Pullse</span> is our first proof point: an agentic platform for support that feels coherent as it scales. One brain, always-on agents for the repetitive scaffolding, and on-demand copilots to actually <em>do</em> the work across your stack—while humans stay in the loop.
                </p>
                <p className="text-base leading-relaxed text-gray-800">
                  The belief: growing companies unlock outsized leverage when support stops being a wall of disconnected tools. Make humans and AI share the same canvas, and efficiency gains compound into better customer experiences.
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
                Fewer systems.<br />More outcomes.
              </p>
              <p className="text-sm text-gray-600 mt-3">
                Software that finally gets out of your way.
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
