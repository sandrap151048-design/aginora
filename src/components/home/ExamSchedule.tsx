"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Bell, IndianRupee, Calendar } from 'lucide-react';

const ExamSchedule = () => {
  const fees = [
    { category: "General", fee: "1,700" },
    { category: "OBC/EWS", fee: "1,600" },
    { category: "SC/ST/PwD", fee: "1,000" },
    { category: "Foreign Nationals", fee: "9,500" }
  ];

  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto bg-[#1E88E5] rounded-[3rem] p-8 md:p-16 text-center text-white shadow-2xl relative overflow-hidden border-8 border-blue-400/20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        
        <div className="relative z-10 space-y-12">
          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-6xl md:text-8xl font-black text-[#CCFF00] tracking-tighter uppercase">NEET UG 2025</h2>
            <p className="text-xl md:text-2xl font-bold tracking-widest uppercase opacity-90">Your Pathway to Medical Success!</p>
          </div>

          {/* Registration Box */}
          <div className="relative border-2 border-white/30 rounded-[2rem] p-10 bg-white/5 backdrop-blur-sm">
             <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#1E88E5] px-6 py-1 text-xl font-bold border-x-2 border-white/30">
                Registration Open
             </div>
             <div className="space-y-2">
                <div className="text-4xl md:text-7xl font-black tracking-tight">Feb 7<sup className="text-2xl">th</sup> — Mar 7<sup className="text-2xl">th</sup></div>
                <div className="text-5xl md:text-6xl font-black opacity-80">2025</div>
             </div>
          </div>

          {/* Edit Slot */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-xl md:text-2xl font-black">
             <span className="uppercase tracking-tight">Final Edit Slot</span>
             <div className="bg-[#CCFF00] text-blue-900 px-8 py-3 rounded-full flex items-center gap-3 shadow-lg">
                <div className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center animate-pulse">
                   <Bell size={20} fill="currentColor" />
                </div>
                Mar 9<sup className="text-sm">th</sup> — Mar 11<sup className="text-sm">th</sup>
             </div>
          </div>

          {/* Fees Section */}
          <div className="space-y-8">
             <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/20"></div></div>
                <div className="relative flex justify-center"><span className="bg-[#1E88E5] px-6 text-2xl font-black uppercase tracking-widest">Application Fees</span></div>
             </div>

             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {fees.map((item, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-all">
                     <p className="text-sm font-bold uppercase tracking-wider mb-2 opacity-80">{item.category}</p>
                     <div className="text-3xl font-black flex items-center justify-center gap-1">
                        <span className="text-xl">₹</span>{item.fee}
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExamSchedule;
