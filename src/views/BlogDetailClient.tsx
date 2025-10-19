'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { Clock, User, Home, ChevronRight, Tag, ArrowRight, Sparkles } from 'lucide-react';
import { urlFor } from '@/lib/sanity/client';
import type { BlogPost, BlogPostCard } from '@/types/blog';
import PortableText from '@/components/blog/PortableText';
import TableOfContents from '@/components/blog/TableOfContents';
import ShareButtons from '@/components/blog/ShareButtons';
import AuthorBioCard from '@/components/blog/AuthorBioCard';
import RelatedPosts from '@/components/blog/RelatedPosts';

interface BlogDetailClientProps {
  post: BlogPost;
  relatedPosts: BlogPostCard[];
}

const hasImageAsset = (image: unknown): boolean =>
  Boolean(image && typeof image === 'object' && 'asset' in image);

const getCategoryStyle = (color: string) => {
  const styles: Record<string, { text: string; bg: string }> = {
    blue: { text: 'text-blue-700', bg: 'bg-blue-50' },
    purple: { text: 'text-purple-700', bg: 'bg-purple-50' },
    green: { text: 'text-green-700', bg: 'bg-green-50' },
    orange: { text: 'text-orange-700', bg: 'bg-orange-50' },
    red: { text: 'text-red-700', bg: 'bg-red-50' },
    primary: { text: 'text-primary', bg: 'bg-primary/5' },
  };
  return styles[color] ?? styles.blue;
};

export default function BlogDetailClient({ post, relatedPosts }: BlogDetailClientProps) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const categoryStyle = getCategoryStyle(post.category.color);

  // Reading progress calculation
  useEffect(() => {
    const handleScroll = () => {
      const article = document.querySelector('article');
      if (!article) return;

      const windowHeight = window.innerHeight;
      const documentHeight = article.clientHeight;
      const scrollTop = window.scrollY;
      const articleTop = article.offsetTop;

      // Show progress bar after scrolling past hero
      setShowProgress(scrollTop > windowHeight * 0.5);

      // Calculate reading progress
      const scrollDistance = scrollTop - articleTop + windowHeight;
      const totalDistance = documentHeight;
      const progress = Math.min(Math.max((scrollDistance / totalDistance) * 100, 0), 100);

      setReadingProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="min-h-screen bg-background">
      {/* Reading Progress Bar */}
      <div
        className={`fixed left-0 right-0 top-0 z-50 h-1 bg-primary transition-all duration-300 ${
          showProgress ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ width: `${readingProgress}%` }}
      />

      {/* Immersive Hero Section */}
      <section className="relative isolate h-[60vh] overflow-hidden md:h-[80vh]">
        {/* Background Image with Gradient Overlay */}
        {hasImageAsset(post.featuredImage) ? (
          <>
            <Image
              src={urlFor(post.featuredImage!).width(1920).height(1080).url()}
              alt={post.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
          </>
        ) : (
          <div className={`absolute inset-0 ${categoryStyle.bg}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent-pink/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
          </div>
        )}

        {/* Hero Content */}
        <div className="relative flex h-full items-end">
          <div className="container mx-auto px-4 pb-16 md:pb-20">
            <div className="max-w-4xl">
              {/* Breadcrumb */}
              <nav className="mb-6 flex items-center gap-2 text-sm text-white/70">
                <Link
                  href="/"
                  className="transition-colors hover:text-white"
                >
                  <Home className="h-4 w-4" />
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link
                  href="/blog"
                  className="transition-colors hover:text-white"
                >
                  Blog
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white">{post.category.title}</span>
              </nav>

              {/* Category Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-xl">
                <Tag className="h-3.5 w-3.5" />
                {post.category.title}
              </div>

              {/* Title */}
              <h1 className="mb-6 text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="mb-8 text-xl leading-relaxed text-white/90 md:text-2xl">
                {post.excerpt}
              </p>

              {/* Author & Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                {post.author && (
                  <div className="flex items-center gap-3">
                    {hasImageAsset(post.author.avatar) ? (
                      <Image
                        src={urlFor(post.author.avatar!).width(48).height(48).url()}
                        alt={post.author.name}
                        width={48}
                        height={48}
                        className="rounded-full ring-2 ring-white/30"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md ring-2 ring-white/30">
                        <User className="h-5 w-5 text-white" />
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-white">{post.author.name}</p>
                      {post.author.jobTitle && (
                        <p className="text-white/70">{post.author.jobTitle}</p>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <span>•</span>
                  <time>{format(new Date(post.publishedAt), 'MMM d, yyyy')}</time>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime} min read
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_800px_280px]">
          {/* Left: Floating Share Buttons (Desktop) */}
          <div className="hidden lg:block">
            <ShareButtons
              title={post.title}
              url={currentUrl}
              className="sticky top-32"
            />
          </div>

          {/* Center: Article Content */}
          <article className="min-w-0">
            {post.content && post.content.length > 0 ? (
              <PortableText value={post.content} />
            ) : (
              <div className="rounded-2xl border border-dashed border-border/60 bg-card/60 p-16 text-center backdrop-blur-sm">
                <p className="text-lg text-muted-foreground">
                  Content coming soon...
                </p>
              </div>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-16 space-y-4">
                <h3 className="text-lg font-bold text-foreground">Tagged with</h3>
                <div className="flex flex-wrap gap-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-bold text-primary backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-primary/10 hover:scale-105"
                    >
                      <Tag className="h-3.5 w-3.5" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio */}
            {post.author && (
              <div className="mt-16">
                <AuthorBioCard author={post.author} />
              </div>
            )}

            {/* Newsletter CTA */}
            <div className="mt-16">
              <NewsletterCTA />
            </div>
          </article>

          {/* Right: Table of Contents (Desktop) */}
          <div className="hidden lg:block">
            <TableOfContents />
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="container mx-auto px-4">
          <RelatedPosts posts={relatedPosts} currentPostId={post._id} />
        </div>
      )}

      {/* Mobile Share Buttons - Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center gap-3 border-t border-border/60 bg-background/95 p-4 backdrop-blur-md lg:hidden">
        <ShareButtons
          title={post.title}
          url={currentUrl}
          className="flex-row"
        />
      </div>
    </div>
  );
}

// Compact Newsletter CTA for article end
const NewsletterCTA = () => (
  <div className="group relative isolate overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-primary via-primary/95 to-accent-pink shadow-2xl shadow-primary/25 backdrop-blur-xl transition-all duration-500 hover:shadow-3xl hover:shadow-primary/35">
    {/* Decorative blur circles */}
    <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent-pink/40 blur-3xl" />
    <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-primary/50 blur-3xl" />

    {/* Glassmorphism overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

    {/* Content */}
    <div className="relative p-8 md:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        {/* Left: Heading */}
        <div className="flex-1 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider shadow-lg backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5" />
            Newsletter
          </div>
          <h3 className="text-3xl font-bold leading-tight text-white md:text-4xl">
            Want more insights like this?
          </h3>
          <p className="text-base leading-relaxed text-white/90 md:text-lg">
            Get weekly articles on AI, support automation, and customer experience.
          </p>
        </div>

        {/* Right: Form */}
        <div className="flex-shrink-0 lg:w-[440px]">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-xl border border-white/40 bg-white/20 px-4 py-3.5 text-sm text-white placeholder:text-white/70 shadow-lg backdrop-blur-xl transition-all focus:border-white/60 focus:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white/50 md:text-base"
            />
            <button
              type="button"
              className="group/btn flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-primary shadow-xl transition-all hover:bg-white/95 hover:shadow-2xl hover:scale-105 md:text-base"
            >
              Subscribe
              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </button>
          </div>
          <p className="mt-3 text-xs text-white/70">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </div>
  </div>
);
