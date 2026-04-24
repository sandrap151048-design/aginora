"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Laptop, Building, CalendarDays, Clock } from 'lucide-react';

const StudyModes = () => {
  const modes = [
    {
      title: "Hybrid Program",
      description: "Experience the best of both worlds with flexible online lectures and in-person practical sessions.",
      icon: Laptop,
      color: "bg-blue-600"
    },
    {
      title: "Intensive Residential",
      description: "A fully immersive campus experience with 24/7 access to mentors and study facilities.",
      icon: Building,
      color: "bg-primary-green"
    },
    {
      title: "Weekend Batches",
      description: "Designed specifically for school-going students to balance their regular studies with entrance prep.",
      icon: CalendarDays,
      color: "bg-orange"
    },
    {
      title: "Evening Batches",
      description: "Flexible timings for students who prefer self-study in the mornings and guided sessions in the evening.",
      icon: Clock,
      color: "bg-dark"
    }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold text-dark">Flexible Learning Modes.</h2>
          <p className="text-xl text-slate-500 font-medium">Choose a study pattern that fits your lifestyle and academic goals perfectly.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {modes.map((mode, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-10 bg-white rounded-[3.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 group text-center"
            >
              <div className={`w-20 h-20 mx-auto ${mode.color} text-white rounded-3xl flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform`}>
                <mode.icon size={36} />
              </div>
              <h3 className="text-2xl font-bold text-dark mb-4">{mode.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                {mode.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudyModes;
