import type { PortableTextBlock } from '@portabletext/react'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export interface BlogCategory {
  _id: string
  title: string
  slug: string
  description?: string
  color: 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'primary'
}

export interface BlogAuthor {
  _id: string
  name: string
  slug: string
  avatar?: SanityImageSource
  jobTitle?: string
  bio?: string
}

export interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  content?: PortableTextBlock[]
  featuredImage?: SanityImageSource
  category: BlogCategory
  author?: BlogAuthor
  publishedAt: string
  readTime: number
  tags?: string[]
  isFeatured: boolean
}

export interface BlogPostCard {
  _id: string
  title: string
  slug: string
  excerpt: string
  featuredImage?: SanityImageSource
  category: BlogCategory
  author?: BlogAuthor
  publishedAt: string
  readTime: number
  tags?: string[]
  isFeatured: boolean
}
