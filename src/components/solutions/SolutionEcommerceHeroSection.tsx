'use client';

import { lazy, Suspense } from "react";
import RouteButton from "@/components/RouteButton";
import { CheckCircle2, Play } from "lucide-react";

const LiquidEther = lazy(() => import("@/components/LiquidEther"));

const SolutionEcommerceHeroSection = () => {
  return (
    <section className="relative min-h-[60vh] md:min-h-[80vh] lg:min-h-screen flex items-center pt-20 md:pt-24 overflow-hidden">
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
          <div className="text-center space-y-7">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-[1.08] tracking-tight max-w-6xl mx-auto">
              Handle 10x volume without 10x headcount.
              <span className="block bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent mt-3">
                AI that ships refunds and updates for you.
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto font-normal">
              Pullse runs the busywork—WISMO, returns, order updates—so your team stays on customers. Launch in days, keep humans in control.
            </p>

            {/* CTA */}
            <div className="pt-6">
              <RouteButton size="lg" href="/contact-sales" className="text-sm sm:text-base px-8 sm:px-10 py-5 sm:py-6 shadow-xl shadow-primary/20 group w-full sm:w-auto">
                Book a demo
                <Play className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              </RouteButton>
            </div>

            {/* Trust Signals */}
              <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 pt-6 text-base text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Live in days, not months</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>No forced migrations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Own your data</span>
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionEcommerceHeroSection;
