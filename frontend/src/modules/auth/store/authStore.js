import { create } from 'zustand';
import { STORAGE_KEYS } from '../../../shared/constants/storageKeys';

// Safely retrieve stored user and token on initial load
const getInitialAuthState = () => {
  try {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    const userStr = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
    if (token && userStr) {
      const user = JSON.parse(userStr);
      return { user, token, isAuthenticated: true };
    }
  } catch (err) {
    console.error('Failed to parse auth state from storage', err);
  }
  return { user: null, token: null, isAuthenticated: false };
};

const initialAuth = getInitialAuthState();

export const useAuthStore = create((set) => ({
  user: initialAuth.user,
  token: initialAuth.token,
  isAuthenticated: initialAuth.isAuthenticated,
  credits: initialAuth.user ? 2450 : 0,

  login: (userData, token = 'mock_jwt_token') => {
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(userData));
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    } catch (e) {
      console.error('Storage write error', e);
    }
    set({ user: userData, token, isAuthenticated: true, credits: 2450 });
  },

  logout: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (e) {
      console.error('Storage remove error', e);
    }
    set({ user: null, token: null, isAuthenticated: false, credits: 0 });
  },

  setRole: (role) => set((state) => ({ user: state.user ? { ...state.user, role } : null })),
  updateCredits: (amount) => set((state) => ({ credits: Math.max(0, state.credits + amount) }))
}));

export default useAuthStore;
