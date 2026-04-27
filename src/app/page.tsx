import TopBanner from '@/components/layout/TopBanner';
import Header from '@/components/layout/Header';
import Hero from '@/components/home/Hero';
import AcademyIntro from '@/components/home/AcademyIntro';
import Courses from '@/components/home/Courses';
import Methodology from '@/components/home/Methodology';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Centers from '@/components/home/Centers';
import HomeFAQ from '@/components/home/HomeFAQ';
import CTA from '@/components/home/CTA';
import Contact from '@/components/home/Contact';
import Footer from '@/components/layout/Footer';
import FloatingElements from '@/components/ui/FloatingElements';
import AcademyStory from '@/components/about/AcademyStory';
import { Course } from '@/models/index';
import dbConnect from '@/lib/db';

async function getCourses() {
  try {
    await dbConnect();
    const courses = await Course.find({ status: 'Active' }).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(courses));
  } catch (error) {
    console.error("Home Courses Fetch Error:", error);
    return [];
  }
}

export default async function Home() {
  const initialCourses = await getCourses();

  return (
    <main className="min-h-screen pt-28 md:pt-36">
      <TopBanner />
      <Header />
      <Hero />
      <AcademyIntro />
      <AcademyStory />
      <Courses initialCourses={initialCourses} />
      <Methodology />
      <WhyChooseUs />
      <Centers />
      <HomeFAQ />
      <CTA />
      <div className="bg-slate-50">
        <Contact />
      </div>
      <Footer />
      <FloatingElements />
    </main>
  );
}
