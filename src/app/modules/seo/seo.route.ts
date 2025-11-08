import express from "express";
import { SEOControllers } from "./seo.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { createSEOZodSchema, updateSEOZodSchema } from "./seo.validation";

const router = express.Router();

router.get('/:pagePath', SEOControllers.getSEO);
router.post(
    '/',
    checkAuth(...Object.values(Role)),
    validateRequest(createSEOZodSchema),
    SEOControllers.createSEO
);

router.patch(
    '/:pagePath',
    checkAuth(...Object.values(Role)),
    validateRequest(updateSEOZodSchema),
    SEOControllers.updateSEO
);

router.delete(
    '/:pagePath',
    checkAuth(...Object.values(Role)),
    SEOControllers.deleteSEO
);

export const seoRoutes = router;
