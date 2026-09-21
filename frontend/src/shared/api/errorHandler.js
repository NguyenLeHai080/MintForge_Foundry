import { HTTP_STATUS } from '../constants/httpStatus';
import { useToastStore } from '../store/toastStore';

/**
 * Parses and formats backend API errors into a standardized object
 */
export const parseApiError = (error) => {
  if (!error) {
    return {
      status: 0,
      code: 'UNKNOWN_ERROR',
      message: 'Đã có lỗi không xác định xảy ra.',
    };
  }

  // Network or Connection Error
  if (!error.response) {
    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      return {
        status: HTTP_STATUS.GATEWAY_TIMEOUT,
        code: 'TIMEOUT',
        message: 'Yêu cầu hết thời gian chờ (Timeout). Vui lòng kiểm tra lại kết nối mạng.',
      };
    }
    return {
      status: 0,
      code: 'NETWORK_ERROR',
      message: 'Không thể kết nối đến máy chủ API. Vui lòng kiểm tra Backend đang chạy.',
    };
  }

  const { status, data } = error.response;
  let message = 'Yêu cầu không thành công.';

  if (typeof data === 'string') {
    message = data;
  } else if (data?.message) {
    message = data.message;
  } else if (data?.detail) {
    if (typeof data.detail === 'string') {
      message = data.detail;
    } else if (Array.isArray(data.detail)) {
      // FastAPI Validation error format: [{ loc: [...], msg: "..." }]
      message = data.detail.map((err) => `${err.loc?.slice(-1)[0] || 'Trường'}: ${err.msg}`).join(', ');
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
export const notifyApiError = (error, fallbackTitle = 'Lỗi API') => {
  const parsed = parseApiError(error);
  useToastStore.getState().error(parsed.message, fallbackTitle);
  return parsed;
};

export default parseApiError;
