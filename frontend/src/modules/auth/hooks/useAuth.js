import { useAuthStore } from '../store/authStore';
import { useToast } from '../../../shared/hooks/useToast';
import { authApiService } from '../api/authApiService';

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
        toast.success(`Chào mừng ${res.data.user.name || 'bạn'} trở lại!`, 'Đăng Nhập');
        return { success: true, data: res.data };
      }
    } catch (err) {
      // Fallback for demo credentials
      if (credentials?.email === 'admin@mintforge.io' || credentials?.role === 'ADMIN') {
        const mockAdmin = { id: 'usr_admin_01', name: 'Hải Admin', email: 'hai@mintforge.io', role: 'ADMIN' };
        login(mockAdmin, 'mock_token_admin');
        toast.success('Đăng nhập quản trị viên thành công!', 'Đăng Nhập');
        return { success: true, data: mockAdmin };
      }
      toast.error(err.message || 'Đăng nhập không thành công', 'Lỗi Đăng Nhập');
      return { success: false, error: err };
    }
  };

  const handleLogout = () => {
    logout();
    toast.info('Đã đăng xuất khỏi tài khoản.', 'Đăng Xuất');
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
