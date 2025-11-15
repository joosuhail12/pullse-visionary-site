import BlogDetailClient from './BlogDetailClient';
import NewsletterCTA from '@/components/NewsletterCTA';
import { client } from '@/lib/sanity/client';
import { postsByCategoryQuery } from '@/lib/sanity/queries';
import type { BlogPost, BlogPostCard } from '@/types/blog';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageLiquidBackground from '@/components/PageLiquidBackground';

interface BlogDetailProps {
  post: BlogPost;
  slug: string;
}

const BlogDetail = async ({ post, slug }: BlogDetailProps) => {
  // Fetch related posts from the same category
  let relatedPosts: BlogPostCard[] = [];

  try {
    relatedPosts = await client.fetch<BlogPostCard[]>(
      postsByCategoryQuery,
      { categoryId: post.category._id }
    );
  } catch (error) {
    console.error('Failed to fetch related posts:', error);
    // Continue with empty related posts
  }

  // Construct the canonical URL from slug
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pullse.ai';
  const canonicalUrl = `${baseUrl}/blog/${slug}`;

  return (
    <>
      <PageLiquidBackground opacity={0.45} />
      <Navigation />
      <BlogDetailClient post={post} relatedPosts={relatedPosts} canonicalUrl={canonicalUrl} />

      {/* Newsletter CTA before Footer */}
      <div className="container mx-auto px-4 py-16">
        <NewsletterCTA variant="standard" source="blog-detail" />
      </div>

      <Footer />
    </>
  );
};

export default BlogDetail;
