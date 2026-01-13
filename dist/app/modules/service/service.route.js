"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const service_controller_1 = require("./service.controller");
const multer_config_1 = require("../../config/multer.config");
const router = express_1.default.Router();
router.post("/create-service", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), multer_config_1.multerUpload.fields([
    { name: "serviceImage", maxCount: 1 },
]), service_controller_1.ServiceControllers.createService);
router.patch("/update-service/:id", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), multer_config_1.multerUpload.fields([
    { name: "serviceImage", maxCount: 1 },
]), service_controller_1.ServiceControllers.updateService);
router.get("/:slug", service_controller_1.ServiceControllers.getSingleService);
router.get("/", service_controller_1.ServiceControllers.getAllServices);
router.delete("/:id", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), service_controller_1.ServiceControllers.deleteService);
exports.serviceRoutes = router;
