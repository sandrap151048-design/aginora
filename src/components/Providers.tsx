"use client";
import React from 'react';
import { ModalProvider } from '@/context/ModalContext';
import { Toaster } from 'react-hot-toast';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider>
      {children}
      <Toaster position="top-center" />
    </ModalProvider>
  );
}
