"use client";
import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { Plus, Image as ImageIcon, Video, Trash2, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function GalleryManagement() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ title: '', type: 'image', url: '' });
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);
  const fetchItems = async () => {
    try {
      const res = await fetch('/api/admin/gallery');
      const json = await res.json();
      if (json.success) setItems(json.data);
    } catch (err) {
      toast.error('Failed to load gallery items');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Deleted successfully');
        fetchItems();
      } else {
        toast.error('Failed to delete');
      }
    } catch (err) {
      toast.error('Error deleting item');
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('type', formData.type);
      if (formData.type === 'image' && file) {
        data.append('file', file);
      } else {
        data.append('url', formData.url);
      }

      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        toast.success('Added successfully');
        setIsAdding(false);
        setFormData({ title: '', type: 'image', url: '' });
        setFile(null);
        fetchItems();
      } else {
        toast.error(json.error || 'Failed to add item');
      }
    } catch (err) {
      toast.error('Error adding item');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-3xl font-black text-dark">Gallery Management</h1>
           <p className="text-slate-500">Manage images and videos for the public gallery.</p>
        </div>
        <Button 
          onClick={() => {
            setIsAdding(!isAdding);
            if (!isAdding) window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
          className="relative bg-primary-green text-white px-12 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all text-sm min-w-[200px]"
        >
          <div className="flex items-center justify-center gap-1">
            <span>{isAdding ? 'Cancel' : 'Add Gallery Item'}</span>
            {!isAdding && <Plus size={12} className="mb-2" />}
          </div>
        </Button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[3rem] shadow-xl border border-slate-50 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-2">Item Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary-green font-bold text-dark"
              >
                <option value="image">Image (Upload from PC)</option>
                <option value="video">Video (YouTube/Embed URL)</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-2">Title / Label</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary-green font-bold text-dark"
                placeholder="e.g. Annual Day 2024"
              />
            </div>
          </div>

          <div className="p-10 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
            {formData.type === 'image' ? (
              <div className="text-center space-y-4">
                <ImageIcon className="mx-auto text-slate-300" size={48} />
                <div className="space-y-1">
                  <p className="font-bold text-dark">Upload Image File</p>
                  <p className="text-xs text-slate-400 font-medium">JPG, PNG or WEBP (Max 5MB)</p>
                </div>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="hidden" 
                  id="gallery-file"
                />
                <label 
                  htmlFor="gallery-file"
                  className="inline-block px-8 py-3 bg-white border border-slate-200 rounded-xl font-bold text-sm hover:bg-dark hover:text-white transition-all cursor-pointer shadow-sm"
                >
                  {file ? file.name : 'Choose Image'}
                </label>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary-blue mb-2">
                   <Video size={20} />
                   <span className="font-black text-xs uppercase tracking-widest">Video Embed Details</span>
                </div>
                <input
                  type="url"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full bg-white border-none rounded-2xl px-6 py-5 focus:ring-2 focus:ring-primary-blue font-bold text-dark shadow-sm"
                  placeholder="Paste YouTube embed URL here..."
                />
                <p className="text-[10px] text-slate-400 font-bold ml-2">Note: For YouTube, use the 'Embed' URL from the share menu.</p>
              </div>
            )}
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={submitting} className="px-12 py-4 rounded-2xl shadow-xl shadow-primary-green/20">
              {submitting ? 'Uploading...' : 'Publish to Gallery'}
            </Button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary-green" size={40} /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item._id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-50 relative group">
              {item.type === 'image' ? (
                <img src={item.url} alt={item.title} className="w-full h-48 object-cover bg-slate-100" />
              ) : (
                <div className="w-full h-48 bg-slate-100 flex items-center justify-center text-slate-400 relative">
                  <Video size={48} />
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/10">
                    <iframe src={item.url} className="w-full h-full pointer-events-none" allowFullScreen></iframe>
                  </div>
                </div>
              )}
              <div className="p-4 flex justify-between items-center">
                <span className="font-bold text-dark truncate flex-1 pr-4">{item.title || 'Untitled'}</span>
                <button 
                  onClick={() => handleDelete(item._id)}
                  className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && !isAdding && (
            <div className="col-span-full py-20 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-[3rem]">
              <ImageIcon size={48} className="mx-auto mb-4 opacity-50" />
              <p>No gallery items found. Add some images or videos!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
