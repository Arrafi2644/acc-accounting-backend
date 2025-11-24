import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";
import { serviceRoutes } from "../modules/service/service.route";
import { joinUsFormRoutes } from "../modules/joinUsForm/joinUsForm.route";
import { referralFormRoutes } from "../modules/referralForm/referralForm.route";
import { messageFormRoutes } from "../modules/message/message.route";
import { siteInfoRoutes } from "../modules/siteInfo/siteInfo.route";
import { testimonialRoutes } from "../modules/testimonial/testimonial.route";
import { seoRoutes } from "../modules/seo/seo.route";
import { stateRoutes } from "../modules/stats/stats.route";

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
    },
     {
        path: "/referral-form",
        route: referralFormRoutes
    },
    {
        path: "/message",
        route: messageFormRoutes
    },
    {
         path: "/site-info",
        route: siteInfoRoutes
    },
    {
        path: "/testimonial",
        route: testimonialRoutes
    },
     {
        path: "/seo",
        route: seoRoutes
    },
     {
        path: "/stats",
        route: stateRoutes
    }

]

moduleRoutes.forEach(route => {
    router.use(route.path, route.route)
})