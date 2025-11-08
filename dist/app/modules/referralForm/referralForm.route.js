"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.referralFormRoutes = void 0;
const express_1 = __importDefault(require("express"));
const referralForm_controller_1 = require("./referralForm.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const referralForm_validation_1 = require("./referralForm.validation");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.validateRequest)(referralForm_validation_1.ReferralFormZodSchema), referralForm_controller_1.ReferralFormControllers.submitReferralForm);
router.get('/', (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), referralForm_controller_1.ReferralFormControllers.getAllReferralForm);
exports.referralFormRoutes = router;
