import { create } from 'zustand';

export const useAuthModalStore = create((set) => ({
  isOpen: false,
  mode: 'login', // 'login' | 'register'
  redirectPath: null,

  openModal: (mode = 'login', redirectPath = null) => {
    set({
      isOpen: true,
      mode,
      redirectPath
    });
  },

  closeModal: () => {
    set({
      isOpen: false,
      redirectPath: null
    });
  },

  setMode: (mode) => {
    set({ mode });
  }
}));
