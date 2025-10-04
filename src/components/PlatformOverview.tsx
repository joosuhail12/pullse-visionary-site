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
const hotspots: Hotspot[] = [{
  id: 1,
  label: "Inbox (Unified)",
  description: "Email and chat in one queue with mentions, unassigned, teams & bot inboxes.",
  link: "/product/helpdesk",
  position: {
    top: "15%",
    left: "8%"
  }
}, {
  id: 2,
  label: "Ticket list",
  description: "Prioritized view with status, SLA and channel. Clean triage—no tab circus.",
  link: "/product/automations",
  position: {
    top: "40%",
    left: "25%"
  }
}, {
  id: 3,
  label: "Conversation + AI Summary",
  description: "Instant summaries and next steps—right in the thread.",
  link: "/product/ai-suite",
  position: {
    top: "45%",
    left: "55%"
  }
}, {
  id: 4,
  label: "Copilot & actions",
  description: "Drafts, translations, and one-click follow-ups. Agents move faster.",
  link: "/product/ai-suite",
  position: {
    top: "82%",
    left: "55%"
  }
}, {
  id: 5,
  label: "Customer & company context",
  description: "Everything about the customer in one glance—no swivel-chair.",
  link: "/product/helpdesk",
  position: {
    top: "30%",
    left: "88%"
  }
}, {
  id: 6,
  label: "QA, timeline & custom objects",
  description: "Quality checks, activity log, and your data model—built into the ticket.",
  link: "/product/qa",
  position: {
    top: "75%",
    left: "88%"
  }
}];
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

        {/* Main screenshot container - enhanced layout */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr,340px] gap-10 items-start">
            {/* Screenshot with hotspots - improved glass effect */}
            <div className="relative group">
              {/* Enhanced glass card wrapper with animated gradient */}
              <div className="relative rounded-3xl p-[2px] bg-gradient-to-br from-accent-teal/40 via-primary/30 to-accent-orange/40 shadow-2xl hover:shadow-accent-teal/20 transition-all duration-500">
                <div className="relative rounded-3xl bg-background/98 backdrop-blur-2xl overflow-hidden shadow-inner">
                  {/* Screenshot */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={inboxScreenshot} alt="Pullse Inbox showing ticket list, AI summary inside the conversation, and customer/company context in the right sidebar" className="w-full h-full object-cover" loading="lazy" />
                    
                    {/* Enhanced hotspot markers */}
                    {hotspots.map(hotspot => <div key={hotspot.id} className="absolute" style={{
                    top: hotspot.position.top,
                    left: hotspot.position.left,
                    transform: 'translate(-50%, -50%)'
                  }}>
                        <button className="group/hotspot relative" onMouseEnter={() => setActiveHotspot(hotspot.id)} onMouseLeave={() => setActiveHotspot(null)} onClick={() => window.open(hotspot.link, '_blank')} onKeyDown={e => handleKeyDown(e, hotspot)} aria-describedby={`tooltip-${hotspot.id}`}>
                          {/* Pulsing ring */}
                          <div className="absolute inset-0 rounded-full bg-accent-teal/30 animate-ping" />
                          
                          {/* Main marker */}
                          <div className="relative h-10 w-10 rounded-full bg-gradient-to-br from-accent-teal to-primary flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-accent-teal/50 border-2 border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-125 hover:shadow-xl hover:shadow-accent-teal/70">
                            {hotspot.id}
                          </div>
                          
                          {/* Enhanced tooltip */}
                          {activeHotspot === hotspot.id && <div id={`tooltip-${hotspot.id}`} role="tooltip" className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 p-4 glass-strong rounded-xl shadow-2xl border border-accent-teal/30 z-50 animate-fade-in">
                              <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-gradient-to-br from-accent-teal to-primary flex items-center justify-center text-sm font-bold text-white">
                                  {hotspot.id}
                                </div>
                                <div className="flex-1">
                                  <div className="text-sm font-bold text-foreground mb-1.5">
                                    {hotspot.label}
                                  </div>
                                  <div className="text-xs text-muted-foreground leading-relaxed">
                                    {hotspot.description}
                                  </div>
                                </div>
                              </div>
                              {/* Tooltip arrow */}
                              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-background/95 backdrop-blur-xl border-l border-t border-accent-teal/30 rotate-45" />
                            </div>}
                        </button>
                      </div>)}
                  </div>

                  {/* Full-screen button overlay - improved */}
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
                          <img src={inboxScreenshot} alt="Pullse Inbox showing ticket list, AI summary inside the conversation, and customer/company context in the right sidebar - Full screen view" className="w-full h-full object-contain" />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop hotspot ledger - now visible */}
            <div className="hidden lg:block space-y-3 sticky top-24">
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-5 flex items-center gap-2">
                <div className="h-1 w-8 rounded-full bg-gradient-to-r from-accent-teal to-primary" />
                Key Features
              </h3>
              {hotspots.map(hotspot => <a key={hotspot.id} href={hotspot.link} target="_blank" rel="noopener noreferrer" onMouseEnter={() => setActiveHotspot(hotspot.id)} onMouseLeave={() => setActiveHotspot(null)} className={`group flex items-start gap-4 p-4 glass-strong rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-accent-teal/40 border border-transparent ${activeHotspot === hotspot.id ? 'scale-[1.02] shadow-lg border-accent-teal/40 bg-accent-teal/5' : ''}`}>
                  <div className="flex-shrink-0 h-9 w-9 rounded-xl bg-gradient-to-br from-accent-teal to-primary flex items-center justify-center text-sm font-bold text-white shadow-md group-hover:shadow-lg group-hover:shadow-accent-teal/50 transition-all">
                    {hotspot.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                      {hotspot.label}
                    </div>
                    <div className="text-xs text-muted-foreground leading-relaxed">
                      {hotspot.description}
                    </div>
                  </div>
                </a>)}
            </div>
          </div>

          {/* Mobile ledger - improved */}
          <div className="lg:hidden mt-12 space-y-3">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-6 flex items-center gap-2">
              <div className="h-1 w-8 rounded-full bg-gradient-to-r from-accent-teal to-primary" />
              Key Features
            </h3>
            {hotspots.map(hotspot => <a key={hotspot.id} href={hotspot.link} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-5 glass-strong rounded-xl hover:scale-[1.02] transition-all duration-300 hover:shadow-lg hover:border-accent-teal/40 border border-transparent">
                <div className="flex-shrink-0 h-9 w-9 rounded-xl bg-gradient-to-br from-accent-teal to-primary flex items-center justify-center text-sm font-bold text-white shadow-md">
                  {hotspot.id}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-foreground mb-2">
                    {hotspot.label}
                  </div>
                  <div className="text-xs text-muted-foreground leading-relaxed">
                    {hotspot.description}
                  </div>
                </div>
              </a>)}
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