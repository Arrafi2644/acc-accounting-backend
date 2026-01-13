"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinUsFormZodSchema = void 0;
const zod_1 = require("zod");
exports.joinUsFormZodSchema = zod_1.z.object({
    businessName: zod_1.z
        .string({ required_error: "Business name is required." })
        .min(2, "Business name must be at least 2 characters long."),
    directorsAndShareholders: zod_1.z
        .string({ required_error: "Directors and Shareholders field is required." })
        .min(2, "Directors and Shareholders must be at least 2 characters long."),
    irdNumber: zod_1.z
        .string({ required_error: "IRD number is required." })
        .regex(/^\d+$/, "IRD number must contain only digits"), // numeric string validation
    fullName: zod_1.z
        .string({ required_error: "Full name is required." })
        .min(2, "Full name must be at least 2 characters long."),
    phoneNumber: zod_1.z
        .string({ required_error: "Phone number is required." })
        .min(6, "Phone number must be valid."),
    emailAddress: zod_1.z
        .string({ required_error: "Email is required." })
        .email("Invalid email address."),
    authorityConsent: zod_1.z.preprocess((val) => {
        if (val === "true" || val === true)
            return true;
        if (val === "false" || val === false)
            return false;
        return false;
    }, zod_1.z.boolean({ required_error: "Authority consent is required." })),
    documents: zod_1.z
        .array(zod_1.z.string())
        .optional()
        .default([]),
});
