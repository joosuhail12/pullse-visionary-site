'use client';

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageLiquidBackground from "@/components/PageLiquidBackground";
import RouteButton from "@/components/RouteButton";
import {
  Clock,
  ArrowRight,
  Sparkles,
  BookOpen,
  Search,
  User,
  ArrowUp,
  X,
} from "lucide-react";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/client";
import type { BlogCategory, BlogPostCard } from "@/types/blog";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { format } from "date-fns";

interface BlogClientProps {
  categories: BlogCategory[];
  featuredPosts: BlogPostCard[];
  posts: BlogPostCard[];
}

const CATEGORY_STYLES: Record<
  string,
  { bg: string; text: string; border: string; hover: string }
> = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    hover: "hover:bg-blue-100",
  },
  purple: {
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
    hover: "hover:bg-purple-100",
  },
  green: {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
    hover: "hover:bg-green-100",
  },
  orange: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200",
    hover: "hover:bg-orange-100",
  },
  red: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
    hover: "hover:bg-red-100",
  },
  primary: {
    bg: "bg-primary/5",
    text: "text-primary",
    border: "border-primary/20",
    hover: "hover:bg-primary/10",
  },
};

const getCategoryStyle = (color: string) =>
  CATEGORY_STYLES[color] ?? CATEGORY_STYLES.blue;

const hasImageAsset = (image: SanityImageSource | undefined): boolean =>
  Boolean(image && typeof image === "object" && "asset" in image);

const BlogClient = ({ categories, featuredPosts, posts }: BlogClientProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setShowScrollTop(current > 400);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return posts
      .filter((post) => {
        if (query.length === 0) return true;
        return (
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.category.title.toLowerCase().includes(query) ||
          post.tags?.some((tag) => tag.toLowerCase().includes(query))
        );
      })
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
  }, [posts, searchQuery]);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const isSearching = searchQuery.trim().length > 0;
  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = filteredPosts.length > visibleCount;
  const hasContent = posts.length > 0 || featuredPosts.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <PageLiquidBackground opacity={0.12} />
      <Navigation />

      {/* Featured Blog Section - only show if there are featured posts */}
      {featuredPosts.length > 0 && (
        <FeaturedBlogSection featuredPosts={featuredPosts} />
      )}

      {/* Newsletter CTA Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <NewsletterCTA />
      </section>

      {/* Search Bar Section - only show if there are posts */}
      {posts.length > 0 && (
        <SearchBarSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      )}

      {/* Blog List Section */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          {!hasContent ? (
            <div className="rounded-3xl border border-dashed border-border/40 bg-card/60 p-20 text-center backdrop-blur-lg">
              <BookOpen className="mx-auto h-16 w-16 text-muted-foreground/40" />
              <h3 className="mt-8 text-3xl font-bold text-foreground">
                Blog content coming soon
              </h3>
              <p className="mt-4 text-lg text-muted-foreground">
                We're setting up our blog. Check back soon for insights and updates.
              </p>
            </div>
          ) : (
            <>
              {isSearching && (
                <div className="mb-12 text-center">
                  <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                    Search results
                  </h2>
                  <p className="mt-2 text-lg text-muted-foreground">
                    {filteredPosts.length}{" "}
                    {filteredPosts.length === 1 ? "article" : "articles"} matching
                    "{searchQuery}"
                  </p>
                </div>
              )}

              {filteredPosts.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-border/40 bg-card/60 p-20 text-center backdrop-blur-lg">
                  <BookOpen className="mx-auto h-16 w-16 text-muted-foreground/40" />
                  <h3 className="mt-8 text-3xl font-bold text-foreground">
                    No articles found
                  </h3>
                  <p className="mt-4 text-lg text-muted-foreground">
                    Try different keywords or browse all our articles.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {visiblePosts.map((post) => (
                      <CompactCard
                        key={post._id}
                        post={post}
                      />
                    ))}
                  </div>

                  {hasMore && (
                    <div className="mt-16 text-center">
                      <button
                        type="button"
                        onClick={loadMore}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-card/60 px-10 py-4 text-base font-bold text-foreground shadow-xl shadow-primary/10 backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card/70 hover:text-primary hover:shadow-2xl hover:shadow-primary/20"
                      >
                        Load more articles
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <CallToAction />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 rounded-full bg-primary p-4 text-white shadow-xl shadow-primary/30 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-primary/90 hover:shadow-2xl hover:shadow-primary/40"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      <Footer />
    </div>
  );
};

export default BlogClient;

/* eslint-disable no-unused-vars */
interface FeaturedBlogSectionProps {
  featuredPosts: BlogPostCard[];
}

const FeaturedBlogSection = ({ featuredPosts }: FeaturedBlogSectionProps) => {
  const primaryPost = featuredPosts[0];
  const secondaryPosts = featuredPosts.slice(1, 4);

  if (!primaryPost) return null;

  return (
    <section className="relative isolate overflow-hidden py-20 md:py-28">
      {/* Glassmorphism background with gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent-pink/5 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--accent-pink)/0.1),transparent_50%)]" />

      {/* Decorative blur elements */}
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-accent-pink/15 blur-3xl" />

      <div className="relative container mx-auto px-4">
        {/* Badge */}
        <div className="mb-10 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-gradient-to-r from-primary/20 to-accent-pink/15 px-5 py-2 text-xs font-bold uppercase tracking-[0.15em] text-primary shadow-lg backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5" />
            Featured Articles
          </div>
        </div>

        {/* 50/50 Split Hero */}
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Left: Large Featured Post */}
          <FeaturedPostLarge post={primaryPost} />

          {/* Right: Smaller Featured Posts Stack */}
          {secondaryPosts.length > 0 && (
            <div className="flex flex-col gap-6">
              {secondaryPosts.map((post) => (
                <FeaturedPostSmall key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

interface FeaturedPostProps {
  post: BlogPostCard;
}

const FeaturedPostLarge = ({ post }: FeaturedPostProps) => {
  const categoryStyle = getCategoryStyle(post.category.color);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg shadow-black/5 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-black/8"
    >
      {/* Image - No overlay, full visibility */}
      <div className="relative h-[400px] overflow-hidden bg-muted md:h-[500px]">
        {hasImageAsset(post.featuredImage) ? (
          <>
            <Image
              src={urlFor(post.featuredImage!).width(1200).height(800).url()}
              alt={post.title}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              priority
            />
            {/* Category badge - minimal overlay */}
            <div className="absolute left-5 top-5">
              <div className={`inline-flex items-center rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold tracking-wide ${categoryStyle.text} shadow-sm backdrop-blur-sm`}>
                {post.category.title}
              </div>
            </div>
          </>
        ) : (
          <div className={`flex h-full w-full items-center justify-center ${categoryStyle.bg}`}>
            <BookOpen className={`h-20 w-20 ${categoryStyle.text} opacity-40`} />
          </div>
        )}
      </div>

      {/* Content below image */}
      <div className="flex flex-col gap-2.5 p-5 md:p-6">
        {/* Read time */}
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <Clock className="h-3 w-3" />
          <span>{post.readTime} min read</span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold leading-snug text-gray-900 md:text-2xl">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="line-clamp-2 text-sm leading-relaxed text-gray-700">
          {post.excerpt}
        </p>

        {/* Author */}
        {post.author && (
          <div className="flex items-center gap-2.5">
            {hasImageAsset(post.author.avatar) ? (
              <Image
                src={urlFor(post.author.avatar!).width(32).height(32).url()}
                alt={post.author.name}
                width={32}
                height={32}
                className="rounded-full object-cover ring-1 ring-gray-200"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-1 ring-gray-200">
                <User className="h-3.5 w-3.5 text-gray-500" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 text-xs">{post.author.name}</p>
              <time className="text-[10px] text-gray-600">
                {format(new Date(post.publishedAt), "MMM d, yyyy")}
              </time>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

const FeaturedPostSmall = ({ post }: FeaturedPostProps) => {
  const categoryStyle = getCategoryStyle(post.category.color);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex gap-4 overflow-hidden rounded-2xl border border-white/10 bg-card/60 p-4 shadow-lg shadow-primary/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
    >
      {/* Image */}
      <div className="relative h-24 w-32 flex-shrink-0 overflow-hidden rounded-xl bg-muted">
        {hasImageAsset(post.featuredImage) ? (
          <Image
            src={urlFor(post.featuredImage!).width(256).height(192).url()}
            alt={post.title}
            fill
            sizes="128px"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className={`flex h-full w-full items-center justify-center ${categoryStyle.bg}`}>
            <BookOpen className={`h-8 w-8 ${categoryStyle.text} opacity-40`} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs">
            <span className={`font-bold ${categoryStyle.text}`}>
              {post.category.title}
            </span>
            <span className="text-muted-foreground/40">•</span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3" />
              {post.readTime} min
            </span>
          </div>
          <h3 className="line-clamp-2 text-base font-bold leading-snug text-foreground transition-colors duration-300 group-hover:text-primary">
            {post.title}
          </h3>
        </div>
        {post.author && (
          <p className="mt-2 text-xs font-semibold text-muted-foreground">
            {post.author.name}
          </p>
        )}
      </div>
    </Link>
  );
};

const NewsletterCTA = () => (
  <div className="group relative isolate overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-primary via-primary/95 to-accent-pink shadow-2xl shadow-primary/25 backdrop-blur-xl transition-all duration-500 hover:shadow-3xl hover:shadow-primary/35">
    {/* Compact decorative blur circles */}
    <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent-pink/40 blur-3xl" />
    <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-primary/50 blur-3xl" />
    <div className="absolute right-1/4 top-1/3 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

    {/* Glassmorphism overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

    {/* Content - Side by side layout on desktop */}
    <div className="relative p-8 md:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        {/* Left: Heading and description */}
        <div className="flex-1 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider shadow-lg backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5" />
            Newsletter
          </div>
          <h3 className="text-3xl font-bold leading-tight text-white md:text-4xl">
            Get weekly insights
          </h3>
          <p className="text-base leading-relaxed text-white/90 md:text-lg">
            Join thousands of support leaders getting curated articles and AI tactics.
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

interface SearchBarSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const SearchBarSection = ({ searchQuery, onSearchChange }: SearchBarSectionProps) => {
  const popularTopics = ['AI Automation', 'Customer Support', 'Product Updates', 'Case Studies'];

  return (
    <section className="py-8 md:py-10">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* Compact glassmorphism card */}
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-card/80 via-card/60 to-card/40 p-8 shadow-2xl shadow-primary/10 backdrop-blur-xl md:p-10">
            {/* Search input with inline heading */}
            <div className="mb-6 flex flex-col items-center gap-4 md:flex-row md:gap-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent-pink/10 backdrop-blur-sm">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h2 className="whitespace-nowrap text-xl font-bold text-foreground md:text-2xl">
                  Find insights
                </h2>
              </div>

              <div className="relative w-full flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => onSearchChange(event.target.value)}
                  placeholder="Search articles..."
                  className="w-full rounded-xl border border-border/40 bg-background/60 py-3 pl-4 pr-10 text-sm text-foreground placeholder:text-muted-foreground/60 shadow-inner backdrop-blur-sm transition-all focus:border-primary/60 focus:bg-background/80 focus:outline-none focus:ring-2 focus:ring-primary/20 md:text-base"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => onSearchChange("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-muted/80 p-1.5 text-muted-foreground backdrop-blur-sm transition hover:bg-muted hover:text-foreground hover:scale-110"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Popular topics */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground">Popular:</span>
              {popularTopics.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => onSearchChange(topic)}
                  className="group inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-bold text-primary backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-primary/10 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
                >
                  <Sparkles className="h-3 w-3 transition-transform group-hover:rotate-12" />
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CallToAction = () => (
  <section className="border-t border-border/60 bg-background py-24 md:py-32">
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-4xl text-center space-y-8">
        <h2 className="text-4xl font-bold text-foreground md:text-5xl">
          Ready to transform your support?
        </h2>
        <p className="text-lg text-muted-foreground md:text-xl leading-relaxed">
          See how Pullse automates repetitive tickets so your team can focus on
          high-impact conversations.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <RouteButton
            size="lg"
            className="px-10 py-4 text-base shadow-lg shadow-primary/20"
            href="/contact-sales"
          >
            Schedule a demo
            <ArrowRight className="ml-2 h-5 w-5" />
          </RouteButton>
          <RouteButton
            size="lg"
            variant="outline"
            className="px-10 py-4 text-base"
            href="/pricing"
          >
            View pricing
          </RouteButton>
        </div>
      </div>
    </div>
  </section>
);

interface CardProps {
  post: BlogPostCard;
}

/* eslint-enable no-unused-vars */

const CompactCard = ({ post }: CardProps) => {
  const categoryStyle = getCategoryStyle(post.category.color);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-card/60 shadow-xl shadow-primary/5 backdrop-blur-lg transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:bg-card/70 hover:shadow-2xl hover:shadow-primary/15"
    >
      <div className="relative h-52 overflow-hidden bg-muted">
        {hasImageAsset(post.featuredImage) ? (
          <Image
            src={urlFor(post.featuredImage!).width(480).height(320).url()}
            alt={post.title}
            fill
            sizes="(min-width: 1280px) 280px, (min-width: 768px) 45vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div
            className={`flex h-full w-full items-center justify-center ${categoryStyle.bg}`}
          >
            <BookOpen className={`h-12 w-12 ${categoryStyle.text} opacity-40`} />
          </div>
        )}
        {/* Category badge overlay */}
        <div className="absolute left-3 top-3">
          <span className={`inline-block rounded-full border border-white/20 bg-white/90 px-3 py-1 text-xs font-bold backdrop-blur-md ${categoryStyle.text}`}>
            {post.category.title}
          </span>
        </div>
      </div>

      <div className="space-y-4 p-6">
        {/* Read time */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>{post.readTime} min read</span>
          <span className="text-muted-foreground/40">•</span>
          <time>{format(new Date(post.publishedAt), "MMM d, yyyy")}</time>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold leading-tight text-foreground transition-colors duration-300 group-hover:text-primary">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {post.excerpt}
        </p>

        {/* Author info */}
        <div className="flex items-center gap-3 border-t border-border/40 pt-4">
          {hasImageAsset(post.author?.avatar) ? (
            <Image
              src={urlFor(post.author!.avatar!).width(32).height(32).url()}
              alt={post.author!.name}
              width={32}
              height={32}
              className="rounded-full object-cover ring-2 ring-border/40"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted ring-2 ring-border/40">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
          <span className="text-sm font-semibold text-foreground">
            {post.author?.name ?? "Pullse Team"}
          </span>
        </div>
      </div>
    </Link>
  );
};
