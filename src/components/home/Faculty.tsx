"use client";
import React from 'react';
import { motion } from 'framer-motion';

const Faculty = () => {
  const members = [
    {
      name: "Dr. S. Nair",
      role: "Head of Biology",
      experience: "20+ Years",
      image: "https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=400"
    },
    {
      name: "Prof. Rajesh Kumar",
      role: "Physics Specialist",
      experience: "15+ Years",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400"
    },
    {
      name: "Ms. Anjali Menon",
      role: "Chemistry Expert",
      experience: "12+ Years",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400"
    },
    {
      name: "Mr. Thomas Isaac",
      role: "Mathematics Lead",
      experience: "18+ Years",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl space-y-4">
             <div className="inline-block px-4 py-1.5 bg-primary-green/10 text-primary-green rounded-full text-xs font-black uppercase tracking-widest">
                Our Faculty
             </div>
             <h2 className="text-5xl md:text-6xl font-bold text-dark leading-tight">
                Learn from the <br />
                <span className="text-primary-green">Best Minds.</span>
             </h2>
          </div>
          <p className="text-xl text-slate-500 font-medium max-w-sm">
             Our expert faculty members are dedicated to simplifying concepts and guiding you towards your dream career.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative h-[400px] rounded-[3rem] overflow-hidden mb-6">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-8 left-8">
                  <div className="text-white font-black text-sm uppercase tracking-widest bg-primary-green px-4 py-1 rounded-full mb-2 inline-block">
                    {member.experience}
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-dark">{member.name}</h3>
              <p className="text-primary-green font-bold uppercase text-sm tracking-widest">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faculty;
