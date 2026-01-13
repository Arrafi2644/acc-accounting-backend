import { z } from "zod";

export const MessageFormZodSchema = z.object({
  fullName: z
    .string({ required_error: "Full name is required" })
    .min(2, "Full name must be at least 2 characters long"),

  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),

  phone: z
    .string({ required_error: "Phone number is required" })
    .min(5, "Phone number seems too short")
    .optional(),

  message: z
    .string({ required_error: "Message is required" })
    .min(5, "Message must be at least 5 characters long"),

  subject: z
    .string({ required_error: "Subject is required" })
    .min(2, "Subject must be at least 2 characters long"),

  isHuman: z
    .boolean({ required_error: "Please confirm you are human" })
    .optional(),
});
