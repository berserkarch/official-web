import { defineCollection, z } from "astro:content";
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        author: z.string().default("SYS_ADMIN"),
        tags: z.array(z.string()).optional(),
        draft: z.boolean().default(false),
    }),
});

const docsCollection = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/docs" }),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        order: z.number().default(0),
        category: z.string().default("General"),
    }),
});

export const collections = {
    'blog': blogCollection,
    'docs': docsCollection,
};
