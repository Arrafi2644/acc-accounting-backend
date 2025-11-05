import express from "express";
import { JoinUsFormControllers } from "./joinUsForm.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { joinUsFormZodSchema } from "./joinUsForm.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = express.Router();

router.post('/', validateRequest(joinUsFormZodSchema), JoinUsFormControllers.submitJoinUsForm)
router.get('/', checkAuth(Role.ADMIN), JoinUsFormControllers.getAllSubmittedFormData)

export const joinUsFormRoutes = router;

