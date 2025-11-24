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
exports.Service = exports.ServiceType = void 0;
const mongoose_1 = require("mongoose");
const serviceTypeSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String }
}, {
    timestamps: true
});
exports.ServiceType = (0, mongoose_1.model)("ServiceType", serviceTypeSchema);
const subServiceSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Sub-service title is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Sub-service description is required"],
    },
    image: {
        type: [String],
        required: [true, "At least one sub-service image is required"],
    },
}, { _id: false });
// Main Service schema
const serviceSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Service title is required"],
        trim: true,
    },
    slug: {
        type: String,
        unique: true,
    },
    description: {
        type: String,
    },
    images: {
        type: [String],
        default: [],
    },
    included: {
        type: [String],
        default: [],
    },
    excluded: {
        type: [String],
        default: [],
    },
    amenities: {
        type: [String],
        default: [],
    },
    servicePlan: {
        type: [String],
        default: [],
    },
    subServices: {
        type: [subServiceSchema],
        default: [],
    },
    serviceType: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "ServiceType",
        required: [true, "Service type reference is required"],
    },
}, {
    timestamps: true, // automatically adds createdAt & updatedAt
});
serviceSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified("title")) {
            const baseSlug = this.title
                .toLowerCase()
                .replace(/&/g, "and")
                .split(" ")
                .join("-");
            let slug = `${baseSlug}`;
            let counter = 0;
            while (yield exports.Service.exists({ slug })) {
                slug = `${slug}-${counter++}`; // dhaka-division-2
            }
            this.slug = slug;
        }
        next();
    });
});
serviceSchema.pre("findOneAndUpdate", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const service = this.getUpdate();
        if (service.title) {
            const baseSlug = service.title.toLowerCase().split(" ").join("-");
            let slug = `${baseSlug}`;
            let counter = 0;
            while (yield exports.Service.exists({ slug })) {
                slug = `${slug}-${counter++}`; // dhaka-division-2
            }
            service.slug = slug;
        }
        this.setUpdate(service);
        next();
    });
});
exports.Service = (0, mongoose_1.model)("Service", serviceSchema);
