'use client';

import { motion } from 'framer-motion';
import RouteButton from '@/components/RouteButton';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { CheckCircle2, Play, ArrowRight, Star, Bot, TrendingUp } from 'lucide-react';

interface ProductInboxHeroSectionProps {
  fullInboxScreenshot: StaticImageData;
}

export default function ProductInboxHeroSection({ fullInboxScreenshot }: ProductInboxHeroSectionProps) {
  return (
    <>
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>

      {/* Header Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 space-y-8"
      >
        <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-foreground leading-[1.05] tracking-tight max-w-5xl mx-auto">
          The inbox that makes
          <span className="block bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent animate-gradient mt-2">
            agents superhuman
          </span>
        </h1>

        <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
          Support your customers across email and live chat from one unified inbox. AI writes replies, auto-routing handles assignment. Your team moves 3x faster.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <RouteButton size="lg" href="/contact-sales" className="text-base px-10 py-7 shadow-2xl shadow-primary/30 group">
            See it live
            <Play className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
          </RouteButton>
          <RouteButton size="lg" variant="outline" href="/pricing" className="text-base px-10 py-7">
            View pricing
            <ArrowRight className="ml-2 h-5 w-5" />
          </RouteButton>
        </div>

        {/* Trust Signals */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <span>2-week setup</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <span>No credit card</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            <span>Built for teams that demand excellence</span>
          </div>
        </div>
      </motion.div>

      {/* Hero Screenshot */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative max-w-6xl mx-auto"
      >
        {/* Glow effect */}
        <div className="absolute -inset-12 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-3xl opacity-60" />

        {/* Main screenshot card */}
        <div className="relative rounded-3xl border border-border/50 bg-gradient-to-br from-card/95 via-card to-card/90 p-2 sm:p-3 shadow-2xl backdrop-blur-xl">
          <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted/30 border border-border/30">
            <Image
              src={fullInboxScreenshot}
              alt="Pullse Inbox Interface - Unified workspace for email and chat"
              className="w-full"
              priority
            />
          </div>
        </div>

        {/* Floating stat badges */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="absolute -left-4 top-1/4 hidden lg:block"
        >
          <div className="rounded-2xl border border-border/60 bg-card/95 p-5 shadow-xl backdrop-blur-xl animate-float">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                <Bot className="h-6 w-6 text-background" />
              </div>
              <div>
                <div className="text-2xl font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">68%</div>
                <div className="text-xs text-muted-foreground">Automated</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute -right-4 top-1/3 hidden lg:block"
        >
          <div className="rounded-2xl border border-border/60 bg-card/95 p-5 shadow-xl backdrop-blur-xl animate-float" style={{ animationDelay: '1s' }}>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg">
                <TrendingUp className="h-6 w-6 text-background" />
              </div>
              <div>
                <div className="text-2xl font-black bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">3x</div>
                <div className="text-xs text-muted-foreground">Faster replies</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
