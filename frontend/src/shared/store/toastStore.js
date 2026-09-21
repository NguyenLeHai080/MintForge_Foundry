import { create } from 'zustand';

export const useToastStore = create((set, get) => ({
  toasts: [],

  addToast: ({ type = 'info', title = '', message = '', duration = 4000 }) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    const newToast = { id, type, title, message, duration };

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    if (duration > 0) {
      setTimeout(() => {
        get().removeToast(id);
      }, duration);
    }

    return id;
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },

  success: (message, title = 'Thành công') => {
    return get().addToast({ type: 'success', title, message });
  },

  error: (message, title = 'Lỗi hệ thống') => {
    return get().addToast({ type: 'error', title, message, duration: 6000 });
  },

  warning: (message, title = 'Cảnh báo') => {
    return get().addToast({ type: 'warning', title, message });
  },

  info: (message, title = 'Thông báo') => {
    return get().addToast({ type: 'info', title, message });
  },
}));

export default useToastStore;
