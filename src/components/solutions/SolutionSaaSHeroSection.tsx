'use client';

import { lazy, Suspense } from "react";
import RouteButton from "@/components/RouteButton";
import { Play, CheckCircle2 } from "lucide-react";

const LiquidEther = lazy(() => import("@/components/LiquidEther"));

export default function SolutionSaaSHeroSection() {
  return (
    <section className="relative min-h-[60vh] md:min-h-[80vh] lg:min-h-screen flex items-center overflow-hidden pt-16 md:pt-20">
      {/* Hero Liquid Ether Effect */}
      <div className="absolute inset-0 -z-10 opacity-70 hidden md:block">
        <Suspense fallback={<div className="w-full h-full" />}>
          <LiquidEther
            colors={["#FF00C8", "#A805FF", "#D3A9EA"]}
            mouseForce={20}
            cursorSize={110}
            isViscous={false}
            resolution={0.55}
            autoDemo
            autoSpeed={0.35}
            autoIntensity={1.6}
          />
        </Suspense>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_50%)]" />

      <div className="container relative mx-auto px-4 w-full">
        <div className="max-w-[1400px] mx-auto">
          {/* Header Content */}
          <div className="text-center space-y-6 md:space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-foreground leading-[1.05] tracking-tight max-w-6xl mx-auto">
              Cut the tab-hopping for every ticket.
              <span className="block bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent mt-2 md:mt-3">
                Ask once. Pullse executes the work.
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-muted-foreground leading-relaxed max-w-4xl mx-auto font-normal">
              Pullse connects Stripe, Jira, Salesforce, Slack, and more so agents ask in plain English and actions happen—refunds, updates, merges—without leaving the conversation.
            </p>

            {/* CTA */}
            <div className="pt-4 md:pt-6">
              <RouteButton size="lg" href="/contact-sales" className="text-sm md:text-base px-6 py-4 md:px-8 md:py-5 lg:px-10 lg:py-6 shadow-xl shadow-primary/20 group">
                Book a demo
                <Play className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:scale-110 transition-transform" />
              </RouteButton>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 md:gap-x-8 lg:gap-x-10 gap-y-3 md:gap-y-4 pt-4 md:pt-6 text-sm md:text-base text-muted-foreground">
              <div className="flex items-center gap-1.5 md:gap-2">
                <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-primary shrink-0" />
                <span>Live in 2 weeks</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2">
                <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-primary shrink-0" />
                <span>No credit card</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
