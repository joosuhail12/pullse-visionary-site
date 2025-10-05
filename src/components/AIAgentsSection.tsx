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
    <section ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden bg-background">
      {/* Modern layered background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.03] to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--accent)/0.06),transparent_50%)]" />
      
      {/* Animated dot pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.3)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]" />
      </div>
      
      {/* Floating gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-primary tracking-wide">Beyond Chatbots</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            AI Agents & Copilots
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Self-service bots that execute actions and intelligent copilots that augment your team
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-20">
          <div className="inline-flex rounded-2xl bg-muted/30 p-1 gap-1">
            <button
              onClick={() => setActiveTab('bots')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === 'bots'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Bot className="w-4 h-4 inline-block mr-2" />
              Self-Service Bots
            </button>
            <button
              onClick={() => setActiveTab('copilots')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === 'copilots'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <User className="w-4 h-4 inline-block mr-2" />
              Agent Copilots
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div>
          {activeTab === 'bots' ? (
            <div ref={botsVisualRef} className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Description */}
              <div className="space-y-10">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10">
                    <Boxes className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-medium text-primary tracking-wide">Universal Integration</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                    Connect to Any API
                  </h3>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Unlike competitors that rely on third-party integrations, Pullse bots directly connect to your entire stack—no middleware, no delays.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    { 
                      icon: Database, 
                      title: 'Knowledge Base Integration', 
                      desc: 'Pull from your docs, FAQs, and resources in real-time'
                    },
                    { 
                      icon: Code, 
                      title: 'Universal API Access', 
                      desc: 'Execute actions across your systems without middleware'
                    },
                    { 
                      icon: Zap, 
                      title: 'Instant Task Completion', 
                      desc: 'Handle complex workflows end-to-end autonomously'
                    }
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div 
                        key={idx}
                        className="group flex items-start gap-4 p-5 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all duration-300 cursor-pointer"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 pt-0.5">
                          <h4 className="font-semibold text-base mb-1.5">{item.title}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right: Interactive Demo */}
              <div className="relative lg:pl-8">
                <div className="relative bg-card border border-border rounded-3xl p-8 shadow-xl overflow-hidden">
                  {/* Minimal accent */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Bot conversation */}
                    <div className="space-y-3 mb-8">
                      <div className="flex gap-3 animate-fade-in">
                        <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4" />
                        </div>
                        <div className="bg-muted/50 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                          <p className="text-sm">{typingMessage}</p>
                          {typingMessage.length < fullMessage.length && (
                            <span className="inline-block w-0.5 h-4 bg-foreground ml-1 animate-pulse" />
                          )}
                        </div>
                      </div>
                      
                      {typingMessage.length === fullMessage.length && (
                        <div className="flex gap-3 justify-end animate-fade-in">
                          <div className="bg-foreground text-background rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%]">
                            <p className="text-sm">
                              I'll execute those changes right away. Let me access your account systems.
                            </p>
                          </div>
                          <div className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center flex-shrink-0">
                            <Bot className="w-4 h-4 text-background" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* API Actions */}
                    {showApiCalls && (
                      <div className="border-t border-border pt-6 animate-fade-in">
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-xs font-medium tracking-wide text-muted-foreground flex items-center gap-2">
                            <RefreshCw className="w-3 h-3 animate-spin" />
                            Executing API Calls
                          </p>
                          <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs text-muted-foreground font-medium">Live</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          {apiActions.map((action, idx) => {
                            const Icon = action.icon;
                            return (
                              <div
                                key={idx}
                                className="group relative overflow-hidden rounded-xl bg-muted/30 hover:bg-muted/50 border border-transparent hover:border-border transition-all duration-300"
                              >
                                <div className="relative p-4 flex items-center gap-3">
                                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Icon className="w-4 h-4 text-primary" />
                                  </div>
                                  
                                  <div className="flex-1 min-w-0">
                                    <div className="font-medium text-sm mb-0.5">{action.label}</div>
                                    <div className="font-mono text-xs text-muted-foreground">{action.api}</div>
                                  </div>
                                  
                                  <div className="flex items-center gap-3">
                                    <span className="text-xs text-muted-foreground font-mono">{action.time}</span>
                                    <CheckCircle
                                      className={`w-4 h-4 text-green-500 transition-all duration-500 ${
                                        animateApi ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
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

                {/* Minimal badge */}
                <div className="absolute -top-3 -right-3 bg-foreground text-background px-4 py-2 rounded-full text-xs font-medium shadow-lg flex items-center gap-1.5">
                  <Zap className="w-3 h-3" />
                  Any API
                </div>
              </div>
            </div>
          ) : (
            <div ref={copilotsVisualRef} className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Interactive Demo */}
              <div className="relative order-2 lg:order-1 lg:pr-8">
                <div className="relative">
                  {/* Main copilot interface - actual screenshot */}
                  <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-xl">
                    {/* Minimal accent */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                    
                    <div className="relative z-10">
                      <img 
                        src={copilotInterfaceScreenshot} 
                        alt="Pullse Copilot Interface showing Creation Assistant creating a Linear issue"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>

                  {/* Performance metrics */}
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {copilotMetrics.map((metric, idx) => {
                      const Icon = metric.icon;
                      return (
                        <div key={idx} className="bg-muted/30 border border-border rounded-xl p-3">
                          <div className="flex items-center gap-1.5 mb-2">
                            <Icon className="w-3 h-3 text-primary" />
                            <span className="text-[10px] text-muted-foreground leading-tight">{metric.label}</span>
                          </div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-xl font-bold">{metric.value}</span>
                            <span className="text-[10px] font-semibold text-green-500">{metric.change}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Minimal badge */}
                <div className="absolute -top-3 -left-3 bg-foreground text-background px-4 py-2 rounded-full text-xs font-medium shadow-lg flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  AI-Powered
                </div>
              </div>

              {/* Right: Description */}
              <div className="space-y-10 order-1 lg:order-2">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10">
                    <User className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-medium text-primary tracking-wide">Agent Augmentation</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                    Supercharge Your Team
                  </h3>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    AI copilots work alongside agents, handling complexity so your team can focus on building relationships and solving unique problems.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    { 
                      icon: MessageSquare, 
                      title: 'Instant Context', 
                      desc: 'Summarize long conversations in seconds, giving agents full context at a glance with sentiment analysis'
                    },
                    { 
                      icon: Sparkles, 
                      title: 'Smart Response Drafts', 
                      desc: 'AI-powered reply suggestions that agents can customize and send, maintaining your brand voice'
                    },
                    { 
                      icon: Zap, 
                      title: 'On-Demand Actions', 
                      desc: 'Execute API calls across your entire stack without leaving the conversation interface'
                    }
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div 
                        key={idx}
                        className="group flex items-start gap-4 p-5 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all duration-300 cursor-pointer"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 pt-0.5">
                          <h4 className="font-semibold text-base mb-1.5">{item.title}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
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
        <div className="mt-24 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-muted/30 border border-border">
            <Code className="w-4 h-4 text-primary" />
            <p className="text-sm text-muted-foreground">
              Unlike <span className="font-semibold text-foreground">UseResponse</span> and others with third-party integrations, 
              <span className="font-semibold text-foreground"> Pullse connects directly to any API</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
