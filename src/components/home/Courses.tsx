"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { ArrowUpRight, BookOpen, Download } from 'lucide-react';
import { useModal } from '@/context/ModalContext';

const defaultCourses = [
  { _id: '1', name: 'Online Tuition Program', duration: 'Flexible', fees: 'Contact for Fees', status: 'Active', description: 'Flexible learning for students who prefer studying from home.', image: 'https://boardingadmission.com/exam/mainlogin/assets/img/blog/3.jpg' },
  { _id: '2', name: 'Foundation Program', duration: '1 – 5 Years', fees: 'Contact for Fees', status: 'Active', description: 'Build strong basics early for future competitive success.', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800' },
  { _id: '3', name: 'Plus One & Plus Two Tuition + Entrance Coaching', duration: '1 Year / 2 Years', fees: 'Contact for Fees', status: 'Active', description: 'Designed for higher secondary students aiming for strong board results.', image: 'https://images.unsplash.com/photo-1523240715639-6f0647ad66e1?q=80&w=800' },
  { _id: '4', name: 'Integrated Schooling Program', duration: '2 Years', fees: 'Contact for Fees', status: 'Active', description: 'A complete academic + entrance preparation system under one roof.', image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800' },
  { _id: '5', name: 'Repeaters Batch', duration: '1 Year (Residential)', fees: 'Contact for Fees', status: 'Active', description: 'For students who are reappearing with a focused goal to secure top ranks.', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800' },
];

interface CoursesProps {
  initialCourses?: any[];
}

const Courses = ({ initialCourses }: CoursesProps) => {
  const { openApplicationModal } = useModal();
  const [courses, setCourses] = useState<any[]>(initialCourses || defaultCourses);
  const [loading, setLoading] = useState(!initialCourses);

  useEffect(() => {
    if (initialCourses) return;
    
    const fetchCourses = async () => {
      try {
        const res = await fetch('/api/admin/courses?t=' + Date.now());
        const json = await res.json();
        if (json.success && json.data.length > 0) {
          setCourses(json.data.filter((c: any) => c.status === 'Active'));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [initialCourses]);

  return (
    <section id="courses" className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-20">
          <div className="space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-slate-500 font-bold text-xs uppercase tracking-widest">
              Available Courses
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-dark tracking-tight leading-tight">
              Level Up Your <br />
              <span className="text-primary-green">Career.</span>
            </h2>
          </div>
          <p className="text-lg text-slate-500 font-medium max-w-sm mb-4">
            Scientifically designed coaching programs tailored to ensure your success in medical & engineering entrance.
          </p>
        </div>

        {loading ? (
          <div className="text-center text-slate-500 py-20">Loading courses...</div>
        ) : courses.length === 0 ? (
          <div className="text-center text-slate-500 py-20">No active courses found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, index) => {
              const getCourseImage = (name: string) => {
                const n = (name || '').toUpperCase();
                if (n.includes('REPEATERS')) return 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800';
                if (n.includes('INTEGRATED')) return 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800';
                if (n.includes('PLUS') || n.includes('TUITION') && !n.includes('ONLINE')) return 'https://images.unsplash.com/photo-1523240715639-6f0647ad66e1?q=80&w=800';
                if (n.includes('FOUNDATION')) return 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800';
                if (n.includes('ONLINE') || n.includes('DIGITAL')) return 'https://boardingadmission.com/exam/mainlogin/assets/img/blog/3.jpg';
                return `https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&sig=${index}`;
              };

              const courseImage = (course.image && course.image.trim().length > 0)
                ? course.image
                : getCourseImage(course.name);

              return (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col h-full hover:-translate-y-2 relative"
                >
                  {/* Top Image Section */}
                  <div className="h-56 relative overflow-hidden shrink-0">
                    <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <img
                      src={courseImage}
                      alt={course.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1501503060809-54bc4151eeac?q=80&w=800';
                      }}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    {/* Premium Badge */}
                    <div className="absolute top-5 left-5 z-20 px-4 py-2 bg-white/90 backdrop-blur-md text-primary-green text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-xl border border-white/50">
                      {course.name.includes('Online') ? 'Online' : 'Offline'}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8 flex flex-col flex-1 bg-white relative z-20">
                    <div className="flex-1 space-y-4">
                      <h3 className="text-2xl font-black text-dark tracking-tight leading-tight group-hover:text-primary-green transition-colors duration-300">
                        {course.name}
                      </h3>
                      <p className="text-slate-500 font-medium leading-relaxed text-sm">
                        {course.description || "Premium coaching program designed for top-rank success with personalized attention and comprehensive study materials."}
                      </p>
                    </div>

                    <div className="pt-8 mt-auto border-t border-slate-100/50">
                      {(() => {
                        const n = course.name.toUpperCase();
                        let slug = '';
                        if (n.includes('REPEATERS')) slug = 'repeaters-batch';
                        else if (n.includes('INTEGRATED') || n.includes('SCHOOLING')) slug = 'integrated-schooling-program';
                        else if (n.includes('PLUS ONE') || n.includes('PLUS TWO')) slug = 'plus-one-plus-two-tuition';
                        else if (n.includes('FOUNDATION')) slug = 'foundation-program';
                        else if (n.includes('ONLINE') || n.includes('TUITION')) slug = 'online-tuition-program';

                        return (
                          <div className="flex gap-3">
                            <Link href={slug ? `/courses/${slug}` : '/courses'} className="flex-1">
                              <button className="w-full py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest text-slate-500 bg-slate-50 hover:bg-slate-100 hover:text-dark transition-all duration-300 border border-slate-200">
                                Course Details
                              </button>
                            </Link>
                            <Link href={`/register?course=${encodeURIComponent(course.name)}`} className="flex-1">
                              <button 
                                className="w-full py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest text-white bg-primary-green hover:bg-dark transition-all duration-300 shadow-xl shadow-green-500/20"
                              >
                                Register Now
                              </button>
                            </Link>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </motion.div>
              );

            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Courses;
