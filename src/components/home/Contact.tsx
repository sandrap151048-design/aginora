"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length <= 10) {
        setFormData({ ...formData, [name]: numericValue });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.phone.length !== 10) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success('Your message has been sent successfully!');
        setFormData({ name: '', phone: '', email: '', course: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Info Side */}
          <div className="space-y-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-dark mb-6">Get In <span className="text-primary-green">Touch</span></h2>
              <p className="text-lg text-slate-500">
                Have questions about our courses or admission process? Our team is here to help you every step of the way.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex gap-6 items-center group">
                <div className="w-14 h-14 bg-primary-green/10 rounded-2xl flex items-center justify-center text-primary-green group-hover:bg-primary-green group-hover:text-white transition-all">
                  <Phone size={28} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Call Us</p>
                  <a href="tel:+919876543210" className="text-xl font-bold text-dark hover:text-primary-green transition-colors">+91 98765 43210</a>
                </div>
              </div>

              <div className="flex gap-6 items-center group">
                <div className="w-14 h-14 bg-primary-blue/10 rounded-2xl flex items-center justify-center text-primary-blue group-hover:bg-primary-blue group-hover:text-white transition-all">
                  <Mail size={28} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Email Us</p>
                  <a href="mailto:info@ajinorahacademy.com" className="text-xl font-bold text-dark hover:text-primary-green transition-colors">info@ajinorahacademy.com</a>
                </div>
              </div>

              <div className="flex gap-6 items-center group">
                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all">
                  <MapPin size={28} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Visit Us</p>
                  <a 
                    href="https://maps.google.com/?q=Lal+Bahadur+St,+Kochi,+Kerala" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xl font-bold text-dark hover:text-primary-green transition-colors"
                  >
                    Lal Bahadur St, Kochi, Kerala
                  </a>
                </div>
              </div>
            </div>

            {/* Map Placeholder or Socials */}
            <div className="p-8 bg-secondary-green/30 rounded-[2.5rem] border border-primary-green/10">
              <h4 className="font-bold text-xl mb-4">Office Hours</h4>
              <ul className="space-y-3 text-slate-600">
                <li className="flex justify-between"><span>Mon - Sat:</span> <span className="font-bold">9:00 AM - 7:00 PM</span></li>
                <li className="flex justify-between"><span>Sunday:</span> <span className="font-bold">Closed</span></li>
              </ul>
            </div>
          </div>

          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl border border-slate-100"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-green focus:bg-white transition-all"
                    placeholder="Full Name" 
                    maxLength={35}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    maxLength={10}
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-green focus:bg-white transition-all"
                    placeholder="Phone Number" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-green focus:bg-white transition-all"
                    placeholder="Email address" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Interested Course</label>
                  <select 
                    name="course"
                    required
                    value={formData.course}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-green focus:bg-white transition-all"
                  >
                    <option value="">Select Course</option>
                    <option value="NEET">NEET Coaching</option>
                    <option value="JEE">JEE Coaching</option>
                    <option value="KEAM">KEAM Coaching</option>
                    <option value="Foundation">Foundation Course</option>
                    <option value="Repeaters">Repeaters Batch</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4} 
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-green focus:bg-white transition-all resize-none"
                  placeholder="Tell us more about your requirement"
                ></textarea>
              </div>

              <Button 
                type="submit" 
                fullWidth 
                size="lg" 
                disabled={loading}
                className="py-4 text-xl"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
