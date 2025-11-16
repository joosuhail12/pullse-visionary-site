/**
 * Device and Performance Detection Utilities
 *
 * Helps adapt UI and animations based on device capabilities
 * for optimal performance across all devices.
 */

export interface DeviceCapabilities {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  hasReducedMotion: boolean;
  deviceMemory: number;
  hardwareConcurrency: number;
  connectionType: string;
  targetFPS: number;
  liquidEtherResolution: number;
}

/**
 * Detects if user prefers reduced motion for accessibility
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Detects device type based on screen width
 */
export function getDeviceType(): { isMobile: boolean; isTablet: boolean; isDesktop: boolean } {
  if (typeof window === 'undefined') {
    return { isMobile: false, isTablet: false, isDesktop: true };
  }

  const width = window.innerWidth;

  return {
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
  };
}

/**
 * Gets device memory in GB (if available)
 */
export function getDeviceMemory(): number {
  if (typeof navigator === 'undefined') return 4; // Default to 4GB

  // @ts-ignore - deviceMemory is experimental
  const memory = navigator.deviceMemory;
  return memory || 4;
}

/**
 * Gets hardware concurrency (CPU cores)
 */
export function getHardwareConcurrency(): number {
  if (typeof navigator === 'undefined') return 4; // Default to 4 cores
  return navigator.hardwareConcurrency || 4;
}

/**
 * Gets connection type (if available)
 */
export function getConnectionType(): string {
  if (typeof navigator === 'undefined') return 'unknown';

  // @ts-ignore - connection is experimental
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

  if (!connection) return 'unknown';

  return connection.effectiveType || 'unknown';
}

/**
 * Determines optimal FPS based on device capabilities
 */
export function getOptimalFPS(): number {
  const memory = getDeviceMemory();
  const cores = getHardwareConcurrency();
  const { isMobile } = getDeviceType();
  const connection = getConnectionType();

  // Mobile devices - conservative FPS
  if (isMobile) return 30;

  // Low-end desktop/tablet (< 4GB RAM or < 4 cores)
  if (memory < 4 || cores < 4) return 30;

  // Slow connection - reduce FPS
  if (connection === 'slow-2g' || connection === '2g') return 24;
  if (connection === '3g') return 30;

  // High-end device - full FPS
  return 60;
}

/**
 * Determines optimal LiquidEther resolution based on device
 */
export function getLiquidEtherResolution(): number {
  const { isMobile, isTablet } = getDeviceType();
  const memory = getDeviceMemory();
  const pixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio : 1;

  // Mobile - lowest resolution
  if (isMobile) return 0.25;

  // Tablet with low memory
  if (isTablet && memory < 4) return 0.35;

  // Desktop with high DPR (Retina displays)
  if (pixelRatio > 1.5) return 0.45;

  // Standard desktop
  return 0.55;
}

/**
 * Gets comprehensive device capabilities
 */
export function getDeviceCapabilities(): DeviceCapabilities {
  const deviceType = getDeviceType();

  return {
    ...deviceType,
    hasReducedMotion: prefersReducedMotion(),
    deviceMemory: getDeviceMemory(),
    hardwareConcurrency: getHardwareConcurrency(),
    connectionType: getConnectionType(),
    targetFPS: getOptimalFPS(),
    liquidEtherResolution: getLiquidEtherResolution(),
  };
}

/**
 * React hook for device capabilities (client-side only)
 */
export function useDeviceCapabilities(): DeviceCapabilities | null {
  if (typeof window === 'undefined') return null;

  // This is a simple version - you could enhance with useState and useEffect
  // to listen for changes in screen size, connection, etc.
  return getDeviceCapabilities();
}
