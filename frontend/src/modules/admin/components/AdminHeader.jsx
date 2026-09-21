import React, { useState } from 'react';
import { 
  FiSearch, FiGlobe, FiChevronDown, FiPlus, FiBookOpen, 
  FiBell, FiActivity, FiUser 
} from 'react-icons/fi';

import LanguageSwitcher from '../../../shared/components/Navbar/LanguageSwitcher';

export default function AdminHeader() {
  return (
    <header className="h-16 bg-[#0c101d] border-b border-slate-800/80 px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left Search */}
      <div className="flex items-center gap-3 w-72">
        <div className="relative w-full">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Tìm kiếm nhanh..."
            className="w-full bg-slate-900/80 border border-slate-800/80 rounded-xl pl-10 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4 text-xs">
        {/* Language selector 6 languages */}
        <LanguageSwitcher />

        {/* Create New Dropdown */}
        <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold shadow-md shadow-orange-500/20 transition-all">
          <FiPlus className="w-4 h-4" />
          <span>Tạo mới</span>
          <FiChevronDown className="w-3 h-3" />
        </button>

        {/* Docs Link */}
        <a 
          href="/docs" 
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          title="Tài liệu API Docs"
        >
          <FiBookOpen className="w-4 h-4" />
        </a>

        {/* API Online Status Badge */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold text-[11px]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>API: Online</span>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors">
            <FiBell className="w-4 h-4" />
          </button>
          <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-bold text-[9px] flex items-center justify-center border-2 border-[#0c101d]">
            1
          </span>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-800/80">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
            H
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-slate-200 text-xs leading-none">Nguyen Le Hai</span>
            <span className="text-[10px] text-orange-400 font-semibold uppercase tracking-wider mt-0.5">
              SUPER_ADMIN
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
