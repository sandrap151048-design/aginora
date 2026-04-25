"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TopBanner from '@/components/layout/TopBanner';
import PageHero from '@/components/layout/PageHero';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

export default function ResultsPage() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch('/api/admin/results');
        const json = await res.json();
        if (json.success) setResults(json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  return (
    <main className="pt-28 md:pt-36">
      <TopBanner />
      <Header />
      
      <PageHero 
        title="Our Achievements"
        subtitle="Celebrating the hard work and success of our brightest students across medical and engineering entrance."
        bgImage="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070"
      />

      {/* Stats Section */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "NEET Selections", value: "850+" },
              { label: "JEE Qualified", value: "420+" },
              { label: "KEAM Ranks", value: "1,200+" },
              { label: "Top 100 Ranks", value: "15+" }
            ].map((stat, i) => (
              <div key={i} className="text-center space-y-2">
                <h3 className="text-4xl md:text-5xl font-bold text-dark">{stat.value}</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hall of Fame */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-green/10 text-primary-green rounded-full text-[10px] font-black uppercase tracking-widest">
              Success Stories
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-dark leading-tight">
              The <span className="text-primary-green">Elite</span> <br />
              Achievers.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
             {[
               { name: "Rahul S.", rank: "AIR 42", course: "NEET UG", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400" },
               { name: "Anjali M.", rank: "Rank 12", course: "KEAM", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400" },
               { name: "Karthik R.", rank: "AIR 156", course: "JEE Adv", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400" }
             ].map((star, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className="relative group pt-20"
               >
                 <div className="bg-slate-50 border border-slate-100 rounded-[3rem] p-10 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-0 w-32 h-32 rounded-full border-8 border-white shadow-xl overflow-hidden group-hover:scale-110 transition-transform">
                      <img src={star.image} alt={star.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="pt-12 space-y-2">
                       <h4 className="text-2xl font-bold text-dark">{star.name}</h4>
                      <p className="text-primary-green font-black uppercase text-xs tracking-widest">{star.course}</p>
                       <div className="inline-block mt-4 px-6 py-2 bg-dark text-white rounded-full text-xl font-bold shadow-lg shadow-black/20">
                        {star.rank}
                      </div>
                    </div>
                 </div>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-dark">Recent Achievements</h2>
          </div>
          {loading ? (
            <div className="text-center text-slate-500 py-20">Loading results...</div>
          ) : results.length === 0 ? (
            <div className="p-20 text-center bg-white rounded-[3rem] border border-slate-100 text-slate-400 font-bold uppercase tracking-widest text-sm">
              New success stories coming soon.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {results.map((result, index) => (
                <motion.div
                  key={result._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:shadow-xl transition-all duration-500"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-slate-50 shadow-sm group-hover:rotate-6 transition-transform bg-slate-50 flex items-center justify-center">
                      {result.image ? (
                        <img src={result.image} alt={result.name} className="w-full h-full object-cover" />
                      ) : (
                        <Trophy size={28} className="text-slate-300" />
                      )}
                    </div>
                    <div>
                       <h3 className="text-xl font-bold text-dark truncate w-40">{result.name}</h3>
                      <p className="text-primary-green font-black uppercase text-[10px] tracking-widest truncate">{result.course}</p>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-slate-50 flex justify-between items-center">
                    <span className="text-slate-400 font-bold uppercase text-[9px] tracking-[0.2em]">Rank Acheived</span>
                    <span className="text-2xl font-black text-dark italic truncate pl-4">{result.rank}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Achievement Quote */}
      <section className="py-32 bg-dark text-white text-center relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
         <div className="container mx-auto px-4 relative z-10">
           <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-12">
             "Your Success is Our <br />
             Greatest <span className="text-primary-green">Reward."</span>
           </h2>
           <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-xs">Ajinora Results 2024</p>
         </div>
      </section>

      <Footer />
    </main>
  );
}
