import { z } from "zod";

export const createSEOZodSchema = z.object({
  pagePath: z.string({
    required_error: "Page Path is required",
  }).min(1, "Page Path cannot be empty"),
  pageTitle: z.string({
    required_error: "Page Title is required",
  }).max(100, "Page Title should be max 100 characters"),
  pageDescription: z.string({
    required_error: "Page Description is required",
  }).max(500, "Page Description should be max 500 characters"),
  metaTitle: z.string({
    required_error: "Meta Title is required",
  }).max(60, "Meta Title should be max 60 characters"),
  metaDescription: z.string({
    required_error: "Meta Description is required",
  }).max(160, "Meta Description should be max 160 characters"),
  metaKeywords: z.string().optional(),
  canonicalURL: z.string({
    required_error: "Canonical URL is required",
  }).url("Canonical URL must be a valid URL"),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.string().url("OG Image must be a valid URL").optional(),
});

export const updateSEOZodSchema = z.object({
  pageTitle: z.string()
    .max(100, "Page Title should be max 100 characters")
    .optional(),
  pageDescription: z.string()
    .max(500, "Page Description should be max 500 characters")
    .optional(),
  metaTitle: z.string()
    .max(60, "Meta Title should be max 60 characters")
    .optional(),
  metaDescription: z.string()
    .max(160, "Meta Description should be max 160 characters")
    .optional(),
  metaKeywords: z.string().optional(),
  canonicalURL: z.string()
    .url("Canonical URL must be a valid URL")
    .optional(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.string()
    .url("OG Image must be a valid URL")
    .optional(),
});