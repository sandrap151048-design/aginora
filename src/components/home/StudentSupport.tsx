"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, MessageSquare, BookOpenCheck, ShieldCheck } from 'lucide-react';

const StudentSupport = () => {
  const supports = [
    {
      title: "Mental Wellness",
      description: "Dedicated psychological counseling to help students manage exam stress and maintain focus.",
      icon: HeartPulse,
      color: "bg-red-500"
    },
    {
      title: "Doubt Clearing",
      description: "24/7 access to mentors for instant resolution of academic doubts through our digital platform.",
      icon: MessageSquare,
      color: "bg-primary-green"
    },
    {
      title: "Study Material",
      description: "Exclusively researched and updated study modules designed for the latest entrance patterns.",
      icon: BookOpenCheck,
      color: "bg-blue-500"
    },
    {
      title: "Parent Portal",
      description: "Real-time tracking of student attendance, performance, and progress for parents.",
      icon: ShieldCheck,
      color: "bg-dark"
    }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold text-dark">Beyond Just Coaching.</h2>
          <p className="text-xl text-slate-500 font-medium">We provide a holistic ecosystem designed to support every aspect of a student's journey to success.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {supports.map((support, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-8 items-start p-8 bg-white rounded-[3rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group"
            >
              <div className={`shrink-0 w-20 h-20 ${support.color} text-white rounded-3xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform`}>
                <support.icon size={36} />
              </div>
              <div className="space-y-3">
                <h3 className="text-3xl font-bold text-dark">{support.title}</h3>
                <p className="text-lg text-slate-500 font-medium leading-relaxed">
                  {support.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentSupport;
