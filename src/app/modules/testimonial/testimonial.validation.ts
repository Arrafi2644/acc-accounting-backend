import { z } from "zod";

export const createTestimonialZodSchema = z.object({
  fullName: z
    .string({ invalid_type_error: "Full name must be string" })
    .min(2, { message: "Full name must be at least 2 characters long." })
    .max(100, { message: "Full name cannot exceed 100 characters." }),

  email: z
    .string({ invalid_type_error: "Email must be string" })
    .email({ message: "Invalid email address format." })
    .min(5, { message: "Email must be at least 5 characters long." })
    .max(100, { message: "Email cannot exceed 100 characters." }),

  companyName: z
    .string({ invalid_type_error: "Company name must be string" })
    .max(100, { message: "Company name cannot exceed 100 characters." })
    .optional(),

  designation: z
    .string({ invalid_type_error: "Designation must be string" })
    .max(100, { message: "Designation cannot exceed 100 characters." })
    .optional(),

  rating: z
    .number({ invalid_type_error: "Rating must be number" })
    .min(1, { message: "Minimum rating is 1." })
    .max(5, { message: "Maximum rating is 5." }),

  message: z
    .string({ invalid_type_error: "Message must be string" })
    .min(10, { message: "Message must be at least 10 characters long." })
    .max(1000, { message: "Message cannot exceed 1000 characters." }),

  photoUrl: z
    .string({ invalid_type_error: "Photo URL must be string" })
    .url({ message: "Photo URL must be a valid URL." })
    .optional(),

  date: z
    .string({ invalid_type_error: "Date must be string" })
    .datetime({ message: "Date must be in valid ISO format (YYYY-MM-DDTHH:mm:ssZ)." })
    .optional(),

  isApproved: z
    .boolean({ invalid_type_error: "isApproved must be true or false" })
    .optional(),
});

export const updateTestimonialZodSchema = z.object({
  fullName: z
    .string({ invalid_type_error: "Full name must be string" })
    .min(2, { message: "Full name must be at least 2 characters long." })
    .max(100, { message: "Full name cannot exceed 100 characters." })
    .optional(),

  email: z
    .string({ invalid_type_error: "Email must be string" })
    .email({ message: "Invalid email address format." })
    .min(5, { message: "Email must be at least 5 characters long." })
    .max(100, { message: "Email cannot exceed 100 characters." })
    .optional(),

  companyName: z
    .string({ invalid_type_error: "Company name must be string" })
    .max(100, { message: "Company name cannot exceed 100 characters." })
    .optional(),

  designation: z
    .string({ invalid_type_error: "Designation must be string" })
    .max(100, { message: "Designation cannot exceed 100 characters." })
    .optional(),

  rating: z
    .number({ invalid_type_error: "Rating must be number" })
    .min(1, { message: "Minimum rating is 1." })
    .max(5, { message: "Maximum rating is 5." })
    .optional(),

  message: z
    .string({ invalid_type_error: "Message must be string" })
    .min(10, { message: "Message must be at least 10 characters long." })
    .max(1000, { message: "Message cannot exceed 1000 characters." })
    .optional(),

  photoUrl: z
    .string({ invalid_type_error: "Photo URL must be string" })
    .url({ message: "Photo URL must be a valid URL." })
    .optional(),

  date: z
    .string({ invalid_type_error: "Date must be string" })
    .datetime({ message: "Date must be in valid ISO format (YYYY-MM-DDTHH:mm:ssZ)." })
    .optional(),

  isApproved: z
    .boolean({ invalid_type_error: "isApproved must be true or false" })
    .optional(),
});
