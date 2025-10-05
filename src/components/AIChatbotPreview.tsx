import { Bot, User, CheckCircle, Clock } from "lucide-react";

const AIChatbotPreview = () => {
  const conversations = [
    {
      id: 1,
      userMessage: "I need help with my order status",
      botResponse: "I can help you with that! I've checked your order #4521 and it's currently out for delivery.",
      intent: "Order Status",
      status: "resolved",
      timestamp: "2m ago"
    },
    {
      id: 2,
      userMessage: "How do I reset my password?",
      botResponse: "I've sent a password reset link to your email. Please check your inbox.",
      intent: "Account Access",
      status: "resolved",
      timestamp: "5m ago"
    },
    {
      id: 3,
      userMessage: "What are your business hours?",
      botResponse: "We're available 24/7! Our AI assistant is always here to help, and human agents are online 9 AM - 6 PM EST.",
      intent: "General Query",
      status: "resolved",
      timestamp: "8m ago"
    }
  ];

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-background to-muted/30 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-primary/5 border-b border-primary/10 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
        <span className="text-xs font-medium text-muted-foreground">AI Agent Active</span>
        <div className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
          <CheckCircle className="w-3 h-3 text-accent-green" />
          <span className="font-semibold">98% deflection rate</span>
        </div>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {conversations.map((conv) => (
          <div key={conv.id} className="space-y-2 animate-in fade-in duration-300">
            {/* User Message */}
            <div className="flex items-start gap-2 justify-end">
              <div className="bg-gradient-to-br from-muted to-muted/50 rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]">
                <p className="text-xs text-foreground">{conv.userMessage}</p>
              </div>
              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-1">
                <User className="w-3 h-3 text-muted-foreground" />
              </div>
            </div>

            {/* Bot Response */}
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-3 h-3 text-primary-foreground" />
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl rounded-tl-sm px-4 py-2 border border-primary/10">
                  <p className="text-xs text-foreground">{conv.botResponse}</p>
                </div>
                
                {/* Intent Tag & Status */}
                <div className="flex items-center gap-2 px-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-[10px] font-medium text-primary">
                    {conv.intent}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <CheckCircle className="w-3 h-3 text-accent-green" />
                    <span>Auto-resolved</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground ml-auto flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {conv.timestamp}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Footer */}
      <div className="px-4 py-2 bg-primary/5 border-t border-primary/10 grid grid-cols-3 gap-2 text-center">
        <div>
          <div className="text-xs font-bold text-primary">1,247</div>
          <div className="text-[10px] text-muted-foreground">Conversations</div>
        </div>
        <div>
          <div className="text-xs font-bold text-accent-green">18s</div>
          <div className="text-[10px] text-muted-foreground">Avg Response</div>
        </div>
        <div>
          <div className="text-xs font-bold text-accent-teal">24/7</div>
          <div className="text-[10px] text-muted-foreground">Availability</div>
        </div>
      </div>
    </div>
  );
};

export default AIChatbotPreview;
