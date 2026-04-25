"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Facebook, Instagram, Youtube } from 'lucide-react';
import { useModal } from '@/context/ModalContext';
import Link from 'next/link';

const TopBanner = () => {
  const { openApplicationModal } = useModal();

  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full bg-[#FF5C00] text-white py-2 px-4 md:px-12 flex items-center justify-between z-[60] text-[12px] font-medium"
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Bell size={14} className="animate-bounce text-white" />
          <span className="hidden sm:inline">Admissions Open for 2024-25 Batches! Limited Seats Available.</span>
          <span className="sm:hidden">Admissions Open 2024-25</span>
        </div>
        <button 
          onClick={openApplicationModal}
          className="bg-white text-[#FF5C00] px-3 py-0.5 rounded-full font-bold hover:bg-slate-100 transition-colors cursor-pointer shadow-sm"
        >
          Apply Now
        </button>
      </div>

      <div className="hidden md:flex items-center gap-4">
        <span className="text-white/80">Follow us:</span>
        <div className="flex items-center gap-3">
          <Link href="https://facebook.com" target="_blank" className="hover:text-yellow-400 transition-colors">
            <Facebook size={14} />
          </Link>
          <Link href="https://instagram.com" target="_blank" className="hover:text-yellow-400 transition-colors">
            <Instagram size={14} />
          </Link>
          <Link href="https://youtube.com" target="_blank" className="hover:text-yellow-400 transition-colors">
            <Youtube size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default TopBanner;
