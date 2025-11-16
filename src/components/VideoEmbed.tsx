// @ts-nocheck - lite-youtube custom element not typed in React 19
'use client';

import { useEffect, useRef } from "react";
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

  useEffect(() => {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

    // Track video view on mount
    if (!hasTrackedView.current) {
      trackVideoView({
        video_url: videoUrl,
        video_title: title,
        video_provider: 'youtube',
      });
      hasTrackedView.current = true;
    }

    // Dynamically import lite-youtube-embed
    import("lite-youtube-embed").then(() => {
      // Library loaded
    });

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

    // Add click listener to track play
    const container = containerRef.current;
    if (container) {
      container.addEventListener('click', handleVideoStart, { once: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('click', handleVideoStart);
      }
    };
  }, [videoId, title]);

  return (
    <div ref={containerRef} className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl glow-subtle">
      <lite-youtube
        videoid={videoId}
        playlabel={`Play: ${title}`}
        params="rel=0&modestbranding=1&hd=1&vq=hd1080"
        style={{ width: "100%", height: "100%" }}
      />
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
