'use client';

import { motion } from 'framer-motion';
import RouteButton from '@/components/RouteButton';
import { ArrowRight, ExternalLink, CheckCircle2 } from 'lucide-react';

export default function ProductAIEngineFinalCTA() {
  return (
    <section className="relative py-14 md:py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/10 to-background" />

      {/* Animated background gradients */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl border border-primary/30 bg-gradient-to-br from-card/50 via-background/30 to-card/50 backdrop-blur-2xl p-7 md:p-12 lg:p-14 shadow-2xl text-center overflow-hidden">
            {/* Background glow */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/30 via-purple-600/30 to-indigo-600/30 opacity-50 blur-2xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.15),transparent_70%)]" />

            <div className="relative">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 md:mb-7 lg:mb-8 leading-tight">
                Ready to see it{" "}
                <span className="bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  in action?
                </span>
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 md:mb-10 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
                Book a technical walkthrough and see how Pullse handles <span className="font-bold text-foreground">your specific use cases</span> with governed AI.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 md:gap-5 lg:gap-6 justify-center mb-8 md:mb-10 lg:mb-12">
                <motion.div
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <RouteButton
                    href="/contact-sales"
                    variant="default"
                    size="lg"
                    className="group relative overflow-hidden bg-gradient-to-r from-primary via-purple-600 to-indigo-600 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500 px-8 py-4 md:px-10 md:py-5 lg:px-12 lg:py-6 text-base sm:text-lg font-black"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                    <span className="relative z-10 flex items-center gap-2 md:gap-3">
                      Book a Demo
                      <ArrowRight className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </span>
                  </RouteButton>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <RouteButton
                    href="/product/ai-suite"
                    variant="outline"
                    size="lg"
                    className="group border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5 px-8 py-4 md:px-10 md:py-5 lg:px-12 lg:py-6 text-base sm:text-lg font-black"
                  >
                    <span className="flex items-center gap-2 md:gap-3">
                      Explore AI Suite
                      <ExternalLink className="h-4 w-4 md:h-5 md:w-5 group-hover:rotate-12 transition-transform duration-300" />
                    </span>
                  </RouteButton>
                </motion.div>
              </div>

              {/* Social proof */}
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 lg:gap-8 pt-6 md:pt-7 lg:pt-8 border-t border-border/30">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  <span className="text-xs md:text-sm font-bold text-muted-foreground">14-day trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  <span className="text-xs md:text-sm font-bold text-muted-foreground">No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  <span className="text-xs md:text-sm font-bold text-muted-foreground">5-minute setup</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
