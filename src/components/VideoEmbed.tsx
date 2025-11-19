// @ts-nocheck - lite-youtube custom element not typed in React 19
'use client';

import { useEffect, useRef, useState } from "react";
import { trackVideoView, trackVideoStart } from "@/lib/analytics";
import "lite-youtube-embed/src/lite-yt-embed.css";

interface VideoEmbedProps {
  videoId: string;
  title: string;
}

const VideoEmbed = ({ videoId, title }: VideoEmbedProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasTrackedView = useRef(false);
  const hasTrackedStart = useRef(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const container = containerRef.current;

    if (!container) return;

    // Lazy load video using Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);

            // Track video view when it becomes visible
            if (!hasTrackedView.current) {
              trackVideoView({
                video_url: videoUrl,
                video_title: title,
                video_provider: 'youtube',
              });
              hasTrackedView.current = true;
            }

            // Dynamically import lite-youtube-embed only when visible
            import("lite-youtube-embed").then(() => {
              // Library loaded
            });

            // Stop observing after first visibility
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Load 50px before entering viewport
      }
    );

    observer.observe(container);

    // Track video start when user clicks play
    const handleVideoStart = () => {
      if (!hasTrackedStart.current) {
        trackVideoStart({
          video_url: videoUrl,
          video_title: title,
          video_provider: 'youtube',
        });
        hasTrackedStart.current = true;
      }
    };

    container.addEventListener('click', handleVideoStart, { once: true });

    return () => {
      observer.disconnect();
      container.removeEventListener('click', handleVideoStart);
    };
  }, [videoId, title, isVisible]);

  return (
    <div ref={containerRef} className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl glow-subtle">
      {isVisible ? (
        <lite-youtube
          videoid={videoId}
          playlabel={`Play: ${title}`}
          params="rel=0&modestbranding=1&hd=1&vq=hd1080"
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="text-sm text-muted-foreground">Loading video...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoEmbed;

// Declare custom element for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "lite-youtube": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          videoid: string;
          playlabel?: string;
          params?: string;
        },
        HTMLElement
      >;
    }
  }
}
