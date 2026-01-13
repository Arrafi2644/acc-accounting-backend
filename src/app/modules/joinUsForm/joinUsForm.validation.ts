
import { z } from "zod";

export const joinUsFormZodSchema = z.object({
  businessName: z
    .string({ required_error: "Business name is required." })
    .min(2, "Business name must be at least 2 characters long."),

  directorsAndShareholders: z
    .string({ required_error: "Directors and Shareholders field is required." })
    .min(2, "Directors and Shareholders must be at least 2 characters long."),

  irdNumber: z
    .string({ required_error: "IRD number is required." })
    .regex(/^\d+$/, "IRD number must contain only digits"), // numeric string validation

  fullName: z
    .string({ required_error: "Full name is required." })
    .min(2, "Full name must be at least 2 characters long."),

  phoneNumber: z
    .string({ required_error: "Phone number is required." })
    .min(6, "Phone number must be valid."),

  emailAddress: z
    .string({ required_error: "Email is required." })
    .email("Invalid email address."),

  authorityConsent: z.preprocess(
    (val) => {
      if (val === "true" || val === true) return true;
      if (val === "false" || val === false) return false;
      return false;
    },
    z.boolean({ required_error: "Authority consent is required." })
  ),
  documents: z
    .array(z.string())
    .optional()
    .default([]),
});

export type JoinUsFormZodType = z.infer<typeof joinUsFormZodSchema>;
