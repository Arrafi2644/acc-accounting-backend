import httpStatus from "http-status-codes";
import { Testimonial } from "./testimonial.model";
import { ITestimonialForm } from "./testimonial.interface";
import AppError from "../../errorHelpers/appError";
import { QueryBuilder } from "../../utils/queryBuilder";
import { TestimonialSearchableFields } from "./testimonial.constants";



// 🟡 Create testimonial
const createTestimonial = async (payload: ITestimonialForm) => {
  const existingTestimonial = await Testimonial.findOne({
    fullName: payload.fullName,
    email: payload.email,
    message: payload.message,
  });

  if (existingTestimonial) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "A similar testimonial already exists."
    );
  }

  const testimonial = await Testimonial.create(payload);
  return testimonial;
};


const updateTestimonial = async (id: string, payload: Partial<ITestimonialForm>) => {
  const existingTestimonial = await Testimonial.findById(id);

  if (!existingTestimonial) {
    throw new AppError(httpStatus.NOT_FOUND, "Testimonial not found");
  }

  const updatedTestimonial = await Testimonial.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!updatedTestimonial) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to update testimonial");
  }

  return updatedTestimonial;
};

const getAllTestimonials = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Testimonial.find(), query);

  const testimonials = await queryBuilder
    .search(TestimonialSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    testimonials.build(),
    queryBuilder.getMeta(),
  ]);

  return { data, meta };
};


const deleteTestimonial = async (id: string) => {
  const testimonial = await Testimonial.findById(id);

  if (!testimonial) {
    throw new AppError(httpStatus.NOT_FOUND, "Testimonial not found");
  }

  const deleted = await Testimonial.findByIdAndDelete(id);

  if (!deleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete testimonial");
  }

  return deleted;
};

export const TestimonialServices = {
  createTestimonial,
  updateTestimonial,
  getAllTestimonials,
  deleteTestimonial,
};
