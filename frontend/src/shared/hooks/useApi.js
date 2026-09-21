import { useState, useCallback } from 'react';
import { useToast } from './useToast';

/**
 * Custom hook to execute API calls with standardized loading, data, and error state
 */
export function useApi(apiFunc, options = {}) {
  const { showSuccessToast = false, showErrorToast = true, successMessage = 'Thành công!' } = options;
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
          toast.success(response?.message || successMessage);
        }
        return { success: true, data: result, raw: response };
      } catch (err) {
        setError(err);
        if (showErrorToast) {
          toast.error(err.message || 'Thao tác không thành công');
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
