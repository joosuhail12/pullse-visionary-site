'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  X,
  Sparkles,
  Clock,
  BookOpen,
  User,
  ArrowRight,
} from 'lucide-react';
import { format } from 'date-fns';
import { urlFor } from '@/lib/sanity/client';
import type { BlogPostCard } from '@/types/blog';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

interface BlogSearchAndFilterProps {
  posts: BlogPostCard[];
}

const CATEGORY_STYLES: Record<
  string,
  { bg: string; text: string; border: string; hover: string }
> = {
  blue: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    hover: 'hover:bg-blue-100',
  },
  purple: {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200',
    hover: 'hover:bg-purple-100',
  },
  green: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
    hover: 'hover:bg-green-100',
  },
  orange: {
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    border: 'border-orange-200',
    hover: 'hover:bg-orange-100',
  },
  red: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
    hover: 'hover:bg-red-100',
  },
  primary: {
    bg: 'bg-primary/5',
    text: 'text-primary',
    border: 'border-primary/20',
    hover: 'hover:bg-primary/10',
  },
};

const getCategoryStyle = (color: string) =>
  CATEGORY_STYLES[color] ?? CATEGORY_STYLES.blue;

const hasImageAsset = (image: SanityImageSource | undefined): boolean =>
  Boolean(image && typeof image === 'object' && 'asset' in image);

export default function BlogSearchAndFilter({ posts }: BlogSearchAndFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(12);

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

  const isSearching = searchQuery.trim().length > 0;
  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = filteredPosts.length > visibleCount;

  const popularTopics = ['AI Automation', 'Customer Support', 'Product Updates', 'Case Studies'];

  return (
    <>
      {/* Search Bar Section */}
      {posts.length > 0 && (
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
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder="Search articles..."
                      className="w-full rounded-xl border border-border/40 bg-background/60 py-3 pl-4 pr-10 text-sm text-foreground placeholder:text-muted-foreground/60 shadow-inner backdrop-blur-sm transition-all focus:border-primary/60 focus:bg-background/80 focus:outline-none focus:ring-2 focus:ring-primary/20 md:text-base"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
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
                      onClick={() => setSearchQuery(topic)}
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
      )}

      {/* Blog List Section */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          {isSearching && (
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                Search results
              </h2>
              <p className="mt-2 text-lg text-muted-foreground">
                {filteredPosts.length}{' '}
                {filteredPosts.length === 1 ? 'article' : 'articles'} matching
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
                  <CompactCard key={post._id} post={post} />
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
        </div>
      </section>
    </>
  );
}

interface CardProps {
  post: BlogPostCard;
}

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
          <span
            className={`inline-block rounded-full border border-white/20 bg-white/90 px-3 py-1 text-xs font-bold backdrop-blur-md ${categoryStyle.text}`}
          >
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
          <time>{format(new Date(post.publishedAt), 'MMM d, yyyy')}</time>
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
              sizes="32px"
              className="rounded-full object-cover ring-2 ring-border/40"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted ring-2 ring-border/40">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
          <span className="text-sm font-semibold text-foreground">
            {post.author?.name ?? 'Pullse Team'}
          </span>
        </div>
      </div>
    </Link>
  );
};
