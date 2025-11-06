import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { createServiceTypeZodSchema, createServiceZodSchema, updateServiceZodSchema } from "./service.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { ServiceControllers } from "./service.controller";
import { multerUpload } from "../../config/multer.config";

const router = express.Router();

router.post('/create-service-type', validateRequest(createServiceTypeZodSchema), checkAuth(Role.ADMIN), ServiceControllers.createServiceType)
router.get('/service-types', ServiceControllers.getAllServiceTypes)
router.patch("/service-types/:id", checkAuth(Role.ADMIN), validateRequest(createServiceTypeZodSchema), ServiceControllers.updateServiceType);
router.delete("/service-types/:id", checkAuth(Role.ADMIN), ServiceControllers.deleteServiceType);
router.post( "/create-service",
    checkAuth(...Object.values(Role)),
    multerUpload.array("files"),
    validateRequest(createServiceZodSchema),
    ServiceControllers.createService
);
router.patch( "/update-service/:id",
    checkAuth(...Object.values(Role)),
    multerUpload.array("files"),
    validateRequest(updateServiceZodSchema),
    ServiceControllers.updateService
);
router.get("/:id", ServiceControllers.getSingleService)

export const serviceRoutes = router;

