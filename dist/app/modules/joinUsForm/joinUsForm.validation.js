"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinUsFormZodSchema = exports.directorZodSchema = void 0;
const zod_1 = require("zod");
exports.directorZodSchema = zod_1.z.object({
    name: zod_1.z
        .string({ required_error: "Director name is required." })
        .min(2, "Name must be at least 2 characters long."),
    position: zod_1.z
        .string({ required_error: "Position is required." })
        .min(2, "Position must be at least 2 characters long."),
    date: zod_1.z
        .string({ required_error: "Date is required." })
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format."),
    ird: zod_1.z
        .number({ required_error: "IRD number is required." })
        .int()
        .positive("IRD number must be positive."),
});
exports.joinUsFormZodSchema = zod_1.z.object({
    companyName: zod_1.z
        .string({ required_error: "Company name is required." })
        .min(2, "Company name must be at least 2 characters long."),
    companyDate: zod_1.z
        .string({ required_error: "Company date is required." })
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format."),
    companyIRD: zod_1.z
        .number({ required_error: "Company IRD is required." })
        .int()
        .positive("Company IRD must be positive."),
    director1: exports.directorZodSchema,
    director2: exports.directorZodSchema,
    address: zod_1.z
        .string({ required_error: "Address is required." })
        .min(5, "Address must be at least 5 characters long."),
    phoneBusiness: zod_1.z
        .string({ required_error: "Business phone is required." })
        .min(6, "Phone number must be valid."),
    phoneHome: zod_1.z.string().optional(),
    phoneMobile: zod_1.z
        .string({ required_error: "Mobile phone is required." })
        .min(6, "Phone number must be valid."),
    email: zod_1.z
        .string({ required_error: "Email is required." })
        .email("Invalid email format."),
    isHuman: zod_1.z
        .boolean({ required_error: "Verification (I am human) is required." })
        .refine(val => val === true, "You must confirm you are human."),
});
