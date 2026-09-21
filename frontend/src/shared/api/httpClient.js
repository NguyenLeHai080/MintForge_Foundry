import axios from 'axios';
import { appConfig } from '../config/appConfig';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { HTTP_STATUS } from '../constants/httpStatus';
import { parseApiError } from './errorHandler';
import { useToastStore } from '../store/toastStore';

/**
 * Enterprise Axios HTTP Client with Interceptors
 */
export const httpClient = axios.create({
  baseURL: appConfig.apiBaseUrl,
  timeout: appConfig.apiTimeout,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor: Attach Token & Language
httpClient.interceptors.request.use(
  (config) => {
    // 1. Attach JWT Bearer Token if available
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 2. Attach Current Language
    const currentLang = localStorage.getItem(STORAGE_KEYS.LANGUAGE) || appConfig.defaultLang;
    config.headers['Accept-Language'] = currentLang;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Unpack data and handle global error conditions
httpClient.interceptors.response.use(
  (response) => {
    // Return the response payload directly
    return response.data;
  },
  (error) => {
    const parsed = parseApiError(error);

    // Handle 401 Unauthorized: Session expiration
    if (parsed.status === HTTP_STATUS.UNAUTHORIZED) {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
      useToastStore.getState().warning('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.', 'Bảo Mật');
    }

    return Promise.reject(parsed);
  }
);

export default httpClient;
