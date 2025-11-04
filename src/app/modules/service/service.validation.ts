import { z } from "zod";

export const createServiceTypeZodSchema = z.object({
     name: z
        .string({ invalid_type_error: "Service type must be string" })
        .min(2, { message: "Service type must be at least 2 characters long." })
        .max(50, { message: "Service type cannot exceed 50 characters." })
});