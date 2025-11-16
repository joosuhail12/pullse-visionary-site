'use client';

export default function ProductInboxChannelsStyles() {
  return (
    <style jsx global>{`
      html {
        scroll-behavior: smooth;
      }

      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }

      @keyframes gradient {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }

      @keyframes shimmer {
        0% { background-position: -1000px 0; }
        100% { background-position: 1000px 0; }
      }

      @keyframes pulse-glow {
        0%, 100% {
          opacity: 1;
          box-shadow: 0 0 20px rgba(var(--primary-rgb), 0.3);
        }
        50% {
          opacity: 0.8;
          box-shadow: 0 0 30px rgba(var(--primary-rgb), 0.5);
        }
      }

      .animate-float {
        animation: float 3s ease-in-out infinite;
      }

      .animate-gradient {
        background-size: 200% 200%;
        animation: gradient 3s ease infinite;
      }

      .animate-shimmer {
        background: linear-gradient(
          90deg,
          transparent 0%,
          rgba(255, 255, 255, 0.1) 50%,
          transparent 100%
        );
        background-size: 1000px 100%;
        animation: shimmer 2s infinite;
      }

      .direction-rtl {
        direction: rtl;
      }

      .direction-ltr {
        direction: ltr;
      }

      .fade-in-up {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      }

      .fade-in-up.visible {
        opacity: 1;
        transform: translateY(0);
      }

      /* Glassmorphism effect */
      .glass-card {
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      /* Smooth transitions for all interactive elements */
      button, a {
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      }

      /* Custom scrollbar */
      ::-webkit-scrollbar {
        width: 10px;
      }

      ::-webkit-scrollbar-track {
        background: hsl(var(--background));
      }

      ::-webkit-scrollbar-thumb {
        background: hsl(var(--primary) / 0.3);
        border-radius: 5px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: hsl(var(--primary) / 0.5);
      }
    `}</style>
  );
}
