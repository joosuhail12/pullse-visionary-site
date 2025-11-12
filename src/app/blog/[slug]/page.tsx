import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogDetail from "@/views/BlogDetail";
import { client, urlFor } from "@/lib/sanity/client";
import { postBySlugQuery } from "@/lib/sanity/queries";
import type { BlogPost } from "@/types/blog";

// Revalidate every hour for ISR fallback
export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for better crawler support
export async function generateStaticParams() {
  try {
    const posts = await client.fetch<Array<{ slug: string }>>(
      `*[_type == "post" && defined(slug.current)][0...100] {
        "slug": slug.current
      }`
    );

    return posts.map((post) => ({
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

    // Generate featured image URL if available
    const featuredImageUrl = post.featuredImage
      ? urlFor(post.featuredImage).width(1200).height(630).url()
      : undefined;

    // Generate canonical URL for social sharing
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pullse.ai';
    const canonicalUrl = `${baseUrl}/blog/${slug}`;

    return {
      metadataBase: new URL(baseUrl),
      title: `${post.title} | Pullse Blog`,
      description: post.excerpt,
      alternates: {
        canonical: `/blog/${slug}`,
      },
      openGraph: {
        url: canonicalUrl,
        title: post.title,
        description: post.excerpt,
        type: "article",
        publishedTime: post.publishedAt,
        authors: post.author ? [post.author.name] : undefined,
        tags: post.tags,
        images: featuredImageUrl ? [{ url: featuredImageUrl, width: 1200, height: 630 }] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt,
        images: featuredImageUrl ? [featuredImageUrl] : undefined,
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

    return <BlogDetail post={post} slug={slug} />;
  } catch (error) {
    console.error("Failed to fetch blog post:", error);
    notFound();
  }
};

export default BlogPostPage;
