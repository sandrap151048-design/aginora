"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Button from '../ui/Button';
import { motion } from 'framer-motion';
import { useModal } from '@/context/ModalContext';

const Hero = () => {
  const { openApplicationModal } = useModal();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* 
          Official Ajinorah Banner Image 
          Using direct URL for the 'exact' branding image from the official site.
      */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero-banner.png" 
          alt="Ajinorah Academy Classroom" 
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Transparent overlay to help text readability without darkening the students */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center space-y-4"
        >
          <div className="px-8 py-2.5 bg-primary-green/60 backdrop-blur-xl border border-primary-green/50 text-white rounded-full font-bold text-xs tracking-[0.3em] uppercase">
            Admissions Open 2024-25
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-inter leading-tight text-white drop-shadow-xl">
            Transforming Aspirations <br />
            Into <span className="text-primary-green">Achievements</span>
          </h1>

          <p className="text-base md:text-xl text-white max-w-2xl mx-auto font-bold font-inter drop-shadow-lg leading-relaxed">
            Excellence in entrance coaching and academic tuition. <br className="hidden md:block" /> 
            Empowering students to achieve their academic goals.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 pt-10">
            <Link href="/register">
              <Button 
                size="lg" 
                className="rounded-xl px-12 bg-primary-green hover:bg-white hover:text-dark transition-all duration-300 font-black text-sm uppercase tracking-widest shadow-2xl h-16 md:h-14"
              >
                Apply Now
              </Button>
            </Link>
          </div>

          {/* Feature Cards in Hero */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto w-full">
            {[
              { title: 'Expert Faculty', desc: 'Learn from the best in the industry.' },
              { title: 'Proven Results', desc: 'Consistent toppers in NEET & JEE.' },
              { title: 'Smart Classrooms', desc: 'Digitally enabled learning environment.' },
            ].map((card, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-left hover:bg-white/20 transition-all cursor-default">
                <h4 className="text-primary-green font-black text-lg mb-1">{card.title}</h4>
                <p className="text-white/70 text-sm font-medium">{card.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>


    </section>
  );
};

export default Hero;
