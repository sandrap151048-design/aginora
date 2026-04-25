"use client";
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TopBanner from '@/components/layout/TopBanner';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import PageHero from '@/components/layout/PageHero';
import Infrastructure from '@/components/about/Infrastructure';
import { Target, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="pt-28 md:pt-36">
      <TopBanner />
      <Header />
      
      <PageHero 
        title="About Us"
        subtitle="12+ years of excellence in transforming students into tomorrow's leaders and top-rank achievers."
        bgImage="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=2070&auto=format&fit=crop"
      />

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="p-12 rounded-[3.5rem] bg-slate-50 border border-slate-100 space-y-6">
            <div className="w-16 h-16 bg-primary-green text-white rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20">
              <Target size={32} />
            </div>
            <h2 className="text-4xl font-bold text-dark tracking-tight">Our Mission</h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              To provide high-quality entrance coaching that simplifies complex concepts, builds confidence, and ensures every student achieves their dream of entering prestigious medical and engineering colleges.
            </p>
          </div>
          <div className="p-12 rounded-[3.5rem] bg-slate-50 border border-slate-100 space-y-6">
            <div className="w-16 h-16 bg-primary-blue text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Award size={32} />
            </div>
            <h2 className="text-4xl font-bold text-dark tracking-tight">Our Vision</h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              To be the most trusted and successful entrance coaching academy in India, recognized for our innovative teaching methods, exceptional faculty, and consistent high-rank results.
            </p>
          </div>
        </div>
      </section>

      <Infrastructure />
      <WhyChooseUs />
      <Footer />
    </main>
  );
}
