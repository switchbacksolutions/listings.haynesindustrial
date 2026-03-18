import { defineCollection, z } from 'astro:content';

const listings = defineCollection({
  type: 'content',
  schema: z.object({
    /** Item name — shown in listings and page title */
    title: z.string(),

    /** Short description for listing cards and SEO (aim for 150–160 chars) */
    description: z.string(),

    /** Category, e.g. "HVAC", "Structural Steel", "Electrical", "Copper" */
    category: z.string(),

    /** Physical condition of the item */
    condition: z.enum(['New', 'Like New', 'Good', 'Fair']).optional(),

    /** Display price, e.g. "$1,200" — omit to show "Contact for Pricing" */
    price: z.string().optional(),

    /** Internal SKU or reference number */
    sku: z.string().optional(),

    /** Paths to images in public/ */
    images: z.array(z.string()).default([]),

    /** Path to the primary/hero image — must be one of the paths in `images`.
     *  Defaults to images[0] if omitted. Used on listing cards and as the
     *  large hero in the gallery on the detail page. */
    primaryImage: z.string().optional(),

    /** Whether to feature this item on the home page */
    featured: z.boolean().default(false),

    /** Set false to hide from listings without deleting */
    available: z.boolean().default(true),
  }),
});

export const collections = { listings };
