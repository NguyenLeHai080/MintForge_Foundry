/**
 * Dynamic Font Manager for Multi-Language Support
 * Automatically applies optimized typography per locale:
 * - vn: Be Vietnam Pro (Vietnamese diacritics optimization)
 * - en: Outfit / Inter (Modern SaaS tech aesthetic)
 * - ja: Noto Sans JP (Japanese Kanji, Hiragana, Katakana)
 * - ko: Noto Sans KR (Korean Hangul)
 * - zh: Noto Sans SC (Simplified Chinese)
 * - fr: Outfit / Inter (Latin Extended)
 */

export const LANGUAGE_FONTS = {
  vn: {
    code: 'vn',
    name: 'Be Vietnam Pro',
    fontFamily: "'Be Vietnam Pro', 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap',
    htmlLang: 'vi',
  },
  en: {
    code: 'en',
    name: 'Outfit',
    fontFamily: "'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap',
    htmlLang: 'en',
  },
  ja: {
    code: 'ja',
    name: 'Noto Sans JP',
    fontFamily: "'Noto Sans JP', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'BIZ UDPGothic', 'Meiryo', sans-serif",
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;600;700;800&display=swap',
    htmlLang: 'ja',
  },
  ko: {
    code: 'ko',
    name: 'Noto Sans KR',
    fontFamily: "'Noto Sans KR', 'Pretendard', 'Malgun Gothic', -apple-system, sans-serif",
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700;800&display=swap',
    htmlLang: 'ko',
  },
  zh: {
    code: 'zh',
    name: 'Noto Sans SC',
    fontFamily: "'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', 'SimHei', sans-serif",
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;600;700;800&display=swap',
    htmlLang: 'zh-CN',
  },
  fr: {
    code: 'fr',
    name: 'Outfit',
    fontFamily: "'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap',
    htmlLang: 'fr',
  },
};

// Aliases mapping
const ALIAS_MAP = {
  vi: 'vn',
  'zh-cn': 'zh',
  'zh-tw': 'zh',
  'ja-jp': 'ja',
  'ko-kr': 'ko',
  'fr-fr': 'fr',
  'en-us': 'en',
};

const loadedFontLinks = new Set();

/**
 * Dynamically loads Google Font stylesheet for a target language if not already loaded
 * @param {string} langCode
 */
export function loadLanguageFontStylesheet(langCode) {
  if (typeof document === 'undefined') return;

  const normalized = normalizeLangCode(langCode);
  const fontConfig = LANGUAGE_FONTS[normalized] || LANGUAGE_FONTS.vn;

  const linkId = `mf-font-${normalized}`;
  if (document.getElementById(linkId) || loadedFontLinks.has(normalized)) {
    return;
  }

  const link = document.createElement('link');
  link.id = linkId;
  link.rel = 'stylesheet';
  link.href = fontConfig.googleFontUrl;
  link.crossOrigin = 'anonymous';

  document.head.appendChild(link);
  loadedFontLinks.add(normalized);
}

/**
 * Normalizes language code taking aliases into account
 * @param {string} langCode
 * @returns {string}
 */
export function normalizeLangCode(langCode) {
  if (!langCode) return 'vn';
  const lower = String(langCode).toLowerCase();
  return ALIAS_MAP[lower] || (LANGUAGE_FONTS[lower] ? lower : 'vn');
}

/**
 * Applies the correct typography and attributes for the given language
 * @param {string} langCode
 */
export function applyLanguageFont(langCode) {
  if (typeof document === 'undefined') return;

  const normalized = normalizeLangCode(langCode);
  const fontConfig = LANGUAGE_FONTS[normalized] || LANGUAGE_FONTS.vn;

  // 1. Ensure stylesheet is injected
  loadLanguageFontStylesheet(normalized);

  // 2. Set lang and data-lang attribute on html root
  document.documentElement.lang = fontConfig.htmlLang;
  document.documentElement.setAttribute('data-lang', normalized);

  // 3. Set dynamic CSS variable for font-family
  document.documentElement.style.setProperty('--font-current', fontConfig.fontFamily);

  // 4. Directly update body font family for immediate cascade
  if (document.body) {
    document.body.style.fontFamily = fontConfig.fontFamily;
  }
}

/**
 * Get font config for current language
 * @param {string} langCode
 */
export function getCurrentLanguageFont(langCode) {
  const normalized = normalizeLangCode(langCode);
  return LANGUAGE_FONTS[normalized] || LANGUAGE_FONTS.vn;
}

export default {
  LANGUAGE_FONTS,
  applyLanguageFont,
  loadLanguageFontStylesheet,
  normalizeLangCode,
  getCurrentLanguageFont,
};
