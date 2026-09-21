import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './shared/components/Navbar/Navbar';
import LandingPage from './modules/landing/pages/LandingPage';
import AdminDashboardPage from './modules/admin/pages/AdminDashboardPage';
import { useAuthStore } from './modules/auth/store/authStore';

// Protected Route Guard for Admin
function AdminRoute({ children }) {
  const { user, isAuthenticated } = useAuthStore();
  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col justify-between">
        <Navbar />
        <main className="flex-1">
          <Routes>
            {/* Public Landing Page */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Protected Admin Portal */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboardPage />
                </AdminRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="border-t border-slate-800/80 bg-slate-950/80 py-8 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4">
            MintForge Foundry Engine &copy; 2026. Thiết kế theo chuẩn Enterprise Modular Clean Architecture.
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
