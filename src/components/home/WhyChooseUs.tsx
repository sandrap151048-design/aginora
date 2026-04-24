"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Users, LayoutGrid, BadgeCheck, BrainCircuit, Headphones, Monitor } from 'lucide-react';

const features = [
  { title: 'Expert Faculty', desc: 'Learn from highly experienced subject matter experts.', icon: Users },
  { title: 'Small Batch Size', desc: 'Personal attention guaranteed with limited students per batch.', icon: LayoutGrid },
  { title: 'Daily Mock Tests', desc: 'Regular assessment to track progress and improve speed.', icon: BadgeCheck },
  { title: 'Personal Mentoring', desc: 'One-on-one guidance for psychological and academic support.', icon: BrainCircuit },
  { title: 'Doubt Clearing Sessions', desc: 'Dedicated time to resolve all your queries instantly.', icon: Headphones },
  { title: 'Smart Classrooms', desc: 'Digitally enhanced learning environment for better understanding.', icon: Monitor },
];

const WhyChooseUs = () => {
  return (
    <section id="about" className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-extrabold text-dark tracking-tight leading-tight">
              Why Students <span className="text-primary-blue">Trust</span> <br />
              Ajinorah Academy
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed">
              We don't just teach; we inspire excellence. Our holistic approach to entrance preparation combines traditional methods with modern technology to ensure every student reaches their full potential.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-secondary-green/30 transition-colors"
                >
                  <div className="w-12 h-12 bg-primary-green/10 rounded-xl flex items-center justify-center text-primary-green shrink-0">
                    <feature.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-dark">{feature.title}</h4>
                    <p className="text-slate-500 text-sm">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative mt-12 lg:mt-0">
            <div className="relative rounded-2xl md:rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=2070&auto=format&fit=crop" 
                alt="Classroom" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-primary-blue/20" />
            </div>
            {/* Overlay Badge */}
            <div className="absolute -bottom-6 -right-4 md:-bottom-10 md:-right-10 w-32 h-32 md:w-48 md:h-48 bg-primary-green rounded-full flex flex-col items-center justify-center text-white p-4 md:p-6 text-center border-4 md:border-8 border-white animate-pulse shadow-2xl">
              <p className="text-2xl md:text-4xl font-black">12+</p>
              <p className="text-[10px] md:text-sm font-bold uppercase tracking-wider leading-tight">Years of Excellence</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
