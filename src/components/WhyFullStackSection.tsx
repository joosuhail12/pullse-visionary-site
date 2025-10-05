import { ArrowRight, CheckCircle, Clock, Users, Zap, BarChart3, MessageSquare, Database, Lock, TrendingUp } from "lucide-react";

const WhyFullStackSection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
      <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,transparent,black)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 space-y-4 animate-fade-in max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Why <span className="text-primary">full-stack</span> matters
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Say goodbye to multiple logins, context switching, and inconsistent data. 
            One platform, infinite possibilities.
          </p>
        </div>

        {/* Before/After Comparison - Modern Design */}
        <div className="relative max-w-6xl mx-auto mb-20">
          {/* Comparison Container */}
          <div className="relative bg-gradient-to-br from-muted/30 to-muted/10 backdrop-blur-sm rounded-3xl border border-border/50 p-8 md:p-12 overflow-hidden">
            {/* Ambient Background Effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-destructive/10 rounded-full blur-3xl opacity-20" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-20" />
            
            <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* BEFORE - Siloed Chaos */}
              <div className="space-y-6">
                {/* Header */}
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-destructive/10 border border-destructive/20">
                    <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                    <span className="text-xs font-semibold text-destructive uppercase tracking-wider">Fragmented</span>
                  </div>
                  <h3 className="text-3xl font-bold text-foreground">Before Pullse</h3>
                  <p className="text-muted-foreground text-sm">The hidden cost of disconnected tools</p>
                </div>

                {/* Visual Chaos Representation */}
                <div className="relative aspect-square max-w-sm mx-auto">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm border border-destructive/20" />
                  
                  {/* Scattered Tool Nodes */}
                  <div className="absolute inset-0 p-6">
                    {[
                      { icon: MessageSquare, pos: "top-4 left-4", delay: "0s" },
                      { icon: Database, pos: "top-4 right-4", delay: "0.1s" },
                      { icon: BarChart3, pos: "bottom-4 left-4", delay: "0.2s" },
                      { icon: Users, pos: "bottom-4 right-4", delay: "0.3s" },
                      { icon: Lock, pos: "top-1/2 left-8 -translate-y-1/2", delay: "0.4s" },
                      { icon: Zap, pos: "top-1/2 right-8 -translate-y-1/2", delay: "0.5s" }
                    ].map((tool, idx) => (
                      <div 
                        key={idx}
                        className={`absolute ${tool.pos} w-14 h-14 rounded-xl bg-background/90 border border-destructive/30 flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer group/tool`}
                        style={{ animation: `float 3s ease-in-out infinite ${tool.delay}` }}
                      >
                        <tool.icon className="w-6 h-6 text-destructive/70 group-hover/tool:text-destructive transition-colors" />
                      </div>
                    ))}
                    
                    {/* Tangled Connection Lines */}
                    <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
                      <line x1="20%" y1="20%" x2="80%" y2="20%" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" className="text-destructive animate-pulse" />
                      <line x1="80%" y1="20%" x2="80%" y2="80%" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" className="text-destructive animate-pulse" style={{ animationDelay: '0.5s' }} />
                      <line x1="80%" y1="80%" x2="20%" y2="80%" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" className="text-destructive animate-pulse" style={{ animationDelay: '1s' }} />
                      <line x1="20%" y1="80%" x2="20%" y2="20%" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" className="text-destructive animate-pulse" style={{ animationDelay: '1.5s' }} />
                    </svg>
                  </div>
                </div>

                {/* Pain Points */}
                <div className="space-y-3">
                  {[
                    "5+ disconnected platforms",
                    "Manual data entry & syncing",
                    "Lost context between tools",
                    "Duplicated customer records"
                  ].map((pain, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-3 text-sm text-muted-foreground p-3 rounded-lg bg-background/40 border border-border/30 hover:border-destructive/30 transition-colors group/pain"
                    >
                      <div className="w-1 h-1 rounded-full bg-destructive" />
                      <span className="group-hover/pain:text-foreground transition-colors">{pain}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vertical Divider with Arrow */}
              <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="relative">
                  {/* Pulse Rings */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-primary/20 animate-ping" style={{ animationDuration: '2s' }} />
                  </div>
                  
                  {/* Arrow Circle */}
                  <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-primary via-accent to-primary bg-[length:200%_200%] animate-gradient flex items-center justify-center shadow-2xl shadow-primary/30">
                    <ArrowRight className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>

              {/* Mobile Divider */}
              <div className="lg:hidden flex justify-center py-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl">
                  <ArrowRight className="w-6 h-6 text-white rotate-90" />
                </div>
              </div>

              {/* AFTER - Unified Excellence */}
              <div className="space-y-6">
                {/* Header */}
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30">
                    <Zap className="w-3 h-3 text-primary" />
                    <span className="text-xs font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent uppercase tracking-wider">Unified</span>
                  </div>
                  <h3 className="text-3xl font-bold text-foreground">After Pullse</h3>
                  <p className="text-muted-foreground text-sm">One platform, infinite possibilities</p>
                </div>

                {/* Unified Platform Visualization */}
                <div className="relative aspect-square max-w-sm mx-auto">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 backdrop-blur-sm border border-primary/30" />
                  
                  {/* Central Hub */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative group/hub">
                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-primary/40 rounded-3xl blur-2xl group-hover/hub:blur-3xl transition-all" />
                      
                      {/* Central Platform */}
                      <div className="relative w-32 h-32 rounded-3xl bg-gradient-to-br from-primary via-accent to-primary bg-[length:200%_200%] animate-gradient flex flex-col items-center justify-center border-2 border-primary/40 shadow-2xl shadow-primary/50 group-hover/hub:scale-110 transition-transform duration-500">
                        <Zap className="w-14 h-14 text-white drop-shadow-lg mb-1" />
                        <span className="text-xs font-bold text-white/90">Pullse OS</span>
                      </div>
                    </div>
                  </div>

                  {/* Orbiting Integrated Modules */}
                  <div className="absolute inset-0">
                    {[
                      { Icon: MessageSquare, angle: 0, label: "Chat" },
                      { Icon: Database, angle: 60, label: "CRM" },
                      { Icon: BarChart3, angle: 120, label: "Analytics" },
                      { Icon: Users, angle: 180, label: "Tickets" },
                      { Icon: Lock, angle: 240, label: "KB" },
                      { Icon: Zap, angle: 300, label: "Auto" }
                    ].map(({ Icon, angle, label }, idx) => {
                      const radius = 45; // percentage
                      const x = 50 + radius * Math.cos((angle - 90) * Math.PI / 180);
                      const y = 50 + radius * Math.sin((angle - 90) * Math.PI / 180);
                      
                      return (
                        <div
                          key={idx}
                          className="absolute w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 backdrop-blur-sm border border-primary/40 flex items-center justify-center shadow-lg hover:scale-125 hover:shadow-primary/50 transition-all duration-300 cursor-pointer group/module"
                          style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            transform: 'translate(-50%, -50%)',
                            animation: `float-slow 4s ease-in-out infinite ${idx * 0.2}s`
                          }}
                        >
                          <Icon className="w-5 h-5 text-primary group-hover/module:text-accent transition-colors" />
                        </div>
                      );
                    })}
                  </div>

                  {/* Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
                    {[0, 60, 120, 180, 240, 300].map((angle, idx) => {
                      const radius = 45;
                      const x = 50 + radius * Math.cos((angle - 90) * Math.PI / 180);
                      const y = 50 + radius * Math.sin((angle - 90) * Math.PI / 180);
                      return (
                        <line
                          key={idx}
                          x1="50%"
                          y1="50%"
                          x2={`${x}%`}
                          y2={`${y}%`}
                          stroke="currentColor"
                          strokeWidth="1"
                          className="text-primary animate-pulse"
                          style={{ animationDelay: `${idx * 0.2}s` }}
                        />
                      );
                    })}
                  </svg>
                </div>

                {/* Benefits */}
                <div className="space-y-3">
                  {[
                    "Single unified workspace",
                    "Automatic data sync",
                    "Complete customer context",
                    "AI-powered automation"
                  ].map((benefit, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-3 text-sm text-foreground p-3 rounded-lg bg-primary/5 border border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all group/benefit"
                    >
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 group-hover/benefit:scale-110 transition-transform" />
                      <span className="font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Central Arrow/Transition */}
        <div className="flex justify-center my-12 lg:hidden">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center animate-bounce">
            <ArrowRight className="w-6 h-6 text-primary rotate-90" />
          </div>
        </div>

        {/* Metrics Section */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="w-7 h-7 text-primary" />
              </div>
              <div>
                <p className="text-4xl font-bold text-primary">50%</p>
                <p className="text-sm text-muted-foreground mt-1">Faster resolution time</p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Teams cut ticket resolution time in half after consolidating onto Pullse
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-accent/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-card/50 backdrop-blur-sm border border-accent/20 rounded-2xl p-6 text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-accent" />
              </div>
              <div>
                <p className="text-4xl font-bold text-accent">3x</p>
                <p className="text-sm text-muted-foreground mt-1">Team productivity boost</p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Automations and AI reduce handle time and improve customer experience
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <div>
                <p className="text-4xl font-bold text-primary">94%</p>
                <p className="text-sm text-muted-foreground mt-1">Customer satisfaction</p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Consistent experience across all channels leads to happier customers
              </p>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm border border-primary/20 rounded-3xl p-8 md:p-12">
            <div className="absolute top-6 left-6 text-6xl text-primary/20 font-serif">"</div>
            <div className="relative z-10 space-y-6">
              <p className="text-lg md:text-xl text-foreground italic leading-relaxed">
                Switching to Pullse was a game-changer. We went from juggling 5 different tools to having everything in one place. 
                Our support team is faster, customers are happier, and we're finally seeing the full picture of our customer journey.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">Head of Customer Success, TechCorp</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Supporting narrative */}
        <div className="max-w-3xl mx-auto text-center mt-16 space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            Most teams juggle an assortment of tools — separate help desk, chat app, knowledge base, CRM — 
            leading to inconsistent data, multiple logins, and lost context.
          </p>
          <p className="text-foreground font-medium leading-relaxed">
            Pullse replaces the patchwork: unify every channel and customer record in one support OS. 
            Powered by AI chatbots and copilots that plug into any API, your team works faster and smarter.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyFullStackSection;
