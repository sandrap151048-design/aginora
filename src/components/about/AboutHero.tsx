"use client";
import React from 'react';
import { motion } from 'framer-motion';

const AboutHero = () => {
  const stats = [
    { label: "Total Students", value: "12,000+" },
    { label: "Success Rate", value: "98%" },
    { label: "Expert Mentors", value: "50+" },
    { label: "Strategic Centers", value: "5+" }
  ];

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-slate-950 overflow-hidden">
      {/* Background Image with Deep Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072" 
          alt="Academy Vision" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-4xl space-y-8">
           <div className="inline-block px-4 py-1.5 bg-primary-green/20 border border-primary-green/30 text-primary-green rounded-full text-xs font-black uppercase tracking-widest">
              About Ajinorah
           </div>
           <h1 className="text-6xl md:text-[5.5rem] font-black text-white leading-[0.9] tracking-tighter uppercase">
              Shaping the future <br />
              with <span className="text-primary-green italic">Excellence.</span>
           </h1>
           <p className="text-xl text-slate-400 max-w-2xl font-medium leading-relaxed">
              We are a forward-thinking coaching academy dedicated to helping students unlock their full potential and secure their academic dreams.
           </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-24 border-t border-white/10 pt-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="space-y-2"
            >
              <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter">{stat.value}</h3>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
