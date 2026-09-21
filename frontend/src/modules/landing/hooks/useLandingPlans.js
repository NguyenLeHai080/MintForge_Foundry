import { useEffect, useState } from 'react';
import { useLandingStore } from '../store/landingStore';
import { landingApiService } from '../api/landingApiService';

export function useLandingPlans() {
  const { plans, selectedPlan, setSelectedPlan, setPlans } = useLandingStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchPlans = async () => {
      setLoading(true);
      try {
        const res = await landingApiService.getPlans();
        if (isMounted && res && res.data && Array.isArray(res.data) && res.data.length > 0) {
          setPlans(res.data);
        }
      } catch (err) {
        // Fallback to local default plans
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPlans();
    return () => {
      isMounted = false;
    };
  }, [setPlans]);

  return {
    plans,
    loading,
    selectedPlan,
    setSelectedPlan,
  };
}

export default useLandingPlans;
