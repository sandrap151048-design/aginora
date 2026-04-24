import { Stethoscope, Calculator, School, RefreshCw, Layers, Microscope } from 'lucide-react';

export const coursesData = [
  {
    slug: 'neet-coaching',
    title: 'NEET Coaching',
    shortDesc: 'Intensive preparation for Medical Entrance with expert faculty.',
    longDesc: 'Our NEET coaching program is meticulously designed to help aspiring medical students crack the toughest entrance exam with ease. We focus on conceptual clarity in Biology, Physics, and Chemistry.',
    icon: Stethoscope,
    image: '/courses/neet.jpg',
    color: 'bg-red-100 text-red-600',
    duration: '1 Year / 2 Years',
    eligibility: 'Class 11 / 12 / Repeaters',
    syllabus: ['Diversity in Living World', 'Structure and Function', 'Plant Physiology', 'Human Physiology', 'Reproduction', 'Genetics and Evolution'],
    features: ['Daily Practice Papers', 'Weekly Mock Tests', 'Personal Mentoring', '24/7 Doubt Clearing']
  },
  {
    slug: 'jee-coaching',
    title: 'JEE Coaching',
    shortDesc: 'Comprehensive Engineering Entrance training focusing on Maths and Physics.',
    longDesc: 'The JEE coaching program at Ajinorah is tailored for students aiming for IITs and NITs. Our expert faculty provides shortcuts and tips for solving complex problems within seconds.',
    icon: Calculator,
    image: '/courses/jee.jpg',
    color: 'bg-blue-100 text-blue-600',
    duration: '1 Year / 2 Years',
    eligibility: 'Class 11 / 12 / Repeaters',
    syllabus: ['Mathematics - Algebra & Calculus', 'Physics - Mechanics & Electrodynamics', 'Physical Chemistry', 'Organic Chemistry'],
    features: ['Aakash Level Study Material', 'Monthly Ranking Tests', 'Digital Classrooms', 'One-on-One Support']
  },
  {
    slug: 'keam-coaching',
    title: 'KEAM Coaching',
    shortDesc: 'Specially designed course for Kerala Engineering and Medical Entrance.',
    longDesc: 'Focusing on the Kerala State Entrance, this course ensures students are well-versed in the specific pattern and difficulty level of the KEAM exam.',
    icon: Microscope,
    image: '/courses/keam.jpg',
    color: 'bg-primary-green/10 text-primary-green',
    duration: '1 Year',
    eligibility: 'Class 12',
    syllabus: ['State Board Physics', 'State Board Chemistry', 'Mathematics for Kerala Entrance'],
    features: ['Previous Year Paper Solving', 'State-Level Mock Tests', 'Concise Revision Notes']
  },
  {
    slug: 'integrated-schooling',
    title: 'Integrated Schooling',
    shortDesc: 'Parallel preparation for Plus Two along with entrance coaching.',
    longDesc: 'Our integrated schooling program combines regular board syllabus with advanced entrance preparation, saving time and reducing stress for students.',
    icon: School,
    image: '/courses/integrated.jpg',
    color: 'bg-purple-100 text-purple-600',
    duration: '2 Years',
    eligibility: 'Class 10 Completed',
    syllabus: ['NCERT CBSE Syllabus', 'Entrance Modules Phase 1 & 2'],
    features: ['School + Coaching under one roof', 'Integrated Study Board', 'Hostel Facilities']
  },
  {
    slug: 'repeaters-batch',
    title: 'Repeaters Batch',
    shortDesc: 'Dedicated long-term course for students wishing to re-attempt.',
    longDesc: 'A rigorous one-year program for students who have completed Class 12 and want to focus 100% on entrance preparation for a better rank.',
    icon: RefreshCw,
    image: '/courses/repeaters.jpg',
    color: 'bg-orange-100 text-orange-600',
    duration: '1 Year (Residencial)',
    eligibility: 'Class 12 Pass',
    syllabus: ['Comprehensive NEET/JEE Syllabus Revision', 'Advanced Problem Solving Techniques'],
    features: ['Daily 12-hour Study Plan', 'Strict Supervision', 'Personal Attention']
  },
  {
    slug: 'foundation-course',
    title: 'Foundation Course',
    shortDesc: 'Pre-entrance orientation for 8th, 9th and 10th standard students.',
    longDesc: 'Building the base for future competition. This course focuses on logical reasoning, analytical skills, and fundamental sciences.',
    icon: Layers,
    image: '/courses/foundation.jpg',
    color: 'bg-teal-100 text-teal-600',
    duration: '1 - 3 Years',
    eligibility: 'Class 8, 9, 10',
    syllabus: ['Logical Reasoning', 'Mental Ability', 'Advanced Maths & Science Basics'],
    features: ['NTSE Preparation', 'Olympiad Training', 'Interactive Learning']
  },
];
