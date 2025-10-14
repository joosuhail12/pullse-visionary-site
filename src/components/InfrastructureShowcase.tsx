'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Database,
  Zap,
  BookOpen,
  Plug,
  ArrowRight,
  CheckCircle2,
  FileText,
  RefreshCw,
  Layers,
  Code,
  Shield,
  Activity,
  Upload,
  Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';

type HoveredSide = 'content' | 'action' | null;

export default function InfrastructureShowcase() {
  const [hoveredSide, setHoveredSide] = useState<HoveredSide>(null);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Grid dot background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Gradient mesh orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-green-600/20 via-emerald-500/10 to-transparent rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-600/20 via-indigo-500/10 to-transparent rounded-full blur-3xl"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="container mx-auto px-6 relative h-full flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full">
          {/* Compact Header */}
          <div className="text-center mb-12">
            <motion.h2
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-foreground mb-4 leading-[0.9] tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Connect once.{" "}
              <span className="bg-gradient-to-r from-green-600 via-primary to-purple-600 bg-clip-text text-transparent">
                Use everywhere.
              </span>
            </motion.h2>

            <motion.p
              className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Two built-in systems that power the AI Engine. Connect your knowledge and tools once—they work everywhere.
            </motion.p>
          </div>

          {/* Split View */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Content Center */}
            <motion.div
              className={cn(
                'relative rounded-3xl border transition-all duration-500 overflow-hidden group backdrop-blur-xl',
                hoveredSide === 'content'
                  ? 'bg-gradient-to-br from-white/[0.05] to-white/[0.02] border-green-600/50 shadow-2xl shadow-green-600/20'
                  : 'bg-gradient-to-br from-white/[0.02] to-white/[0.01] border-white/10 hover:border-green-600/30'
              )}
              onMouseEnter={() => setHoveredSide('content')}
              onMouseLeave={() => setHoveredSide(null)}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -4 }}
            >
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 via-transparent to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-600 to-emerald-600 shadow-xl shadow-green-600/30"
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Database className="h-7 w-7 text-white" />
                      <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        Content Center
                      </h3>
                      <p className="text-xs text-muted-foreground font-medium">Knowledge foundation</p>
                    </div>
                  </div>
                  <motion.div
                    className="text-xs font-bold text-green-600 bg-gradient-to-br from-green-600/20 to-emerald-600/10 px-4 py-2 rounded-full border border-green-600/40 shadow-lg shadow-green-600/5 backdrop-blur-sm"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    10K+ docs
                  </motion.div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  Add content 4 ways—snippets, files, URLs, or Appo articles. The AI Engine retrieves exactly what it needs.
                </p>

                {/* 4 Methods Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: FileText, label: 'Snippets', desc: 'Quick FAQs', gradient: 'from-green-600 to-emerald-600' },
                    { icon: Upload, label: 'Files', desc: 'PDFs, docs', gradient: 'from-emerald-600 to-teal-600' },
                    { icon: Globe, label: 'URLs', desc: 'Web scraping', gradient: 'from-teal-600 to-cyan-600' },
                    { icon: BookOpen, label: 'Appo', desc: 'Help center', gradient: 'from-cyan-600 to-blue-600' }
                  ].map((method, i) => (
                    <motion.div
                      key={i}
                      className="group/item relative p-4 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] hover:from-white/[0.05] hover:to-white/[0.02] hover:border-green-600/40 transition-all duration-300 cursor-pointer overflow-hidden"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: hoveredSide === 'content' ? 0.1 + i * 0.05 : 0 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity" />
                      <div className="relative">
                        <div className={cn("inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg mb-3", method.gradient)}>
                          <method.icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="font-bold text-sm text-foreground mb-1">{method.label}</div>
                        <div className="text-xs text-muted-foreground">{method.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Features List */}
                <motion.div
                  className="mt-6 pt-6 border-t border-white/10 space-y-2.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredSide === 'content' ? 1 : 0.6 }}
                  transition={{ duration: 0.3 }}
                >
                  {[
                    'Auto-indexes and chunks content',
                    'Always up-to-date, zero maintenance',
                    'Works across all deployments'
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-2.5 text-xs text-muted-foreground group/feature"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: hoveredSide === 'content' ? 0.2 + i * 0.05 : 0 }}
                    >
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-600/10 group-hover/feature:bg-green-600/20 transition-colors">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-600 flex-shrink-0" />
                      </div>
                      <span className="group-hover/feature:text-foreground transition-colors">{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Action Center */}
            <motion.div
              className={cn(
                'relative rounded-3xl border transition-all duration-500 overflow-hidden group backdrop-blur-xl',
                hoveredSide === 'action'
                  ? 'bg-gradient-to-br from-white/[0.05] to-white/[0.02] border-purple-600/50 shadow-2xl shadow-purple-600/20'
                  : 'bg-gradient-to-br from-white/[0.02] to-white/[0.01] border-white/10 hover:border-purple-600/30'
              )}
              onMouseEnter={() => setHoveredSide('action')}
              onMouseLeave={() => setHoveredSide(null)}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -4 }}
            >
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-xl shadow-purple-600/30"
                      whileHover={{ scale: 1.05, rotate: -5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Zap className="h-7 w-7 text-white" />
                      <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                        Action Center
                      </h3>
                      <p className="text-xs text-muted-foreground font-medium">Execution layer</p>
                    </div>
                  </div>
                  <motion.div
                    className="text-xs font-bold text-purple-600 bg-gradient-to-br from-purple-600/20 to-indigo-600/10 px-4 py-2 rounded-full border border-purple-600/40 shadow-lg shadow-purple-600/5 backdrop-blur-sm"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    2.4M+/mo
                  </motion.div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  Connect tools once—the AI Engine executes real actions. Secure, governed, and fully audited.
                </p>

                {/* 4 Capabilities Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Plug, label: 'Connectors', desc: '50+ integrations', gradient: 'from-purple-600 to-indigo-600' },
                    { icon: Code, label: 'Custom APIs', desc: 'Any REST API', gradient: 'from-indigo-600 to-blue-600' },
                    { icon: Shield, label: 'Approvals', desc: 'Gated actions', gradient: 'from-blue-600 to-cyan-600' },
                    { icon: Activity, label: 'Audit Log', desc: 'Full tracking', gradient: 'from-cyan-600 to-teal-600' }
                  ].map((capability, i) => (
                    <motion.div
                      key={i}
                      className="group/item relative p-4 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] hover:from-white/[0.05] hover:to-white/[0.02] hover:border-purple-600/40 transition-all duration-300 cursor-pointer overflow-hidden"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: hoveredSide === 'action' ? 0.1 + i * 0.05 : 0 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity" />
                      <div className="relative">
                        <div className={cn("inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg mb-3", capability.gradient)}>
                          <capability.icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="font-bold text-sm text-foreground mb-1">{capability.label}</div>
                        <div className="text-xs text-muted-foreground">{capability.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Features List */}
                <motion.div
                  className="mt-6 pt-6 border-t border-white/10 space-y-2.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredSide === 'action' ? 1 : 0.6 }}
                  transition={{ duration: 0.3 }}
                >
                  {[
                    'Refunds, updates, workflows, tickets',
                    'Multi-level approval workflows',
                    'Complete audit trail & governance'
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-2.5 text-xs text-muted-foreground group/feature"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: hoveredSide === 'action' ? 0.2 + i * 0.05 : 0 }}
                    >
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-600/10 group-hover/feature:bg-purple-600/20 transition-colors">
                        <CheckCircle2 className="h-3.5 w-3.5 text-purple-600 flex-shrink-0" />
                      </div>
                      <span className="group-hover/feature:text-foreground transition-colors">{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Flow Indicator */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full border border-white/20 bg-gradient-to-r from-white/[0.03] to-white/[0.01] backdrop-blur-xl shadow-xl">
              <motion.div
                className="flex items-center gap-2.5"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 shadow-lg shadow-green-600/20">
                  <Database className="h-4 w-4 text-white" />
                </div>
                <span className="text-xs font-bold text-green-600">Content</span>
              </motion.div>

              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="h-4 w-4 text-muted-foreground/50" />
              </motion.div>

              <motion.div
                className="flex items-center gap-2.5"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-600 shadow-lg">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs font-bold text-primary">AI Engine</span>
              </motion.div>

              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              >
                <ArrowRight className="h-4 w-4 text-muted-foreground/50" />
              </motion.div>

              <motion.div
                className="flex items-center gap-2.5"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg shadow-purple-600/20">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <span className="text-xs font-bold text-purple-600">Actions</span>
              </motion.div>

              <div className="ml-3 pl-4 border-l border-white/20">
                <span className="text-xs font-medium text-muted-foreground">One pipeline, infinite deployments</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
