import React from 'react';

export function Input({ label, error, className = '', ...props }) {
  return (
    <div className="w-full flex flex-col gap-1.5 mb-3">
      {label && <label className="text-xs font-semibold text-slate-300">{label}</label>}
      <input
        className={`w-full bg-slate-950/80 border ${error ? 'border-rose-500' : 'border-slate-800'} rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-rose-400">{error}</span>}
    </div>
  );
}

export function Select({ label, options = [], error, className = '', ...props }) {
  return (
    <div className="w-full flex flex-col gap-1.5 mb-3">
      {label && <label className="text-xs font-semibold text-slate-300">{label}</label>}
      <select
        className={`w-full bg-slate-950/80 border ${error ? 'border-rose-500' : 'border-slate-800'} rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-slate-900 text-slate-200">
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-rose-400">{error}</span>}
    </div>
  );
}

export function Button({ children, variant = 'primary', size = 'md', className = '', isLoading = false, ...props }) {
  const base = "inline-flex items-center justify-center font-semibold rounded-xl transition-all select-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white shadow-lg shadow-indigo-500/25",
    secondary: "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700",
    danger: "bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 border border-rose-500/30",
    ghost: "bg-transparent hover:bg-slate-800/60 text-slate-400 hover:text-slate-100"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2.5 text-sm gap-2",
    lg: "px-6 py-3.5 text-base gap-2.5"
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
      ) : null}
      {children}
    </button>
  );
}

export function Badge({ children, variant = 'info', className = '' }) {
  const variants = {
    success: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    warning: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    danger: "bg-rose-500/15 text-rose-400 border-rose-500/30",
    info: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30"
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
