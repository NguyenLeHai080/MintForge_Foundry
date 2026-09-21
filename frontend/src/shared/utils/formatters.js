/**
 * Data formatters for currency, latency, numbers, and dates
 */

export const formatCurrency = (amount, currency = 'VND', locale = 'vi-VN') => {
  if (amount === undefined || amount === null || isNaN(amount)) return '0';
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(amount);
  }
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

export const formatNumber = (num, locale = 'vi-VN') => {
  if (num === undefined || num === null || isNaN(num)) return '0';
  return new Intl.NumberFormat(locale).format(num);
};

export const formatLatency = (ms) => {
  if (ms === undefined || ms === null) return '-- ms';
  return `${Number(ms).toFixed(0)} ms`;
};

export const formatDate = (dateString, locale = 'vi-VN') => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};
