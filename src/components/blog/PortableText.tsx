'use client';

import { PortableText as PortableTextReact } from '@portabletext/react';
import type { PortableTextBlock, PortableTextComponents } from '@portabletext/react';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity/client';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import CodeBlock from './CodeBlock';
import Callout from './Callout';
import BlogImage from './BlogImage';
import YouTubeEmbed from './YouTubeEmbed';

interface PortableTextProps {
  value: PortableTextBlock[];
}

// Generate slug from text for heading anchors
const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

const components: PortableTextComponents = {
  block: {
    h1: ({ children, value }) => {
      const text = value?.children?.[0]?.text || '';
      const slug = generateSlug(text);
      return (
        <h1
          id={slug}
          className="scroll-mt-24 mb-6 text-5xl font-bold leading-tight text-foreground md:text-6xl"
        >
          {children}
        </h1>
      );
    },
    h2: ({ children, value }) => {
      const text = value?.children?.[0]?.text || '';
      const slug = generateSlug(text);
      return (
        <h2
          id={slug}
          className="scroll-mt-24 mb-5 mt-12 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-5xl"
        >
          {children}
        </h2>
      );
    },
    h3: ({ children, value }) => {
      const text = value?.children?.[0]?.text || '';
      const slug = generateSlug(text);
      return (
        <h3
          id={slug}
          className="scroll-mt-24 mb-4 mt-10 text-3xl font-bold leading-tight text-foreground md:text-4xl"
        >
          {children}
        </h3>
      );
    },
    h4: ({ children }) => (
      <h4 className="mb-4 mt-8 text-2xl font-bold leading-tight text-foreground md:text-3xl">
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className="mb-3 mt-6 text-xl font-bold leading-tight text-foreground md:text-2xl">
        {children}
      </h5>
    ),
    h6: ({ children }) => (
      <h6 className="mb-3 mt-6 text-lg font-bold leading-tight text-foreground md:text-xl">
        {children}
      </h6>
    ),
    normal: ({ children }) => (
      <p className="mb-6 text-lg leading-relaxed text-foreground/90">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 border-primary bg-gradient-to-r from-primary/10 to-transparent py-4 pl-6 pr-4 italic backdrop-blur-sm">
        <div className="text-xl leading-relaxed text-foreground/90">
          {children}
        </div>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 ml-6 space-y-3 text-lg leading-relaxed text-foreground/90">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 ml-6 space-y-3 text-lg leading-relaxed text-foreground/90">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="relative pl-2">
        <span className="absolute -left-4 text-primary">•</span>
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className="pl-2">
        {children}
      </li>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || '';
      const isExternal = href.startsWith('http');

      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary underline-offset-4 transition-all hover:underline hover:text-primary/80"
          >
            {children}
          </a>
        );
      }

      return (
        <Link
          href={href}
          className="font-semibold text-primary underline-offset-4 transition-all hover:underline hover:text-primary/80"
        >
          {children}
        </Link>
      );
    },
    strong: ({ children }) => (
      <strong className="font-bold text-foreground">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }) => (
      <code className="rounded bg-primary/10 px-2 py-1 text-base font-mono text-primary">
        {children}
      </code>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) {
        return null;
      }

      const imageUrl = urlFor(value.asset as SanityImageSource)
        .width(1200)
        .height(800)
        .url();

      // Generate LQIP (Low Quality Image Placeholder) for blur effect
      const blurDataURL = urlFor(value.asset as SanityImageSource)
        .width(20)
        .height(20)
        .blur(50)
        .url();

      return (
        <BlogImage
          src={imageUrl}
          alt={value.alt || 'Blog post image'}
          caption={value.caption}
          blurDataURL={blurDataURL}
        />
      );
    },
    code: ({ value }) => {
      if (!value?.code) {
        return null;
      }

      return (
        <CodeBlock
          code={value.code}
          language={value.language || 'typescript'}
          filename={value.filename}
        />
      );
    },
    callout: ({ value }) => {
      if (!value) {
        return null;
      }

      return (
        <Callout type={value.type} title={value.title}>
          {value.content}
        </Callout>
      );
    },
    youtube: ({ value }) => {
      if (!value?.videoId) {
        return null;
      }

      return (
        <YouTubeEmbed
          videoId={value.videoId}
          title={value.title}
          params={value.params}
        />
      );
    },
  },
};

export default function PortableText({ value }: PortableTextProps) {
  if (!value || value.length === 0) {
    return null;
  }

  return (
    <div className="portable-text">
      <PortableTextReact value={value} components={components} />
    </div>
  );
}
