"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, BookOpen, Clock, Tag, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', duration: '', fees: '', status: 'Active', description: '' });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/admin/courses');
      const json = await res.json();
      if (json.success) setCourses(json.data);
    } catch (err) {
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    try {
      const res = await fetch(`/api/admin/courses/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Course deleted');
        fetchCourses();
      }
    } catch (err) {
      toast.error('Failed to delete course');
    }
  };

  const handleEdit = (course: any) => {
    setFormData({ 
      name: course.name, 
      duration: course.duration || '', 
      fees: course.fees || '', 
      status: course.status || 'Active', 
      description: course.description || '' 
    });
    setEditId(course._id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editId ? `/api/admin/courses/${editId}` : '/api/admin/courses';
    const method = editId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success(editId ? 'Course updated' : 'Course added');
        setShowForm(false);
        setEditId(null);
        setFormData({ name: '', duration: '', fees: '', status: 'Active', description: '' });
        fetchCourses();
      } else {
        const json = await res.json();
        toast.error(json.error || 'Failed to save course');
      }
    } catch (err) {
      toast.error('Failed to save course');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:items-center md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-dark mb-1">Courses Management</h1>
          <p className="text-slate-500">Add, edit or update coaching courses.</p>
        </div>
        <Button onClick={() => { 
          setShowForm(true); 
          setEditId(null); 
          setFormData({ name: '', duration: '', fees: '', status: 'Active', description: '' });
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} className="relative bg-primary-green text-white px-12 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all text-sm min-w-[200px]">
          <div className="flex items-center justify-center gap-1">
            <span>Add Course</span>
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
              <h2 className="text-xl font-bold text-dark">{editId ? 'Edit Course' : 'Add New Course'}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required type="text" placeholder="Course Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-primary-green" />
                <input type="text" placeholder="Duration (e.g. 1 Year)" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-primary-green" />
                <input type="text" placeholder="Fees (e.g. ₹ 45,000)" value={formData.fees} onChange={e => setFormData({...formData, fees: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-primary-green" />
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-primary-green">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <textarea placeholder="Description" rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-primary-green resize-none"></textarea>
              <Button type="submit">Save Course</Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? <p className="text-slate-500">Loading courses...</p> : courses.map((course) => (
          <motion.div 
            key={course._id}
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50 relative group flex flex-col"
          >
            <div className="absolute top-6 right-6 flex gap-2">
              <button onClick={() => handleEdit(course)} className="p-2 bg-slate-50 text-slate-400 hover:text-primary-blue hover:bg-primary-blue/10 rounded-xl transition-all"><Edit size={18} /></button>
              <button onClick={() => handleDelete(course._id)} className="p-2 bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18} /></button>
            </div>

            <div className="w-14 h-14 bg-primary-green/10 rounded-2xl flex items-center justify-center text-primary-green mb-6 shrink-0">
              <BookOpen size={28} />
            </div>

            <h3 className="text-2xl font-bold text-dark mb-2">{course.name}</h3>
            <p className="text-slate-500 text-sm mb-6 flex-1">{course.description || 'No description available'}</p>

            <div className="space-y-3 pt-6 border-t border-slate-50">
              <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                <Clock size={16} className="text-primary-blue shrink-0" />
                <span>Duration: {course.duration || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                <Tag size={16} className="text-primary-green shrink-0" />
                <span>Fees: {course.fees || 'N/A'}</span>
              </div>
            </div>

            <div className="mt-8">
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${course.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {course.status}
              </span>
            </div>
          </motion.div>
        ))}
        {courses.length === 0 && !loading && <p className="text-slate-500 col-span-full">No courses found.</p>}
      </div>
    </div>
  );
}
