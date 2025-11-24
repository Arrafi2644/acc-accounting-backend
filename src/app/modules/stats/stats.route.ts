import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { StatsController } from "./stats.controller";

const router = express.Router();

router.get('/joining-requests', checkAuth(...Object.values(Role)), StatsController.getJoiningRequestStats)

export const stateRoutes = router;

