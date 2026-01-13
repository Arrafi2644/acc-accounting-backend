import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { ResourceControllers } from "./resources.controller";
import { createGuideArticleSchema, createToolSchema, updateGuideArticleSchema, updateToolSchema } from "./resources.validation";
const router = express.Router();

router.get("/articles", ResourceControllers.getAllGuideArticles);

router.post(
    "/articles",
    checkAuth(...Object.values(Role)),
    validateRequest(createGuideArticleSchema),
    ResourceControllers.createGuideArticle
);

router.patch(
    "/articles/:id",
    checkAuth(...Object.values(Role)),
    validateRequest(updateGuideArticleSchema),
    ResourceControllers.updateGuideArticle
);

router.delete(
    "/articles/:id",
    checkAuth(...Object.values(Role)),
    ResourceControllers.deleteGuideArticle
);

// Tools 
router.get("/tools", ResourceControllers.getAllTools);

router.post(
    "/tools",
    checkAuth(...Object.values(Role)),
    validateRequest(createToolSchema),
    ResourceControllers.createTool
);

router.patch(
    "/tools/:id",
    checkAuth(...Object.values(Role)),
    validateRequest(updateToolSchema),
    ResourceControllers.updateTool
);

router.delete(
    "/tools/:id",
    checkAuth(...Object.values(Role)),
    ResourceControllers.deleteTool
);

export const ResourceRoutes = router;
