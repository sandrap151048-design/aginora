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
                  className="group bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                >
                  {/* Top Image Section */}
                  <div className="h-64 relative overflow-hidden shrink-0">
                    <img 
                      src={courseImage} 
                      alt={course.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1501503060809-54bc4151eeac?q=80&w=800';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Optional Badge */}
                    <div className="absolute top-4 right-4 z-10 px-4 py-1.5 bg-primary-green text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                       {course.name.includes('Online') ? 'Online' : 'Offline'}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    <div className="flex-1 space-y-4">
                      <h3 className="text-2xl font-bold text-primary-green tracking-tight leading-tight">
                        {course.name}
                      </h3>
                      <p className="text-slate-600 font-medium leading-relaxed line-clamp-3 text-sm">
                        {course.description || "Premium coaching program designed for top-rank success."}
                      </p>
                    </div>
                    
                    <div className="pt-8 mt-auto">
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
                            <button className="bg-primary-green text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-dark transition-all duration-300 shadow-md hover:shadow-lg">
                              Join Now
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
