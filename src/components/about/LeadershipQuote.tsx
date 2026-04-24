"use client";
import React from 'react';
import { motion } from 'framer-motion';

const LeadershipQuote = () => {
  return (
    <section className="py-32 bg-slate-50">
      <div className="container mx-auto px-4 text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-dark leading-tight">
            "Our greatest goal is to see people succeed in their careers and in their lives."
          </h2>
        </motion.div>
        
        <div className="space-y-2">
          <p className="text-xl font-bold text-dark">Ajinora Leadership Team</p>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Founders & Directors</p>
        </div>
      </div>
    </section>
  );
};

export default LeadershipQuote;
