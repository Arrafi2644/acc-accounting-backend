import { IBanner, IFaq, IFeature, IProcessStep, IRequirementDoc, IService, IServiceMatter, IServiceOverview} from './service.interface';

import { model, Schema } from "mongoose";

/* ================= Banner ================= */
const bannerSchema = new Schema<IBanner>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
  },
  { _id: false }
);

/* ================= Service Overview ================= */
const serviceOverviewSchema = new Schema<IServiceOverview>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    features: { type: [String] },
    serviceImage: { type: String, required: true },
  },
  { _id: false }
);

/* ================= Feature ================= */
const featureSchema = new Schema<IFeature>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
  },
  { _id: false }
);

/* ================= Service Matter ================= */
const serviceMatterSchema = new Schema<IServiceMatter>(
  {
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
  },
  { _id: false }
);

/* ================= Process Step ================= */
const processStepSchema = new Schema<IProcessStep>(
  {
    stepNumber: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
  },
  { _id: false }
);

/* ================= Requirement Doc ================= */
const requirementDocSchema = new Schema<IRequirementDoc>(
  {
    title: { type: String, required: true },
    icon: { type: String, required: true },
  },
  { _id: false }
);

/* ================= FAQ ================= */
const faqSchema = new Schema<IFaq>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { _id: false }
);

/* ================= Main Service ================= */
const serviceSchema = new Schema<IService>(
  {
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
  },
  { timestamps: true }
);

/* ================= Slug Middleware ================= */
serviceSchema.pre("save", async function (next) {
  if (this.isModified("title")) {
    const baseSlug = this.title
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    let slug = baseSlug;
    let counter = 1;

    while (await Service.exists({ slug })) {
      slug = `${baseSlug}-${counter++}`;
    }

    this.slug = slug;
  }
  next();
});

serviceSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate() as Partial<IService>;

  if (update.title) {
    const baseSlug = update.title
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    let slug = baseSlug;
    let counter = 1;

    while (await Service.exists({ slug })) {
      slug = `${baseSlug}-${counter++}`;
    }

    update.slug = slug;
  }

  this.setUpdate(update);
  next();
});

export const Service = model<IService>("Service", serviceSchema);
