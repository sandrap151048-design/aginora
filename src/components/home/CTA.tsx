"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Button from '../ui/Button';
import { useModal } from '@/context/ModalContext';

const CTA = () => {
  const { openApplicationModal } = useModal();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="bg-hero-gradient rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
          {/* Decorative Circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl" />
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              Start Your Journey <br /> Towards Success Today
            </h2>
            <p className="text-xl text-white/80 font-medium">
              Join Ajinorah Entrance Academy and unlock your true potential with the best entrance coaching faculty in Kerala.
            </p>
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <Button 
                onClick={openApplicationModal}
                size="lg" 
                className="bg-white text-primary-green hover:bg-slate-100 shadow-2xl"
              >
                Apply Now
              </Button>
              
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-blue">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default CTA;
