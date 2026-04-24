"use client";
import React from 'react';
import { MessageCircle, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const FloatingElements = () => {
  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl transition-all"
      >
        <MessageCircle size={32} />
      </motion.a>

      {/* Sticky Apply Button (Alternative style) */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className="md:hidden w-16 h-16 bg-primary-green text-white rounded-full flex items-center justify-center shadow-2xl transition-all"
      >
        <Zap size={32} />
      </motion.button>
    </div>
  );
};

export default FloatingElements;
