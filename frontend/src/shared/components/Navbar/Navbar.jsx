import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiGlobe, FiUser, FiShield, FiLogIn, FiLogOut } from 'react-icons/fi';
import { useAuthStore } from '../../../modules/auth/store/authStore';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { user, isAuthenticated, logout, login } = useAuthStore();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'vi' ? 'en' : 'vi';
    i18n.changeLanguage(nextLang);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
            <span className="font-extrabold text-white text-lg">M</span>
          </div>
          <div>
            <span className="font-bold text-lg text-white tracking-tight">MintForge</span>
            <span className="ml-1.5 px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Foundry
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link to="/" className="hover:text-indigo-400 transition-colors">Trang Chủ</Link>
          <a href="#pricing" className="hover:text-indigo-400 transition-colors">Bảng Giá</a>
          <a href="#faq" className="hover:text-indigo-400 transition-colors">Hỏi Đáp</a>
          {isAuthenticated && user?.role === 'ADMIN' && (
            <Link to="/admin" className="flex items-center gap-1.5 text-pink-400 hover:text-pink-300 transition-colors font-semibold">
              <FiShield className="w-4 h-4" />
              {t('landing.btn_admin')}
            </Link>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Multi-language switch */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
            title="Chuyển ngôn ngữ / Switch Language"
          >
            <FiGlobe className="w-3.5 h-3.5 text-indigo-400" />
            <span>{i18n.language.toUpperCase()}</span>
          </button>

          {/* Auth Action */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-semibold text-slate-200">{user?.name}</span>
                <span className="text-[10px] text-indigo-400 uppercase font-bold">{user?.role}</span>
              </div>
              <button
                onClick={logout}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-rose-500/10 hover:border-rose-500/30 hover:text-rose-400 text-slate-400 transition-colors"
                title="Đăng xuất"
              >
                <FiLogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => login({ id: 'usr_admin_01', name: 'Hải Admin', email: 'hai@mintforge.io', role: 'ADMIN' })}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-xs font-semibold hover:opacity-90 shadow-md shadow-indigo-500/20 transition-all"
            >
              <FiLogIn className="w-3.5 h-3.5" />
              <span>Đăng Nhập</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
