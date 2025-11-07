import { z } from "zod";

export const siteInfoZodSchema = z.object({
  // Site & Branding
  siteTitle: z.string().optional(),
  siteTagline: z.string().optional(),
  logoUrl: z.string().url().optional(),
  faviconUrl: z.string().url().optional(),

  // Contact Details
  adminEmail: z.string().email().optional(),
  supportEmail: z.string().email().optional(),
  phone: z.string().optional(),
  supportPhone: z.string().optional(),
  address: z.string().optional(),
  businessHours: z
    .object({
      days: z.array(z.string()).optional(),
      start: z.string().optional(),
      end: z.string().optional(),
    })
    .optional(),
  mapEmbedUrl: z.string().url().optional(),

  // Social Media
  social: z
    .object({
      facebook: z.string().url().optional(),
      linkedin: z.string().url().optional(),
      youtube: z.string().url().optional(),
      twitter: z.string().url().optional(),
      instagram: z.string().url().optional(),
      tiktok: z.string().url().optional(),
      pinterest: z.string().url().optional(),
      whatsapp: z.string().url().optional(),
    })
    .optional(),
});
