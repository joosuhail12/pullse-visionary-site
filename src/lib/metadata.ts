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
  keywords?: string | string[];
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
  const normalizedPath = path?.endsWith("/") && path !== "/" ? path.slice(0, -1) : path;
  const url = `${baseUrl}${normalizedPath || ""}`;
  const imageUrl = image.startsWith("http") ? image : `${baseUrl}${image}`;

  const defaultKeywords = [
    "Pullse",
    "AI customer support platform",
    "AI helpdesk software",
    "customer service automation",
    "omnichannel support",
    "AI chatbot for support",
    "support ticket automation",
  ];

  const pathKeywords: Record<string, string[]> = {
    "/": ["unified inbox", "AI support platform", "customer support AI", "automated support workflows"],
    "/product": ["support automation platform", "AI agent copilot", "AI support suite", "multichannel inbox"],
    "/product/analytics": ["support analytics", "customer support reporting", "AI insights", "support dashboards"],
    "/product/appo": ["knowledge base", "self-serve support", "AI documentation", "faq automation"],
    "/product/ai-suite": ["AI support suite", "autonomous support agents", "AI workflows"],
    "/product/ai-engine": ["AI routing", "LLM support automation", "support AI engine"],
    "/product/inbox-channels": ["omnichannel inbox", "email chat voice sms support", "support channels"],
    "/product/auto-qa": ["support QA", "quality assurance automation", "ticket qa"],
    "/product/workflows-routing": ["support routing", "triage automation", "workflow automation"],
    "/pricing": ["support pricing", "AI support pricing", "usage based pricing", "helpdesk cost"],
    "/contact-sales": ["book demo", "contact sales", "schedule demo", "customer support demo"],
    "/company": ["about pullse", "team", "careers"],
    "/solutions": ["customer support solutions", "industry support automation"],
    "/solutions/b2b-saas": ["b2b saas support", "saas helpdesk automation", "saas customer service"],
    "/solutions/fintech": ["fintech support", "banking customer service", "fintech helpdesk automation"],
    "/solutions/ecommerce": ["ecommerce customer service", "shopify support automation", "ecommerce helpdesk ai"],
    "/apply/startup": ["startup program", "startup credits", "early stage support", "founder perks"],
    "/compare": ["zendesk alternative", "intercom alternative", "helpdesk comparison", "pullse vs"],
    "/blog": ["customer support blog", "ai support guides", "support best practices"],
    "/legal": ["legal", "policies"],
    "/legal/privacy": ["privacy policy", "data protection", "gdpr", "ccpa"],
    "/legal/terms": ["terms of service", "tos"],
    "/legal/data-processing": ["data processing agreement", "dpa", "subprocessors"],
    "/legal/cookies": ["cookie policy", "cookies"],
    "/legal/acceptable-use": ["acceptable use policy", "aup"],
  };

  const suppliedKeywords: string[] =
    typeof keywords === "string"
      ? keywords.split(",").map((k) => k.trim()).filter(Boolean)
      : Array.isArray(keywords)
        ? keywords
        : [];

  const mergedKeywords = Array.from(
    new Set([
      ...defaultKeywords,
      ...(normalizedPath && pathKeywords[normalizedPath] ? pathKeywords[normalizedPath] : []),
      ...suppliedKeywords,
    ])
  );

  return {
    title,
    description,
    keywords: mergedKeywords,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: normalizedPath || "/",
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
