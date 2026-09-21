import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiShield, FiLogIn, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useAuthStore } from '../../../modules/auth/store/authStore';
import { useAuthModalStore } from '../../../modules/auth/store/authModalStore';
import LanguageSwitcher from './LanguageSwitcher';
import UserProfileDropdown from '../../../modules/auth/components/UserProfileDropdown';

export default function Navbar() {
  const { t } = useTranslation();
  const { lang } = useParams();
  const location = useLocation();
  const currentLang = lang || 'vi';
  const { user, isAuthenticated } = useAuthStore();
  const { openModal } = useAuthModalStore();

  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on route / hash change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // 1. If on Admin routes
    if (location.pathname.includes('/admin')) {
      setActiveTab('admin');
      return;
    }

    // 2. If Hash is in URL
    if (location.hash === '#pricing') {
      setActiveTab('pricing');
      return;
    }
    if (location.hash === '#faq') {
      setActiveTab('faq');
      return;
    }

    // 3. Scroll spy on public landing page
    const handleScroll = () => {
      const pricingEl = document.getElementById('pricing');
      const faqEl = document.getElementById('faq');
      const scrollPos = window.scrollY + 100;

      if (faqEl && scrollPos >= faqEl.offsetTop) {
        setActiveTab('faq');
      } else if (pricingEl && scrollPos >= pricingEl.offsetTop) {
        setActiveTab('pricing');
      } else {
        setActiveTab('home');
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, location.hash]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to={`/${currentLang}`} className="flex items-center gap-2.5 group shrink-0">
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

        {/* Desktop & Tablet Navigation Links with Active Border Bottom flush against header */}
        <div className="hidden sm:flex items-center gap-0.5 md:gap-1 h-16 text-xs md:text-sm font-medium">
          {/* 1. Home */}
          <Link
            to={`/${currentLang}`}
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`relative h-16 flex items-center px-2.5 md:px-4 transition-all duration-200 group cursor-pointer whitespace-nowrap ${
              activeTab === 'home'
                ? 'text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>{t('landing.nav_home')}</span>
            {/* Active border bottom sát header */}
            {activeTab === 'home' ? (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-orange-500 via-pink-500 to-indigo-500 rounded-t shadow-[0_0_12px_rgba(249,115,22,0.8)]" />
            ) : (
              <span className="absolute bottom-0 left-2 md:left-3 right-2 md:right-3 h-[2px] bg-slate-700/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-t" />
            )}
          </Link>

          {/* 2. Pricing */}
          <a
            href="#pricing"
            onClick={() => setActiveTab('pricing')}
            className={`relative h-16 flex items-center px-2.5 md:px-4 transition-all duration-200 group cursor-pointer whitespace-nowrap ${
              activeTab === 'pricing'
                ? 'text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>{t('landing.nav_pricing')}</span>
            {/* Active border bottom sát header */}
            {activeTab === 'pricing' ? (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-orange-500 via-pink-500 to-indigo-500 rounded-t shadow-[0_0_12px_rgba(249,115,22,0.8)]" />
            ) : (
              <span className="absolute bottom-0 left-2 md:left-3 right-2 md:right-3 h-[2px] bg-slate-700/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-t" />
            )}
          </a>

          {/* 3. FAQ */}
          <a
            href="#faq"
            onClick={() => setActiveTab('faq')}
            className={`relative h-16 flex items-center px-2.5 md:px-4 transition-all duration-200 group cursor-pointer whitespace-nowrap ${
              activeTab === 'faq'
                ? 'text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>{t('landing.nav_faq')}</span>
            {/* Active border bottom sát header */}
            {activeTab === 'faq' ? (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-orange-500 via-pink-500 to-indigo-500 rounded-t shadow-[0_0_12px_rgba(249,115,22,0.8)]" />
            ) : (
              <span className="absolute bottom-0 left-2 md:left-3 right-2 md:right-3 h-[2px] bg-slate-700/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-t" />
            )}
          </a>

          {/* 4. Super Admin (if admin) */}
          {isAuthenticated && user?.role === 'ADMIN' && (
            <Link
              to={`/${currentLang}/admin/providers`}
              onClick={() => setActiveTab('admin')}
              className={`relative h-16 flex items-center gap-1.5 px-2.5 md:px-4 transition-all duration-200 group cursor-pointer whitespace-nowrap ${
                activeTab === 'admin'
                  ? 'text-orange-400 font-semibold'
                  : 'text-slate-400 hover:text-orange-300'
              }`}
            >
              <FiShield className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span>{t('landing.btn_admin')}</span>
              {/* Active border bottom sát header */}
              {activeTab === 'admin' ? (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-amber-500 to-orange-500 rounded-t shadow-[0_0_12px_rgba(245,158,11,0.8)]" />
              ) : (
                <span className="absolute bottom-0 left-2 md:left-3 right-2 md:right-3 h-[2px] bg-orange-500/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-t" />
              )}
            </Link>
          )}
        </div>

        {/* Action Controls & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Multi-language 6-language switcher */}
          <LanguageSwitcher />

          {/* Auth Action (Desktop/Tablet) */}
          {isAuthenticated ? (
            <UserProfileDropdown variant="navbar" />
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={() => openModal('login')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-semibold transition-colors cursor-pointer"
              >
                <FiLogIn className="w-3.5 h-3.5" />
                <span>{t('landing.btn_login')}</span>
              </button>
              <button
                type="button"
                onClick={() => openModal('register')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-semibold hover:opacity-95 shadow-md shadow-orange-500/20 transition-all cursor-pointer"
              >
                <span>{t('landing.btn_register')}</span>
              </button>
            </div>
          )}

          {/* Mobile Hamburger Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="sm:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors border border-slate-800/80 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <FiX className="w-5 h-5 text-orange-400" /> : <FiMenu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ===================== RESPONSIVE MOBILE NAVIGATION DRAWER ===================== */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800 px-4 py-4 space-y-2 animate-in slide-in-from-top-3 duration-200 shadow-2xl">
          {/* Mobile 1. Home */}
          <Link
            to={`/${currentLang}`}
            onClick={() => {
              setActiveTab('home');
              setIsMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`relative flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'home'
                ? 'text-white font-semibold bg-slate-900/90 border-b-2 border-orange-500 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/50 border-b border-slate-800/60'
            }`}
          >
            <span>{t('landing.nav_home')}</span>
            {activeTab === 'home' && (
              <span className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(249,115,22,1)]" />
            )}
          </Link>

          {/* Mobile 2. Pricing */}
          <a
            href="#pricing"
            onClick={() => {
              setActiveTab('pricing');
              setIsMobileMenuOpen(false);
            }}
            className={`relative flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'pricing'
                ? 'text-white font-semibold bg-slate-900/90 border-b-2 border-orange-500 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/50 border-b border-slate-800/60'
            }`}
          >
            <span>{t('landing.nav_pricing')}</span>
            {activeTab === 'pricing' && (
              <span className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(249,115,22,1)]" />
            )}
          </a>

          {/* Mobile 3. FAQ */}
          <a
            href="#faq"
            onClick={() => {
              setActiveTab('faq');
              setIsMobileMenuOpen(false);
            }}
            className={`relative flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'faq'
                ? 'text-white font-semibold bg-slate-900/90 border-b-2 border-orange-500 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/50 border-b border-slate-800/60'
            }`}
          >
            <span>{t('landing.nav_faq')}</span>
            {activeTab === 'faq' && (
              <span className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(249,115,22,1)]" />
            )}
          </a>

          {/* Mobile 4. Super Admin (if admin) */}
          {isAuthenticated && user?.role === 'ADMIN' && (
            <Link
              to={`/${currentLang}/admin/providers`}
              onClick={() => {
                setActiveTab('admin');
                setIsMobileMenuOpen(false);
              }}
              className={`relative flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'admin'
                  ? 'text-orange-400 font-semibold bg-orange-500/10 border-b-2 border-orange-500 shadow-sm'
                  : 'text-slate-400 hover:text-orange-300 hover:bg-slate-900/50 border-b border-slate-800/60'
              }`}
            >
              <span className="flex items-center gap-2">
                <FiShield className="w-4 h-4 text-orange-400" />
                <span>{t('landing.btn_admin')}</span>
              </span>
              {activeTab === 'admin' && (
                <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,1)]" />
              )}
            </Link>
          )}

          {/* Mobile Auth Actions if not logged in */}
          {!isAuthenticated && (
            <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openModal('login');
                }}
                className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold text-center cursor-pointer"
              >
                {t('landing.btn_login')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openModal('register');
                }}
                className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-semibold text-center shadow-md shadow-orange-500/20 cursor-pointer"
              >
                {t('landing.btn_register')}
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
