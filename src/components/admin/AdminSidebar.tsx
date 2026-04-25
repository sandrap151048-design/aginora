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
  Mail,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Contact', href: '/admin/contact', icon: Mail },
  { name: 'Courses', href: '/admin/courses', icon: BookOpen },
  { name: 'Results', href: '/admin/results', icon: Trophy },
  { name: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
];

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
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

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-16">
        <Link href="/" className="hover:opacity-80 transition-opacity mx-auto">
          <img src="/logo-transparent-white-text-v2.png" alt="Ajinorah Academy" className="h-16 md:h-20 w-auto object-contain" />
        </Link>
        {onClose && (
          <button onClick={onClose} className="lg:hidden text-white p-2">
            <X size={24} />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              onClick={() => onClose && onClose()}
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
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-80 h-screen bg-dark sticky top-0 flex-col p-8 z-50 overflow-y-auto shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 z-[60] lg:hidden backdrop-blur-sm"
            />
            <motion.aside 
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-dark z-[70] p-6 flex flex-col lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminSidebar;
