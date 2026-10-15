import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const schema = z.object({
  wordpressId: z.number().optional(),
  title: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  slug: z.string().min(1),
  route: z.string().startsWith('/'),
  summary: z.string(),
  language: z.enum(['en', 'zh', 'en-zh']),
  kind: z.enum(['article', 'exhibition', 'interview']),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(true),
  archived: z.boolean().default(false),
  duplicateOf: z.number().optional(),
});

export const collections = {
  articles: defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/articles' }), schema }),
  pages: defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/pages' }), schema }),
};
