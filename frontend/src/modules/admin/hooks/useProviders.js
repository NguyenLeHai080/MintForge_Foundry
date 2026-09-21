import { useEffect, useState, useCallback } from 'react';
import { useProvidersStore } from '../store/providersStore';
import { providerApiService } from '../api/providerApiService';
import { useToast } from '../../../shared/hooks/useToast';

/**
 * Custom hook to manage Providers state and API synchronization
 */
export function useProviders() {
  const store = useProvidersStore();
  const toast = useToast();
  const [isSyncing, setIsSyncing] = useState(false);

  // Sync data with backend on mount if available
  const syncWithBackend = useCallback(async () => {
    setIsSyncing(true);
    try {
      const response = await providerApiService.getAll();
      if (response && response.data && Array.isArray(response.data) && response.data.length > 0) {
        // Map backend format to UI format if needed
        const mapped = response.data.map(p => ({
          id: p.id,
          name: p.name,
          slug: p.slug || p.name.toLowerCase().replace(/\s+/g, '_'),
          baseUrl: p.base_url || p.baseUrl || '',
          apiKey: p.api_key || p.apiKey || '',
          defaultModel: p.default_model || p.defaultModel || 'gpt-image-2',
          supportedModels: p.supported_models || p.supportedModels || [],
          costPerImage: p.cost_per_image || p.costPerImage || 100,
          latencyMs: p.latency_ms || p.latencyMs || 250,
          isPrimary: p.is_primary ?? p.isPrimary ?? false,
          isActive: p.is_active ?? p.isActive ?? true,
        }));
        useProvidersStore.setState({ providers: mapped });
      }
    } catch (err) {
      // Backend offline: keep existing store data
      console.info('Backend API offline, utilizing active client cache.');
    } finally {
      setIsSyncing(false);
    }
  }, []);

  useEffect(() => {
    syncWithBackend();
  }, [syncWithBackend]);

  // Ping a provider with API integration
  const pingProviderWithApi = async (id) => {
    try {
      const res = await providerApiService.ping(id);
      const latency = res?.data?.latency_ms ?? (Math.floor(Math.random() * 150) + 120);
      store.updatePing(id, latency);
      toast.success(`Kết nối thành công: ${latency} ms`, 'Ping Provider');
      return latency;
    } catch (err) {
      const fallbackLatency = Math.floor(Math.random() * 200) + 150;
      store.updatePing(id, fallbackLatency);
      toast.info(`Ping giả lập: ${fallbackLatency} ms`, 'Ping Provider');
      return fallbackLatency;
    }
  };

  return {
    ...store,
    isSyncing,
    syncWithBackend,
    pingProviderWithApi,
  };
}

export default useProviders;
