/**
 * Centralized Application Configuration
 */

export const appConfig = {
  appName: import.meta.env.VITE_APP_NAME || 'MintForge Foundry',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
  apiTimeout: Number(import.meta.env.VITE_API_TIMEOUT) || 15000,
  defaultLang: import.meta.env.VITE_DEFAULT_LANG || 'vn',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
};

export default appConfig;
