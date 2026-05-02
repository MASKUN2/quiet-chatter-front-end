import { create } from 'zustand';
import type { Severity } from '../types/ToastTypes';

interface ToastState {
  open: boolean;
  message: string;
  severity: Severity;
  showToast: (message: string, severity?: Severity) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  open: false,
  message: '',
  severity: 'info',
  showToast: (message, severity = 'info') => set({ open: true, message, severity }),
  hideToast: () => set({ open: false }),
}));
