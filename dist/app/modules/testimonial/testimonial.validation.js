"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTestimonialZodSchema = exports.createTestimonialZodSchema = void 0;
const zod_1 = require("zod");
exports.createTestimonialZodSchema = zod_1.z.object({
    partnershipLabel: zod_1.z
        .string({ invalid_type_error: "Partnership label must be string" })
        .min(2, { message: "Partnership label must be at least 2 characters long." })
        .max(100, { message: "Partnership label cannot exceed 100 characters." }),
    rating: zod_1.z
        .coerce.number({
        invalid_type_error: "Rating must be a number",
    })
        .min(1, { message: "Minimum rating is 1." })
        .max(5, { message: "Maximum rating is 5." }),
    content: zod_1.z
        .string({ invalid_type_error: "Content must be string" })
        .min(10, { message: "Content must be at least 10 characters long." })
        .max(1000, { message: "Content cannot exceed 1000 characters." }),
    clientName: zod_1.z
        .string({ invalid_type_error: "Client name must be string" })
        .min(2, { message: "Client name must be at least 2 characters long." })
        .max(100, { message: "Client name cannot exceed 100 characters." }),
    companyName: zod_1.z
        .string({ invalid_type_error: "Company name must be string" })
        .min(2, { message: "Company name must be at least 2 characters long." })
        .max(100, { message: "Company name cannot exceed 100 characters." }),
    location: zod_1.z
        .string({ invalid_type_error: "Location must be string" })
        .min(2, { message: "Location must be at least 2 characters long." })
        .max(100, { message: "Location cannot exceed 100 characters." }),
    industry: zod_1.z
        .string({ invalid_type_error: "Industry must be string" })
        .min(2, { message: "Industry must be at least 2 characters long." })
        .max(100, { message: "Industry cannot exceed 100 characters." }),
    designation: zod_1.z
        .string({ invalid_type_error: "Designation must be string" })
        .max(100, { message: "Designation cannot exceed 100 characters." })
        .optional(),
    isApproved: zod_1.z
        .coerce.boolean({
        invalid_type_error: "isApproved must be true or false",
    })
        .optional(),
    isFeatured: zod_1.z
        .coerce.boolean({
        invalid_type_error: "isFeatured must be true or false",
    })
        .optional(),
});
exports.updateTestimonialZodSchema = zod_1.z.object({
    partnershipLabel: zod_1.z
        .string({ invalid_type_error: "Partnership label must be string" })
        .min(2)
        .max(100)
        .optional(),
    rating: zod_1.z
        .coerce.number({
        invalid_type_error: "Rating must be a number",
    })
        .min(1)
        .max(5)
        .optional(),
    content: zod_1.z
        .string({ invalid_type_error: "Content must be string" })
        .min(10)
        .max(1000)
        .optional(),
    clientName: zod_1.z
        .string({ invalid_type_error: "Client name must be string" })
        .min(2)
        .max(100)
        .optional(),
    companyName: zod_1.z
        .string({ invalid_type_error: "Company name must be string" })
        .min(2)
        .max(100)
        .optional(),
    location: zod_1.z
        .string({ invalid_type_error: "Location must be string" })
        .min(2)
        .max(100)
        .optional(),
    industry: zod_1.z
        .string({ invalid_type_error: "Industry must be string" })
        .min(2)
        .max(100)
        .optional(),
    designation: zod_1.z
        .string({ invalid_type_error: "Designation must be string" })
        .max(100)
        .optional(),
    isApproved: zod_1.z
        .coerce.boolean()
        .optional(),
    isFeatured: zod_1.z
        .coerce.boolean()
        .optional(),
});
