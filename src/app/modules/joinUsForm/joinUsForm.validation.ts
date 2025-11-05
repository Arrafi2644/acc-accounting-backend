import { z } from "zod";

export const directorZodSchema = z.object({
  name: z
    .string({ required_error: "Director name is required." })
    .min(2, "Name must be at least 2 characters long."),
  position: z
    .string({ required_error: "Position is required." })
    .min(2, "Position must be at least 2 characters long."),
  date: z
    .string({ required_error: "Date is required." })
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format."),
  ird: z
    .number({ required_error: "IRD number is required." })
    .int()
    .positive("IRD number must be positive."),
});

export const joinUsFormZodSchema = z.object({
  companyName: z
    .string({ required_error: "Company name is required." })
    .min(2, "Company name must be at least 2 characters long."),
  companyDate: z
    .string({ required_error: "Company date is required." })
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format."),
  companyIRD: z
    .number({ required_error: "Company IRD is required." })
    .int()
    .positive("Company IRD must be positive."),

  director1: directorZodSchema,
  director2: directorZodSchema,

  address: z
    .string({ required_error: "Address is required." })
    .min(5, "Address must be at least 5 characters long."),
  phoneBusiness: z
    .string({ required_error: "Business phone is required." })
    .min(6, "Phone number must be valid."),
  phoneHome: z.string().optional(),
  phoneMobile: z
    .string({ required_error: "Mobile phone is required." })
    .min(6, "Phone number must be valid."),
  email: z
    .string({ required_error: "Email is required." })
    .email("Invalid email format."),
  isHuman: z
    .boolean({ required_error: "Verification (I am human) is required." })
    .refine(val => val === true, "You must confirm you are human."),
});

export type JoinUsFormZodType = z.infer<typeof joinUsFormZodSchema>;
