import { defineType, defineField } from 'sanity'

export const blogCategory = defineType({
  name: 'blogCategory',
  title: 'Blog Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'color',
      title: 'Color Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Blue (AI & Automation)', value: 'blue' },
          { title: 'Purple (Product Updates)', value: 'purple' },
          { title: 'Green (Customer Stories)', value: 'green' },
          { title: 'Orange (Support Ops)', value: 'orange' },
          { title: 'Red (Industry Insights)', value: 'red' },
          { title: 'Primary (Founder\'s Desk)', value: 'primary' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
