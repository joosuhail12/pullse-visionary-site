import bundleAnalyzer from '@next/bundle-analyzer';
import fs from 'fs';
import path from 'path';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  webpack: (config, { isServer }) => {
    // Optional: write full webpack stats for bundle deep-dive
    if (process.env.ANALYZE_STATS === 'true') {
      config.plugins.push({
        apply(compiler) {
          compiler.hooks.done.tap('StatsToJsonPlugin', (stats) => {
            const outputDir = path.join(process.cwd(), '.next', 'analyze');
            fs.mkdirSync(outputDir, { recursive: true });
            const filename = isServer ? 'stats-server.json' : 'stats-client.json';
            const payload = stats.toJson({
              all: false,
              assets: true,
              chunks: true,
              modules: true,
              chunkModules: true,
              entrypoints: true,
              nestedModules: true,
              source: false,
            });
            fs.writeFileSync(path.join(outputDir, filename), JSON.stringify(payload, null, 2));
          });
        },
      });
    }
    return config;
  },

  // Optimize package imports to reduce bundle size (works with Turbopack)
  experimental: {
    optimizePackageImports: ['three', '@react-three/fiber', '@react-three/drei', 'gsap', 'framer-motion'],
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
    ],
  },

  // External packages for Sanity Studio
  serverExternalPackages: ['styled-components', '@sanity/client'],

  // Turbopack configuration (Next.js 16 default)
  // Turbopack automatically handles code splitting and tree shaking
  // Performance budgets are managed via Lighthouse CI and monitoring
  turbopack: {
    // Enable tree shaking and automatic code splitting (default behavior)
  },

  // Configure caching headers for optimal performance
  async headers() {
    return [
      // Legal pages - long cache (1 week)
      {
        source: '/legal/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, s-maxage=604800, stale-while-revalidate=86400',
          },
        ],
      },
      // Product pages - daily cache
      {
        source: '/product/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600',
          },
        ],
      },
      // Solution pages - daily cache
      {
        source: '/solutions/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600',
          },
        ],
      },
      // Blog pages - hourly cache
      {
        source: '/blog/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=1800',
          },
        ],
      },
      // Security headers for all pages
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://*.posthog.com https://cal.com https://cdn.jsdelivr.net",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://cdn.sanity.io https://*.youtube.com https://*.ytimg.com",
              "font-src 'self' data:",
              "connect-src 'self' https://*.supabase.co https://*.posthog.com https://www.googletagmanager.com https://*.google-analytics.com https://cal.com https://chimera.getpullse.com",
              "frame-src 'self' https://www.youtube.com https://cal.com",
              "media-src 'self' https://cdn.sanity.io",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              "upgrade-insecure-requests",
            ].join('; '),
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
