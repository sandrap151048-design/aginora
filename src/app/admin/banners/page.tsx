"use client";
import React from 'react';
import Button from '@/components/ui/Button';
import { Plus, Image as ImageIcon, ExternalLink } from 'lucide-react';

export default function BannersManagement() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-3xl font-black text-dark">Banner Management</h1>
           <p className="text-slate-500">Manage homepage hero banners and offers.</p>
        </div>
        <Button className="gap-2"><Plus size={20} /> Add Banner</Button>
      </div>

      <div className="space-y-6">
        {[1].map((i) => (
          <div key={i} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-50 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-64 h-36 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-300">
               <ImageIcon size={48} />
            </div>
            <div className="flex-1 space-y-2 text-center md:text-left">
              <h3 className="text-2xl font-black text-dark">Shape Your Future With Expert Entrance Coaching</h3>
              <p className="text-slate-500">NEET | JEE | KEAM | CUET Coaching with Integrated Schooling</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                <span className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold flex items-center gap-2">
                  <ExternalLink size={16} /> /apply-now
                </span>
                <Button size="sm" variant="outline">Edit Content</Button>
                <Button size="sm" variant="ghost" className="text-red-500 hover:bg-red-50">Delete</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
