import { defineType, defineField } from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
      options: {
        canvasApp: {
          purpose: 'The main headline of the blog post. Should be compelling, clear, and SEO-friendly.',
        },
      },
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        canvasApp: {
          exclude: true, // Auto-generated from title, managed in Studio
        },
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      validation: (Rule) => Rule.required().max(200),
      options: {
        canvasApp: {
          purpose: 'Brief summary (max 200 chars) used for SEO meta descriptions, social media previews, and article cards. Should be engaging and descriptive.',
        },
      },
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
      options: {
        canvasApp: {
          purpose: 'Main article content. Write in a clear, engaging style. Use headings (H2, H3) to structure the article. Include examples and actionable insights.',
        },
      },
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
        canvasApp: {
          purpose: 'Hero image displayed at the top of the article and in previews. Should be high-quality, relevant, and visually appealing.',
        },
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          options: {
            canvasApp: {
              purpose: 'Descriptive text for accessibility and SEO. Describe what is shown in the image.',
            },
          },
        })
      ]
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'blogCategory' }],
      validation: (Rule) => Rule.required(),
      options: {
        canvasApp: {
          purpose: 'Primary topic category for organizing content (e.g., AI & Automation, Product Updates, Customer Stories).',
        },
      },
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'blogAuthor' }],
      options: {
        canvasApp: {
          purpose: 'The person who wrote this article. Select from existing authors or leave blank to set later.',
        },
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      options: {
        canvasApp: {
          purpose: 'Publication date and time. Use current date for immediate publishing or schedule for future.',
        },
      },
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time (minutes)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(60),
      options: {
        canvasApp: {
          exclude: true, // Can be calculated based on content length
        },
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
        canvasApp: {
          purpose: 'SEO keywords and topic tags for improved discoverability. Use specific, relevant terms that readers might search for.',
        },
      },
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Post',
      type: 'boolean',
      initialValue: false,
      options: {
        canvasApp: {
          exclude: true, // Editorial decision made in Studio
        },
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'featuredImage',
    },
    prepare(selection: { title?: string, author?: string, media?: any }) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
})
