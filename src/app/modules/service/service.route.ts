import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { createServiceTypeZodSchema } from "./service.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { ServiceControllers } from "./service.controller";

const router = express.Router();

router.post('/create-service-type', validateRequest(createServiceTypeZodSchema), checkAuth(Role.ADMIN), ServiceControllers.createServiceType)
router.get('/service-types', ServiceControllers.getAllServiceTypes)

router.patch("/service-types/:id", checkAuth(Role.ADMIN), validateRequest(createServiceTypeZodSchema), ServiceControllers.updateServiceType);

router.delete("/service-types/:id", checkAuth(Role.ADMIN), ServiceControllers.deleteServiceType);
export const serviceRoutes = router;

