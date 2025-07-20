'use client';
import { useContext } from 'react';
import { ToastContext } from '../ui/global-toast';

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a GlobalToast');
  return ctx;
};
