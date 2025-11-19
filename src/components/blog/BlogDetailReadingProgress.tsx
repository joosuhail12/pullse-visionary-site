'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BlogDetailReadingProgress() {
  const [readingProgress, setReadingProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Reading progress calculation with debounced scroll
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      // Clear the previous timeout
      clearTimeout(timeoutId);

      // Set a new timeout to debounce the scroll event
      timeoutId = setTimeout(() => {
        const article = document.querySelector('article');
        if (!article) return;

        const windowHeight = window.innerHeight;
        const documentHeight = article.clientHeight;
        const scrollTop = window.scrollY;
        const articleTop = article.offsetTop;

        // Show progress bar after scrolling past hero
        setShowProgress(scrollTop > windowHeight * 0.5);

        // Show back to top button after scrolling down 400px
        setShowBackToTop(scrollTop > 400);

        // Calculate reading progress
        const scrollDistance = scrollTop - articleTop + windowHeight;
        const totalDistance = documentHeight;
        const progress = Math.min(
          Math.max((scrollDistance / totalDistance) * 100, 0),
          100
        );

        setReadingProgress(progress);
      }, 10); // 10ms debounce for smooth updates
    };

    // Initial calculation
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* Reading Progress Bar */}
      <div
        className={`fixed left-0 right-0 top-0 z-50 h-1 bg-primary transition-all duration-300 ${
          showProgress ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ width: `${readingProgress}%` }}
      />

      {/* Back to Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        className={`fixed bottom-24 left-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-card/80 text-foreground shadow-2xl shadow-primary/10 backdrop-blur-xl transition-all hover:bg-card hover:shadow-primary/30 hover:scale-110 lg:bottom-8 ${
          showBackToTop
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-4 opacity-0'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </>
  );
}
