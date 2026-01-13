import express from "express";
import { JoinUsFormControllers } from "./joinUsForm.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { joinUsFormZodSchema } from "./joinUsForm.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { multerUpload } from "../../config/multer.config";

const router = express.Router();

router.post("/",
    multerUpload.array("files"),
     validateRequest(joinUsFormZodSchema), 
       JoinUsFormControllers.submitJoinUsForm);

router.get('/:id', checkAuth(Role.ADMIN), JoinUsFormControllers.getSingleJoinUsForm)
router.delete('/:id', checkAuth(Role.ADMIN), JoinUsFormControllers.deleteJoinUsForm)
router.get('/', checkAuth(Role.ADMIN), JoinUsFormControllers.getAllSubmittedFormData)

export const joinUsFormRoutes = router;

