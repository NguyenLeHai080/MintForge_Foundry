import httpClient from '../../../shared/api/httpClient';
import { API_ENDPOINTS } from '../../../shared/api/apiEndpoints';

/**
 * Service for public landing page plans and checkout
 */
export const landingApiService = {
  async getPlans() {
    return httpClient.get(API_ENDPOINTS.BILLING.PLANS);
  },

  async checkoutPlan(planId, paymentMethod = 'VIETQR') {
    return httpClient.post(API_ENDPOINTS.BILLING.CHECKOUT, {
      plan_id: planId,
      payment_method: paymentMethod,
    });
  },
};

export default landingApiService;
