"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Target, BookOpen, Sparkles, Send } from 'lucide-react';

const MissionGrid = () => {
  const pillars = [
    {
      title: "Academic Excellence",
      desc: "Turn your efforts into ranks with our scientifically structured coaching modules.",
      icon: Target,
      color: "text-blue-500"
    },
    {
      title: "Focused Training",
      desc: "Detailed and fragmentated study materials designed for maximum retention.",
      icon: BookOpen,
      color: "text-primary-green"
    },
    {
      title: "Modern Methods",
      desc: "Our goal is to empower students with modern hybrid learning technologies.",
      icon: Sparkles,
      color: "text-orange"
    },
    {
      title: "Proven Results",
      desc: "We transform hard work into success stories that inspire the next generation.",
      icon: Send,
      color: "text-primary-blue"
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Light Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <p className="text-primary-blue font-bold uppercase tracking-widest text-xs">Our Mission</p>
          <h2 className="text-5xl md:text-6xl font-bold text-dark">
            We help students grow with <br />
            <span className="text-primary-green">Scientific Innovation</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-10 bg-white border border-slate-100 rounded-3xl hover:shadow-2xl transition-all group"
            >
              <div className={`w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center ${item.color} mb-8 group-hover:scale-110 transition-transform`}>
                <item.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-dark mb-4">{item.title}</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16 text-slate-400 font-medium text-sm max-w-xl mx-auto italic">
          "By making education accessible and actionable, we empower students to solve real-world competitive challenges with confidence."
        </div>
      </div>
    </section>
  );
};

export default MissionGrid;
