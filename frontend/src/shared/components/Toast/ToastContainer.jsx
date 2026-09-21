import React from 'react';
import { useToastStore } from '../../store/toastStore';
import { FiCheckCircle, FiAlertCircle, FiAlertTriangle, FiInfo, FiX } from 'react-icons/fi';

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  if (!toasts || toasts.length === 0) return null;

  const icons = {
    success: <FiCheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />,
    error: <FiAlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />,
    warning: <FiAlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />,
    info: <FiInfo className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />,
  };

  const borderStyles = {
    success: 'border-emerald-500/40 bg-slate-900/95 text-slate-100 shadow-emerald-500/10',
    error: 'border-rose-500/40 bg-slate-900/95 text-slate-100 shadow-rose-500/10',
    warning: 'border-amber-500/40 bg-slate-900/95 text-slate-100 shadow-amber-500/10',
    info: 'border-indigo-500/40 bg-slate-900/95 text-slate-100 shadow-indigo-500/10',
  };

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border shadow-xl backdrop-blur-md transition-all animate-in slide-in-from-top-4 duration-200 ${
            borderStyles[toast.type] || borderStyles.info
          }`}
        >
          {icons[toast.type] || icons.info}
          <div className="flex-1 min-w-0">
            {toast.title && (
              <h5 className="text-xs font-bold text-white tracking-wide mb-0.5">
                {toast.title}
              </h5>
            )}
            <p className="text-xs text-slate-300 leading-relaxed break-words">
              {toast.message}
            </p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <FiX className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
