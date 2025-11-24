"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageFormRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middlewares/validateRequest");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const message_validation_1 = require("./message.validation");
const message_controller_1 = require("./message.controller");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.validateRequest)(message_validation_1.MessageFormZodSchema), message_controller_1.MessageFormControllers.submitMessageForm);
router.get('/:id', (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), message_controller_1.MessageFormControllers.getSingleMessage);
router.delete('/:id', (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), message_controller_1.MessageFormControllers.deleteMessage);
router.get('/', (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), message_controller_1.MessageFormControllers.getAllMessageForm);
exports.messageFormRoutes = router;
