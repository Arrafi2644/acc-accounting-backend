import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema } from "./user.validation";
import { UserControllers } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";
const router = express.Router();

router.post('/register',validateRequest(createUserZodSchema), UserControllers.createUser)
router.get('/me', checkAuth(...Object.values(Role)), UserControllers.getMe)
router.get('/', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), UserControllers.getAllUser)

export const userRoutes = router;

