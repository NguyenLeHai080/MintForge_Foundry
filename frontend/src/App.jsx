import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Navbar from './shared/components/Navbar/Navbar';
import LandingPage from './modules/landing/pages/LandingPage';
import AdminLayout from './modules/admin/layouts/AdminLayout';
import UpstreamProvidersPage from './modules/admin/pages/UpstreamProvidersPage';
import AdminDashboardPage from './modules/admin/pages/AdminDashboardPage';
import LoginPage from './modules/auth/pages/LoginPage';
import RegisterPage from './modules/auth/pages/RegisterPage';
import { useAuthStore } from './modules/auth/store/authStore';
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

          {/* Authentication Pages */}
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />

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
