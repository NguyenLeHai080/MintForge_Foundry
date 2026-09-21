import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Navbar from './shared/components/Navbar/Navbar';
import LandingPage from './modules/landing/pages/LandingPage';
import AdminLayout from './modules/admin/layouts/AdminLayout';
import UpstreamProvidersPage from './modules/admin/pages/UpstreamProvidersPage';
import AdminDashboardPage from './modules/admin/pages/AdminDashboardPage';
import AuthModal from './modules/auth/components/AuthModal';
import { useAuthStore } from './modules/auth/store/authStore';
import { useAuthModalStore } from './modules/auth/store/authModalStore';
import LanguageRouteWrapper from './shared/components/Navbar/LanguageRouteWrapper';
import { DEFAULT_LANGUAGE } from './shared/i18n';
import { useTranslation } from 'react-i18next';
import ToastContainer from './shared/components/Toast/ToastContainer';

// Public Footer with localized copyright and architecture statement
function PublicFooter() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/80 py-8 text-center text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4">
        {t('landing.footer_engine')}
      </div>
    </footer>
  );
}

// Redirects auth route directly into modal on top of public page
function AuthModalTriggerRoute({ mode }) {
  const { lang } = useParams();
  const currentLang = lang || localStorage.getItem('mf_lang') || DEFAULT_LANGUAGE;
  const { openModal } = useAuthModalStore();

  React.useEffect(() => {
    openModal(mode);
  }, [mode, openModal]);

  return <Navigate to={`/${currentLang}`} replace />;
}

// Protected Route Guard for Super Admin with dynamic lang support
function AdminRoute({ children }) {
  const { user, isAuthenticated } = useAuthStore();
  const { lang } = useParams();
  const currentLang = lang || localStorage.getItem('mf_lang') || DEFAULT_LANGUAGE;

  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return <Navigate to={`/${currentLang}`} replace />;
  }
  return children;
}

// Redirect root to current/preferred language
function RootRedirect() {
  const savedLang = localStorage.getItem('mf_lang') || DEFAULT_LANGUAGE;
  return <Navigate to={`/${savedLang}`} replace />;
}

export default function App() {
  const defaultLang = localStorage.getItem('mf_lang') || DEFAULT_LANGUAGE;

  return (
    <BrowserRouter>
      {/* Global Toast Notification System */}
      <ToastContainer />

      {/* Global Unified Auth Modal (Login / Register) */}
      <AuthModal />

      <Routes>
        {/* 1. Redirect root to preferred language */}
        <Route path="/" element={<RootRedirect />} />

        {/* 2. Language-prefixed routes (/:lang/...) */}
        <Route path="/:lang" element={<LanguageRouteWrapper />}>
          {/* Public Landing Page */}
          <Route
            index
            element={
              <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col justify-between">
                <Navbar />
                <main className="flex-1">
                  <LandingPage />
                </main>
                <PublicFooter />
              </div>
            }
          />

          {/* Authentication triggered as Modal */}
          <Route path="login" element={<AuthModalTriggerRoute mode="login" />} />
          <Route path="register" element={<AuthModalTriggerRoute mode="register" />} />

          {/* Super Admin Routes */}
          <Route
            path="admin"
            element={
              <AdminRoute>
                <AdminLayout>
                  <UpstreamProvidersPage />
                </AdminLayout>
              </AdminRoute>
            }
          />

          <Route
            path="admin/providers"
            element={
              <AdminRoute>
                <AdminLayout>
                  <UpstreamProvidersPage />
                </AdminLayout>
              </AdminRoute>
            }
          />

          <Route
            path="admin/plans"
            element={
              <AdminRoute>
                <AdminLayout>
                  <AdminDashboardPage />
                </AdminLayout>
              </AdminRoute>
            }
          />

          {/* Fallback for other sub-paths inside /:lang/admin */}
          <Route
            path="admin/*"
            element={
              <AdminRoute>
                <AdminLayout>
                  <UpstreamProvidersPage />
                </AdminLayout>
              </AdminRoute>
            }
          />
        </Route>

        {/* 3. Fallbacks for un-prefixed URLs */}
        <Route path="/login" element={<Navigate to={`/${defaultLang}/login`} replace />} />
        <Route path="/register" element={<Navigate to={`/${defaultLang}/register`} replace />} />
        <Route
          path="/admin/*"
          element={<Navigate to={`/${defaultLang}/admin/providers`} replace />}
        />

        {/* 4. Global Fallback */}
        <Route path="*" element={<RootRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}
