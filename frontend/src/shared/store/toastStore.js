import { create } from 'zustand';
import i18n from '../i18n';

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

  success: (message, title) => {
    return get().addToast({ type: 'success', title: title || i18n.t('admin.toast_title_success'), message });
  },

  error: (message, title) => {
    return get().addToast({ type: 'error', title: title || i18n.t('admin.toast_title_error'), message, duration: 6000 });
  },

  warning: (message, title) => {
    return get().addToast({ type: 'warning', title: title || i18n.t('admin.toast_title_warning'), message });
  },

  info: (message, title) => {
    return get().addToast({ type: 'info', title: title || i18n.t('admin.toast_title_info'), message });
  },
}));

export default useToastStore;
