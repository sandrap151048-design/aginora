"use client";
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

// Home page re-compile
export default function Home() {
  return (
    <main className="min-h-screen pt-28 md:pt-36">
      <TopBanner />
      <Header />
      <Hero />
      <AcademyIntro />
      <AcademyStory />
      <Courses />
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
