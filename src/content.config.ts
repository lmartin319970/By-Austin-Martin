import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.enum(['Film', 'Sports', 'Culture', 'Fiction', 'Local', 'Technology', 'Other']),
    type: z.string().default('Essay'),
    featured: z.boolean().default(false),
    portfolio: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});
export const collections = { writing };
