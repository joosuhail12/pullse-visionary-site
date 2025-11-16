'use client';

import { useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

interface ImageLightboxProps {
  src: string;
  alt: string;
  caption?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageLightbox({
  src,
  alt,
  caption,
  isOpen,
  onClose,
}: ImageLightboxProps) {
  const [zoom, setZoom] = useState(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 1));
  };

  const resetZoom = () => {
    setZoom(1);
  };

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          resetZoom();
          break;
        case '+':
        case '=':
          handleZoomIn();
          break;
        case '-':
        case '_':
          handleZoomOut();
          break;
        case '0':
          resetZoom();
          break;
      }
    },
    [isOpen, onClose]
  );

  // Handle touch events for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe || isRightSwipe) {
      // Could implement gallery navigation here if needed
    }
  };

  // Setup keyboard listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
          resetZoom();
        }
      }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Close Button */}
      <button
        type="button"
        onClick={() => {
          onClose();
          resetZoom();
        }}
        className="fixed right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-xl transition-all hover:bg-white/20"
        aria-label="Close lightbox"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Zoom Controls */}
      <div className="fixed bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-xl">
        <button
          type="button"
          onClick={handleZoomOut}
          disabled={zoom <= 1}
          className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-all hover:bg-white/20 disabled:opacity-50 disabled:hover:bg-transparent"
          aria-label="Zoom out"
        >
          <ZoomOut className="h-5 w-5" />
        </button>
        <span className="min-w-[4rem] text-center text-sm font-medium text-white">
          {Math.round(zoom * 100)}%
        </span>
        <button
          type="button"
          onClick={handleZoomIn}
          disabled={zoom >= 3}
          className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-all hover:bg-white/20 disabled:opacity-50 disabled:hover:bg-transparent"
          aria-label="Zoom in"
        >
          <ZoomIn className="h-5 w-5" />
        </button>
      </div>

      {/* Image Container */}
      <div
        className="relative max-h-[90vh] max-w-[90vw] overflow-auto"
        style={{
          transform: `scale(${zoom})`,
          transition: 'transform 0.2s ease-out',
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          sizes="90vw"
          className="h-auto w-auto max-w-full"
        />
      </div>

      {/* Caption */}
      {caption && (
        <div className="fixed bottom-20 left-1/2 max-w-2xl -translate-x-1/2 rounded-xl bg-white/10 px-6 py-3 text-center text-sm text-white backdrop-blur-xl">
          {caption}
        </div>
      )}

      {/* Keyboard Shortcuts Hint */}
      <div className="fixed left-4 top-4 hidden rounded-xl bg-white/10 px-4 py-2 text-xs text-white/70 backdrop-blur-xl md:block">
        <p>ESC to close • +/- to zoom • 0 to reset</p>
      </div>
    </div>
  );
}
