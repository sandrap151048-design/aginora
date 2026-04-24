"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { Lock, Mail, Eye, EyeOff, Zap, ShieldCheck } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Access Granted');
        router.push('/admin/dashboard');
      } else {
        toast.error(data.error || 'Invalid credentials');
      }
    } catch (error) {
      toast.error('Connection failure');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-slate-900">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/backgrounds/login-bg.png" 
          alt="Academy Background" 
          className="w-full h-full object-cover blur-md scale-110"
        />
        <div className="absolute inset-0 bg-slate-900/40 backdrop-brightness-75" />
      </div>

      {/* Soft Blurred Accents for Premium Feel */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary-green/20 blur-[120px] rounded-full z-[1]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary-blue/20 blur-[120px] rounded-full z-[1]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md w-full z-10"
      >
        <div className="bg-white/80 backdrop-blur-xl p-10 md:p-14 rounded-[3.5rem] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.05)] border border-white">
            <div className="flex justify-center mb-0">
              <img src="/logo-dark.png" alt="Ajinorah Academy" className="h-28 w-auto object-contain" />
            </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Enter Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-6 flex items-center text-slate-300 group-focus-within:text-primary-green transition-colors">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-16 pr-6 py-5 rounded-[1.8rem] bg-slate-50 border-2 border-transparent text-dark placeholder:text-slate-300 focus:outline-none focus:border-slate-100 focus:bg-white transition-all font-semibold shadow-sm"
                  placeholder="admin@ajinorah.com" 
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Enter Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-6 flex items-center text-slate-300 group-focus-within:text-primary-green transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-16 pr-16 py-5 rounded-[1.8rem] bg-slate-50 border-2 border-transparent text-dark placeholder:text-slate-300 focus:outline-none focus:border-slate-100 focus:bg-white transition-all font-semibold shadow-sm"
                  placeholder="••••••••" 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 hover:text-dark transition-colors p-2"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" fullWidth className="py-5 text-sm font-black rounded-[1.8rem] uppercase tracking-[0.2em] shadow-xl shadow-primary-green/20" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </div>
          </form>
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-slate-300 text-[10px] font-black uppercase tracking-[0.3em] mt-12"
        >
          &copy; {new Date().getFullYear()} Ajinorah Entrance Academy
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
