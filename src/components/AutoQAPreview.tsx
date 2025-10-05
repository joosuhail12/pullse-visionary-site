import { Shield, TrendingUp, AlertCircle } from "lucide-react";

const AutoQAPreview = () => {
  const metrics = [
    { name: "Greeting", score: 85, color: "bg-blue-500", feedback: "Good opening, personalized" },
    { name: "Empathy", score: 65, color: "bg-red-500", feedback: "Could show more understanding" },
    { name: "Clarity", score: 88, color: "bg-blue-500", feedback: "Clear communication" },
    { name: "Solution", score: 95, color: "bg-accent-green", feedback: "Excellent problem-solving" },
    { name: "Tone", score: 82, color: "bg-blue-500", feedback: "Professional tone maintained" },
    { name: "Grammar", score: 92, color: "bg-accent-green", feedback: "Minor typos, overall good" }
  ];

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-background to-muted/30 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-primary/5 border-b border-primary/10">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Shield className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-semibold text-foreground">Agent Performance</span>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
            <span className="text-[10px] text-muted-foreground">Live Analysis</span>
          </div>
        </div>
        
        {/* Overall Score */}
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12">
            <svg className="w-12 h-12 -rotate-90">
              <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="3" fill="none" className="text-muted/30" />
              <circle 
                cx="24" 
                cy="24" 
                r="20" 
                stroke="currentColor" 
                strokeWidth="3" 
                fill="none" 
                strokeDasharray="125.6"
                strokeDashoffset="13.8"
                className="text-primary transition-all"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-foreground">87%</span>
            </div>
          </div>
          <div className="flex-1">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
              <TrendingUp className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-semibold text-primary">Above Expectations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {metrics.map((metric, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-foreground">{metric.name}</span>
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold text-foreground">{metric.score}/100</span>
                <span className="text-[9px] text-muted-foreground">{metric.score}%</span>
              </div>
            </div>
            <div className="h-1.5 bg-muted/40 rounded-full overflow-hidden">
              <div 
                className={`h-full ${metric.color} transition-all duration-500 rounded-full`}
                style={{ width: `${metric.score}%` }}
              />
            </div>
            <p className="text-[9px] text-muted-foreground italic">{metric.feedback}</p>
          </div>
        ))}
      </div>

      {/* Stats Footer */}
      <div className="px-4 py-2 bg-primary/5 border-t border-primary/10 grid grid-cols-3 gap-2 text-center">
        <div>
          <div className="text-xs font-bold text-accent-green">3</div>
          <div className="text-[10px] text-muted-foreground">Top Parameters</div>
        </div>
        <div>
          <div className="text-xs font-bold text-accent-orange flex items-center justify-center gap-1">
            <AlertCircle className="w-3 h-3" />
            1
          </div>
          <div className="text-[10px] text-muted-foreground">Needs Focus</div>
        </div>
        <div>
          <div className="text-xs font-bold text-primary">13%</div>
          <div className="text-[10px] text-muted-foreground">Avg Weight</div>
        </div>
      </div>
    </div>
  );
};

export default AutoQAPreview;
