"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.siteInfoRoutes = void 0;
const express_1 = __importDefault(require("express"));
const siteInfo_controller_1 = require("./siteInfo.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const siteInfo_validation_1 = require("./siteInfo.validation"); // your Zod schema
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const router = express_1.default.Router();
router.get('/', siteInfo_controller_1.SiteInfoControllers.getSiteInfo);
router.post('/', (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), (0, validateRequest_1.validateRequest)(siteInfo_validation_1.siteInfoZodSchema), siteInfo_controller_1.SiteInfoControllers.createSiteInfo);
router.patch('/', (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), (0, validateRequest_1.validateRequest)(siteInfo_validation_1.siteInfoZodSchema), siteInfo_controller_1.SiteInfoControllers.updateSiteInfo);
exports.siteInfoRoutes = router;
