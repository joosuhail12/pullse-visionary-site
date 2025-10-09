# Ultra-Modern Button Template

For buttons 1-5 (After-Hours, FAQ Deflection, Go Live Faster, On-Demand Execution, Faster Ramp Time), apply this template:

## Chatbot buttons (1-2) use primary colors
## Copilot buttons (3-5) use purple/indigo colors

```tsx
<button
  onClick={() => setSelectedStat(N)}
  className={`group relative w-full text-left p-6 rounded-[20px] transition-all duration-700 ease-out overflow-hidden ${
    selectedStat === N
      ? 'bg-white/[0.08] border border-white/[0.12] shadow-[0_0_24px_rgba(COLOR,0.15),0_8px_32px_rgba(0,0,0,0.3)] translate-x-1'
      : 'bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] hover:bg-white/[0.04] hover:translate-x-0.5'
  }`}
>
  <div className={`absolute inset-0 rounded-[20px] bg-gradient-to-br from-COLOR/10 via-COLOR2/5 to-transparent transition-opacity duration-700 ${selectedStat === N ? 'opacity-100' : 'opacity-0'}`} />
  <div className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-transparent via-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

  <div className="relative flex items-center gap-4 mb-2.5">
    <div className={`flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-COLOR/90 to-COLOR2/90 shadow-[0_2px_12px_rgba(COLOR_RGB,0.25)] transition-all duration-500 ${
      selectedStat === N ? 'scale-100' : 'scale-95 opacity-60 group-hover:scale-100 group-hover:opacity-80'
    }`}>
      <ICON className="h-5 w-5 text-white" />
    </div>
    <div className="flex-1">
      <div className={`font-bold text-[15px] tracking-tight transition-colors duration-500 ${selectedStat === N ? 'text-white' : 'text-white/60 group-hover:text-white/80'}`}>TITLE</div>
    </div>
    {selectedStat === N && (
      <div className="w-1.5 h-1.5 rounded-full bg-COLOR shadow-[0_0_8px_rgba(COLOR_RGB,0.8)] animate-pulse" />
    )}
  </div>
  <div className={`text-[12px] leading-relaxed ml-[60px] transition-colors duration-500 ${selectedStat === N ? 'text-white/40' : 'text-white/30'}`}>DESCRIPTION</div>
</button>
```

## Button Details:
1. After-Hours (Clock) - primary/purple-600 - "24/7 coverage"
2. FAQ Deflection (LifeBuoy) - primary/purple-600 - "Instant answers"
3. Go Live Faster (Zap) - purple-600/indigo-600 - "AI-guided setup"
4. On-Demand Execution (Database) - purple-600/indigo-600 - "Cross-system actions"
5. Faster Ramp Time (Users) - purple-600/indigo-600 - "Agent onboarding"
