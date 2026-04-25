"use client";
import React from 'react';
import { motion } from 'framer-motion';

const AcademyIntro = () => {
  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="container mx-auto px-6 relative">
        {/* Decorative Background Element */}
        <div className="absolute left-0 top-0 opacity-10 hidden md:block">
           <div className="grid grid-cols-5 gap-4">
              {[...Array(25)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
              ))}
           </div>
        </div>

        <div className="flex flex-col items-center text-center max-w-5xl mx-auto space-y-6">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="px-6 py-2 bg-slate-100 text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full rotate-[-3deg] border border-slate-200 shadow-sm"
          >
            About Ajinorah
          </motion.div>

          {/* Large Sentence with Embedded Images */}
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold font-playfair text-dark leading-[1.15] md:leading-[1.25]"
          >
            An Entrance Academy 
            <span className="inline-flex items-center align-middle mx-4">
               <div className="w-16 h-10 md:w-32 md:h-20 bg-slate-100 rounded-full overflow-hidden border-2 border-white shadow-lg rotate-[10deg]">
                  <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=200" alt="Learning" className="w-full h-full object-cover" />
               </div>
            </span>
            Driven by Scientific Methodology With 
            <span className="inline-flex items-center align-middle mx-4">
               <div className="w-16 h-10 md:w-32 md:h-20 bg-slate-100 rounded-full overflow-hidden border-2 border-white shadow-lg rotate-[-10deg]">
                  <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=200" alt="Mentors" className="w-full h-full object-cover" />
               </div>
            </span>
            Expert & World Class Mentors.
          </motion.h2>

        </div>
      </div>
    </section>
  );
};

export default AcademyIntro;
