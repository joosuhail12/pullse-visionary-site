/**
 * Blog Listing Schema - JSON-LD Structured Data
 *
 * Provides structured data for the blog listing page.
 * Includes:
 * - CollectionPage for the blog archive
 * - ItemList with all blog posts
 * - BreadcrumbList for navigation
 *
 * Benefits:
 * - Better search result snippets
 * - Blog post carousels in search
 * - Enhanced navigation breadcrumbs
 * - Improved indexing of blog content
 *
 * @see https://schema.org/CollectionPage
 * @see https://schema.org/ItemList
 * @see https://schema.org/BreadcrumbList
 */

import type { WithContext, CollectionPage, ItemList, BreadcrumbList } from 'schema-dts';
import type { BlogPostCard } from '@/types/blog';
import { urlFor } from '@/lib/sanity/client';

interface BlogListingSchemaProps {
  posts: BlogPostCard[];
}

const hasImageAsset = (image: unknown): boolean =>
  Boolean(image && typeof image === 'object' && 'asset' in image);

export const BlogListingSchema = ({ posts }: BlogListingSchemaProps) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pullse.ai';
  const blogUrl = `${siteUrl}/blog`;

  // CollectionPage Schema
  const collectionPageSchema: WithContext<CollectionPage> = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Blog | Pullse - AI Support Insights & Customer Stories',
    description: 'Explore AI-powered support insights, product updates, and customer success stories. Learn how leading teams are transforming customer experience with Pullse.',
    url: blogUrl,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: siteUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: blogUrl,
        },
      ],
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.slice(0, 20).map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${siteUrl}/blog/${post.slug}`,
        name: post.title,
        description: post.excerpt,
        image: hasImageAsset(post.featuredImage)
          ? urlFor(post.featuredImage!).width(1200).height(630).url()
          : undefined,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
    />
  );
};

export default BlogListingSchema;
