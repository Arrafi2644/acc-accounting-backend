import express from "express";

import { ReferralFormControllers } from "./referralForm.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { ReferralFormZodSchema } from "./referralForm.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = express.Router();

router.post('/', validateRequest(ReferralFormZodSchema), ReferralFormControllers.submitReferralForm)
router.get('/:id', checkAuth(Role.ADMIN), ReferralFormControllers.getSingleReferralForm)
router.delete('/:id', checkAuth(Role.ADMIN), ReferralFormControllers.deleteReferralForm)
router.get('/', checkAuth(Role.ADMIN), ReferralFormControllers.getAllReferralForm)

export const referralFormRoutes = router;

