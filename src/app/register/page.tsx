"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import TopBanner from '@/components/layout/TopBanner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Send, User, Phone, Mail, GraduationCap, ChevronDown, CheckCircle2, Star, Users, BookOpen, Trophy, Headphones, Clock, Shield, ArrowRight, Sparkles, Target, Zap, Heart, MapPin } from 'lucide-react';
import Button from '@/components/ui/Button';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

function RegisterForm() {
  const searchParams = useSearchParams();
  const initialCourse = searchParams.get('course') || '';

  const [formData, setFormData] = useState({
    name: '',
    district: '',
    countryCode: '+91',
    phone: '',
    course: initialCourse,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const districts = [
    'Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod', 
    'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad', 
    'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad',
    'Outside Kerala'
  ];

  useEffect(() => {
    if (initialCourse) {
      setFormData(prev => ({ ...prev, course: initialCourse }));
    }
  }, [initialCourse]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.phone.length < 7) {
      toast.error('Please enter a valid phone number');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          district: formData.district,
          phone: `${formData.countryCode}${formData.phone}`,
          course: formData.course
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
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

  if (submitted) {
    return (
      <div className="py-20 text-center space-y-8 bg-white rounded-[3rem] p-12 shadow-2xl border border-emerald-100 max-w-2xl mx-auto">
        <div className="w-28 h-28 bg-primary-green/10 text-primary-green rounded-full flex items-center justify-center mx-auto animate-bounce">
          <Send size={52} />
        </div>
        <div className="space-y-4">
          <h4 className="text-4xl font-black text-dark">Success!</h4>
          <p className="text-slate-500 font-medium text-lg leading-relaxed">
            Your registration is complete. One of our senior academic counselors will contact you within the next 24 hours.
          </p>
        </div>
        <div className="pt-6">
          <Link href="/">
            <Button className="px-12 h-16 rounded-2xl font-black uppercase tracking-widest bg-dark hover:bg-primary-green transition-all shadow-xl">
              Back to Homepage
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden relative group transition-all hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15)] max-w-md mx-auto lg:ml-auto">
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-primary-green via-emerald-400 to-primary-green" />

      <div className="bg-slate-950 px-6 py-4 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary-green/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-0.5">
            <GraduationCap size={14} className="text-primary-green" />
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-primary-green">Session 2024–25</span>
          </div>
          <h3 className="text-lg font-black tracking-tight">Complete <span className="text-primary-green">Registration</span></h3>
          <p className="text-white/50 text-[10px] font-medium">Quick and easy enrollment process.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {/* Name Field */}
        <div className="space-y-1">
          <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
            <User size={11} className="text-primary-green" /> Name*
          </label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full h-10 bg-slate-50 border-2 border-slate-100 rounded-xl px-4 text-sm font-semibold text-dark focus:outline-none focus:border-primary-green focus:bg-white transition-all placeholder:text-slate-300"
              placeholder="Your Name"
            />
          </div>

          {/* District Field */}
          <div className="space-y-1">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <MapPin size={11} className="text-primary-green" /> District*
            </label>
            <div className="relative">
              <select
                required
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full h-10 bg-slate-50 border-2 border-slate-100 rounded-xl px-4 text-sm font-semibold text-dark focus:outline-none focus:border-primary-green focus:bg-white transition-all appearance-none cursor-pointer"
              >
                <option value="">Select District</option>
                {districts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <ChevronDown size={14} />
              </div>
            </div>
          </div>

          {/* Phone Section */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1 space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                Code*
              </label>
              <div className="relative">
                <select
                  value={formData.countryCode}
                  onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                  className="w-full h-10 bg-slate-50 border-2 border-slate-100 rounded-xl px-3 text-xs font-bold text-dark focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="+91">+91</option>
                  <option value="+971">+971</option>
                  <option value="+44">+44</option>
                  <option value="+1">+1</option>
                </select>
              </div>
            </div>
            <div className="col-span-2 space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <Phone size={11} className="text-primary-green" /> Phone Number*
              </label>
              <input
                required
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                className="w-full h-10 bg-slate-50 border-2 border-slate-100 rounded-xl px-4 text-sm font-semibold text-dark focus:outline-none focus:border-primary-green focus:bg-white transition-all placeholder:text-slate-300"
                placeholder="10-digit number"
              />
            </div>
          </div>

          {/* Course Field */}
          <div className="space-y-1">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <GraduationCap size={11} className="text-primary-green" /> Select Your Course*
            </label>
            <div className="relative">
              <select
                required
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                className="w-full h-10 bg-slate-50 border-2 border-slate-100 rounded-xl px-4 text-sm font-semibold text-dark focus:outline-none focus:border-primary-green focus:bg-white transition-all appearance-none cursor-pointer"
              >
                <option value="">Select Course</option>
                {programs.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <ChevronDown size={14} />
              </div>
            </div>
          </div>

        <div className="flex items-center justify-between gap-4 py-3 px-1 border-t border-slate-100 mt-2">
          <div className="flex items-center gap-2 text-[8px] font-black text-slate-400 uppercase tracking-widest">
            <Shield size={12} className="text-primary-green" /> Verified
          </div>
          <div className="flex items-center gap-2 text-[8px] font-black text-slate-400 uppercase tracking-widest">
            <Clock size={12} className="text-primary-green" /> Priority Response
          </div>
        </div>

        <Button
          type="submit"
          fullWidth
          size="sm"
          className="h-12 rounded-xl font-black uppercase tracking-[0.2em] shadow-xl shadow-green-500/20 text-[10px] group-hover:scale-[1.02] transition-transform duration-300"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Complete Registration'}
        </Button>
      </form>
    </div>
  );
}

const stats = [
  { value: '12+', label: 'Years Experience', icon: Zap },
  { value: '5K+', label: 'Success Stories', icon: Target },
  { value: '50+', label: 'Expert Faculty', icon: Users },
  { value: '95%', label: 'Results Ratio', icon: Trophy },
];

const programs = [
  { 
    name: 'Online Tuition Program', 
    duration: 'Flexible Schedule', 
    badge: 'Virtual', 
    color: 'bg-blue-600',
    lightColor: 'bg-blue-100',
    textColor: 'text-blue-600',
    slug: 'online-tuition-program',
    image: 'https://boardingadmission.com/exam/mainlogin/assets/img/blog/3.jpg',
    features: ['Live Interactive Classes', 'Recorded Sessions', 'Digital Study Materials']
  },
  { 
    name: 'Foundation Program', 
    duration: '1–5 Years', 
    badge: 'Academic', 
    color: 'bg-purple-600',
    lightColor: 'bg-purple-100',
    textColor: 'text-purple-600',
    slug: 'foundation-program',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800',
    features: ['Classes 8th - 10th', 'Base Building', 'Entrance Orientation']
  },
  { 
    name: 'Plus Two + Entrance', 
    duration: '1–2 Years', 
    badge: 'Popular', 
    color: 'bg-emerald-600',
    lightColor: 'bg-emerald-100',
    textColor: 'text-emerald-600',
    slug: 'plus-one-plus-two-tuition',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop',
    features: ['Parallel Coaching', 'NEET/JEE Ready', 'Chapter-wise Exams']
  },
  { 
    name: 'Integrated Schooling', 
    duration: '2 Years', 
    badge: 'Integrated', 
    color: 'bg-primary-green',
    lightColor: 'bg-secondary-green',
    textColor: 'text-primary-green',
    slug: 'integrated-schooling-program',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800',
    features: ['School + Academy', 'On-Campus Sessions', 'Total Consistency']
  },
  { 
    name: 'Repeaters Batch', 
    duration: '1 Year', 
    badge: 'Residential', 
    color: 'bg-red-600',
    lightColor: 'bg-red-100',
    textColor: 'text-red-600',
    slug: 'repeaters-batch',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800',
    features: ['Intensive Prep', 'Residential Campus', 'Full-day Curriculum']
  },
];

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-white">
      <TopBanner />
      <Header />

      <section className="relative min-h-[95vh] flex items-center justify-center pt-32 pb-24 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
            alt="University"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-950/70 to-primary-green/30" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 space-y-10 text-center lg:text-left text-white">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-green"></span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Admissions Open 2024-25</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black leading-[0.95] tracking-tight">
                Empowering Your <br /><span className="text-primary-green">Ambitions</span>
              </h1>
              <p className="text-lg md:text-2xl text-white/70 font-medium max-w-2xl mx-auto lg:mx-0">
                Join Kerala's elite entrance coaching community. Scientific methodology combined with expert mentoring.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
                {stats.map((s, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-center lg:justify-start gap-2 text-primary-green">
                      <s.icon size={20} />
                      <span className="text-3xl font-black text-white">{s.value}</span>
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 relative lg:mt-20 lg:translate-y-12">
              <Suspense fallback={<div>Loading...</div>}>
                <RegisterForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="mb-20 space-y-4">
            <div className="text-primary-green font-black text-xs uppercase tracking-[0.3em]">Our Specializations</div>
            <h2 className="text-5xl font-black text-dark tracking-tighter">Programs Built for <span className="text-primary-green">Champions</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((prog, i) => (
              <div key={i} className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col h-full hover:-translate-y-2 relative">
                {/* Top Image Section */}
                <div className="h-56 relative overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img
                    src={prog.image || 'https://images.unsplash.com/photo-1501503060809-54bc4151eeac?q=80&w=800'}
                    alt={prog.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1501503060809-54bc4151eeac?q=80&w=800';
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  {/* Badge */}
                  <div className={`absolute top-5 left-5 z-20 px-4 py-2 bg-white/90 backdrop-blur-md ${prog.textColor} text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-xl border border-white/50`}>
                    {prog.badge}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-7 flex flex-col flex-1 bg-white relative z-20">
                  <div className="flex-1 space-y-4">
                    <h3 className="text-xl font-black text-dark tracking-tight leading-tight group-hover:text-primary-green transition-colors duration-300">
                      {prog.name}
                    </h3>
                    <div className="flex items-center gap-2 text-slate-400 font-bold text-xs">
                      <Clock size={14} className="text-primary-green" /> {prog.duration}
                    </div>

                    <div className="space-y-3 pt-2">
                      {prog.features.map((f, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-lg ${prog.lightColor} flex items-center justify-center shrink-0`}>
                            <CheckCircle2 size={12} className={prog.textColor} />
                          </div>
                          <span className="text-slate-500 font-medium text-[13px]">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 mt-6 border-t border-slate-100/50">
                    <Link href={`/courses/${prog.slug}`} className="block">
                      <button className="w-full py-3 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-500 bg-slate-50 hover:bg-slate-100 hover:text-dark transition-all duration-300 border border-slate-200">
                        View Program Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="text-primary-green font-black text-xs uppercase tracking-[0.3em] mb-4"><Shield size={14} /> The Ajinorah Promise</div>
            <h2 className="text-5xl font-black text-dark tracking-tighter">Why Choose <span className="text-primary-green">Ajinorah</span>?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { t: 'Expert Faculty', d: 'Experienced educators in NEET & JEE.', i: Users },
              { t: 'Proven Methodology', d: 'Scientific coaching and intensive practice.', i: Target },
              { t: 'Personalized Attention', d: 'Small batches and dedicated mentors.', i: Heart },
              { t: 'Smart Learning Tools', d: 'Advanced digital portal and analytics.', i: Zap },
              { t: 'Comprehensive Material', d: 'Exclusively prepared study modules.', i: BookOpen },
              { t: 'Holistic Support', d: 'Counseling and motivational sessions.', i: Headphones },
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 hover:border-primary-green transition-all group">
                <div className="w-16 h-16 bg-primary-green/10 text-primary-green rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-green group-hover:text-white transition-all">
                  <item.i size={32} />
                </div>
                <h4 className="text-xl font-black text-dark mb-3">{item.t}</h4>
                <p className="text-slate-500 text-sm">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="text-primary-green font-black text-xs uppercase tracking-[0.3em] mb-4"><Heart size={14} /> Holistic Care</div>
            <h2 className="text-5xl font-black text-dark tracking-tighter">Beyond Just <span className="text-primary-green">Coaching</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { t: 'One-on-One Mentoring', d: 'Dedicated personal guides.', i: Users },
              { t: 'Psychological Care', d: 'Professional counseling support.', i: Headphones },
              { t: 'Stress Management', d: 'Yoga and meditation sessions.', i: Zap },
              { t: 'Parent Portal', d: 'Real-time updates for parents.', i: Shield },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:border-primary-green transition-all group">
                <div className="w-14 h-14 bg-slate-50 text-primary-green rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-green group-hover:text-white transition-all">
                  <item.i size={24} />
                </div>
                <h4 className="text-xl font-black text-dark mb-2">{item.t}</h4>
                <p className="text-slate-500 text-sm">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-slate-950 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-green/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-5xl font-black text-white tracking-tighter mb-16">Your Road to <span className="text-primary-green">Success</span></h2>
          <div className="flex flex-col md:flex-row justify-between gap-12">
            {[
              { n: '01', t: 'Register', d: 'Submit your interest through our form' },
              { n: '02', t: 'Counsel', d: 'Get expert guidance from our mentors' },
              { n: '03', t: 'Enroll', d: 'Secure your seat and complete formalities' },
              { n: '04', t: 'Succeed', d: 'Begin your journey towards top ranks' },
            ].map((step, i) => (
              <div key={i} className="flex-1 space-y-6 group">
                <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mx-auto text-2xl font-black text-primary-green group-hover:bg-primary-green group-hover:text-white transition-all duration-500">{step.n}</div>
                <h4 className="text-white text-xl font-black uppercase tracking-widest">{step.t}</h4>
                <p className="text-white/40 text-sm max-w-[200px] mx-auto leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREPARATION STRATEGY ── */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2 space-y-12">
              <div className="space-y-4">
                <div className="text-primary-green font-black text-xs uppercase tracking-[0.3em]">Scientific Approach</div>
                <h2 className="text-5xl md:text-7xl font-black text-dark tracking-tighter leading-[0.95]">
                  The <span className="text-primary-green">Three Layer</span> <br /> Preparation
                </h2>
              </div>
              <div className="space-y-8">
                {[
                  { t: 'Concept Foundation', d: 'In-depth conceptual clarity through visualized learning and expert lectures.', i: BookOpen },
                  { t: 'Intensive Application', d: 'Translating knowledge into results through daily practice problems and error analysis.', i: Target },
                  { t: 'Exam Simulation', d: 'Real-time mock tests that mimic national level entrance environments to build stamina.', i: Shield },
                ].map((step, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-16 h-16 shrink-0 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center group-hover:bg-primary-green group-hover:text-white transition-all duration-500">
                      <step.i size={24} />
                    </div>
                    <div className="space-y-1 pt-2">
                      <h4 className="text-xl font-black text-dark">{step.t}</h4>
                      <p className="text-slate-500 font-medium leading-relaxed">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-primary-green/20 rounded-[4rem] rotate-3 -z-10 blur-2xl opacity-30" />
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800" 
                className="rounded-[4rem] shadow-2xl border-4 border-white"
                alt="Strategy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── DIGITAL ECOSYSTEM ── */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-green/10 rounded-full blur-[150px] translate-x-1/2 translate-y-1/2" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-6 mb-20">
            <div className="text-primary-green font-black text-xs uppercase tracking-[0.3em]">Next-Gen Learning</div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Our Digital <span className="text-primary-green">Ecosystem</span></h2>
            <p className="text-white/50 text-lg font-medium">Technology that empowers, analytics that guide, and materials that deliver results.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { t: 'Ajinorah App', d: '24/7 access to recorded lectures and notes.', i: Zap },
              { t: 'Performance Analytics', d: 'Detailed tracking of your test scores and improvement areas.', i: Target },
              { t: 'Smart Testing Portal', d: 'All-India Ranking system with simulated NTA interface.', i: Shield },
              { t: 'Interactive LMS', d: 'Centralized repository for all digital study materials.', i: Sparkles },
            ].map((tech, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-all text-left group">
                <div className="w-12 h-12 bg-primary-green/10 text-primary-green rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-green group-hover:text-white transition-all">
                  <tech.i size={20} />
                </div>
                <h4 className="text-white text-lg font-black mb-2">{tech.t}</h4>
                <p className="text-white/40 text-sm leading-relaxed">{tech.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="py-32 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <div className="text-primary-green font-black text-xs uppercase tracking-[0.3em] mb-4">Questions?</div>
            <h2 className="text-5xl font-black text-dark tracking-tighter">Frequently Asked <span className="text-primary-green">Queries</span></h2>
          </div>
          <div className="space-y-4">
            {[
              { q: 'How do I choose the right program for my goals?', a: 'Our academic counselors provide one-on-one sessions to assess your current level and goals before recommending a specific batch.' },
              { q: 'What is the frequency of mock tests?', a: 'Mock tests are conducted weekly, followed by intensive paper discussion and personalized error analysis sessions.' },
              { q: 'Is there a residential facility for repeaters?', a: 'Yes, we have fully equipped, separate residential campuses for boys and girls with 24/7 academic support.' },
              { q: 'Can I switch from Online to Offline batches?', a: 'Yes, we offer flexible migration options between our digital and physical learning centers depending on seat availability.' },
            ].map((faq, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 hover:border-primary-green transition-all cursor-default group">
                <h4 className="text-lg font-black text-dark mb-3 flex items-center justify-between">
                  {faq.q}
                  <ChevronDown size={20} className="text-slate-300 group-hover:text-primary-green transition-colors" />
                </h4>
                <p className="text-slate-500 font-medium leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
