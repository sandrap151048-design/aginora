"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, UserPlus, X, Mail, Phone, BookOpen, Clock, Users } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function StudentsPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [students, setStudents] = useState([
    { id: 1, name: 'Alice Walker', course: 'NEET Coaching', batch: '2024-A', phone: '9000011111', email: 'alice@example.com', joinDate: '2024-01-10', status: 'Active' },
    { id: 2, name: 'Bob Johnson', course: 'JEE Coaching', batch: '2024-B', phone: '9000011112', email: 'bob@example.com', joinDate: '2024-02-15', status: 'Active' },
  ]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-dark mb-1">Student Management</h1>
          <p className="text-slate-500">View and manage enrolled students data.</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="gap-2">
          <UserPlus size={20} /> Add New Student
        </Button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-50 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-primary-green/10 rounded-2xl flex items-center justify-center text-primary-green">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Active Students</p>
            <p className="text-2xl font-black text-dark">842</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-50 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-primary-blue/10 rounded-2xl flex items-center justify-center text-primary-blue">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Average Courses</p>
            <p className="text-2xl font-black text-dark">1.4</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-50 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">New This Month</p>
            <p className="text-2xl font-black text-dark">45</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-50 flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[300px] relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search students..." 
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-green focus:bg-white transition-all text-sm"
          />
        </div>
        <div className="flex gap-2">
          {['All', 'NEET', 'JEE', 'KEAM'].map((tab) => (
            <button key={tab} className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${tab === 'All' ? 'bg-primary-green text-white shadow-lg shadow-green-500/20' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-6 text-sm font-bold text-slate-600">Student</th>
                <th className="px-8 py-6 text-sm font-bold text-slate-600">Course & Batch</th>
                <th className="px-8 py-6 text-sm font-bold text-slate-600">Join Date</th>
                <th className="px-8 py-6 text-sm font-bold text-slate-600">Status</th>
                <th className="px-8 py-6 text-sm font-bold text-slate-600 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold uppercase">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-dark">{student.name}</p>
                        <p className="text-xs text-slate-500 font-medium">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="font-bold text-sm text-dark">{student.course}</p>
                    <p className="text-xs text-slate-500">Batch: {student.batch}</p>
                  </td>
                  <td className="px-8 py-6 text-sm font-medium text-slate-500">{student.joinDate}</td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded-lg text-xs font-bold">
                      {student.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="text-primary-blue font-bold text-sm hover:underline">Edit Profile</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal Container */}
      <AnimatePresence>
        {showAddForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddForm(false)}
              className="absolute inset-0 bg-dark/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl p-10 overflow-y-auto max-h-[90vh]"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black text-dark">Add New Student</h2>
                <button onClick={() => setShowAddForm(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                    <input type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-green" placeholder="Student Name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
                    <input type="tel" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-green" placeholder="Phone Number" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                    <input type="email" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-green" placeholder="Email Address" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Course</label>
                    <select className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-green">
                      <option>Select Course</option>
                      <option>NEET Coaching</option>
                      <option>JEE Coaching</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Batch Name</label>
                  <input type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-green" placeholder="e.g. 2024-A" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Notes</label>
                  <textarea rows={3} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-green resize-none" placeholder="Any additional student notes..."></textarea>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button variant="outline" fullWidth onClick={() => setShowAddForm(false)}>Cancel</Button>
                  <Button fullWidth>Save Student</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
