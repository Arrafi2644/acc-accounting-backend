"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateServiceZodSchema = exports.createServiceZodSchema = void 0;
const zod_1 = require("zod");
/* ================= Banner ================= */
const bannerZodSchema = zod_1.z.object({
    title: zod_1.z.string().min(2),
    subtitle: zod_1.z.string().min(2),
});
/* ================= Service Overview ================= */
const serviceOverviewZodSchema = zod_1.z.object({
    title: zod_1.z.string().min(2),
    description: zod_1.z.string().min(5),
    features: zod_1.z.array(zod_1.z.string()).optional(),
    serviceImage: zod_1.z.string().url("Service image must be a valid URL"),
});
/* ================= Feature ================= */
const featureZodSchema = zod_1.z.object({
    title: zod_1.z.string().min(2),
    description: zod_1.z.string().min(5),
    icon: zod_1.z.string(),
});
/* ================= Service Matter ================= */
const serviceMatterZodSchema = zod_1.z.object({
    matterSectionTitle: zod_1.z.string().min(2),
    matterSectionSubTitle: zod_1.z.string().min(2),
    withoutSaaS: zod_1.z.object({
        badgeTitle: zod_1.z.string().min(2),
        badgeIcon: zod_1.z.string(),
        title: zod_1.z.string().min(2),
        items: zod_1.z
            .array(zod_1.z.object({
            icon: zod_1.z.string(),
            text: zod_1.z.string().min(2),
        }))
            .nonempty(),
    }),
    withSaaS: zod_1.z.object({
        badgeTitle: zod_1.z.string().min(2),
        badgeIcon: zod_1.z.string(),
        title: zod_1.z.string().min(2),
        items: zod_1.z
            .array(zod_1.z.object({
            icon: zod_1.z.string(),
            text: zod_1.z.string().min(2),
        }))
            .nonempty(),
    }),
});
/* ================= Process Step ================= */
const processStepZodSchema = zod_1.z.object({
    stepNumber: zod_1.z.number().min(1),
    title: zod_1.z.string().min(2),
    description: zod_1.z.string().min(5),
    icon: zod_1.z.string(),
});
/* ================= Requirement Doc ================= */
const requirementDocZodSchema = zod_1.z.object({
    title: zod_1.z.string().min(2),
    icon: zod_1.z.string(),
});
/* ================= FAQ ================= */
const faqZodSchema = zod_1.z.object({
    question: zod_1.z.string().min(2),
    answer: zod_1.z.string().min(5),
});
/* ================= CREATE SERVICE ================= */
exports.createServiceZodSchema = zod_1.z.object({
    title: zod_1.z.string().min(2),
    slug: zod_1.z
        .string()
        .regex(/^[a-z0-9-]+$/, "Slug must contain lowercase letters, numbers and hyphens")
        .optional(),
    serviceSummary: zod_1.z.string().min(5),
    shortDescription: zod_1.z.string().min(5),
    serviceIcon: zod_1.z.string(),
    banner: bannerZodSchema,
    overView: serviceOverviewZodSchema,
    serviceMatter: serviceMatterZodSchema,
    features: zod_1.z.array(featureZodSchema).nonempty(),
    processSteps: zod_1.z.array(processStepZodSchema).nonempty(),
    requirementDocs: zod_1.z.array(requirementDocZodSchema).nonempty(),
    faqs: zod_1.z.array(faqZodSchema).nonempty(),
});
/* ================= UPDATE SERVICE ================= */
exports.updateServiceZodSchema = zod_1.z.object({
    title: zod_1.z.string().min(2).optional(),
    slug: zod_1.z
        .string()
        .regex(/^[a-z0-9-]+$/)
        .optional(),
    serviceSummary: zod_1.z.string().optional(),
    shortDescription: zod_1.z.string().optional(),
    serviceIcon: zod_1.z.string().optional(),
    banner: bannerZodSchema.optional(),
    overView: serviceOverviewZodSchema.optional(),
    serviceMatter: serviceMatterZodSchema.optional(),
    features: zod_1.z.array(featureZodSchema).optional(),
    processSteps: zod_1.z.array(processStepZodSchema).optional(),
    requirementDocs: zod_1.z.array(requirementDocZodSchema).optional(),
    faqs: zod_1.z.array(faqZodSchema).optional(),
});
