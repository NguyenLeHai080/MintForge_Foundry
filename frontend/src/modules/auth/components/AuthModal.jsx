import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  FiMail, FiLock, FiEye, FiEyeOff, 
  FiUser, FiArrowRight, FiShield, FiX, FiCheckCircle 
} from 'react-icons/fi';
import { useAuthModalStore } from '../store/authModalStore';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../../../shared/hooks/useToast';
import { DEFAULT_LANGUAGE } from '../../../shared/i18n';

export default function AuthModal() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParams();
  const currentLang = lang || localStorage.getItem('mf_lang') || DEFAULT_LANGUAGE;

  const { isOpen, mode, redirectPath, closeModal, setMode } = useAuthModalStore();
  const { login } = useAuth();
  const toast = useToast();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('hai@mintforge.io');
  const [loginPassword, setLoginPassword] = useState('admin123');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  // Listen to Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  // Handle Login submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const role = loginEmail.toLowerCase().includes('admin') ? 'ADMIN' : 'CREATOR';
    const res = await login({ email: loginEmail, password: loginPassword, role });
    setIsLoading(false);

    if (res?.success) {
      closeModal();
      if (redirectPath) {
        navigate(redirectPath);
      } else if (role === 'ADMIN') {
        navigate(`/${currentLang}/admin/providers`);
      }
    }
  };

  // 1-Click Quick Demo Login
  const handleQuickLogin = (roleType) => {
    if (roleType === 'ADMIN') {
      login({ id: 'usr_admin_01', name: 'Nguyen Le Hai', email: 'hai@mintforge.io', role: 'ADMIN' });
      closeModal();
      navigate(`/${currentLang}/admin/providers`);
    } else {
      login({ id: 'usr_creator_02', name: 'AI Creator Pro', email: 'creator@mintforge.io', role: 'CREATOR' });
      closeModal();
      if (redirectPath) navigate(redirectPath);
    }
  };

  // Handle Register submission
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (regPassword !== regConfirmPassword) {
      toast.error(t('landing.auth_password_mismatch'));
      return;
    }

    if (!agreeTerms) {
      toast.warning(t('landing.auth_must_agree_terms'));
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const newUser = {
        id: `usr_${Date.now().toString(36)}`,
        name: regName || 'Creator User',
        email: regEmail,
        role: 'CREATOR'
      };
      login(newUser, 'mock_creator_token');
      toast.success(t('landing.auth_register_title'));
      closeModal();
      if (redirectPath) navigate(redirectPath);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      {/* Backdrop with Cyberpunk Blur */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        onClick={closeModal}
      />

      {/* Modal Dialog Content */}
      <div className="relative w-full max-w-md my-8 glass-panel rounded-3xl border border-slate-700/80 shadow-2xl p-6 sm:p-7 z-10 scale-100 transition-all duration-200">
        {/* Glow Accents */}
        <div className="absolute -top-12 -left-12 w-36 h-36 bg-orange-500/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-36 h-36 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition-colors z-20"
          title="Đóng"
        >
          <FiX className="w-5 h-5" />
        </button>

        {/* Header Tabs: Login vs Register */}
        <div className="flex items-center justify-center mb-6">
          <div className="p-1 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-1 w-full max-w-xs">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                mode === 'login'
                  ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md shadow-orange-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {t('landing.btn_login')}
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                mode === 'register'
                  ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md shadow-orange-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {t('landing.btn_register')}
            </button>
          </div>
        </div>

        {/* ===================== TAB: LOGIN ===================== */}
        {mode === 'login' ? (
          <div>
            <div className="text-center mb-5">
              <h2 className="text-xl font-extrabold text-white tracking-tight mb-1">
                {t('landing.auth_login_title')}
              </h2>
              <p className="text-xs text-slate-400">
                {t('landing.auth_login_subtitle')}
              </p>
            </div>

            {/* Quick Demo Login Bar */}
            <div className="mb-5 p-2.5 rounded-2xl bg-slate-900/70 border border-slate-800/80 space-y-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">
                ⚡ Demo 1-Click
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('ADMIN')}
                  className="px-2.5 py-1.5 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <FiShield className="w-3.5 h-3.5" />
                  <span>Super Admin</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('CREATOR')}
                  className="px-2.5 py-1.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <FiUser className="w-3.5 h-3.5" />
                  <span>Creator User</span>
                </button>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t('landing.auth_email_label')}
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder={t('landing.auth_email_placeholder')}
                    required
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/40 transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-300">
                    {t('landing.auth_password_label')}
                  </label>
                  <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[11px] text-orange-400 hover:text-orange-300 transition-colors">
                    {t('landing.auth_forgot_password')}
                  </a>
                </div>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder={t('landing.auth_password_placeholder')}
                    required
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/40 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showLoginPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer text-slate-400">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-950 text-orange-500 focus:ring-orange-500 w-3.5 h-3.5 cursor-pointer"
                  />
                  <span>{t('landing.auth_remember_me')}</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold text-xs shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                <span>{isLoading ? t('landing.auth_btn_submitting') : t('landing.auth_btn_submit_login')}</span>
                <FiArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Social Login */}
            <div className="my-4 flex items-center gap-3">
              <div className="flex-1 border-t border-slate-800" />
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                {t('landing.auth_or_divider')}
              </span>
              <div className="flex-1 border-t border-slate-800" />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleQuickLogin('CREATOR')}
                className="py-2 px-3 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <span className="text-sm">🌐</span>
                <span>Google</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('CREATOR')}
                className="py-2 px-3 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <span className="text-sm">🐙</span>
                <span>GitHub</span>
              </button>
            </div>

            {/* Switch to Register */}
            <div className="mt-5 text-center text-xs text-slate-400">
              <span>{t('landing.auth_no_account')} </span>
              <button
                type="button"
                onClick={() => setMode('register')}
                className="font-bold text-orange-400 hover:text-orange-300 transition-colors ml-1 cursor-pointer"
              >
                {t('landing.auth_register_now')}
              </button>
            </div>
          </div>
        ) : (
          /* ===================== TAB: REGISTER ===================== */
          <div>
            <div className="text-center mb-5">
              <h2 className="text-xl font-extrabold text-white tracking-tight mb-1">
                {t('landing.auth_register_title')}
              </h2>
              <p className="text-xs text-slate-400">
                {t('landing.auth_register_subtitle')}
              </p>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t('landing.auth_name_label')}
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder={t('landing.auth_name_placeholder')}
                    required
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/40 transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t('landing.auth_email_label')}
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder={t('landing.auth_email_placeholder')}
                    required
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/40 transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t('landing.auth_password_label')}
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder={t('landing.auth_password_placeholder')}
                    required
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-10 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/40 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegPassword(!showRegPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showRegPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t('landing.auth_confirm_password_label')}
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder={t('landing.auth_confirm_password_placeholder')}
                    required
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/40 transition-colors"
                  />
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="modal-agree-terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-950 text-orange-500 focus:ring-orange-500 w-3.5 h-3.5 cursor-pointer mt-0.5"
                />
                <label htmlFor="modal-agree-terms" className="text-[11px] text-slate-400 cursor-pointer">
                  {t('landing.auth_agree_terms')}
                </label>
              </div>

              {/* Submit Register Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold text-xs shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer mt-2"
              >
                <span>{isLoading ? t('landing.auth_btn_submitting') : t('landing.auth_btn_submit_register')}</span>
                <FiCheckCircle className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Switch to Login */}
            <div className="mt-5 text-center text-xs text-slate-400">
              <span>{t('landing.auth_has_account')} </span>
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-bold text-orange-400 hover:text-orange-300 transition-colors ml-1 cursor-pointer"
              >
                {t('landing.btn_login')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
