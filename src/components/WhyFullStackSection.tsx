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

        {/* Before/After Comparison with Center Arrow */}
        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-0 items-center mb-16">
            {/* BEFORE - Siloed Tools */}
            <div className="relative group perspective-1000">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-br from-red-500/20 via-orange-500/20 to-red-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-60 transition-all duration-700" />
              
              <div className="relative bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-xl border border-border/50 rounded-3xl p-8 space-y-6 shadow-2xl hover:shadow-red-500/10 transition-all duration-500 hover:-translate-y-1">
                {/* Header with badge */}
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/10 border border-destructive/20">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
                    </span>
                    <span className="text-xs font-semibold text-destructive tracking-wide uppercase">Fragmented</span>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                      Before Pullse
                    </h3>
                    <p className="text-sm text-muted-foreground">Multiple disconnected tools creating chaos</p>
                  </div>
                </div>

                {/* Scattered tools visualization - Interactive */}
                <div className="relative h-56 bg-gradient-to-br from-muted/30 to-muted/10 rounded-2xl p-6 overflow-hidden border border-border/50">
                  {/* Animated tangled lines background */}
                  <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 400 200">
                      <path d="M 30,100 Q 80,40 130,100 T 230,100 T 330,100" 
                            stroke="url(#gradient1)" 
                            strokeWidth="2" 
                            fill="none" 
                            strokeDasharray="8,4"
                            className="animate-pulse" />
                      <path d="M 50,60 Q 100,120 150,60 T 250,60 T 350,60" 
                            stroke="url(#gradient2)" 
                            strokeWidth="2" 
                            fill="none" 
                            strokeDasharray="6,3"
                            style={{ animationDelay: '0.3s' }}
                            className="animate-pulse" />
                      <path d="M 70,140 Q 120,80 170,140 T 270,140 T 370,140" 
                            stroke="url(#gradient3)" 
                            strokeWidth="2" 
                            fill="none" 
                            strokeDasharray="10,5"
                            style={{ animationDelay: '0.6s' }}
                            className="animate-pulse" />
                      <defs>
                        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="currentColor" stopOpacity="0.2"/>
                          <stop offset="50%" stopColor="currentColor" stopOpacity="0.5"/>
                          <stop offset="100%" stopColor="currentColor" stopOpacity="0.2"/>
                        </linearGradient>
                        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="currentColor" stopOpacity="0.3"/>
                          <stop offset="50%" stopColor="currentColor" stopOpacity="0.6"/>
                          <stop offset="100%" stopColor="currentColor" stopOpacity="0.3"/>
                        </linearGradient>
                        <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="currentColor" stopOpacity="0.25"/>
                          <stop offset="50%" stopColor="currentColor" stopOpacity="0.55"/>
                          <stop offset="100%" stopColor="currentColor" stopOpacity="0.25"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  
                  <div className="relative grid grid-cols-3 gap-3 h-full content-center">
                    {[
                      { icon: MessageSquare, label: "Chat", delay: "0ms" },
                      { icon: Database, label: "CRM", delay: "100ms" },
                      { icon: BarChart3, label: "Analytics", delay: "200ms" },
                      { icon: Users, label: "Ticketing", delay: "300ms" },
                      { icon: Lock, label: "Knowledge", delay: "400ms" },
                      { icon: Zap, label: "Automation", delay: "500ms" }
                    ].map((tool, idx) => (
                      <div 
                        key={idx} 
                        className="group/tool relative flex flex-col items-center gap-2 p-3 bg-background/80 backdrop-blur-sm rounded-xl border border-destructive/30 hover:border-destructive/60 hover:bg-destructive/5 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-destructive/20 cursor-pointer"
                        style={{ 
                          animationDelay: tool.delay,
                          animation: 'float 3s ease-in-out infinite'
                        }}
                      >
                        <tool.icon className="w-5 h-5 text-destructive group-hover/tool:scale-110 transition-transform" />
                        <span className="text-xs font-medium text-muted-foreground group-hover/tool:text-destructive transition-colors">{tool.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pain points with icons */}
                <div className="space-y-3 pt-2">
                  {[
                    { text: "Multiple logins & subscriptions", icon: Lock },
                    { text: "Manual integrations & data sync", icon: Database },
                    { text: "Lost context between tools", icon: MessageSquare },
                    { text: "Inconsistent customer data", icon: BarChart3 }
                  ].map((pain, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-start gap-3 text-sm text-muted-foreground group/item hover:text-foreground transition-colors p-2 rounded-lg hover:bg-muted/30"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <div className="w-5 h-5 rounded-md bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-destructive/20 transition-colors">
                        <pain.icon className="w-3 h-3 text-destructive" />
                      </div>
                      <span className="leading-relaxed">{pain.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CENTER ARROW - Desktop only */}
            <div className="hidden lg:flex flex-col items-center justify-center px-8 relative z-20">
              <div className="relative">
                {/* Animated pulse rings */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-primary/20 animate-ping" style={{ animationDuration: '2s' }} />
                </div>
                <div className="absolute inset-0 flex items-center justify-center" style={{ animationDelay: '0.5s' }}>
                  <div className="w-20 h-20 rounded-full bg-accent/20 animate-ping" style={{ animationDuration: '2s' }} />
                </div>
                
                {/* Arrow container */}
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary via-accent to-primary bg-[length:200%_200%] animate-gradient flex items-center justify-center shadow-2xl shadow-primary/50">
                  <ArrowRight className="w-8 h-8 text-white animate-pulse" />
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-sm font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Transform
                </p>
              </div>
            </div>

            {/* Mobile arrow */}
            <div className="lg:hidden flex justify-center py-4">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
                <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl">
                  <ArrowRight className="w-7 h-7 text-white rotate-90 animate-pulse" />
                </div>
              </div>
            </div>

            {/* AFTER - Unified Platform */}
            <div className="relative group perspective-1000">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 via-accent/30 to-primary/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              
              <div className="relative bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-xl border border-primary/30 rounded-3xl p-8 space-y-6 shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50">
                {/* Header with badge */}
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30">
                    <Zap className="w-3.5 h-3.5 text-primary animate-pulse" />
                    <span className="text-xs font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent tracking-wide uppercase">Unified</span>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                      After Pullse
                    </h3>
                    <p className="text-sm text-muted-foreground">Everything you need in one powerful platform</p>
                  </div>
                </div>

                {/* Unified platform visualization - Interactive */}
                <div className="relative h-56 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 rounded-2xl p-6 border border-primary/20 overflow-hidden group/viz">
                  {/* Animated background */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-2 border-primary/30 animate-ping" style={{ animationDuration: '3s' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-accent/30 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
                  </div>
                  
                  <div className="relative h-full flex flex-col items-center justify-center gap-4">
                    {/* Central hub */}
                    <div className="relative group/hub">
                      <div className="absolute inset-0 bg-primary/30 rounded-2xl blur-xl group-hover/viz:blur-2xl transition-all" />
                      <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-primary via-accent to-primary bg-[length:200%_200%] animate-gradient flex items-center justify-center border-2 border-primary/40 shadow-2xl shadow-primary/50 group-hover/viz:scale-110 transition-transform duration-500">
                        <Zap className="w-12 h-12 text-white drop-shadow-lg" />
                      </div>
                    </div>
                    
                    <div className="text-center space-y-1">
                      <p className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Pullse Support OS
                      </p>
                      <p className="text-xs text-muted-foreground font-medium">Unified workspace</p>
                    </div>
                    
                    {/* Integrated modules */}
                    <div className="flex items-center justify-center gap-2 mt-2">
                      {[
                        { Icon: MessageSquare, delay: "0ms" },
                        { Icon: Database, delay: "100ms" },
                        { Icon: BarChart3, delay: "200ms" },
                        { Icon: Users, delay: "300ms" },
                        { Icon: Lock, delay: "400ms" },
                        { Icon: Zap, delay: "500ms" }
                      ].map(({ Icon, delay }, idx) => (
                        <div 
                          key={idx} 
                          className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-primary/30 hover:border-primary/60 hover:scale-125 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-primary/30"
                          style={{ 
                            animationDelay: delay,
                            animation: 'float-slow 4s ease-in-out infinite'
                          }}
                        >
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Benefits with checkmarks */}
                <div className="space-y-3 pt-2">
                  {[
                    { text: "Single login, unified workspace", icon: CheckCircle },
                    { text: "Native integrations out-of-the-box", icon: Zap },
                    { text: "Complete customer context always", icon: Users },
                    { text: "Real-time data synchronization", icon: TrendingUp }
                  ].map((benefit, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-start gap-3 text-sm group/item hover:bg-primary/5 p-2 rounded-lg transition-all duration-300"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <div className="w-5 h-5 rounded-md bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-primary/30 group-hover/item:scale-110 transition-all">
                        <benefit.icon className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-foreground font-medium leading-relaxed group-hover/item:text-primary transition-colors">{benefit.text}</span>
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
