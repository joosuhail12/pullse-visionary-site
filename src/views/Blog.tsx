import BlogClient from "./BlogClient";
import { client } from "@/lib/sanity/client";
import {
  categoriesQuery,
  featuredPostsQuery,
  postsQuery,
} from "@/lib/sanity/queries";
import type { BlogCategory, BlogPostCard } from "@/types/blog";

export const revalidate = 3600;

const Blog = async () => {
  try {
    const [categories, featuredPosts, posts] = await Promise.all([
      client.fetch<BlogCategory[]>(categoriesQuery),
      client.fetch<BlogPostCard[]>(featuredPostsQuery),
      client.fetch<BlogPostCard[]>(postsQuery),
    ]);

    return (
      <BlogClient
        categories={categories}
        featuredPosts={featuredPosts}
        posts={posts}
      />
    );
  } catch (error) {
    console.error("Failed to fetch blog data from Sanity:", error);

    // Return with empty data as fallback
    return (
      <BlogClient
        categories={[]}
        featuredPosts={[]}
        posts={[]}
      />
    );
  }
};

export default Blog;
