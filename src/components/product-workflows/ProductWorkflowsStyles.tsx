'use client';

export default function ProductWorkflowsStyles() {
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

      .animate-float {
        animation: float 3s ease-in-out infinite;
      }

      .animate-gradient {
        background-size: 200% 200%;
        animation: gradient 3s ease infinite;
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
    `}</style>
  );
}
