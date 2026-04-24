"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { useModal } from '@/context/ModalContext';

const TopBanner = () => {
  const { openApplicationModal } = useModal();

  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-primary-blue text-white py-2 px-4 text-center text-sm font-bold flex items-center justify-center gap-4 relative z-[60]"
    >
      <div className="flex items-center gap-2">
        <Bell size={16} className="animate-bounce" />
        <span>Admissions Open for 2024-25 Batches! Limited Seats Available.</span>
      </div>
      <button 
        onClick={openApplicationModal}
        className="underline hover:no-underline font-black decoration-white/50 cursor-pointer bg-transparent border-none p-0 text-inherit"
      >
        Apply Now
      </button>
    </motion.div>
  );
};

export default TopBanner;
