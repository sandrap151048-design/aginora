"use client";
import React from 'react';
import Button from '@/components/ui/Button';
import { Plus, MessageSquare, Star, User } from 'lucide-react';

export default function TestimonialsManagement() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-3xl font-black text-dark">Testimonials Management</h1>
           <p className="text-slate-500">Manage student reviews shown on the homepage.</p>
        </div>
        <Button className="gap-2"><Plus size={20} /> Add Testimonial</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-50 relative">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                <User size={28} />
              </div>
              <div>
                <h3 className="font-bold text-dark text-lg">Student Name</h3>
                <p className="text-sm text-primary-green font-bold">NEET Batch 2023</p>
              </div>
              <div className="ml-auto flex gap-1">
                {[1,2,3,4,5].map(s => <Star key={s} size={14} className="fill-orange-400 text-orange-400" />)}
              </div>
            </div>
            <p className="text-slate-500 italic">"This is a sample review from a student..."</p>
            <div className="mt-8 flex gap-4">
              <Button size="sm" variant="outline">Edit Review</Button>
              <button className="text-red-500 text-sm font-bold hover:underline">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
