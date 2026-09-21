/**
 * General helper functions
 */

export const sleep = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  return JSON.parse(JSON.stringify(obj));
};

export const safeJsonParse = (str, fallback = null) => {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
};

export const truncateString = (str, maxLength = 30) => {
  if (!str || str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}...`;
};
