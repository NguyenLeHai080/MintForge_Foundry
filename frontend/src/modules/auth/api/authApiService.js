import httpClient from '../../../shared/api/httpClient';
import { API_ENDPOINTS } from '../../../shared/api/apiEndpoints';

/**
 * Service handling authentication with FastAPI backend
 */
export const authApiService = {
  async login(credentials) {
    return httpClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  },

  async register(data) {
    return httpClient.post(API_ENDPOINTS.AUTH.REGISTER, data);
  },

  async getCurrentUser() {
    return httpClient.get(API_ENDPOINTS.AUTH.ME);
  },

  async logout() {
    return httpClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  },
};

export default authApiService;
