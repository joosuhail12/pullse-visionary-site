'use client';

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { TrendingUp, Clock, DollarSign, AlertTriangle } from 'lucide-react';

interface StatCardProps {
  icon: typeof DollarSign;
  value: string;
  label: string;
  color: string;
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, value, label, color, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="glass-strong p-4 rounded-2xl flex items-center gap-4 hover:shadow-lg transition-shadow"
    >
      <div className={`w-12 h-12 rounded-xl ${color} bg-opacity-10 flex items-center justify-center flex-shrink-0`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
    </motion.div>
  );
};

interface AnimatedCounterProps {
  from: number;
  to: number;
  duration?: number;
}

const AnimatedCounter = ({ from, to, duration = 2 }: AnimatedCounterProps) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration });
      return controls.stop;
    }
  }, [inView, count, to, duration]);

  useEffect(() => {
    const unsubscribe = rounded.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = latest.toString();
      }
    });
    return () => unsubscribe();
  }, [rounded]);

  return <span ref={ref}>{from}</span>;
};

const SaaSSprawlStats = () => {
  // Bar chart data representing SaaS tool growth
  const barData = [
    { year: '2015', tools: 20, height: '20%' },
    { year: '2017', tools: 45, height: '45%' },
    { year: '2019', tools: 68, height: '68%' },
    { year: '2021', tools: 92, height: '92%' },
    { year: '2023', tools: 110, height: '100%' },
  ];

  return (
    <div className="w-full">
      <div className="glass-gradient p-8 md:p-12 rounded-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-200/50 mb-4">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span className="text-sm font-medium text-red-600">
              The Fragmentation Crisis
            </span>
          </div>
          <h3 className="text-3xl font-bold mb-3">The Cost of Tool Sprawl</h3>
          <p className="text-muted-foreground">
            How fragmented SaaS is hurting businesses
          </p>
        </motion.div>

        {/* Big Number - Average Tools */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <div className="inline-block relative">
            <div className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
              <AnimatedCounter from={0} to={110} duration={2.5} />+
            </div>
            <div className="text-xl md:text-2xl font-semibold text-muted-foreground mt-2">
              Average SaaS tools per company
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Source: Productiv State of SaaS Sprawl Report 2023
            </div>
          </div>
        </motion.div>

        {/* Bar Chart - Growth Over Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h4 className="text-lg font-bold text-center mb-6">
            Tool Sprawl Growth Over Time
          </h4>
          <div className="flex items-end justify-between gap-4 h-48">
            {barData.map((bar, index) => (
              <div key={bar.year} className="flex-1 flex flex-col items-center">
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: bar.height }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                  className="w-full bg-gradient-to-t from-red-500 to-orange-500 rounded-t-lg relative group"
                  style={{ maxHeight: '100%' }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    {bar.tools}
                  </div>
                </motion.div>
                <div className="text-xs text-muted-foreground mt-2 font-medium">
                  {bar.year}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Impact Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            icon={DollarSign}
            value="$3.2M"
            label="Avg annual SaaS waste"
            color="bg-red-500"
            delay={0.8}
          />
          <StatCard
            icon={Clock}
            value="32%"
            label="Time lost to context switching"
            color="bg-orange-500"
            delay={0.9}
          />
          <StatCard
            icon={TrendingUp}
            value="23%"
            label="YoY increase in tools"
            color="bg-yellow-500"
            delay={1.0}
          />
        </div>

        {/* Bottom Insight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
          className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-200/50"
        >
          <p className="text-center text-sm md:text-base">
            <span className="font-semibold text-purple-600">
              The solution isn't more tools.
            </span>{' '}
            <span className="text-muted-foreground">
              It's unified, AI-native platforms that solve entire functions
              end-to-end. That's why we're building Pullse.
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SaaSSprawlStats;
