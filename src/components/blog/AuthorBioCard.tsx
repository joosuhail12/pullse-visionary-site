import Image from 'next/image';
import { User } from 'lucide-react';
import { urlFor } from '@/lib/sanity/client';
import type { BlogAuthor } from '@/types/blog';

interface AuthorBioCardProps {
  author: BlogAuthor;
}

const hasImageAsset = (image: unknown): boolean =>
  Boolean(image && typeof image === 'object' && 'asset' in image);

export default function AuthorBioCard({ author }: AuthorBioCardProps) {
  return (
    <div className="relative isolate overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-primary/10 via-accent-pink/5 to-background p-8 shadow-2xl shadow-primary/10 backdrop-blur-xl md:p-10">
      {/* Decorative blur circles */}
      <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-accent-pink/20 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />

      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

      {/* Content */}
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center">
        {/* Author Avatar */}
        <div className="flex-shrink-0">
          {hasImageAsset(author.avatar) ? (
            <Image
              src={urlFor(author.avatar!).width(120).height(120).url()}
              alt={author.name}
              width={120}
              height={120}
              className="rounded-full object-cover ring-4 ring-white/20"
            />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-muted ring-4 ring-white/20 md:h-32 md:w-32">
              <User className="h-12 w-12 text-muted-foreground md:h-14 md:w-14" />
            </div>
          )}
        </div>

        {/* Author Info */}
        <div className="flex-1 space-y-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Written by
            </p>
            <h3 className="text-2xl font-bold text-foreground md:text-3xl">
              {author.name}
            </h3>
            {author.jobTitle && (
              <p className="mt-1 text-base text-muted-foreground md:text-lg">
                {author.jobTitle}
              </p>
            )}
          </div>

          {author.bio && (
            <p className="text-base leading-relaxed text-foreground/90 md:text-lg">
              {author.bio}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
