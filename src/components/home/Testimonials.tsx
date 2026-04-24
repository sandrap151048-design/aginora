"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  { name: 'Meera & Rajesh', role: 'Parents of JEE Aspirant', text: 'Sending our son to Ajinorah was the best decision. The disciplined approach and continuous monitoring gave us peace of mind.', image: 'https://i.pravatar.cc/150?u=parents' },
  { name: 'Karthik V.', role: 'NEET Repeater', text: 'The infrastructure and digital classrooms make learning so much more interactive. It is not just a coaching center, it is an experience.', image: 'https://i.pravatar.cc/150?u=karthik' },
  { name: 'Fathima S.', role: 'KEAM Aspirant', text: 'I struggled with Physics initially, but the faculty here broke down complex concepts into simple, relatable examples.', image: 'https://i.pravatar.cc/150?u=fathima' },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-[#FBFBFB] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          <div className="lg:w-1/2 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-blue/5 text-primary-blue rounded-full text-xs font-black uppercase tracking-widest">
              Success Stories
            </div>
            <h2 className="text-6xl md:text-8xl font-bold text-dark leading-tight">
              WHAT OUR <br />
              <span className="text-primary-blue">LEGENDS</span> <br />
              SAY.
            </h2>
            {/* Rating block removed as requested */}
          </div>

          <div className="lg:w-1/2 relative">
             <div className="space-y-6">
                {testimonials.map((t, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    viewport={{ once: true }}
                    className="group p-10 bg-white rounded-[3rem] shadow-xl border border-slate-50 hover:border-primary-blue/20 flex gap-8 items-center"
                  >
                    <div className="w-24 h-24 rounded-[2rem] overflow-hidden shrink-0 border-4 border-slate-50 shadow-lg group-hover:rotate-6 transition-transform">
                      <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-4">
                      <Quote className="text-primary-blue/20" size={40} />
                      <p className="text-lg text-slate-500 font-medium italic">"{t.text}"</p>
                      <div>
                        <h4 className="text-xl font-bold text-dark">{t.name}</h4>
                        <p className="text-sm font-bold text-primary-blue uppercase tracking-widest">{t.role}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;
