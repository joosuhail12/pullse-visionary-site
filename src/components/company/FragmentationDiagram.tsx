'use client';

import { motion } from 'framer-motion';
import {
  MessageSquare,
  Mail,
  Phone,
  BarChart,
  FileText,
  Search,
  Settings,
  Users,
  Zap,
  Database,
  Globe,
  Cpu,
  Brain,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const FragmentationDiagram = () => {
  // Scattered tools representing fragmented SaaS landscape
  const scatteredTools = [
    { icon: MessageSquare, label: 'Chat', color: 'text-blue-500' },
    { icon: Mail, label: 'Email', color: 'text-green-500' },
    { icon: Phone, label: 'Phone', color: 'text-purple-500' },
    { icon: BarChart, label: 'Analytics', color: 'text-orange-500' },
    { icon: FileText, label: 'Docs', color: 'text-pink-500' },
    { icon: Search, label: 'Search', color: 'text-teal-500' },
    { icon: Settings, label: 'Workflows', color: 'text-indigo-500' },
    { icon: Users, label: 'CRM', color: 'text-red-500' },
    { icon: Zap, label: 'Automation', color: 'text-yellow-500' },
    { icon: Database, label: 'Storage', color: 'text-cyan-500' },
    { icon: Globe, label: 'Portal', color: 'text-violet-500' },
    { icon: Cpu, label: 'AI Add-on', color: 'text-fuchsia-500' },
  ];

  return (
    <div className="w-full py-12">
      {/* Desktop: Horizontal Layout */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-3 gap-8 items-center">
          {/* Left: Fragmented Tools */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-6"
            >
              <h3 className="text-lg font-bold text-muted-foreground mb-2">
                Traditional Approach
              </h3>
              <p className="text-sm text-muted-foreground">
                12+ disconnected tools
              </p>
            </motion.div>

            <div className="grid grid-cols-3 gap-4">
              {scatteredTools.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="glass-outlined p-3 rounded-xl flex flex-col items-center gap-2 hover:shadow-lg transition-shadow"
                  >
                    <Icon className={`w-6 h-6 ${tool.color}`} />
                    <span className="text-xs text-muted-foreground">
                      {tool.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Chaos indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-4 space-y-2 text-xs text-red-600"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Data silos everywhere</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Endless context switching</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>No unified intelligence</span>
              </div>
            </motion.div>
          </div>

          {/* Center: Aggregation Arrows */}
          <div className="flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200/50 mb-3">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-600">
                    AI Aggregation
                  </span>
                </div>
                <p className="text-xs text-muted-foreground max-w-[140px]">
                  Connecting disparate data makes AI smarter
                </p>
              </div>

              <div className="flex flex-col gap-2">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 + i * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <div className="h-px w-12 bg-gradient-to-r from-purple-400 to-pink-400"></div>
                    <ArrowRight className="w-5 h-5 text-purple-600" />
                    <div className="h-px w-12 bg-gradient-to-r from-pink-400 to-purple-400"></div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Unified Platform */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2 }}
              className="text-center mb-6"
            >
              <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                AI-Native Approach
              </h3>
              <p className="text-sm text-muted-foreground">
                One unified platform
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.3 }}
              className="card-current p-8 rounded-3xl relative overflow-hidden group hover:shadow-xl transition-shadow"
            >
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative z-10 flex flex-col items-center gap-4">
                {/* Central AI Brain */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/50 group-hover:scale-110 transition-transform">
                  <Brain className="w-10 h-10 text-white" />
                </div>

                <h4 className="text-xl font-bold text-center">Pullse</h4>

                <p className="text-sm text-center text-muted-foreground">
                  All-in-one platform powered by unified AI
                </p>

                {/* Feature Pills */}
                <div className="grid grid-cols-2 gap-2 w-full mt-2">
                  {[
                    'Autonomous AI',
                    'Unified Inbox',
                    'Auto-QA',
                    'Analytics',
                    'Workflows',
                    'Knowledge Base',
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="text-xs px-3 py-1.5 bg-white/50 rounded-full text-center"
                    >
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5 }}
              className="mt-4 space-y-2 text-xs text-green-600"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Complete context & intelligence</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Single source of truth</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>AI learns across all data</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet: Vertical Layout */}
      <div className="lg:hidden space-y-12">
        {/* Fragmented Tools */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-6"
          >
            <h3 className="text-lg font-bold text-muted-foreground mb-2">
              Traditional Approach
            </h3>
            <p className="text-sm text-muted-foreground">
              12+ disconnected tools
            </p>
          </motion.div>

          <div className="grid grid-cols-4 gap-3">
            {scatteredTools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  className="glass-outlined p-3 rounded-xl flex flex-col items-center gap-2"
                >
                  <Icon className={`w-5 h-5 ${tool.color}`} />
                  <span className="text-xs text-muted-foreground">
                    {tool.label}
                  </span>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-4 space-y-2 text-xs text-red-600"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>Data silos everywhere</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>Endless context switching</span>
            </div>
          </motion.div>
        </div>

        {/* Aggregation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-4 py-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200/50">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-600">
              AI Aggregation
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-px w-16 bg-gradient-to-r from-purple-400 to-pink-400"></div>
                <ArrowRight className="w-5 h-5 text-purple-600 rotate-90" />
                <div className="h-px w-16 bg-gradient-to-r from-pink-400 to-purple-400"></div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Unified Platform */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-6"
          >
            <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              AI-Native Approach
            </h3>
            <p className="text-sm text-muted-foreground">
              One unified platform
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="card-current p-8 rounded-3xl"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/50">
                <Brain className="w-10 h-10 text-white" />
              </div>

              <h4 className="text-xl font-bold">Pullse</h4>
              <p className="text-sm text-center text-muted-foreground">
                All-in-one platform powered by unified AI
              </p>

              <div className="grid grid-cols-2 gap-2 w-full mt-2">
                {[
                  'Autonomous AI',
                  'Unified Inbox',
                  'Auto-QA',
                  'Analytics',
                  'Workflows',
                  'Knowledge Base',
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="text-xs px-3 py-1.5 bg-white/50 rounded-full text-center"
                  >
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-4 space-y-2 text-xs text-green-600"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Complete context & intelligence</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>AI learns across all data</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FragmentationDiagram;
