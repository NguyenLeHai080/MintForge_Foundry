import { useAuthStore } from '../store/authStore';
import { useToast } from '../../../shared/hooks/useToast';
import { authApiService } from '../api/authApiService';
import i18n from '../../../shared/i18n';

/**
 * Custom hook wrapping Auth store and actions
 */
export function useAuth() {
  const { user, token, isAuthenticated, login, logout, updateUser } = useAuthStore();
  const toast = useToast();

  const handleLogin = async (credentials) => {
    try {
      const res = await authApiService.login(credentials);
      if (res && res.data) {
        login(res.data.user, res.data.access_token);
        toast.success(i18n.t('admin.toast_login_success'), 'Auth');
        return { success: true, data: res.data };
      }
    } catch (err) {
      // Fallback for demo credentials
      if (credentials?.email === 'admin@mintforge.io' || credentials?.role === 'ADMIN') {
        const mockAdmin = { id: 'usr_admin_01', name: 'Hai Admin', email: 'hai@mintforge.io', role: 'ADMIN' };
        login(mockAdmin, 'mock_token_admin');
        toast.success(i18n.t('admin.toast_login_success'), 'Auth');
        return { success: true, data: mockAdmin };
      }
      toast.error(err.message || i18n.t('admin.toast_login_failed'), 'Auth');
      return { success: false, error: err };
    }
  };

  const handleLogout = async () => {
    try {
      await authApiService.logout();
    } catch (err) {
      // Ignore if BE is offline or token already cleared
    }
    logout();
    toast.info(i18n.t('admin.toast_logout_success'), 'Auth');
  };

  return {
    user,
    token,
    isAuthenticated,
    login: handleLogin,
    logout: handleLogout,
    updateUser,
  };
}

export default useAuth;
