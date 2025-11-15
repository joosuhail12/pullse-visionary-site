'use client';

import { useEffect, useRef } from 'react';
import 'lite-youtube-embed/src/lite-yt-embed.css';
import { trackVideoView, trackVideoStart } from '@/lib/analytics';

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  params?: string;
}

export default function YouTubeEmbed({ videoId, title, params = '' }: YouTubeEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasTrackedView = useRef(false);
  const hasTrackedStart = useRef(false);

  useEffect(() => {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

    // Track video view on mount
    if (!hasTrackedView.current) {
      trackVideoView({
        video_url: videoUrl,
        video_title: title || videoId,
        video_provider: 'youtube',
      });
      hasTrackedView.current = true;
    }

    // Dynamically import the lite-youtube-embed script
    if (typeof window !== 'undefined' && !customElements.get('lite-youtube')) {
      void import('lite-youtube-embed');
    }

    // Create and append the lite-youtube element
    if (containerRef.current) {
      const liteYoutube = document.createElement('lite-youtube');
      liteYoutube.setAttribute('videoid', videoId);
      if (params) {
        liteYoutube.setAttribute('params', params);
      }
      liteYoutube.style.backgroundImage = `url(https://i.ytimg.com/vi/${videoId}/hqdefault.jpg)`;

      // Track video start when user clicks play
      const handleVideoStart = () => {
        if (!hasTrackedStart.current) {
          trackVideoStart({
            video_url: videoUrl,
            video_title: title || videoId,
            video_provider: 'youtube',
          });
          hasTrackedStart.current = true;
        }
      };

      liteYoutube.addEventListener('click', handleVideoStart, { once: true });
      containerRef.current.appendChild(liteYoutube);
    }
  }, [videoId, title, params]);

  return (
    <div className="my-10 overflow-hidden rounded-2xl border border-white/10 bg-card/40 shadow-2xl shadow-primary/10 backdrop-blur-sm">
      <div ref={containerRef} />

      {title && (
        <div className="border-t border-white/5 bg-slate-800/50 px-4 py-3">
          <p className="text-sm font-medium text-slate-300">{title}</p>
        </div>
      )}

      <style jsx>{`
        :global(lite-youtube) {
          background-color: #000;
          position: relative;
          display: block;
          contain: content;
          background-position: center center;
          background-size: cover;
          cursor: pointer;
          aspect-ratio: 16 / 9;
        }

        :global(lite-youtube::before) {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==);
          background-position: top;
          background-repeat: repeat-x;
          height: 60px;
          padding-bottom: 50px;
          width: 100%;
          transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
        }

        :global(lite-youtube::after) {
          content: '';
          display: block;
          padding-bottom: calc(100% / (16 / 9));
        }

        :global(lite-youtube > iframe) {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          border: 0;
        }

        :global(lite-youtube > .lty-playbtn) {
          width: 68px;
          height: 48px;
          position: absolute;
          cursor: pointer;
          transform: translate3d(-50%, -50%, 0);
          top: 50%;
          left: 50%;
          z-index: 1;
          background-color: transparent;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 48"><path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="red"/><path d="M45 24 27 14v20" fill="white"/></svg>');
          filter: grayscale(100%);
          transition: filter 0.1s cubic-bezier(0, 0, 0.2, 1);
          border: none;
        }

        :global(lite-youtube:hover > .lty-playbtn),
        :global(lite-youtube .lty-playbtn:focus) {
          filter: grayscale(0%);
        }

        :global(lite-youtube.lyt-activated) {
          cursor: unset;
        }

        :global(lite-youtube.lyt-activated::before),
        :global(lite-youtube.lyt-activated > .lty-playbtn) {
          opacity: 0;
          pointer-events: none;
        }

        :global(.lyt-visually-hidden) {
          clip: rect(0 0 0 0);
          clip-path: inset(50%);
          height: 1px;
          overflow: hidden;
          position: absolute;
          white-space: nowrap;
          width: 1px;
        }
      `}</style>
    </div>
  );
}
