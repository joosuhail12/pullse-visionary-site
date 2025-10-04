import { useState } from "react";
import { X, Maximize2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import inboxScreenshot from "@/assets/pullse-inbox-screenshot.png";

interface Hotspot {
  id: number;
  label: string;
  description: string;
  link: string;
  position: {
    top: string;
    left: string;
  };
}

const hotspots: Hotspot[] = [
  {
    id: 1,
    label: "Inbox (Unified)",
    description: "Email and chat in one queue with mentions, unassigned, teams & bot inboxes.",
    link: "/product/helpdesk",
    position: { top: "15%", left: "8%" }
  },
  {
    id: 2,
    label: "Ticket list",
    description: "Prioritized view with status, SLA and channel. Clean triage—no tab circus.",
    link: "/product/automations",
    position: { top: "40%", left: "25%" }
  },
  {
    id: 3,
    label: "Conversation + AI Summary",
    description: "Instant summaries and next steps—right in the thread.",
    link: "/product/ai-suite",
    position: { top: "45%", left: "55%" }
  },
  {
    id: 4,
    label: "Copilot & actions",
    description: "Drafts, translations, and one-click follow-ups. Agents move faster.",
    link: "/product/ai-suite",
    position: { top: "82%", left: "55%" }
  },
  {
    id: 5,
    label: "Customer & company context",
    description: "Everything about the customer in one glance—no swivel-chair.",
    link: "/product/helpdesk",
    position: { top: "30%", left: "88%" }
  },
  {
    id: 6,
    label: "QA, timeline & custom objects",
    description: "Quality checks, activity log, and your data model—built into the ticket.",
    link: "/product/qa",
    position: { top: "75%", left: "88%" }
  }
];

const PlatformOverview = () => {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent, hotspot: Hotspot) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.open(hotspot.link, '_blank');
    } else if (e.key === 'Escape') {
      setActiveHotspot(null);
    }
  };

  return (
    <section 
      id="platform-overview" 
      aria-labelledby="platform-overview-h2"
      className="py-32 fade-in-scroll relative overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent-teal/5 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-accent-orange/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-accent-teal-light to-accent-orange-light border border-accent-teal/20 backdrop-blur-sm mb-4">
            <span className="text-sm font-semibold bg-gradient-to-r from-accent-teal to-accent-orange bg-clip-text text-transparent">
              Platform Preview
            </span>
          </div>
          <h2 id="platform-overview-h2" className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            The whole desk, in one view
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything an agent needs—Inbox, AI, customer context, QA, and actions—on a single surface.
          </p>
        </div>

        {/* Main screenshot container */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr,300px] gap-8 items-start">
            {/* Screenshot with hotspots */}
            <div className="relative group">
              {/* Glass card wrapper */}
              <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-accent-teal/30 to-accent-orange/30">
                <div className="relative rounded-2xl bg-background/95 backdrop-blur-xl overflow-hidden">
                  {/* Screenshot */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={inboxScreenshot}
                      alt="Pullse Inbox showing ticket list, AI summary inside the conversation, and customer/company context in the right sidebar"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    
                    {/* Hotspot markers */}
                    {hotspots.map((hotspot) => (
                      <div
                        key={hotspot.id}
                        className="absolute"
                        style={{
                          top: hotspot.position.top,
                          left: hotspot.position.left,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        <button
                          onClick={() => window.open(hotspot.link, '_blank')}
                          onMouseEnter={() => setActiveHotspot(hotspot.id)}
                          onMouseLeave={() => setActiveHotspot(null)}
                          onFocus={() => setActiveHotspot(hotspot.id)}
                          onBlur={() => setActiveHotspot(null)}
                          onKeyDown={(e) => handleKeyDown(e, hotspot)}
                          aria-describedby={`hotspot-tooltip-${hotspot.id}`}
                          className="relative z-10 h-8 w-8 rounded-full bg-gradient-to-br from-accent-teal to-primary flex items-center justify-center text-white text-sm font-bold shadow-lg hover:scale-125 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-teal focus:ring-offset-2 animate-pulse"
                        >
                          {hotspot.id}
                          
                          {/* Tooltip */}
                          {activeHotspot === hotspot.id && (
                            <div
                              id={`hotspot-tooltip-${hotspot.id}`}
                              role="tooltip"
                              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 glass-strong rounded-xl shadow-xl animate-fade-in"
                            >
                              <div className="text-sm font-bold text-foreground mb-1">
                                {hotspot.label}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {hotspot.description}
                              </div>
                              {/* Arrow */}
                              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-2 border-8 border-transparent border-t-background/95" />
                            </div>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Full-screen button overlay */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Dialog open={isFullscreenOpen} onOpenChange={setIsFullscreenOpen}>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="glass-strong shadow-lg"
                        >
                          <Maximize2 className="h-4 w-4 mr-2" />
                          Full screen
                        </Button>
                      </DialogTrigger>
                      <DialogContent 
                        className="max-w-[95vw] max-h-[95vh] p-0"
                        aria-modal="true"
                      >
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

            {/* Hotspot ledger - Desktop */}
            <div className="hidden lg:block space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                Key Features
              </h3>
              {hotspots.map((hotspot) => (
                <a
                  key={hotspot.id}
                  href={hotspot.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 p-3 rounded-xl hover:bg-primary/5 transition-all"
                  onMouseEnter={() => setActiveHotspot(hotspot.id)}
                  onMouseLeave={() => setActiveHotspot(null)}
                >
                  <div className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold text-white transition-all ${
                    activeHotspot === hotspot.id 
                      ? 'bg-gradient-to-br from-accent-teal to-primary scale-110' 
                      : 'bg-gradient-to-br from-accent-teal/70 to-primary/70'
                  }`}>
                    {hotspot.id}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      {hotspot.label}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {hotspot.description}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Mobile ledger */}
          <div className="lg:hidden mt-8 space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
              Key Features
            </h3>
            {hotspots.map((hotspot) => (
              <a
                key={hotspot.id}
                href={hotspot.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-4 glass-strong rounded-xl hover:scale-[1.02] transition-all"
              >
                <div className="flex-shrink-0 h-7 w-7 rounded-full bg-gradient-to-br from-accent-teal to-primary flex items-center justify-center text-sm font-bold text-white">
                  {hotspot.id}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-foreground mb-1">
                    {hotspot.label}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {hotspot.description}
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Prefer a guided tour?{" "}
              <button
                onClick={() => {
                  // This would open your video modal - for now just a placeholder
                  window.open('https://youtube.com', '_blank');
                }}
                className="inline-flex items-center gap-1 text-primary font-semibold hover:underline"
              >
                <Play className="h-4 w-4" />
                Watch the 1:11 demo
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformOverview;
