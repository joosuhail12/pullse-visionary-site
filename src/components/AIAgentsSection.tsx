import { useState, useEffect, useRef } from 'react';
import { Bot, User, Zap, Database, Code, CheckCircle, MessageSquare, Sparkles, ArrowRight, TrendingUp, Clock, Activity, RefreshCw, Shield, Boxes } from 'lucide-react';
import gsap from 'gsap';
import aiCopilotScreenshot from '@/assets/ai-copilot-screenshot.png';

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
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1),transparent_60%)]" />
                  
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
            <div ref={copilotsVisualRef} className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Interactive Demo */}
              <div className="relative order-2 lg:order-1">
                {/* Glow effects */}
                <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 to-purple-500/20 rounded-3xl blur-3xl opacity-50 animate-pulse" />
                
                <div className="relative">
                  {/* Main copilot interface - inspired by screenshot */}
                  <div className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-2xl overflow-hidden">
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-purple-500/5" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,hsl(var(--accent)/0.1),transparent_60%)]" />
                    
                    <div className="relative z-10">
                      {/* Agent header */}
                      <div className="flex items-center justify-between mb-8 pb-6 border-b border-border/50">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center shadow-lg">
                              <User className="w-6 h-6 text-white" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card animate-pulse" />
                          </div>
                          <div>
                            <h4 className="font-bold text-lg">Sarah Martinez</h4>
                            <p className="text-sm text-muted-foreground">Support Agent • Active</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                          <Activity className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-semibold text-green-500">AI Active</span>
                        </div>
                      </div>

                      {/* Copilot actions - using actual screenshot as inspiration */}
                      <div className="space-y-4 mb-8">
                        {[
                          { 
                            icon: MessageSquare, 
                            title: 'Summary Generated', 
                            desc: 'Customer requesting refund for order #1234 due to delayed shipping. Previous positive history.',
                            gradient: 'from-blue-500 to-cyan-500',
                            action: 'View Full Context'
                          },
                          { 
                            icon: Sparkles, 
                            title: 'Response Draft Ready', 
                            desc: 'Apology drafted with refund offer + 15% discount code for future purchase.',
                            gradient: 'from-purple-500 to-pink-500',
                            action: 'Edit & Send'
                          },
                          { 
                            icon: Zap, 
                            title: 'Quick Actions Available', 
                            desc: 'Process refund • Apply discount • Update shipping status',
                            gradient: 'from-orange-500 to-red-500',
                            action: 'Execute'
                          }
                        ].map((item, idx) => {
                          const Icon = item.icon;
                          return (
                            <div
                              key={idx}
                              className="group relative overflow-hidden rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:border-accent/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                              
                              <div className="relative p-5">
                                <div className="flex items-start gap-4 mb-3">
                                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                    <Icon className="w-5 h-5 text-white" />
                                  </div>
                                  <div className="flex-1">
                                    <h5 className="font-semibold mb-2 text-base group-hover:text-accent transition-colors">{item.title}</h5>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                                  </div>
                                </div>
                                
                                <button className="w-full mt-3 px-4 py-2 rounded-lg bg-muted/50 hover:bg-accent/20 border border-border hover:border-accent/50 text-sm font-medium transition-all flex items-center justify-center gap-2 group-hover:translate-x-1">
                                  {item.action}
                                  <ArrowRight className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* AI Insight */}
                      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-accent/10 to-purple-500/10 border border-accent/20 p-5">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,hsl(var(--accent)/0.2),transparent_50%)]" />
                        <div className="relative flex items-start gap-3">
                          <Sparkles className="w-5 h-5 text-accent mt-0.5 flex-shrink-0 animate-pulse" />
                          <div>
                            <p className="text-xs font-bold tracking-wider text-accent mb-2">AI INSIGHT</p>
                            <p className="text-sm leading-relaxed mb-3">Customer shows frustration keywords. Recommend offering expedited shipping replacement + loyalty points to prevent churn.</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              <span>Confidence: 94% • Based on 1,247 similar cases</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Performance metrics overlay */}
                  <div className="absolute -bottom-8 -right-8 grid grid-cols-3 gap-3">
                    {copilotMetrics.map((metric, idx) => {
                      const Icon = metric.icon;
                      return (
                        <div key={idx} className="bg-card/90 backdrop-blur-xl border border-border rounded-xl p-4 shadow-xl min-w-[120px]">
                          <div className="flex items-center gap-2 mb-2">
                            <Icon className="w-4 h-4 text-accent" />
                            <span className="text-xs text-muted-foreground">{metric.label}</span>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold">{metric.value}</span>
                            <span className="text-xs font-semibold text-green-500">{metric.change}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -top-6 -left-6 bg-gradient-to-r from-accent to-purple-500 text-white px-6 py-3 rounded-full font-bold shadow-2xl animate-float flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  AI-Powered
                </div>
              </div>

              {/* Right: Description */}
              <div className="space-y-8 order-1 lg:order-2">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
                    <User className="w-4 h-4 text-accent" />
                    <span className="text-sm font-semibold text-accent">Agent Augmentation</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    Supercharge Your Team
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    AI copilots work alongside agents, handling complexity so your team can focus on building relationships and solving unique problems.
                  </p>
                </div>

                <div className="grid gap-6">
                  {[
                    { 
                      icon: MessageSquare, 
                      title: 'Instant Context', 
                      desc: 'Summarize long conversations in seconds, giving agents full context at a glance with sentiment analysis',
                      gradient: 'from-blue-500 to-cyan-500'
                    },
                    { 
                      icon: Sparkles, 
                      title: 'Smart Response Drafts', 
                      desc: 'AI-powered reply suggestions that agents can customize and send, maintaining your brand voice',
                      gradient: 'from-purple-500 to-pink-500'
                    },
                    { 
                      icon: Zap, 
                      title: 'On-Demand Actions', 
                      desc: 'Execute API calls across your entire stack without leaving the conversation interface',
                      gradient: 'from-orange-500 to-red-500'
                    }
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div 
                        key={idx}
                        className="group p-6 rounded-xl bg-card border border-border hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 cursor-pointer"
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.gradient} p-0.5 group-hover:scale-110 transition-transform`}>
                            <div className="w-full h-full bg-card rounded-lg flex items-center justify-center">
                              <Icon className="w-6 h-6 text-accent" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg mb-2 group-hover:text-accent transition-colors">{item.title}</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                          </div>
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
              While competitors like <span className="font-bold text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">UseResponse</span> rely on third-party integrations,
              <span className="font-bold text-foreground"> Pullse connects directly to any API</span> for true flexibility
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
