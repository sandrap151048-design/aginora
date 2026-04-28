"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Eye, Trash2, Mail } from 'lucide-react';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function ContactManagementPage() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const res = await fetch('/api/admin/enquiries', { cache: 'no-store' });
      const json = await res.json();
      if (json.success) setEnquiries(json.data);
    } catch (err) {
      toast.error('Failed to load contact submissions');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;
    console.log("Deleting enquiry with ID:", id);
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, { 
        method: 'DELETE',
        cache: 'no-store'
      });
      const json = await res.json();
      
      if (json.success) {
        toast.success('Submission deleted');
        await fetchEnquiries();
      } else {
        toast.error(json.error || 'Failed to delete submission');
      }
    } catch (err) {
      toast.error('Failed to delete submission');
    }
  };

  const handleExport = () => {
    if (enquiries.length === 0) {
      toast.error('No data to export');
      return;
    }

    const headers = ['Name', 'Email', 'Phone', 'District', 'Course', 'Message', 'Date'];
    const csvData = enquiries.map(item => [
      item.name,
      item.email || 'N/A',
      item.phone,
      item.district || 'N/A',
      item.course,
      item.message?.replace(/,/g, ' '),
      new Date(item.createdAt).toLocaleDateString()
    ].join(','));

    const csvContent = [headers.join(','), ...csvData].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ajinora_enquiries_${new Date().toLocaleDateString().replace(/\//g, '-')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Data exported successfully');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-dark mb-1">Contact Management</h1>
          <p className="text-slate-500">Manage all website form submissions and enquiries.</p>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={handleExport} variant="outline">Export Data</Button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-50 flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[300px] relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search submissions..." 
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-green focus:bg-white transition-all text-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-6 text-sm font-bold text-slate-600">Sender Details</th>
                <th className="px-8 py-6 text-sm font-bold text-slate-600">Interested In</th>
                <th className="px-8 py-6 text-sm font-bold text-slate-600">Date Received</th>
                <th className="px-8 py-6 text-sm font-bold text-slate-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr><td colSpan={4} className="px-8 py-6 text-center text-slate-500">Loading submissions...</td></tr>
              ) : enquiries.length === 0 ? (
                <tr><td colSpan={4} className="px-8 py-6 text-center text-slate-500">No contact messages found.</td></tr>
              ) : enquiries.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div>
                      <p className="font-bold text-dark">{item.name}</p>
                      <p className="text-sm text-slate-500">{item.phone} {item.district ? `• ${item.district}` : ''}</p>
                      {item.email && <p className="text-[10px] text-slate-400 font-medium">{item.email}</p>}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-primary-blue/10 text-primary-blue rounded-lg text-xs font-bold">
                      {item.course}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-sm font-medium text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setSelectedEnquiry(item)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500"><Eye size={18} /></button>
                      <button onClick={() => handleDelete(item._id)} className="p-2 hover:bg-red-50 rounded-lg text-red-500"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      <AnimatePresence>
        {selectedEnquiry && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEnquiry(null)}
              className="absolute inset-0 bg-dark/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-slate-50">
                <h3 className="text-2xl font-black text-dark">Enquiry Details</h3>
                <p className="text-slate-500 text-sm">Submitted on {new Date(selectedEnquiry.createdAt).toLocaleString()}</p>
              </div>
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Sender</p>
                    <p className="font-bold text-dark">{selectedEnquiry.name}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Course</p>
                    <p className="font-bold text-primary-blue">{selectedEnquiry.course}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Contact Info</p>
                  <p className="font-bold text-dark">
                    {selectedEnquiry.phone} 
                    {selectedEnquiry.district ? ` • ${selectedEnquiry.district}` : ''}
                  </p>
                  {selectedEnquiry.email && <p className="text-sm text-slate-500">{selectedEnquiry.email}</p>}
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Message</p>
                  <p className="text-slate-600 leading-relaxed italic">
                    "{selectedEnquiry.message || 'No specific message provided.'}"
                  </p>
                </div>
              </div>
              <div className="p-8 bg-slate-50 flex justify-end">
                <Button onClick={() => setSelectedEnquiry(null)} variant="black">Close Details</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
