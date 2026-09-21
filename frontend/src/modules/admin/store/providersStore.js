import { create } from 'zustand';

const initialProviders = [
  {
    id: "p_02",
    name: "Upstream Gateway 02",
    slug: "upstream_gateway_02",
    baseUrl: "https://api.1eeh.dev/v1",
    apiKey: "sk-50Z82910488219482910",
    defaultModel: "gpt-image-2",
    supportedModels: ["gpt-image-2"],
    costPerImage: 120,
    latencyMs: 119362,
    isPrimary: true,
    isActive: true
  },
  {
    id: "p_01",
    name: "Upstream Gateway 01",
    slug: "upstream_gateway_01",
    baseUrl: "https://api.xompet.io.vn/v1",
    apiKey: "sk-9r88291048821948Lnzz",
    defaultModel: "gpt-image-2.5-flare",
    supportedModels: [
      "gpt-image-2.5-flare",
      "gpt-image-2.5-sunburst",
      "gpt-image-2",
      "nanobanana-2"
    ],
    costPerImage: 75,
    latencyMs: 271,
    isPrimary: false,
    isActive: false
  }
];

export const useProvidersStore = create((set, get) => ({
  providers: initialProviders,
  failoverConfig: {
    isEnabled: true,
    timeoutSeconds: 45
  },

  setPrimary: (id) => set((state) => ({
    providers: state.providers.map(p => ({
      ...p,
      isPrimary: p.id === id,
      isActive: p.id === id ? true : p.isActive
    }))
  })),

  toggleActive: (id) => set((state) => ({
    providers: state.providers.map(p => 
      p.id === id ? { ...p, isActive: !p.isActive } : p
    )
  })),

  updatePing: (id, newLatency) => set((state) => ({
    providers: state.providers.map(p =>
      p.id === id ? { ...p, latencyMs: newLatency } : p
    )
  })),

  pingAll: () => set((state) => ({
    providers: state.providers.map(p => ({
      ...p,
      latencyMs: p.isActive ? Math.floor(Math.random() * 300) + 150 : 0
    }))
  })),

  addProvider: (newProvider) => set((state) => {
    const provider = {
      ...newProvider,
      id: "p_" + Date.now(),
      latencyMs: 220,
      supportedModels: typeof newProvider.supportedModels === 'string'
        ? newProvider.supportedModels.split(',').map(s => s.trim()).filter(Boolean)
        : newProvider.supportedModels || ["gpt-image-2"]
    };

    let updated = state.providers;
    if (provider.isPrimary) {
      updated = updated.map(p => ({ ...p, isPrimary: false }));
    }
    return { providers: [provider, ...updated] };
  }),

  updateProvider: (id, fields) => set((state) => {
    let updated = state.providers;
    if (fields.isPrimary) {
      updated = updated.map(p => ({ ...p, isPrimary: false }));
    }
    return {
      providers: updated.map(p => {
        if (p.id === id) {
          const supported = typeof fields.supportedModels === 'string'
            ? fields.supportedModels.split(',').map(s => s.trim()).filter(Boolean)
            : fields.supportedModels || p.supportedModels;
          return { ...p, ...fields, supportedModels: supported };
        }
        return p;
      })
    };
  }),

  deleteProvider: (id) => set((state) => ({
    providers: state.providers.filter(p => p.id !== id)
  })),

  updateFailoverConfig: (config) => set((state) => ({
    failoverConfig: { ...state.failoverConfig, ...config }
  }))
}));
