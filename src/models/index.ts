import mongoose from "mongoose";

// Enquiry Model
const EnquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  course: { type: String, required: true },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const Enquiry = mongoose.models.Enquiry || mongoose.model("Enquiry", EnquirySchema);

// Student Model
const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  course: { type: String, required: true },
  batch: { type: String },
  notes: { type: String },
  status: { type: String, default: 'Active' },
  createdAt: { type: Date, default: Date.now },
});

export const Student = mongoose.models.Student || mongoose.model("Student", StudentSchema);

// Course Model
const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  duration: { type: String },
  eligibility: { type: String },
  fees: { type: String },
  syllabus: [{ type: String }],
  features: [{ type: String }],
  status: { type: String, default: 'Active' },
  icon: { type: String },
  image: { type: String },
});

export const Course = mongoose.models.Course || mongoose.model("Course", CourseSchema);

// Admin Model
const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
});

export const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

// Testimonial Model
const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  course: { type: String },
  review: { type: String, required: true },
  image: { type: String },
});

export const Testimonial = mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);

// Result Model
const ResultSchema = new mongoose.Schema({
  name: { type: String, required: true },
  course: { type: String },
  rank: { type: String },
  image: { type: String },
});

export const Result = mongoose.models.Result || mongoose.model("Result", ResultSchema);

// Banner Model
const BannerSchema = new mongoose.Schema({
  title: { type: String },
  subtitle: { type: String },
  image: { type: String },
  buttonLink: { type: String },
});

export const Banner = mongoose.models.Banner || mongoose.model("Banner", BannerSchema);

// Gallery Model
const GallerySchema = new mongoose.Schema({
  title: { type: String },
  type: { type: String, enum: ['image', 'video'], required: true },
  url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Gallery = mongoose.models.Gallery || mongoose.model("Gallery", GallerySchema);
