import { useState } from "react";
import { Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import inboxScreenshot from "@/assets/pullse-inbox-screenshot.png";
import LaserFlow from "@/components/LaserFlow";

const PlatformOverview = () => {
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  return <section id="platform-overview" aria-labelledby="platform-overview-h2" className="py-32 fade-in-scroll relative overflow-hidden">
      {/* Background accents - enhanced */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent-teal/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-accent-orange/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header - enhanced */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-accent-teal/20 via-primary/20 to-accent-orange/20 border border-accent-teal/30 backdrop-blur-md shadow-lg mb-6">
            <div className="h-2 w-2 rounded-full bg-accent-teal animate-pulse" />
            <span className="text-sm font-bold bg-gradient-to-r from-accent-teal via-primary to-accent-orange bg-clip-text text-transparent">
              Platform Preview
            </span>
          </div>
          <h2 id="platform-overview-h2" className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent leading-tight">
            The whole desk, in one view
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Everything an agent needs—Inbox, AI, customer context, QA, and actions—on a single surface.
          </p>
        </div>

        {/* Main screenshot container */}
        <div className="max-w-6xl mx-auto">
          {/* Screenshot with animated glow and LaserFlow */}
          <div className="relative group">
            {/* LaserFlow container - positioned behind */}
            <div className="relative rounded-3xl overflow-hidden" style={{ height: '700px' }}>
              <LaserFlow
                horizontalBeamOffset={0.1}
                verticalBeamOffset={0.0}
                color="#A805FF"
                fogIntensity={0.6}
                wispDensity={1.2}
              />
              
              {/* Screenshot container on top */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] z-10">
                <div className="relative rounded-2xl border-2 border-primary/30 bg-background/95 backdrop-blur-xl overflow-hidden shadow-2xl">
                  {/* Screenshot */}
                  <div className="relative">
                    <img 
                      src={inboxScreenshot} 
                      alt="Pullse Inbox showing ticket list, AI summary inside the conversation, and customer/company context in the right sidebar" 
                      className="w-full h-auto" 
                      loading="lazy" 
                    />
                  </div>

                  {/* Full-screen button overlay */}
                  <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Dialog open={isFullscreenOpen} onOpenChange={setIsFullscreenOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="secondary" className="glass-strong shadow-xl hover:scale-105 transition-transform">
                          <Maximize2 className="h-4 w-4 mr-2" />
                          Full screen
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0" aria-modal="true">
                        <div className="relative w-full h-full">
                          <img 
                            src={inboxScreenshot} 
                            alt="Pullse Inbox showing ticket list, AI summary inside the conversation, and customer/company context in the right sidebar - Full screen view" 
                            className="w-full h-full object-contain" 
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
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