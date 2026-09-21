import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: {
    id: "usr_admin_01",
    name: "Hai Admin",
    email: "hai@mintforge.io",
    role: "ADMIN" // 'ADMIN' or 'USER'
  },
  isAuthenticated: true,
  credits: 2450,
  
  login: (userData) => set({ user: userData, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  setRole: (role) => set((state) => ({ user: { ...state.user, role } })),
  updateCredits: (amount) => set((state) => ({ credits: state.credits + amount }))
}));
