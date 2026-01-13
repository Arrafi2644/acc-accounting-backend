import { z } from "zod";

export const createGuideArticleSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .trim(),

  description: z
    .string()
    .min(1, "Description is required")
    .trim(),

  category: z
    .string()
    .min(1, "Category is required")
    .trim(),

  readTime: z
    .number()
    .int("Read time must be an integer")
    .min(1, "Read time must be at least 1 minute"),

  icon: z
    .string()
    .min(1, "Icon is required")
    .trim(),
});


export const updateGuideArticleSchema = z.object({
  title: z
    .string()
    .min(1, "Title cannot be empty")
    .trim()
    .optional(),

  description: z
    .string()
    .min(1, "Description cannot be empty")
    .trim()
    .optional(),

  category: z
    .string()
    .min(1, "Category cannot be empty")
    .trim()
    .optional(),

  readTime: z
    .number()
    .int("Read time must be an integer")
    .min(1, "Read time must be at least 1 minute")
    .optional(),

  icon: z
    .string()
    .min(1, "Icon cannot be empty")
    .trim()
    .optional(),
});



// Create Tool
export const createToolSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  icon: z.string().min(1, { message: "Icon URL is required" }),
  status: z.enum(["active", "inactive"]).refine(val => val === "active" || val === "inactive", {
    message: "Status must be active or inactive",
  }),
});

// Update Tool (all fields optional)
export const updateToolSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  icon: z.string().min(1).optional(),
  status: z.enum(["active", "inactive"]).optional(),
});
