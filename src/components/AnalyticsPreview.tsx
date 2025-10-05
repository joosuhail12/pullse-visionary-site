import { BarChart3, TrendingUp, Activity } from "lucide-react";

const AnalyticsPreview = () => {
  // Sankey-style data flow visualization
  const sources = [
    { label: "Email", value: 45, color: "bg-blue-500" },
    { label: "Chat", value: 35, color: "bg-accent-teal" },
    { label: "Social", value: 20, color: "bg-accent-pink" }
  ];

  const intents = [
    { label: "Order Status", value: 35, color: "bg-primary" },
    { label: "Refunds", value: 25, color: "bg-accent-orange" },
    { label: "Account", value: 22, color: "bg-accent-green" },
    { label: "General", value: 18, color: "bg-blue-400" }
  ];

  const outcomes = [
    { label: "Deflected", value: 72, color: "bg-accent-green" },
    { label: "Actioned", value: 28, color: "bg-primary" }
  ];

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-background to-muted/30 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-primary/5 border-b border-primary/10 flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <BarChart3 className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="text-sm font-semibold text-foreground">Coverage Analytics</span>
        <div className="ml-auto flex items-center gap-1">
          <Activity className="w-3 h-3 text-accent-green animate-pulse" />
          <span className="text-[10px] text-muted-foreground">Real-time</span>
        </div>
      </div>

      {/* Sankey Flow Visualization */}
      <div className="flex-1 p-4">
        <div className="h-full grid grid-cols-[1fr_1.2fr_1fr] gap-2 items-center">
          {/* Sources Column */}
          <div className="space-y-2">
            <div className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">Channels</div>
            {sources.map((source, idx) => (
              <div key={idx} className="relative">
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <div className={`h-8 ${source.color} rounded-r-lg relative overflow-hidden group hover:opacity-90 transition-opacity`}
                         style={{ width: `${source.value * 2}%` }}>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-[9px] font-medium text-foreground">{source.label}</span>
                  <span className="text-[9px] font-bold text-muted-foreground">{source.value}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Intents Column (Middle) */}
          <div className="space-y-2">
            <div className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wide mb-2 text-center">Intent Detection</div>
            {intents.map((intent, idx) => (
              <div key={idx} className="relative">
                <div className="flex items-center gap-1">
                  <div className="flex-1">
                    <div className={`h-7 ${intent.color} rounded-lg relative overflow-hidden group hover:opacity-90 transition-opacity`}
                         style={{ width: `${intent.value * 3.5}%`, margin: '0 auto' }}>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-[9px] font-medium text-foreground">{intent.label}</span>
                  <span className="text-[9px] font-bold text-muted-foreground">{intent.value}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Outcomes Column */}
          <div className="space-y-2">
            <div className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wide mb-2 text-right">Resolution</div>
            {outcomes.map((outcome, idx) => (
              <div key={idx} className="relative" style={{ marginTop: idx === 0 ? '0' : '1.5rem' }}>
                <div className="flex items-center gap-2 justify-end">
                  <div className="flex-1 flex justify-end">
                    <div className={`h-10 ${outcome.color} rounded-l-lg relative overflow-hidden group hover:opacity-90 transition-opacity`}
                         style={{ width: `${outcome.value * 1.2}%` }}>
                      <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/10" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-[9px] font-medium text-foreground">{outcome.label}</span>
                  <span className="text-[9px] font-bold text-muted-foreground">{outcome.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flow Lines (Visual connectors) */}
        <svg className="absolute inset-0 pointer-events-none opacity-20" style={{ zIndex: 0 }}>
          <defs>
            <linearGradient id="flowGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Stats Footer */}
      <div className="px-4 py-2 bg-primary/5 border-t border-primary/10 grid grid-cols-3 gap-2 text-center">
        <div>
          <div className="text-xs font-bold text-accent-green flex items-center justify-center gap-1">
            <TrendingUp className="w-3 h-3" />
            72%
          </div>
          <div className="text-[10px] text-muted-foreground">Auto-Resolved</div>
        </div>
        <div>
          <div className="text-xs font-bold text-primary">2.4m</div>
          <div className="text-[10px] text-muted-foreground">Conversations</div>
        </div>
        <div>
          <div className="text-xs font-bold text-accent-teal">18s</div>
          <div className="text-[10px] text-muted-foreground">Avg AHT</div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPreview;
