'use client';

import { useState } from 'react';
import { Twitter, Linkedin, Link2, Check } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url: string;
  className?: string;
}

export default function ShareButtons({ title, url, className = '' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      title
    )}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`;
    window.open(linkedInUrl, '_blank', 'noopener,noreferrer');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <button
        type="button"
        onClick={shareOnTwitter}
        aria-label="Share on Twitter"
        className="group flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-card/60 text-muted-foreground shadow-lg backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-[#1DA1F2]/40 hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2] hover:shadow-xl hover:shadow-[#1DA1F2]/20"
      >
        <Twitter className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={shareOnLinkedIn}
        aria-label="Share on LinkedIn"
        className="group flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-card/60 text-muted-foreground shadow-lg backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/10 hover:text-[#0A66C2] hover:shadow-xl hover:shadow-[#0A66C2]/20"
      >
        <Linkedin className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={copyLink}
        aria-label={copied ? 'Link copied' : 'Copy link'}
        className={`group flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-card/60 shadow-lg backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-xl ${
          copied
            ? 'border-green-500/40 bg-green-500/10 text-green-500 shadow-green-500/20'
            : 'text-muted-foreground hover:border-primary/40 hover:bg-primary/10 hover:text-primary hover:shadow-primary/20'
        }`}
      >
        {copied ? (
          <Check className="h-5 w-5" />
        ) : (
          <Link2 className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}
