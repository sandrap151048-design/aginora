import connectDB from './db';
import { Course, Gallery } from '@/models/index';

const courses = [
  {
    name: 'Repeaters Batch',
    slug: 'repeaters-batch',
    duration: '1 Year (Residential)',
    fees: 'Contact for Fees',
    status: 'Active',
    description: 'For students who are reappearing with a focused goal to secure top ranks. Intensive coaching for NEET & JEE with concept-focused teaching and daily problem-solving sessions.',
    eligibility: 'Class 12 Pass / Repeaters',
    syllabus: [
      'Intensive coaching for NEET & JEE',
      'Concept-focused teaching with daily problem-solving sessions',
      'Personalized mentoring & performance tracking',
      'Weekly tests and All-India level mock exams',
      'Doubt-clearing sessions with expert faculty'
    ],
    features: [
      'Result-oriented approach with individual attention',
      'Structured revision plans for maximum score improvement',
      'Limited batch size for better focus'
    ],
  },
  {
    name: 'Integrated Schooling Program',
    slug: 'integrated-schooling-program',
    duration: '2 Years',
    fees: 'Contact for Fees',
    status: 'Active',
    description: 'A complete academic + entrance preparation system under one roof. School curriculum + NEET/JEE coaching simultaneously.',
    eligibility: 'Class 10 Completed',
    syllabus: [
      'School curriculum + NEET/JEE coaching simultaneously',
      'Well-planned daily schedule balancing board & entrance prep',
      'Continuous assessment and progress monitoring',
      'Experienced faculty for both academics and entrance'
    ],
    features: [
      'No need for separate tuition or coaching',
      'Saves time and reduces academic pressure',
      'Early competitive exam preparation advantage'
    ],
  },
  {
    name: 'Plus One & Plus Two Tuition + Entrance Coaching',
    slug: 'plus-one-plus-two-tuition',
    duration: '1 Year / 2 Years',
    fees: 'Contact for Fees',
    status: 'Active',
    description: 'Designed for higher secondary students aiming for strong board results and entrance success. Full syllabus coverage with parallel preparation for NEET/JEE.',
    eligibility: 'Class 11 / 12',
    syllabus: [
      'Full syllabus coverage for Plus One & Plus Two',
      'Parallel preparation for NEET/JEE',
      'Online & offline learning flexibility',
      'Regular tests, assignments, and revision sessions'
    ],
    features: [
      'Dual focus on board exams + entrance exams',
      'Hybrid learning model for convenience',
      'Continuous academic support'
    ],
  },
  {
    name: 'Foundation Program',
    slug: 'foundation-program',
    duration: '1 – 5 Years',
    fees: 'Contact for Fees',
    status: 'Active',
    description: 'Build strong basics early for future competitive success. Concept clarity in Maths & Science, logical reasoning and problem-solving skills.',
    eligibility: 'Class 6, 7, 8, 9, 10',
    syllabus: [
      'Concept clarity in Maths & Science',
      'Logical reasoning and problem-solving skills',
      'Early exposure to competitive exam patterns',
      'Interactive and engaging learning methods'
    ],
    features: [
      'Strong academic foundation from a young age',
      'Develops analytical thinking skills',
      'Prepares students for NEET/JEE journey early'
    ],
  },
  {
    name: 'Online Tuition Program',
    slug: 'online-tuition-program',
    duration: 'Flexible',
    fees: 'Contact for Fees',
    status: 'Active',
    description: 'Flexible learning for students who prefer studying from home. Live and recorded classes with subject-wise expert faculty.',
    eligibility: 'Class 6 – 12',
    syllabus: [
      'Live and recorded classes',
      'Subject-wise expert faculty',
      'Doubt-clearing sessions and digital study materials',
      'Regular online tests and performance analysis'
    ],
    features: [
      'Learn anytime, anywhere',
      'Affordable and accessible quality education',
      'Ideal for students with busy schedules'
    ],
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
    
    console.log("✅ Seeding complete! 5 Courses + 6 Gallery items added.");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    throw err;
  }
}
