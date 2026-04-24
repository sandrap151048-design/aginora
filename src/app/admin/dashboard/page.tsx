"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Trophy, Image as ImageIcon, ArrowRight, ExternalLink, TrendingUp, Calendar } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';

const StatCard = ({ title, count, icon: Icon, color, growth, bgColor }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50 flex flex-col justify-between group transition-all duration-300 h-full"
  >
    <div className="flex justify-between items-start mb-8">
      <div 
        style={{ backgroundColor: bgColor }} 
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg"
      >
        <Icon size={24} />
      </div>
      <div className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black italic">
        {growth}
      </div>
    </div>
    <div>
      <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-2">{title}</p>
      <div className="flex items-end justify-between">
        <h3 className="text-4xl font-black text-dark tracking-tighter">{count}</h3>
        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-dark group-hover:text-white transition-all">
          <ArrowRight size={14} />
        </div>
      </div>
    </div>
  </motion.div>
);

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    courses: 0,
    results: 0,
    gallery: 0,
    contact: 0
  });

  const [recentEnquiries, setRecentEnquiries] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [coursesRes, resultsRes, galleryRes, contactRes] = await Promise.all([
          fetch('/api/admin/courses'),
          fetch('/api/admin/results'),
          fetch('/api/admin/gallery'),
          fetch('/api/admin/enquiries')
        ]);

        const [courses, results, gallery, contact] = await Promise.all([
          coursesRes.json(),
          resultsRes.json(),
          galleryRes.json(),
          contactRes.json()
        ]);

        setStats({
          courses: courses.data?.length || 0,
          results: results.data?.length || 0,
          gallery: gallery.data?.length || 0,
          contact: contact.data?.length || 0
        });

        // Set top 5 recent enquiries
        if (contact.success) {
          setRecentEnquiries(contact.data.slice(0, 5));
        }
      } catch (err) {
        console.error('Failed to fetch stats');
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-5xl font-black text-dark tracking-tighter">Systems <span className="text-primary-green italic">Overview</span></h1>
        </div>
        <Link href="/" target="_blank">
          <button className="flex items-center gap-2 px-8 py-4 bg-dark text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-primary-green transition-all shadow-xl shadow-black/10">
            View Live Website <ExternalLink size={16} />
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/admin/courses" className="block h-full"><StatCard title="Courses" count={stats.courses} icon={BookOpen} bgColor="#FF5C00" growth="+2 new" /></Link>
        <Link href="/admin/results" className="block h-full"><StatCard title="Results" count={stats.results} icon={Trophy} bgColor="#FFB000" growth="+12%" /></Link>
        <Link href="/admin/gallery" className="block h-full"><StatCard title="Gallery" count={stats.gallery} icon={ImageIcon} bgColor="#8B5CF6" growth="+5 items" /></Link>
        <Link href="/admin/contact" className="block h-full"><StatCard title="Leads" count={stats.contact} icon={Users} bgColor="#EF4444" growth="+8%" /></Link>
      </div>

      {/* Recent Enquiries Section */}
      <div className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-100 min-h-[400px]">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h4 className="font-bold text-2xl text-dark tracking-tight">Recent Enquiries</h4>
            <p className="text-slate-400 text-xs font-medium">Latest messages from the contact form</p>
          </div>
          <Link href="/admin/contact">
            <button className="px-5 py-2 bg-slate-50 text-slate-500 rounded-xl text-xs font-bold hover:bg-dark hover:text-white transition-all">View All</button>
          </Link>
        </div>

        <div className="space-y-4">
          {recentEnquiries.length === 0 ? (
            <p className="text-slate-400 text-sm italic py-10 text-center">No recent enquiries found.</p>
          ) : (
            recentEnquiries.map((enquiry) => (
              <div key={enquiry._id} className="flex items-center justify-between p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary-green/30 transition-colors group">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary-green shadow-sm font-bold border border-slate-100">
                    {enquiry.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-dark">{enquiry.name}</p>
                    <p className="text-xs text-slate-500">{enquiry.course} • {new Date(enquiry.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden md:block text-right pr-6 border-r border-slate-200">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Phone</p>
                    <p className="text-xs font-bold text-dark">{enquiry.phone}</p>
                  </div>
                  <Link href="/admin/contact">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-400 group-hover:bg-primary-green group-hover:text-white transition-all shadow-sm">
                      <ArrowRight size={18} />
                    </div>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-white p-10 rounded-[3.5rem] border border-slate-50 shadow-sm">
        <h4 className="font-bold text-lg text-dark mb-8 flex items-center gap-2">
          <ImageIcon size={20} className="text-primary-green" /> Website Live Overview
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: 'Home Page', href: '/', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=400' },
            { name: 'Courses Page', href: '/courses', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=400' },
            { name: 'Results Page', href: '/results', image: 'https://images.unsplash.com/photo-1491333078588-55b6733c7de6?q=80&w=400' },
            { name: 'Gallery Page', href: '/gallery', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=400' }
          ].map((page) => (
            <Link key={page.name} href={page.href} target="_blank" className="group">
              <div className="relative h-48 rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:shadow-slate-200">
                <img src={page.image} alt={page.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70 mb-1 block">{page.name}</span>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold text-xs uppercase tracking-widest">Live View</span>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:bg-primary-green group-hover:border-primary-green transition-all">
                      <ExternalLink size={14} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="pt-20 pb-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
        <p>© {new Date().getFullYear()} Ajinorah Academy. All Rights Reserved.</p>
        <div className="flex gap-8">
          <Link href="/" className="hover:text-primary-green transition-colors">View Site</Link>
          <Link href="/admin/contact" className="hover:text-primary-green transition-colors">Support</Link>
        </div>
      </div>
    </div>
  );
}
