"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordZodSchema = void 0;
const zod_1 = require("zod");
exports.changePasswordZodSchema = zod_1.z.object({
    oldPassword: zod_1.z
        .string({ invalid_type_error: "Password must be string" }),
    // .min(8, { message: "Password must be at least 8 characters long." }),
    newPassword: zod_1.z
        .string({ invalid_type_error: "Password must be string" })
        .min(8, { message: "Password must be at least 8 characters long." })
});
