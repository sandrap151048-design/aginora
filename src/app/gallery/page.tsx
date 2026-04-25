"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TopBanner from '@/components/layout/TopBanner';
import PageHero from '@/components/layout/PageHero';
import { Loader2 } from 'lucide-react';

const defaultGallery = [
  { _id: 'g1', title: 'State-of-the-Art Classrooms', type: 'image', url: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1200&auto=format&fit=crop' },
  { _id: 'g2', title: 'Expert Faculty Mentorship', type: 'image', url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop' },
  { _id: 'g3', title: 'Interactive Smart Boards', type: 'image', url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop' },
  { _id: 'g4', title: 'Extensive Library Resources', type: 'image', url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop' },
  { _id: 'g5', title: 'Focus on JEE Preparation', type: 'image', url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop' },
  { _id: 'g6', title: 'NEET Success Strategies', type: 'image', url: 'https://images.unsplash.com/photo-1576091160501-bbe57469278b?q=80&w=1200&auto=format&fit=crop' },
];

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<any[]>(defaultGallery);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch('/api/admin/gallery');
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
          setGalleryItems(json.data);
        }
        // If DB fails or returns empty, silently keep defaultGallery
      } catch (err) {
        console.error("Gallery Fetch Error:", err);
        // Silently fall back to defaultGallery - already in state
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <main className="pt-28 md:pt-36">
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
            <div className="flex justify-center p-20">
              <Loader2 className="animate-spin text-primary-green" size={48} />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
