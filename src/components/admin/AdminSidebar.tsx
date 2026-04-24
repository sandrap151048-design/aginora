"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Users, 
  BookOpen, 
  Trophy, 
  Image as ImageIcon, 
  Star, 
  LogOut,
  ChevronRight,
  Mail
} from 'lucide-react';
import { motion } from 'framer-motion';

const menuItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Contact', href: '/admin/contact', icon: Mail },
  { name: 'Courses', href: '/admin/courses', icon: BookOpen },
  { name: 'Results', href: '/admin/results', icon: Trophy },
  { name: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
];

const AdminSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (err) {
      console.error('Logout failed', err);
    }
    router.push('/');
  };

  return (
    <aside className="w-80 h-screen bg-dark sticky top-0 flex flex-col p-8 z-50 overflow-y-auto">
      <Link href="/" className="flex items-center mb-16 hover:opacity-80 transition-opacity">
        <img src="/logo-dark-bg.png" alt="Ajinorah Academy" className="h-24 w-auto object-contain" />
      </Link>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center justify-between px-6 py-4 rounded-2xl transition-all group ${
                isActive 
                ? 'bg-primary-green text-white shadow-lg shadow-primary-green/20' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-4">
                <item.icon size={20} className={isActive ? 'text-white' : 'group-hover:text-primary-green transition-colors'} />
                <span className="font-bold tracking-tight">{item.name}</span>
              </div>
              {isActive && <motion.div layoutId="sidebar-arrow"><ChevronRight size={16} /></motion.div>}
            </Link>
          );
        })}
      </nav>

      <div className="pt-8 border-t border-white/5 mt-auto">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-4 px-6 py-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all w-full font-bold group"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
