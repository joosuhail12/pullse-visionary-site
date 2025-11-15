/**
 * Enhanced Video Embed Component with Milestone Tracking
 *
 * Uses YouTube IFrame API for detailed playback tracking including:
 * - Progress milestones (25%, 50%, 75%, 100%)
 * - Pause/resume events
 * - Complete tracking
 * - Watch time
 *
 * Use this component when you need detailed video analytics.
 * For lighter embeds without detailed tracking, use VideoEmbed component.
 *
 * @example
 * ```tsx
 * <EnhancedVideoEmbed
 *   videoId="dQw4w9WgXcQ"
 *   title="Product Demo Video"
 * />
 * ```
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { trackVideoView, trackVideoStart, trackVideoProgress, trackVideoComplete } from '@/lib/analytics';

interface EnhancedVideoEmbedProps {
  videoId: string;
  title: string;
  className?: string;
}

// YouTube Player API types
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const PROGRESS_MILESTONES = [25, 50, 75, 100] as const;

const EnhancedVideoEmbed = ({ videoId, title, className = '' }: EnhancedVideoEmbedProps) => {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  const trackedMilestones = useRef<Set<number>>(new Set());
  const hasTrackedView = useRef(false);
  const hasTrackedStart = useRef(false);
  const watchStartTime = useRef<number>(0);
  const totalWatchTime = useRef<number>(0);

  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

  useEffect(() => {
    // Track video view on mount
    if (!hasTrackedView.current) {
      trackVideoView({
        video_url: videoUrl,
        video_title: title,
        video_provider: 'youtube',
      });
      hasTrackedView.current = true;
    }

    // Load YouTube IFrame API
    const loadYouTubeAPI = () => {
      if (window.YT && window.YT.Player) {
        initializePlayer();
        return;
      }

      // Load the IFrame Player API code asynchronously
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      // API will call this function when ready
      window.onYouTubeIframeAPIReady = () => {
        initializePlayer();
      };
    };

    const initializePlayer = () => {
      if (!containerRef.current || playerRef.current) return;

      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId,
        playerVars: {
          autoplay: 0,
          rel: 0,
          modestbranding: 1,
          enablejsapi: 1,
        },
        events: {
          onReady: () => setIsReady(true),
          onStateChange: handleStateChange,
        },
      });
    };

    const handleStateChange = (event: any) => {
      const state = event.data;
      const player = playerRef.current;

      if (!player) return;

      // Playing
      if (state === window.YT.PlayerState.PLAYING) {
        if (!hasTrackedStart.current) {
          trackVideoStart({
            video_url: videoUrl,
            video_title: title,
            video_provider: 'youtube',
          });
          hasTrackedStart.current = true;
        }

        watchStartTime.current = Date.now();

        // Start checking progress
        startProgressTracking();
      }

      // Paused or Ended
      if (state === window.YT.PlayerState.PAUSED || state === window.YT.PlayerState.ENDED) {
        if (watchStartTime.current > 0) {
          totalWatchTime.current += Date.now() - watchStartTime.current;
          watchStartTime.current = 0;
        }

        stopProgressTracking();

        // Track completion
        if (state === window.YT.PlayerState.ENDED) {
          const duration = player.getDuration();
          trackVideoComplete({
            video_url: videoUrl,
            video_title: title,
            video_provider: 'youtube',
            video_duration: Math.round(duration),
          });
        }
      }
    };

    let progressInterval: NodeJS.Timeout;

    const startProgressTracking = () => {
      progressInterval = setInterval(() => {
        const player = playerRef.current;
        if (!player || !player.getDuration) return;

        const currentTime = player.getCurrentTime();
        const duration = player.getDuration();
        const progress = (currentTime / duration) * 100;

        PROGRESS_MILESTONES.forEach((milestone) => {
          if (progress >= milestone && !trackedMilestones.current.has(milestone)) {
            trackedMilestones.current.add(milestone);

            trackVideoProgress({
              video_url: videoUrl,
              video_title: title,
              video_provider: 'youtube',
              video_duration: Math.round(duration),
              video_current_time: Math.round(currentTime),
              video_percent: milestone,
            });
          }
        });
      }, 1000); // Check every second
    };

    const stopProgressTracking = () => {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };

    loadYouTubeAPI();

    return () => {
      stopProgressTracking();
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [videoId, title]);

  return (
    <div className={`w-full aspect-video rounded-2xl overflow-hidden shadow-2xl glow-subtle ${className}`}>
      <div
        ref={containerRef}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default EnhancedVideoEmbed;
