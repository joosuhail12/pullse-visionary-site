import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemas } from './sanity/schemas/index'

export default defineConfig({
  name: 'pullse-visionary-site',
  title: 'Pullse Blog & Content',

  projectId: 'iw0d0k33',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: schemas,
  },
})
