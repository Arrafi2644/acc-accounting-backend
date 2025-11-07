import { z } from "zod";

export const ReferralFormZodSchema = z.object({
  referralName: z
    .string({ required_error: "Referral Name is required" })
    .min(1, "Referral Name cannot be empty"),
    
  yourName: z
    .string({ required_error: "Your Name is required" })
    .min(1, "Your Name cannot be empty"),

  referralEmail: z
    .string({ required_error: "Referral Email is required" })
    .email("Invalid email address"),

  yourEmail: z
    .string({ required_error: "Your Email is required" })
    .email("Invalid email address"),

  referralPhone: z
    .string({ required_error: "Referral Phone is required" })
    .min(5, "Referral Phone seems too short"), // optional: adjust min length

  helpDescription: z
    .string({ required_error: "Help Description is required" })
    .min(1, "Help Description cannot be empty"),

  referralAddress: z
    .string({ required_error: "Referral Address is required" })
    .min(1, "Referral Address cannot be empty"),

  referralSuburb: z
    .string()
    .optional(),

  isHuman: z
    .boolean({ required_error: "Please confirm you are human" }),
});
