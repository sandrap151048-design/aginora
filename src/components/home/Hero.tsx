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

          <h1 className="text-4xl md:text-7xl lg:text-[6rem] font-bold font-inter leading-tight text-white drop-shadow-xl">
            Shape Your <br />
            <span className="text-primary-green">Future</span>
          </h1>

          <p className="text-lg md:text-2xl text-white max-w-2xl mx-auto font-bold font-inter drop-shadow-lg leading-relaxed">
            Excellence in entrance coaching for NEET, JEE, and KEAM. <br className="hidden md:block" /> 
            Join the community of 12,000+ successful students.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 pt-12">
            <Button 
              onClick={openApplicationModal}
              size="md" 
              className="rounded-xl px-10 bg-primary-green hover:bg-white hover:text-dark transition-all duration-300 font-black text-sm uppercase tracking-widest shadow-2xl"
            >
              Apply Now
            </Button>
          </div>
        </motion.div>
      </div>


    </section>
  );
};

export default Hero;
