/**
 * Metadata Utility for Open Graph and Twitter Card Tags
 *
 * Provides a reusable function to generate complete metadata objects
 * for Next.js pages, including Open Graph tags and Twitter Cards.
 *
 * Usage:
 * ```typescript
 * export const metadata = generatePageMetadata({
 *   title: "Page Title",
 *   description: "Page description",
 *   path: "/page-path",
 * });
 * ```
 */

import type { Metadata } from "next";

interface PageMetadataParams {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  keywords?: string;
}

/**
 * Generates complete metadata object with Open Graph and Twitter Card tags
 *
 * @param title - Page title (used for og:title and twitter:title)
 * @param description - Page description (used for og:description and twitter:description)
 * @param path - URL path for canonical URL (e.g., "/pricing")
 * @param image - Custom OG image URL or path (defaults to /og-default.png)
 * @param type - Open Graph type (defaults to "website")
 * @param keywords - SEO keywords (optional)
 * @returns Complete Next.js Metadata object
 */
export function generatePageMetadata({
  title,
  description,
  path = "",
  image = "/og-default.png",
  type = "website",
  keywords,
}: PageMetadataParams): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pullse.ai";
  const url = `${baseUrl}${path}`;
  const imageUrl = image.startsWith("http") ? image : `${baseUrl}${image}`;

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: path,
    },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: "Pullse",
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      site: "@pullseai",
      creator: "@suhail_joo",
    },
  };
}
