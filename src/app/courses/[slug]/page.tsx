"use client";
import React from 'react';
import { notFound } from 'next/navigation';
import { coursesData } from '@/data/courses';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TopBanner from '@/components/layout/TopBanner';
import Button from '@/components/ui/Button';
import PageHero from '@/components/layout/PageHero';
import { CheckCircle2, Clock, GraduationCap, ChevronRight } from 'lucide-react';

const courseImages: { [key: string]: string } = {
  'repeaters-batch': '/courses/repeaters.jpg',
  'integrated-schooling-program': '/courses/integrated.jpg',
  'plus-one-plus-two-tuition': '/courses/jee.jpg',
  'foundation-program': '/courses/foundation.jpg',
  'online-tuition-program': '/courses/keam.jpg',
};

const syllabusImages: { [key: string]: string } = {
  'repeaters-batch': '/courses/repeaters.jpg',
  'integrated-schooling-program': '/courses/integrated.jpg',
  'plus-one-plus-two-tuition': '/courses/jee.jpg',
  'foundation-program': '/courses/foundation.jpg',
  'online-tuition-program': '/courses/keam.jpg',
};

const featuresImages: { [key: string]: string } = {
  'repeaters-batch': '/courses/repeaters.jpg',
  'integrated-schooling-program': '/courses/integrated.jpg',
  'plus-one-plus-two-tuition': '/courses/jee.jpg',
  'foundation-program': '/courses/foundation.jpg',
  'online-tuition-program': '/courses/keam.jpg',
};

const enrolImages: { [key: string]: string } = {
  'repeaters-batch': '/courses/repeaters.jpg',
  'integrated-schooling-program': '/courses/integrated.jpg',
  'plus-one-plus-two-tuition': '/courses/jee.jpg',
  'foundation-program': '/courses/foundation.jpg',
  'online-tuition-program': '/courses/keam.jpg',
};

import { useModal } from '@/context/ModalContext';
import toast from 'react-hot-toast';

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const { openApplicationModal } = useModal();
  const [course, setCourse] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/courses/${params.slug}`);
        const json = await res.json();
        if (json.success) {
          setCourse(json.data);
        } else {
          // Fallback to static data if API fails or course not found in DB
          const staticCourse = coursesData.find((c) => c.slug === params.slug);
          if (staticCourse) {
            setCourse({
              ...staticCourse,
              name: staticCourse.title, // Map title to name for consistency
              description: staticCourse.longDesc // Map longDesc to description
            });
          }
        }
      } catch (err) {
        console.error(err);
        const staticCourse = coursesData.find((c) => c.slug === params.slug);
        if (staticCourse) setCourse(staticCourse);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [params.slug]);

  if (loading) return <div className="pt-40 text-center">Loading course details...</div>;
  if (!course) {
    notFound();
  }

  const title = course.name || course.title;
  const shortDesc = course.description?.substring(0, 100) + '...' || course.shortDesc;
  const longDesc = course.description || course.longDesc;

  const handleDownload = () => {
    window.open(`/brochures/${params.slug}.pdf`, '_blank');
    toast.success(`${title} Brochure opened!`);
  };

  return (
    <main className="pt-28 md:pt-36">
      <TopBanner />
      <Header />

      <PageHero 
        title={title}
        subtitle={shortDesc}
        bgImage={courseImages[params.slug] || '/hero-banner.png'}
      />

      {/* Course Content */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-8 md:space-y-12">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-dark underline decoration-primary-green decoration-4 underline-offset-8">Course Overview</h2>
                <p className="text-xl text-slate-500 font-medium leading-[1.8]">
                  {longDesc}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative p-8 md:p-10 rounded-2xl md:rounded-[3.5rem] overflow-hidden bg-slate-900 border border-slate-100/10">
                  <div className="absolute inset-0 z-0">
                    <img src={syllabusImages[params.slug] || '/courses/neet.jpg'} alt="Syllabus" className="w-full h-full object-cover opacity-30" />
                    <div className="absolute inset-0 bg-black/50" />
                  </div>
                  <div className="relative z-10 space-y-6">
                    <h3 className="text-xl md:text-2xl font-bold flex items-center gap-3 text-white">
                      <GraduationCap className="text-primary-green" size={28} /> Syllabus
                    </h3>
                    <ul className="space-y-3 md:space-y-4">
                      {course.syllabus?.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-white/70 font-bold text-[10px] md:text-sm uppercase tracking-wide">
                          <ChevronRight size={18} className="text-primary-green shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="relative p-8 md:p-10 rounded-2xl md:rounded-[3.5rem] overflow-hidden bg-slate-900 border border-slate-100/10">
                  <div className="absolute inset-0 z-0">
                    <img src={featuresImages[params.slug] || '/courses/jee.jpg'} alt="Features" className="w-full h-full object-cover opacity-30" />
                    <div className="absolute inset-0 bg-black/50" />
                  </div>
                  <div className="relative z-10 space-y-6">
                    <h3 className="text-xl md:text-2xl font-bold flex items-center gap-3 text-white">
                      <CheckCircle2 className="text-primary-blue" size={28} /> Features
                    </h3>
                    <ul className="space-y-3 md:space-y-4">
                      {course.features?.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-white/70 font-bold text-[10px] md:text-sm uppercase tracking-wide">
                          <CheckCircle2 size={18} className="text-primary-blue shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-8">
              <div className="relative p-8 md:p-10 rounded-2xl md:rounded-[4rem] overflow-hidden bg-slate-900 shadow-2xl lg:sticky lg:top-32 border border-white/10">
                <div className="absolute inset-0 z-0">
                  <img src={enrolImages[params.slug] || '/courses/keam.jpg'} alt="Enrol Now" className="w-full h-full object-cover opacity-30" />
                  <div className="absolute inset-0 bg-black/50" />
                </div>
                <div className="relative z-10 space-y-8">
                  <div className="space-y-2">
                     <h3 className="text-3xl font-bold text-white leading-tight">Enrol Now</h3>
                     <div className="w-12 h-1.5 bg-primary-green rounded-full" />
                  </div>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center pb-4 border-b border-white/20">
                      <span className="text-white/60 font-bold uppercase text-[10px] tracking-widest flex items-center gap-2"><Clock size={16} /> Duration</span>
                      <span className="font-bold text-white">{course.duration || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-white/20">
                      <span className="text-white/60 font-bold uppercase text-[10px] tracking-widest flex items-center gap-2"><GraduationCap size={16} /> Eligibility</span>
                      <span className="font-bold text-white">{course.eligibility || 'N/A'}</span>
                    </div>
                  </div>
                  <div className="space-y-4 pt-4">
                    <Button 
                      onClick={openApplicationModal}
                      fullWidth 
                      size="lg" 
                      className="rounded-3xl h-16 bg-primary-green hover:bg-white hover:text-dark border-none text-dark"
                    >
                      Apply Now
                    </Button>
                    <Button 
                      onClick={handleDownload}
                      variant="outline" 
                      fullWidth 
                      size="lg" 
                      className="rounded-3xl h-16 text-white border-white/20 hover:bg-white hover:text-dark"
                    >
                      Download Brochure
                    </Button>
                  </div>
                  <p className="text-center text-[10px] text-white/50 font-black uppercase tracking-[0.2em] px-4 leading-relaxed">Secured admission for the 2024 academic cycle.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
