import { create } from 'zustand';

const initialPlans = [
  { id: '1', name: 'Starter Tier', price: 199000, credits: 500, status: 'ACTIVE', category: 'MONTHLY' },
  { id: '2', name: 'Pro Creator Tier', price: 499000, credits: 2000, status: 'ACTIVE', category: 'MONTHLY' },
  { id: '3', name: 'Enterprise Dedicated', price: 1990000, credits: 10000, status: 'ACTIVE', category: 'YEARLY' },
  { id: '4', name: 'Mini Credit Pack', price: 99000, credits: 200, status: 'ACTIVE', category: 'TOPUP' },
  { id: '5', name: 'Mega Creator Pack', price: 699000, credits: 2000, status: 'ACTIVE', category: 'TOPUP' }
];

export const useAdminStore = create((set) => ({
  plans: initialPlans,
  
  addPlan: (newPlan) => set((state) => ({
    plans: [{ ...newPlan, id: String(Date.now()) }, ...state.plans]
  })),

  updatePlan: (id, updatedFields) => set((state) => ({
    plans: state.plans.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
  })),

  deletePlan: (id) => set((state) => ({
    plans: state.plans.filter((p) => p.id !== id)
  })),

  deleteBatchPlans: (ids) => set((state) => ({
    plans: state.plans.filter((p) => !ids.includes(p.id))
  }))
}));
