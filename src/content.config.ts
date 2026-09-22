import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// `author`/`topics` are stored as plain slugs (e.g. "jane-doe") because that's
// what Decap CMS's `relation` widget writes. They're resolved against the
// `en/<slug>` entry ids of the authors/topics collections at render time
// instead of using astro:content's `reference()` (which expects the full
// locale-prefixed id and doesn't match what the CMS can produce).
const posts = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/data/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      cover: image().optional(),
      author: z.string(),
      topics: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    }),
});

const authors = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/data/authors' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      avatar: image().optional(),
      bio: z.string().optional(),
      twitter: z.string().optional(),
      website: z.string().optional(),
    }),
});

const topics = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/data/topics' }),
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { posts, authors, topics };
