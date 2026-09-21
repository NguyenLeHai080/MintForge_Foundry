import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiChevronDown, FiGlobe, FiCheck } from 'react-icons/fi';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../../i18n';

export default function LanguageSwitcher({ className = "" }) {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { lang: urlLang } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLangCode = urlLang || i18n.language || DEFAULT_LANGUAGE;
  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === currentLangCode) || SUPPORTED_LANGUAGES[0];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (newLangCode) => {
    setIsOpen(false);
    i18n.changeLanguage(newLangCode);
    localStorage.setItem('mf_lang', newLangCode);

    // Tính toán URL mới thay thế tiền tố ngôn ngữ
    const segments = location.pathname.split('/').filter(Boolean);
    const isFirstSegmentLang = SUPPORTED_LANGUAGES.some(l => l.code === segments[0]);

    let newPathname = '';
    if (isFirstSegmentLang) {
      segments[0] = newLangCode;
      newPathname = '/' + segments.join('/');
    } else {
      newPathname = '/' + newLangCode + (location.pathname === '/' ? '' : location.pathname);
    }

    navigate(newPathname + location.search + location.hash);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 hover:text-white hover:border-slate-700 transition-all shadow-sm"
      >
        <span className="text-sm">{currentLang.flag}</span>
        <span>{currentLang.label}</span>
        <FiChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="text-[10px] font-bold text-slate-500 px-3 py-1 uppercase tracking-wider">
            Chọn Ngôn Ngữ (Language)
          </div>
          <div className="space-y-0.5">
            {SUPPORTED_LANGUAGES.map((langItem) => {
              const isSelected = langItem.code === currentLangCode;
              return (
                <button
                  key={langItem.code}
                  onClick={() => handleSelectLanguage(langItem.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    isSelected 
                      ? 'bg-orange-500/15 text-orange-400 border border-orange-500/30' 
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{langItem.flag}</span>
                    <span>{langItem.label}</span>
                  </div>
                  {isSelected && <FiCheck className="w-3.5 h-3.5 text-orange-400" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
