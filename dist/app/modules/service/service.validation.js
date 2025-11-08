"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateServiceZodSchema = exports.createServiceZodSchema = exports.createServiceTypeZodSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
// Service-type schema
exports.createServiceTypeZodSchema = zod_1.z.object({
    name: zod_1.z
        .string({ invalid_type_error: "Service type must be string" })
        .min(2, { message: "Service type must be at least 2 characters long." })
        .max(50, { message: "Service type cannot exceed 50 characters." })
});
// Sub-service schema
const subServiceZodSchema = zod_1.z.object({
    title: zod_1.z
        .string({ required_error: "Sub-service title is required" })
        .min(2, "Title must be at least 2 characters long").optional(),
    description: zod_1.z
        .string({ required_error: "Sub-service description is required" })
        .min(5, "Description must be at least 5 characters long").optional(),
    image: zod_1.z
        .array(zod_1.z.string().url("Each image must be a valid URL"))
        .nonempty("At least one image is required").optional(),
});
// Main service schema
exports.createServiceZodSchema = zod_1.z.object({
    title: zod_1.z
        .string({ required_error: "Service title is required" })
        .min(2, "Title must be at least 2 characters long"),
    slug: zod_1.z
        .string({ required_error: "Service slug is required" })
        .min(2, "Slug must be at least 2 characters long")
        .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens")
        .optional(),
    description: zod_1.z
        .string()
        .optional(),
    images: zod_1.z
        .array(zod_1.z.string().url("Image must be a valid URL"))
        .optional(),
    included: zod_1.z
        .array(zod_1.z.string())
        .optional(),
    excluded: zod_1.z
        .array(zod_1.z.string())
        .optional(),
    amenities: zod_1.z
        .array(zod_1.z.string())
        .optional(),
    servicePlan: zod_1.z
        .array(zod_1.z.string())
        .optional(),
    subServices: zod_1.z
        .array(subServiceZodSchema)
        .optional(),
    serviceType: zod_1.z
        .string({ required_error: "Service type ID is required" })
        .refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
        message: "Invalid serviceType ObjectId",
    }),
});
// Sub-service schema for update
const updateSubServiceZodSchema = zod_1.z.object({
    title: zod_1.z
        .string()
        .min(2, "Title must be at least 2 characters long")
        .optional(),
    description: zod_1.z
        .string()
        .min(5, "Description must be at least 5 characters long")
        .optional(),
    image: zod_1.z
        .array(zod_1.z.string().url("Each image must be a valid URL"))
        .optional(),
});
// Main update service schema
exports.updateServiceZodSchema = zod_1.z.object({
    title: zod_1.z
        .string()
        .min(2, "Title must be at least 2 characters long")
        .optional(),
    slug: zod_1.z
        .string()
        .min(2, "Slug must be at least 2 characters long")
        .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens")
        .optional(),
    description: zod_1.z.string().optional(),
    images: zod_1.z.array(zod_1.z.string().url("Image must be a valid URL")).optional(),
    included: zod_1.z.array(zod_1.z.string()).optional(),
    excluded: zod_1.z.array(zod_1.z.string()).optional(),
    amenities: zod_1.z.array(zod_1.z.string()).optional(),
    servicePlan: zod_1.z.array(zod_1.z.string()).optional(),
    subServices: zod_1.z.array(updateSubServiceZodSchema).optional(),
    serviceType: zod_1.z
        .string()
        .refine((val) => (val ? mongoose_1.Types.ObjectId.isValid(val) : true), {
        message: "Invalid serviceType ObjectId",
    })
        .optional(),
    deleteImages: zod_1.z.array(zod_1.z.string()).optional()
});
