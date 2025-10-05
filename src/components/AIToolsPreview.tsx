import { Sparkles, Copy, CheckCircle } from "lucide-react";

const AIToolsPreview = () => {
  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-background to-muted/30 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-primary/5 border-b border-primary/10 flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="text-sm font-semibold text-foreground">AI Text Rewriter</span>
        <div className="ml-auto">
          <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 grid grid-cols-2 gap-3 p-3">
        {/* Original Text */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Original Text</span>
          </div>
          <div className="flex-1 bg-muted/40 rounded-lg p-3 border border-muted">
            <p className="text-[10px] leading-relaxed text-foreground/80">
              Hello,
              <br /><br />
              In order to reset your password, go to your account settings and reset password by verifying your email
            </p>
            <div className="mt-2 text-[9px] text-muted-foreground">
              43 chars
            </div>
          </div>
          
          {/* Options */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-primary/5 rounded-lg px-2 py-1.5 border border-primary/10">
              <span className="text-[9px] text-primary font-medium">Change Tone</span>
            </div>
            <div className="bg-muted/40 rounded-lg px-2 py-1.5 border border-muted flex items-center gap-1">
              <span className="text-[9px] text-foreground">😊 Casual</span>
            </div>
          </div>
        </div>

        {/* Enhanced Text */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-3 h-3 text-accent-green" />
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Enhanced</span>
          </div>
          <div className="flex-1 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-3 border border-primary/20">
            <p className="text-[10px] leading-relaxed text-foreground">
              Hey there! To reset your password, open Account Settings and choose "Reset password." You'll get a verification email with a link to finish the reset.
            </p>
            <div className="mt-2 flex items-center gap-2">
              <div className="text-[9px] text-muted-foreground">126 chars</div>
              <div className="ml-auto flex gap-1">
                <div className="px-1.5 py-0.5 rounded bg-accent-green/10 text-[8px] text-accent-green font-medium">+83 chars</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button className="bg-muted/40 rounded-lg px-2 py-1.5 border border-muted flex items-center justify-center gap-1 hover:bg-muted/60 transition-colors">
              <Copy className="w-3 h-3 text-muted-foreground" />
              <span className="text-[9px] text-foreground font-medium">Copy</span>
            </button>
            <button className="bg-gradient-to-r from-primary to-accent rounded-lg px-2 py-1.5 flex items-center justify-center gap-1 hover:opacity-90 transition-opacity">
              <span className="text-[9px] text-primary-foreground font-semibold">Use Text</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Footer */}
      <div className="px-4 py-2 bg-primary/5 border-t border-primary/10 grid grid-cols-3 gap-2 text-center">
        <div>
          <div className="text-xs font-bold text-primary">847</div>
          <div className="text-[10px] text-muted-foreground">Rewrites Today</div>
        </div>
        <div>
          <div className="text-xs font-bold text-accent-teal">12</div>
          <div className="text-[10px] text-muted-foreground">Tone Styles</div>
        </div>
        <div>
          <div className="text-xs font-bold text-accent-green">98%</div>
          <div className="text-[10px] text-muted-foreground">Accuracy</div>
        </div>
      </div>
    </div>
  );
};

export default AIToolsPreview;
