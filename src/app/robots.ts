import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pullse.ai';

  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/dashboard/', '/api/', '/_next/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/dashboard/', '/api/', '/_next/'],
      },
      {
        userAgent: 'Twitterbot',
        allow: '/',
      },
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/api/', '/_next/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
