"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVars = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const loadEnvVariables = () => {
    const requiredEnvVariables = ["PORT", "DB_URL", "NODE_ENV", "BCRYPT_SALT_ROUND",
        "JWT_ACCESS_SECRET", "JWT_ACCESS_EXPIRES", "JWT_REFRESH_SECRET", "JWT_REFRESH_EXPIRES",
        "ADMIN_EMAIL", "ADMIN_CREDENTIAL", "CLOUDINARY_CLOUD_NAME",
        "CLOUDINARY_API_KEY",
        "CLOUDINARY_API_SECRET",
        "SMTP_HOST",
        "SMTP_PORT",
        "SMTP_USER",
        "SMTP_PASS",
        "SMTP_FROM",
        "COMPANY_EMAIL",
        "FRONTEND_URL"
    ];
    requiredEnvVariables.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing require environment variable ${key}`);
        }
    });
    return {
        PORT: process.env.PORT,
        DB_URL: process.env.DB_URL,
        NODE_ENV: process.env.NODE_ENV,
        BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND,
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
        JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES,
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
        JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES,
        ADMIN_EMAIL: process.env.ADMIN_EMAIL,
        ADMIN_CREDENTIAL: process.env.ADMIN_CREDENTIAL,
        CLOUDINARY: {
            CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
            CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
            CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
        },
        EMAIL_SENDER: {
            SMTP_USER: process.env.SMTP_USER,
            SMTP_PASS: process.env.SMTP_PASS,
            SMTP_PORT: process.env.SMTP_PORT,
            SMTP_HOST: process.env.SMTP_HOST,
            SMTP_FROM: process.env.SMTP_FROM
        },
        COMPANY_EMAIL: process.env.COMPANY_EMAIL,
        FRONTEND_URL: process.env.FRONTEND_URL
    };
};
exports.envVars = loadEnvVariables();
