"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Monitor, Wifi, Coffee } from 'lucide-react';

const facilities = [
  { title: 'Digital Classrooms', icon: Monitor, desc: 'Equipped with interactive panels and 4K projectors for visual learning.' },
  { title: 'Hybrid Learning', icon: Wifi, desc: 'Attend classes from home or campus with our seamless dual-mode tech.' },
  { title: 'Student Lounge', icon: Coffee, desc: 'Relaxation zones designed to keep students refreshed and focused.' },
  { title: 'Strategic Locations', icon: MapPin, desc: 'Accessible centers across Kerala with high-safety standards.' },
];

const Centers = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {facilities.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:bg-primary-green hover:text-white transition-all duration-500 group"
                >
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary-green mb-6 shadow-sm group-hover:bg-white/20 group-hover:text-white transition-colors">
                    <f.icon size={28} />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{f.title}</h4>
                  <p className="text-sm font-medium opacity-70 leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 space-y-8 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-green/10 text-primary-green rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
              Campus & Infrastructure
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-dark leading-tight">
              Where <br />
              <span className="text-primary-green underline decoration-slate-100">Excellence</span> <br />
              Lives.
            </h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-lg">
              Our state-of-the-art coaching centers are designed to provide the perfect balance of technology and tranquility, ensuring a high-performance learning environment.
            </p>
            <div className="relative rounded-[3.5rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800" 
                alt="Ajinorah Academy Modern Classroom" 
                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-primary-green/10 group-hover:bg-transparent transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Centers;
