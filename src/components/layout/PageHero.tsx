"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface PageHeroProps {
  title: string;
  subtitle: string;
  bgImage: string;
}

/**
 * PageHero Component
 * Re-implemented as a standard function export to resolve Next.js/Webpack hydration glitches.
 */
export default function PageHero({ title, subtitle, bgImage }: PageHeroProps) {
  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <img 
          src={bgImage} 
          alt={title}
          className="w-full h-full object-cover select-none"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4 md:space-y-6"
        >
          <div className="inline-block px-8 py-2 border border-white/40 text-white rounded-full font-black text-[10px] tracking-[0.3em] uppercase bg-black/40 backdrop-blur-md">
            Ajinorah Academy
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-inter text-white leading-tight drop-shadow-lg">
            {title}
          </h1>
          
          <p className="text-base md:text-lg text-white/90 max-w-3xl mx-auto font-medium font-inter drop-shadow-md leading-relaxed px-4">
            {subtitle}
          </p>
        </motion.div>
      </div>

    </section>
  );
}
