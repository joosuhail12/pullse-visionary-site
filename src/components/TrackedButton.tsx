/**
 * TrackedButton Component
 *
 * A button wrapper that automatically tracks clicks to Google Analytics.
 * Wraps any button element and adds tracking without modifying existing functionality.
 *
 * Usage:
 * ```typescript
 * <TrackedButton
 *   buttonText="Sign Up"
 *   buttonLocation="header"
 *   buttonDestination="/signup"
 *   className="btn-primary"
 *   onClick={handleClick}
 * >
 *   Sign Up
 * </TrackedButton>
 * ```
 */

'use client';

import React, { type ButtonHTMLAttributes } from 'react';
import { trackButtonClick, type ButtonEventParams } from '@/lib/analytics';

export interface TrackedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button text/label for analytics
   */
  buttonText: string;

  /**
   * Location/context of button on page
   * Examples: 'header', 'hero', 'pricing', 'footer'
   */
  buttonLocation: string;

  /**
   * Destination URL or action (optional)
   */
  buttonDestination?: string;

  /**
   * Button type/variant for analytics
   */
  buttonType?: 'primary' | 'secondary' | 'tertiary';

  /**
   * Additional tracking parameters
   */
  trackingParams?: Record<string, any>;

  /**
   * Children (button content)
   */
  children: React.ReactNode;
}

/**
 * Button with automatic click tracking
 */
export const TrackedButton: React.FC<TrackedButtonProps> = ({
  buttonText,
  buttonLocation,
  buttonDestination,
  buttonType = 'primary',
  trackingParams = {},
  onClick,
  children,
  ...buttonProps
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Track button click
    const eventParams: ButtonEventParams = {
      button_text: buttonText,
      button_location: buttonLocation,
      button_destination: buttonDestination,
      button_type: buttonType,
      page_path: typeof window !== 'undefined' ? window.location.pathname : '',
      ...trackingParams,
    };

    trackButtonClick(eventParams);

    // Call original onClick if provided
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button {...buttonProps} onClick={handleClick}>
      {children}
    </button>
  );
};

export default TrackedButton;
