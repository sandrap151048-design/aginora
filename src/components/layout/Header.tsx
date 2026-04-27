"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, User } from 'lucide-react';
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
      setIsScrolled(window.scrollY > 20);
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
      <div className="fixed top-[36px] left-0 w-full z-50">
        <motion.header 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`w-full bg-white transition-all duration-300 border-b border-slate-100 ${
            isScrolled ? 'py-1 shadow-md' : 'py-1'
          }`}
        >
          <div className="container mx-auto px-4 md:px-12 flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <img src="/logo-transparent-v2.png" alt="Ajinorah Academy" className={`${isScrolled ? 'h-16 md:h-18' : 'h-24 md:h-32'} w-auto object-contain transition-all duration-300`} />
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={`px-4 py-2 rounded-lg font-bold text-[14px] transition-all relative group ${
                    pathname === link.href ? 'text-primary-green' : 'text-slate-600 hover:text-dark hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                  {pathname === link.href && (
                    <motion.div layoutId="nav-active" className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary-green" />
                  )}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <Link href="/admin/login" className="hidden sm:flex items-center gap-2 text-slate-600 hover:text-dark font-bold text-sm px-4">
                <User size={18} />
                <span>Login</span>
              </Link>
              <Button 
                onClick={openApplicationModal}
                variant="primary"
                size="sm" 
                className="hidden sm:flex font-black rounded-xl px-6 py-2"
              >
                Apply Now
              </Button>
            </div>
          </div>
        </motion.header>
      </div>

    </>
  );
};

export default Header;
