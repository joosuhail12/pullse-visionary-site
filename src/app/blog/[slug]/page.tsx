import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogDetail from "@/views/BlogDetail";
import { client } from "@/lib/sanity/client";
import { postBySlugQuery, postsQuery } from "@/lib/sanity/queries";
import type { BlogPost, BlogPostCard } from "@/types/blog";

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

// Generate only 10 most recent posts at build time, rest on-demand
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const posts = await client.fetch<BlogPostCard[]>(postsQuery);
    // Generate only first 10 posts at build time, rest on-demand
    return posts.slice(0, 10).map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Failed to generate static params:", error);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await client.fetch<BlogPost>(postBySlugQuery, { slug });

    if (!post) {
      return {
        title: "Post Not Found | Pullse Blog",
      };
    }

    return {
      title: `${post.title} | Pullse Blog`,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: "article",
        publishedTime: post.publishedAt,
        authors: post.author ? [post.author.name] : undefined,
        tags: post.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt,
      },
    };
  } catch (error) {
    console.error("Failed to generate metadata:", error);
    return {
      title: "Blog Post | Pullse",
    };
  }
}

const BlogPostPage = async ({ params }: PageProps) => {
  const { slug } = await params;

  try {
    const post = await client.fetch<BlogPost>(postBySlugQuery, { slug });

    if (!post) {
      notFound();
    }

    return <BlogDetail post={post} />;
  } catch (error) {
    console.error("Failed to fetch blog post:", error);
    notFound();
  }
};

export default BlogPostPage;
