"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testimonialRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middlewares/validateRequest");
const testimonial_validation_1 = require("./testimonial.validation");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const testimonial_controller_1 = require("./testimonial.controller");
const router = express_1.default.Router();
router.get("/", testimonial_controller_1.TestimonialControllers.getAllTestimonials);
router.post("/", (0, validateRequest_1.validateRequest)(testimonial_validation_1.createTestimonialZodSchema), testimonial_controller_1.TestimonialControllers.createTestimonial);
router.patch("/:id", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), (0, validateRequest_1.validateRequest)(testimonial_validation_1.updateTestimonialZodSchema), testimonial_controller_1.TestimonialControllers.updateTestimonial);
router.delete("/:id", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), testimonial_controller_1.TestimonialControllers.deleteTestimonial);
exports.testimonialRoutes = router;
