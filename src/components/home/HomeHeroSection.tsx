'use client';

import { useEffect, useRef, lazy, Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { prefersReducedMotion, getLiquidEtherResolution, getDeviceType } from "@/lib/deviceDetection";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import VideoEmbed from "@/components/VideoEmbed";

const LiquidEther = lazy(() => import("@/components/LiquidEther"));

let gsap: any = null;

const loadGSAP = async () => {
  if (!gsap) {
    const module = await import("gsap");
    gsap = module.default;
  }
  return { gsap };
};

const heroChips = [
  { label: "Live in days" },
  { label: "No forced migrations" },
  { label: "Own your data" },
];

const HomeHeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  // Device and performance detection
  const [shouldShowLiquidEther, setShouldShowLiquidEther] = useState(false);
  const [liquidEtherResolution, setLiquidEtherResolution] = useState(0.55);

  // Detect device capabilities and motion preferences on client-side
  useEffect(() => {
    const hasReducedMotion = prefersReducedMotion();
    const { isDesktop } = getDeviceType();
    const adaptiveResolution = getLiquidEtherResolution();

    // Defer LiquidEther load by 1s on desktop to improve initial page load performance
    // Only show on desktop without reduced motion preference
    if (isDesktop && !hasReducedMotion) {
      setTimeout(() => setShouldShowLiquidEther(true), 1000);
    }
    setLiquidEtherResolution(adaptiveResolution);
  }, []);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    let isMounted = true;

    const init = async () => {
      const { gsap } = await loadGSAP();
      if (!isMounted) return;

      ctx = gsap.context(() => {
        if (titleRef.current) {
          gsap.from(titleRef.current.querySelectorAll<HTMLElement>(".word"), {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.08,
            ease: "power3.out",
          });
        }
        if (descRef.current) {
          gsap.from(descRef.current, {
            y: 30,
            opacity: 0,
            delay: 0.3,
            duration: 1,
            ease: "power3.out",
          });
        }
        if (buttonsRef.current) {
          gsap.from(buttonsRef.current.children, {
            scale: 0.9,
            opacity: 0,
            delay: 0.6,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)",
          });
        }
      }, heroRef);
    };

    init();

    return () => {
      isMounted = false;
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-[60vh] md:min-h-[80vh] lg:min-h-screen flex items-center overflow-hidden pt-24 md:pt-28">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-background -z-20" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] -z-20" />

      {/* LiquidEther - Conditionally rendered on desktop without reduced motion */}
      {shouldShowLiquidEther && (
        <div className="absolute inset-0 -z-10 opacity-55">
          <Suspense fallback={
            <div className="w-full h-full bg-gradient-to-br from-[#FF00C8]/8 via-[#A805FF]/4 to-[#D3A9EA]/8 animate-pulse" />
          }>
            <LiquidEther
              colors={["#FF00C8", "#A805FF", "#D3A9EA"]}
              mouseForce={20}
              cursorSize={110}
              isViscous={false}
              resolution={liquidEtherResolution}
              autoDemo
              autoSpeed={0.35}
              autoIntensity={1.6}
            />
          </Suspense>
        </div>
      )}

      <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
        <div className="grid gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-6 sm:space-y-8">
            <h1 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-tight text-foreground">
              <span className="word inline-block">The</span>{" "}
              <span className="word inline-block">support</span>{" "}
              <span className="word inline-block">platform</span>{" "}
              <span className="word inline-block">that</span>{" "}
              <span className="word inline-block">executes,</span>{" "}
              <span className="word inline-block">not</span>{" "}
              <span className="word inline-block">just</span>{" "}
              <span className="word inline-block">deflects</span>
            </h1>

            <p ref={descRef} className="max-w-2xl text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              Stop bolting AI onto broken workflows. Pullse unifies your inbox, connects to your tools, and lets AI take real action—with human approval when it matters.
            </p>

            <div ref={buttonsRef} className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="px-6 py-6 text-base min-h-[44px]" asChild>
                <Link href="/contact-sales">
                  See it in action
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="px-6 py-6 text-base min-h-[44px]" asChild>
                <Link href="/compare">
                  How it compares
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Product Hunt Badge */}
            <div className="pt-4">
              <a
                href="https://www.producthunt.com/products/pullse?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-pullse"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transition-transform hover:scale-105"
              >
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1043096&theme=light&t=1764315820809"
                  alt="Pullse - The execution-first support platform. Humans + AI together. | Product Hunt"
                  width={250}
                  height={54}
                  className="h-auto"
                />
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 bg-primary/20 blur-3xl -z-10" />
            <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-background/70 via-background/90 to-background/70 p-1 shadow-2xl">
              <div className="rounded-[2.3rem] overflow-hidden">
                <VideoEmbed videoId="NItSkrvcS04" title="Pullse product intro" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHeroSection;
