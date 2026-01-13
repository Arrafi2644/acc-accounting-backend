"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageFormZodSchema = void 0;
const zod_1 = require("zod");
exports.MessageFormZodSchema = zod_1.z.object({
    fullName: zod_1.z
        .string({ required_error: "Full name is required" })
        .min(2, "Full name must be at least 2 characters long"),
    email: zod_1.z
        .string({ required_error: "Email is required" })
        .email("Invalid email address"),
    phone: zod_1.z
        .string({ required_error: "Phone number is required" })
        .min(5, "Phone number seems too short")
        .optional(),
    message: zod_1.z
        .string({ required_error: "Message is required" })
        .min(5, "Message must be at least 5 characters long"),
    subject: zod_1.z
        .string({ required_error: "Subject is required" })
        .min(2, "Subject must be at least 2 characters long"),
    isHuman: zod_1.z
        .boolean({ required_error: "Please confirm you are human" })
        .optional(),
});
