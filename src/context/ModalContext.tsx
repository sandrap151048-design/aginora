"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';
import ApplicationModal from '@/components/ApplicationModal';

interface ModalContextType {
  openApplicationModal: () => void;
  closeApplicationModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openApplicationModal = () => setIsModalOpen(true);
  const closeApplicationModal = () => setIsModalOpen(false);

  return (
    <ModalContext.Provider value={{ openApplicationModal, closeApplicationModal }}>
      {children}
      <ApplicationModal isOpen={isModalOpen} onClose={closeApplicationModal} />
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
