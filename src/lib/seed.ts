import connectDB from './db';
import { Course, Admin, Testimonial, Result, Enquiry, Student } from '@/models/index';
import bcrypt from 'bcryptjs';

export async function seedDatabase() {
  try {
    await connectDB();
    console.log("Connected to MongoDB: ajinora. Initializing data...");

    // 1. Seed Admin
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await Admin.create({
        email: 'admin@ajinorah.com',
        password: hashedPassword,
        role: 'admin'
      });
      console.log("✅ Admin seeded: admin@ajinorah.com / admin123");
    }

    // 2. Seed Courses
    const courseCount = await Course.countDocuments();
    if (courseCount === 0) {
      const courses = [
        { name: 'Repeaters Batch', slug: 'repeaters-batch', duration: '1 Year (Residential)', fees: 'Contact for Fees', status: 'Active', description: 'For students who are reappearing with a focused goal to secure top ranks.' },
        { name: 'Integrated Schooling Program', slug: 'integrated-schooling-program', duration: '2 Years', fees: 'Contact for Fees', status: 'Active', description: 'A complete academic + entrance preparation system under one roof.' },
        { name: 'Plus One & Plus Two Tuition + Entrance Coaching', slug: 'plus-one-plus-two-tuition', duration: '1 Year / 2 Years', fees: 'Contact for Fees', status: 'Active', description: 'Designed for higher secondary students aiming for strong board results and entrance success.' },
        { name: 'Foundation Program', slug: 'foundation-program', duration: '1 – 5 Years', fees: 'Contact for Fees', status: 'Active', description: 'Build strong basics early for future competitive success.' },
        { name: 'Online Tuition Program', slug: 'online-tuition-program', duration: 'Flexible', fees: 'Contact for Fees', status: 'Active', description: 'Flexible learning for students who prefer studying from home.' },
      ];
      await Course.insertMany(courses);
      console.log("✅ 5 Courses seeded.");
    }

    // 3. Seed Students
    const studentCount = await Student.countDocuments();
    if (studentCount === 0) {
      const students = [
        { name: 'Rahul Sharma', email: 'rahul@example.com', phone: '9876543210', course: 'NEET Coaching', batch: '2024-A', status: 'Active' },
        { name: 'Anjali Menon', email: 'anjali@example.com', phone: '9876543211', course: 'JEE Coaching', batch: '2024-B', status: 'Active' },
        { name: 'Siddharth V', email: 'sid@example.com', phone: '9876543212', course: 'KEAM Coaching', batch: '2024-C', status: 'Active' },
      ];
      await Student.insertMany(students);
      console.log("✅ 3 Students seeded.");
    }

    // 4. Seed Testimonials
    const testCount = await Testimonial.countDocuments();
    if (testCount === 0) {
      const testimonials = [
        { name: 'Rahul Sharma', course: 'NEET 2023', review: 'Excellent coaching and support! The faculty are world-class.', image: 'https://i.pravatar.cc/150?u=rahul' },
        { name: 'Anjali Menon', course: 'JEE 2023', review: 'Personal mentoring helped me clear my doubts instantly.', image: 'https://i.pravatar.cc/150?u=anjali' },
        { name: 'Siddharth V', course: 'KEAM 2023', review: 'The mock tests were very similar to the actual exam.', image: 'https://i.pravatar.cc/150?u=sid' },
      ];
      await Testimonial.insertMany(testimonials);
      console.log("✅ 3 Testimonials seeded.");
    }

    // 5. Seed Results
    const resultCount = await Result.countDocuments();
    if (resultCount === 0) {
      const results = [
        { name: 'Rahul Sharma', course: 'NEET', rank: 'AIR 124' },
        { name: 'Anjali Menon', course: 'JEE', rank: 'AIR 542' },
        { name: 'Siddharth V', course: 'KEAM', rank: 'Rank 12' },
      ];
      await Result.insertMany(results);
      console.log("✅ 3 Results seeded.");
    }

    // 6. Seed Enquiries (Leads)
    const enquiryCount = await Enquiry.countDocuments();
    if (enquiryCount === 0) {
      const enquiries = [
        { name: 'John Doe', email: 'john@gmail.com', phone: '9000000001', course: 'NEET', message: 'Looking for admission' },
        { name: 'Jane Doe', email: 'jane@gmail.com', phone: '9000000002', course: 'JEE', message: 'Needed fee details' },
      ];
      await Enquiry.insertMany(enquiries);
      console.log("✅ 2 Enquiries seeded.");
    }

    console.log("🚀 Database 'ajinora' initialized successfully!");
  } catch (error) {
    console.error("❌ Seeding error:", error);
  }
}
