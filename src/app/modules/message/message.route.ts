import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { MessageFormZodSchema } from "./message.validation";
import { MessageFormControllers } from "./message.controller";

const router = express.Router();

router.post('/', validateRequest(MessageFormZodSchema), MessageFormControllers.submitMessageForm);
router.get('/', checkAuth(...Object.values(Role)), MessageFormControllers.getAllMessageForm);

export const messageFormRoutes = router;
