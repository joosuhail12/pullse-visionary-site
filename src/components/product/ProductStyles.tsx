'use client';

export default function ProductStyles() {
  return (
    <style jsx global>{`
      html {
        scroll-behavior: smooth;
      }

      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }

      .animate-float {
        animation: float 3s ease-in-out infinite;
      }

      .direction-rtl {
        direction: rtl;
      }

      .direction-ltr {
        direction: ltr;
      }

      /* Scroll-triggered animation */
      .fade-in-up {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      }

      .fade-in-up.visible {
        opacity: 1;
        transform: translateY(0);
      }
    `}</style>
  );
}
