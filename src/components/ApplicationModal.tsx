"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Phone, Mail, GraduationCap } from 'lucide-react';
import Button from './ui/Button';
import { toast } from 'react-hot-toast';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApplicationModal = ({ isOpen, onClose }: ApplicationModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        toast.success('Application submitted successfully!');
        setSubmitted(true);
        setTimeout(() => {
          onClose();
          setSubmitted(false);
          setFormData({ name: '', email: '', phone: '', course: '', message: '' });
        }, 2000);
      } else {
        toast.error(data.error || 'Failed to submit application');
      }
    } catch (err) {
      console.error(err);
      toast.error('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-dark/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white w-full max-w-xl rounded-2xl md:rounded-[3rem] overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="bg-hero-gradient p-6 md:p-8 text-white relative shrink-0">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
              >
                <X size={20} />
              </button>
              <h3 className="text-2xl md:text-3xl font-bold">Join the Academy</h3>
              <p className="text-white/80 font-medium text-sm md:text-base">Fill in your details and we'll get back to you.</p>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 overflow-y-auto">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-20 h-20 bg-primary-green/10 text-primary-green rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send size={40} />
                  </div>
                  <h4 className="text-2xl font-bold text-dark">Application Sent!</h4>
                  <p className="text-slate-500 font-medium">We have received your application. Our team will contact you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-black text-dark uppercase tracking-widest ml-2 flex items-center gap-2">
                        <User size={14} className="text-primary-green" /> Full Name
                      </label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-6 font-medium focus:outline-none focus:border-primary-green transition-all"
                        placeholder="Your Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-black text-dark uppercase tracking-widest ml-2 flex items-center gap-2">
                        <Phone size={14} className="text-primary-green" /> Phone Number
                      </label>
                      <input 
                        required
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-6 font-medium focus:outline-none focus:border-primary-green transition-all"
                        placeholder="Your Phone"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-black text-dark uppercase tracking-widest ml-2 flex items-center gap-2">
                      <Mail size={14} className="text-primary-green" /> Email Address
                    </label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-6 font-medium focus:outline-none focus:border-primary-green transition-all"
                      placeholder="Your Email"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-black text-dark uppercase tracking-widest ml-2 flex items-center gap-2">
                      <GraduationCap size={14} className="text-primary-green" /> Select Course
                    </label>
                    <select 
                      required
                      value={formData.course}
                      onChange={(e) => setFormData({...formData, course: e.target.value})}
                      className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-6 font-medium focus:outline-none focus:border-primary-green transition-all appearance-none"
                    >
                      <option value="">Choose a Program</option>
                      <option value="NEET">NEET Coaching</option>
                      <option value="JEE">JEE Coaching</option>
                      <option value="KEAM">KEAM Coaching</option>
                      <option value="Foundation">Foundation Course</option>
                      <option value="Repeaters">Repeaters Batch</option>
                    </select>
                  </div>

                  <Button 
                    type="submit" 
                    fullWidth 
                    size="lg" 
                    className="h-20 md:h-16 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-green-500/20"
                    disabled={loading}
                  >
                    {loading ? 'Submitting...' : 'Submit Application'}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ApplicationModal;
