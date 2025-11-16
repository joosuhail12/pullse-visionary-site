/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],

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
};

export default nextConfig;
