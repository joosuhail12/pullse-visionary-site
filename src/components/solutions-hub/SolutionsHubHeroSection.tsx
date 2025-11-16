'use client';

import { Suspense, lazy } from "react";
import RouteButton from "@/components/RouteButton";
import { Play, Zap, Shield, TrendingUp } from "lucide-react";

const LiquidEther = lazy(() => import("@/components/LiquidEther"));

const SolutionsHubHeroSection = () => {
  return (
    <section className="relative min-h-[60vh] md:min-h-[80vh] lg:min-h-screen flex items-center overflow-hidden pt-16 md:pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background/80 to-background/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_50%)]" />

      {/* Hero Liquid Ether Effect */}
      <div className="absolute inset-0 -z-10 opacity-55 hidden md:block">
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

      <div className="container relative mx-auto px-4 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 md:space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-foreground leading-[1.05] tracking-tight max-w-5xl mx-auto">
              Your support team is stretched to breaking.
              <span className="block bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent animate-gradient mt-2 md:mt-3">
                Handle 3x the volume. Same headcount.
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground/90 leading-[1.6] sm:leading-[1.65] max-w-3xl mx-auto font-normal">
              Industry-specific AI that takes action for your agents—from Stripe refunds to Shopify returns to fraud alerts. Resolve critical issues in 8 seconds, not 8 minutes. Your team finally has room to breathe.
            </p>

            <div className="pt-4 md:pt-6">
              <RouteButton
                size="lg"
                className="text-sm md:text-base px-6 py-4 md:px-8 md:py-5 lg:px-10 lg:py-6 shadow-xl shadow-primary/20 group"
                href="/contact-sales"
              >
                Book a demo
                <Play className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:scale-110 transition-transform" />
              </RouteButton>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-6 md:gap-x-8 lg:gap-x-10 gap-y-4 md:gap-y-6 pt-4 md:pt-6">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 rounded-full bg-primary/10 ring-1 ring-primary/20">
                  <Zap className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                </div>
                <div className="text-left">
                  <div className="text-xs md:text-sm font-bold text-foreground tracking-tight">Setup in 1 hour</div>
                  <div className="text-[10px] md:text-xs text-muted-foreground/80 leading-relaxed">Start automating today</div>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 rounded-full bg-primary/10 ring-1 ring-primary/20">
                  <Shield className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                </div>
                <div className="text-left">
                  <div className="text-xs md:text-sm font-bold text-foreground tracking-tight">14-day free trial</div>
                  <div className="text-[10px] md:text-xs text-muted-foreground/80 leading-relaxed">No credit card needed</div>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 rounded-full bg-primary/10 ring-1 ring-primary/20">
                  <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                </div>
                <div className="text-left">
                  <div className="text-xs md:text-sm font-bold text-foreground tracking-tight">ROI in 14 days</div>
                  <div className="text-[10px] md:text-xs text-muted-foreground/80 leading-relaxed">See savings immediately</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsHubHeroSection;
