/**
 * Centralized API Endpoint Definitions
 * Matches FastAPI backend routing structure
 */

export const API_ENDPOINTS = {
  // Authentication & User Profile
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
  },

  // AI Upstream Providers
  PROVIDERS: {
    BASE: '/providers',
    DETAIL: (id) => `/providers/${id}`,
    CREATE: '/providers',
    UPDATE: (id) => `/providers/${id}`,
    DELETE: (id) => `/providers/${id}`,
    SET_PRIMARY: (id) => `/providers/${id}/set-primary`,
    PING: (id) => `/providers/${id}/ping`,
    FAILOVER_CONFIG: '/providers/failover/config',
  },

  // Billing, Credit Plans & Transactions
  BILLING: {
    PLANS: '/billing/plans',
    CHECKOUT: '/billing/checkout',
    HISTORY: '/billing/history',
  },

  // Super Admin Management & Metrics
  ADMIN: {
    METRICS: '/admin/metrics',
    USERS: '/admin/users',
    AUDIT_LOGS: '/admin/audit-logs',
  },
};

export default API_ENDPOINTS;
