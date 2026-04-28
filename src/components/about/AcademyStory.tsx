"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, Users } from 'lucide-react';
import Button from '../ui/Button';
import Link from 'next/link';

const AcademyStory = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
               <img 
                 src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800" 
                 alt="Academy Excellence" 
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-tr from-primary-green/20 to-transparent" />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 hidden md:block">
               <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary-green/10 text-primary-green rounded-2xl flex items-center justify-center">
                     <Award size={32} />
                  </div>
                  <div>
                     <p className="text-3xl font-black text-dark tracking-tighter">100%</p>
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">ISO Certified</p>
                  </div>
               </div>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 space-y-8"
          >
            <div className="space-y-4">
               <div className="inline-block px-4 py-1.5 bg-primary-green/10 text-primary-green rounded-full text-xs font-black uppercase tracking-widest">
                  Our Story
               </div>
               <h2 className="text-5xl md:text-6xl font-semibold text-dark leading-tight">
                  Welcome to <br />
                  <span className="text-primary-green">Ajinorah Entrance Academy</span>
               </h2>
            </div>

            <p className="text-xl text-slate-500 font-medium leading-relaxed">
               Ajinorah Entrance academy delivers everything you require for setting up a prosperous life through learning and planning your professional life. We offer assistance with test preparations required for major academic and job profiles in India and abroad. 
            </p>

            <p className="text-lg text-slate-400 leading-relaxed italic border-l-4 border-primary-green/30 pl-6">
               We provide the best IELTS and OET training in India and support candidates who apply for overseas education with guidance through our overseas consultancy.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
               <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary-green" size={24} />
                  <span className="font-black text-dark uppercase tracking-tight">Best Instructor & Best Programs</span>
               </div>
               <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary-green" size={24} />
                  <span className="font-black text-dark uppercase tracking-tight">100% ISO Certified Guarantee</span>
               </div>
            </div>

            <div className="pt-6">
               <Link href="/about">
                  <Button size="lg" className="rounded-full px-12 font-black uppercase tracking-widest shadow-xl shadow-green-500/20">
                     Learn More
                  </Button>
               </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AcademyStory;
