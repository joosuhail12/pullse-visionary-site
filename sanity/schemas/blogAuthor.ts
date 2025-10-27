import { defineType, defineField } from 'sanity'

export const blogAuthor = defineType({
  name: 'blogAuthor',
  title: 'Blog Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        canvasApp: {
          purpose: "Author's full name as it should appear on published articles.",
        },
      },
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        canvasApp: {
          exclude: true, // Auto-generated from name, managed in Studio
        },
      },
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: {
        hotspot: true,
        canvasApp: {
          purpose: "Author's profile photo displayed with their articles. Should be professional and high-quality.",
        },
      },
    }),
    defineField({
      name: 'jobTitle',
      title: 'Job Title',
      type: 'string',
      options: {
        canvasApp: {
          purpose: "Author's current position or role (e.g., 'Content Writer', 'Head of Product').",
        },
      },
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 3,
      options: {
        canvasApp: {
          purpose: "Brief professional biography (2-3 sentences) about the author's expertise and background.",
        },
      },
    }),
  ],
})
