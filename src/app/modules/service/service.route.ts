import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { ServiceControllers } from "./service.controller";
import { multerUpload } from "../../config/multer.config";

const router = express.Router();

router.post(
    "/create-service",
    checkAuth(...Object.values(Role)),
    multerUpload.fields([
        { name: "serviceImage", maxCount: 1 },
    ]),
    ServiceControllers.createService
);

router.patch(
    "/update-service/:id",
    checkAuth(...Object.values(Role)),
    multerUpload.fields([
        { name: "serviceImage", maxCount: 1 },
    ]),
    ServiceControllers.updateService
);

router.get("/:slug", ServiceControllers.getSingleService)
router.get("/", ServiceControllers.getAllServices)
router.delete("/:id", checkAuth(...Object.values(Role)), ServiceControllers.deleteService)

export const serviceRoutes = router;

