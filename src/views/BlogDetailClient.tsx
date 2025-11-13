'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { Clock, User, Home, ChevronRight, Tag, ArrowRight, Sparkles, ArrowUp } from 'lucide-react';
import { urlFor } from '@/lib/sanity/client';
import type { BlogPost, BlogPostCard } from '@/types/blog';
import PortableText from '@/components/blog/PortableText';
import TableOfContents from '@/components/blog/TableOfContents';
import ShareButtons from '@/components/blog/ShareButtons';
import AuthorBioCard from '@/components/blog/AuthorBioCard';
import RelatedPosts from '@/components/blog/RelatedPosts';
import ArticleStructuredData from '@/components/blog/ArticleStructuredData';

interface BlogDetailClientProps {
  post: BlogPost;
  relatedPosts: BlogPostCard[];
  canonicalUrl: string;
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

export default function BlogDetailClient({ post, relatedPosts, canonicalUrl }: BlogDetailClientProps) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const categoryStyle = getCategoryStyle(post.category.color);

  // Reading progress calculation with debounced scroll
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      // Clear the previous timeout
      clearTimeout(timeoutId);

      // Set a new timeout to debounce the scroll event
      timeoutId = setTimeout(() => {
        const article = document.querySelector('article');
        if (!article) return;

        const windowHeight = window.innerHeight;
        const documentHeight = article.clientHeight;
        const scrollTop = window.scrollY;
        const articleTop = article.offsetTop;

        // Show progress bar after scrolling past hero
        setShowProgress(scrollTop > windowHeight * 0.5);

        // Show back to top button after scrolling down 400px
        setShowBackToTop(scrollTop > 400);

        // Calculate reading progress
        const scrollDistance = scrollTop - articleTop + windowHeight;
        const totalDistance = documentHeight;
        const progress = Math.min(Math.max((scrollDistance / totalDistance) * 100, 0), 100);

        setReadingProgress(progress);
      }, 10); // 10ms debounce for smooth updates
    };

    // Initial calculation
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Structured Data for SEO */}
      <ArticleStructuredData post={post} url={canonicalUrl} />

      {/* Skip to Content Link for Accessibility */}
      <a
        href="#article-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to content
      </a>

      {/* Reading Progress Bar */}
      <div
        className={`fixed left-0 right-0 top-0 z-50 h-1 bg-primary transition-all duration-300 ${
          showProgress ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ width: `${readingProgress}%` }}
      />

      {/* Hero Image Section - Premium Magazine Style */}
      <section className="relative isolate overflow-hidden bg-gray-50">
        {/* Container for rounded corners on desktop */}
        <div className="relative h-[60vh] md:h-[70vh] md:mx-6 lg:mx-12 md:mt-6 md:rounded-2xl md:overflow-hidden md:shadow-2xl">
          {hasImageAsset(post.featuredImage) ? (
            <>
              <Image
                src={urlFor(post.featuredImage!).width(2400).height(1600).url()}
                alt={post.title}
                fill
                priority
                sizes="100vw"
                className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                quality={95}
                placeholder="blur"
                blurDataURL={urlFor(post.featuredImage!).width(20).height(20).blur(10).url()}
              />

              {/* Sophisticated gradient overlay - cinematic feel */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent pointer-events-none" />

              {/* Edge vignette for depth */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-black/15 pointer-events-none" />

              {/* Top fade for badge readability */}
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
            </>
          ) : (
            <div className={`absolute inset-0 ${categoryStyle.bg}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent-pink/10 to-transparent" />
            </div>
          )}

          {/* Category Badge - Premium glassmorphism */}
          <div className="absolute left-6 bottom-6 md:left-8 md:bottom-8 z-10">
            <div className={`group inline-flex items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-xs font-bold uppercase tracking-wider ${categoryStyle.text} shadow-2xl shadow-black/20 backdrop-blur-xl border border-white/60 ring-1 ring-black/5 transition-all duration-300 hover:scale-105 hover:shadow-3xl`}>
              <Tag className="h-3.5 w-3.5 transition-transform group-hover:rotate-12" />
              {post.category.title}
            </div>
          </div>

          {/* Reading time badge - bottom right */}
          <div className="absolute right-6 bottom-6 md:right-8 md:bottom-8 z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 text-xs font-medium text-white shadow-xl backdrop-blur-md border border-white/10">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime} min read
            </div>
          </div>
        </div>
      </section>

      {/* Content Section - Overlapping Card Style */}
      <section className="relative -mt-12 md:-mt-16 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="relative isolate max-w-4xl mx-auto overflow-hidden bg-white rounded-t-3xl md:rounded-t-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(0,0,0,0.05)] ring-1 ring-black/5 pt-10 pb-10 md:pt-12 md:pb-12 px-8 md:px-10 lg:px-12">
            {/* Decorative blur circles */}
            <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-accent-pink/8 blur-3xl" />
            <div className="absolute -left-32 -bottom-32 h-64 w-64 rounded-full bg-primary/8 blur-3xl" />

            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent pointer-events-none" />

            {/* Gradient top border */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-primary/50 via-accent-pink to-primary/50 blur-sm" />

            {/* Content */}
            <div className="relative">
              {/* Breadcrumb */}
              <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
                <Link
                  href="/"
                  className="transition-colors hover:text-foreground"
                >
                  <Home className="h-3.5 w-3.5" />
                </Link>
                <ChevronRight className="h-3.5 w-3.5" />
                <Link
                  href="/blog"
                  className="transition-colors hover:text-foreground"
                >
                  Blog
                </Link>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="text-foreground">{post.category.title}</span>
              </nav>

              {/* Title */}
              <h1 className="mb-8 text-3xl font-black leading-[1.2] text-foreground md:text-4xl lg:text-5xl xl:text-6xl">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="mb-10 text-lg leading-relaxed text-muted-foreground md:text-xl lg:text-2xl">
                {post.excerpt}
              </p>

              {/* Author & Meta - Glassmorphic Card */}
              {post.author && (
                <div className="relative isolate mt-10 overflow-hidden rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 via-accent-pink/3 to-transparent p-6 backdrop-blur-sm">
                  {/* Decorative blur */}
                  <div className="absolute -right-16 -bottom-16 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />

                  <div className="relative flex items-center gap-4">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      {hasImageAsset(post.author.avatar) ? (
                        <div className="relative">
                          <Image
                            src={urlFor(post.author.avatar!).width(64).height(64).url()}
                            alt={post.author.name}
                            width={64}
                            height={64}
                            className="rounded-full object-cover ring-4 ring-white shadow-xl shadow-primary/20"
                          />
                          {/* Glow effect */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent-pink/20 blur-md -z-10" />
                        </div>
                      ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-accent-pink/10 ring-4 ring-white shadow-xl shadow-primary/20">
                          <User className="h-7 w-7 text-primary" />
                        </div>
                      )}
                    </div>

                    {/* Author Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold uppercase tracking-wider text-primary/70 mb-1">
                        Written by
                      </p>
                      <p className="text-lg font-bold text-foreground truncate">
                        {post.author.name}
                      </p>
                      {post.author.jobTitle && (
                        <p className="text-sm text-muted-foreground truncate">
                          {post.author.jobTitle}
                        </p>
                      )}
                    </div>

                    {/* Date */}
                    <div className="flex-shrink-0 text-right">
                      <time className="text-sm font-medium text-foreground/70">
                        {format(new Date(post.publishedAt), 'MMM d, yyyy')}
                      </time>
                    </div>
                  </div>
                </div>
              )}
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
              url={canonicalUrl}
              className="sticky top-32"
            />
          </div>

          {/* Center: Article Content */}
          <article id="article-content" className="min-w-0" role="article" aria-label="Blog post content">
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

          {/* Right: Table of Contents (Desktop & Mobile Drawer) */}
          <div className="hidden lg:block">
            <TableOfContents showMobileButton />
          </div>

          {/* Mobile TOC is shown via the TableOfContents component */}
          <div className="lg:hidden">
            <TableOfContents showMobileButton />
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
          url={canonicalUrl}
          className="flex-row"
        />
      </div>

      {/* Back to Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        className={`fixed bottom-24 left-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-card/80 text-foreground shadow-2xl shadow-primary/10 backdrop-blur-xl transition-all hover:bg-card hover:shadow-primary/30 hover:scale-110 lg:bottom-8 ${
          showBackToTop
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-4 opacity-0'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
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
