// This is a reference for the ultra-modern design changes
// Apply these changes to ProductAISuite.tsx

/*
ULTRA MODERN CARD CONTAINER (line ~505-510):
Replace the card wrapper with sleek dark glassmorphic design
*/

<div className="max-w-[1400px] mx-auto">
  <div className="relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-gradient-to-br from-[#0A0A0A]/95 via-[#111111]/90 to-[#0A0A0A]/95 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_1px_rgba(255,255,255,0.1)_inset]">
    {/* Ultra modern decorative mesh gradient */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(var(--primary-rgb),0.15)_0%,transparent_50%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(139,92,246,0.12)_0%,transparent_50%)]" />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.02)_50%,transparent_100%)]" />

    {/* Noise texture overlay */}
    <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay" />
