import { useState, useEffect, useRef } from 'react';
import { Bot, User, Zap, Database, Code, CheckCircle, MessageSquare, Sparkles, ArrowRight, TrendingUp, Clock, Activity, RefreshCw, Shield, Boxes } from 'lucide-react';
import gsap from 'gsap';
import aiCopilotScreenshot from '@/assets/ai-copilot-screenshot.png';
import copilotInterfaceScreenshot from '@/assets/copilot-interface-screenshot.png';

export const AIAgentsSection = () => {
  const [activeTab, setActiveTab] = useState<'bots' | 'copilots'>('bots');
  const [animateApi, setAnimateApi] = useState(false);
  const [typingMessage, setTypingMessage] = useState('');
  const [showApiCalls, setShowApiCalls] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const botsVisualRef = useRef<HTMLDivElement>(null);
  const copilotsVisualRef = useRef<HTMLDivElement>(null);

  const fullMessage = "Can you update my shipping address and change my plan to Pro?";

  useEffect(() => {
    if (activeTab === 'bots') {
      setTypingMessage('');
      setShowApiCalls(false);
      let index = 0;
      const typingInterval = setInterval(() => {
        if (index < fullMessage.length) {
          setTypingMessage(fullMessage.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => setShowApiCalls(true), 500);
        }
      }, 50);
      return () => clearInterval(typingInterval);
    }
  }, [activeTab]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateApi(true);
      setTimeout(() => setAnimateApi(false), 2000);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (botsVisualRef.current && activeTab === 'bots') {
      gsap.fromTo(
        botsVisualRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      );
    }
    if (copilotsVisualRef.current && activeTab === 'copilots') {
      gsap.fromTo(
        copilotsVisualRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      );
    }
  }, [activeTab]);

  const apiActions = [
    { icon: Code, label: 'Update Shipping', color: 'text-blue-400', api: 'shipment.updateAddress()', time: '124ms' },
    { icon: Zap, label: 'Change Plan', color: 'text-purple-400', api: 'billing.upgradePlan()', time: '89ms' },
    { icon: Database, label: 'Update Profile', color: 'text-green-400', api: 'user.updateDetails()', time: '56ms' },
  ];

  const copilotMetrics = [
    { label: 'Avg Response Time', value: '2.3s', change: '-34%', icon: Clock },
    { label: 'Resolution Rate', value: '94%', change: '+12%', icon: TrendingUp },
    { label: 'Actions/Hour', value: '187', change: '+24%', icon: Activity },
  ];

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--accent)/0.15),transparent_50%)]" />
      
      {/* Animated grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Beyond Traditional Chatbots</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            AI Agents & Copilots
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Self-service bots that execute actions and intelligent copilots that augment your team
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex rounded-xl bg-card border border-border p-1.5 gap-2 shadow-lg backdrop-blur-sm">
            <button
              onClick={() => setActiveTab('bots')}
              className={`px-8 py-4 rounded-lg font-semibold transition-all duration-300 relative overflow-hidden group ${
                activeTab === 'bots'
                  ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg scale-105'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              {activeTab === 'bots' && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 animate-shimmer" />
              )}
              <Bot className="w-5 h-5 inline-block mr-2" />
              Self-Service Bots
            </button>
            <button
              onClick={() => setActiveTab('copilots')}
              className={`px-8 py-4 rounded-lg font-semibold transition-all duration-300 relative overflow-hidden group ${
                activeTab === 'copilots'
                  ? 'bg-gradient-to-r from-accent to-accent/80 text-accent-foreground shadow-lg scale-105'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              {activeTab === 'copilots' && (
                <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-white/20 to-accent/0 animate-shimmer" />
              )}
              <User className="w-5 h-5 inline-block mr-2" />
              Agent Copilots
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto">
          {activeTab === 'bots' ? (
            <div ref={botsVisualRef} className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Description */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                    <Boxes className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-primary">Universal Integration</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    Connect to Any API
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Unlike competitors that rely on third-party integrations, Pullse bots directly connect to your entire stack—no middleware, no delays.
                  </p>
                </div>

                <div className="grid gap-6">
                  {[
                    { 
                      icon: Database, 
                      title: 'Knowledge Base Integration', 
                      desc: 'Pull from your docs, FAQs, and resources in real-time',
                      gradient: 'from-blue-500 to-cyan-500'
                    },
                    { 
                      icon: Code, 
                      title: 'Universal API Access', 
                      desc: 'Execute actions across your systems without middleware',
                      gradient: 'from-purple-500 to-pink-500'
                    },
                    { 
                      icon: Zap, 
                      title: 'Instant Task Completion', 
                      desc: 'Handle complex workflows end-to-end autonomously',
                      gradient: 'from-orange-500 to-red-500'
                    }
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div 
                        key={idx}
                        className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer"
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.gradient} p-0.5 group-hover:scale-110 transition-transform`}>
                            <div className="w-full h-full bg-card rounded-lg flex items-center justify-center">
                              <Icon className="w-6 h-6 text-primary" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{item.title}</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right: Interactive Demo */}
              <div className="relative">
                {/* Glow effects */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl opacity-50 animate-pulse" />
                
                <div className="relative bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-2xl overflow-hidden">
                  {/* Modern animated mesh gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.15),transparent_50%),radial-gradient(ellipse_at_bottom_right,hsl(var(--accent)/0.15),transparent_50%)]" />
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
                    <div className="absolute top-0 -right-4 w-72 h-72 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
                    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Bot conversation */}
                    <div className="space-y-4 mb-8">
                      <div className="flex gap-3 animate-fade-in">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div className="bg-muted/80 backdrop-blur-sm rounded-2xl rounded-tl-sm px-5 py-3 max-w-[85%] shadow-md">
                          <p className="text-sm leading-relaxed">{typingMessage}</p>
                          {typingMessage.length < fullMessage.length && (
                            <span className="inline-block w-1 h-4 bg-foreground ml-1 animate-pulse" />
                          )}
                        </div>
                      </div>
                      
                      {typingMessage.length === fullMessage.length && (
                        <div className="flex gap-3 justify-end animate-fade-in">
                          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl rounded-tr-sm px-5 py-3 max-w-[85%] shadow-lg">
                            <p className="text-sm text-primary-foreground leading-relaxed">
                              I'll execute those changes right away. Let me access your account systems.
                            </p>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0 shadow-lg">
                            <Bot className="w-5 h-5 text-primary-foreground" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* API Actions */}
                    {showApiCalls && (
                      <div className="border-t border-border/50 pt-6 animate-fade-in">
                        <div className="flex items-center justify-between mb-5">
                          <p className="text-xs font-bold tracking-wider text-muted-foreground flex items-center gap-2">
                            <RefreshCw className="w-3 h-3 animate-spin" />
                            EXECUTING API CALLS
                          </p>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs text-green-500 font-semibold">LIVE</span>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          {apiActions.map((action, idx) => {
                            const Icon = action.icon;
                            return (
                              <div
                                key={idx}
                                className="group relative overflow-hidden rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-500"
                                style={{ 
                                  animationDelay: `${idx * 200}ms`,
                                  animation: animateApi ? 'pulse 2s ease-in-out' : 'none'
                                }}
                              >
                                {/* Animated background on execution */}
                                {animateApi && (
                                  <div 
                                    className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 animate-shimmer"
                                    style={{ animationDelay: `${idx * 200}ms` }}
                                  />
                                )}
                                
                                <div className="relative p-4 flex items-center gap-4">
                                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${
                                    idx === 0 ? 'from-blue-500 to-cyan-500' :
                                    idx === 1 ? 'from-purple-500 to-pink-500' :
                                    'from-green-500 to-emerald-500'
                                  } flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                    <Icon className="w-5 h-5 text-white" />
                                  </div>
                                  
                                  <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-sm mb-1">{action.label}</div>
                                    <div className="font-mono text-xs text-muted-foreground">{action.api}</div>
                                  </div>
                                  
                                  <div className="flex items-center gap-3">
                                    <span className="text-xs text-muted-foreground font-mono">{action.time}</span>
                                    <CheckCircle
                                      className={`w-5 h-5 text-green-500 transition-all duration-500 ${
                                        animateApi ? 'opacity-100 scale-110' : 'opacity-0 scale-50'
                                      }`}
                                      style={{ transitionDelay: `${idx * 200 + 500}ms` }}
                                    />
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Floating badges */}
                <div className="absolute -top-6 -right-6 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-3 rounded-full font-bold shadow-2xl animate-float flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Any API
                </div>
                
                <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full font-bold shadow-2xl animate-float flex items-center gap-2" style={{ animationDelay: '1s' }}>
                  <Shield className="w-4 h-4" />
                  Secure
                </div>
              </div>
            </div>
          ) : (
            <div ref={copilotsVisualRef} className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Interactive Demo */}
              <div className="relative order-2 lg:order-1">
                <div className="relative group">
                  {/* Subtle glow on hover */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-accent/10 to-purple-500/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Screenshot Container */}
                  <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <img 
                      src={copilotInterfaceScreenshot} 
                      alt="Pullse AI Copilot Interface showing agent assistance features" 
                      className="w-full h-auto"
                    />
                  </div>

                  {/* Minimal floating badge */}
                  <div className="absolute -top-3 -left-3 bg-gradient-to-r from-accent to-accent/80 text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    AI-Powered
                  </div>
                </div>
              </div>

              {/* Right: Description */}
              <div className="space-y-6 order-1 lg:order-2">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
                    <User className="w-3.5 h-3.5 text-accent" />
                    <span className="text-xs font-medium text-accent">Agent Augmentation</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold">
                    Supercharge Your Team
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    AI copilots work alongside agents, handling complexity so your team can focus on building relationships.
                  </p>
                </div>

                <div className="grid gap-4">
                  {[
                    { 
                      icon: MessageSquare, 
                      title: 'Instant Context', 
                      desc: 'Summarize conversations with sentiment analysis'
                    },
                    { 
                      icon: Sparkles, 
                      title: 'Smart Response Drafts', 
                      desc: 'AI-powered suggestions maintaining your brand voice'
                    },
                    { 
                      icon: Zap, 
                      title: 'On-Demand Actions', 
                      desc: 'Execute API calls without leaving the interface'
                    }
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div 
                        key={idx}
                        className="group flex items-start gap-3 p-4 rounded-lg bg-card/50 border border-border/50 hover:border-accent/30 hover:bg-card/80 transition-all duration-200"
                      >
                        <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                          <Icon className="w-4 h-4 text-accent" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Comparison note */}
        <div className="mt-24 text-center max-w-4xl mx-auto">
          <div className="relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-card/50 backdrop-blur-xl border border-border shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl" />
            <Code className="w-5 h-5 text-primary relative z-10" />
            <p className="text-sm md:text-base text-muted-foreground relative z-10">
              While competitors rely on third-party integrations,
              <span className="font-bold text-foreground"> Pullse connects directly to any API</span> for true flexibility
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
