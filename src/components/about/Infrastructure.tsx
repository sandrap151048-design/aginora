"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Wifi, BookOpen, Coffee } from 'lucide-react';

const Infrastructure = () => {
  const features = [
    {
      title: "Digital Classrooms",
      description: "State-of-the-art classrooms equipped with interactive smart boards and high-speed connectivity.",
      icon: Building2,
      image: "/classroom.png"
    },
    {
      title: "Modern Library",
      description: "A peaceful sanctuary with thousands of reference books, journals, and digital resources.",
      icon: BookOpen,
      image: "/library.png"
    },
    {
      title: "Hybrid Learning",
      description: "Seamless integration of offline classes with our proprietary digital LMS platform.",
      icon: Wifi,
      image: "/hybrid.png"
    },
    {
      title: "Student Lounge",
      description: "Comfortable spaces for group discussions and relaxation during study breaks.",
      icon: Coffee,
      image: "/lounge.png"
    }
  ];

  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold text-dark">World Class Infrastructure</h2>
          <p className="text-xl text-slate-500 font-medium">We provide an environment that inspires learning and fosters growth with cutting-edge facilities.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-8 space-y-4">
                <div className="w-12 h-12 bg-primary-green/10 text-primary-green rounded-xl flex items-center justify-center">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-2xl font-bold text-dark">{feature.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Infrastructure;
