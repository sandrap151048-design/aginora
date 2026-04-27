import connectDB from './db';
import { Course, Gallery } from '@/models/index';

const courses = [
  {
    name: 'NEET Coaching',
    slug: 'neet-coaching',
    duration: '1 Year / 2 Years',
    fees: '₹ 1,45,000',
    status: 'Active',
    description: 'Intensive preparation for Medical Entrance with expert faculty. Our NEET coaching program is meticulously designed to help aspiring medical students crack the toughest entrance exam with ease.',
    eligibility: 'Class 11 / 12 / Repeaters',
    syllabus: ['Diversity in Living World', 'Structure and Function', 'Plant Physiology', 'Human Physiology', 'Reproduction', 'Genetics and Evolution'],
    features: ['Daily Practice Papers', 'Weekly Mock Tests', 'Personal Mentoring', '24/7 Doubt Clearing'],
  },
  {
    name: 'JEE Coaching',
    slug: 'jee-coaching',
    duration: '1 Year / 2 Years',
    fees: '₹ 1,45,000',
    status: 'Active',
    description: 'Comprehensive Engineering Entrance training focusing on Maths and Physics. Expert faculty provides shortcuts and tips for solving complex problems within seconds.',
    eligibility: 'Class 11 / 12 / Repeaters',
    syllabus: ['Mathematics - Algebra & Calculus', 'Physics - Mechanics & Electrodynamics', 'Physical Chemistry', 'Organic Chemistry'],
    features: ['Aakash Level Study Material', 'Monthly Ranking Tests', 'Digital Classrooms', 'One-on-One Support'],
  },
  {
    name: 'KEAM Coaching',
    slug: 'keam-coaching',
    duration: '1 Year',
    fees: '₹ 1,35,000',
    status: 'Active',
    description: 'Specially designed course for Kerala Engineering and Medical Entrance. Ensures students are well-versed in the specific pattern and difficulty level of the KEAM exam.',
    eligibility: 'Class 12',
    syllabus: ['State Board Physics', 'State Board Chemistry', 'Mathematics for Kerala Entrance'],
    features: ['Previous Year Paper Solving', 'State-Level Mock Tests', 'Concise Revision Notes'],
  },
  {
    name: 'Integrated Schooling',
    slug: 'integrated-schooling',
    duration: '2 Years',
    fees: '₹ 1,80,000',
    status: 'Active',
    description: 'Parallel preparation for Plus Two along with entrance coaching. Combines regular board syllabus with advanced entrance preparation.',
    eligibility: 'Class 10 Completed',
    syllabus: ['NCERT CBSE Syllabus', 'Entrance Modules Phase 1 & 2'],
    features: ['School + Coaching under one roof', 'Integrated Study Board', 'Hostel Facilities'],
  },
  {
    name: 'Repeaters Batch',
    slug: 'repeaters-batch',
    duration: '1 Year (Residential)',
    fees: '₹ 1,50,000',
    status: 'Active',
    description: 'Dedicated long-term course for students wishing to re-attempt. A rigorous one-year program for 100% entrance preparation focus.',
    eligibility: 'Class 12 Pass',
    syllabus: ['Comprehensive NEET/JEE Syllabus Revision', 'Advanced Problem Solving Techniques'],
    features: ['Daily 12-hour Study Plan', 'Strict Supervision', 'Personal Attention'],
  },
  {
    name: 'Foundation Course',
    slug: 'foundation-course',
    duration: '1 - 3 Years',
    fees: '₹ 25,000',
    status: 'Active',
    description: 'Pre-entrance orientation for 8th, 9th and 10th standard students. Building the base for future competition with logical reasoning and analytical skills.',
    eligibility: 'Class 8, 9, 10',
    syllabus: ['Logical Reasoning', 'Mental Ability', 'Advanced Maths & Science Basics'],
    features: ['NTSE Preparation', 'Olympiad Training', 'Interactive Learning'],
  },
];

const galleryItems = [
  { title: 'State-of-the-Art Classrooms', type: 'image', url: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1200&auto=format&fit=crop' },
  { title: 'Expert Faculty Mentorship', type: 'image', url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop' },
  { title: 'Interactive Smart Boards', type: 'image', url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop' },
  { title: 'Extensive Library Resources', type: 'image', url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop' },
  { title: 'Focus on JEE Preparation', type: 'image', url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop' },
  { title: 'NEET Success Strategies', type: 'image', url: 'https://images.unsplash.com/photo-1576091160501-bbe57469278b?q=80&w=1200&auto=format&fit=crop' },
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
    
    console.log("✅ Seeding complete! 6 Courses + 6 Gallery items added.");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    throw err;
  }
}
