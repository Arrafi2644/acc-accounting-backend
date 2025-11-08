"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserZodSchema = exports.createUserZodSchema = void 0;
const zod_1 = require("zod");
const user_interface_1 = require("./user.interface");
exports.createUserZodSchema = zod_1.z.object({
    name: zod_1.z
        .string({ invalid_type_error: "Name must be string" })
        .min(2, { message: "Name must be at least 2 characters long." })
        .max(50, { message: "Name cannot exceed 50 characters." }),
    email: zod_1.z
        .string({ invalid_type_error: "Email must be string" })
        .email({ message: "Invalid email address format." })
        .min(5, { message: "Email must be at least 5 characters long." })
        .max(100, { message: "Email cannot exceed 100 characters." }),
    password: zod_1.z
        .string({ invalid_type_error: "Password must be string" })
        .min(8, { message: "Password must be at least 8 characters long." })
    // .regex(/^(?=.*[A-Z])/, {
    //     message: "Password must contain at least 1 uppercase letter.",
    // })
    // .regex(/^(?=.*[!@#$%^&*])/, {
    //     message: "Password must contain at least 1 special character.",
    // })
    // .regex(/^(?=.*\d)/, {
    //     message: "Password must contain at least 1 number.",
    // })
    ,
    phone: zod_1.z
        .string({ invalid_type_error: "Phone Number must be string" })
        .regex(/^(?:\+64|0)[1-9]\d{7,9}$/, {
        message: "Phone number must be valid for New Zealand. Format: +64XXXXXXXXX or 0XXXXXXXXX",
    })
        .optional(),
    role: zod_1.z
        .enum([user_interface_1.Role.ADMIN, user_interface_1.Role.EDITOR], {
        invalid_type_error: "Role must be either ADMIN or EDITOR",
    })
        .optional(),
});
exports.updateUserZodSchema = zod_1.z.object({
    name: zod_1.z
        .string({ invalid_type_error: "Name must be string" })
        .min(2, { message: "Name must be at least 2 characters long." })
        .max(50, { message: "Name cannot exceed 50 characters." }).optional(),
    phone: zod_1.z
        .string({ invalid_type_error: "Phone Number must be string" })
        .regex(/^(?:\+64|0)[1-9]\d{7,9}$/, {
        message: "Phone number must be valid for New Zealand. Format: +64XXXXXXXXX or 0XXXXXXXXX",
    })
        .optional(),
    role: zod_1.z.enum([user_interface_1.Role.ADMIN, user_interface_1.Role.EDITOR], {
        invalid_type_error: "Role must be either ADMIN or EDITOR",
    }).optional(),
    isActive: zod_1.z
        .enum(Object.values(user_interface_1.IsActive))
        .optional(),
    isDeleted: zod_1.z
        .boolean({ invalid_type_error: "isDeleted must be true or false" })
        .optional(),
    isVerified: zod_1.z
        .boolean({ invalid_type_error: "isVerified must be true or false" })
        .optional(),
    password: zod_1.z
        .string({ invalid_type_error: "Password must be string" })
        .min(8, { message: "Password must be at least 8 characters long." })
        .optional(),
    picture: zod_1.z
        .string({ invalid_type_error: "Picture must be string" })
        .optional(),
});
