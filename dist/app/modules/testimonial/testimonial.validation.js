"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTestimonialZodSchema = exports.createTestimonialZodSchema = void 0;
const zod_1 = require("zod");
exports.createTestimonialZodSchema = zod_1.z.object({
    fullName: zod_1.z
        .string({ invalid_type_error: "Full name must be string" })
        .min(2, { message: "Full name must be at least 2 characters long." })
        .max(100, { message: "Full name cannot exceed 100 characters." }),
    email: zod_1.z
        .string({ invalid_type_error: "Email must be string" })
        .email({ message: "Invalid email address format." })
        .min(5, { message: "Email must be at least 5 characters long." })
        .max(100, { message: "Email cannot exceed 100 characters." }),
    companyName: zod_1.z
        .string({ invalid_type_error: "Company name must be string" })
        .max(100, { message: "Company name cannot exceed 100 characters." })
        .optional(),
    designation: zod_1.z
        .string({ invalid_type_error: "Designation must be string" })
        .max(100, { message: "Designation cannot exceed 100 characters." })
        .optional(),
    rating: zod_1.z
        .number({ invalid_type_error: "Rating must be number" })
        .min(1, { message: "Minimum rating is 1." })
        .max(5, { message: "Maximum rating is 5." }),
    message: zod_1.z
        .string({ invalid_type_error: "Message must be string" })
        .min(10, { message: "Message must be at least 10 characters long." })
        .max(1000, { message: "Message cannot exceed 1000 characters." }),
    photoUrl: zod_1.z
        .string({ invalid_type_error: "Photo URL must be string" })
        .url({ message: "Photo URL must be a valid URL." })
        .optional(),
    date: zod_1.z
        .string({ invalid_type_error: "Date must be string" })
        .datetime({ message: "Date must be in valid ISO format (YYYY-MM-DDTHH:mm:ssZ)." })
        .optional(),
    isApproved: zod_1.z
        .boolean({ invalid_type_error: "isApproved must be true or false" })
        .optional(),
});
exports.updateTestimonialZodSchema = zod_1.z.object({
    fullName: zod_1.z
        .string({ invalid_type_error: "Full name must be string" })
        .min(2, { message: "Full name must be at least 2 characters long." })
        .max(100, { message: "Full name cannot exceed 100 characters." })
        .optional(),
    email: zod_1.z
        .string({ invalid_type_error: "Email must be string" })
        .email({ message: "Invalid email address format." })
        .min(5, { message: "Email must be at least 5 characters long." })
        .max(100, { message: "Email cannot exceed 100 characters." })
        .optional(),
    companyName: zod_1.z
        .string({ invalid_type_error: "Company name must be string" })
        .max(100, { message: "Company name cannot exceed 100 characters." })
        .optional(),
    designation: zod_1.z
        .string({ invalid_type_error: "Designation must be string" })
        .max(100, { message: "Designation cannot exceed 100 characters." })
        .optional(),
    rating: zod_1.z
        .number({ invalid_type_error: "Rating must be number" })
        .min(1, { message: "Minimum rating is 1." })
        .max(5, { message: "Maximum rating is 5." })
        .optional(),
    message: zod_1.z
        .string({ invalid_type_error: "Message must be string" })
        .min(10, { message: "Message must be at least 10 characters long." })
        .max(1000, { message: "Message cannot exceed 1000 characters." })
        .optional(),
    photoUrl: zod_1.z
        .string({ invalid_type_error: "Photo URL must be string" })
        .url({ message: "Photo URL must be a valid URL." })
        .optional(),
    date: zod_1.z
        .string({ invalid_type_error: "Date must be string" })
        .datetime({ message: "Date must be in valid ISO format (YYYY-MM-DDTHH:mm:ssZ)." })
        .optional(),
    isApproved: zod_1.z
        .boolean({ invalid_type_error: "isApproved must be true or false" })
        .optional(),
});
