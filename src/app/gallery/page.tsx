"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TopBanner from '@/components/layout/TopBanner';
import PageHero from '@/components/layout/PageHero';
import { Video, Loader2 } from 'lucide-react';

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState(false);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch('/api/admin/gallery');
        const json = await res.json();
        if (json.success) {
          setGalleryItems(json.data);
        } else {
          setDbError(true);
        }
      } catch (err) {
        console.error("Gallery Fetch Error:", err);
        setDbError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <main>
      <TopBanner />
      <Header />
      
      <PageHero 
        title="Our Gallery"
        subtitle="A glimpse into life at Ajinorah Academy - from intensive classes to celebratory moments."
        bgImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
      />

      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center p-20"><Loader2 className="animate-spin text-primary-green" size={48} /></div>
          ) : dbError ? (
            <div className="text-center py-20 bg-white rounded-[3rem] border border-red-100 p-10">
              <h2 className="text-2xl font-black text-dark mb-4">Gallery Unavailable</h2>
              <p className="text-slate-500 mb-6">We are currently experiencing connection issues. Please try again later.</p>
            </div>
          ) : galleryItems.length === 0 ? (
            <div className="text-center text-slate-500 py-20">
              <p className="text-xl">Gallery is currently empty. Check back soon for updates!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {galleryItems.map((item: any) => (
                <div key={item._id.toString()} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group flex flex-col">
                  {item.type === 'video' ? (
                    <div className="relative w-full aspect-video bg-slate-100 flex-shrink-0">
                      <iframe 
                        src={item.url} 
                        className="absolute inset-0 w-full h-full"
                        allowFullScreen
                        title={item.title || 'Video'}
                      ></iframe>
                    </div>
                  ) : (
                    <div className="w-full aspect-[4/3] overflow-hidden bg-slate-100 flex-shrink-0">
                      <img 
                        src={item.url} 
                        alt={item.title || "Academy Life"} 
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523240715639-6f0647ad66e1?q=80&w=800';
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                    </div>
                  )}
                  {item.title && (
                    <div className="p-4 text-center">
                      <h3 className="text-sm font-bold text-dark tracking-tight truncate px-2">{item.title}</h3>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
