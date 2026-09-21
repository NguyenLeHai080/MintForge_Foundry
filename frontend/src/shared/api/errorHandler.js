import { HTTP_STATUS } from '../constants/httpStatus';
import { useToastStore } from '../store/toastStore';
import i18n from '../i18n';

/**
 * Parses and formats backend API errors into a standardized object
 */
export const parseApiError = (error) => {
  if (!error) {
    return {
      status: 0,
      code: 'UNKNOWN_ERROR',
      message: i18n.t('admin.error_unknown'),
    };
  }

  // Network or Connection Error
  if (!error.response) {
    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      return {
        status: HTTP_STATUS.GATEWAY_TIMEOUT,
        code: 'TIMEOUT',
        message: i18n.t('admin.error_timeout'),
      };
    }
    return {
      status: 0,
      code: 'NETWORK_ERROR',
      message: i18n.t('admin.error_network'),
    };
  }

  const { status, data } = error.response;
  let message = i18n.t('admin.error_unsuccessful');

  if (typeof data === 'string') {
    message = data;
  } else if (data?.message) {
    message = data.message;
  } else if (data?.detail) {
    if (typeof data.detail === 'string') {
      message = data.detail;
    } else if (Array.isArray(data.detail)) {
      // FastAPI Validation error format: [{ loc: [...], msg: "..." }]
      message = data.detail.map((err) => `${err.loc?.slice(-1)[0] || i18n.t('admin.error_field')}: ${err.msg}`).join(', ');
    }
  }

  return {
    status,
    code: data?.error_code || data?.code || `HTTP_${status}`,
    message,
    details: data?.details || data?.detail,
  };
};

/**
 * Dispatches a toast notification for an API error
 */
export const notifyApiError = (error, fallbackTitle) => {
  const parsed = parseApiError(error);
  const title = fallbackTitle || i18n.t('admin.error_title_api');
  useToastStore.getState().error(parsed.message, title);
  return parsed;
};

export default parseApiError;
