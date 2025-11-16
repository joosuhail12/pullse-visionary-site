'use client';

import { motion } from 'framer-motion';
import RouteButton from '@/components/RouteButton';
import { Play, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

export default function ProductAnalyticsFinalCTA() {
  return (
    <>
      {/* Enhanced animated gradient orbs with movement */}
      <motion.div
        className="absolute top-1/2 left-1/3 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, 50, -30, 0],
          y: [0, -40, 30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/2 right-1/3 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.6, 0.3, 0.6],
          x: [0, -60, 40, 0],
          y: [0, 50, -40, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-72 h-72 bg-primary/15 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.5, 0.2],
          x: [0, 40, -50, 0],
          y: [0, 60, -30, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      <motion.div
        className="relative p-8 md:p-12 lg:p-16 rounded-3xl border border-border/50 bg-gradient-to-br from-card/80 via-background/60 to-card/80 backdrop-blur-2xl overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl" />

        <div className="relative text-center">
          {/* Enhanced Icon with rotation */}
          <motion.div
            className="inline-flex items-center justify-center h-14 w-14 md:h-16 lg:h-20 md:w-16 lg:w-20 rounded-2xl bg-gradient-to-br from-primary to-primary shadow-2xl mb-6 md:mb-8 mx-auto"
            whileHover={{ scale: 1.1, rotate: 8 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-primary blur-xl opacity-60 animate-pulse" />
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="relative h-7 w-7 md:h-8 lg:h-10 md:w-8 lg:w-10 text-white" />
            </motion.div>
          </motion.div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-5 md:mb-6 leading-tight">
            Ready to see your{" "}
            <span className="bg-gradient-to-r from-primary via-primary to-primary bg-clip-text text-transparent">
              data in action?
            </span>
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 md:mb-10 leading-relaxed">
            Watch a live demo with your own data. See how Pullse turns raw support interactions into
            <span className="font-bold text-foreground"> strategic intelligence</span>.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
            <motion.div
              whileHover={{ scale: 1.05, y: -6 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <RouteButton
                href="/contact-sales"
                variant="default"
                size="lg"
                className="group relative overflow-hidden px-8 py-6 md:px-10 lg:px-12 md:py-7 lg:py-8 text-lg md:text-xl font-black shadow-2xl shadow-primary/30"
              >
                <span className="relative z-10 flex items-center gap-2 md:gap-3">
                  <Play className="h-5 w-5 md:h-6 md:w-6" />
                  Book a Demo
                  <ArrowRight className="h-5 w-5 md:h-6 md:w-6 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </RouteButton>
            </motion.div>

            <RouteButton
              href="/pricing"
              variant="outline"
              size="lg"
              className="px-8 py-6 md:px-10 lg:px-12 md:py-7 lg:py-8 text-lg md:text-xl font-black border-2 hover:border-primary/50"
            >
              View Pricing
            </RouteButton>
          </div>

          {/* Enhanced Trust indicators with animated checkmarks */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 lg:gap-8 text-sm text-muted-foreground mt-8 md:mt-10 lg:mt-12">
            {[
              'Setup in minutes',
              'No credit card required',
              '14-day free trial'
            ].map((text, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1, type: "spring" }}
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, type: "spring", stiffness: 200 }}
                >
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                </motion.div>
                <span>{text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}
