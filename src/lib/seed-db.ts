import connectDB from './db';
import { Course, Gallery } from '@/models/index';

const courses = [
  { name: 'NEET Coaching', duration: '1 Year', fees: '₹ 1,45,000', status: 'Active', description: 'Intensive medical entrance prep' },
  { name: 'JEE Coaching', duration: '1 Year', fees: '₹ 1,45,000', status: 'Active', description: 'Engineering entrance prep' },
  { name: 'KEAM Coaching', duration: '1 Year', fees: '₹ 1,35,000', status: 'Active', description: 'Kerala entrance prep' },
  { name: 'Integrated Schooling', duration: '2 Years', fees: '₹ 1,80,000', status: 'Active', description: 'Schooling + Entrance' },
  { name: 'Repeaters Batch', duration: '1 Year', fees: '₹ 1,50,000', status: 'Active', description: 'Dedicated NEET/JEE repeaters' },
  { name: 'Foundation Course', duration: '2 Years', fees: '₹ 25,000', status: 'Active', description: 'Pre-entrance orientation for 8th-10th' },
];

const galleryItems = [
  { title: 'Modern Classrooms', type: 'image', url: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=800' },
  { title: 'Interactive Sessions', type: 'image', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800' },
  { title: 'Expert Mentorship', type: 'image', url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800' },
  { title: 'Library Facilities', type: 'image', url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800' },
];

export async function seed() {
  try {
    await connectDB();
    console.log("Seeding data...");
    
    // Clear existing
    await Course.deleteMany({});
    await Gallery.deleteMany({});
    
    await Course.insertMany(courses);
    await Gallery.insertMany(galleryItems);
    
    console.log("Seeding complete!");
  } catch (err) {
    console.error("Seeding failed:", err);
  }
}
