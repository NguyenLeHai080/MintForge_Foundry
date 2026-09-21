import { create } from 'zustand';
import { DEFAULT_PLANS } from '../config/landingConfig';

export const useLandingStore = create((set) => ({
  plans: DEFAULT_PLANS,
  selectedPlan: null,
  isLoading: false,

  setSelectedPlan: (plan) => set({ selectedPlan: plan }),
  setPlans: (plans) => set({ plans }),
}));

export default useLandingStore;
