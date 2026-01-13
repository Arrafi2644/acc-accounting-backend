"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const service_route_1 = require("../modules/service/service.route");
const joinUsForm_route_1 = require("../modules/joinUsForm/joinUsForm.route");
const referralForm_route_1 = require("../modules/referralForm/referralForm.route");
const message_route_1 = require("../modules/message/message.route");
const siteInfo_route_1 = require("../modules/siteInfo/siteInfo.route");
const testimonial_route_1 = require("../modules/testimonial/testimonial.route");
const seo_route_1 = require("../modules/seo/seo.route");
const stats_route_1 = require("../modules/stats/stats.route");
const resources_route_1 = require("../modules/resources/resources.route");
const newsletter_route_1 = require("../modules/newsletter/newsletter.route");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        route: user_route_1.userRoutes
    },
    {
        path: "/auth",
        route: auth_route_1.authRoutes
    },
    {
        path: "/service",
        route: service_route_1.serviceRoutes
    },
    {
        path: "/join-us-form",
        route: joinUsForm_route_1.joinUsFormRoutes
    },
    {
        path: "/referral-form",
        route: referralForm_route_1.referralFormRoutes
    },
    {
        path: "/message",
        route: message_route_1.messageFormRoutes
    },
    {
        path: "/site-info",
        route: siteInfo_route_1.siteInfoRoutes
    },
    {
        path: "/testimonial",
        route: testimonial_route_1.testimonialRoutes
    },
    {
        path: "/seo",
        route: seo_route_1.seoRoutes
    },
    {
        path: "/stats",
        route: stats_route_1.stateRoutes
    },
    {
        path: "/resources",
        route: resources_route_1.ResourceRoutes
    },
    {
        path: "/newsletters",
        route: newsletter_route_1.newsletterRoutes
    }
];
moduleRoutes.forEach(route => {
    exports.router.use(route.path, route.route);
});
