import i18n from '../../../shared/i18n';

/**
 * Configuration and metadata for Upstream Providers
 */

export const PROVIDER_STATUSES = {
  ACTIVE: 'Active',
  WARNING: 'Warning',
  INACTIVE: 'Inactive',
};

export const getProviderPriorities = () => [
  { value: 'primary', label: i18n.t('admin.gateway_primary'), color: 'emerald' },
  { value: 'secondary', label: i18n.t('admin.gateway_secondary'), color: 'indigo' },
  { value: 'fallback', label: i18n.t('admin.gateway_fallback'), color: 'amber' },
];

export const PROVIDER_PRIORITIES = [
  { value: 'primary', labelKey: 'admin.gateway_primary', color: 'emerald' },
  { value: 'secondary', labelKey: 'admin.gateway_secondary', color: 'indigo' },
  { value: 'fallback', labelKey: 'admin.gateway_fallback', color: 'amber' },
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
