'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Maximize2 } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

interface BlogImageProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
}

export default function BlogImage({
  src,
  alt,
  caption,
  width = 1200,
  height = 800,
  blurDataURL,
}: BlogImageProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <>
      <figure className="my-10">
        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card/40 shadow-2xl shadow-primary/10 backdrop-blur-sm transition-all hover:shadow-2xl hover:shadow-primary/20">
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            className="relative block h-[400px] w-full cursor-zoom-in md:h-[600px]"
            aria-label="Click to enlarge image"
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(min-width: 768px) 800px, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              placeholder={blurDataURL ? 'blur' : 'empty'}
              blurDataURL={blurDataURL}
              loading="lazy"
            />

            {/* Zoom indicator overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100">
              <div className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-900 shadow-lg backdrop-blur-sm">
                <Maximize2 className="h-4 w-4" />
                Click to enlarge
              </div>
            </div>
          </button>
        </div>
        {caption && (
          <figcaption className="mt-4 text-center text-sm italic text-muted-foreground">
            {caption}
          </figcaption>
        )}
      </figure>

      <ImageLightbox
        src={src}
        alt={alt}
        caption={caption}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
      />
    </>
  );
}
