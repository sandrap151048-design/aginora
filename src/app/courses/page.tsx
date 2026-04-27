import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TopBanner from '@/components/layout/TopBanner';
import PageHero from '@/components/layout/PageHero';
import Courses from '@/components/home/Courses';
import Link from 'next/link';
import StudyModes from '@/components/home/StudyModes';


export default function CoursesPage() {
  return (
    <main className="pt-28 md:pt-36">
      <TopBanner />
      <Header />
      
      <PageHero 
        title="Our Courses"
        subtitle="Choose the right path for your academic success with our expertly crafted entrance coaching programs."
        bgImage="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070"
      />

      <Courses />
      
      <StudyModes />

      <Footer />
    </main>
  );
}
