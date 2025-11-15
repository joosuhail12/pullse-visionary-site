/**
 * TrackedLink Component
 *
 * A link wrapper that automatically tracks clicks to Google Analytics.
 * Works with both Next.js Link and regular anchor tags.
 * Automatically detects external links and tracks them as outbound links.
 *
 * Usage:
 * ```typescript
 * // Internal link
 * <TrackedLink href="/pricing" linkText="Pricing" linkLocation="header">
 *   Pricing
 * </TrackedLink>
 *
 * // External link
 * <TrackedLink href="https://example.com" linkText="External" linkLocation="footer">
 *   External Link
 * </TrackedLink>
 * ```
 */

'use client';

import React, { type AnchorHTMLAttributes } from 'react';
import Link from 'next/link';
import { trackNavigationClick, trackExternalLink } from '@/lib/analytics';

export interface TrackedLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  /**
   * Link destination
   */
  href: string;

  /**
   * Link text/label for analytics
   */
  linkText: string;

  /**
   * Location/context of link on page
   * Examples: 'header', 'nav', 'footer', 'body'
   */
  linkLocation: string;

  /**
   * Force use of regular <a> tag instead of Next.js Link
   * Default: false (uses Next.js Link for internal links)
   */
  forceAnchor?: boolean;

  /**
   * Additional tracking parameters
   */
  trackingParams?: Record<string, any>;

  /**
   * Children (link content)
   */
  children: React.ReactNode;
}

/**
 * Check if URL is external
 */
const isExternalURL = (url: string): boolean => {
  try {
    // Relative URLs are internal
    if (url.startsWith('/') || url.startsWith('#')) {
      return false;
    }

    // Parse as URL
    const urlObj = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');

    // Check if domain matches current domain
    if (typeof window !== 'undefined') {
      return urlObj.hostname !== window.location.hostname;
    }

    // During SSR, assume external if it has a protocol
    return url.startsWith('http://') || url.startsWith('https://');
  } catch {
    // If URL parsing fails, assume internal
    return false;
  }
};

/**
 * Extract domain from URL
 */
const extractDomain = (url: string): string => {
  try {
    const urlObj = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
    return urlObj.hostname;
  } catch {
    return 'unknown';
  }
};

/**
 * Link with automatic click tracking
 */
export const TrackedLink: React.FC<TrackedLinkProps> = ({
  href,
  linkText,
  linkLocation,
  forceAnchor = false,
  trackingParams = {},
  onClick,
  children,
  ...anchorProps
}) => {
  const isExternal = isExternalURL(href);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Track link click
    if (isExternal) {
      // External link tracking
      trackExternalLink({
        link_url: href,
        link_domain: extractDomain(href),
        button_location: linkLocation,
        ...trackingParams,
      } as any);
    } else {
      // Internal navigation tracking
      trackNavigationClick({
        button_text: linkText,
        button_destination: href,
        button_location: linkLocation,
        ...trackingParams,
      } as any);
    }

    // Call original onClick if provided
    if (onClick) {
      onClick(event);
    }
  };

  // For external links or when forceAnchor is true, use regular <a> tag
  if (isExternal || forceAnchor) {
    return (
      <a
        {...anchorProps}
        href={href}
        onClick={handleClick}
        // Add rel="noopener noreferrer" for external links for security
        rel={isExternal ? 'noopener noreferrer' : anchorProps.rel}
        // Open external links in new tab by default (can be overridden)
        target={isExternal ? '_blank' : anchorProps.target}
      >
        {children}
      </a>
    );
  }

  // For internal links, use Next.js Link
  return (
    <Link {...anchorProps} href={href} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default TrackedLink;
