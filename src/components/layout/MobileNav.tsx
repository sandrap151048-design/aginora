
"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Trophy, Image, Phone, User } from 'lucide-react';
import { motion } from 'framer-motion';

const MobileNav = () => {
  const pathname = usePathname();

  const links = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Courses', href: '/courses', icon: BookOpen },
    { name: 'Results', href: '/results', icon: Trophy },
    { name: 'Gallery', href: '/gallery', icon: Image },
    { name: 'Contact', href: '/contact', icon: Phone },
  ];

  // Don't show on admin pages
  if (pathname?.startsWith('/admin')) return null;

  return (
    <div className="lg:hidden fixed bottom-6 inset-x-6 z-[100]">
      <motion.nav 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2.5rem] px-6 py-3 flex justify-between items-center"
      >
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link 
              key={link.name} 
              href={link.href}
              className="relative flex flex-col items-center gap-1 group"
            >
              <div className={`p-2 rounded-2xl transition-all duration-300 ${
                isActive ? 'bg-primary-green text-white shadow-lg shadow-primary-green/30' : 'text-slate-400 group-hover:text-dark'
              }`}>
                <Icon size={20} />
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${
                isActive ? 'text-primary-green' : 'text-slate-400'
              }`}>
                {link.name}
              </span>
              
              {isActive && (
                <motion.div 
                  layoutId="mobile-nav-indicator"
                  className="absolute -top-1 w-1 h-1 bg-primary-green rounded-full"
                />
              )}
            </Link>
          );
        })}
      </motion.nav>
    </div>
  );
};

export default MobileNav;
