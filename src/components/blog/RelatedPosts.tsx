import Image from 'next/image';
import Link from 'next/link';
import { Clock, User, BookOpen, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { urlFor } from '@/lib/sanity/client';
import type { BlogPostCard } from '@/types/blog';

interface RelatedPostsProps {
  posts: BlogPostCard[];
  currentPostId: string;
}

const hasImageAsset = (image: unknown): boolean =>
  Boolean(image && typeof image === 'object' && 'asset' in image);

const getCategoryStyle = (color: string) => {
  const styles: Record<string, { text: string }> = {
    blue: { text: 'text-blue-700' },
    purple: { text: 'text-purple-700' },
    green: { text: 'text-green-700' },
    orange: { text: 'text-orange-700' },
    red: { text: 'text-red-700' },
    primary: { text: 'text-primary' },
  };
  return styles[color] ?? styles.blue;
};

export default function RelatedPosts({ posts, currentPostId }: RelatedPostsProps) {
  // Filter out current post and limit to 3
  const relatedPosts = posts
    .filter((post) => post._id !== currentPostId)
    .slice(0, 3);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-20">
      <div className="mb-12">
        <h2 className="mb-3 text-4xl font-bold text-foreground md:text-5xl">
          Read next
        </h2>
        <p className="text-lg text-muted-foreground">
          Continue exploring our latest insights and stories
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post) => {
          const categoryStyle = getCategoryStyle(post.category.color);

          return (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-card/60 shadow-xl shadow-primary/5 backdrop-blur-lg transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:bg-card/70 hover:shadow-2xl hover:shadow-primary/15"
            >
              <div className="relative h-52 overflow-hidden bg-muted">
                {hasImageAsset(post.featuredImage) ? (
                  <Image
                    src={urlFor(post.featuredImage!).width(480).height(320).url()}
                    alt={post.title}
                    fill
                    sizes="(min-width: 1024px) 280px, (min-width: 768px) 45vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className={`flex h-full w-full items-center justify-center bg-${post.category.color}-50`}>
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
                  <time>{format(new Date(post.publishedAt), 'MMM d, yyyy')}</time>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold leading-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
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
        })}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-card/60 px-8 py-4 text-base font-bold text-foreground shadow-xl shadow-primary/10 backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card/70 hover:text-primary hover:shadow-2xl hover:shadow-primary/20"
        >
          View all articles
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}
