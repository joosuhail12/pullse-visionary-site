'use client';

import { motion } from 'framer-motion';
import RouteButton from '@/components/RouteButton';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function FinalCTASection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card to-card/90 shadow-2xl"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--primary)/0.1),transparent_50%)]" />

      <div className="relative p-12 lg:p-16">
        <div className="text-center space-y-10">
          <div className="space-y-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Ready to make your agents superhuman?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See Pullse Inbox in action. Book a personalized demo with our team.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <RouteButton size="lg" className="text-base px-10 py-7 shadow-xl shadow-primary/20" href="/contact-sales">
              Book a demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </RouteButton>
            <RouteButton size="lg" variant="outline" className="text-base px-10 py-7" href="/pricing">
              View pricing
            </RouteButton>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-8 border-t border-border/40">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>2-week setup</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>Founder-led onboarding</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>No credit card required</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
