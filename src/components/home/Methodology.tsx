"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, LineChart, ShieldCheck } from 'lucide-react';

const steps = [
  {
    title: 'Adaptive Learning',
    desc: 'Our methodology adjusts to each student’s pace, ensuring no one is left behind in the race for excellence.',
    icon: BookOpen,
    color: 'bg-orange-500'
  },
  {
    title: 'Expert Mentorship',
    desc: 'Each student is assigned a dedicated mentor to guide them through the emotional and academic rigors of entrance exams.',
    icon: Users,
    color: 'bg-yellow-500'
  },
  {
    title: 'Performance Analysis',
    desc: 'Weekly mock tests and detailed AI-driven analytics help identify weak spots instantly for focused improvement.',
    icon: LineChart,
    color: 'bg-red-500'
  },
  {
    title: 'Guaranteed Discipline',
    desc: 'A structured environment with strict attendance and focus protocols ensures consistent growth.',
    icon: ShieldCheck,
    color: 'bg-dark'
  }
];

const Methodology = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 space-y-8">
            <div className="inline-block px-4 py-2 bg-primary-green/10 text-primary-green rounded-full text-xs font-black uppercase tracking-widest">
              Our Methodology
            </div>
            <h2 className="text-5xl md:text-6xl font-semibold text-dark leading-tight">
              How We Create <br />
              <span className="text-primary-green">Champions.</span>
            </h2>
            <p className="text-xl text-slate-500 font-medium leading-relaxed">
              Ajinorah Academy isn't just about lectures. It's a scientific environment engineered to extract the maximum potential from every student.
            </p>
            <div className="grid grid-cols-2 gap-6">
               <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <h4 className="font-black text-3xl text-primary-green mb-1">12k+</h4>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Success Stories</p>
               </div>
               <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <h4 className="font-black text-3xl text-primary-blue mb-1">98%</h4>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Rank Ratio</p>
               </div>
            </div>
          </div>

          <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-white rounded-[2.5rem] border border-slate-100 hover:shadow-xl transition-all group"
              >
                <div className={`w-14 h-14 ${step.color.replace('bg-', 'bg-').concat('/10')} ${step.color.replace('bg-', 'text-')} rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform shadow-sm`}>
                  <step.icon size={28} strokeWidth={2.5} />
                </div>
                <h4 className="text-xl font-black text-dark mb-3 tracking-tighter uppercase">{step.title}</h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Methodology;
