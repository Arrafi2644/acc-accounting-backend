"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferralFormZodSchema = void 0;
const zod_1 = require("zod");
exports.ReferralFormZodSchema = zod_1.z.object({
    referralName: zod_1.z
        .string({ required_error: "Referral Name is required" })
        .min(1, "Referral Name cannot be empty"),
    yourName: zod_1.z
        .string({ required_error: "Your Name is required" })
        .min(1, "Your Name cannot be empty"),
    referralEmail: zod_1.z
        .string({ required_error: "Referral Email is required" })
        .email("Invalid email address"),
    yourEmail: zod_1.z
        .string({ required_error: "Your Email is required" })
        .email("Invalid email address"),
    referralPhone: zod_1.z
        .string({ required_error: "Referral Phone is required" })
        .min(5, "Referral Phone seems too short"), // optional: adjust min length
    helpDescription: zod_1.z
        .string({ required_error: "Help Description is required" })
        .min(1, "Help Description cannot be empty"),
    referralAddress: zod_1.z
        .string({ required_error: "Referral Address is required" })
        .min(1, "Referral Address cannot be empty"),
    referralSuburb: zod_1.z
        .string()
        .optional(),
    isHuman: zod_1.z
        .boolean({ required_error: "Please confirm you are human" }),
});
