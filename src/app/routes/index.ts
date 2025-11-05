import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";
import { serviceRoutes } from "../modules/service/service.route";
import { joinUsFormRoutes } from "../modules/joinUsForm/joinUsForm.route";

export const router = Router();

const moduleRoutes = [
    {
        path: "/user",
        route: userRoutes
    },
    {
        path: "/auth",
        route: authRoutes
    },
    {
        path: "/service",
        route: serviceRoutes
    },
    {
        path: "/join-us-form",
        route: joinUsFormRoutes
    }
]

moduleRoutes.forEach(route => {
    router.use(route.path, route.route)
})