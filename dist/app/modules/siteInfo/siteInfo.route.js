"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.siteInfoRoutes = void 0;
const express_1 = __importDefault(require("express"));
const siteInfo_controller_1 = require("./siteInfo.controller");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const multer_config_1 = require("../../config/multer.config");
const router = express_1.default.Router();
router.get('/', siteInfo_controller_1.SiteInfoControllers.getSiteInfo);
// Create SiteInfo
router.post("/", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), // protect route for all roles (adjust if needed)
multer_config_1.multerUpload.fields([
    { name: "mainLogo", maxCount: 1 },
    { name: "faviconLogo", maxCount: 1 },
    { name: "footerLogo", maxCount: 1 },
]), siteInfo_controller_1.SiteInfoControllers.createSiteInfo);
// Update SiteInfo
router.patch("/", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), // protect route
multer_config_1.multerUpload.fields([
    { name: "mainLogo", maxCount: 1 },
    { name: "faviconLogo", maxCount: 1 },
    { name: "footerLogo", maxCount: 1 },
]), siteInfo_controller_1.SiteInfoControllers.updateSiteInfo);
exports.siteInfoRoutes = router;
