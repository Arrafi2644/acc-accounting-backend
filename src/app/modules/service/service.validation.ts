
import { z } from "zod";

/* ================= Banner ================= */
const bannerZodSchema = z.object({
  title: z.string().min(2),
  subtitle: z.string().min(2),
});

/* ================= Service Overview ================= */
const serviceOverviewZodSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(5),
  features: z.array(z.string()).optional(),
  serviceImage: z.string().url("Service image must be a valid URL"),
});

/* ================= Feature ================= */
const featureZodSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(5),
  icon: z.string(),
});

/* ================= Service Matter ================= */
const serviceMatterZodSchema = z.object({
  matterSectionTitle: z.string().min(2),
  matterSectionSubTitle: z.string().min(2),

  withoutSaaS: z.object({
    badgeTitle: z.string().min(2),
    badgeIcon: z.string(),
    title: z.string().min(2),
    items: z
      .array(
        z.object({
          icon: z.string(),
          text: z.string().min(2),
        })
      )
      .nonempty(),
  }),

  withSaaS: z.object({
    badgeTitle: z.string().min(2),
    badgeIcon: z.string(),
    title: z.string().min(2),
    items: z
      .array(
        z.object({
          icon: z.string(),
          text: z.string().min(2),
        })
      )
      .nonempty(),
  }),
});

/* ================= Process Step ================= */
const processStepZodSchema = z.object({
  stepNumber: z.number().min(1),
  title: z.string().min(2),
  description: z.string().min(5),
  icon: z.string(),
});

/* ================= Requirement Doc ================= */
const requirementDocZodSchema = z.object({
  title: z.string().min(2),
  icon: z.string(),
});

/* ================= FAQ ================= */
const faqZodSchema = z.object({
  question: z.string().min(2),
  answer: z.string().min(5),
});

/* ================= CREATE SERVICE ================= */
export const createServiceZodSchema = z.object({
  title: z.string().min(2),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, "Slug must contain lowercase letters, numbers and hyphens")
    .optional(),

  serviceSummary: z.string().min(5),
  shortDescription: z.string().min(5),
  serviceIcon: z.string(),

  banner: bannerZodSchema,
  overView: serviceOverviewZodSchema,
  serviceMatter: serviceMatterZodSchema,

  features: z.array(featureZodSchema).nonempty(),
  processSteps: z.array(processStepZodSchema).nonempty(),
  requirementDocs: z.array(requirementDocZodSchema).nonempty(),
  faqs: z.array(faqZodSchema).nonempty(),
});

/* ================= UPDATE SERVICE ================= */
export const updateServiceZodSchema = z.object({
  title: z.string().min(2).optional(),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/)
    .optional(),

  serviceSummary: z.string().optional(),
  shortDescription: z.string().optional(),
  serviceIcon: z.string().optional(),

  banner: bannerZodSchema.optional(),
  overView: serviceOverviewZodSchema.optional(),
  serviceMatter: serviceMatterZodSchema.optional(),

  features: z.array(featureZodSchema).optional(),
  processSteps: z.array(processStepZodSchema).optional(),
  requirementDocs: z.array(requirementDocZodSchema).optional(),
  faqs: z.array(faqZodSchema).optional(),
});
