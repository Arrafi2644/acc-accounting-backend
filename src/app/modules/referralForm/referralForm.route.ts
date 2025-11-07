import express from "express";

import { ReferralFormControllers } from "./referralForm.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { ReferralFormZodSchema } from "./referralForm.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = express.Router();

router.post('/', validateRequest(ReferralFormZodSchema), ReferralFormControllers.submitReferralForm)
router.get('/', checkAuth(...Object.values(Role)), ReferralFormControllers.getAllReferralForm)

export const referralFormRoutes = router;

