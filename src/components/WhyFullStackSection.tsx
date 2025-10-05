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

        {/* Before/After Comparison */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* BEFORE - Siloed Tools */}
          <div className="relative group">
            <div className="absolute inset-0 bg-destructive/5 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative bg-card/50 backdrop-blur-sm border-2 border-destructive/20 rounded-3xl p-8 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                  <span className="text-2xl">😰</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-destructive">Before Pullse</h3>
                  <p className="text-sm text-muted-foreground">Fragmented chaos</p>
                </div>
              </div>

              {/* Scattered tools visualization */}
              <div className="relative h-48 bg-muted/20 rounded-xl p-6 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <svg className="w-full h-full" viewBox="0 0 400 200">
                    <path d="M 50,100 Q 100,50 150,100" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="5,5" opacity="0.3"/>
                    <path d="M 150,100 Q 200,150 250,100" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="5,5" opacity="0.3"/>
                    <path d="M 250,100 Q 300,50 350,100" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="5,5" opacity="0.3"/>
                  </svg>
                </div>
                
                <div className="relative grid grid-cols-3 gap-4">
                  {[
                    { icon: MessageSquare, label: "Chat" },
                    { icon: Database, label: "CRM" },
                    { icon: BarChart3, label: "Analytics" },
                    { icon: Users, label: "Ticketing" },
                    { icon: Lock, label: "Knowledge" },
                    { icon: Zap, label: "Automation" }
                  ].map((tool, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                      <tool.icon className="w-5 h-5 text-destructive" />
                      <span className="text-xs font-medium text-destructive">{tool.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pain points */}
              <div className="space-y-3">
                {[
                  "Multiple logins & subscriptions",
                  "Manual integrations & data sync",
                  "Lost context between tools",
                  "Inconsistent customer data"
                ].map((pain, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 flex-shrink-0" />
                    <span>{pain}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AFTER - Unified Platform */}
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative bg-card/50 backdrop-blur-sm border-2 border-primary/30 rounded-3xl p-8 space-y-6 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary">After Pullse</h3>
                  <p className="text-sm text-muted-foreground">Unified simplicity</p>
                </div>
              </div>

              {/* Unified platform visualization */}
              <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-6 border border-primary/20">
                <div className="absolute inset-0 flex items-center justify-center opacity-5">
                  <div className="w-32 h-32 rounded-full border-4 border-primary" />
                </div>
                
                <div className="relative h-full flex flex-col items-center justify-center gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center border-2 border-primary/40 shadow-lg">
                    <Zap className="w-10 h-10 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-lg">Pullse Support OS</p>
                    <p className="text-xs text-muted-foreground">All-in-one platform</p>
                  </div>
                  <div className="grid grid-cols-6 gap-2 mt-2">
                    {[MessageSquare, Database, BarChart3, Users, Lock, Zap].map((Icon, idx) => (
                      <div key={idx} className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                        <Icon className="w-4 h-4 text-primary/70" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-3">
                {[
                  "Single login, unified workspace",
                  "Native integrations out-of-the-box",
                  "Complete customer context always",
                  "Real-time data synchronization"
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground font-medium">{benefit}</span>
                  </div>
                ))}
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
