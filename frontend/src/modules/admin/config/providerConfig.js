/**
 * Configuration and metadata for Upstream Providers
 */

export const PROVIDER_STATUSES = {
  ACTIVE: 'Active',
  WARNING: 'Warning',
  INACTIVE: 'Inactive',
};

export const PROVIDER_PRIORITIES = [
  { value: 'primary', label: 'Cổng Chính (Primary Gateway)', color: 'emerald' },
  { value: 'secondary', label: 'Cổng Phụ (Secondary Gateway)', color: 'indigo' },
  { value: 'fallback', label: 'Cổng Dự Phòng (Fallback Gateway)', color: 'amber' },
];

export const AVAILABLE_AI_MODELS = [
  'Midjourney v6.1',
  'FLUX.1 Dev',
  'FLUX.1 Schnell',
  'Stable Diffusion XL 1.0',
  'DALL-E 3',
  'Ideogram v2',
];

export const DEFAULT_PROVIDER_FORM = {
  name: '',
  endpoint: '',
  apiKey: '',
  models: ['Midjourney v6.1'],
  priority: 'secondary',
  weight: 50,
  costPerTask: 0.05,
  status: 'Active',
};
