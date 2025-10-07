'use client';

import { useCallback, useEffect, useRef, useState } from "react";

type UseInViewOptions = {
  root?: Element | Document | null;
  margin?: string;
  threshold?: number | number[];
  once?: boolean;
};

export const useInView = <TElement extends HTMLElement = HTMLElement>({
  root = null,
  margin = "0px 0px 0px 0px",
  threshold = 0,
  once = true,
}: UseInViewOptions = {}) => {
  const elementRef = useRef<TElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [inView, setInView] = useState(false);

  const cleanupObserver = useCallback(() => {
    observerRef.current?.disconnect();
    observerRef.current = null;
  }, []);

  useEffect(() => {
    if (!elementRef.current || (once && inView)) {
      return;
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) {
            cleanupObserver();
          }
        } else if (!once) {
          setInView(false);
        }
      },
      {
        root: root instanceof Element ? root : null,
        rootMargin: margin,
        threshold,
      },
    );

    observerRef.current.observe(elementRef.current);

    return cleanupObserver;
  }, [cleanupObserver, inView, margin, once, root, threshold]);

  return { ref: elementRef, inView };
};
