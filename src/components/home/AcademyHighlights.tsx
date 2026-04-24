"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Trophy, Target, Sparkles } from 'lucide-react';

const AcademyHighlights = () => {
  const highlights = [
    {
      title: "Scientific Curriculum",
      description: "Our curriculum is engineered to simplify complex concepts and build strong fundamentals.",
      icon: Lightbulb,
      color: "text-yellow-400"
    },
    {
      title: "Expert Faculty",
      description: "Learn from top-tier educators with decades of experience in entrance coaching.",
      icon: Trophy,
      color: "text-primary-green"
    },
    {
      title: "Focused Mentorship",
      description: "Personalized attention and guidance for every student to ensure continuous progress.",
      icon: Target,
      color: "text-blue-400"
    },
    {
      title: "Proven Results",
      description: "A legacy of consistent high ranks in NEET, JEE, and KEAM across India.",
      icon: Sparkles,
      color: "text-purple-400"
    }
  ];

  return (
    <section className="py-24 bg-dark text-white overflow-hidden rounded-[4rem] mx-4 my-12 shadow-2xl">
      <div className="container mx-auto px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/3 space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold leading-tight">
              The <br />
              <span className="text-primary-green">Ajinorah</span> <br />
              Edge.
            </h2>
            <p className="text-xl text-slate-400 font-medium leading-relaxed">
              Experience a coaching environment that blends tradition with technology to produce exceptional results.
            </p>
          </div>
          
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all group"
              >
                <item.icon size={40} className={`${item.color} mb-6 group-hover:scale-110 transition-transform`} />
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-400 font-medium leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademyHighlights;
