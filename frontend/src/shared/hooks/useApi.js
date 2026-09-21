import { useState, useCallback } from 'react';
import { useToast } from './useToast';
import i18n from '../i18n';

/**
 * Custom hook to execute API calls with standardized loading, data, and error state
 */
export function useApi(apiFunc, options = {}) {
  const { showSuccessToast = false, showErrorToast = true, successMessage } = options;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiFunc(...args);
        const result = response?.data !== undefined ? response.data : response;
        setData(result);
        if (showSuccessToast) {
          toast.success(response?.message || successMessage || i18n.t('admin.toast_success_default'));
        }
        return { success: true, data: result, raw: response };
      } catch (err) {
        setError(err);
        if (showErrorToast) {
          toast.error(err.message || i18n.t('admin.toast_error_default'));
        }
        return { success: false, error: err };
      } finally {
        setLoading(false);
      }
    },
    [apiFunc, showSuccessToast, showErrorToast, successMessage, toast]
  );

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset,
    setData,
  };
}

export default useApi;
