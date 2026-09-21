import { BaseService } from '../../../shared/api';
import { API_ENDPOINTS } from '../../../shared/api/apiEndpoints';

/**
 * Service to interact with Backend AI Upstream Providers API
 */
class ProviderApiService extends BaseService {
  constructor() {
    super(API_ENDPOINTS.PROVIDERS.BASE);
  }

  /**
   * Set a provider as the primary routing gateway
   */
  async setPrimary(providerId) {
    return this.http.post(API_ENDPOINTS.PROVIDERS.SET_PRIMARY(providerId));
  }

  /**
   * Run health check / ping latency against a provider
   */
  async ping(providerId) {
    return this.http.post(API_ENDPOINTS.PROVIDERS.PING(providerId));
  }

  /**
   * Get failover switch configuration
   */
  async getFailoverConfig() {
    return this.http.get(API_ENDPOINTS.PROVIDERS.FAILOVER_CONFIG);
  }

  /**
   * Update failover switch configuration
   */
  async updateFailoverConfig(config) {
    return this.http.put(API_ENDPOINTS.PROVIDERS.FAILOVER_CONFIG, config);
  }
}

export const providerApiService = new ProviderApiService();
export default providerApiService;
