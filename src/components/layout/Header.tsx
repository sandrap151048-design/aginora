"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Button from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '@/context/ModalContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { openApplicationModal } = useModal();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/courses' },
    { name: 'Results', href: '/results' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
    { name: 'About', href: '/about' },
  ];

  return (
    <>
      <div className="fixed top-[52px] left-0 w-full z-50 px-4 pointer-events-none">
        <motion.header 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`container mx-auto max-w-6xl pointer-events-auto transition-all duration-500 rounded-xl border bg-white shadow-xl overflow-visible ${
            isScrolled 
              ? 'border-slate-200 py-2 px-4 md:px-6' 
              : 'border-slate-100 py-3 px-6 md:px-8'
          }`}
        >
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center -my-4">
              <img src="/logo-transparent-v2.png" alt="Ajinorah Academy" className="h-20 md:h-24 w-auto object-contain drop-shadow-sm" />
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={`px-5 py-2 rounded-full font-bold text-sm transition-all relative group ${
                    pathname === link.href ? 'text-primary-green bg-primary-green/5' : 'text-slate-500 hover:text-dark hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                  {pathname === link.href && (
                    <motion.div layoutId="nav-active" className="absolute inset-0 bg-primary-green/5 rounded-full -z-10" />
                  )}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <Link href="/admin/login" className="hidden lg:block">
                <Button variant="outline" size="sm" className="font-bold rounded-full px-5 border-slate-200 text-slate-600 hover:border-primary-green hover:text-primary-green">
                  Login
                </Button>
              </Link>
              <Button 
                onClick={openApplicationModal}
                size="sm" 
                className="hidden sm:flex font-black rounded-full px-6"
              >
                Apply Now
              </Button>
              {/* Mobile Menu Toggle */}
              <button 
                className="md:hidden w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-dark" 
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </motion.header>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-40 bg-white md:hidden pt-32 px-8"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name}
                >
                  <Link 
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-4xl font-black text-dark hover:text-primary-green transition-colors tracking-tighter"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-10 flex flex-col gap-4">
                <Button 
                  size="lg" 
                  fullWidth 
                  className="rounded-3xl"
                  onClick={() => {
                    setIsOpen(false);
                    openApplicationModal();
                  }}
                >
                  Apply Now
                </Button>
                <Link 
                  href="/admin/login" 
                  onClick={() => setIsOpen(false)}
                  className="text-center text-slate-500 font-bold uppercase tracking-widest text-xs py-4 border border-slate-100 rounded-3xl hover:bg-slate-50 transition-colors"
                >
                  Login
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
