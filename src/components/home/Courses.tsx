"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { ArrowUpRight, BookOpen, Download } from 'lucide-react';

const defaultCourses = [
  { _id: '1', name: 'NEET Coaching', duration: '1 Year', fees: '₹ 1,45,000', status: 'Active', description: 'Intensive medical entrance prep', image: '' },
  { _id: '2', name: 'JEE Coaching', duration: '1 Year', fees: '₹ 1,45,000', status: 'Active', description: 'Engineering entrance prep', image: '' },
  { _id: '3', name: 'KEAM Coaching', duration: '1 Year', fees: '₹ 1,35,000', status: 'Active', description: 'Kerala entrance prep', image: '' },
  { _id: '4', name: 'Integrated Schooling', duration: '2 Years', fees: '₹ 1,80,000', status: 'Active', description: 'Schooling + Entrance', image: '' },
  { _id: '5', name: 'Repeaters Batch', duration: '1 Year', fees: '₹ 1,50,000', status: 'Active', description: 'Dedicated NEET/JEE repeaters', image: '' },
  { _id: '6', name: 'Foundation Course', duration: '2 Years', fees: '₹ 25,000', status: 'Active', description: 'Pre-entrance orientation for 8th-10th', image: '' },
];

const Courses = () => {
  const [courses, setCourses] = useState<any[]>(defaultCourses);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('/api/admin/courses');
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
  }, []);

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
                if (n.includes('PLUS') || n.includes('TUITION') && !n.includes('ONLINE')) return 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800';
                if (n.includes('FOUNDATION')) return 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800';
                if (n.includes('ONLINE') || n.includes('DIGITAL')) return 'https://images.unsplash.com/photo-1501503060809-54bc4151eeac?q=80&w=800';
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
                  className="group relative h-[450px] rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={courseImage} 
                      alt={course.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1501503060809-54bc4151eeac?q=80&w=800';
                      }}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent" />
                  </div>

                  {/* Top Badge */}
                  <div className="absolute top-6 left-6 z-20 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                     <span className="text-[10px] font-black uppercase tracking-[0.15em] text-white">
                       {course.name.includes('Online') ? 'Digital Learning' : 'Campus Program'}
                     </span>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-x-0 bottom-0 z-10 p-8 flex flex-col justify-end h-full">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-1 bg-primary-green rounded-full group-hover:w-16 transition-all duration-500" />
                      </div>
                      <h3 className="text-2xl font-black text-white tracking-tight leading-[1.1]">
                        {course.name}
                      </h3>
                      <p className="text-xs text-white/70 font-medium leading-relaxed line-clamp-2">
                        {course.description || "Premium coaching program designed for top-rank success."}
                      </p>
                    </div>
                    
                    <div className="pt-6 mt-6 flex items-center justify-between border-t border-white/10">
                      <div className="flex flex-col">
                        <span className="text-[9px] text-white/40 font-black uppercase tracking-[0.2em] mb-1">Duration</span>
                        <div className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg inline-flex items-center">
                          <span className="text-[11px] font-black text-white">{course.duration || 'Flexible'}</span>
                        </div>
                      </div>
                      
                      {(() => {
                        const n = course.name.toUpperCase();
                        let slug = '';
                        if (n.includes('REPEATERS')) slug = 'repeaters-batch';
                        else if (n.includes('INTEGRATED') || n.includes('SCHOOLING')) slug = 'integrated-schooling-program';
                        else if (n.includes('PLUS ONE') || n.includes('PLUS TWO')) slug = 'plus-one-plus-two-tuition';
                        else if (n.includes('FOUNDATION')) slug = 'foundation-program';
                        else if (n.includes('ONLINE') || n.includes('TUITION')) slug = 'online-tuition-program';

                        return (
                          <Link href={slug ? `/courses/${slug}` : '/courses'}>
                            <button className="w-12 h-12 rounded-2xl bg-primary-green text-dark flex items-center justify-center hover:bg-white transition-all duration-300 group/btn shadow-lg shadow-primary-green/20">
                              <ArrowUpRight size={20} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                            </button>
                          </Link>
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
