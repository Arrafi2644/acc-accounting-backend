"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinUsFormRoutes = void 0;
const express_1 = __importDefault(require("express"));
const joinUsForm_controller_1 = require("./joinUsForm.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const joinUsForm_validation_1 = require("./joinUsForm.validation");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const multer_config_1 = require("../../config/multer.config");
const router = express_1.default.Router();
router.post("/", multer_config_1.multerUpload.array("files"), (0, validateRequest_1.validateRequest)(joinUsForm_validation_1.joinUsFormZodSchema), joinUsForm_controller_1.JoinUsFormControllers.submitJoinUsForm);
router.get('/:id', (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), joinUsForm_controller_1.JoinUsFormControllers.getSingleJoinUsForm);
router.delete('/:id', (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), joinUsForm_controller_1.JoinUsFormControllers.deleteJoinUsForm);
router.get('/', (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), joinUsForm_controller_1.JoinUsFormControllers.getAllSubmittedFormData);
exports.joinUsFormRoutes = router;
