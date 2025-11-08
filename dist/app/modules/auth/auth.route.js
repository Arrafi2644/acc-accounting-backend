"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const validateRequest_1 = require("../../middlewares/validateRequest");
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
router.post('/login', auth_controller_1.AuthControllers.credentialLogin);
router.post('/logout', auth_controller_1.AuthControllers.logout);
router.post("/refresh-token", auth_controller_1.AuthControllers.getNewAccessToken);
router.post("/change-password", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), (0, validateRequest_1.validateRequest)(auth_validation_1.changePasswordZodSchema), auth_controller_1.AuthControllers.changePassword);
exports.authRoutes = router;
