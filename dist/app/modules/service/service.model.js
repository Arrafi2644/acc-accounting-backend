"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const mongoose_1 = require("mongoose");
/* ================= Banner ================= */
const bannerSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
}, { _id: false });
/* ================= Service Overview ================= */
const serviceOverviewSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    features: { type: [String] },
    serviceImage: { type: String, required: true },
}, { _id: false });
/* ================= Feature ================= */
const featureSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
}, { _id: false });
/* ================= Service Matter ================= */
const serviceMatterSchema = new mongoose_1.Schema({
    matterSectionTitle: { type: String, required: true },
    matterSectionSubTitle: { type: String, required: true },
    withoutSaaS: {
        badgeTitle: { type: String, required: true },
        badgeIcon: { type: String, required: true },
        title: { type: String, required: true },
        items: [
            {
                icon: { type: String, required: true },
                text: { type: String, required: true },
            },
        ],
    },
    withSaaS: {
        badgeTitle: { type: String, required: true },
        badgeIcon: { type: String, required: true },
        title: { type: String, required: true },
        items: [
            {
                icon: { type: String, required: true },
                text: { type: String, required: true },
            },
        ],
    },
}, { _id: false });
/* ================= Process Step ================= */
const processStepSchema = new mongoose_1.Schema({
    stepNumber: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
}, { _id: false });
/* ================= Requirement Doc ================= */
const requirementDocSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    icon: { type: String, required: true },
}, { _id: false });
/* ================= FAQ ================= */
const faqSchema = new mongoose_1.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
}, { _id: false });
/* ================= Main Service ================= */
const serviceSchema = new mongoose_1.Schema({
    title: { type: String, required: true, unique: true },
    slug: { type: String, unique: true },
    serviceSummary: { type: String, required: true },
    shortDescription: { type: String, required: true },
    serviceIcon: { type: String, required: true },
    banner: { type: bannerSchema, required: true },
    overView: { type: serviceOverviewSchema, required: true },
    serviceMatter: { type: serviceMatterSchema, required: true },
    features: { type: [featureSchema], required: true },
    processSteps: { type: [processStepSchema], required: true },
    requirementDocs: { type: [requirementDocSchema], required: true },
    faqs: { type: [faqSchema], required: true },
}, { timestamps: true });
/* ================= Slug Middleware ================= */
serviceSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified("title")) {
            const baseSlug = this.title
                .toLowerCase()
                .replace(/&/g, "and")
                .replace(/[^\w\s-]/g, "")
                .trim()
                .replace(/\s+/g, "-");
            let slug = baseSlug;
            let counter = 1;
            while (yield exports.Service.exists({ slug })) {
                slug = `${baseSlug}-${counter++}`;
            }
            this.slug = slug;
        }
        next();
    });
});
serviceSchema.pre("findOneAndUpdate", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const update = this.getUpdate();
        if (update.title) {
            const baseSlug = update.title
                .toLowerCase()
                .replace(/&/g, "and")
                .replace(/[^\w\s-]/g, "")
                .trim()
                .replace(/\s+/g, "-");
            let slug = baseSlug;
            let counter = 1;
            while (yield exports.Service.exists({ slug })) {
                slug = `${baseSlug}-${counter++}`;
            }
            update.slug = slug;
        }
        this.setUpdate(update);
        next();
    });
});
exports.Service = (0, mongoose_1.model)("Service", serviceSchema);
