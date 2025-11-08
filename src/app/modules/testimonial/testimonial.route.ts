import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { createTestimonialZodSchema, updateTestimonialZodSchema } from "./testimonial.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { TestimonialControllers } from "./testimonial.controller";

const router = express.Router();

router.get("/", TestimonialControllers.getAllTestimonials);

router.post(
  "/",
  validateRequest(createTestimonialZodSchema),
  TestimonialControllers.createTestimonial
);

router.patch(
  "/:id",
  checkAuth(...Object.values(Role)),
  validateRequest(updateTestimonialZodSchema),
  TestimonialControllers.updateTestimonial
);

router.delete(
  "/:id",
  checkAuth(Role.ADMIN),
  TestimonialControllers.deleteTestimonial
);

export const testimonialRoutes = router;
