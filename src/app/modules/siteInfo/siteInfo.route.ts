import express from "express";
import { SiteInfoControllers } from "./siteInfo.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { multerUpload } from "../../config/multer.config";

const router = express.Router();

router.get('/', SiteInfoControllers.getSiteInfo);

// Create SiteInfo
router.post(
  "/",
  checkAuth(...Object.values(Role)), // protect route for all roles (adjust if needed)
  multerUpload.fields([
    { name: "mainLogo", maxCount: 1 },
    { name: "faviconLogo", maxCount: 1 },
    { name: "footerLogo", maxCount: 1 },
  ]),
  SiteInfoControllers.createSiteInfo
);

// Update SiteInfo
router.patch(
  "/",
  checkAuth(...Object.values(Role)), // protect route
  multerUpload.fields([
    { name: "mainLogo", maxCount: 1 },
    { name: "faviconLogo", maxCount: 1 },
    { name: "footerLogo", maxCount: 1 },
  ]),
  SiteInfoControllers.updateSiteInfo
);
export const siteInfoRoutes = router;
