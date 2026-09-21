import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  FiChevronDown, FiUser, FiKey, FiGlobe, 
  FiShield, FiLogOut, FiZap, FiExternalLink 
} from 'react-icons/fi';
import { useAuthStore } from '../store/authStore';
import { useAuth } from '../hooks/useAuth';
import { DEFAULT_LANGUAGE } from '../../../shared/i18n';

/**
 * UserProfileDropdown Component
 * Displays user avatar, info, role badge, credits balance, and dropdown actions (settings, switch portal, logout).
 * @param {string} variant - 'admin' | 'navbar'
 */
export default function UserProfileDropdown({ variant = 'admin', className = '' }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParams();
  const currentLang = lang || localStorage.getItem('mf_lang') || DEFAULT_LANGUAGE;
  
  const { user, credits, isAuthenticated } = useAuthStore();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!isAuthenticated || !user) return null;

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
    navigate(`/${currentLang}`);
  };

  const displayName = user.name || 'Nguyen Le Hai';
  const displayRole = user.role || 'SUPER_ADMIN';
  const displayEmail = user.email || 'hai@mintforge.io';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-800/60 transition-all text-left group focus:outline-none focus:ring-1 focus:ring-orange-500/40"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-md group-hover:scale-105 transition-transform shrink-0">
          {initial}
        </div>
        <div className="hidden sm:flex flex-col text-left">
          <span className="font-bold text-slate-200 text-xs leading-none group-hover:text-white transition-colors">
            {displayName}
          </span>
          <span className="text-[10px] text-orange-400 font-semibold uppercase tracking-wider mt-0.5">
            {displayRole}
          </span>
        </div>
        <FiChevronDown className={`w-3.5 h-3.5 text-slate-400 group-hover:text-slate-200 transition-transform ${isOpen ? 'rotate-180 text-orange-400' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#0d1222]/95 border border-slate-800/90 shadow-2xl backdrop-blur-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          {/* Header info */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/60 mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 via-pink-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shrink-0">
                {initial}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white text-xs truncate">{displayName}</div>
                <div className="text-[11px] text-slate-400 truncate">{displayEmail}</div>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    {displayRole}
                  </span>
                </div>
              </div>
            </div>

            {/* Credits pill */}
            <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">{t('landing.dropdown_credits_badge')}:</span>
              <span className="font-bold text-indigo-400 inline-flex items-center gap-1">
                <FiZap className="w-3 h-3 text-amber-400" />
                {credits.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Action Links */}
          <div className="space-y-1 text-xs">
            {variant === 'admin' ? (
              <Link
                to={`/${currentLang}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
              >
                <FiGlobe className="w-4 h-4 text-indigo-400" />
                <span>{t('landing.dropdown_switch_to_landing')}</span>
                <FiExternalLink className="w-3 h-3 text-slate-500 ml-auto" />
              </Link>
            ) : (
              user.role === 'ADMIN' && (
                <Link
                  to={`/${currentLang}/admin/providers`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 transition-colors font-semibold"
                >
                  <FiShield className="w-4 h-4 text-orange-400" />
                  <span>{t('landing.dropdown_switch_to_admin')}</span>
                </Link>
              )
            )}

            <Link
              to={`/${currentLang}/admin/providers`}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
            >
              <FiKey className="w-4 h-4 text-amber-400" />
              <span>{t('landing.dropdown_api_keys')}</span>
            </Link>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors text-left"
            >
              <FiUser className="w-4 h-4 text-slate-400" />
              <span>{t('landing.dropdown_profile_title')}</span>
            </button>
          </div>

          {/* Divider */}
          <div className="my-1.5 border-t border-slate-800/80" />

          {/* Logout Action */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors text-left font-semibold text-xs group"
          >
            <FiLogOut className="w-4 h-4 text-rose-400 group-hover:rotate-12 transition-transform" />
            <span>{t('landing.dropdown_logout')}</span>
          </button>
        </div>
      )}
    </div>
  );
}
