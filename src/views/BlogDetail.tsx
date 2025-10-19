import BlogDetailClient from './BlogDetailClient';
import { client } from '@/lib/sanity/client';
import { postsByCategoryQuery } from '@/lib/sanity/queries';
import type { BlogPost, BlogPostCard } from '@/types/blog';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageLiquidBackground from '@/components/PageLiquidBackground';

interface BlogDetailProps {
  post: BlogPost;
}

const BlogDetail = async ({ post }: BlogDetailProps) => {
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

  return (
    <>
      <PageLiquidBackground opacity={0.08} />
      <Navigation />
      <BlogDetailClient post={post} relatedPosts={relatedPosts} />
      <Footer />
    </>
  );
};

export default BlogDetail;
