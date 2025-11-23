'use client';

import { motion } from 'framer-motion';
import {
  Bot,
  Sparkles,
  Clock,
  Shield,
  Zap,
  MessageSquare,
  FileText,
  Users,
  Activity,
  Globe,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Target
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DeploymentComparison() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
      {/* Background - Match Outcomes section */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.08),transparent_60%)]" />

      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Animated gradient orbs - Match hero section */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="container mx-auto px-6 relative">
        <div className="max-w-7xl mx-auto">
          {/* Header - Match Outcomes section */}
          <div className="text-center mb-20">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <Target className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold text-primary">Two Deployment Options</span>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-5xl lg:text-7xl font-black text-foreground mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Same engine.{" "}
              <span className="bg-gradient-to-r from-blue-600 via-primary to-purple-600 bg-clip-text text-transparent">
                Different interfaces.
              </span>
            </motion.h2>

            <motion.p
              className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Deploy your AI Engine as <span className="font-bold text-foreground">autonomous chatbots</span> or <span className="font-bold text-foreground">agent-assisting copilots</span>.
            </motion.p>
          </div>

          {/* 3-Column Grid - Match Outcomes section layout */}
          <div className="grid md:grid-cols-3 gap-8">

            {/* AI Chatbots - Left Column */}
            <motion.div
              className="group relative rounded-2xl border border-border/50 bg-gradient-to-br from-card/50 via-background/30 to-card/50 backdrop-blur-sm p-8 hover:border-blue-600/50 hover:shadow-2xl hover:shadow-blue-600/10 transition-all duration-500 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -12, scale: 1.03 }}
            >
              {/* Glow effect */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-blue-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

              <div className="relative">
                {/* Large Icon - Match Outcomes */}
                <motion.div
                  className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 shadow-2xl mb-8"
                  whileHover={{ scale: 1.15, rotate: 8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                  <Bot className="relative h-10 w-10 text-white" />
                </motion.div>

                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/30 mb-4">
                  <Globe className="h-3.5 w-3.5 text-blue-600" />
                  <span className="text-xs font-bold text-blue-600">Customer-Facing</span>
                </div>

                {/* Title */}
                <h3 className="text-3xl font-black text-foreground mb-3 tracking-tight">AI Chatbots</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Fully autonomous agents that handle customer conversations 24/7 across all channels.
                </p>

                {/* Feature Grid - 2x2 like InfrastructureShowcase */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { icon: Clock, label: 'Always-on', color: 'from-blue-600 to-cyan-600' },
                    { icon: Shield, label: '0% hallucinations', color: 'from-cyan-600 to-blue-500' },
                    { icon: Zap, label: 'Execute actions', color: 'from-blue-500 to-indigo-500' },
                    { icon: Users, label: 'Smart escalation', color: 'from-indigo-500 to-blue-600' }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-2 p-3 rounded-xl bg-blue-600/5 hover:bg-blue-600/10 border border-blue-600/10 hover:border-blue-600/30 transition-all"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br shadow-lg", item.color)}>
                        <item.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-xs font-bold text-foreground">{item.label}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Visual Metrics - Like Outcomes bar charts */}
                <div className="space-y-3 mb-6 p-4 rounded-xl bg-gradient-to-br from-blue-600/5 to-cyan-600/5 border border-blue-600/10">
                  <div className="text-xs font-bold text-blue-600 mb-3">Performance Metrics</div>

                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-muted-foreground">Auto-resolution</span>
                      <span className="font-bold text-foreground">78%</span>
                    </div>
                    <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: "78%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-muted-foreground">Customer satisfaction</span>
                      <span className="font-bold text-foreground">4.8/5</span>
                    </div>
                    <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-600 to-blue-500 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: "96%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Large Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-blue-600/20">
                  <div>
                    <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1">&lt;850ms</div>
                    <div className="text-xs text-muted-foreground">Response time</div>
                  </div>
                  <div className="h-12 w-px bg-blue-600/20" />
                  <div className="text-right">
                    <div className="text-3xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-1">24/7</div>
                    <div className="text-xs text-muted-foreground">Availability</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* AI Engine Core - Center Column */}
            <motion.div
              className="group relative rounded-2xl border border-border/50 bg-gradient-to-br from-card/50 via-background/30 to-card/50 backdrop-blur-sm p-8 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -12, scale: 1.03 }}
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/10 to-purple-600/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

              <div className="relative flex flex-col items-center text-center h-full justify-center">
                {/* Large Pulsing Icon */}
                <motion.div
                  className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-purple-600 to-pink-600 shadow-2xl mb-6"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(var(--primary-rgb), 0.3)",
                      "0 0 40px rgba(var(--primary-rgb), 0.5)",
                      "0 0 20px rgba(var(--primary-rgb), 0.3)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-purple-600 blur-xl opacity-60 animate-pulse" />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Activity className="relative h-12 w-12 text-white" />
                  </motion.div>
                </motion.div>

                <h3 className="text-3xl font-black bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-3">
                  AI Engine
                </h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-xs">
                  The same powerful engine drives both deployments. Configure once, deploy everywhere.
                </p>

                {/* Shared Infrastructure */}
                <div className="space-y-2 mb-6 w-full">
                  {[
                    { icon: FileText, label: 'Content Center', color: 'text-green-600' },
                    { icon: Zap, label: 'Action Center', color: 'text-purple-600' },
                    { icon: Shield, label: 'Governance', color: 'text-amber-600' }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/10 hover:bg-white/[0.05] transition-all"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white/5">
                        <item.icon className={cn("h-3.5 w-3.5", item.color)} />
                      </div>
                      <span className="text-xs font-semibold text-foreground">{item.label}</span>
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-500 ml-auto" />
                    </motion.div>
                  ))}
                </div>

                {/* Flow Arrows */}
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-primary/20">
                  <motion.div
                    animate={{ x: [-5, 0, -5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowRight className="h-4 w-4 text-blue-600 rotate-180" />
                  </motion.div>
                  <span className="text-xs font-bold text-primary">Powers Both</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowRight className="h-4 w-4 text-purple-600" />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* AI Copilots - Right Column */}
            <motion.div
              className="group relative rounded-2xl border border-border/50 bg-gradient-to-br from-card/50 via-background/30 to-card/50 backdrop-blur-sm p-8 hover:border-purple-600/50 hover:shadow-2xl hover:shadow-purple-600/10 transition-all duration-500 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -12, scale: 1.03 }}
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

              <div className="relative">
                {/* Large Icon - Match Outcomes */}
                <motion.div
                  className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-2xl mb-8"
                  whileHover={{ scale: 1.15, rotate: -8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                  <Sparkles className="relative h-10 w-10 text-white" />
                </motion.div>

                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-600/10 border border-purple-600/30 mb-4">
                  <Users className="h-3.5 w-3.5 text-purple-600" />
                  <span className="text-xs font-bold text-purple-600">Agent-Facing</span>
                </div>

                {/* Title */}
                <h3 className="text-3xl font-black text-foreground mb-3 tracking-tight">AI Copilots</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Intelligent assistants that empower support teams with instant knowledge and smart suggestions.
                </p>

                {/* Feature Grid - 2x2 */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { icon: FileText, label: 'Instant context', color: 'from-purple-600 to-pink-600' },
                    { icon: MessageSquare, label: 'AI responses', color: 'from-pink-600 to-purple-500' },
                    { icon: Zap, label: 'Smart actions', color: 'from-purple-500 to-indigo-500' },
                    { icon: Shield, label: 'Agent control', color: 'from-indigo-500 to-purple-600' }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-2 p-3 rounded-xl bg-purple-600/5 hover:bg-purple-600/10 border border-purple-600/10 hover:border-purple-600/30 transition-all"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br shadow-lg", item.color)}>
                        <item.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-xs font-bold text-foreground">{item.label}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Visual Metrics */}
                <div className="space-y-3 mb-6 p-4 rounded-xl bg-gradient-to-br from-purple-600/5 to-pink-600/5 border border-purple-600/10">
                  <div className="text-xs font-bold text-purple-600 mb-3">Performance Metrics</div>

                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-muted-foreground">Agent adoption</span>
                      <span className="font-bold text-foreground">91%</span>
                    </div>
                    <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: "91%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-muted-foreground">Productivity gain</span>
                      <span className="font-bold text-foreground">43%</span>
                    </div>
                    <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-pink-600 to-purple-600 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: "43%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Large Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-purple-600/20">
                  <div>
                    <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">3.2x</div>
                    <div className="text-xs text-muted-foreground">Faster resolution</div>
                  </div>
                  <div className="h-12 w-px bg-purple-600/20" />
                  <div className="text-right">
                    <div className="text-3xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-1">100%</div>
                    <div className="text-xs text-muted-foreground">Human oversight</div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Bottom CTA - Match page style */}
          <motion.div
            className="flex items-center justify-center gap-2 mt-16 text-primary font-bold text-sm group cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ gap: 12 }}
          >
            <span>See both deployments in action</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
