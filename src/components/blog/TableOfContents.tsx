'use client';

import { useEffect, useState } from 'react';
import { List, Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  className?: string;
  showMobileButton?: boolean;
}

export default function TableOfContents({
  className = '',
  showMobileButton = false,
}: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Extract headings from the DOM
    const elements = Array.from(
      document.querySelectorAll('article h2, article h3')
    );

    const headingData: Heading[] = elements
      .map((element) => ({
        id: element.id,
        text: element.textContent || '',
        level: Number(element.tagName.charAt(1)),
      }))
      .filter((heading) => heading.id);

    setHeadings(headingData);

    // Set up Intersection Observer for scroll spy
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -66%',
        threshold: 1.0,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => observer.unobserve(element));
    };
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for fixed header
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      setIsOpen(false); // Close mobile drawer after navigation
    }
  };

  if (headings.length === 0) {
    return null;
  }

  const tocContent = (
    <>
      <div className="mb-4 flex items-center gap-2">
        <List className="h-5 w-5 text-primary" />
        <h3 className="font-bold text-foreground">Table of Contents</h3>
      </div>

      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id} style={{ paddingLeft: (heading.level - 2) * 16 }}>
            <button
              type="button"
              onClick={() => handleClick(heading.id)}
              className={`group w-full text-left text-sm transition-all ${
                activeId === heading.id
                  ? 'font-bold text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span
                className={`inline-block border-l-2 pl-3 py-1 transition-all ${
                  activeId === heading.id
                    ? 'border-primary'
                    : 'border-transparent group-hover:border-muted-foreground/40'
                }`}
              >
                {heading.text}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <>
      {/* Desktop TOC */}
      <nav
        className={`sticky top-24 hidden max-h-[calc(100vh-200px)] overflow-y-auto lg:block ${className}`}
      >
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-card/60 p-6 shadow-xl shadow-primary/10 backdrop-blur-xl">
          {tocContent}
        </div>
      </nav>

      {/* Mobile TOC Button & Drawer */}
      {showMobileButton && (
        <div className="fixed bottom-20 right-4 z-40 lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-primary text-white shadow-2xl shadow-primary/30 backdrop-blur-xl transition-all hover:scale-110 hover:shadow-primary/50"
                aria-label="Open table of contents"
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="sr-only">Table of Contents</SheetTitle>
                <SheetDescription className="sr-only">
                  Navigate through article sections
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6">{tocContent}</div>
            </SheetContent>
          </Sheet>
        </div>
      )}
    </>
  );
}
