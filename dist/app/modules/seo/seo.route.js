"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seoRoutes = void 0;
const express_1 = __importDefault(require("express"));
const seo_controller_1 = require("./seo.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const seo_validation_1 = require("./seo.validation");
const router = express_1.default.Router();
router.get('/:pagePath', seo_controller_1.SEOControllers.getSEO);
router.post('/', (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), (0, validateRequest_1.validateRequest)(seo_validation_1.createSEOZodSchema), seo_controller_1.SEOControllers.createSEO);
router.patch('/:pagePath', (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), (0, validateRequest_1.validateRequest)(seo_validation_1.updateSEOZodSchema), seo_controller_1.SEOControllers.updateSEO);
router.delete('/:pagePath', (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), seo_controller_1.SEOControllers.deleteSEO);
exports.seoRoutes = router;
