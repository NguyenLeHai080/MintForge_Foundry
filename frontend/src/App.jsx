import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Navbar from './shared/components/Navbar/Navbar';
import LandingPage from './modules/landing/pages/LandingPage';
import AdminLayout from './modules/admin/layouts/AdminLayout';
import UpstreamProvidersPage from './modules/admin/pages/UpstreamProvidersPage';
import AdminDashboardPage from './modules/admin/pages/AdminDashboardPage';
import { useAuthStore } from './modules/auth/store/authStore';
import LanguageRouteWrapper from './shared/components/Navbar/LanguageRouteWrapper';
import { DEFAULT_LANGUAGE } from './shared/i18n';
import ToastContainer from './shared/components/Toast/ToastContainer';

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
                <footer className="border-t border-slate-800/80 bg-slate-950/80 py-8 text-center text-xs text-slate-500">
                  <div className="max-w-7xl mx-auto px-4">
                    MintForge Foundry Engine &copy; 2026. Thiết kế theo chuẩn Enterprise Modular Clean Architecture.
                  </div>
                </footer>
              </div>
            }
          />

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

        {/* 3. Fallback for un-prefixed admin URLs like /admin/providers */}
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
