"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trophy, X, Edit, Trash2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function ResultsManagement() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', course: '', rank: '', image: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const res = await fetch('/api/admin/results');
      const json = await res.json();
      if (json.success) setResults(json.data);
    } catch (err) {
      toast.error('Failed to load results');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this result?')) return;
    try {
      const res = await fetch(`/api/admin/results/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Result deleted');
        fetchResults();
      }
    } catch (err) {
      toast.error('Failed to delete result');
    }
  };

  const handleEdit = (result: any) => {
    setFormData({ name: result.name, course: result.course || '', rank: result.rank || '', image: result.image || '' });
    setEditId(result._id);
    setShowForm(true);
    setImageFile(null);
    setImagePreview(result.image || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editId ? `/api/admin/results/${editId}` : '/api/admin/results';
    const method = editId ? 'PUT' : 'POST';

    try {
      let res;
      if (imageFile) {
        const fd = new FormData();
        fd.append('name', formData.name);
        fd.append('course', formData.course);
        fd.append('rank', formData.rank);
        fd.append('file', imageFile);
        res = await fetch(url, { method, body: fd });
      } else {
        res = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }
      if (res.ok) {
        toast.success(editId ? 'Result updated' : 'Result added');
        setShowForm(false);
        setEditId(null);
        setFormData({ name: '', course: '', rank: '', image: '' });
        setImageFile(null);
        setImagePreview('');
        fetchResults();
      } else {
        toast.error('Failed to save result');
      }
    } catch (err) {
      toast.error('Failed to save result');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-dark">Results Management</h1>
          <p className="text-slate-500">Add student ranks and achievement images.</p>
        </div>
        <Button onClick={() => { 
          setShowForm(true); 
          setEditId(null); 
          setFormData({ name: '', course: '', rank: '', image: '' });
          setImageFile(null);
          setImagePreview('');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} className="relative bg-primary-green text-white px-12 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all text-sm min-w-[200px]">
          <div className="flex items-center justify-center gap-1">
            <span>Add Result</span>
            <Plus size={12} className="mb-2" />
          </div>
        </Button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50 relative space-y-4">
              <button type="button" onClick={() => setShowForm(false)} className="absolute top-6 right-6 text-slate-400 hover:text-dark">
                <X size={24} />
              </button>
              <h2 className="text-xl font-bold text-dark">{editId ? 'Edit Result' : 'Add New Result'}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required type="text" placeholder="Student Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-primary-green" />
                <input required type="text" placeholder="Course (e.g. NEET 2024)" value={formData.course} onChange={e => setFormData({...formData, course: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-primary-green" />
                <input required type="text" placeholder="Rank (e.g. 124)" value={formData.rank} onChange={e => setFormData({...formData, rank: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-primary-green" />
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-500 px-2">Student Photo (optional)</label>
                  <label className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors border-2 border-dashed border-slate-200 hover:border-primary-green">
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                    <span className="text-slate-400 text-sm flex-1">{imageFile ? imageFile.name : 'Click to choose image...'}</span>
                  </label>
                </div>
              </div>
              {imagePreview && (
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                  <img src={imagePreview} alt="Preview" className="h-20 w-20 object-cover rounded-xl border border-slate-200" />
                  <div>
                    <p className="text-sm font-bold text-dark">Image Preview</p>
                    <button type="button" onClick={() => { setImageFile(null); setImagePreview(''); }} className="text-xs text-red-400 hover:text-red-600 mt-1">Remove</button>
                  </div>
                </div>
              )}
              <Button type="submit">Save Result</Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {loading ? <p className="text-slate-500">Loading...</p> : results.map((result) => (
          <div key={result._id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-50 relative group">
            {result.image ? (
               <img src={result.image} alt={result.name} className="h-48 w-full object-cover bg-slate-100" />
            ) : (
               <div className="h-48 bg-slate-100 flex items-center justify-center text-slate-300">
                 <Trophy size={48} />
               </div>
            )}
            <div className="p-6">
              <h3 className="font-bold text-lg text-dark truncate">{result.name}</h3>
              <p className="text-sm text-primary-blue font-bold truncate">{result.course} Rank: {result.rank}</p>
              <div className="mt-4 flex gap-2">
                <button 
                  onClick={() => handleEdit(result)}
                  className="flex-1 px-4 py-2 bg-slate-50 text-slate-600 font-bold rounded-xl hover:bg-primary-blue hover:text-white transition-all text-sm"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(result._id)}
                  className="flex-1 px-4 py-2 bg-slate-50 text-red-500 font-bold rounded-xl hover:bg-red-50 transition-all text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {results.length === 0 && !loading && <p className="text-slate-500 col-span-full">No results found.</p>}
      </div>
    </div>
  );
}
