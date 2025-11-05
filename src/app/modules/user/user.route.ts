import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import { UserControllers } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";
import { multerUpload } from "../../config/multer.config";
const router = express.Router();

router.post('/register',validateRequest(createUserZodSchema), UserControllers.createUser)
router.get('/me', checkAuth(...Object.values(Role)), UserControllers.getMe)
router.get('/', checkAuth(Role.ADMIN), UserControllers.getAllUser)
router.get("/:id", checkAuth(Role.ADMIN), UserControllers.getSingleUser )
router.patch("/:id",
    multerUpload.single("file"),
     validateRequest(updateUserZodSchema), 
      checkAuth(...Object.values(Role)),
       UserControllers.updateUser)

export const userRoutes = router;

