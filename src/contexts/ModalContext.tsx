import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ModalContextType {
  isLeadFormOpen: boolean;
  openLeadForm: () => void;
  closeLeadForm: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);

  const openLeadForm = () => {
    setIsLeadFormOpen(true);
  };

  const closeLeadForm = () => {
    setIsLeadFormOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isLeadFormOpen, openLeadForm, closeLeadForm }}>
      {children}
    </ModalContext.Provider>
  );
};
