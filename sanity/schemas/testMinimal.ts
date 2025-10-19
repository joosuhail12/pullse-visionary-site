import { defineType, defineField } from 'sanity'

export const testMinimal = defineType({
  name: 'testMinimal',
  title: 'Test Minimal',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
  ],
})
