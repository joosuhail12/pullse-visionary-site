'use client';

import { useState } from "react";
import { Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const PlatformOverview = () => {
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  return <section id="platform-overview" aria-labelledby="platform-overview-h2" className="py-20 fade-in-scroll relative overflow-hidden">
      {/* Background accents - enhanced */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent-teal/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-accent-orange/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header - enhanced */}
        <div className="text-center mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-accent-teal/20 via-primary/20 to-accent-orange/20 border border-accent-teal/30 backdrop-blur-md shadow-lg mb-6">
            <div className="h-2 w-2 rounded-full bg-accent-teal animate-pulse" />
            <span className="text-sm font-bold bg-gradient-to-r from-accent-teal via-primary to-accent-orange bg-clip-text text-transparent">
              Platform Preview
            </span>
          </div>
          <h2 id="platform-overview-h2" className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent leading-tight">
          The whole desk, in one view
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Everything an agent needs—Inbox, AI, customer context, QA, and actions—on a single surface.
          </p>
        </div>

        {/* Main screenshot container */}
        <div className="max-w-6xl mx-auto">
          {/* Screenshot */}
          <div className="relative group">
            <div className="relative rounded-3xl bg-background/95 backdrop-blur-xl overflow-hidden shadow-2xl p-20">
              <div className="w-full aspect-video bg-gradient-to-br from-primary/20 via-accent/10 to-primary/10 rounded-xl flex items-center justify-center border border-border/50">
                <p className="text-muted-foreground text-sm">Platform Preview</p>
              </div>
            </div>
          </div>

          {/* Footer CTA - enhanced */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 p-1 pr-6 rounded-full glass-strong border border-accent-teal/20 hover:border-accent-teal/40 transition-all group">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-accent-teal to-primary flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-white" />
              </div>
              <p className="text-sm text-muted-foreground">
                Want to see it in action?{" "}
                <a href="/contact-sales" className="inline-flex items-center gap-1 text-primary font-bold hover:underline group-hover:text-accent-teal transition-colors">
                  Book a demo
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default PlatformOverview;
