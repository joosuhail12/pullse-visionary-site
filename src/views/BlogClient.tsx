import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageLiquidBackground from '@/components/PageLiquidBackground';
import RouteButton from '@/components/RouteButton';
import NewsletterCTA from '@/components/NewsletterCTA';
import BlogHeroBackground from '@/components/blog/BlogHeroBackground';
import BlogSearchAndFilter from '@/components/blog/BlogSearchAndFilter';
import BlogScrollToTop from '@/components/blog/BlogScrollToTop';
import {
  Clock,
  ArrowRight,
  BookOpen,
  User,
  CheckCircle2,
  Zap,
  CreditCard,
} from 'lucide-react';
import { urlFor } from '@/lib/sanity/client';
import type { BlogCategory, BlogPostCard } from '@/types/blog';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { format } from 'date-fns';

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

const BlogClient = ({ categories, featuredPosts, posts }: BlogClientProps) => {
  const hasContent = posts.length > 0 || featuredPosts.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <PageLiquidBackground opacity={0.45} />
      <Navigation />

      <main id="main-content" role="main">
        {/* Featured Blog Section - only show if there are featured posts */}
        {featuredPosts.length > 0 && (
          <FeaturedBlogSection featuredPosts={featuredPosts} />
        )}

      {/* Newsletter CTA Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <NewsletterCTA variant="standard" source="blog-listing" />
      </section>

      {/* Search and Filter Section with Blog List */}
      {!hasContent ? (
        <section className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-7xl mx-auto">
            <div className="rounded-3xl border border-dashed border-border/40 bg-card/60 p-20 text-center backdrop-blur-lg">
              <BookOpen className="mx-auto h-16 w-16 text-muted-foreground/40" />
              <h3 className="mt-8 text-3xl font-bold text-foreground">
                Blog content coming soon
              </h3>
              <p className="mt-4 text-lg text-muted-foreground">
                We're setting up our blog. Check back soon for insights and updates.
              </p>
            </div>
          </div>
        </section>
      ) : (
        <BlogSearchAndFilter posts={posts} />
      )}

        {/* Call to Action */}
        <CallToAction />
      </main>

      {/* Scroll to Top Button */}
      <BlogScrollToTop />

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
    <section className="relative isolate overflow-hidden py-14 md:py-20">
      {/* Hero Liquid Ether Effect */}
      <BlogHeroBackground />

      {/* Glassmorphism background with gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent-pink/5 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--accent-pink)/0.1),transparent_50%)]" />

      <div className="relative container mx-auto px-4">
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
      <div className="relative h-[260px] sm:h-[340px] md:h-[460px] overflow-hidden bg-muted">
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
              <div
                className={`inline-flex items-center rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold tracking-wide ${categoryStyle.text} shadow-sm backdrop-blur-sm`}
              >
                {post.category.title}
              </div>
            </div>
          </>
        ) : (
          <div
            className={`flex h-full w-full items-center justify-center ${categoryStyle.bg}`}
          >
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
                sizes="32px"
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
                {format(new Date(post.publishedAt), 'MMM d, yyyy')}
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
          <div
            className={`flex h-full w-full items-center justify-center ${categoryStyle.bg}`}
          >
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
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
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

const CallToAction = () => (
  <section className="relative py-24 md:py-32 overflow-hidden">
    {/* Background gradient */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.15),transparent_60%)]" />

    <div className="container relative mx-auto px-4">
      <div className="max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl border-2 border-primary/40 bg-gradient-to-br from-card via-card to-card/90 shadow-2xl">
          {/* Gradient overlays for depth */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--primary)/0.1),transparent_50%)]" />

          <div className="relative p-12 lg:p-16 z-10">
            <div className="text-center space-y-10">
              <div className="space-y-6">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Ready to transform your support?
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  See how Pullse automates repetitive tickets so your team can focus on
                  high-impact conversations.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <RouteButton
                  size="lg"
                  className="text-base px-10 py-6 shadow-xl shadow-primary/20"
                  href="/contact-sales"
                >
                  Schedule a demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </RouteButton>
                <RouteButton
                  size="lg"
                  variant="outline"
                  className="text-base px-10 py-6 border border-border/40 hover:border-primary/40"
                  href="/pricing"
                >
                  View pricing
                </RouteButton>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-12 border-t border-border/40">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <span>Setup in minutes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>
      </div>
    </div>
  </section>
);

/* eslint-enable no-unused-vars */
