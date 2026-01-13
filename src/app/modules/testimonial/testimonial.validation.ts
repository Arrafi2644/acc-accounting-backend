import { z } from "zod";


export const createTestimonialZodSchema = z.object({
  partnershipLabel: z
    .string({ invalid_type_error: "Partnership label must be string" })
    .min(2, { message: "Partnership label must be at least 2 characters long." })
    .max(100, { message: "Partnership label cannot exceed 100 characters." }),

  rating: z
    .coerce.number({
      invalid_type_error: "Rating must be a number",
    })
    .min(1, { message: "Minimum rating is 1." })
    .max(5, { message: "Maximum rating is 5." }),

  content: z
    .string({ invalid_type_error: "Content must be string" })
    .min(10, { message: "Content must be at least 10 characters long." })
    .max(1000, { message: "Content cannot exceed 1000 characters." }),

  clientName: z
    .string({ invalid_type_error: "Client name must be string" })
    .min(2, { message: "Client name must be at least 2 characters long." })
    .max(100, { message: "Client name cannot exceed 100 characters." }),

  companyName: z
    .string({ invalid_type_error: "Company name must be string" })
    .min(2, { message: "Company name must be at least 2 characters long." })
    .max(100, { message: "Company name cannot exceed 100 characters." }),

  location: z
    .string({ invalid_type_error: "Location must be string" })
    .min(2, { message: "Location must be at least 2 characters long." })
    .max(100, { message: "Location cannot exceed 100 characters." }),

  industry: z
    .string({ invalid_type_error: "Industry must be string" })
    .min(2, { message: "Industry must be at least 2 characters long." })
    .max(100, { message: "Industry cannot exceed 100 characters." }),

  designation: z
    .string({ invalid_type_error: "Designation must be string" })
    .max(100, { message: "Designation cannot exceed 100 characters." })
    .optional(),

  isApproved: z
    .coerce.boolean({
      invalid_type_error: "isApproved must be true or false",
    })
    .optional(),

  isFeatured: z
    .coerce.boolean({
      invalid_type_error: "isFeatured must be true or false",
    })
    .optional(),
});


export const updateTestimonialZodSchema = z.object({
  partnershipLabel: z
    .string({ invalid_type_error: "Partnership label must be string" })
    .min(2)
    .max(100)
    .optional(),

  rating: z
    .coerce.number({
      invalid_type_error: "Rating must be a number",
    })
    .min(1)
    .max(5)
    .optional(),

  content: z
    .string({ invalid_type_error: "Content must be string" })
    .min(10)
    .max(1000)
    .optional(),

  clientName: z
    .string({ invalid_type_error: "Client name must be string" })
    .min(2)
    .max(100)
    .optional(),

  companyName: z
    .string({ invalid_type_error: "Company name must be string" })
    .min(2)
    .max(100)
    .optional(),

  location: z
    .string({ invalid_type_error: "Location must be string" })
    .min(2)
    .max(100)
    .optional(),

  industry: z
    .string({ invalid_type_error: "Industry must be string" })
    .min(2)
    .max(100)
    .optional(),

  designation: z
    .string({ invalid_type_error: "Designation must be string" })
    .max(100)
    .optional(),

  isApproved: z
    .coerce.boolean()
    .optional(),

  isFeatured: z
    .coerce.boolean()
    .optional(),
});


