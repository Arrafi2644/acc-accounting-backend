import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { multerUpload } from "../../config/multer.config";
import { createNewsletterSchema } from "./newsletter.validation";
import { NewsletterControllers } from "./newsletter.controller";

const router = express.Router();

router.post("/",
    multerUpload.array("files"),
     validateRequest(createNewsletterSchema), 
       NewsletterControllers.createNewsletter);

router.delete('/:id', checkAuth(Role.ADMIN), NewsletterControllers.deleteNewsletter)
router.get('/', checkAuth(Role.ADMIN), NewsletterControllers.getAllNewsletters)

export const newsletterRoutes = router;

