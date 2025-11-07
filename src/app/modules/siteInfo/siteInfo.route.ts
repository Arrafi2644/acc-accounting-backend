import express from "express";
import { SiteInfoControllers } from "./siteInfo.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { siteInfoZodSchema } from "./siteInfo.validation"; // your Zod schema
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = express.Router();

router.get('/', SiteInfoControllers.getSiteInfo);

router.post(
    '/',
    checkAuth(...Object.values(Role)),
    validateRequest(siteInfoZodSchema),
    SiteInfoControllers.createSiteInfo
);

router.patch(
    '/',
    checkAuth(...Object.values(Role)),
    validateRequest(siteInfoZodSchema),
    SiteInfoControllers.updateSiteInfo
);

export const siteInfoRoutes = router;
