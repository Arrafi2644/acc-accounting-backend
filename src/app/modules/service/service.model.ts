import { model, Schema } from "mongoose";
import { IService, IServiceType } from "./service.interface";

const serviceTypeSchema = new Schema<IServiceType>({
    name: { type: String, required: true, unique: true }
}, {
    timestamps: true
})

export const ServiceType = model<IServiceType>("ServiceType", serviceTypeSchema)

const subServiceSchema = new Schema(
    {
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
    },
    { _id: false }
);

// Main Service schema
const serviceSchema = new Schema<IService>(
    {
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
            type: Schema.Types.ObjectId,
            ref: "ServiceType",
            required: [true, "Service type reference is required"],
        },
    },
    {
        timestamps: true, // automatically adds createdAt & updatedAt
    }
);

serviceSchema.pre("save", async function (next) {

    if (this.isModified("title")) {
        const baseSlug = this.title
            .toLowerCase()
            .replace(/&/g, "and")
            .split(" ")
            .join("-");

        let slug = `${baseSlug}`

        let counter = 0;
        while (await Service.exists({ slug })) {
            slug = `${slug}-${counter++}` // dhaka-division-2
        }

        this.slug = slug;
    }
    next()
})

serviceSchema.pre("findOneAndUpdate", async function (next) {
    const service = this.getUpdate() as Partial<IService>

    if (service.title) {
        const baseSlug = service.title.toLowerCase().split(" ").join("-")
        let slug = `${baseSlug}`

        let counter = 0;
        while (await Service.exists({ slug })) {
            slug = `${slug}-${counter++}` // dhaka-division-2
        }

        service.slug = slug
    }

    this.setUpdate(service)

    next()
})

export const Service = model<IService>("Service", serviceSchema);