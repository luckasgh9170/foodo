import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const categorySchema = z.object({
  titleFa: z.string().min(2),
  titleEn: z.string().min(2),
  slug: z.string().min(2),
  sortOrder: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export const productSchema = z.object({
  categoryId: z.string().min(1),
  titleFa: z.string().min(2),
  titleEn: z.string().min(2),
  shortDescFa: z.string().min(2),
  shortDescEn: z.string().min(2),
  fullDescFa: z.string().optional().nullable(),
  fullDescEn: z.string().optional().nullable(),
  ingredientsFa: z.string().optional().nullable(),
  ingredientsEn: z.string().optional().nullable(),
  allergensFa: z.string().optional().nullable(),
  allergensEn: z.string().optional().nullable(),
  price: z.number().int().min(0),
  currency: z.literal("TOMAN").default("TOMAN"),
  images: z.array(z.string().url()).default([]),
  model3dUrl: z.string().url().optional().nullable(),
  tags: z.array(z.string().min(1)).default([]),
  isAvailable: z.boolean().default(true),
  sortOrder: z.number().int().min(0).default(0),
});

export const settingsSchema = z.object({
  restaurantName: z.string().min(2),
  logoUrl: z.string().url().optional().nullable(),
  primaryColor: z.string().min(4),
  secondaryColor: z.string().min(4),
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
});
