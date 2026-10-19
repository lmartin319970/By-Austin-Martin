import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
const category = z.enum(['Film', 'Sports', 'Culture', 'Fiction', 'Creative', 'Local', 'Technology', 'Other']);
const publicationMetadata = {
  publicationType: z.enum(['independent', 'commissioned', 'external']).default('independent'),
  paid: z.boolean().default(false),
  publication: z.string().default(''),
  externalUrl: z.union([z.string().url().regex(/^https?:\/\//), z.literal('')]).default(''),
  displayOrder: z.number().int().optional(),
};
const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category,
    type: z.string().default('Essay'),
    featured: z.boolean().default(false),
    portfolio: z.boolean().default(false),
    draft: z.boolean().default(false),
    ...publicationMetadata,
  }),
});
const portfolioFiles = glob({ pattern: '**/*.json', base: './src/content/portfolio' });
const portfolio = defineCollection({
  loader: {
    ...portfolioFiles,
    async load(context) {
      // Also remove cached entries when the final portfolio file is deleted.
      context.store.clear();
      await portfolioFiles.load(context);
    },
  },
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category,
    type: z.string().default('Essay'),
    ...publicationMetadata,
    externalUrl: z.string().url().regex(/^https?:\/\//),
    draft: z.boolean().default(false),
    visible: z.boolean().default(true),
  }),
});
export const collections = { writing, portfolio };
