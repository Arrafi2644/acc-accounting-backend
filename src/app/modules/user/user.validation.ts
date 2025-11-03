import { z } from "zod";

export const createUserZodSchema = z.object({
    name: z
        .string({ invalid_type_error: "Name must be string" })
        .min(2, { message: "Name must be at least 2 characters long." })
        .max(50, { message: "Name cannot exceed 50 characters." }),
    email: z
        .string({ invalid_type_error: "Email must be string" })
        .email({ message: "Invalid email address format." })
        .min(5, { message: "Email must be at least 5 characters long." })
        .max(100, { message: "Email cannot exceed 100 characters." }),
    password: z
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
    phone: z
        .string({ invalid_type_error: "Phone Number must be string" })
        .regex(/^(?:\+64|0)[1-9]\d{7,9}$/, {
            message: "Phone number must be valid for New Zealand. Format: +64XXXXXXXXX or 0XXXXXXXXX",
        })
        .optional()
})

