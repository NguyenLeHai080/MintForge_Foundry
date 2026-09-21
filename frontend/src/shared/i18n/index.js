import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Landing module locales
import landingVi from '../../modules/landing/locales/vi.json';
import landingEn from '../../modules/landing/locales/en.json';
import landingJa from '../../modules/landing/locales/ja.json';
import landingKo from '../../modules/landing/locales/ko.json';
import landingZh from '../../modules/landing/locales/zh.json';
import landingFr from '../../modules/landing/locales/fr.json';

// Admin module locales
import adminVi from '../../modules/admin/locales/vi.json';
import adminEn from '../../modules/admin/locales/en.json';
import adminJa from '../../modules/admin/locales/ja.json';
import adminKo from '../../modules/admin/locales/ko.json';
import adminZh from '../../modules/admin/locales/zh.json';
import adminFr from '../../modules/admin/locales/fr.json';

export const SUPPORTED_LANGUAGES = [
  { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'zh', label: '简体中文', flag: '🇨🇳' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' }
];

export const DEFAULT_LANGUAGE = 'vi';

const resources = {
  vi: {
    translation: {
      landing: landingVi,
      admin: adminVi
    }
  },
  en: {
    translation: {
      landing: landingEn,
      admin: adminEn
    }
  },
  ja: {
    translation: {
      landing: landingJa,
      admin: adminJa
    }
  },
  ko: {
    translation: {
      landing: landingKo,
      admin: adminKo
    }
  },
  zh: {
    translation: {
      landing: landingZh,
      admin: adminZh
    }
  },
  fr: {
    translation: {
      landing: landingFr,
      admin: adminFr
    }
  }
};

const savedLang = localStorage.getItem('mf_lang') || DEFAULT_LANGUAGE;

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLang,
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
