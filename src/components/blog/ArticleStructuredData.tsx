import type { BlogPost } from '@/types/blog';
import { urlFor } from '@/lib/sanity/client';

interface ArticleStructuredDataProps {
  post: BlogPost;
  url: string;
}

export default function ArticleStructuredData({ post, url }: ArticleStructuredDataProps) {
  const hasImageAsset = (image: unknown): boolean =>
    Boolean(image && typeof image === 'object' && 'asset' in image);

  const imageUrl = hasImageAsset(post.featuredImage)
    ? urlFor(post.featuredImage!).width(1200).height(630).url()
    : undefined;

  const authorImageUrl = post.author && hasImageAsset(post.author.avatar)
    ? urlFor(post.author.avatar!).width(400).height(400).url()
    : undefined;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: imageUrl ? [imageUrl] : undefined,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: post.author
      ? {
          '@type': 'Person',
          name: post.author.name,
          jobTitle: post.author.jobTitle || undefined,
          description: post.author.bio || undefined,
          image: authorImageUrl || undefined,
        }
      : {
          '@type': 'Organization',
          name: 'Pullse',
        },
    publisher: {
      '@type': 'Organization',
      name: 'Pullse',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.pullse.ai/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    articleSection: post.category.title,
    keywords: post.tags?.join(', ') || undefined,
    wordCount: post.content
      ? post.content.reduce((count, block) => {
          if (block._type === 'block' && 'children' in block) {
            const children = block.children as Array<{ text?: string }>;
            return (
              count +
              children.reduce((sum, child) => {
                return sum + (child.text?.split(/\s+/).length || 0);
              }, 0)
            );
          }
          return count;
        }, 0)
      : undefined,
    timeRequired: post.readTime ? `PT${post.readTime}M` : undefined,
  };

  // Remove undefined values
  const cleanedData = JSON.parse(
    JSON.stringify(structuredData, (key, value) => {
      return value === undefined ? null : value;
    })
  );

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanedData) }}
    />
  );
}
