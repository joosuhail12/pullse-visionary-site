// @ts-nocheck - lite-youtube custom element not typed in React 19
'use client';

import { useEffect, useRef } from "react";

interface VideoEmbedProps {
  videoId: string;
  title: string;
}

const VideoEmbed = ({ videoId, title }: VideoEmbedProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically import lite-youtube-embed
    import("lite-youtube-embed").then(() => {
      // Library loaded
    });

    // Add CSS for lite-youtube
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/lite-youtube-embed@0.2.0/src/lite-yt-embed.css";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

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
