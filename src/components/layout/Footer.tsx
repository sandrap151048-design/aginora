import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Linkedin } from 'lucide-react';

const Footer = () => {
  // Defensive check for icon components
  const SafeIcon = ({ Icon, ...props }: any) => {
    if (!Icon) return <div className="w-5 h-5 bg-slate-800 rounded-full" />;
    return <Icon {...props} />;
  };

  return (
    <footer className="bg-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div>
            <div className="flex items-center mb-6">
              <img src="/logo-transparent-white-text-v2.png" alt="Ajinorah Academy" className="h-20 md:h-24 w-auto object-contain" />
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Leading entrance coaching institute for NEET, JEE, and KEAM. We provide quality education with a focus on conceptual clarity.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center transition-all hover:bg-primary-green hover:-translate-y-1">
                <SafeIcon Icon={Facebook} size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center transition-all hover:bg-primary-green hover:-translate-y-1">
                <SafeIcon Icon={Instagram} size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center transition-all hover:bg-primary-green hover:-translate-y-1">
                <SafeIcon Icon={Youtube} size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center transition-all hover:bg-primary-green hover:-translate-y-1">
                <SafeIcon Icon={Linkedin} size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-black mb-6 border-l-4 border-primary-green pl-3 uppercase tracking-widest text-sm">Navigation</h3>
            <ul className="space-y-4">
              <li><Link href="/" className="text-slate-400 hover:text-primary-green transition-all font-bold">Home</Link></li>
              <li><Link href="/about" className="text-slate-400 hover:text-primary-green transition-all font-bold">About Us</Link></li>
              <li><Link href="/courses" className="text-slate-400 hover:text-primary-green transition-all font-bold">Our Courses</Link></li>
              <li><Link href="/results" className="text-slate-400 hover:text-primary-green transition-all font-bold">Results</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-primary-green transition-all font-bold">Contact</Link></li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-xl font-black mb-6 border-l-4 border-primary-blue pl-3 uppercase tracking-widest text-sm">Programs</h3>
            <ul className="space-y-4">
              <li><Link href="/courses/neet-coaching" className="text-slate-400 hover:text-primary-green transition-all font-bold">NEET Coaching</Link></li>
              <li><Link href="/courses/jee-coaching" className="text-slate-400 hover:text-primary-green transition-all font-bold">JEE Coaching</Link></li>
              <li><Link href="/courses/keam-coaching" className="text-slate-400 hover:text-primary-green transition-all font-bold">KEAM Coaching</Link></li>
              <li><Link href="/courses/integrated-schooling" className="text-slate-400 hover:text-primary-green transition-all font-bold">Integrated Plus Two</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-black mb-6 border-l-4 border-primary-green pl-3 uppercase tracking-widest text-sm">Reach Us</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="text-primary-green shrink-0 mt-1" size={20} />
                <span className="text-slate-400 font-bold leading-tight">123 Education Hub, Near Central Square, Kochi, Kerala</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="text-primary-green shrink-0" size={20} />
                <span className="text-lg font-black">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="text-primary-green shrink-0" size={20} />
                <span className="text-slate-400 font-bold">info@ajinorah.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs font-bold uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Ajinorah Academy. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white">Privacy</Link>
            <Link href="#" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
