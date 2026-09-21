import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  FiMail, FiLock, FiEye, FiEyeOff, 
  FiUser, FiArrowRight, FiArrowLeft, FiCheckCircle 
} from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../../../shared/hooks/useToast';
import LanguageSwitcher from '../../../shared/components/Navbar/LanguageSwitcher';
import { DEFAULT_LANGUAGE } from '../../../shared/i18n';

export default function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParams();
  const currentLang = lang || localStorage.getItem('mf_lang') || DEFAULT_LANGUAGE;
  const { login } = useAuth();
  const toast = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error(t('landing.auth_password_mismatch'));
      return;
    }

    if (!agreeTerms) {
      toast.warning(t('landing.auth_must_agree_terms'));
      return;
    }

    setIsLoading(true);
    // Simulate registration & immediate login
    setTimeout(() => {
      setIsLoading(false);
      const newUser = {
        id: `usr_${Date.now().toString(36)}`,
        name: name || 'Creator User',
        email,
        role: 'CREATOR'
      };
      login(newUser, 'mock_creator_token');
      toast.success(t('landing.auth_register_title'));
      navigate(`/${currentLang}`);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between z-10">
        <Link to={`/${currentLang}`} className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-orange-500 to-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
            M
          </div>
          <span className="font-bold text-lg text-white tracking-tight">MintForge</span>
        </Link>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
        </div>
      </header>

      {/* Main Register Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 z-10">
        <div className="w-full max-w-md glass-panel rounded-3xl p-8 border border-slate-800 shadow-2xl relative">
          {/* Back link */}
          <Link
            to={`/${currentLang}`}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors mb-6"
          >
            <FiArrowLeft className="w-3.5 h-3.5" />
            <span>{t('landing.auth_back_to_home')}</span>
          </Link>

          {/* Form Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-extrabold text-white tracking-tight mb-2">
              {t('landing.auth_register_title')}
            </h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t('landing.auth_register_subtitle')}
            </p>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {t('landing.auth_fullname_label')}
              </label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('landing.auth_fullname_placeholder')}
                  required
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/40 transition-colors"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {t('landing.auth_email_label')}
              </label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('landing.auth_email_placeholder')}
                  required
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/40 transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {t('landing.auth_password_label')}
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('landing.auth_password_placeholder')}
                  required
                  minLength={6}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/40 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {t('landing.auth_confirm_password_label')}
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={t('landing.auth_password_placeholder')}
                  required
                  minLength={6}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/40 transition-colors"
                />
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start gap-2 pt-1 text-xs">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 rounded border-slate-700 bg-slate-950 text-indigo-500 focus:ring-indigo-500 w-3.5 h-3.5 cursor-pointer"
              />
              <label htmlFor="agreeTerms" className="text-slate-400 text-[11px] leading-snug cursor-pointer">
                {t('landing.auth_terms_agreement')}
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              <span>{isLoading ? t('landing.auth_btn_submitting') : t('landing.auth_btn_submit_register')}</span>
              <FiArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Social register divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 border-t border-slate-800" />
            <span className="text-[10px] text-slate-500 uppercase tracking-wider">
              {t('landing.auth_or_divider')}
            </span>
            <div className="flex-1 border-t border-slate-800" />
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                login({ id: 'usr_g_01', name: 'Google User', email: 'user@gmail.com', role: 'CREATOR' });
                navigate(`/${currentLang}`);
              }}
              className="py-2 px-3 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <span className="text-sm">🌐</span>
              <span>Google</span>
            </button>
            <button
              type="button"
              onClick={() => {
                login({ id: 'usr_gh_01', name: 'GitHub Developer', email: 'dev@github.com', role: 'CREATOR' });
                navigate(`/${currentLang}`);
              }}
              className="py-2 px-3 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <span className="text-sm">🐙</span>
              <span>GitHub</span>
            </button>
          </div>

          {/* Login Prompt */}
          <div className="mt-6 text-center text-xs text-slate-400">
            <span>{t('landing.auth_has_account')} </span>
            <Link
              to={`/${currentLang}/login`}
              className="font-bold text-indigo-400 hover:text-indigo-300 transition-colors ml-1"
            >
              {t('landing.btn_login')}
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-slate-500 border-t border-slate-900 z-10">
        MintForge Foundry AI &copy; 2026. All rights reserved.
      </footer>
    </div>
  );
}
