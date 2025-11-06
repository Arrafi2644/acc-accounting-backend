import { Types } from "mongoose";
import { z } from "zod";

// Service-type schema
export const createServiceTypeZodSchema = z.object({
     name: z
        .string({ invalid_type_error: "Service type must be string" })
        .min(2, { message: "Service type must be at least 2 characters long." })
        .max(50, { message: "Service type cannot exceed 50 characters." })
});

// Sub-service schema
const subServiceZodSchema = z.object({
  title: z
    .string({ required_error: "Sub-service title is required" })
    .min(2, "Title must be at least 2 characters long").optional(),
  description: z
    .string({ required_error: "Sub-service description is required" })
    .min(5, "Description must be at least 5 characters long").optional(),
  image: z
    .array(z.string().url("Each image must be a valid URL"))
    .nonempty("At least one image is required").optional(),
});

// Main service schema
export const createServiceZodSchema = z.object({
  title: z
    .string({ required_error: "Service title is required" })
    .min(2, "Title must be at least 2 characters long"),
  slug: z
    .string({ required_error: "Service slug is required" })
    .min(2, "Slug must be at least 2 characters long")
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens")
    .optional(),
  description: z
    .string()
    .optional(),
  images: z
    .array(z.string().url("Image must be a valid URL"))
    .optional(),
  included: z
    .array(z.string())
    .optional(),
  excluded: z
    .array(z.string())
    .optional(),
  amenities: z
    .array(z.string())
    .optional(),
  servicePlan: z
    .array(z.string())
    .optional(),
  subServices: z
    .array(subServiceZodSchema)
    .optional(),
  serviceType: z
    .string({ required_error: "Service type ID is required" })
    .refine((val) => Types.ObjectId.isValid(val), {
      message: "Invalid serviceType ObjectId",
    }),
});


// Sub-service schema for update
const updateSubServiceZodSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters long")
    .optional(),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters long")
    .optional(),
  image: z
    .array(z.string().url("Each image must be a valid URL"))
    .optional(),
});

// Main update service schema
export const updateServiceZodSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters long")
    .optional(),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters long")
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens")
    .optional(),
  description: z.string().optional(),
  images: z.array(z.string().url("Image must be a valid URL")).optional(),
  included: z.array(z.string()).optional(),
  excluded: z.array(z.string()).optional(),
  amenities: z.array(z.string()).optional(),
  servicePlan: z.array(z.string()).optional(),
  subServices: z.array(updateSubServiceZodSchema).optional(),
  serviceType: z
    .string()
    .refine((val) => (val ? Types.ObjectId.isValid(val) : true), {
      message: "Invalid serviceType ObjectId",
    })
    .optional(),
    deleteImages: z.array(z.string()).optional()
});

