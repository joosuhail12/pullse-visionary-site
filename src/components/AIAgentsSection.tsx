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
        <div className="text-center mb-20 space-y-5 animate-fade-in">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary tracking-wide">Beyond Traditional Chatbots</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            AI Agents & Copilots
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Self-service bots that execute actions and intelligent copilots that augment your team
          </p>
        </div>

        {/* Tab Navigation - Modern Segmented Control */}
        <div className="flex justify-center mb-20">
          <div className="relative inline-flex items-center rounded-full bg-muted/50 backdrop-blur-sm p-1 border border-border/50">
            {/* Sliding indicator */}
            <div
              className={`absolute top-1 bottom-1 rounded-full bg-primary shadow-md transition-all duration-300 ease-out ${
                activeTab === 'bots' ? 'left-1 right-[50%]' : 'left-[50%] right-1'
              }`}
            />
            
            <button
              onClick={() => setActiveTab('bots')}
              className={`relative z-10 flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-sm transition-colors duration-300 ${
                activeTab === 'bots'
                  ? 'text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Bot className="w-4 h-4" />
              <span className="whitespace-nowrap">Self-Service Bots</span>
            </button>
            
            <button
              onClick={() => setActiveTab('copilots')}
              className={`relative z-10 flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-sm transition-colors duration-300 ${
                activeTab === 'copilots'
                  ? 'text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <User className="w-4 h-4" />
              <span className="whitespace-nowrap">Agent Copilots</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto">
          {activeTab === 'bots' ? (
            <div ref={botsVisualRef} className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Description */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                    <Boxes className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-medium text-primary">Universal Integration</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold">
                    Connect to Any API
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    Unlike competitors that rely on third-party integrations, Pullse bots directly connect to your entire stack—no middleware, no delays.
                  </p>
                </div>

                <div className="grid gap-4">
                  {[
                    { 
                      icon: Database, 
                      title: 'Knowledge Base Integration', 
                      desc: 'Pull from docs and resources in real-time'
                    },
                    { 
                      icon: Code, 
                      title: 'Universal API Access', 
                      desc: 'Execute actions without middleware'
                    },
                    { 
                      icon: Zap, 
                      title: 'Instant Task Completion', 
                      desc: 'Handle complex workflows autonomously'
                    }
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div 
                        key={idx}
                        className="group flex items-start gap-3 p-4 rounded-lg bg-card/50 border border-border/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-200"
                      >
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-4 h-4 text-primary" />
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

              {/* Right: Interactive Demo */}
              <div className="relative group">
                {/* Subtle hover glow */}
                <div className="absolute -inset-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                  {/* Subtle mesh gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.08),transparent_50%),radial-gradient(ellipse_at_bottom_right,hsl(var(--accent)/0.08),transparent_50%)]" />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Bot conversation */}
                    <div className="space-y-3 mb-6">
                      {/* User message */}
                      <div className="flex gap-2.5 animate-fade-in">
                        <div className="relative flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md ring-2 ring-background">
                            <User className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        <div className="flex-1 max-w-[80%]">
                          <div className="bg-card/90 backdrop-blur-sm rounded-2xl rounded-tl-md px-4 py-2.5 shadow-sm border border-border/50">
                            <p className="text-sm leading-relaxed text-foreground">{typingMessage}</p>
                            {typingMessage.length < fullMessage.length && (
                              <span className="inline-block w-0.5 h-3.5 bg-primary ml-1 animate-pulse" />
                            )}
                          </div>
                          <p className="text-[10px] text-muted-foreground mt-1 ml-3">Just now</p>
                        </div>
                      </div>
                      
                      {/* Bot response */}
                      {typingMessage.length === fullMessage.length && (
                        <div className="flex gap-2.5 justify-end animate-fade-in">
                          <div className="flex-1 max-w-[80%] flex flex-col items-end">
                            <div className="bg-gradient-to-br from-primary via-primary to-primary/90 rounded-2xl rounded-tr-md px-4 py-2.5 shadow-lg">
                              <p className="text-sm text-primary-foreground leading-relaxed">
                                I'll execute those changes right away. Let me access your account systems.
                              </p>
                            </div>
                            <div className="flex items-center gap-1.5 mt-1 mr-3">
                              <p className="text-[10px] text-muted-foreground">Just now</p>
                              <CheckCircle className="w-3 h-3 text-primary" />
                            </div>
                          </div>
                          <div className="relative flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/90 flex items-center justify-center shadow-md ring-2 ring-primary/20">
                              <Bot className="w-4 h-4 text-primary-foreground" />
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-card" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* API Actions */}
                    {showApiCalls && (
                      <div className="border-t border-border/30 pt-5 animate-fade-in">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            <p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                              Executing Actions
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500/10">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] text-green-600 font-semibold">LIVE</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          {apiActions.map((action, idx) => {
                            const Icon = action.icon;
                            return (
                              <div
                                key={idx}
                                className="group relative overflow-hidden rounded-xl bg-card/60 backdrop-blur-sm border border-border/40 hover:border-primary/40 hover:bg-card/80 transition-all duration-300"
                                style={{ 
                                  animationDelay: `${idx * 150}ms`,
                                }}
                              >
                                {/* Success wave animation */}
                                {animateApi && (
                                  <div 
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-shimmer"
                                    style={{ animationDelay: `${idx * 150}ms` }}
                                  />
                                )}
                                
                                <div className="relative p-3 flex items-center gap-3">
                                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${
                                    idx === 0 ? 'from-blue-500 to-cyan-500' :
                                    idx === 1 ? 'from-purple-500 to-pink-500' :
                                    'from-green-500 to-emerald-500'
                                  } flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}>
                                    <Icon className="w-4 h-4 text-white" />
                                  </div>
                                  
                                  <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-xs mb-0.5">{action.label}</div>
                                    <div className="font-mono text-[10px] text-muted-foreground truncate">{action.api}</div>
                                  </div>
                                  
                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-muted-foreground font-mono tabular-nums">{action.time}</span>
                                    <CheckCircle
                                      className={`w-4 h-4 text-green-500 transition-all duration-500 ${
                                        animateApi ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                                      }`}
                                      style={{ transitionDelay: `${idx * 150 + 400}ms` }}
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

                {/* Minimal floating badges */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-primary to-primary/80 text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1.5">
                  <Zap className="w-3 h-3" />
                  Any API
                </div>
                
                <div className="absolute -bottom-3 -left-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1.5">
                  <Shield className="w-3 h-3" />
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
