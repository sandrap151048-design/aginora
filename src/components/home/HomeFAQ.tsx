"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: "Why choose Ajinorah over other entrance academies?",
    a: "Ajinorah offers a unique blend of scientific performance tracking and personalized emotional mentorship. We focus on conceptual clarity rather than rote memorization, ensuring our students can handle any surprise in the exam paper."
  },
  {
    q: "Do you provide integrated schooling for Plus One and Plus Two?",
    a: "Yes! Our Integrated Schools program allows students to complete their regular schooling and entrance preparation within the same campus, saving travel time and reducing academic stress."
  },
  {
    q: "Are the study materials provided updated?",
    a: "Absolutely. Our materials are revised every year by a board of experts based on the latest trends and previous years' question patterns for NEET, JEE, and KEAM."
  },
  {
    q: "Do you offer scholarship programs?",
    a: "We have an 'Excellence Scholarship' based on the Ajinorah Scholarship Test and board exam performance. Deserving students can get up to 100% fee waivers."
  }
];

const HomeFAQ = () => {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-2 bg-yellow-500/10 text-yellow-600 rounded-full text-xs font-black uppercase tracking-widest">
            Common Questions
          </div>
          <h2 className="text-5xl font-semibold text-dark">
            Got <span className="text-primary-green">Questions?</span>
          </h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Everything you need to know about starting your journey.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i} 
              className={`rounded-[2rem] border transition-all ${
                active === i ? 'bg-slate-50 border-primary-green/20' : 'bg-white border-slate-100 hover:border-slate-300'
              }`}
            >
              <button 
                onClick={() => setActive(active === i ? null : i)}
                className="w-full px-8 py-6 flex items-center justify-between text-left"
              >
                <span className={`text-lg font-black tracking-tight ${active === i ? 'text-primary-green' : 'text-dark'}`}>
                  {faq.q}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${active === i ? 'bg-primary-green text-white rotate-90' : 'bg-slate-100 text-slate-500'}`}>
                  {active === i ? <Minus size={16} /> : <Plus size={16} />}
                </div>
              </button>
              <AnimatePresence>
                {active === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 text-slate-500 font-medium leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFAQ;
